import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Sparkles, BookOpen, ChevronRight, Zap, Code } from 'lucide-react';

const WEIRDNESS_DATA = [
  {
    code: "0.1 + 0.2",
    result: "0.30000000000000004",
    title: "Why does 0.1 + 0.2 = 0.30000000000000004?",
    explanation: "JavaScript implements IEEE 754 double-precision 64-bit binary floats. Floating-point numbers are represented in binary (base-2), which cannot perfectly represent decimal fractions like 0.1 or 0.2. This leads to tiny rounding errors that accumulate.",
    steps: [] // Handled via interactive custom component
  },
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
  const [decimalVal, setDecimalVal] = useState("0.1");

  const active = WEIRDNESS_DATA[selectedIdx];

  const handleSelect = (idx) => {
    setSelectedIdx(idx);
    setRevealed(false);
  };

  // Binary floating point simulation logic
  const valFloat = parseFloat(decimalVal) || 0;
  
  // Calculate first 10 fractional places
  let binaryStr = "0.";
  let temp = valFloat;
  for (let i = 0; i < 10; i++) {
    temp *= 2;
    let bit = Math.floor(temp);
    binaryStr += bit;
    temp -= bit;
  }
  binaryStr += "...";

  // Calculate truncated decimal approximation
  let approxValue = 0;
  for (let i = 2; i < 12; i++) {
    if (binaryStr[i] === '1') {
      approxValue += Math.pow(2, -(i - 1));
    }
  }
  const approxStr = approxValue.toFixed(10);

  // Offset
  const offsetVal = Math.abs(valFloat - approxValue);
  const offsetStr = offsetVal.toFixed(12);

  // Error scale percentage
  const maxError = 1 / 1024;
  const errorPercentage = Math.min(100, (offsetVal / maxError) * 100);

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
              <span className="text-xs font-mono text-yellow-400 font-bold truncate max-w-[120px]">{item.result}</span>
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
                <h3 className="font-display font-black text-sm sm:text-base text-white">{active.title}</h3>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono font-bold uppercase">
                  Telemetry
                </span>
              </div>

              {active.code === "0.1 + 0.2" ? (
                // Custom Interactive Floating Point Widget
                <div className="space-y-6">
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {active.explanation}
                  </p>
                  
                  <div className="bg-[#0b0c15]/60 rounded-2xl p-5 border border-white/5 space-y-5">
                    {/* Input field */}
                    <div className="space-y-2 text-left">
                      <label className="block text-[11px] text-gray-400 font-semibold">
                        Enter Decimal Value (e.g. 0.1, 0.2, 0.3):
                      </label>
                      <input
                        type="text"
                        value={decimalVal}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (/^[0-9.]*$/.test(v)) {
                            setDecimalVal(v);
                          }
                        }}
                        className="w-full max-w-[200px] px-4 py-2.5 rounded-xl bg-black/40 border border-white/5 text-sm font-mono text-white outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20"
                      />
                    </div>

                    {/* Box 1: Binary Conversion */}
                    <div className="bg-black/35 rounded-xl p-4 border border-white/5 space-y-2 text-left">
                      <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                        <span className="text-cyan-400 font-bold">Binary Conversion (First 10 Fractional Places)</span>
                        <span>Decimal: {decimalVal || "0"}</span>
                      </div>
                      <div className="text-xs sm:text-sm font-mono text-yellow-400 font-bold tracking-wider">
                        {binaryStr}
                      </div>
                    </div>

                    {/* Box 2: Stored Value */}
                    <div className="bg-black/35 rounded-xl p-4 border border-white/5 space-y-2 text-left">
                      <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                        <span className="text-cyan-400 font-bold">Stored Value in Memory</span>
                        <span>Approximation:</span>
                      </div>
                      <div className="text-xs sm:text-sm font-mono text-purple-400 font-bold tracking-wider">
                        {approxStr}
                      </div>
                    </div>

                    {/* Error Scale */}
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-gray-400 font-semibold">Rounding Error Accumulation Scale:</span>
                        <span className="text-rose-400 font-bold">Offset: {offsetStr}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-rose-500 transition-all duration-300"
                          style={{ width: `${errorPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sum Paradox Callout */}
                  <div className="p-4 rounded-2xl border-l-2 border-yellow-500 bg-yellow-500/5 text-left text-xs leading-relaxed space-y-1.5">
                    <div className="font-bold text-yellow-400 font-display text-[11px] tracking-wider uppercase">
                      The Sum Paradox:
                    </div>
                    <p className="text-gray-300">
                      The stored representation of <span className="font-mono text-white">0.1</span> is slightly larger, while <span className="font-mono text-white">0.2</span> is slightly smaller. When added, the sum evaluates to <span className="font-mono text-white">0.30000000000000004</span>. However, the stored representation of <span className="font-mono text-white">0.3</span> is <span className="font-mono text-white">0.2998046875</span> (in 10-bit truncation). Since these values are slightly different, <span className="font-mono text-white">0.1 + 0.2 === 0.3</span> evaluates to <span className="font-mono text-red-400 font-bold">false</span>!
                    </p>
                  </div>
                </div>
              ) : (
                // Default reveal/steps traces for other simple items
                <>
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
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
