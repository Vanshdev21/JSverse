// src/utils/execEngine.js
// Execution engine that runs JavaScript code, captures console.log output, call stack (filtered to user-defined functions), a simple scope chain, execution context, and a memory heap.

/**
 * Run a snippet of JavaScript code and generate visualization steps.
 * @param {string} code - JavaScript source.
 * @param {Object} options
 * @param {function(Object)} [options.onStep] - Callback for each step.
 * @param {function(string)} [options.onLog] - Callback for console.log messages.
 * @returns {Array<Object>} steps array.
 */
export function runCode(code, { onStep, onLog } = {}) {
  const steps = [];
  const originalConsoleLog = console.log;
  const capturedLogs = [];
  const rawCallStack = [];
  const heap = [];

  // Helper to parse a stack trace line into { name, file, line }
  const parseStackLine = (line) => {
    // Example: "    at functionName (file.js:10:5)"
    const match = line.match(/at\s+(.*?)\s+\((.*?):(\d+):\d+\)/);
    if (match) {
      return { name: match[1], file: match[2], line: parseInt(match[3], 10) };
    }
    // Fallback for anonymous or eval frames
    const anonMatch = line.match(/at\s+(.*?):(\d+):\d+/);
    if (anonMatch) {
      return { name: '(anonymous)', file: anonMatch[1], line: parseInt(anonMatch[2], 10) };
    }
    return { name: '(unknown)', file: '', line: 0 };
  };

  // Simple parser to extract top‑level variable declarations (let/const/var)
  const extractVariables = (src) => {
    const varRegex = /\b(let|const|var)\s+([a-zA-Z_$][\w$]*)/g;
    const vars = [];
    let match;
    while ((match = varRegex.exec(src)) !== null) {
      vars.push(match[2]);
    }
    return vars;
  };

  // Override console.log to capture output, heap objects, and call‑stack information
  console.log = (...args) => {
    const msg = args.map((a) => {
      try {
        return typeof a === 'object' ? JSON.stringify(a) : String(a);
      } catch {
        return String(a);
      }
    }).join(' ');
    capturedLogs.push(msg);

    // Capture any object arguments into a simple heap representation
    args.forEach((arg) => {
      if (typeof arg === 'object' && arg !== null) {
        heap.push(JSON.parse(JSON.stringify(arg)));
      }
    });

    // Capture call stack (skip this wrapper and console.log frames)
    const err = new Error();
    const stackLines = err.stack ? err.stack.split('\n').slice(2) : [];
    stackLines.forEach((line) => {
      const frame = parseStackLine(line.trim());
      if (frame.name !== '(unknown)') {
        rawCallStack.push(frame);
      }
    });

    if (typeof onLog === 'function') onLog(msg);
    originalConsoleLog.apply(console, args);
  };

  // Dummy execution context for `this`
  const execContext = {};

  // Prepare scope chain – only a single local scope with the declared variable names
  const declaredVarNames = extractVariables(code);
  const scopeChain = declaredVarNames.length > 0 ? [{ name: 'Local Scope', variables: declaredVarNames }] : [];

  // Helper to filter out internal frames from the raw call stack
  const filterUserFrames = (stack) => {
    const internalNames = [
      'Object.<anonymous>',
      'runCode',
      'execEngine',
      'executeDispatch',
      'runWithFiberInDEV',
      'processDispatchQueue',
      'batchedUpdates$1',
      'dispatchEventForPluginEventSystem',
    ];
    return stack.filter((frame) => {
      // Exclude frames whose name matches any internal pattern
      const isInternal = internalNames.some((pat) => frame.name.startsWith(pat));
      // Also exclude frames that originate from this file (execEngine.js)
      const isOwnFile = frame.file && frame.file.includes('execEngine.js');
      return !isInternal && !isOwnFile;
    });
  };

  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(`"use strict"; ${code}`);
    fn.call(execContext);
    const step = {
      callStack: filterUserFrames(rawCallStack),
      scopeChain,
      context: { this: execContext },
      heap,
      eventLoop: { queue: [] },
      logs: capturedLogs,
    };
    steps.push(step);
    if (typeof onStep === 'function') onStep(step);
  } catch (e) {
    const errorStep = {
      callStack: filterUserFrames(rawCallStack),
      scopeChain,
      context: { this: execContext, error: e.message },
      heap,
      eventLoop: { queue: [] },
      logs: capturedLogs.concat([`Error: ${e.message}`]),
    };
    steps.push(errorStep);
    if (typeof onStep === 'function') onStep(errorStep);
    if (typeof onLog === 'function') onLog(`Error: ${e.message}`);
  } finally {
    console.log = originalConsoleLog;
  }

  return steps;
}
