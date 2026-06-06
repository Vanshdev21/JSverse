export const CONCEPTS_DATA = {
  "javascript-closures": {
    id: "javascript-closures",
    title: "JavaScript Closures Visualized",
    seoTitle: "JavaScript Closures Visualized & Explained | Learn JS Visually",
    metaDescription: "Learn JavaScript closures visually. Interactive step-by-step memory heap, lexical environment, and execution context visualizer for mastering closures.",
    keywords: ["javascript closures", "javascript closure visualizer", "learn closures visually", "how closures work", "scope chain visualizer"],
    h1: "JavaScript Closures Explained Visually",
    subtitle: "See how functions retain access to their outer lexical environments even after parent scope execution completes.",
    introduction: "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function's scope.",
    explanationHtml: `
      <h2>Why do Closures Exist?</h2>
      <p>In JavaScript, functions are first-class citizens. When a function finishes execution, its execution context is popped off the Call Stack and its local variable space is garbage collected. However, if an inner function retains a reference to variables defined in the outer scope, JavaScript creates a <strong>Closure</strong>.</p>
      
      <h2>Step-by-Step Visualization of a Closure</h2>
      <p>When you run closure code in the sandbox visualizer, pay attention to these three components:</p>
      <ul>
        <li><strong>Call Stack:</strong> The outer function runs and is popped off. The inner function remains.</li>
        <li><strong>Execution Context:</strong> The lexical scope references persist.</li>
        <li><strong>Memory Heap:</strong> The variable environment of the outer function remains stored in the heap because the inner function still references it.</li>
      </ul>
      
      <h2>Common Use Cases</h2>
      <p>Closures are commonly used for data privacy (emulating private methods), partial application or currying, and maintaining state in asynchronous callbacks like timers and event listeners.</p>
    `,
    sandboxCode: `function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log("Count value in closure:", count);
    return count;
  };
}
const closureFn = outer();
closureFn(); // 1
closureFn(); // 2`,
    faqs: [
      {
        question: "What is a closure in JavaScript?",
        answer: "A closure is a feature in JavaScript where an inner function retains access to the variables and parameters of its outer enclosing function, even after the outer function has finished executing."
      },
      {
        question: "Does every JavaScript function create a closure?",
        answer: "Yes, all JavaScript functions are closures because they have access to the global scope, but practically closures are interesting when an inner function references local variables of an outer function that has already returned."
      },
      {
        question: "How do closures affect memory usage?",
        answer: "Closures prevent outer variables from being garbage collected. If not handled carefully, holding references to closures can lead to higher memory consumption or leaks in long-running applications."
      }
    ],
    related: ["execution-context", "scope-chain", "functions"]
  },

  "event-loop": {
    id: "event-loop",
    title: "JavaScript Event Loop Animation & Visualizer",
    seoTitle: "JavaScript Event Loop Visualizer & Animation | JS Runtime Simulator",
    metaDescription: "Understand the JavaScript Event Loop visually. Simulate how the Call Stack, Web APIs, Microtask Queue, and Callback Queue interact under the hood.",
    keywords: ["event loop visualizer", "javascript event loop animation", "js event loop explained", "macrotasks vs microtasks", "call stack visualizer"],
    h1: "JavaScript Event Loop Simulator",
    subtitle: "Visualize how asynchronous JavaScript handles callbacks, promises, and timers without blocking the main execution thread.",
    introduction: "JavaScript is a single-threaded language, meaning it can only do one thing at a time. The Event Loop is the secret mechanism that allows JavaScript to perform non-blocking concurrent operations by offloading tasks to the browser environment.",
    explanationHtml: `
      <h2>The JavaScript Runtime Elements</h2>
      <p>To understand the event loop, you must observe four distinct runtime components:</p>
      <ul>
        <li><strong>Call Stack:</strong> Keeps track of the currently executing functions.</li>
        <li><strong>Web APIs:</strong> Browser threads handling asynchronous operations like <code>setTimeout</code>, fetch requests, or DOM event listeners.</li>
        <li><strong>Microtask Queue:</strong> A high-priority queue processing Promise callbacks (<code>.then</code>, <code>await</code> continuations) and MutationObserver tasks.</li>
        <li><strong>Callback (Macrotask) Queue:</strong> A queue processing timer callbacks (<code>setTimeout</code>, <code>setInterval</code>) and layout events.</li>
      </ul>

      <h2>How the Event Loop Coordinates Execution</h2>
      <p>1. The Event Loop continuously checks if the Call Stack is empty.</p>
      <p>2. If the stack is empty, it first processes all items in the <strong>Microtask Queue</strong> until it is completely drained.</p>
      <p>3. Once microtasks are clear, it takes the first job from the <strong>Macrotask Queue</strong> and pushes it to the Call Stack for execution.</p>
    `,
    sandboxCode: `console.log("1. Synchronous Start");
setTimeout(() => {
  console.log("3. Macro Task callback (setTimeout)");
}, 0);
Promise.resolve().then(() => {
  console.log("2. Micro Task callback (Promise)");
});
console.log("4. Synchronous End");`,
    faqs: [
      {
        question: "What is the difference between microtasks and macrotasks?",
        answer: "Microtasks include Promise callbacks, MutationObserver, and queueMicrotask jobs, and run immediately after the current call stack clears. Macrotasks include setTimeouts, setIntervals, and UI rendering, and execute one per event loop cycle."
      },
      {
        question: "Is the Event Loop part of the V8 JavaScript engine?",
        answer: "No, the Event Loop is part of the hosting environment (like Chrome browser Web APIs or Node.js libuv), not the core JavaScript engine itself."
      }
    ],
    related: ["promises", "async-await", "microtask-queue"]
  },

  "promises": {
    id: "promises",
    title: "JavaScript Promises Explained Visually",
    seoTitle: "JavaScript Promises Visualizer & Tutorial | Learn JS Asynchronous",
    metaDescription: "Step-by-step visual tutorial on JavaScript Promises. See how Promise states transition from pending to fulfilled or rejected inside the JavaScript engine.",
    keywords: ["javascript promises", "promise visualizer", "how promises work", "microtasks promise", "learn async javascript"],
    h1: "JavaScript Promises Visualized",
    subtitle: "Observe Promise creation, resolve cycles, and how `.then` handlers queue into the microtask execution pipeline.",
    introduction: "A Promise is an object representing the ultimate completion or failure of an asynchronous operation. It acts as a placeholder for a value that will become available in the future.",
    explanationHtml: `
      <h2>The Three States of a Promise</h2>
      <p>A JavaScript Promise exists in one of three mutually exclusive states:</p>
      <ul>
        <li><strong>Pending:</strong> The initial state. The async operation has started but has not resolved or rejected yet.</li>
        <li><strong>Fulfilled:</strong> The operation completed successfully, yielding a result value.</li>
        <li><strong>Rejected:</strong> The operation failed, returning an error object or reason.</li>
      </ul>
      
      <h2>How Promises Leverage the Microtask Queue</h2>
      <p>When a Promise resolves, its associated <code>.then()</code> callbacks are not run synchronously. Instead, they are packaged as jobs and placed directly into the <strong>Microtask Queue</strong>, waiting for the active synchronous code on the Call Stack to finish.</p>
    `,
    sandboxCode: `console.log("Creating Promise...");
const myPromise = new Promise((resolve) => {
  setTimeout(() => resolve("Promise Resolved Success!"), 50);
});
myPromise.then(val => console.log("Received:", val));
console.log("Promise pending...");`,
    faqs: [
      {
        question: "Are promises synchronous or asynchronous?",
        answer: "The executor function passed to a new Promise runs synchronously, but the resolution handlers (.then, .catch, .finally) are queued asynchronously in the microtask queue."
      },
      {
        question: "What is Promise chaining?",
        answer: "Promise chaining is a technique where multiple asynchronous operations are executed sequentially by returning a new Promise from each .then() handler, avoiding 'callback hell'."
      }
    ],
    related: ["event-loop", "async-await", "microtask-queue"]
  },

  "async-await": {
    id: "async-await",
    title: "JavaScript Async Await Visualizer",
    seoTitle: "JavaScript Async Await Visualizer & Debugger | Interactive JS",
    metaDescription: "Master async await visually. Step through async function suspension, await processing, and microtask continuation in real time.",
    keywords: ["async await visualizer", "javascript async await", "how async await works", "async callback queue", "learn promises"],
    h1: "JavaScript Async/Await Explained Visually",
    subtitle: "See how async functions suspend execution at 'await' and resume when promises settle behind the scenes.",
    introduction: "Async/await is syntactic sugar built on top of Promises, making asynchronous code look and behave more like synchronous code, improving readability and error handling.",
    explanationHtml: `
      <h2>The Magic of Suspending Execution</h2>
      <p>When the JavaScript compiler encounters the <code>async</code> keyword, it wraps the return value of that function in a Promise. When it hits an <code>await</code> statement:</p>
      <ol>
        <li>Execution of the async function is <strong>suspended</strong>.</li>
        <li>The function context is saved, and control is returned to the parent stack caller.</li>
        <li>The remaining body of the async function is queued as a microtask callback once the awaited promise settles.</li>
      </ol>
      <p>This allows other code to execute on the main thread while the promise is pending, ensuring a smooth, non-blocking UI experience.</p>
    `,
    sandboxCode: `async function fetchUser() {
  console.log("1. Inside async function - starts");
  const result = await Promise.resolve("User: Vansh");
  console.log("3. After await -", result);
  return result;
}
fetchUser();
console.log("2. Synchronous continues...");`,
    faqs: [
      {
        question: "Does await block the main thread?",
        answer: "No. 'await' only suspends execution inside that specific async function, allowing the browser main thread to continue rendering and executing other scripts."
      },
      {
        question: "How do you handle errors in async/await?",
        answer: "You wrap the awaited statements in standard 'try...catch' blocks, allowing clean synchronous-style error handling for asynchronous code."
      }
    ],
    related: ["promises", "event-loop", "microtask-queue"]
  },

  "hoisting": {
    id: "hoisting",
    title: "JavaScript Hoisting Visualized & Explained",
    seoTitle: "JavaScript Hoisting Visualizer | Memory allocation variables",
    metaDescription: "Learn JavaScript hoisting visually. Interactive debugging of variable and function allocation during compilation phase.",
    keywords: ["hoisting visualizer", "javascript hoisting explained", "var vs let hoisting", "function hoisting", "temporal dead zone"],
    h1: "JavaScript Hoisting Visualized",
    subtitle: "Observe memory allocation for variables, functions, and the Temporal Dead Zone (TDZ) in action.",
    introduction: "Hoisting is a behavior in JavaScript where variable and function declarations are moved to the top of their containing scope during the compilation phase, before execution begins.",
    explanationHtml: `
      <h2>The Compilation Phase vs Execution Phase</h2>
      <p>When the JavaScript engine compiles your script, it performs a first pass to allocate memory for variables and functions:</p>
      <ul>
        <li><strong>Function Declarations:</strong> Fully hoisted. The entire function body is stored in memory, allowing them to be called before declaration.</li>
        <li><strong>var Variables:</strong> Hoisted but initialized to <code>undefined</code>. Calling them early returns undefined.</li>
        <li><strong>let & const Variables:</strong> Hoisted but NOT initialized. They enter the <strong>Temporal Dead Zone (TDZ)</strong> until their actual declaration line is run, causing a ReferenceError if accessed early.</li>
      </ul>
    `,
    sandboxCode: `console.log("var value (hoisted):", hoistedVar);
var hoistedVar = "Hello World";
try {
  console.log(letVar);
} catch(e) {
  console.log("let/const hoisting throws:", e.message);
}
let letVar = "Not Hoisted";`,
    faqs: [
      {
        question: "What is the Temporal Dead Zone (TDZ)?",
        answer: "The TDZ is the period of execution from the start of the block scope until the variable declaration is initialized, during which let/const variables cannot be read or modified."
      },
      {
        question: "Are arrow functions hoisted?",
        answer: "Arrow functions declared with var, let, or const are hoisted as variables, not functions. If accessed early, they will be undefined (var) or in the TDZ (let/const), throwing an error."
      }
    ],
    related: ["execution-context", "scope-chain", "functions"]
  },

  "execution-context": {
    id: "execution-context",
    title: "JavaScript Execution Context Visualizer",
    seoTitle: "JavaScript Execution Context Visualizer | Learn JS Internals",
    metaDescription: "Understand JavaScript Execution Contexts visually. See how Global and Functional contexts are pushed and popped in the Call Stack.",
    keywords: ["javascript execution context", "execution context visualizer", "global execution context", "lexical environment js", "call stack"],
    h1: "JavaScript Execution Context Visualized",
    subtitle: "Examine scope blocks, Variable Environments, and this bindings created when running code.",
    introduction: "The Execution Context is an abstract environment created by the JavaScript engine to evaluate and execute code. It contains the environment record, scope chain, and 'this' binding.",
    explanationHtml: `
      <h2>Types of Execution Contexts</h2>
      <p>JavaScript creates three types of execution contexts:</p>
      <ol>
        <li><strong>Global Execution Context (GEC):</strong> The default, base context created when your script loads. It creates the global object (window/global) and binds <code>this</code>.</li>
        <li><strong>Functional Execution Context (FEC):</strong> Created every time a function is invoked. Each function has its own isolated context.</li>
        <li><strong>Eval Execution Context:</strong> Created when code runs inside an <code>eval()</code> call (rarely used).</li>
      </ol>
      <h2>Context Lifecycle</h2>
      <p>Each execution context undergoes two phases: the **Creation Phase** (setting up scope, allocation of variables, binding this) and the **Execution Phase** (running code line-by-line).</p>
    `,
    sandboxCode: `const globalVar = "Global";
function first() {
  const firstVar = "First Context";
  console.log("Executing first context...");
  second();
}
function second() {
  console.log("Executing second context...");
}
first();`,
    faqs: [
      {
        question: "What does an Execution Context contain?",
        answer: "It contains a Lexical Environment (Variable Environment, Environment Record, outer reference) and a 'this' binding pointing to the evaluation context."
      },
      {
        question: "How does the Call Stack track Execution Contexts?",
        answer: "The active context is always on top of the Call Stack. When a function executes, its context is pushed. When it returns, it is popped."
      }
    ],
    related: ["call-stack", "scope-chain", "hoisting"]
  },

  "call-stack": {
    id: "call-stack",
    title: "JavaScript Call Stack Visualizer & Simulator",
    seoTitle: "JavaScript Call Stack Visualizer | Stack Overflow Simulator",
    metaDescription: "Interactive Call Stack visualizer. Watch execution contexts push and pop in real time as JavaScript runs. Master function calls.",
    keywords: ["call stack visualizer", "javascript call stack", "push and pop stack", "stack overflow js", "execution context tracker"],
    h1: "JavaScript Call Stack Simulator",
    subtitle: "See how JavaScript handles nested function calls and tracks active subroutines in a LIFO stack.",
    introduction: "The Call Stack is a mechanism for the interpreter to keep track of its place in a script that calls multiple functions. It operates on a Last In, First Out (LIFO) basis.",
    explanationHtml: `
      <h2>How the Call Stack Works</h2>
      <p>When a JavaScript script runs:</p>
      <ol>
        <li>The Global Execution Context is pushed to the bottom of the Call Stack.</li>
        <li>When a function is called, the engine creates its Functional Execution Context and pushes it onto the stack.</li>
        <li>If that function calls another function, a new context is pushed to the top of the stack.</li>
        <li>When the top function finishes, its context is popped off, resuming execution of the underlying caller.</li>
      </ol>
      <h2>Stack Overflow</h2>
      <p>If nested function execution continues indefinitely (e.g. recursive calls without a base case), the Call Stack runs out of allocated memory, causing a <code>Maximum call stack size exceeded</code> error (Stack Overflow).</p>
    `,
    sandboxCode: `function multiply(a, b) {
  return a * b;
}
function square(n) {
  return multiply(n, n);
}
function printSquare(n) {
  const result = square(n);
  console.log("Result:", result);
}
printSquare(4);`,
    faqs: [
      {
        question: "What is LIFO in Call Stack?",
        answer: "LIFO stands for Last In, First Out. The function that was called last is processed first and popped off the stack before others."
      },
      {
        question: "Is JavaScript multithreaded?",
        answer: "No, JavaScript has a single Call Stack and is strictly single-threaded, executing one task at a time."
      }
    ],
    related: ["execution-context", "scope-chain", "event-loop"]
  },

  "scope-chain": {
    id: "scope-chain",
    title: "JavaScript Scope Chain Visualizer",
    seoTitle: "JavaScript Scope Chain Visualizer | Scope Lookup Simulator",
    metaDescription: "Master scope lookup in JavaScript. See how nested scopes resolve variables recursively through scope chains.",
    keywords: ["scope chain visualizer", "javascript scope chain", "lexical scope lookup", "global vs local scope", "closures scope"],
    h1: "JavaScript Scope Chain Visualized",
    subtitle: "Visualize how nested lexical environments lookup variable declarations when executing.",
    introduction: "Scope refers to the accessibility of variables. When a variable is used, JavaScript looks it up starting from the local execution context and moving outwards through parent scopes until it reaches the global scope.",
    explanationHtml: `
      <h2>The Lexical Environment Outer Reference</h2>
      <p>Every execution context has a reference to its outer Lexical Environment. This chain of outer references is called the <strong>Scope Chain</strong>. Scopes are defined by where functions are written in the codebase (lexical scope), not where they are executed.</p>
      
      <h2>Visualizing Scope Resolution</h2>
      <p>If you reference a variable <code>x</code> inside a nested function:</p>
      <ol>
        <li>Look in the local execution context's environment record.</li>
        <li>If not found, follow the outer reference to the parent environment record.</li>
        <li>Repeat until found, or reach the Global scope. If still not found, throw a <code>ReferenceError</code>.</li>
      </ol>
    `,
    sandboxCode: `const globalName = "Global Scope";
function outerScope() {
  const outerName = "Outer Scope";
  function innerScope() {
    const innerName = "Inner Scope";
    console.log("Inner:", innerName);
    console.log("Outer:", outerName);
    console.log("Global:", globalName);
  }
  innerScope();
}
outerScope();`,
    faqs: [
      {
        question: "What is Lexical Scope?",
        answer: "Lexical scope means that variable access is determined by the physical position of functions inside the source code, defined at compile time."
      },
      {
        question: "How does scope chain relate to closures?",
        answer: "Closures exist because the inner function retains a reference to its parent scope chain even after the parent function has terminated."
      }
    ],
    related: ["javascript-closures", "execution-context", "call-stack"]
  },

  "memory-heap": {
    id: "memory-heap",
    title: "JavaScript Memory Heap Visualizer",
    seoTitle: "JavaScript Memory Heap Visualizer | Garbage Collection Simulator",
    metaDescription: "Understand JavaScript memory management. Visualize variable allocation, object references, and garbage collection in the heap.",
    keywords: ["memory heap visualizer", "javascript memory heap", "garbage collection js", "object references heap", "memory allocation"],
    h1: "JavaScript Memory Heap Simulator",
    subtitle: "Watch reference types and arrays allocate in heap memory while primitive references remain in stack pointers.",
    introduction: "The Memory Heap is a large unstructured block of memory used by the JavaScript engine to allocate space for objects, arrays, and functions (reference types) whose sizes are dynamic and unknown at compile time.",
    explanationHtml: `
      <h2>Stack vs Heap Allocation</h2>
      <p>JavaScript uses two structures to store runtime variables:</p>
      <ul>
        <li><strong>Call Stack:</strong> Fast, structured storage for primitive values (strings, numbers, booleans) and memory pointers/addresses of objects.</li>
        <li><strong>Memory Heap:</strong> Large, unstructured memory space for objects, arrays, and functions. Pointers in the stack reference allocations in the heap.</li>
      </ul>
      <h2>Garbage Collection (GC)</h2>
      <p>The engine periodically runs a garbage collector (using the Mark-and-Sweep algorithm) to find objects that are no longer reachable from the root execution contexts and reclaim their heap memory space.</p>
    `,
    sandboxCode: `const person = {
  name: "Vansh",
  skills: ["JavaScript", "React"]
};
const secondRef = person;
secondRef.name = "Google Engineer";
console.log("Heap object modified:", person.name);`,
    faqs: [
      {
        question: "How does Mark-and-Sweep work?",
        answer: "The garbage collector starts from roots (global object, stack pointers), 'marks' all reachable objects, and then 'sweeps' away unmarked objects to free memory."
      },
      {
        question: "What causes a memory leak in JavaScript?",
        answer: "Memory leaks occur when references to unused objects are kept in memory (like accidental global variables, unresolved timers, or detached DOM nodes), preventing garbage collection."
      }
    ],
    related: ["execution-context", "javascript-closures", "objects"]
  },

  "microtask-queue": {
    id: "microtask-queue",
    title: "JavaScript Microtask Queue Visualizer",
    seoTitle: "JavaScript Microtask Queue Visualizer | Promise execution order",
    metaDescription: "Observe Promise scheduling in the Microtask Queue. Compare microtask execution priority vs macrotask timers in the event loop.",
    keywords: ["microtask queue visualizer", "javascript microtask queue", "promise microtasks", "queueMicrotask js", "event loop queue"],
    h1: "JavaScript Microtask Queue Simulator",
    subtitle: "Step through high-priority task queues handling settled promises and async continuations.",
    introduction: "The Microtask Queue is a separate, dedicated FIFO queue in the event loop that processes callback tasks with higher priority than the main Callback (Macrotask) Queue.",
    explanationHtml: `
      <h2>The Microtask Priority Rule</h2>
      <p>The Event Loop handles tasks according to a strict priority hierarchy:</p>
      <ol>
        <li>Execute synchronous code on the Call Stack.</li>
        <li>When the stack clears, process all jobs in the <strong>Microtask Queue</strong> one-by-one until the queue is completely empty.</li>
        <li>Only after microtasks are cleared, process a single task from the Callback/Macrotask Queue.</li>
      </ol>
      <p>If microtasks recursively queue more microtasks, they will block the macrotask queue indefinitely, freezing UI updates and timers.</p>
    `,
    sandboxCode: `console.log("Sync start");
Promise.resolve().then(() => console.log("Microtask 1"));
Promise.resolve().then(() => console.log("Microtask 2"));
setTimeout(() => console.log("Macrotask"), 0);
console.log("Sync end");`,
    faqs: [
      {
        question: "How can I manually add tasks to the microtask queue?",
        answer: "You can use the native 'queueMicrotask(() => { ... })' API to manually schedule a callback to run on the microtask queue."
      },
      {
        question: "Does the microtask queue block rendering?",
        answer: "Yes. The browser renders layout changes after the microtask queue is drained but before processing the next macrotask, so a long-running microtask loop blocks rendering."
      }
    ],
    related: ["event-loop", "promises", "async-await"]
  },

  "dom-events": {
    id: "dom-events",
    title: "JavaScript DOM Events & Capturing/Bubbling Visualizer",
    seoTitle: "DOM Events Capturing & Bubbling Visualizer | Learn JS events",
    metaDescription: "Understand event propagation visually. Simulate how events capture, target, and bubble through HTML element nodes.",
    keywords: ["dom events visualizer", "event delegation js", "event capturing and bubbling", "stopPropagation js", "learn dom interaction"],
    h1: "JavaScript DOM Events Visualized",
    subtitle: "Observe event propagation phases through document trees in a dynamic simulation.",
    introduction: "DOM Events represent user or system actions (like clicks, keypresses, or page loads). When an event fires, it propagates through the DOM tree in three consecutive phases.",
    explanationHtml: `
      <h2>The Three Phases of Event Propagation</h2>
      <p>When you trigger an event on a nested HTML node:</p>
      <ol>
        <li><strong>Capturing Phase:</strong> The event travels down from the window root through ancestors to the target element.</li>
        <li><strong>Target Phase:</strong> The event reaches the target node and triggers listeners attached directly to it.</li>
        <li><strong>Bubbling Phase:</strong> The event bubbles back up from the target element through ancestors to the window root.</li>
      </ol>
      <p>Use <code>event.stopPropagation()</code> to prevent the event from travelling further along the capture/bubble chain.</p>
    `,
    sandboxCode: `console.log("Registering Event Listeners...");
function simulateClick() {
  console.log("1. Event Capturing (window -> body)");
  console.log("2. Event Target (button clicked)");
  console.log("3. Event Bubbling (button -> body -> window)");
}
simulateClick();`,
    faqs: [
      {
        question: "What is Event Delegation?",
        answer: "Event delegation is a design pattern where you attach a single listener to a parent element to handle events bubbling up from dynamic child nodes."
      },
      {
        question: "How does stopPropagation differ from preventDefault?",
        answer: "stopPropagation halts the event's movement up or down the DOM tree, whereas preventDefault cancels the browser's default action (e.g. following a link or submitting a form)."
      }
    ],
    related: ["event-loop", "functions", "objects"]
  },

  "objects": {
    id: "objects",
    title: "JavaScript Objects & Prototype Delegation Visualized",
    seoTitle: "JavaScript Objects & Prototypes Visualizer | Learn JS OOP",
    metaDescription: "Understand JavaScript objects and inheritance chain visually. Inspect object structures, mutation, and prototype delegation.",
    keywords: ["javascript objects", "prototype delegation", "javascript oop visualizer", "object mutation heap", "learn prototypes js"],
    h1: "JavaScript Objects & Prototypes Explained Visually",
    subtitle: "Examine objects inside the Memory Heap, prototype chains, and property lookup delegation.",
    introduction: "In JavaScript, objects are reference types and key-value collections. Almost all objects inherit properties and methods from a prototype object, forming the prototype chain.",
    explanationHtml: `
      <h2>Prototypes and Inheritance</h2>
      <p>When you look up a property on an object, if it doesn't exist locally, JavaScript searches the object's prototype link (<code>__proto__</code>), traversing the prototype chain until it either finds the property or reaches the end (<code>null</code>).</p>
      <h2>Object Mutation and Freezing</h2>
      <p>Objects are mutable by default. You can use <code>Object.freeze(obj)</code> to prevent mutations, or <code>Object.seal(obj)</code> to block adding/removing properties while permitting modification of existing ones.</p>
    `,
    sandboxCode: `const user = {
  username: "antigravity",
  role: "AI Coding Assistant",
  greet() {
    console.log("Hello, I am " + this.username);
  }
};
user.greet();
console.log("Object keys:", Object.keys(user));`,
    faqs: [
      {
        question: "What is a prototype in JavaScript?",
        answer: "A prototype is a template object from which another object inherits methods and properties. It enables prototype-based inheritance."
      },
      {
        question: "What is the difference between shallow copy and deep copy?",
        answer: "A shallow copy copies top-level properties but retains references to nested objects, whereas a deep copy creates duplicate copies of all nested values."
      }
    ],
    related: ["memory-heap", "arrays", "functions"]
  },

  "arrays": {
    id: "arrays",
    title: "JavaScript Arrays Under the Hood Visualizer",
    seoTitle: "JavaScript Arrays Visualizer & Tutorial | Learn Functional methods",
    metaDescription: "Interactive tutorial on JavaScript array allocation. Observe filter, map, and reduce actions modify heap references step-by-step.",
    keywords: ["javascript arrays", "array map filter reduce", "arrays heap memory", "functional array methods", "learn arrays js"],
    h1: "JavaScript Arrays Explained Visually",
    subtitle: "Simulate functional array methods and understand memory updates for reference data lists.",
    introduction: "Arrays in JavaScript are special objects with numerical keys and a dynamic length property, allocated in heap memory. They come with powerful built-in methods for data transformation.",
    explanationHtml: `
      <h2>Functional Array Methods</h2>
      <p>Functional programming arrays utilize pure methods that return new instances instead of mutating original arrays:</p>
      <ul>
        <li><code>map()</code>: Transforms each element, returning a new array of matching length.</li>
        <li><code>filter()</code>: Returns a new subset array containing elements that pass a logical check.</li>
        <li><code>reduce()</code>: Accumulates array values down to a single output value (object, array, number).</li>
      </ul>
    `,
    sandboxCode: `const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(x => x * x);
console.log("Original array:", numbers);
console.log("Squared array:", squared);
console.log("Filtered odds:", numbers.filter(x => x % 2 !== 0));`,
    faqs: [
      {
        question: "Are JavaScript arrays stored continuously in memory?",
        answer: "Unlike traditional languages, JavaScript arrays are objects and can be sparse/fragmented, though modern V8 engines optimize continuous index arrays internally."
      },
      {
        question: "Which array methods mutate the original array?",
        answer: "Methods like push, pop, shift, unshift, splice, sort, and reverse mutate the original array. Map, filter, concat, and slice return fresh copies."
      }
    ],
    related: ["objects", "memory-heap", "functions"]
  },

  "functions": {
    id: "functions",
    title: "JavaScript Functions & Execution Internals Visualizer",
    seoTitle: "JavaScript Functions Visualizer | Execution Context & Scope",
    metaDescription: "Master JavaScript functions visually. Compare declarations, arrow functions, execution context boundaries, and scopes.",
    keywords: ["javascript functions", "arrow vs normal function", "first class citizen js", "lexical scope functions", "call stack"],
    h1: "JavaScript Functions Visualized",
    subtitle: "Watch function definitions compile, allocate scopes, and push contexts onto the active Call Stack.",
    introduction: "Functions are block modules of reusable instructions. In JavaScript, functions are first-class objects, meaning they can be stored in variables, passed as arguments, and returned from other functions.",
    explanationHtml: `
      <h2>Function Declarations vs Arrow Functions</h2>
      <p>Understanding function invocation behavior depends on how they are defined:</p>
      <ul>
        <li><strong>Function Declarations:</strong> Hoisted completely. They have their own dynamic <code>this</code> context bound to their caller.</li>
        <li><strong>Arrow Functions:</strong> Not hoisted. They do not bind their own <code>this</code> context; instead, they lexically inherit the <code>this</code> binding of their enclosing context.</li>
      </ul>
    `,
    sandboxCode: `function normalFunc() {
  console.log("Normal function context:", typeof this);
}
const arrowFunc = () => {
  console.log("Arrow function inherits parent 'this'");
};
normalFunc();
arrowFunc();`,
    faqs: [
      {
        question: "What does it mean for functions to be first-class?",
        answer: "It means functions are treated like any other variable. They can be assigned to objects, passed as function parameters, and returned from functions."
      },
      {
        question: "What are Higher-Order Functions?",
        answer: "A Higher-Order Function is a function that receives another function as an argument, returns a function, or both (e.g. map, filter, setTimeout)."
      }
    ],
    related: ["javascript-closures", "execution-context", "hoisting"]
  }
};
