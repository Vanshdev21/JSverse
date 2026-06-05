import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, Copy, Code, Sparkles, Check } from 'lucide-react';

const CODE_TEMPLATES = [
  {
    name: "Scope Closures",
    code: `// Closures retain outer lexical environment variables
function createStarship(shipName) {
  let speed = 0;
  
  return {
    warp() {
      speed += 10;
      console.log(\`\${shipName} speed boosted to Warp \${speed}!\`);
    },
    status() {
      console.log(\`Current status: \${shipName} traveling at Warp \${speed}.\`);
    }
  };
}

const normandy = createStarship("Normandy SR-2");
normandy.warp();
normandy.warp();
normandy.status();`
  },
  {
    name: "Array Reducers",
    code: `// Transform collections immutably
const database = [
  { module: "Core Stack", latency: 12 },
  { module: "Event Loop", latency: 4 },
  { module: "DOM Paint", latency: 28 },
  { module: "Heap Alloc", latency: 15 }
];

// Calculate average latency
const totalLatency = database.reduce((sum, item) => sum + item.latency, 0);
const average = totalLatency / database.length;

console.log("Telemetry results:");
console.log("Average Latency:", average, "ms");

// Filter slow modules
const slowModules = database.filter(item => item.latency > 10);
console.log("Slow modules:", slowModules.map(m => m.module));`
  },
  {
    name: "Async Promises",
    code: `// Asynchronous flow using Promises
function fetchTelemetry() {
  console.log("[1] Requesting core telemetry...");
  
  return new Promise((resolve) => {
    // Mimic API delay
    setTimeout(() => {
      resolve({ status: "ONLINE", systemTime: Date.now() });
    }, 800);
  });
}

console.log("[0] Initializing boot sequence...");

fetchTelemetry().then((data) => {
  console.log("[2] Response received:", data);
  console.log("[3] Warp core stabilized.");
});`
  }
];

export default function PlaygroundView() {
  const [code, setCode] = useState(CODE_TEMPLATES[0].code);
  const [logs, setLogs] = useState([]);
  const [copied, setCopied] = useState(false);

  const handleRunCode = () => {
    setLogs([]);
    const outputs = [];
    
    // Override log
    const originalLog = console.log;
    console.log = (...args) => {
      outputs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
    };

    try {
      // Execute in sandbox context
      const result = new Function(code)();
      if (result !== undefined) {
        outputs.push(`↳ Return value: ${typeof result === 'object' ? JSON.stringify(result) : String(result)}`);
      }
    } catch (err) {
      outputs.push(`✖ Compiler Error: ${err.message}`);
    }

    console.log = originalLog;
    setLogs(outputs.length > 0 ? outputs : ["Code completed successfully with no logs."]);
  };

  const handleReset = () => {
    setCode(CODE_TEMPLATES[0].code);
    setLogs([]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative pt-28 pb-20 overflow-hidden min-h-screen text-left max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background radial glows */}
      <div className="absolute top-[10%] left-0 w-[400px] h-[400px] ambient-purple-glow -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-0 w-[300px] h-[300px] ambient-yellow-glow -z-10 pointer-events-none"></div>

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8 mb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-space-yellow font-display font-bold tracking-wider uppercase">
            <Terminal className="h-4 w-4" /> COMPILER TERMINAL
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
            Code Playground
          </h1>
          <p className="text-space-textSecondary text-xs sm:text-sm max-w-xl leading-relaxed">
            Write, compile, and run live JavaScript. Select preset templates to quickly inspect scope and async events.
          </p>
        </div>

        {/* Preset Selectors */}
        <div className="flex flex-wrap gap-1.5">
          {CODE_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.name}
              onClick={() => {
                setCode(tmpl.code);
                setLogs([]);
              }}
              className="px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/5 hover:border-[#7C3AED]/30 hover:bg-[#7C3AED]/5 text-space-textPrimary hover:text-white transition-all"
            >
              {tmpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* Workspace Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Editor Box (Col-7) */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-[#7C3AED]/20 overflow-hidden shadow-glow-purple bg-[#050816]/75">
          
          {/* Editor Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-[#7C3AED]" />
              <span className="font-mono text-[10px] uppercase font-bold text-white tracking-wider">main.js</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded bg-white/5 border border-white/5 hover:bg-white/10 text-space-textSecondary hover:text-white transition-colors"
                title="Copy Workspace"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 rounded bg-white/5 border border-white/5 hover:bg-white/10 text-space-textSecondary hover:text-white transition-colors"
                title="Reset Workspace"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Text Editor Box */}
          <div className="flex-1 relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 p-5 font-mono text-xs bg-transparent text-white outline-none resize-none focus:ring-0 leading-relaxed"
              spellCheck="false"
            />
          </div>

          {/* Editor Action Footer */}
          <div className="p-3.5 border-t border-white/5 bg-[#050816]/40 flex justify-end">
            <button
              onClick={handleRunCode}
              className="px-5 py-2 rounded-xl font-display font-bold text-[10px] uppercase tracking-widest bg-gradient-to-r from-[#7C3AED] to-[#FACC15] text-white shadow-glow-purple flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <Play className="h-4 w-4 fill-white" />
              Run Code
            </button>
          </div>
        </div>

        {/* Console Box (Col-5) */}
        <div className="lg:col-span-5 flex flex-col rounded-2xl border border-white/10 bg-[#050816] overflow-hidden">
          
          {/* Console Header */}
          <div className="px-5 py-3.5 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <span className="font-display font-bold text-[10px] tracking-widest text-space-textSecondary uppercase">
              CONSOLE READOUTS
            </span>
            <Sparkles className="h-4 w-4 text-[#FACC15] animate-pulse" />
          </div>

          {/* Console log list */}
          <div className="flex-1 p-5 font-mono text-xs space-y-2.5 overflow-y-auto min-h-[280px] lg:h-96 text-green-400 bg-black/35">
            {logs.length === 0 ? (
              <div className="text-space-textSecondary/40 italic text-center mt-12">
                Ready to execute. Press "Run Code" to compile.
              </div>
            ) : (
              logs.map((log, index) => (
                <div 
                  key={index} 
                  className="p-3 rounded-xl border border-white/5 bg-white/5 whitespace-pre-wrap leading-relaxed shadow-sm"
                >
                  {log}
                </div>
              ))
            )}
          </div>
          
          {/* Console footer */}
          <div className="p-3 border-t border-white/5 bg-white/5 font-mono text-[8px] text-space-textSecondary uppercase tracking-widest text-center">
            V8_EMULATOR_NODE: RUNNING
          </div>
        </div>

      </div>
    </div>
  );
}
