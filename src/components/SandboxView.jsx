import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import CodeEditor from "./CodeEditor";
import VisualizationCard from "./VisualizationCard";
import CallStackCard from "./CallStackCard";
import ScopeChainCard from "./ScopeChainCard";
import ExecutionContextCard from "./ExecutionContextCard";
import MemoryHeapCard from "./MemoryHeapCard";
import EventLoopCard from "./EventLoopCard";
import MicrotaskQueueCard from "./MicrotaskQueueCard";
import ConsoleOutputCard from "./ConsoleOutputCard";
import TimelineControls from "./TimelineControls";
import ErrorBoundary from "./ErrorBoundary";
import { runCodeInWorker } from "../utils/workerManager";

// Top editor bar with filename and controls
const TopEditorBar = ({ onRun, onReset, autoRun, setAutoRun, theme, setTheme, isExecuting }) => (
  <div className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-lg rounded-full px-5 py-2 shadow-lg z-10 border border-purple-500/10">
    <span className="text-sm text-gray-400 font-mono">sandbox.js</span>
    <button
      onClick={onRun}
      disabled={isExecuting}
      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-yellow-500 text-white text-xs font-semibold hover:opacity-90 shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
      aria-label="Run sandbox code"
    >
      {isExecuting ? (
        <>
          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Running...
        </>
      ) : (
        "Run ▶"
      )}
    </button>
    <button
      onClick={onReset}
      className="px-3 py-1.5 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 text-xs transition"
    >
      Reset
    </button>
    <button
      onClick={() => setAutoRun(!autoRun)}
      className={`px-4.5 py-2 rounded-full text-xs font-bold flex items-center gap-2 border transition-all ${
        autoRun 
          ? 'bg-purple-600/35 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(124,58,237,0.3)] animate-pulse' 
          : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-600'
      }`}
    >
      <span className={`w-2.5 h-2.5 rounded-full ${autoRun ? 'bg-purple-400' : 'bg-gray-500'}`} />
      Auto‑Play
    </button>
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 text-xs transition"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  </div>
);

const SandboxView = () => {
  const defaultCode = `function outer() {
  let count = 0;

  function inner() {
    count++;
    return count;
  }

  return inner;
}

const fn = outer();
console.log(fn()); // 1
console.log(fn()); // 2

// Asynchronous demonstration
setTimeout(function cb() {
  console.log("Macrotask callback!");
}, 0);

Promise.resolve("Microtask value").then(function promiseCb(val) {
  console.log("Microtask resolved with:", val);
});

console.log(fn()); // 3`;

  const [code, setCode] = useState(defaultCode);
  const [steps, setSteps] = useState([]);
  const [current, setCurrent] = useState(0);
  const [autoRun, setAutoRun] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("visualization");
  const [isExecuting, setIsExecuting] = useState(false);
  const [execError, setExecError] = useState(null);

  const executeCode = useCallback((codeToRun) => {
    setIsExecuting(true);
    setExecError(null);

    return runCodeInWorker(
      codeToRun,
      (generatedSteps) => {
        setSteps(generatedSteps);
        setCurrent(0);
        setIsExecuting(false);
      },
      (errorMsg) => {
        setExecError(errorMsg);
        setIsExecuting(false);
        setSteps([
          {
            line: 1,
            callStack: [{ name: "(error)", line: 1 }],
            scopeChain: [],
            context: { thisValue: "undefined", lexicalEnv: "error", variables: [] },
            heap: [],
            eventLoop: { status: "Idle", queue: [] },
            microtaskQueue: [],
            logs: [`Error: ${errorMsg}`]
          }
        ]);
        setCurrent(0);
      }
    );
  }, []);

  // Run initial code on mount
  useEffect(() => {
    const abort = executeCode(defaultCode);
    return () => abort();
  }, [executeCode]);

  const handleRun = useCallback(() => {
    executeCode(code);
  }, [code, executeCode]);

  const handleReset = () => {
    executeCode(code);
  };

  // Auto‑run playback effect
  useEffect(() => {
    if (autoRun && steps.length > 0) {
      const interval = setInterval(() => {
        setCurrent((c) => {
          if (c < steps.length - 1) return c + 1;
          clearInterval(interval);
          return c;
        });
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [autoRun, steps]);

  // Extract variables for current step
  const currentStep = steps[current] || {};
  const callStack = currentStep.callStack || [];
  const scopeChain = currentStep.scopeChain || [];
  const context = currentStep.context || null;
  const heap = currentStep.heap || [];
  const eventLoop = currentStep.eventLoop || { status: "Idle", queue: [] };
  const microtaskQueue = currentStep.microtaskQueue || [];
  const logs = currentStep.logs || [];
  const activeLine = currentStep.line || 0;

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-space-bg" : "bg-white"} text-space-textPrimary relative`}>
      <TopEditorBar
        onRun={handleRun}
        onReset={handleReset}
        autoRun={autoRun}
        setAutoRun={setAutoRun}
        theme={theme}
        setTheme={setTheme}
        isExecuting={isExecuting}
      />
      
      <div className="flex flex-col md:flex-row pt-20 h-auto md:h-[calc(100vh-20px)] overflow-y-auto md:overflow-hidden">
        {/* LEFT – Code editor (45%) */}
        <div className="w-full md:w-[45%] p-4 flex flex-col h-[500px] md:h-full">
          <div className="bg-black/40 backdrop-blur-lg rounded-2xl h-full p-3 flex flex-col gap-2 border border-purple-500/10 shadow-lg">
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-xs font-semibold text-gray-400 font-mono">index.js</span>
              <div className="flex gap-2">
                <button
                  onClick={handleRun}
                  disabled={isExecuting}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-yellow-500 text-white text-xs font-semibold hover:opacity-90 shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                  aria-label="Run sandbox code"
                >
                  {isExecuting ? (
                    <>
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Running...
                    </>
                  ) : (
                    "Run ▶"
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 text-xs transition"
                  aria-label="Reset sandbox"
                >
                  Reset
                </button>
              </div>
            </div>
            <CodeEditor code={code} onChange={setCode} theme={theme} activeLine={activeLine} />
          </div>
        </div>

        {/* RIGHT – Visualization dashboard (55%) */}
        <div className="w-full md:w-[55%] p-4 flex flex-col space-y-4 h-auto md:h-full overflow-y-auto md:overflow-hidden">
          {/* Tab bar header */}
          <div className="flex justify-between items-center border-b border-purple-500/10 pb-2 px-1">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("visualization")}
                className={`text-sm font-semibold pb-2 border-b-2 px-1 transition-all ${
                  activeTab === "visualization" ? "border-purple-500 text-white" : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                Visualization
              </button>
              <button
                onClick={() => setActiveTab("output")}
                className={`text-sm font-semibold pb-2 border-b-2 px-1 transition-all ${
                  activeTab === "output" ? "border-purple-500 text-white" : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                Output
              </button>
            </div>
            {/* Auto Run/Step status */}
            <div className="flex items-center gap-3">
              {execError && (
                <span className="text-xs text-red-400 font-mono bg-red-500/10 px-2.5 py-0.5 rounded-full animate-pulse border border-red-500/20">
                  ⚠️ Error Detected
                </span>
              )}
              <span className="text-xs text-purple-400 font-mono bg-purple-500/10 px-2 py-0.5 rounded-full">
                Step {steps.length > 0 ? current + 1 : 0} of {steps.length}
              </span>
            </div>
          </div>

          {/* Tab content */}
          <div className="flex-grow overflow-y-auto pr-1">
            {activeTab === "visualization" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ErrorBoundary>
                  <VisualizationCard title="Call Stack">
                    <CallStackCard stack={callStack} />
                  </VisualizationCard>
                </ErrorBoundary>
                <ErrorBoundary>
                  <VisualizationCard title="Scope Chain">
                    <ScopeChainCard chain={scopeChain} />
                  </VisualizationCard>
                </ErrorBoundary>
                <ErrorBoundary>
                  <VisualizationCard title="Execution Context">
                    <ExecutionContextCard ctx={context} />
                  </VisualizationCard>
                </ErrorBoundary>
                <ErrorBoundary>
                  <VisualizationCard title="Event Loop">
                    <EventLoopCard data={eventLoop} />
                  </VisualizationCard>
                </ErrorBoundary>
                <ErrorBoundary>
                  <VisualizationCard title="Microtask Queue">
                    <MicrotaskQueueCard queue={microtaskQueue} />
                  </VisualizationCard>
                </ErrorBoundary>
                <ErrorBoundary>
                  <VisualizationCard title="Memory Heap">
                    <MemoryHeapCard heap={heap} />
                  </VisualizationCard>
                </ErrorBoundary>
              </div>
            ) : (
              <ErrorBoundary>
                <div className="h-full">
                  <ConsoleOutputCard logs={logs} />
                </div>
              </ErrorBoundary>
            )}
          </div>

          {/* Timeline Controls */}
          <div className="bg-black/40 backdrop-blur-lg border border-purple-500/10 rounded-2xl p-3 shadow-md">
            <TimelineControls
              steps={steps}
              current={current}
              setCurrent={setCurrent}
              autoRun={autoRun}
              setAutoRun={setAutoRun}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SandboxView;
