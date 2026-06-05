import { Clock, Sparkles, Compass, Layers } from 'lucide-react';

export const CHAPTERS_DATA = [
  {
    id: 'intro-exists',
    title: 'Why JavaScript Exists',
    heading: 'Why JavaScript Exists',
    subtitle: 'The historical battle of Netscape, Sun, and Microsoft and the language born in 10 days.',
    badges: [
      { icon: Clock, text: '18 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'History', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Beginner', color: 'text-space-yellow' },
      { icon: Layers, text: 'Fundamental', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. The Web Was Born Static & Dead',
          paragraphs: [
            "In the early 1990s, the web was a text-only publishing platform. Hypertext Markup Language (HTML) could display structured documents, headers, and hyperlinks, but had zero capability to run client-side compute. Every single user interaction—submitting a form, checking password constraints, or calculating currency conversions—required a full HTTP request-response cycle.",
            "This meant that if a user omitted a character in an email form field, the request traveled across a slow 14.4k modem to a remote web server. The server would parse the invalid data, render an entirely new HTML document indicating the error, and transmit it back to the client. This architectural constraint created massive server overhead and a frustrating, sluggish experience for users."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Static Brochure Analogy',
          text: 'Imagine entering a store where the catalog is a printed binder (static HTML). If you want to know if a product is in stock, you have to write your query on a slip of paper and mail it to a central mailroom (the server). The assistant sitting next to you (JavaScript) can answer your query instantly, right there at the table, without any delays.'
        },
        {
          type: 'text',
          heading: '2. Netscape, Sun, and the birth of Mocha',
          paragraphs: [
            "In 1995, Netscape Communications, the creator of the popular Navigator browser, recognized that the web needed to become dynamic. They had two competing philosophies: integrate Java (a heavy, compile-once programming language developed by Sun Microsystems) via browser plugins, or build a lightweight scripting language specifically designed for designers and amateurs that could run directly in the HTML markup.",
            "Netscape hired Brendan Eich to design and build this lightweight scripting language. Under extreme pressure due to the imminent release of Netscape Navigator 2.0, Brendan famously conceptualized, designed, and implemented the prototype of this language in just 10 days in May 1995. Originally codenamed **Mocha**, it was briefly renamed **LiveScript** before marketing coordinators finally settled on **JavaScript** to ride Java's immense popularity waves."
          ]
        },
        {
          type: 'quote',
          text: '“JavaScript was not built to compete with Java; it was built to glue HTML together.” — Brendan Eich'
        },
        {
          type: 'text',
          heading: '3. Microsoft and the JScript Browser Wars',
          paragraphs: [
            "When Netscape launched JavaScript, it immediately took off. Sensing a threat, Microsoft reverse-engineered the interpreter and released its own version called **JScript** in Internet Explorer 3.0 in 1996. Because JScript differed in minor details, developers were forced to write separate versions of code for different browsers, leading to the infamous \"Best viewed in Internet Explorer\" era.",
            "To prevent Microsoft from capturing and fracturing the language specifications, Netscape submitted JavaScript to **ECMA International** (a standards organization) in late 1996. This resulted in the official standardization of the language under the name **ECMAScript** (governed by the ECMA-262 specification) in 1997, ensuring that JavaScript would remain an open, cross-platform standard."
          ]
        }
      ]
    },
    summary: 'JavaScript was created in May 1995 by Brendan Eich at Netscape. Designed under tight deadlines as a "glue language" to make HTML pages interactive, it was submitted to ECMA for standardization in 1996 to prevent Microsoft from fracturing the language with JScript. It is now standardized under ECMAScript.',
    codeHtml: `<span class="code-comment">// Brendan Eich's original dynamic design vision</span>
<span class="code-keyword">const</span> <span class="code-variable">clientState</span> <span class="code-operator">=</span> {
  <span class="code-variable">browser</span>: <span class="code-string">"Netscape Navigator"</span>,
  <span class="code-variable">supportsScripting</span>: <span class="code-keyword">true</span>
};

<span class="code-keyword">function</span> <span class="code-function">initializeLiveScript</span>(<span class="code-variable">state</span>) {
  <span class="code-keyword">if</span> (<span class="code-variable">state</span>.<span class="code-variable">supportsScripting</span>) {
    <span class="code-keyword">return</span> <span class="code-string">"Dynamic client interaction enabled!"</span>;
  }
  <span class="code-keyword">return</span> <span class="code-string">"Static document fallback."</span>;
}
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-function">initializeLiveScript</span>(<span class="code-variable">clientState</span>));`,
    sandboxCode: `// Try modifying this historic mockup
const year = 1995;
const creator = "Brendan Eich";
let languageName = "Mocha";

if (year === 1995) {
  languageName = "JavaScript";
  console.log(\`In \${year}, \${creator} designed the prototype of \${languageName}!\`);
} else {
  console.log("Modern ECMAScript era.");
}
`,
    quiz: {
      question: 'Why did Netscape submit JavaScript to ECMA International for standardization in 1996?',
      options: [
        'To speed up compiler execution times in browser engines.',
        'To prevent proprietary fracturing of the language by Microsoft\'s JScript.',
        'Because Java developers demanded classes and types in the browser.',
        'To replace HTML entirely with a binary scripting module.'
      ],
      answerIdx: 1,
      explanation: 'Netscape submitted JavaScript to ECMA in 1996 to create an open industry standard (ECMAScript) and prevent Microsoft from fragmenting the web with JScript.'
    },
    references: [
      { name: 'MDN Web Docs: A Brief History of JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/About_JavaScript' },
      { name: 'ECMA International History', url: 'https://www.ecma-international.org/' }
    ]
  },
  {
    id: 'browser-env',
    title: 'The Browser Environment',
    heading: 'The Browser Environment',
    subtitle: 'Understanding the browser host platform, window execution scopes, and security sandboxes.',
    badges: [
      { icon: Clock, text: '12 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Runtime Platform', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Beginner', color: 'text-space-yellow' },
      { icon: Layers, text: 'Host API', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. The Host Environment vs. Language Engine',
          paragraphs: [
            "A common misconception is that JavaScript is natively capable of rendering graphics, making HTTP requests, or printing logs. In reality, core ECMAScript has no specifications for network connections, user interfaces, or file systems. It only defines rules for logic, loops, data types, and functions.",
            "To do anything useful, the JavaScript engine (like Google's V8 or Apple's JavaScriptCore) must reside inside a **host environment**. In the browser, this host environment embeds the compiler and exposes platform-specific hooks called **Web APIs** (such as the Document Object Model, fetch, or geolocation) which the engine can call."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Brain and Body Analogy',
          text: 'The JavaScript engine (V8) is like a brain. The brain is excellent at logical computations and decisions. However, a brain floating in a jar cannot interact with the physical world. The browser host environment is the body: it provides the limbs (DOM), sensory organs (Fetch/Websockets), and vocal chords (console.log) that the brain controls.'
        },
        {
          type: 'text',
          heading: '2. The Global Window Object',
          paragraphs: [
            "In a browser runtime, the global scope is represented by the `window` object. Any variable declared with `var` or functions declared in the global scope are attached directly as properties of `window`.",
            "Through the `window` object, JavaScript gains access to the browser layout tree. For example, `window.document` represents the DOM, `window.localStorage` provides key-value data persistence, and `window.setTimeout` invokes the browser's hardware-aligned clock timer cycles."
          ]
        },
        {
          type: 'text',
          heading: '3. Security Sandboxing Constraints',
          paragraphs: [
            "Because browsers load scripts from arbitrary websites, the browser environment runs JavaScript inside a highly restricted security sandbox. Scripts cannot access local files (`C:\\` or `/etc`), read system memory allocations, or execute raw terminal commands.",
            "This sandbox prevents malware from stealing private details from your machine while permitting safe interactive graphics and remote API calls through strict Cross-Origin Resource Sharing (CORS) rules."
          ]
        }
      ]
    },
    summary: 'The browser environment hosts the JavaScript engine and provides Web APIs (DOM, fetch, timers) which are exposed on the global window object. A security sandbox isolates the runtime from the local client file system.',
    codeHtml: `<span class="code-comment">// Interacting with the browser host environment APIs</span>
<span class="code-keyword">const</span> <span class="code-variable">viewportWidth</span> <span class="code-operator">=</span> <span class="code-variable">window</span>.<span class="code-variable">innerWidth</span>;
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"Screen width:"</span>, <span class="code-variable">viewportWidth</span>);

<span class="code-comment">// Attempting sandboxed file access (will fail)</span>
<span class="code-keyword">try</span> {
  <span class="code-variable">window</span>.<span class="code-variable">sys</span>.<span class="code-function">readFile</span>(<span class="code-string">"/etc/passwd"</span>);
} <span class="code-keyword">catch</span> (<span class="code-variable">err</span>) {
  <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"Sandbox blocked filesystem access!"</span>);
}`,
    sandboxCode: `// Log browser metadata to verify Web API visibility
console.log("Global window object available:", typeof window !== "undefined");
console.log("User agent:", navigator.userAgent);
console.log("Current URL:", window.location.href);
`,
    quiz: {
      question: 'Which of the following is NOT part of the core ECMAScript specification, but is provided by the browser host environment?',
      options: [
        'Array declaration syntax and methods (push, map).',
        'Variables declared with const and let.',
        'The fetch API (window.fetch) used for network requests.',
        'For-in and for-of loops.'
      ],
      answerIdx: 2,
      explanation: 'The fetch API is a Web API provided by the browser host environment. ECMAScript only standardizes language syntax, variables, types, and prototypes.'
    },
    references: [
      { name: 'MDN Web Docs: Browser API reference', url: 'https://developer.mozilla.org/en-US/docs/Web/API' },
      { name: 'W3C Web Specifications', url: 'https://www.w3.org/TR/' }
    ]
  },
  {
    id: 'how-works',
    title: 'How JS Works',
    heading: 'How JS Works Under the Hood',
    subtitle: 'Exploring JIT compilation, Call Stacks, Memory Heaps, and the Event Loop.',
    badges: [
      { icon: Clock, text: '20 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Under the Hood', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Intermediate', color: 'text-space-yellow' },
      { icon: Layers, text: 'Engine Internals', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. V8 Engine and JIT Compilation',
          paragraphs: [
            "Modern JavaScript engines, such as Google's V8 (used in Chrome and Node.js), do not compile code ahead of time (AOT) like C++, nor do they interpret it line-by-line. Instead, they use **Just-In-Time (JIT) Compilation**.",
            "V8 parses JavaScript source code into an **Abstract Syntax Tree (AST)**. The interpreter, named **Ignition**, reads the AST and generates fast bytecode. As the code executes, V8 monitors which functions are run frequently (\"hot functions\"). It passes this profiling data to the optimizing compiler, named **TurboFan**, which recompiles that bytecode directly into optimized machine code for maximum performance."
          ]
        },
        {
          type: 'text',
          heading: '2. Call Stack & Memory Heap',
          paragraphs: [
            "The JavaScript engine utilizes two main memory segments during runtime:",
            "1. **Memory Heap**: An unstructured memory region used for dynamic memory allocation. Large, complex objects, arrays, and functions are stored here.",
            "2. **Call Stack**: A structured, fast memory space that tracks function calls and local variables. It follows the Last-In, First-Out (LIFO) model. Whenever a function is invoked, an execution context frame is pushed onto the stack. When the function finishes, its frame is popped."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Plates and Warehouse Analogy',
          text: 'The Call Stack is like a stack of dinner plates (LIFO). You can only add (push) or remove (pop) a plate from the top. The Memory Heap is like a massive warehouse with items scattered around. To access a warehouse item from your plate, your plate frame simply holds a label showing the exact warehouse locker number (heap memory address reference).'
        },
        {
          type: 'text',
          heading: '3. Single-Threading and the Event Loop',
          paragraphs: [
            "JavaScript is single-threaded, meaning it has only one Call Stack and can execute only one instruction at a time. If a function blocks the stack (e.g. by running an infinite loop), the browser UI freezes.",
            "To handle asynchronous tasks, the engine works with the browser's **Event Loop**. When an asynchronous API (like `setTimeout`) is called, the task is handed over to the browser's timer thread. Once completed, the browser pushes the callback function into the **Callback Queue** (also known as the Task Queue).",
            "The **Event Loop** constantly checks if the Call Stack is empty. When it is, it pulls the first callback from the queue and pushes it onto the Call Stack for execution. Promises and async/await use a separate **Microtask Queue**, which has absolute priority over the Macrotask Queue (timers and UI renders)."
          ]
        }
      ]
    },
    summary: 'The V8 engine parses code into an AST and compiles it using JIT (Ignition interpreter and TurboFan optimizer). Call execution context is managed via a single-threaded Call Stack, while objects reside in the Memory Heap. Asynchronous callbacks are scheduled in queues and managed by the Event Loop.',
    codeHtml: `<span class="code-comment">// Tracing Call Stack and Event Loop execution order</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"1. Start"</span>);

<span class="code-variable">setTimeout</span>(() <span class="code-operator">=&gt;</span> {
  <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"3. Timer (Macrotask)"</span>);
}, <span class="code-number">0</span>);

<span class="code-variable">Promise</span>.<span class="code-function">resolve</span>().<span class="code-function">then</span>(() <span class="code-operator">=&gt;</span> {
  <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"4. Promise (Microtask)"</span>);
});

<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"2. End"</span>);
<span class="code-comment">// Logs print: "1. Start", "2. End", "4. Promise", "3. Timer"</span>`,
    sandboxCode: `// Trace execution order in this async sequence
console.log("Synchronous Begin");

setTimeout(() => {
  console.log("Timer fired (Macrotask)");
}, 100);

Promise.resolve().then(() => {
  console.log("Promise resolved (Microtask)");
});

console.log("Synchronous End");
`,
    quiz: {
      question: 'Why does a Promise callback (Microtask) execute before a setTimeout callback (Macrotask) even if the timer duration is 0?',
      options: [
        'Promises run on a separate background thread in the CPU.',
        'The Event Loop clears the entire Microtask Queue before moving to the next task in the Macrotask Queue.',
        'setTimeout callbacks bypass the Call Stack entirely.',
        'Microtasks are stored directly inside the Memory Heap instead of queues.'
      ],
      answerIdx: 1,
      explanation: 'The Event Loop specification states that the Microtask Queue has higher priority and must be completely exhausted after every execution step before V8 takes the next task from the Macrotask Queue.'
    },
    references: [
      { name: 'MDN: Concurrency Model and the Event Loop', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop' },
      { name: 'HTML Spec: Event Loops and Task Queues', url: 'https://html.spec.whatwg.org/multipage/webappapis.html#event-loops' }
    ]
  },
  {
    id: 'standards',
    title: 'ECMAScript & Standards',
    heading: 'ECMAScript & TC39 Standards',
    subtitle: 'How TC39 develops specifications, manages stages, and ensures backward compatibility.',
    badges: [
      { icon: Clock, text: '12 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Standards', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Beginner', color: 'text-space-yellow' },
      { icon: Layers, text: 'Governance', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. ECMAScript vs. JavaScript',
          paragraphs: [
            "ECMAScript is the formal scripting standard defined by Ecma International in the **ECMA-262** specification. JavaScript is the concrete programming language that implements this specification.",
            "You can think of ECMAScript as the formal design blueprint and ruleset, while JavaScript is the actual house constructed by browser vendors. Other languages, like ActionScript or JScript, also implemented ECMAScript blueprints historically."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Blueprint and Building Analogy',
          text: 'Imagine a global board of architects drawing up blueprints for a standard smart home (ECMAScript specifications). Different construction companies read these blueprints and build actual physical homes (Chrome V8 engine, Firefox SpiderMonkey engine). They might add custom furniture (Web APIs), but the structural layout matches the blueprints exactly.'
        },
        {
          type: 'text',
          heading: '2. The TC39 Committee and Proposal Stages',
          paragraphs: [
            "The Technical Committee 39 (TC39) is the group of browser developers, industry experts, and language researchers responsible for upgrading the ECMAScript standard. Features undergo a strict 5-stage progress lifecycle:",
            "- **Stage 0 (Strawperson)**: An initial idea presented by a TC39 member.",
            "- **Stage 1 (Proposal)**: Explores the problem space. Requires a champion and initial syntax suggestions.",
            "- **Stage 2 (Draft)**: Standardizes the API shape and writes draft specification text.",
            "- **Stage 3 (Candidate)**: Specification is complete. Browser engines implement the feature to test for real-world bugs.",
            "- **Stage 4 (Finished)**: Feature is fully validated and officially added to the upcoming annual ECMAScript snapshot release."
          ]
        },
        {
          type: 'text',
          heading: '3. Backward Compatibility and Transpilation',
          paragraphs: [
            "One of the sacred tenets of TC39 is: \"Don't break the web.\" Code written in 1995 must run in modern browsers. Features are rarely deleted, which forces new specifications to adopt unique, sometimes complex designs to avoid collisions.",
            "To use cutting-edge Stage 3 features in older browsers, compilers like **Babel** or **SWC** transpile modern JavaScript down to older, widely-supported ES5 syntax, while **polyfills** recreate missing standard library functions (like Promise or Array.prototype.includes) in the global namespace."
          ]
        }
      ]
    },
    summary: 'ECMAScript is the official blueprint specification standardized under ECMA-262. The TC39 committee upgrades this standard yearly using a rigorous 5-stage proposal pipeline, guaranteeing absolute backward-compatibility.',
    codeHtml: `<span class="code-comment">// Modern ES6+ destructuring and spread syntax</span>
<span class="code-keyword">const</span> <span class="code-variable">defaults</span> <span class="code-operator">=</span> { <span class="code-variable">theme</span>: <span class="code-string">"dark"</span>, <span class="code-variable">notifications</span>: <span class="code-keyword">true</span> };
<span class="code-keyword">const</span> <span class="code-variable">userPreferences</span> <span class="code-operator">=</span> { <span class="code-variable">theme</span>: <span class="code-string">"light"</span> };

<span class="code-comment">// Spread operator merged at compile time (Stage 4 finished feature)</span>
<span class="code-keyword">const</span> <span class="code-variable">config</span> <span class="code-operator">=</span> { ...<span class="code-variable">defaults</span>, ...<span class="code-variable">userPreferences</span> };
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">config</span>.<span class="code-variable">theme</span>); <span class="code-comment">// "light"</span>`,
    sandboxCode: `// Validate modern ECMAScript features in the current runtime
const original = { id: 101, tags: ["js", "esnext"] };
const shallowCopy = { ...original };

console.log("Are objects distinct references?", original !== shallowCopy);
console.log("Are nested arrays pointing to the same memory?", original.tags === shallowCopy.tags);
`,
    quiz: {
      question: 'Which TC39 proposal stage signifies that a feature is fully standardized and ready for the next annual ECMAScript release?',
      options: [
        'Stage 1 (Proposal)',
        'Stage 2 (Draft)',
        'Stage 3 (Candidate)',
        'Stage 4 (Finished)'
      ],
      answerIdx: 3,
      explanation: 'Once a proposal reaches Stage 4 (Finished), it has met all testing and implementation criteria in multiple major engines and is scheduled for the next annual ECMAScript specification update.'
    },
    references: [
      { name: 'TC39 Official Website & Proposals Tracker', url: 'https://tc39.es/' },
      { name: 'ECMA-262 Specification Document', url: 'https://tc39.es/ecma262/' }
    ]
  },
  {
    id: 'data-primitives',
    title: 'Primitives vs Objects',
    heading: 'Memory Management: Primitives vs Objects',
    subtitle: 'Deep-dive into Stack and Heap memory allocations and why variables hold references for objects.',
    badges: [
      { icon: Clock, text: '15 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Memory Model', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Beginner', color: 'text-space-yellow' },
      { icon: Layers, text: 'Core Mechanics', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. Stack Memory and Primitive Types',
          paragraphs: [
            "JavaScript classifies values into two categories: **Primitives** and **Objects**. The difference lies in how they are stored in computer memory.",
            "There are exactly 7 primitive types: `Number`, `String`, `Boolean`, `null`, `undefined`, `Symbol`, and `BigInt`.",
            "Primitives are stored directly inside **Stack Memory**. The stack is a highly organized, fast, fixed-size data structure. When you declare a primitive, the engine allocates a slot in the active stack frame to store its literal value. Because stack slots are fixed, primitive values are **immutable**—you cannot change a primitive; any modification creates a new value in a new stack slot."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Cash Coins vs. Safety Deposit Boxes Analogy',
          text: 'Primitives are like cash coins in your pocket. If you want to give a coin to a friend, you copy it (give them a physical copy). You both hold independent values. Objects are like safety deposit boxes in a bank vault (the Heap). The variable in your pocket (the Stack) does not hold the box; it holds the metal key (memory pointer address). If you copy the key for a friend, you both have access to the exact same vault box. If they change the box contents, you see the change immediately.'
        },
        {
          type: 'text',
          heading: '2. Heap Memory and Reference Types',
          paragraphs: [
            "Objects, Arrays, and Functions are dynamic structures. They can shrink, grow, and hold arbitrary properties, which means their sizes cannot be predicted at compile time. Thus, they cannot reside in fixed-size stack slots.",
            "Instead, the engine stores them in the **Memory Heap**—a massive, unstructured pool of memory. When you create an object, V8 allocates heap space for its contents and stores the memory address (a pointer) in the stack slot associated with your variable.",
            "When you assign an object to another variable, JavaScript **copies the reference pointer**, not the object itself. Both variables now point to the exact same memory address in the heap."
          ]
        },
        {
          type: 'quote',
          text: '“In JavaScript, primitives are passed by value, whereas objects are passed by reference.”'
        }
      ]
    },
    summary: 'Primitives are stored on the Stack and copied by value. Objects reside in the Heap and are copied by reference pointer address. Primitives are immutable, while objects are mutable.',
    codeHtml: `<span class="code-comment">// Primitives copy literal value</span>
<span class="code-keyword">let</span> <span class="code-variable">originalNum</span> <span class="code-operator">=</span> <span class="code-number">10</span>;
<span class="code-keyword">let</span> <span class="code-variable">copiedNum</span> <span class="code-operator">=</span> <span class="code-variable">originalNum</span>;
<span class="code-variable">copiedNum</span> <span class="code-operator">=</span> <span class="code-number">20</span>;
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">originalNum</span>); <span class="code-comment">// 10 (Independent stack slots)</span>

<span class="code-comment">// Objects copy reference pointer</span>
<span class="code-keyword">const</span> <span class="code-variable">originalObj</span> <span class="code-operator">=</span> { <span class="code-variable">active</span>: <span class="code-keyword">true</span> };
<span class="code-keyword">const</span> <span class="code-variable">copiedObj</span> <span class="code-operator">=</span> <span class="code-variable">originalObj</span>;
<span class="code-variable">copiedObj</span>.<span class="code-variable">active</span> <span class="code-operator">=</span> <span class="code-keyword">false</span>;
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">originalObj</span>.<span class="code-variable">active</span>); <span class="code-comment">// false (Shared heap address)</span>`,
    sandboxCode: `// Modify properties to test stack vs heap pointers
let username = "Vansh";
let copyOfUsername = username;
copyOfUsername = "Vansh Khubchandani";

console.log("Original primitive username:", username); // Did it change?

const profile = { username: "Vansh" };
const copyOfProfile = profile;
copyOfProfile.username = "Vansh Khubchandani";

console.log("Original object username property:", profile.username); // Did it change?
`,
    quiz: {
      question: 'What is copied when you assign one object to another variable (e.g., let b = a)?',
      options: [
        'A complete deep copy of the object properties in heap memory.',
        'The literal properties of the object onto the stack.',
        'The reference pointer address pointing to the heap memory location.',
        'Nothing; it throws a reference validation error.'
      ],
      answerIdx: 2,
      explanation: 'Assigning one object variable to another copies the heap reference pointer address. Both stack slots now point to the same object in the heap.'
    },
    references: [
      { name: 'MDN: JavaScript data types and structures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures' },
      { name: 'V8 Memory Management Explained', url: 'https://v8.dev/blog/garbage-collection-control' }
    ]
  },
  {
    id: 'data-coercion',
    title: 'Type Coercion & Truthiness',
    heading: 'Type Coercion & Truthiness Heuristics',
    subtitle: 'Demystifying implicit type conversions and how JavaScript evaluates conditions.',
    badges: [
      { icon: Clock, text: '15 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Coercion', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Beginner', color: 'text-space-yellow' },
      { icon: Layers, text: 'Runtime Rules', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. Explicit vs. Implicit Coercion',
          paragraphs: [
            "JavaScript is a dynamically and weakly typed language. Variable declarations are not bound to a specific type, and operations involving mismatched types are resolved automatically through a process called **coercion**.",
            "1. **Explicit Coercion**: When the developer deliberately casts a value to a different type (e.g. `String(100)` or `Number('42')`).",
            "2. **Implicit Coercion**: When the JavaScript engine automatically converts a value behind the scenes to make an operation valid (e.g. `console.log(10 + 'px')` outputs `'10px'` because the number `10` is coerced to a string)."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Customs Translator Analogy',
          text: 'Imagine crossing a border where you and the guard speak different languages (types). A friendly customs translator (implicit coercion) sits between you. If you show a dollar bill ($5) and a sign saying "+ dollars", the translator converts your value to dollars. If you show a bill and a sign saying "+ text", the translator converts your money into a word description and merges them together.'
        },
        {
          type: 'text',
          heading: '2. abstract Coercion Rules: The Plus (+) Trap',
          paragraphs: [
            "To resolve implicit coercion, the engine implements internal abstract algorithms defined in the ECMA-262 specification, such as `ToPrimitive`, `ToNumber`, and `ToString`.",
            "A notable quirk is the addition (+) operator. It is overloaded to perform both addition and string concatenation. If either operand is a string, it triggers string concatenation and coerces the other operand to a string.",
            "Conversely, subtraction (-), multiplication (*), and division (/) have only mathematical definitions. If they encounter strings, they coerce them to numbers (using the `ToNumber` abstract operation). If casting fails, they return `NaN`."
          ]
        },
        {
          type: 'text',
          heading: '3. Truthiness and the 8 Falsy Values',
          paragraphs: [
            "In conditional statements (like `if` statements), values are coerced to booleans using the `ToBoolean` abstract operation.",
            "To master JavaScript logic, you only need to memorize the exactly **8 falsy values** that evaluate to `false`:",
            "1. `false`, 2. `0`, 3. `-0`, 4. `0n` (BigInt zero), 5. `\"\"` (empty string), 6. `null`, 7. `undefined`, 8. `NaN`.",
            "Everything else evaluates to `true`, including empty arrays `[]` and empty objects `{}`. This is a common source of bugs!"
          ]
        }
      ]
    },
    summary: 'Type coercion is the conversion of values from one data type to another, either explicitly or implicitly. The plus (+) operator behaves differently from math operators, forcing string conversion. There are exactly 8 falsy values in JS; empty collections like [] are truthy.',
    codeHtml: `<span class="code-comment">// Addition vs. Subtraction Coercion</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"10"</span> <span class="code-operator">+</span> <span class="code-number">5</span>);  <span class="code-comment">// "105" (String)</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"10"</span> <span class="code-operator">-</span> <span class="code-number">5</span>);  <span class="code-comment">// 5 (Number)</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"10"</span> <span class="code-operator">*</span> <span class="code-string">"2"</span>); <span class="code-comment">// 20 (Number)</span>

<span class="code-comment">// Truthiness check</span>
<span class="code-keyword">if</span> ([]) {
  <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"Empty arrays are truthy!"</span>); <span class="code-comment">// Prints!</span>
}`,
    sandboxCode: `// Experiment with implicit coercion and truthiness
console.log("'5' + 5 + 5 =", "5" + 5 + 5);
console.log("5 + 5 + '5' =", 5 + 5 + "5");

console.log("Boolean([]):", Boolean([]));
console.log("Boolean(''):", Boolean(''));
console.log("Boolean(0):", Boolean(0));
`,
    quiz: {
      question: 'Which of the following expressions evaluates to the string "102"?',
      options: [
        '10 + 2',
        '"10" + 2',
        '"10" - 2',
        'Number("10") + 2'
      ],
      answerIdx: 1,
      explanation: 'Because the left operand is the string "10" and the operator is +, JavaScript coerces the number 2 to a string and concatenates them, producing "102".'
    },
    references: [
      { name: 'MDN Web Docs: Type Coercion Glossary', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion' },
      { name: 'ECMAScript Abstract Operations', url: 'https://tc39.es/ecma262/#sec-abstract-operations' }
    ]
  },
  {
    id: 'ops-arithmetic',
    title: 'Arithmetic & Type Casting',
    heading: 'Arithmetic Operators and Casting',
    subtitle: 'Precedence hierarchies, left-to-right evaluation orders, and explicit type casting.',
    badges: [
      { icon: Clock, text: '12 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Operators', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Beginner', color: 'text-space-yellow' },
      { icon: Layers, text: 'Precedence', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. Operator Precedence and Associativity',
          paragraphs: [
            "When evaluating complex mathematical statements, JavaScript relies on **Operator Precedence** to determine which operations are executed first. This matches standard mathematical order of operations (e.g. multiplication occurs before addition).",
            "When operators have the same precedence, the engine evaluates them using **Associativity**. Most arithmetic operators are **left-associative** (evaluated from left to right). Assignment (`=`) and exponentiation (`**`) are **right-associative** (evaluated from right to left)."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Math Order of Operations Analogy',
          text: 'Operator precedence works exactly like a standard calculator obeying mathematical rules (PEMDAS). If you type "10 + 5 * 2", the calculator does not calculate "15 * 2 = 30". It resolves the multiplication first (5 * 2 = 10) and then adds 10, producing 20. Associativity is like reading text: left-associative operators are read left-to-right, while right-associative operators are resolved right-to-left.'
        },
        {
          type: 'text',
          heading: '2. The Unary Plus Operator (+)',
          paragraphs: [
            "The unary plus operator (`+`) is a fast shorthand for numerical casting. Placing a plus sign before any value (e.g., `+x`) forces the engine to run the `ToNumber` abstract operation on `x`.",
            "If `x` is already a number, it has no effect. If it is a numerical string, it converts it to a number. If it is a boolean, it converts `true` to `1` and `false` to `0`. If conversion fails, it returns `NaN`."
          ]
        },
        {
          type: 'text',
          heading: '3. Explicit Casting vs. Parsing',
          paragraphs: [
            "There is a crucial difference between casting via `Number()` and parsing via `parseInt()` / `parseFloat()`:",
            "1. **Casting (`Number()`)**: Converts the entire input. If the string contains non-numerical characters (e.g., `'42px'`), casting fails completely and returns `NaN`.",
            "2. **Parsing (`parseInt()`)**: Scans the string from left to right. It extracts and returns any numbers it finds until it encounters a non-numerical character (e.g., parsing `'42px'` yields `42`). If the string does not start with a number, it returns `NaN`."
          ]
        }
      ]
    },
    summary: 'Mathematical operations follow strict precedence and associativity. The unary plus (+) operator is a shorthand for numerical casting. Explicit casting via Number() requires a clean numerical string, while parsing via parseInt() extracts numbers from prefixed strings.',
    codeHtml: `<span class="code-comment">// Precedence and Associativity</span>
<span class="code-keyword">const</span> <span class="code-variable">val</span> <span class="code-operator">=</span> <span class="code-number">10</span> <span class="code-operator">+</span> <span class="code-number">5</span> <span class="code-operator">*</span> <span class="code-number">2</span>; <span class="code-comment">// 20 (Multiplication runs first)</span>
<span class="code-keyword">let</span> <span class="code-variable">a</span>, <span class="code-variable">b</span>;
<span class="code-variable">a</span> <span class="code-operator">=</span> <span class="code-variable">b</span> <span class="code-operator">=</span> <span class="code-number">5</span>; <span class="code-comment">// Evaluated right-to-left: b = 5, then a = b</span>

<span class="code-comment">// Unary Plus Casting</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-operator">+</span><span class="code-string">"42"</span>);   <span class="code-comment">// 42 (Number)</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-operator">+</span><span class="code-keyword">true</span>);   <span class="code-comment">// 1 (Number)</span>

<span class="code-comment">// Casting vs Parsing</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">Number</span>(<span class="code-string">"42px"</span>));   <span class="code-comment">// NaN</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">parseInt</span>(<span class="code-string">"42px"</span>)); <span class="code-comment">// 42</span>`,
    sandboxCode: `// Try modifying these operators and casting functions
const input = "100px";
console.log("Using Number():", Number(input));
console.log("Using parseInt():", parseInt(input));

console.log("Unary plus cast of '1.5':", +"1.5");
console.log("Unary plus cast of 'hello':", +"hello");
`,
    quiz: {
      question: 'What is the output of Number("100px") and parseInt("100px") respectively?',
      options: [
        '100 and 100',
        'NaN and 100',
        'NaN and NaN',
        '100 and NaN'
      ],
      answerIdx: 1,
      explanation: 'Number() tries to cast the entire string and fails because "px" is non-numerical, producing NaN. parseInt() scans left-to-right, extracts the digits, and stops at "p", returning 100.'
    },
    references: [
      { name: 'MDN: Operator Precedence Table', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence' },
      { name: 'ECMA-262: Numeric Types Conversions', url: 'https://tc39.es/ecma262/#sec-numeric-types' }
    ]
  },
  {
    id: 'ops-comparison',
    title: 'Equality == vs ===',
    heading: 'Abstract vs. Strict Equality Comparison',
    subtitle: 'Step-by-step algorithms of type coercion and value matches in equality.',
    badges: [
      { icon: Clock, text: '15 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Equality', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Intermediate', color: 'text-space-yellow' },
      { icon: Layers, text: 'Algorithms', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. Strict Equality (===)',
          paragraphs: [
            "The strict equality operator (`===`) performs no implicit coercion. It compares both the **type** and the **value** of the operands. Under the hood, this executes the **Strict Equality Comparison Algorithm**.",
            "If the operands are of different types, it immediately returns `false`. This makes strict equality fast, safe, and highly predictable.",
            "There are two notable exceptions in strict equality:",
            "1. `NaN === NaN` evaluates to `false` (NaN is unequal to everything, including itself).",
            "2. `-0 === +0` evaluates to `true`, even though they represent different physical states in computer hardware."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Security Guard Analogy',
          text: 'Strict equality (===) is like a strict security guard at a high-security facility. The guard compares both your photo ID card format (type) and your face/name (value). If your ID card is a temporary printout and not a smartcard, the guard rejects you immediately. Abstract equality (==) is like a lenient guard. If you show a printed paper badge and a smartcard, the guard translates the paper badge into smartcard format first, and only then checks if the details match.'
        },
        {
          type: 'text',
          heading: '2. Abstract Equality (==)',
          paragraphs: [
            "The abstract equality operator (`==`) compares values after attempting to coerce them to a common type. This executes the **Abstract Equality Comparison Algorithm** (ECMA-262 section 7.2.14).",
            "If the types are identical, it compares their values. If they differ, it applies sequential conversion rules:",
            "- If comparing a string and a number, the string is coerced to a number.",
            "- If comparing a boolean and anything else, the boolean is coerced to a number (`true` to `1`, `false` to `0`).",
            "- If comparing `null` and `undefined`, it returns `true` (they are only abstractly equal to each other).",
            "- If comparing an object and a primitive, the object is converted to a primitive via `ToPrimitive`."
          ]
        },
        {
          type: 'text',
          heading: '3. Sameness Edge Cases and Object.is()',
          paragraphs: [
            "To resolve the edge cases of strict equality, ES6 introduced `Object.is()`. It behaves identically to `===` except for two scenarios:",
            "1. `Object.is(NaN, NaN)` returns `true`.",
            "2. `Object.is(-0, +0)` returns `false`.",
            "This makes `Object.is()` the most accurate tool for absolute identity comparison in JavaScript."
          ]
        }
      ]
    },
    summary: 'Strict equality (===) compares type and value without coercion. Abstract equality (==) coerces operands to a common type using the abstract comparison algorithm before matching. Object.is() provides absolute identity comparisons, resolving NaN and signed zero edge cases.',
    codeHtml: `<span class="code-comment">// Comparing types</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-number">5</span> <span class="code-operator">==</span> <span class="code-string">"5"</span>);   <span class="code-comment">// true (string "5" is coerced to number 5)</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-number">5</span> <span class="code-operator">===</span> <span class="code-string">"5"</span>);  <span class="code-comment">// false (different types)</span>

<span class="code-comment">// Nullish abstract equality</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-keyword">null</span> <span class="code-operator">==</span> <span class="code-keyword">undefined</span>); <span class="code-comment">// true</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-keyword">null</span> <span class="code-operator">===</span> <span class="code-keyword">undefined</span>); <span class="code-comment">// false

// Object.is comparison</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">NaN</span> <span class="code-operator">===</span> <span class="code-variable">NaN</span>);         <span class="code-comment">// false</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">Object</span>.<span class="code-variable">is</span>(<span class="code-variable">NaN</span>, <span class="code-variable">NaN</span>)); <span class="code-comment">// true</span>`,
    sandboxCode: `// Run comparison checks to inspect edge cases
console.log("0 == false:", 0 == false);
console.log("0 === false:", 0 === false);
console.log("[] == false:", [] == false); // Coercion cascades!

console.log("Object.is(-0, +0):", Object.is(-0, +0));
console.log("-0 === +0:", -0 === +0);
`,
    quiz: {
      question: 'Which of the following comparisons returns true in JavaScript?',
      options: [
        'NaN === NaN',
        'null === undefined',
        '[] == ![]',
        'Object.is(-0, +0)'
      ],
      answerIdx: 2,
      explanation: '[] == ![] evaluates to true because: ![] becomes false. The comparison becomes [] == false. The array [] is coerced to primitive string "", leading to "" == false. Both are then coerced to number, resulting in 0 == 0, which is true.'
    },
    references: [
      { name: 'ECMA-262: Abstract Equality Algorithm', url: 'https://tc39.es/ecma262/#sec-abstract-equality-comparison' },
      { name: 'MDN: Equality comparisons and sameness', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness' }
    ]
  },
  {
    id: 'loops-control',
    title: 'For, While & Flow',
    heading: 'Loop Iterations and Execution Flow',
    subtitle: 'How execution jumps repeat code blocks, halts loops, and bypasses infinite runtime blocks.',
    badges: [
      { icon: Clock, text: '12 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Control Flow', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Beginner', color: 'text-space-yellow' },
      { icon: Layers, text: 'Control Loops', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. Repetitive Branching at the Machine Level',
          paragraphs: [
            "In high-level languages, a loop repeats block instructions. At the machine level, this is implemented as a set of sequential bytecode instructions ending with a conditional jump instruction. If the loop test resolves to a truthy value, the execution pointer jumps back to the starting address of the loop block.",
            "Because JavaScript executes on a single thread, if a loop has a condition that never turns falsy, it creates an **infinite loop**. The thread is caught in this jump loop forever, blocking browser rendering updates and causing the window to crash."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Racetrack Analogy',
          text: 'Running a loop is like driving laps on a racetrack. The condition is a checkpoint. As long as you have fuel (condition is truthy), you jump back to the start and run another lap. "Continue" is taking a shortcut at the last corner—you skip the rest of your current lap, refuel at the checkpoint, and start the next lap immediately. "Break" is crashing through the security gate to exit the track entirely, ending your race.'
        },
        {
          type: 'text',
          heading: '2. Redirecting Flow: break and continue',
          paragraphs: [
            "JavaScript provides control statements to interrupt or redirect loop execution flows:",
            "1. **`break`**: Terminates the loop immediately. The execution pointer breaks out of the loop block and resumes at the first instruction following the loop.",
            "2. **`continue`**: Skips the remaining statements in the current iteration. The execution pointer jumps straight to the update expression (in a `for` loop) or the condition test (in a `while` loop) to determine if it should execute the next lap."
          ]
        },
        {
          type: 'text',
          heading: '3. Do-While and Condition Check Timing',
          paragraphs: [
            "The standard `while` loop checks the condition *before* executing the block. If the condition starts false, the block runs 0 times.",
            "The `do-while` loop executes the block *first*, and then tests the condition. This guarantees that the loop block executes **at least once**, regardless of the initial truthiness of the condition."
          ]
        }
      ]
    },
    summary: 'Loops repeat code blocks using conditional jump branches in machine code. Infinite loops block JavaScript\'s single thread, freezing the user interface. break terminates execution immediately, continue skips the rest of the current iteration, and do-while guarantees at least one execution.',
    codeHtml: `<span class="code-comment">// using break to halt iteration</span>
<span class="code-keyword">for</span> (<span class="code-keyword">let</span> <span class="code-variable">i</span> <span class="code-operator">=</span> <span class="code-number">0</span>; <span class="code-variable">i</span> <span class="code-operator">&lt;</span> <span class="code-number">10</span>; <span class="code-variable">i</span><span class="code-operator">++</span>) {
  <span class="code-keyword">if</span> (<span class="code-variable">i</span> <span class="code-operator">===</span> <span class="code-number">3</span>) {
    <span class="code-keyword">break</span>; <span class="code-comment">// Exits loop completely</span>
  }
  <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">i</span>); <span class="code-comment">// Prints: 0, 1, 2</span>
}

<span class="code-comment">// using continue to skip step</span>
<span class="code-keyword">for</span> (<span class="code-keyword">let</span> <span class="code-variable">i</span> <span class="code-operator">=</span> <span class="code-number">0</span>; <span class="code-variable">i</span> <span class="code-operator">&lt;</span> <span class="code-number">4</span>; <span class="code-variable">i</span><span class="code-operator">++</span>) {
  <span class="code-keyword">if</span> (<span class="code-variable">i</span> <span class="code-operator">===</span> <span class="code-number">2</span>) <span class="code-keyword">continue</span>; <span class="code-comment">// Skips index 2</span>
  <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">i</span>); <span class="code-comment">// Prints: 0, 1, 3</span>
}`,
    sandboxCode: `// Experiment with control flow loop statements
console.log("Starting Loop:");
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    console.log("Skipping iteration index 3");
    continue;
  }
  console.log("Processing element:", i);
}
`,
    quiz: {
      question: 'What is the minimum number of times the block in a do-while loop will execute?',
      options: [
        '0 times.',
        '1 time.',
        'It depends entirely on the condition truthiness.',
        'Infinite times.'
      ],
      answerIdx: 1,
      explanation: 'A do-while loop evaluates the condition at the end of the block, meaning the block is always executed at least once before the condition is checked.'
    },
    references: [
      { name: 'MDN Guide: Loops and Iteration', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration' },
      { name: 'ECMA-262: Iteration Statements Specification', url: 'https://tc39.es/ecma262/#sec-iteration-statements' }
    ]
  },
  {
    id: 'loops-iteration',
    title: 'For...in vs For...of',
    heading: 'Iterating over Properties vs Values',
    subtitle: 'Analyzing enumerable prototype traversals and the Symbol.iterator protocol.',
    badges: [
      { icon: Clock, text: '12 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Iteration Protocols', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Intermediate', color: 'text-space-yellow' },
      { icon: Layers, text: 'Object Loops', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. Enumerable Properties and for...in',
          paragraphs: [
            "The `for...in` statement iterates over all enumerable string properties of an object, including properties inherited up the prototype chain.",
            "Because it traverses prototype links, using `for...in` to iterate over arrays is highly discouraged. It returns array index keys as strings (e.g. `'0'`, `'1'`) rather than actual numbers, and if a library has extended the global `Array.prototype`, those custom properties are also output, causing prototype pollution bugs."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Inspector vs. Conveyor Belt Analogy',
          text: '`for...in` is like a home inspector examining the house. The inspector walks through every room (own keys) and checks structural beams inherited from the foundation builders (prototype properties). `for...of` is like a conveyor belt worker at a factory. The worker does not care how the belt was built; they only inspect each box (value) that passes in front of them.'
        },
        {
          type: 'text',
          heading: '2. The Iterator Protocol and for...of',
          paragraphs: [
            "Introduced in ES6, the `for...of` loop bypasses keys and iterates directly over the **values** produced by an iterable object.",
            "An object is defined as iterable if it (or one of its prototypes) implements a method keyed by `Symbol.iterator`. This method returns an iterator object with a `.next()` function that yields `{ value, done }` objects.",
            "Built-in iterables include `Array`, `String`, `Map`, `Set`, and `NodeList`. Plain objects are **not** iterable by default because they do not have a default iterator. Attempting to use `for...of` on a plain object throws a `TypeError`."
          ]
        },
        {
          type: 'quote',
          text: '“for...in iterates over keys; for...of iterates over values.”'
        }
      ]
    },
    summary: 'for...in iterates over the enumerable keys of an object and its prototypes. for...of uses the ES6 iterable protocol (Symbol.iterator) to loop over values of collections like arrays, strings, maps, and sets.',
    codeHtml: `<span class="code-comment">// for...in enumerates object properties</span>
<span class="code-keyword">const</span> <span class="code-variable">developer</span> <span class="code-operator">=</span> { <span class="code-variable">name</span>: <span class="code-string">"Vansh"</span>, <span class="code-variable">role</span>: <span class="code-string">"Builder"</span> };
<span class="code-keyword">for</span> (<span class="code-keyword">const</span> <span class="code-variable">key</span> <span class="code-keyword">in</span> <span class="code-variable">developer</span>) {
  <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">key</span>); <span class="code-comment">// "name", "role"</span>
}

<span class="code-comment">// for...of iterates over array values</span>
<span class="code-keyword">const</span> <span class="code-variable">tags</span> <span class="code-operator">=</span> [<span class="code-string">"react"</span>, <span class="code-string">"node"</span>];
<span class="code-keyword">for</span> (<span class="code-keyword">const</span> <span class="code-variable">tag</span> <span class="code-keyword">of</span> <span class="code-variable">tags</span>) {
  <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">tag</span>); <span class="code-comment">// "react", "node"</span>
}`,
    sandboxCode: `// Run loop tests on objects and arrays
const arr = [10, 20];
arr.customProp = "metadata";

console.log("Running for...in (keys):");
for (const key in arr) {
  console.log("key:", key); // Notice how customProp is printed!
}

console.log("\\nRunning for...of (values):");
for (const val of arr) {
  console.log("value:", val); // Notice how customProp is ignored!
}
`,
    quiz: {
      question: 'Why does calling for...of on a plain object { a: 1 } throw a TypeError?',
      options: [
        'Plain objects are stored in stack memory instead of the heap.',
        'Objects are immutable and cannot be iterated.',
        'Plain objects do not implement the Symbol.iterator protocol.',
        'JavaScript restricts object access for security reasons.'
      ],
      answerIdx: 2,
      explanation: 'for...of loops require the target to have a Symbol.iterator method. Plain objects lack this method by default, so V8 throws a TypeError.'
    },
    references: [
      { name: 'MDN: Iteration Protocols', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols' },
      { name: 'MDN: for...in Statement Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in' }
    ]
  },
  {
    id: 'func-execution',
    title: 'Execution Context & Scope',
    heading: 'Execution Context & Scope Chain',
    subtitle: 'Behind the scenes of execution phases, hoisting, scope lookup chains, and temporal dead zones.',
    badges: [
      { icon: Clock, text: '15 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Execution Context', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Advanced', color: 'text-space-yellow' },
      { icon: Layers, text: 'Compiler Phase', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. The Two-Phase Execution Lifecycle',
          paragraphs: [
            "Before executing a script, the engine compiles it. When a script runs, the engine constructs a new **Execution Context** representing the active runtime environment. This is completed in two distinct phases:",
            "1. **Creation Phase**: The compiler parses the code. It sets up memory space for variable and function declarations (hoisting), builds the outer **Scope Chain**, and binds the value of the `this` keyword.",
            "2. **Execution Phase**: The interpreter executes the code line-by-line, assigning values to variables and invoking functions."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Theater Play Analogy',
          text: 'The Execution Context is like staging a theater play. The Creation Phase is casting actors and placing props in their correct starting locations (allocating memory slots). The Execution Phase is when the curtains rise and the actors perform their lines line-by-line. The Temporal Dead Zone (TDZ) is like an actor standing on stage with a drop cloth over them; they are physically present, but the script cannot address or speak to them until the script pulls off the cloth.'
        },
        {
          type: 'text',
          heading: '2. Variable Hoisting & Temporal Dead Zone (TDZ)',
          paragraphs: [
            "**Hoisting** is the result of the compiler registering declarations in memory during the Creation Phase. However, different declaration types behave differently:",
            "- **Function Declarations**: Fully registered in memory, meaning you can invoke the function *before* its definition in the code.",
            "- **`var` Declarations**: Hoisted and initialized to `undefined`. Accessing them before their declaration line does not throw an error; it simply returns `undefined`.",
            "- **`let` and `const` Declarations**: Hoisted but **left uninitialized**. They enter the **Temporal Dead Zone (TDZ)**. Accessing them before their declaration line throws a `ReferenceError`."
          ]
        },
        {
          type: 'text',
          heading: '3. Scope Chain and Lexical Environments',
          paragraphs: [
            "Every execution context has an associated **Lexical Environment**. Scope is lexical, meaning it is set at compile time based on where functions are physically written in the code.",
            "If a variable is not found in the local Lexical Environment, the engine checks the outer (parent) Lexical Environment. This sequential lookup links all the way up to the global scope, forming the **Scope Chain**."
          ]
        }
      ]
    },
    summary: 'When a function runs, V8 creates an Execution Context. The creation phase handles hoisting (memory allocation), while the execution phase runs code line-by-line. Lexical scope sets static boundaries, resolving variable lookups via the Scope Chain.',
    codeHtml: `<span class="code-comment">// Function hoisting (Works!)</span>
<span class="code-variable">greet</span>();
<span class="code-keyword">function</span> <span class="code-function">greet</span>() {
  <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"Beep Boop!"</span>);
}

<span class="code-comment">// Var hoisting vs let TDZ</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">x</span>); <span class="code-comment">// undefined</span>
<span class="code-keyword">var</span> <span class="code-variable">x</span> <span class="code-operator">=</span> <span class="code-number">10</span>;

<span class="code-keyword">try</span> {
  <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">y</span>); <span class="code-comment">// Throws ReferenceError (in TDZ)</span>
  <span class="code-keyword">let</span> <span class="code-variable">y</span> <span class="code-operator">=</span> <span class="code-number">20</span>;
} <span class="code-keyword">catch</span> (<span class="code-variable">err</span>) {
  <span class="code-variable">console</span>.<span class="code-log">log</span>(<span class="code-variable">err</span>.<span class="code-variable">message</span>);
}`,
    sandboxCode: `// Run hoisting and TDZ tests
console.log("Hoisted var x:", x); // undefined
var x = "Completed";

try {
  console.log("TDZ let y:", y);
} catch (err) {
  console.log("TDZ Error caught successfully:", err.message);
}
let y = "Assigned";
`,
    quiz: {
      question: 'Why does accessing a let variable before its declaration line throw a ReferenceError, whereas a var variable returns undefined?',
      options: [
        'let variables are not hoisted by the compiler.',
        'var variables reside in heap memory, while let variables are on the stack.',
        'let variables are hoisted but left uninitialized, putting them in the Temporal Dead Zone.',
        'let variables are local to the global window context.'
      ],
      answerIdx: 2,
      explanation: 'Variables declared with let and const are registered in memory during the creation phase, but they are left uninitialized. They remain in the TDZ, and accessing them triggers a ReferenceError.'
    },
    references: [
      { name: 'MDN: Lexical Scoping Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#lexical_scoping' },
      { name: 'ECMA-262: Lexical Environments', url: 'https://tc39.es/ecma262/#sec-lexical-environments' }
    ]
  },
  {
    id: 'func-closures',
    title: 'Closures & Lexical Scope',
    heading: 'Lexical Closures and Heap Scopes',
    subtitle: 'How returned functions retain access to their parent scope in heap memory.',
    badges: [
      { icon: Clock, text: '15 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Closures', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Advanced', color: 'text-space-yellow' },
      { icon: Layers, text: 'State Retainer', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. Defining Closures',
          paragraphs: [
            "A **closure** is the combination of a function bundled together with references to its surrounding state (its lexical environment). In JavaScript, a closure is created every time a function is created, at function creation time.",
            "This gives an inner function access to variables defined in its outer (parent) function, even after the outer function has completed execution and returned."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Hometown Backpack Analogy',
          text: 'Imagine a camper leaving their hometown (outer scope). The camper pack variables from home inside a backpack (the closure). The camper now travels to a remote forest (a different execution context). Even though the hometown is miles away and inaccessible to local forest creatures, the camper can open their backpack and access their home items anytime.'
        },
        {
          type: 'text',
          heading: '2. Heap Scope Persistence and Garbage Collection',
          paragraphs: [
            "Normally, when a function finishes executing, its execution context is popped from the Call Stack and its local variables are garbage collected to free up RAM.",
            "However, if an inner function is returned and contains a reference to any outer variable, the engine cannot destroy that outer environment record. The outer lexical environment is moved from the stack to the **Memory Heap**, keeping the parent variables alive as long as the inner function reference exists."
          ]
        },
        {
          type: 'text',
          heading: '3. Practical Applications of Closures',
          paragraphs: [
            "Closures are essential for:",
            "1. **State Encapsulation**: Simulating private variables. Since outer variables cannot be accessed directly, they can only be read or modified by specific returned methods.",
            "2. **Function Factories**: Creating customized functions (e.g. creating helper functions with preset configurations).",
            "3. **Event Listeners & Callbacks**: Preserving coordinate values or state indexes when triggers occur at a later time."
          ]
        }
      ]
    },
    summary: 'A closure is an inner function that retains access to variables in its outer lexical scope even after the outer function has returned. This happens because the engine moves the outer environment record to the heap, bypassing garbage collection.',
    codeHtml: `<span class="code-comment">// Creating a state closure function</span>
<span class="code-keyword">function</span> <span class="code-function">createAccount</span>(<span class="code-variable">owner</span>) {
  <span class="code-keyword">let</span> <span class="code-variable">balance</span> <span class="code-operator">=</span> <span class="code-number">100</span>; <span class="code-comment">// Private variable in heap scope</span>

  <span class="code-keyword">return</span> {
    <span class="code-function">deposit</span>: (<span class="code-variable">amount</span>) <span class="code-operator">=&gt;</span> { <span class="code-variable">balance</span> <span class="code-operator">+=</span> <span class="code-variable">amount</span>; },
    <span class="code-function">getBalance</span>: () <span class="code-operator">=&gt;</span> <span class="code-variable">balance</span>
  };
}

<span class="code-keyword">const</span> <span class="code-variable">myAcc</span> <span class="code-operator">=</span> <span class="code-function">createAccount</span>(<span class="code-string">"Vansh"</span>);
<span class="code-variable">myAcc</span>.<span class="code-function">deposit</span>(<span class="code-number">50</span>);
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">myAcc</span>.<span class="code-function">getBalance</span>()); <span class="code-comment">// 150</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">myAcc</span>.<span class="code-variable">balance</span>);    <span class="code-comment">// undefined (Encapsulated!)</span>`,
    sandboxCode: `// Run a counter closure to test state persistence
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter1 = makeCounter();
console.log("First counter call:", counter1()); // 1
console.log("Second counter call:", counter1()); // 2

const counter2 = makeCounter();
console.log("New counter call:", counter2()); // 1 (Independent state instance)
`,
    quiz: {
      question: 'Why do local variables of an outer function remain available inside a returned inner function after the outer function has finished executing?',
      options: [
        'The outer function runs in a background thread.',
        'The inner function copies the variable literals onto the stack.',
        'The engine retains the outer lexical environment in the memory heap as long as the inner function holds a reference to it.',
        'All JavaScript variables are global by default.'
      ],
      answerIdx: 2,
      explanation: 'Because the inner function retains a lexical reference to its parent environment, the engine keeps that outer environment record alive in heap memory, preventing garbage collection.'
    },
    references: [
      { name: 'MDN Web Docs: Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures' },
      { name: 'Closures and Memory Leak Analysis', url: 'https://v8.dev/blog/trash-talk' }
    ]
  },
  {
    id: 'obj-prototypes',
    title: 'Prototypes & Delegation',
    heading: 'Prototypal Delegation & Inheritance',
    subtitle: 'Understanding prototypal linking, property shadowing, and the lookup chain.',
    badges: [
      { icon: Clock, text: '15 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Prototypes', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Intermediate', color: 'text-space-yellow' },
      { icon: Layers, text: 'Delegation', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. Prototypal Delegation vs. Class Copying',
          paragraphs: [
            "In classical object-oriented languages (like Java or C++), class inheritance works by copying behavior blueprints onto instances. JavaScript does not follow this model.",
            "JavaScript uses **Prototypal Delegation**. Every object holds a hidden link to another object called its prototype. This link is represented in browser implementations as the legacy `__proto__` property (and standardized as the `[[Prototype]]` internal slot, accessed via `Object.getPrototypeOf()`)."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Borrowing Toys Analogy',
          text: 'Prototypal delegation is like a child playing with toys. If a child wants to play with a toy car but doesn\'t own it (property is missing), they don\'t clone it. They ask their parent (prototype). If the parent doesn\'t have it, the parent asks the grandparent (prototype of the prototype). This borrowing chain continues up to the head of the family (Object.prototype). If no ancestor has it, the lookup yields null/undefined.'
        },
        {
          type: 'text',
          heading: '2. The Property Lookup Chain and Shadowing',
          paragraphs: [
            "When you access a property on an object, the engine performs a search:",
            "1. It checks if the property exists directly on the object. If yes, it returns it.",
            "2. If not, it searches the prototype link (`__proto__`). It climbs this **Prototype Chain** step-by-step until the property is found, or it hits `Object.prototype.__proto__`, which is `null`.",
            "If you write a property on an object that shares a prototype property of the same name, you **shadow** the prototype property. The local property takes precedence, hiding the prototype property without modifying it."
          ]
        },
        {
          type: 'text',
          heading: '3. The prototype Property on Constructors',
          paragraphs: [
            "A common source of confusion is the difference between `prototype` and `__proto__`:",
            "- **`__proto__`**: The active pointer link present on every object instance, pointing to its inherited ancestor prototype.",
            "- **`prototype`**: A property that exists **only on constructor functions** (and classes). It represents the prototype object that will be assigned as the `__proto__` of any object instance created using the `new` keyword."
          ]
        }
      ]
    },
    summary: 'JavaScript objects inherit behavior through prototype links. Property lookups traverse the prototype chain until the property is found or null is reached. Constructor functions use their prototype property to assign links to instances.',
    codeHtml: `<span class="code-comment">// Constructing prototype links</span>
<span class="code-keyword">const</span> <span class="code-variable">machinery</span> <span class="code-operator">=</span> { <span class="code-variable">powered</span>: <span class="code-keyword">true</span> };
<span class="code-keyword">const</span> <span class="code-variable">robot</span> <span class="code-operator">=</span> <span class="code-variable">Object</span>.<span class="code-function">create</span>(<span class="code-variable">machinery</span>); <span class="code-comment">// robot.__proto__ === machinery</span>

<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">robot</span>.<span class="code-variable">powered</span>); <span class="code-comment">// true (Delegated!)</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">robot</span>.<span class="code-function">hasOwnProperty</span>(<span class="code-string">"powered"</span>)); <span class="code-comment">// false</span>

<span class="code-comment">// Shadowing property</span>
<span class="code-variable">robot</span>.<span class="code-variable">powered</span> <span class="code-operator">=</span> <span class="code-keyword">false</span>;
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">robot</span>.<span class="code-variable">powered</span>);   <span class="code-comment">// false (Shadowed!)</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">machinery</span>.<span class="code-variable">powered</span>); <span class="code-comment">// true (Original unmodified)</span>`,
    sandboxCode: `// Trace prototype links in this robot constructor
function Drone(name) {
  this.name = name;
}
Drone.prototype.fly = function() {
  return \`Drone \${this.name} is airborne!\`;
};

const raptor = new Drone("Raptor 01");
console.log("Method call:", raptor.fly());
console.log("raptor.__proto__ === Drone.prototype:", raptor.__proto__ === Drone.prototype);
console.log("Drone.prototype.__proto__ === Object.prototype:", Drone.prototype.__proto__ === Object.prototype);
`,
    quiz: {
      question: 'What is the prototype link (__proto__) of Object.prototype, which represents the end of all prototype chains?',
      options: [
        'Function.prototype',
        'Object.prototype itself.',
        'null',
        'undefined'
      ],
      answerIdx: 2,
      explanation: 'All prototype chains terminate at Object.prototype. Its internal prototype link ([[Prototype]] or __proto__) points to null, signifying the end of the lookup chain.'
    },
    references: [
      { name: 'MDN: Inheritance and the prototype chain', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain' },
      { name: 'ECMA-262: Prototypal Inheritance Model', url: 'https://tc39.es/ecma262/#sec-prototypal-relationships' }
    ]
  },
  {
    id: 'obj-manipulation',
    title: 'Mutation & Object Freezing',
    heading: 'Object Mutability and Integrity Control',
    subtitle: 'Exploring reference mutations, copy strategies, and object freezing restrictions.',
    badges: [
      { icon: Clock, text: '12 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Immutability', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Intermediate', color: 'text-space-yellow' },
      { icon: Layers, text: 'Integrity Control', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. Object Mutability & Reference Sharing Side-Effects',
          paragraphs: [
            "Because objects are stored as references, multiple variables can point to the same object in memory. This is called reference sharing.",
            "If any variable mutates a property (e.g. `obj.status = 'failed'`), that change is immediately visible to all other variables pointing to that address. This mutability can lead to bugs and side-effects across your codebase."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Museum Display Case Analogy',
          text: 'Freezing an object is like locking a glass display case in a museum. You cannot add new artifacts, take any out, or swap the labels on the shelves. However, if the shelf contains a purse (a nested object), the case only protects the purse itself; it does not lock the inside of the purse. A visitor could reach through a slot and change the coins inside the purse, unless you lock the purse too (deep freeze).'
        },
        {
          type: 'text',
          heading: '2. Shallow vs. Deep Copying',
          paragraphs: [
            "To prevent shared reference mutations, developers copy objects:",
            "1. **Shallow Copy (Spread `...`, `Object.assign`)**: Copies top-level properties. If a property is a nested object, only its reference address is copied, leaving nested objects shared.",
            "2. **Deep Copy (`structuredClone()`, JSON serialization)**: Recursively copies every object and property down the tree, creating a completely independent copy in heap memory."
          ]
        },
        {
          type: 'text',
          heading: '3. Object Integrity Levels: Freezing and Sealing',
          paragraphs: [
            "JavaScript provides three built-in functions to enforce state protection:",
            "1. **`Object.preventExtensions(obj)`**: Prevents adding new properties. Existing properties can be deleted or modified.",
            "2. **`Object.seal(obj)`**: Prevents adding or deleting properties. Existing properties can still be modified.",
            "3. **`Object.freeze(obj)`**: Prevents adding, deleting, or modifying properties. All properties become read-only.",
            "Warning: All three operations are **shallow**. They only protect top-level properties. Nested objects can still be mutated normally."
          ]
        }
      ]
    },
    summary: 'Objects are mutable and share reference pointers in memory. Developers use shallow or deep copying to protect state. Immutability can be enforced via Object.preventExtensions(), Object.seal(), and Object.freeze(), though freezing is shallow by default.',
    codeHtml: `<span class="code-comment">// Shallow freeze nested object mutation</span>
<span class="code-keyword">const</span> <span class="code-variable">profile</span> <span class="code-operator">=</span> {
  <span class="code-variable">name</span>: <span class="code-string">"Vansh"</span>,
  <span class="code-variable">skills</span>: { <span class="code-variable">react</span>: <span class="code-keyword">true</span> }
};
<span class="code-variable">Object</span>.<span class="code-function">freeze</span>(<span class="code-variable">profile</span>);

<span class="code-variable">profile</span>.<span class="code-variable">name</span> <span class="code-operator">=</span> <span class="code-string">"New Name"</span>; <span class="code-comment">// Fails silently (or throws in strict mode)</span>
<span class="code-variable">profile</span>.<span class="code-variable">skills</span>.<span class="code-variable">react</span> <span class="code-operator">=</span> <span class="code-keyword">false</span>; <span class="code-comment">// Works! Nested object is mutated</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">profile</span>.<span class="code-variable">skills</span>.<span class="code-variable">react</span>); <span class="code-comment">// false</span>`,
    sandboxCode: `// Test Object.freeze() behavior in strict mode
"use strict";
const settings = {
  host: "local",
  db: { port: 5432 }
};
Object.freeze(settings);

try {
  settings.host = "production";
} catch (err) {
  console.log("Top-level write blocked:", err.message);
}

settings.db.port = 8080; // Should work because freeze is shallow!
console.log("Nested port mutated to:", settings.db.port);
`,
    quiz: {
      question: 'What is the behavior of Object.seal() compared to Object.freeze()?',
      options: [
        'seal() makes properties read-only, whereas freeze() permits writes.',
        'seal() prevents adding and deleting properties but permits writing to existing properties; freeze() blocks all three.',
        'seal() performs a deep freeze recursively.',
        'There is no difference; they are aliases.'
      ],
      answerIdx: 1,
      explanation: 'Object.seal() locks the property list, preventing additions or deletions but allowing existing properties to be modified. Object.freeze() does both and makes existing properties read-only.'
    },
    references: [
      { name: 'MDN Web Docs: Object.freeze()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze' },
      { name: 'MDN: Copying Objects in JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy' }
    ]
  },
  {
    id: 'arr-mechanics',
    title: 'Arrays Under the Hood',
    heading: 'JavaScript Arrays Under the Hood',
    subtitle: 'V8 Elements Kinds optimizations, contiguous SMI blocks, holey arrays, and sparse memory indexing.',
    badges: [
      { icon: Clock, text: '15 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Engine Memory', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Intermediate', color: 'text-space-yellow' },
      { icon: Layers, text: 'Engine Performance', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. Arrays are Objects with Magic Property Rules',
          paragraphs: [
            "In lower-level languages (like C or Rust), arrays are contiguous blocks of memory of a fixed size. Elements of a single type are stored side-by-side, allowing for fast, direct memory access.",
            "In JavaScript, arrays are not contiguous memory structures by default. Under the hood, they are actually **specialized objects** with string keys representing indices (e.g. `'0'`, `'1'`) and an auto-updating `length` property that tracks the largest index plus one.",
            "Because arrays are objects, you can attach arbitrary string properties to them. If you create indices with large gaps (e.g. `arr[1000] = 'val'`), JavaScript does not allocate 1000 empty slots. It creates a **sparse array** stored as a hash table key-value map, which is slower than a contiguous array."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Train and Passenger Analogy',
          text: 'A packed array is like a full passenger train where every seat has a passenger (contiguous memory block). The conductor can walk straight down the aisle and inspect tickets rapidly. A holey or sparse array is like a train where only a few cars have passengers, and others are empty or missing. The conductor has to walk through empty sections, check directories, and call the station office (hash table lookup) to find passenger locations, which is much slower.'
        },
        {
          type: 'text',
          heading: '2. V8 Elements Kinds Optimizations',
          paragraphs: [
            "To optimize performance, JavaScript engines (like V8) try to store arrays in contiguous memory blocks. V8 tracks the types of elements in your array using **Elements Kinds**:",
            "- **`PACKED_SMI_ELEMENTS`**: Contiguous arrays containing only small integers (SMIs). This is the fastest, most optimized kind.",
            "- **`PACKED_DOUBLE_ELEMENTS`**: Contiguous arrays containing floating-point numbers or integers outside the SMI range.",
            "- **`PACKED_ELEMENTS`**: Contiguous arrays containing mixed types, strings, or object references.",
            "- **`HOLEY_` variants**: Holey versions of the above categories, triggered by missing indices."
          ]
        },
        {
          type: 'text',
          heading: '3. The Lattice Rule: One-Way Transitions',
          paragraphs: [
            "V8 transitions arrays between these kinds automatically as elements are added, but **only in one direction** (from more specific to more general):",
            "```",
            "  PACKED_SMI -> PACKED_DOUBLE -> PACKED_ELEMENTS",
            "      |               |                 |",
            "  HOLEY_SMI  -> HOLEY_DOUBLE  -> HOLEY_ELEMENTS",
            "```",
            "For example, if you push a string into a `PACKED_SMI_ELEMENTS` array, it transitions to `PACKED_ELEMENTS`. If you then create a hole, it transitions to `HOLEY_ELEMENTS`. **These transitions are irreversible**; even if you remove the string and fill the holes, the array remains in the slower `HOLEY_ELEMENTS` mode."
          ]
        }
      ]
    },
    summary: 'JavaScript arrays are specialized objects with integer keys and a dynamic length property. Engines optimize them into contiguous memory blocks unless they become sparse or contain mixed types, causing them to fall back to slower hash table lookup speeds.',
    codeHtml: `<span class="code-comment">// Creating a packed SMI array (Fastest)</span>
<span class="code-keyword">const</span> <span class="code-variable">numbers</span> <span class="code-operator">=</span> [<span class="code-number">1</span>, <span class="code-number">2</span>, <span class="code-number">3</span>]; <span class="code-comment">// PACKED_SMI_ELEMENTS</span>

<span class="code-comment">// Transition to Double</span>
<span class="code-variable">numbers</span>.<span class="code-function">push</span>(<span class="code-number">4.5</span>); <span class="code-comment">// PACKED_DOUBLE_ELEMENTS</span>

<span class="code-comment">// Transition to Elements</span>
<span class="code-variable">numbers</span>.<span class="code-function">push</span>(<span class="code-string">"five"</span>); <span class="code-comment">// PACKED_ELEMENTS</span>

<span class="code-comment">// Creating a hole</span>
<span class="code-variable">numbers</span>[<span class="code-number">10</span>] <span class="code-operator">=</span> <span class="code-number">10</span>; <span class="code-comment">// HOLEY_ELEMENTS (Irreversible performance hit)</span>
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">numbers</span>.<span class="code-variable">length</span>); <span class="code-comment">// 11</span>`,
    sandboxCode: `// Trace array elements kinds properties
const arr = [1, 2, 3];
console.log("Initial array keys:", Object.keys(arr));

arr[5] = 100; // Create a hole
console.log("Sparse array length:", arr.length);
console.log("Sparse array keys:", Object.keys(arr)); // Missing indices 3 and 4!
console.log("Accessing empty slot 3:", arr[3]); // undefined
`,
    quiz: {
      question: 'Which of the following transitions in V8 Elements Kinds is valid?',
      options: [
        'PACKED_ELEMENTS -> PACKED_SMI',
        'HOLEY_DOUBLE_ELEMENTS -> PACKED_DOUBLE_ELEMENTS',
        'PACKED_SMI_ELEMENTS -> PACKED_DOUBLE_ELEMENTS',
        'HOLEY_ELEMENTS -> HOLEY_SMI_ELEMENTS'
      ],
      answerIdx: 2,
      explanation: 'V8 transitions elements kinds only in one direction: from specific to general (SMI -> Double -> Elements, and Packed -> Holey). Transitioning from SMI to Double is a valid, one-way transition.'
    },
    references: [
      { name: 'V8 blog: Elements kinds in V8', url: 'https://v8.dev/blog/elements-kinds' },
      { name: 'MDN Web Docs: Array reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array' }
    ]
  },
  {
    id: 'arr-methods',
    title: 'Functional Array Methods',
    heading: 'Declarative Array Operations',
    subtitle: 'Iterating without side-effects via map, filter, and the power of reduce.',
    badges: [
      { icon: Clock, text: '15 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Functional helpers', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Intermediate', color: 'text-space-yellow' },
      { icon: Layers, text: 'Declarative Code', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. Declarative vs. Imperative Programming',
          paragraphs: [
            "1. **Imperative Programming**: Explains step-by-step *how* to achieve a result. In a traditional `for` loop, you initialize an index variable, check bounds, increment the index, and mutate an output array manually.",
            "2. **Declarative Programming**: Focuses on *what* result you want. Functional array helpers abstract the loop logic internally, allowing you to pass a callback function that describes the transformation."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Restaurant Menu Analogy',
          text: 'Imperative programming is like entering a kitchen and giving the chef a detailed recipe list: "grab flour, add water, knead for 10 minutes, bake at 400 degrees, add cheese." If you make a mistake in any step, the dish is ruined. Declarative programming is like looking at a restaurant menu and telling the waiter: "I want a cheese pizza." The kitchen handle the process, and you get the exact result you requested.'
        },
        {
          type: 'text',
          heading: '2. map() and filter() mechanics',
          paragraphs: [
            "Functional helpers preserve **immutability** by returning a new array instead of modifying the original:",
            "- **`map(callback)`**: Transforms each element. It returns a new array of the same length, where each slot contains the result of calling the callback on the corresponding original element.",
            "- **`filter(callback)`**: Subsets elements. It evaluates each element using a boolean callback and returns a new array containing only elements that passed the test."
          ]
        },
        {
          type: 'text',
          heading: '3. The Power of reduce()',
          paragraphs: [
            "While `map` and `filter` return new arrays, `reduce` can compile an array down to **any single shape** (a number, a string, an object, or even another array).",
            "The reducer callback receives an **accumulator** (the running total) and the **current element**. It must return the updated accumulator from each step. You should always specify an initial value as the second argument to `reduce()` to prevent errors on empty arrays."
          ]
        }
      ]
    },
    summary: 'Declarative array helpers map, filter, and reduce arrays without side-effects. They manage iteration state internally and return new array spaces in the heap memory to maintain immutability.',
    codeHtml: `<span class="code-comment">// Functional transform operations</span>
<span class="code-keyword">const</span> <span class="code-variable">numbers</span> <span class="code-operator">=</span> [<span class="code-number">1</span>, <span class="code-number">2</span>, <span class="code-number">3</span>, <span class="code-number">4</span>];

<span class="code-comment">// Map: double values</span>
<span class="code-keyword">const</span> <span class="code-variable">doubled</span> <span class="code-operator">=</span> <span class="code-variable">numbers</span>.<span class="code-function">map</span>(<span class="code-variable">n</span> <span class="code-operator">=&gt;</span> <span class="code-variable">n</span> <span class="code-operator">*</span> <span class="code-number">2</span>); <span class="code-comment">// [2, 4, 6, 8]</span>

<span class="code-comment">// Filter: get evens</span>
<span class="code-keyword">const</span> <span class="code-variable">evens</span> <span class="code-operator">=</span> <span class="code-variable">numbers</span>.<span class="code-function">filter</span>(<span class="code-variable">n</span> <span class="code-operator">=&gt;</span> <span class="code-variable">n</span> <span class="code-operator">%</span> <span class="code-number">2</span> <span class="code-operator">===</span> <span class="code-number">0</span>); <span class="code-comment">// [2, 4]</span>

<span class="code-comment">// Reduce: sum total</span>
<span class="code-keyword">const</span> <span class="code-variable">sum</span> <span class="code-operator">=</span> <span class="code-variable">numbers</span>.<span class="code-function">reduce</span>((<span class="code-variable">acc</span>, <span class="code-variable">curr</span>) <span class="code-operator">=&gt;</span> <span class="code-variable">acc</span> <span class="code-operator">+</span> <span class="code-variable">curr</span>, <span class="code-number">0</span>); <span class="code-comment">// 10</span>`,
    sandboxCode: `// Run map, filter, and reduce operations
const data = [10, 20, 30, 40];

const mapped = data.map(x => x / 10);
console.log("Mapped results (division):", mapped);

const filtered = data.filter(x => x > 25);
console.log("Filtered results (> 25):", filtered);

const nestedSum = data.reduce((total, val) => total + val, 100);
console.log("Accumulated sum starting from 100:", nestedSum);
`,
    quiz: {
      question: 'Which of the following array methods should you use to transform a list of numbers into a single aggregated sum total?',
      options: [
        'Array.prototype.map()',
        'Array.prototype.filter()',
        'Array.prototype.reduce()',
        'Array.prototype.forEach()'
      ],
      answerIdx: 2,
      explanation: 'Array.prototype.reduce() runs a reducer callback on all array elements, compiling them into a single accumulated result value.'
    },
    references: [
      { name: 'MDN Web Docs: Array.prototype.reduce()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce' },
      { name: 'MDN: Declarative Array Methods', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#iteration_methods' }
    ]
  },
  {
    id: 'dom-interaction',
    title: 'DOM & Event Delegation',
    heading: 'DOM & Event Delegation',
    subtitle: 'Understanding Document Object Model page tree mutations, bubbling propagation, and event delegation patterns.',
    badges: [
      { icon: Clock, text: '15 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'DOM Platform', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Intermediate', color: 'text-space-yellow' },
      { icon: Layers, text: 'Web API', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. What is the DOM Tree?',
          paragraphs: [
            "The **Document Object Model (DOM)** is a programming interface for web documents. It represents the page structure as a hierarchical tree of objects, where every element, attribute, and text block in the HTML is mapped to a dynamic Node object that JavaScript can query, mutate, and delete.",
            "When a browser requests an HTML document, the HTML Parser reads the byte stream and constructs an **Abstract DOM Tree** while generating the Layout Render Tree. Altering DOM nodes directly is computationally expensive, as mutations can trigger page **re-flows** (calculating element layout coordinates) and **re-paints** (drawing pixels on screen)."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Family Tree & Gatekeeper Analogy',
          text: 'The DOM is like a giant family tree where parent elements pass down characteristics to children. Event bubbling is like a child calling out "fire!". The parent hears it, then the grandparent, all the way up the tree. Event delegation is like hiring a single gatekeeper at the community entrance to check guests, instead of stationing individual guards at every house door. It intercepts all notifications in one central hub.'
        },
        {
          type: 'text',
          heading: '2. Event Propagation: Capturing vs. Bubbling',
          paragraphs: [
            "When an event (like a click) occurs on a target element, it travels through three distinct propagation phases:",
            "1. **Capturing Phase**: The event descends from the global `window` object down the DOM tree hierarchy to the target node.",
            "2. **Target Phase**: The event reaches the target element itself.",
            "3. **Bubbling Phase**: The event ascends from the target element back up the DOM tree to the global `window` object.",
            "By default, standard event listeners added via `addEventListener` execute during the **bubbling phase** (you can force capturing by setting the third parameter options object to `true` or `{ capture: true }`). Calling `event.stopPropagation()` halts this bubbling ascent immediately."
          ]
        },
        {
          type: 'text',
          heading: '3. The Event Delegation Pattern',
          paragraphs: [
            "If you have a list containing 1,000 items, adding an event listener to every individual item consumes significant system memory and creates performance bottlenecks. It also means newly appended items won't have listener triggers.",
            "**Event Delegation** solves this. Instead of binding listeners to children, you add a single event listener to their shared parent container. When a child item is clicked, the click event bubbles up to the parent. The parent's listener inspects `event.target` to identify which child was clicked, handling the click dynamically."
          ]
        }
      ]
    },
    summary: 'The DOM translates HTML documents into a mutable node tree. Events propagate through capturing, target, and bubbling phases. Event delegation leverages bubbling to capture child events on a single parent listener, saving memory.',
    codeHtml: `<span class="code-comment">// Adding listener using event delegation</span>
<span class="code-keyword">const</span> <span class="code-variable">listContainer</span> <span class="code-operator">=</span> <span class="code-variable">document</span>.<span class="code-function">getElementById</span>(<span class="code-string">"items-list"</span>);

<span class="code-variable">listContainer</span>.<span class="code-function">addEventListener</span>(<span class="code-string">"click"</span>, (<span class="code-variable">event</span>) <span class="code-operator">=&gt;</span> {
  <span class="code-comment">// Identify event.target child element</span>
  <span class="code-keyword">if</span> (<span class="code-variable">event</span>.<span class="code-variable">target</span>.<span class="code-variable">matches</span>(<span class="code-string">".list-item"</span>)) {
    <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"Clicked list item text:"</span>, <span class="code-variable">event</span>.<span class="code-variable">target</span>.<span class="code-variable">textContent</span>);
  }
});`,
    sandboxCode: `// Event target simulator
const listMock = {
  id: "parent-list",
  addEventListener: function(type, callback) {
    this.listener = callback;
  },
  triggerClick: function(targetName) {
    console.log("Simulating click on:", targetName);
    this.listener({ target: { matches: (sel) => sel === ".item", textContent: targetName } });
  }
};

// Bind delegate listener
listMock.addEventListener("click", (event) => {
  if (event.target.matches(".item")) {
    console.log("-> Event Delegation handled child click:", event.target.textContent);
  }
});

listMock.triggerClick("List item 1");
listMock.triggerClick("List item 2");
`,
    quiz: {
      question: 'Which of the following describes the phase where an event ascends from the target element back up to the global window object?',
      options: [
        'The Capturing Phase',
        'The Target Phase',
        'The Bubbling Phase',
        'The Compilation Phase'
      ],
      answerIdx: 2,
      explanation: 'Events propagate in three phases: capturing (descending), target (hitting the node), and bubbling (ascending back to the root window).'
    },
    references: [
      { name: 'MDN: Introduction to the DOM', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction' },
      { name: 'MDN: Event Delegation Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation' }
    ]
  },
  {
    id: 'async-callbacks',
    title: 'Promises & Async/Await',
    heading: 'Promises & Async/Await',
    subtitle: 'Mastering asynchronous state machines, microtask queue loops, and clean async execution syntax.',
    badges: [
      { icon: Clock, text: '18 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'Async Engine', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Advanced', color: 'text-space-yellow' },
      { icon: Layers, text: 'Concurrency', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. The Nightmare of Callback Hell',
          paragraphs: [
            "Historically, JavaScript handled asynchronous operations (like network requests or disk reads) by accepting callbacks—functions passed as arguments to be executed when the task completed. This led to **Callback Hell**, where nested operations created deeply indented code (\"the pyramid of doom\"), making debugging and catching errors incredibly difficult."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Restaurant Pager Analogy',
          text: 'A Promise is like a pager handed to you at a restaurant. When you order, your pager is "pending" (the food is cooking). The pager is a promise that you will get food. If your food is ready, the pager vibrates/lights up ("fulfilled" state). If they run out of ingredients, the pager flashes red ("rejected" state). Async/await is like a waiter who handles the pager and brings the food directly to your table, letting you wait comfortably.'
        },
        {
          type: 'text',
          heading: '2. Promises as State Machines',
          paragraphs: [
            "To resolve callback issues, ES6 introduced **Promises**. A Promise is an object representing the eventual completion (or failure) of an asynchronous operation, operating as a state machine in one of three mutually exclusive states:",
            "1. **`pending`**: Initial state, neither fulfilled nor rejected.",
            "2. **`fulfilled`**: The operation completed successfully, yielding a resolved value.",
            "3. **`rejected`**: The operation failed, yielding an error/reason.",
            "Promises are immutable once settled; they cannot transition states again, guaranteeing that a resolver callback fires exactly once."
          ]
        },
        {
          type: 'text',
          heading: '3. Async/Await: Syntactic Sugar',
          paragraphs: [
            "Introduced in ES8, `async` and `await` are syntactic wrappers built on top of Promises and Generator functions. They let you write asynchronous code that reads like synchronous code.",
            "An `async` function automatically wraps its return value in a resolved Promise. The `await` keyword halts execution inside the async block until the promise settles, resolving directly to the promise value. Errors are handled cleanly using standard synchronous `try/catch` statements."
          ]
        }
      ]
    },
    summary: 'Promises act as async state machines (pending, fulfilled, rejected). Async/await wraps Promises in clean, synchronous-looking syntax, permitting readable control flows and standard try-catch error handling.',
    codeHtml: `<span class="code-comment">// resolving Promise sequence cleanly</span>
<span class="code-keyword">const</span> <span class="code-variable">fetchData</span> <span class="code-operator">=</span> () <span class="code-operator">=&gt;</span> {
  <span class="code-keyword">return</span> <span class="code-keyword">new</span> <span class="code-variable">Promise</span>((<span class="code-variable">resolve</span>, <span class="code-variable">reject</span>) <span class="code-operator">=&gt;</span> {
    <span class="code-variable">setTimeout</span>(() <span class="code-operator">=&gt;</span> <span class="code-function">resolve</span>({ <span class="code-variable">user</span>: <span class="code-string">"Vansh"</span> }), <span class="code-number">100</span>);
  });
};

<span class="code-comment">// Async/Await wrapper</span>
<span class="code-keyword">async</span> <span class="code-keyword">function</span> <span class="code-function">getUserProfile</span>() {
  <span class="code-keyword">try</span> {
    <span class="code-keyword">const</span> <span class="code-variable">data</span> <span class="code-operator">=</span> <span class="code-keyword">await</span> <span class="code-function">fetchData</span>();
    <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">data</span>.<span class="code-variable">user</span>);
  } <span class="code-keyword">catch</span> (<span class="code-variable">err</span>) {
    <span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-string">"Error caught:"</span>, <span class="code-variable">err</span>);
  }
}
<span class="code-function">getUserProfile</span>();`,
    sandboxCode: `// Run async timer simulation
const delayTimer = (ms) => new Promise(res => setTimeout(res, ms));

async function runAsyncSequence() {
  console.log("Awaiting first delay node...");
  await delayTimer(300);
  console.log("-> 300ms completed.");
  await delayTimer(200);
  console.log("-> 200ms completed. Sequence end.");
  return "Finished Sequence";
}

runAsyncSequence().then(result => console.log(result));
`,
    quiz: {
      question: 'What happens when you return a value from an async function in JavaScript?',
      options: [
        'It returns a literal primitive value immediately.',
        'It wraps the returned value inside an automatically resolved Promise.',
        'It blocks execution until the event loop is cleared.',
        'It throws a runtime type error.'
      ],
      answerIdx: 1,
      explanation: 'Marking a function as async means it will always return a Promise. Any returned value is implicitly wrapped inside a resolved Promise.'
    },
    references: [
      { name: 'MDN Web Docs: Promises Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises' },
      { name: 'MDN: Async functions reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function' }
    ]
  },
  {
    id: 'esnext-features',
    title: 'Modern ES6+ & Modular JS',
    heading: 'Modern ES6+ & Modular JS',
    subtitle: 'Exploring block scopes, rest/spread parameters, destructuring mappings, and static ES Modules.',
    badges: [
      { icon: Clock, text: '12 min read', color: 'text-purple-400' },
      { icon: Sparkles, text: 'ESNext Spec', color: 'text-[#C084FC]' },
      { icon: Compass, text: 'Intermediate', color: 'text-space-yellow' },
      { icon: Layers, text: 'Syntax', color: 'text-blue-400' }
    ],
    notes: {
      blocks: [
        {
          type: 'text',
          heading: '1. Block Scopes & Modern Declarations',
          paragraphs: [
            "ECMAScript 2015 (ES6) was the largest overhaul in JavaScript history. It addressed major architectural problems, beginning with variable scope pollution.",
            "Legacy `var` variables are function-scoped and subject to hoisting bugs. ES6 introduced `let` and `const`, which are block-scoped (constrained to the nearest curly braces `{}`). `const` creates read-only variables whose references cannot be reassigned, preventing developers from accidentally overwriting imports or configurations."
          ]
        },
        {
          type: 'takeaway',
          title: 'The Toy Box Modules Analogy',
          text: 'Old script tags were like dumping all your toys into a single giant bucket (polluting the global scope). If you had two toys named "car", they collided. ES Modules are like organizing toys into labeled, compartmentalized drawers (modules). You only take out the exact block you need (import) and keep the rest sealed inside the drawer, preventing any collisions.'
        },
        {
          type: 'text',
          heading: '2. Destructuring and Spread/Rest Operators',
          paragraphs: [
            "Modern JavaScript provides clean syntactic tools to manage data structures:",
            "- **Destructuring**: Direct syntax to extract properties from objects or items from arrays (e.g. `const { name } = user`).",
            "- **Rest Parameter (`...`)**: Gathers remaining arguments into a single array.",
            "- **Spread Operator (`...`)**: Expands array elements or object properties into a new array/object, facilitating clean shallow copies."
          ]
        },
        {
          type: 'text',
          heading: '3. ES Modules: Static Dependency Trees',
          paragraphs: [
            "Before ES6, JavaScript lacked standard modular support, relying on script tag loading orders or dynamic CommonJS (`require()`) bundles. ES Modules (ESM) introduced static `import` and `export` statements.",
            "Because ESM is static, the engine parses dependencies *before* executing code. This enables bundlers to perform **Tree-Shaking**—identifying and removing unused code blocks during packaging, significantly reducing production bundle sizes."
          ]
        }
      ]
    },
    summary: 'ES6+ updates variable declarations to block scopes (let, const) and adds destructuring and rest/spread operators. ES Modules standardise import/export dependencies, enabling compile-time bundler optimizations like tree-shaking.',
    codeHtml: `<span class="code-comment">// Module exports and destructuring</span>
<span class="code-keyword">export</span> <span class="code-keyword">const</span> <span class="code-variable">add</span> <span class="code-operator">=</span> (<span class="code-variable">a</span>, <span class="code-variable">b</span>) <span class="code-operator">=&gt;</span> <span class="code-variable">a</span> <span class="code-operator">+</span> <span class="code-variable">b</span>;

<span class="code-comment">// Importing in another file</span>
<span class="code-keyword">import</span> { <span class="code-variable">add</span> } <span class="code-keyword">from</span> <span class="code-string">"./math.js"</span>;

<span class="code-keyword">const</span> <span class="code-variable">user</span> <span class="code-operator">=</span> { <span class="code-variable">name</span>: <span class="code-string">"Vansh"</span>, <span class="code-variable">age</span>: <span class="code-number">16</span> };
<span class="code-keyword">const</span> { <span class="code-variable">name</span>, ...<span class="code-variable">rest</span> } <span class="code-operator">=</span> <span class="code-variable">user</span>;
<span class="code-variable">console</span>.<span class="code-function">log</span>(<span class="code-variable">name</span>); <span class="code-comment">// "Vansh"</span>`,
    sandboxCode: `// Validate rest and spread syntactic structures
const defaults = { host: "localhost", ssl: false };
const override = { ssl: true };

// Object merging using spread
const options = { ...defaults, ...override };
console.log("Merged options shape:", options);

// Rest validation
const list = [1, 2, 3, 4];
const [first, ...remaining] = list;
console.log("First element:", first);
console.log("Remaining rest list:", remaining);
`,
    quiz: {
      question: 'What is a major compile-time benefit of ES Modules static import statements compared to CommonJS dynamic require calls?',
      options: [
        'They execute code faster in the parser interpreter.',
        'They enable bundlers to perform Tree-Shaking, removing unused export modules.',
        'They automatically bypass the security sandbox.',
        'They compile objects directly to stack allocations.'
      ],
      answerIdx: 1,
      explanation: 'Because ES Modules declare dependencies statically, compile-time tooling can inspect the code tree and safely perform tree-shaking, removing unused code segments.'
    },
    references: [
      { name: 'MDN Web Docs: JavaScript Modules', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules' },
      { name: 'ECMAScript 2015 Spec Release', url: 'https://www.ecma-international.org/publications-and-standards/standards/ecma-262/' }
    ]
  }
];

