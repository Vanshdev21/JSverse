import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Sparkles, BookOpen, ChevronRight, Zap, Code } from 'lucide-react';

const WEIRDNESS_DATA = [
  {
    code: "typeof null",
    result: '"object"',
    title: "Why typeof null is an object",
    explanation: "This is a historical bug from the first version of JavaScript. In the original JS implementation, values were stored in 32-bit units, consisting of a type tag (1-3 bits) and the actual value data. The type tag for objects was 000. Since null was represented as the null pointer (0x00 on most platforms), its type tag was read as 000, causing typeof to return 'object'.",
    steps: [
      { label: "Check Value", detail: "null (0x00000000)" },
      { label: "Read Type Tag", detail: "First 3 bits are 000 (Object Tag)" },
      { label: "Evaluation", detail: "Engine returns 'object'" }
    ]
  },
  {
    code: "[] + []",
    result: '""',
    title: "Why empty arrays added together make an empty string",
    explanation: "When the '+' operator is used, JavaScript tries to convert both operands to primitives. For objects (including arrays), it calls the internal [[ToPrimitive]] method, which falls back to calling .toString(). An empty array [].toString() yields an empty string ''. Thus, the expression becomes '' + '', resulting in an empty string.",
    steps: [
      { label: "[[ToPrimitive]] conversion", detail: "Call [].toString() on left operand" },
      { label: "Result Left", detail: "'' (empty string)" },
      { label: "Result Right", detail: "'' (empty string)" },
      { label: "Concatenation", detail: "'' + '' evaluates to ''" }
    ]
  },
  {
    code: "NaN === NaN",
    result: "false",
    title: "Why NaN is not equal to itself",
    explanation: "IEEE 754 floating-point standard (which JS uses for numbers) specifies that NaN (Not-a-Number) is unordered. Therefore, any comparison involving NaN, including a comparison with itself, must return false. The only way to check for NaN is using Number.isNaN() or checking if a value is not equal to itself (x !== x).",
    steps: [
      { label: "Check Float Standards", detail: "Refer to IEEE 754 float rules" },
      { label: "Comparison", detail: "NaN compared to NaN is unordered" },
      { label: "Evaluation", detail: "Engine evaluates to false" }
    ]
  },
  {
    code: "{} + []",
    result: "0",
    title: "Why object plus array makes zero",
    explanation: "In many JS consoles, the leading '{}' is parsed as an empty block of code rather than an object literal. The '+' operator then acts as a unary plus operator on the empty array '[]'. Unary plus converts its operand to a number. Since an empty array stringifies to '', and Number('') evaluates to 0, the result is 0.",
    steps: [
      { label: "Parser phase", detail: "Treat leading {} as an empty block statement" },
      { label: "Expression phase", detail: "Evaluate remainder: +[] (unary plus on empty array)" },
      { label: "Type conversion", detail: "Convert [] to string ('') and then to number" },
      { label: "Evaluation", detail: "Number('') evaluates to 0" }
    ]
  }
];

export default function WeirdnessView() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const active = WEIRDNESS_DATA[selectedIdx];

  const handleSelect = (idx) => {
    setSelectedIdx(idx);
    setRevealed(false);
  };

  return (
    <div className="relative pt-28 pb-20 overflow-hidden min-h-screen text-left max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background radial glows */}
      <div className="absolute top-[10%] left-0 w-[400px] h-[400px] ambient-purple-glow -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-0 w-[300px] h-[300px] ambient-yellow-glow -z-10 pointer-events-none"></div>

      {/* Header section */}
      <div className="space-y-4 pb-8 border-b border-white/5 mb-10">
        <div className="inline-flex items-center gap-1.5 text-[10px] text-[#FACC15] font-display font-bold tracking-wider uppercase">
          <HelpCircle className="h-4 w-4 text-space-yellow animate-pulse" /> JAVASCRIPT WEIRDNESS
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
          JS Weirdness Laboratory
        </h1>
        <p className="text-space-textSecondary text-xs sm:text-sm max-w-2xl leading-relaxed">
          JavaScript is filled with design compromises and quirks. Choose an expression below to visually trace how the engine evaluates type tags and primitives under the hood.
        </p>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left selector column (Col-5) */}
        <div className="lg:col-span-5 space-y-3">
          {WEIRDNESS_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                selectedIdx === idx 
                  ? 'bg-purple-600/10 border-purple-500 shadow-glow-purple' 
                  : 'glass-card-premium border-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Code className="h-4.5 w-4.5 text-[#7C3AED]" />
                <span className="font-mono text-sm font-bold text-white">{item.code}</span>
              </div>
              <span className="text-xs font-mono text-yellow-400 font-bold">{item.result}</span>
            </motion.div>
          ))}
        </div>

        {/* Right visualization column (Col-7) */}
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
                <h3 className="font-display font-black text-lg text-white">{active.title}</h3>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono font-bold uppercase">
                  Telemetry
                </span>
              </div>

              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 font-mono text-sm flex justify-between items-center">
                <span className="text-gray-400">{active.code}</span>
                <span className="text-purple-400 font-bold">⇒ {active.result}</span>
              </div>

              {!revealed ? (
                <div className="text-center py-10 space-y-4">
                  <p className="text-xs text-gray-400">Ready to trace memory type tags and coercion sequences?</p>
                  <button
                    onClick={() => setRevealed(true)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-yellow-500 font-display text-xs font-bold text-white uppercase tracking-wider shadow-glow-purple active:scale-95 transition"
                  >
                    Reveal Internals
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Coercion Steps */}
                  <div className="space-y-3">
                    <span className="text-[10px] text-gray-500 font-mono uppercase font-bold tracking-wider">Evaluation Steps</span>
                    <div className="relative border-l border-purple-500/20 pl-4 space-y-4 ml-1">
                      {active.steps.map((step, i) => (
                        <div key={i} className="relative text-xs">
                          <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 border-2 border-space-bg" />
                          <div className="font-semibold text-purple-300 font-mono">{step.label}</div>
                          <div className="text-gray-400 font-mono mt-0.5">{step.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Written explanation */}
                  <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 text-xs leading-relaxed text-gray-300 space-y-2">
                    <div className="flex items-center gap-1 text-yellow-400 font-bold">
                      <Zap className="w-3.5 h-3.5" />
                      <span>EXPLANATION</span>
                    </div>
                    <p>{active.explanation}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
