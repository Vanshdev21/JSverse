// src/utils/workerManager.js

/**
 * Creates and runs a Blob-based Web Worker to execute JavaScript in an isolated thread.
 * If execution exceeds the watchdog timeout (3 seconds), the worker is terminated.
 * @param {string} code - The user's JavaScript code to execute.
 * @param {function(Array)} onResult - Callback triggered with successful interpreter steps.
 * @param {function(string)} onError - Callback triggered if parsing/execution fails or times out.
 * @returns {function()} An abort function to terminate execution prematurely if needed.
 */
export function runCodeInWorker(code, onResult, onError) {
  const workerCode = `
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/acorn/8.11.3/acorn.min.js');

    class Scope {
      constructor(name, parent = null, type = 'block') {
        this.name = name;
        this.parent = parent;
        this.type = type;
        this.bindings = {};
      }

      declare(name, value, kind = 'let') {
        this.bindings[name] = { value, kind };
      }

      has(name) {
        if (name in this.bindings) return true;
        if (this.parent) return this.parent.has(name);
        return false;
      }

      get(name) {
        if (name in this.bindings) return this.bindings[name].value;
        if (this.parent) return this.parent.get(name);
        return undefined;
      }

      set(name, value) {
        if (name in this.bindings) {
          this.bindings[name].value = value;
          return true;
        }
        if (this.parent) {
          return this.parent.set(name, value);
        }
        return false;
      }
    }

    class ReturnValue {
      constructor(value) {
        this.value = value;
      }
    }

    function runInterpreter(code) {
      const steps = [];
      const logs = [];
      let heapCounter = 1;
      const heap = {};

      const allocate = (type, value) => {
        const id = type.toLowerCase() + '_' + (heapCounter++);
        heap[id] = { id, type, value };
        return id;
      };

      const frames = [];
      const eventLoop = { status: 'Idle', queue: [] };
      const microtaskQueue = [];
      const macrotasks = [];
      const microtasks = [];

      const globalScope = new Scope('(global)', null, 'global');
      const globalFrame = {
        name: '(global)',
        scope: globalScope,
        node: null,
        line: 1,
        thisValue: 'window'
      };
      frames.push(globalFrame);

      const makeSnapshot = (currentLine) => {
        const callStackSnapshot = frames.map(f => ({
          name: f.name,
          line: f.line || currentLine || 1
        }));

        const scopeChainSnapshot = [];
        if (frames.length > 0) {
          let s = frames[frames.length - 1].scope;
          while (s) {
            const variables = Object.entries(s.bindings).map(([name, binding]) => {
              let valStr = '';
              let type = typeof binding.value;
              if (binding.value && typeof binding.value === 'object' && heap[binding.value]) {
                const item = heap[binding.value];
                if (item.type === 'Function') {
                  valStr = 'f ' + (item.value.name || 'anonymous') + '()';
                  type = 'function';
                } else {
                  valStr = 'Reference to ' + item.id;
                  type = 'object';
                }
              } else if (binding.value && binding.value.type === 'Function') {
                valStr = 'f ' + (binding.value.name || 'anonymous') + '()';
                type = 'function';
              } else if (typeof binding.value === 'object' && binding.value !== null) {
                valStr = JSON.stringify(binding.value);
              } else if (binding.value === undefined) {
                valStr = 'undefined';
                type = 'undefined';
              } else {
                valStr = String(binding.value);
              }
              return { name, value: valStr, type };
            });
            scopeChainSnapshot.push({
              name: s.name,
              variables
            });
            s = s.parent;
          }
        }

        let activeContext = { thisValue: 'window', lexicalEnv: 'global', variables: [] };
        if (frames.length > 0) {
          const topFrame = frames[frames.length - 1];
          activeContext = {
            thisValue: topFrame.thisValue || 'undefined',
            lexicalEnv: topFrame.name,
            variables: scopeChainSnapshot[0]?.variables || []
          };
        }

        const heapSnapshot = Object.entries(heap).map(([id, item]) => {
          let valStr = '';
          if (item.type === 'Function') {
            valStr = 'Function: ' + (item.value.name || 'anonymous') + '()';
          } else if (item.type === 'Object') {
            valStr = JSON.stringify(item.value);
          } else {
            valStr = String(item.value);
          }
          return { id, type: item.type, value: valStr };
        });

        return {
          line: currentLine || 1,
          callStack: callStackSnapshot,
          scopeChain: scopeChainSnapshot,
          context: activeContext,
          heap: heapSnapshot,
          eventLoop: {
            status: (frames.length > 1 || eventLoop.queue.length > 0 || microtaskQueue.length > 0) ? 'Running' : 'Idle',
            queue: [...eventLoop.queue]
          },
          microtaskQueue: [...microtaskQueue],
          logs: [...logs]
        };
      };

      function* evaluateNode(node, scope) {
        if (!node) return undefined;

        if (frames.length > 0 && node.loc) {
          frames[frames.length - 1].line = node.loc.start.line;
        }

        switch (node.type) {
          case 'Program':
          case 'BlockStatement': {
            const blockScope = (node.type === 'BlockStatement') ? new Scope('Block', scope, 'block') : scope;
            if (node.type === 'BlockStatement' && frames.length > 0) {
              const prevScope = frames[frames.length - 1].scope;
              frames[frames.length - 1].scope = blockScope;
              for (const stmt of node.body) {
                yield* evaluateNode(stmt, blockScope);
              }
              frames[frames.length - 1].scope = prevScope;
            } else {
              for (const stmt of node.body) {
                yield* evaluateNode(stmt, scope);
              }
            }
            return undefined;
          }

          case 'VariableDeclaration': {
            for (const decl of node.declarations) {
              const name = decl.id.name;
              let val = undefined;
              if (decl.init) {
                val = yield* evaluateNode(decl.init, scope);
              }
              scope.declare(name, val, node.kind);
              yield makeSnapshot(node.loc?.start.line);
            }
            return undefined;
          }

          case 'FunctionDeclaration': {
            const name = node.id.name;
            const funcVal = {
              type: 'Function',
              name: name,
              params: node.params.map(p => p.name),
              body: node.body,
              parentScope: scope
            };
            const heapId = allocate('Function', funcVal);
            scope.declare(name, heapId, 'const');
            yield makeSnapshot(node.loc?.start.line);
            return undefined;
          }

          case 'ExpressionStatement': {
            return yield* evaluateNode(node.expression, scope);
          }

          case 'CallExpression': {
            let calleeVal;
            let isConsoleLog = false;
            let isSetTimeout = false;
            let isPromiseThen = false;
            let promiseObject = null;

            if (node.callee.type === 'MemberExpression') {
              const obj = yield* evaluateNode(node.callee.object, scope);
              const prop = node.callee.property.name;
              if (obj === 'console' && prop === 'log') {
                isConsoleLog = true;
              } else if (obj === 'Promise' && prop === 'resolve') {
                calleeVal = 'Promise.resolve';
              } else if (typeof obj === 'string' && heap[obj] && heap[obj].type === 'Promise' && prop === 'then') {
                isPromiseThen = true;
                promiseObject = heap[obj];
              } else {
                calleeVal = 'memberCall';
              }
            } else {
              const name = node.callee.name;
              if (name === 'setTimeout') {
                isSetTimeout = true;
              } else {
                calleeVal = yield* evaluateNode(node.callee, scope);
              }
            }

            const args = [];
            for (const arg of node.arguments) {
              args.push(yield* evaluateNode(arg, scope));
            }

            if (isConsoleLog) {
              const formattedArgs = args.map(arg => {
                if (typeof arg === 'string' && heap[arg]) {
                  const item = heap[arg];
                  if (item.type === 'Function') return '[Function: ' + (item.value.name || 'anonymous') + ']';
                  if (item.type === 'Object') return JSON.stringify(item.value);
                  return String(item.value);
                }
                if (arg === undefined) return 'undefined';
                return String(arg);
              }).join(' ');
              logs.push(formattedArgs);
              yield makeSnapshot(node.loc?.start.line);
              return undefined;
            }

            if (isSetTimeout) {
              const callbackId = args[0];
              const delay = args[1] || 0;
              const callbackName = (heap[callbackId] && heap[callbackId].value.name) ? heap[callbackId].value.name + '()' : 'anonymous()';
              eventLoop.queue.push(callbackName);
              macrotasks.push({ callbackId, delay, name: callbackName });
              yield makeSnapshot(node.loc?.start.line);
              return undefined;
            }

            if (calleeVal === 'Promise.resolve') {
              const pObj = {
                type: 'Promise',
                status: 'resolved',
                value: args[0],
                thenCallbacks: []
              };
              const pId = allocate('Promise', pObj);
              yield makeSnapshot(node.loc?.start.line);
              return pId;
            }

            if (isPromiseThen) {
              const callbackId = args[0];
              const callbackName = (heap[callbackId] && heap[callbackId].value.name) ? 'Promise.then(' + heap[callbackId].value.name + ')' : 'Promise.then(anonymous)';
              microtaskQueue.push(callbackName);
              microtasks.push({ callbackId, value: promiseObject.value.value });
              yield makeSnapshot(node.loc?.start.line);
              return undefined;
            }

            if (typeof calleeVal === 'string' && heap[calleeVal] && heap[calleeVal].type === 'Function') {
              const fnObj = heap[calleeVal].value;
              const fnScope = new Scope((fnObj.name || 'anonymous') + '()', fnObj.parentScope, 'function');
              
              fnObj.params.forEach((paramName, idx) => {
                fnScope.declare(paramName, args[idx] !== undefined ? args[idx] : undefined, 'let');
              });

              const newFrame = {
                name: (fnObj.name || 'anonymous') + '()',
                scope: fnScope,
                node: fnObj.body,
                line: fnObj.body.loc?.start.line || node.loc?.start.line || 1,
                thisValue: 'undefined'
              };
              frames.push(newFrame);
              yield makeSnapshot(node.loc?.start.line);

              let retVal = undefined;
              try {
                yield* evaluateNode(fnObj.body, fnScope);
              } catch (err) {
                if (err instanceof ReturnValue) {
                  retVal = err.value;
                } else {
                  throw err;
                }
              }

              frames.pop();
              yield makeSnapshot(node.loc?.start.line);
              return retVal;
            }

            return undefined;
          }

          case 'Literal': {
            return node.value;
          }

          case 'Identifier': {
            if (node.name === 'undefined') return undefined;
            if (node.name === 'null') return null;
            if (node.name === 'console') return 'console';
            if (node.name === 'Promise') return 'Promise';
            if (scope.has(node.name)) {
              return scope.get(node.name);
            }
            throw new ReferenceError(node.name + ' is not defined');
          }

          case 'AssignmentExpression': {
            const rightVal = yield* evaluateNode(node.right, scope);
            if (node.left.type === 'Identifier') {
              const name = node.left.name;
              if (scope.set(name, rightVal)) {
                yield makeSnapshot(node.loc?.start.line);
                return rightVal;
              }
              throw new ReferenceError(name + ' is not defined');
            }
            return undefined;
          }

          case 'UpdateExpression': {
            if (node.argument.type === 'Identifier') {
              const name = node.argument.name;
              const oldVal = Number(scope.get(name));
              let newVal = oldVal;
              if (node.operator === '++') {
                newVal = oldVal + 1;
              } else if (node.operator === '--') {
                newVal = oldVal - 1;
              }
              scope.set(name, newVal);
              yield makeSnapshot(node.loc?.start.line);
              return node.prefix ? newVal : oldVal;
            }
            return undefined;
          }

          case 'BinaryExpression': {
            const left = yield* evaluateNode(node.left, scope);
            const right = yield* evaluateNode(node.right, scope);
            switch (node.operator) {
              case '+': return left + right;
              case '-': return left - right;
              case '*': return left * right;
              case '/': return left / right;
              case '%': return left % right;
              case '==': return left == right;
              case '===': return left === right;
              case '!=': return left != right;
              case '!==': return left !== right;
              case '<': return left < right;
              case '>': return left > right;
              case '<=': return left <= right;
              case '>=': return left >= right;
              default: throw new Error('Unsupported binary operator ' + node.operator);
            }
          }

          case 'ReturnStatement': {
            const val = node.argument ? yield* evaluateNode(node.argument, scope) : undefined;
            throw new ReturnValue(val);
          }

          case 'IfStatement': {
            const testVal = yield* evaluateNode(node.test, scope);
            if (testVal) {
              yield* evaluateNode(node.consequent, scope);
            } else if (node.alternate) {
              yield* evaluateNode(node.alternate, scope);
            }
            return undefined;
          }

          case 'WhileStatement': {
            while (yield* evaluateNode(node.test, scope)) {
              yield* evaluateNode(node.body, scope);
            }
            return undefined;
          }

          case 'ForStatement': {
            const loopScope = new Scope('For Loop', scope, 'block');
            if (node.init) {
              yield* evaluateNode(node.init, loopScope);
            }
            const prevScope = frames[frames.length - 1].scope;
            frames[frames.length - 1].scope = loopScope;

            while (true) {
              if (node.test) {
                const testVal = yield* evaluateNode(node.test, loopScope);
                if (!testVal) break;
              }
              yield* evaluateNode(node.body, loopScope);
              if (node.update) {
                yield* evaluateNode(node.update, loopScope);
              }
            }

            frames[frames.length - 1].scope = prevScope;
            return undefined;
          }

          case 'ObjectExpression': {
            const obj = {};
            for (const prop of node.properties) {
              const key = prop.key.name || prop.key.value;
              const val = yield* evaluateNode(prop.value, scope);
              obj[key] = val;
            }
            return allocate('Object', obj);
          }

          case 'ArrayExpression': {
            const arr = [];
            for (const element of node.elements) {
              arr.push(yield* evaluateNode(element, scope));
            }
            return allocate('Array', arr);
          }

          default:
            return undefined;
        }
      }

      let ast;
      try {
        ast = acorn.parse(code, { ecmaVersion: 2020, locations: true });
      } catch (err) {
        logs.push('SyntaxError: ' + err.message);
        steps.push({
          line: err.loc ? err.loc.line : 1,
          callStack: [{ name: '(global)', line: 1 }],
          scopeChain: [{ name: 'Global Scope', variables: [] }],
          context: { thisValue: 'window', lexicalEnv: 'global', variables: [] },
          heap: [],
          eventLoop: { status: 'Idle', queue: [] },
          microtaskQueue: [],
          logs: [...logs]
        });
        return steps;
      }

      const generator = evaluateNode(ast, globalScope);
      let result = generator.next();
      while (!result.done) {
        if (result.value) {
          steps.push(result.value);
        }
        result = generator.next();
      }

      while (microtasks.length > 0 || macrotasks.length > 0) {
        while (microtasks.length > 0) {
          const task = microtasks.shift();
          microtaskQueue.shift();

          if (heap[task.callbackId] && heap[task.callbackId].type === 'Function') {
            const fnObj = heap[task.callbackId].value;
            const fnScope = new Scope((fnObj.name || 'anonymous') + '()', fnObj.parentScope, 'function');
            
            if (fnObj.params.length > 0) {
              fnScope.declare(fnObj.params[0], task.value, 'let');
            }

            const newFrame = {
              name: (fnObj.name || 'anonymous') + '()',
              scope: fnScope,
              node: fnObj.body,
              line: fnObj.body.loc?.start.line || 1,
              thisValue: 'undefined'
            };

            frames.push(newFrame);
            eventLoop.status = 'Running';
            steps.push(makeSnapshot(newFrame.line));

            try {
              const gen = evaluateNode(fnObj.body, fnScope);
              let res = gen.next();
              while (!res.done) {
                if (res.value) steps.push(res.value);
                res = gen.next();
              }
            } catch (e) {
              if (!(e instanceof ReturnValue)) throw e;
            }

            frames.pop();
            steps.push(makeSnapshot(fnObj.body.loc?.end.line || 1));
          }
        }

        if (macrotasks.length > 0) {
          const task = macrotasks.shift();
          eventLoop.queue.shift();

          if (heap[task.callbackId] && heap[task.callbackId].type === 'Function') {
            const fnObj = heap[task.callbackId].value;
            const fnScope = new Scope((fnObj.name || 'anonymous') + '()', fnObj.parentScope, 'function');

            const newFrame = {
              name: (fnObj.name || 'anonymous') + '()',
              scope: fnScope,
              node: fnObj.body,
              line: fnObj.body.loc?.start.line || 1,
              thisValue: 'undefined'
            };

            frames.push(newFrame);
            eventLoop.status = 'Running';
            steps.push(makeSnapshot(newFrame.line));

            try {
              const gen = evaluateNode(fnObj.body, fnScope);
              let res = gen.next();
              while (!res.done) {
                if (res.value) steps.push(res.value);
                res = gen.next();
              }
            } catch (e) {
              if (!(e instanceof ReturnValue)) throw e;
            }

            frames.pop();
            steps.push(makeSnapshot(fnObj.body.loc?.end.line || 1));
          }
        }
      }

      if (steps.length === 0) {
        steps.push(makeSnapshot(1));
      } else {
        const lastStep = steps[steps.length - 1];
        lastStep.eventLoop.status = 'Idle';
      }

      return steps;
    }

    self.onmessage = function(e) {
      const { code } = e.data;
      try {
        const steps = runInterpreter(code);
        self.postMessage({ success: true, steps });
      } catch (err) {
        self.postMessage({ success: false, error: err.message });
      }
    };
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const workerURL = URL.createObjectURL(blob);
  const worker = new Worker(workerURL);

  const watchdogTimeout = 3000; // Watchdog: 3 seconds
  let timeoutId = setTimeout(() => {
    worker.terminate();
    URL.revokeObjectURL(workerURL);
    onError("Execution timed out. Potential infinite loop or long-running execution detected.");
  }, watchdogTimeout);

  worker.onmessage = (e) => {
    clearTimeout(timeoutId);
    worker.terminate();
    URL.revokeObjectURL(workerURL);
    if (e.data.success) {
      onResult(e.data.steps);
    } else {
      onError(e.data.error);
    }
  };

  worker.onerror = (err) => {
    clearTimeout(timeoutId);
    worker.terminate();
    URL.revokeObjectURL(workerURL);
    onError(err.message);
  };

  worker.postMessage({ code });

  // Return function to abort execution early if sandbox is reset or code changes
  return () => {
    clearTimeout(timeoutId);
    worker.terminate();
    URL.revokeObjectURL(workerURL);
  };
}
