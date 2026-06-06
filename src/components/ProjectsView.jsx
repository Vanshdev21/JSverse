import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Activity, Sparkles, BookOpen, Compass, ChevronRight, Code, Terminal } from 'lucide-react';

const PROJECTS_DATA = [
  {
    name: "Todo Application",
    level: "Beginner",
    desc: "A production-grade Todo application featuring local state synchronization, local storage caching, and transition animations.",
    architecture: "UI Component (Event) ➔ State Manager ➔ LocalStorage Sync ➔ Dom Repaint",
    concepts: [
      { name: "State Immutability", detail: "Updating lists via functional array methods like map/filter/reduce instead of in-place mutation." },
      { name: "Debounced Caching", detail: "Debouncing LocalStorage writes to optimize device storage write cycles under high traffic." }
    ],
    flow: [
      { step: "1. Click Add", desc: "User triggers submit event, intercepting defaults via event.preventDefault()." },
      { step: "2. State Dispatch", desc: "React hooks append task object to data arrays: [{ id, text, done: false }]." },
      { step: "3. LocalSync", desc: "Browser LocalStorage serializes objects to JSON strings in background cycles." },
      { step: "4. Render Output", desc: "React reconciles Virtual DOM diffs and triggers GPU-accelerated repaints." }
    ]
  },
  {
    name: "Weather Dashboard",
    level: "Intermediate",
    desc: "A real-time weather analytics console pulling telemetry from remote REST APIs, demonstrating promise chains, caching, and loading skeletons.",
    architecture: "Input Fetch ➔ Telemetry Controller ➔ In-Memory Cache ➔ REST API Request ➔ UI Render",
    concepts: [
      { name: "Cache TTL", detail: "Caching query coordinates for 10 minutes to avoid redundant API hits and network costs." },
      { name: "Aborted Requests", detail: "Using AbortController to discard pending fetch requests if the user changes searches rapidly." }
    ],
    flow: [
      { step: "1. User Input", desc: "Debounced input triggers queries after 300ms of user typing idle." },
      { step: "2. Cache Check", desc: "Checks in-memory object map: if key coordinates exist, resolve immediately from RAM." },
      { step: "3. Fetch Network", desc: "Dispatches async REST request using window.fetch() with AbortController handles." },
      { step: "4. State Hydrate", desc: "Resolves JSON responses and hydrates UI dashboard components." }
    ]
  },
  {
    name: "AI Copilot Mentor",
    level: "Advanced",
    desc: "An intelligent mentor chatbot that streams responses token-by-token from Serverless AI endpoints using ReadableStreams and server-sent events.",
    architecture: "Chat Event ➔ Stream Controller ➔ EventSource SSE Reader ➔ State Queue ➔ Token Hydration",
    concepts: [
      { name: "Streaming SSE", detail: "Reading chunks line-by-line from streams using TextDecoder and async loops." },
      { name: "Prompt Debouncing", detail: "Restricting input buttons to prevent users from spamming completions and overloading limits." }
    ],
    flow: [
      { step: "1. Dispatch prompt", desc: "User clicks submit; button transitions to active executing state." },
      { step: "2. Open Stream", desc: "Fetch request returns a ReadableStream. Get the reader: response.body.getReader()." },
      { step: "3. Text Decoding", desc: "Async loop reads stream buffers: reader.read() and converts binary bytes to strings." },
      { step: "4. Live Update", desc: "Appends decoded tokens to local message state arrays in real-time." }
    ]
  }
];

export default function ProjectsView() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const active = PROJECTS_DATA[selectedIdx];

  return (
    <div className="relative pt-28 pb-20 overflow-hidden min-h-screen text-left max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background radial glows */}
      <div className="absolute top-[10%] left-0 w-[400px] h-[400px] ambient-purple-glow -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-0 w-[300px] h-[300px] ambient-yellow-glow -z-10 pointer-events-none"></div>

      {/* Header section */}
      <div className="space-y-4 pb-8 border-b border-white/5 mb-10">
        <div className="inline-flex items-center gap-1.5 text-[10px] text-space-yellow font-display font-bold tracking-wider uppercase">
          <Layers className="h-4 w-4" /> PRODUCTION PROJECTS
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
          JSVerse Architecture Laboratory
        </h1>
        <p className="text-space-textSecondary text-xs sm:text-sm max-w-2xl leading-relaxed">
          Select a project blueprint below to inspect its architecture diagrams, visual data flow telemetry, and production-grade software patterns.
        </p>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left selectors (Col-5) */}
        <div className="lg:col-span-5 space-y-3">
          {PROJECTS_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`p-4.5 rounded-2xl border cursor-pointer transition-all ${
                selectedIdx === idx 
                  ? 'bg-purple-600/10 border-purple-500 shadow-glow-purple' 
                  : 'glass-card-premium border-white/5'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-display font-bold text-sm text-white">{item.name}</span>
                <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                  item.level === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                  item.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {item.level}
                </span>
              </div>
              <p className="text-space-textSecondary text-[11px] leading-relaxed line-clamp-2">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right blueprints (Col-7) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="glass-card-premium p-6 rounded-3xl border border-purple-500/10 bg-gradient-to-b from-purple-500/5 to-transparent space-y-6"
            >
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <h3 className="font-display font-black text-lg text-white">Project Blueprint</h3>
                <span className="text-[10px] bg-yellow-500/20 text-yellow-300 px-2.5 py-0.5 rounded-full font-mono font-bold uppercase">
                  {active.level}
                </span>
              </div>

              {/* Architecture diagram */}
              <div className="space-y-2">
                <span className="text-[10px] text-gray-500 font-mono uppercase font-bold tracking-wider">Architecture Data Flow</span>
                <div className="bg-black/60 border border-purple-500/10 rounded-2xl p-4 font-mono text-[10px] sm:text-xs text-yellow-300 leading-relaxed text-center">
                  {active.architecture}
                </div>
              </div>

              {/* Data flow steps */}
              <div className="space-y-3">
                <span className="text-[10px] text-gray-500 font-mono uppercase font-bold tracking-wider">Flow Telemetry</span>
                <div className="relative border-l border-purple-500/20 pl-4 space-y-4 ml-1">
                  {active.flow.map((node, i) => (
                    <div key={i} className="relative text-xs">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 border-2 border-space-bg" />
                      <div className="font-semibold text-purple-300 font-mono">{node.step}</div>
                      <div className="text-gray-400 mt-0.5 leading-relaxed">{node.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Production concepts */}
              <div className="space-y-3">
                <span className="text-[10px] text-gray-500 font-mono uppercase font-bold tracking-wider">Production Patterns</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {active.concepts.map((concept, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs space-y-1">
                      <div className="font-bold text-white font-mono flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-[#7C3AED]" />
                        <span>{concept.name}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{concept.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
