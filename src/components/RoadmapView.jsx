import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, ChevronRight, Zap, Target, BookOpen, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ROADMAP_NODES = [
  {
    phase: "Phase 01: Core Matrix",
    color: "#7C3AED",
    nodes: [
      { id: 'intro-exists', label: '1. Why JS Exists', status: 'completed', desc: 'Brendan Eich, Netscape history, and ECMAScript standardization.' },
      { id: 'data-primitives', label: '2. Data Types & Memory', status: 'completed', desc: 'Stack vs Heap allocation, primitives vs reference object types.' },
      { id: 'data-coercion', label: '3. Logic & Coercion', status: 'completed', desc: 'Loose vs strict equality comparison and implicit type casting.' },
      { id: 'loops-control', label: '4. Flow Control', status: 'completed', desc: 'Iterating with conditional loop blocks, break and continue flow.' }
    ]
  },
  {
    phase: "Phase 02: Execution Context",
    color: "#FACC15",
    nodes: [
      { id: 'func-closures', label: '5. Scopes & Closures', status: 'active', desc: 'First-class citizens, lexical scopes, and heap state closures.' },
      { id: 'obj-prototypes', label: '6. Prototype Chain', status: 'upcoming', desc: 'Implicit linking, prototypal delegation lookup, and properties inheritance.' },
      { id: 'arr-mechanics', label: '7. Collections & Maps', status: 'upcoming', desc: 'JavaScript arrays mechanics, sparse allocations, and methods.' }
    ]
  },
  {
    phase: "Phase 03: Async Event Loop",
    color: "#7C3AED",
    nodes: [
      { id: 'dom-interaction', label: '8. DOM & Events', status: 'upcoming', desc: 'Page tree mutations, event propagation phases, and event delegation.' },
      { id: 'async-callbacks', label: '9. Asynchronous JS', status: 'upcoming', desc: 'Asynchronous state machines, Microtask queues, Promises, and Async/Await.' }
    ]
  },
  {
    phase: "Phase 04: Modular Architecture",
    color: "#FACC15",
    nodes: [
      { id: 'esnext-features', label: '10. Modern JavaScript', status: 'upcoming', desc: 'Block scopes, destructuring, rest/spread parameters, and ES Modules.' }
    ]
  }
];

export default function RoadmapView() {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState(ROADMAP_NODES[0].nodes[0]);

  return (
    <div className="relative pt-28 pb-20 overflow-hidden min-h-screen text-left max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background radial glows */}
      <div className="absolute top-[10%] left-0 w-[400px] h-[400px] ambient-purple-glow -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-0 w-[300px] h-[300px] ambient-yellow-glow -z-10 pointer-events-none"></div>

      {/* Header section */}
      <div className="space-y-4 pb-8 border-b border-white/5 mb-10">
        <div className="inline-flex items-center gap-1.5 text-[10px] text-[#7C3AED] font-display font-bold tracking-wider uppercase">
          <Compass className="h-4 w-4" /> LEARNING PATHWAYS
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
          JSVerse Celestial Roadmap
        </h1>
        <p className="text-space-textSecondary text-xs sm:text-sm max-w-2xl leading-relaxed">
          Explore the chronological hierarchy of JavaScript concepts. Click on any module node to inspect variables and access the article.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Roadmap Pathways column (Col-7) */}
        <div className="lg:col-span-7 space-y-12 relative">
          
          {/* Vertical connection vector line */}
          <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#7C3AED] via-[#FACC15] to-[#7C3AED]/20 -z-10"></div>

          {ROADMAP_NODES.map((phase, phaseIdx) => (
            <div key={phaseIdx} className="space-y-4">
              
              {/* Phase Header */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-[#050816] border-2 shadow-sm z-10"
                  style={{ borderColor: phase.color }}
                >
                  <Target className="h-4.5 w-4.5" style={{ color: phase.color }} />
                </div>
                <h3 className="font-display font-bold text-sm tracking-widest uppercase text-white">
                  {phase.phase}
                </h3>
              </div>

              {/* Subnodes */}
              <div className="pl-12 space-y-3">
                {phase.nodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const isCompleted = node.status === 'completed';
                  const isActive = node.status === 'active';
                  
                  return (
                    <motion.div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-[#7C3AED]/15 border-[#7C3AED] shadow-glow-purple' 
                          : 'glass-card-premium border-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`w-2 h-2 rounded-full ${
                          isCompleted ? 'bg-[#7C3AED] shadow-[0_0_8px_#7C3AED]' :
                          isActive ? 'bg-[#FACC15] animate-ping' :
                          'bg-white/10'
                        }`}></span>
                        
                        <span className={`font-display text-xs font-bold uppercase tracking-wider ${
                          isCompleted || isActive ? 'text-white' : 'text-space-textSecondary'
                        }`}>
                          {node.label}
                        </span>
                      </div>

                      <ChevronRight className="h-3.5 w-3.5 text-space-textSecondary/40" />
                    </motion.div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Node Inspector preview card (Col-5) */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass-card-premium p-6 rounded-3xl border border-[#7C3AED]/25 bg-gradient-to-b from-[#7C3AED]/5 to-transparent space-y-5"
              >
                <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
                  <span className="text-[9px] font-mono text-space-yellow tracking-widest uppercase font-bold">Node Telemetry</span>
                  <span className="px-2 py-0.5 rounded-[4px] text-[8px] font-mono bg-white/5 text-space-textSecondary font-bold uppercase tracking-wider">
                    {selectedNode.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-lg text-white">
                    {selectedNode.label.substring(3)}
                  </h4>
                  <p className="text-space-textSecondary text-[11px] sm:text-xs leading-relaxed">
                    {selectedNode.desc}
                  </p>
                </div>

                {/* Micro Console Output */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 font-mono text-[9px] text-space-textSecondary space-y-1.5">
                  <div className="flex items-center justify-between text-space-purple/70">
                    <span>// GRID_LINK</span>
                    <Activity className="h-3 w-3 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                    <span>ENV: RESOLVED</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/notes', { state: { activeTopicId: selectedNode.id } })}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#FACC15] font-display text-xs font-bold text-white uppercase tracking-wider shadow-glow-purple hover:scale-[1.02] active:scale-95 transition-transform"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Read Chapter
                </button>
              </motion.div>
            ) : (
              <div className="glass-card-premium p-8 rounded-3xl border border-white/5 text-center space-y-3">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mx-auto text-space-textSecondary">
                  <Zap className="h-4.5 w-4.5 animate-pulse" />
                </div>
                <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">Select Node</h4>
                <p className="text-space-textSecondary text-xs leading-relaxed">
                  Select a module on the learning path to load status variables.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
