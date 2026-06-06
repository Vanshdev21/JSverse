import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle, XCircle, Sparkles, Compass, ChevronRight, Zap, Target, BookOpen, Clock } from 'lucide-react';

const PUZZLES_DATA = [
  {
    id: "async-execution-order",
    title: "Async Microtask Execution Order",
    question: "What is the exact order of logs printed by this JavaScript code?",
    code: `console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");`,
    options: [
      "Start, Timeout, Promise, End",
      "Start, End, Timeout, Promise",
      "Start, End, Promise, Timeout",
      "Start, Promise, End, Timeout"
    ],
    answerIdx: 2,
    explanation: "First, synchronous code executes. 'Start' is printed. The setTimeout gets pushed to the Web API and its callback is queued in the Macrotask Queue. The Promise.then callback gets queued in the Microtask Queue. Then, the synchronous 'End' is printed. Since the Call Stack is now empty, the Event Loop processes the Microtask Queue first, printing 'Promise'. Finally, it pulls the callback from the Macrotask Queue, printing 'Timeout'."
  },
  {
    id: "closures-loop",
    title: "The Var Loop Closure Trap",
    question: "What will this code print to the console?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}`,
    options: [
      "0, 1, 2",
      "3, 3, 3",
      "undefined, undefined, undefined",
      "2, 2, 2"
    ],
    answerIdx: 1,
    explanation: "Because 'var' is function-scoped rather than block-scoped, there is only a single binding of 'i' shared across all iterations of the loop. By the time the setTimeout callbacks execute 100ms later, the loop has completed, and 'i' has been incremented to 3. All three callbacks reference this same shared variable, printing '3' three times. (Using 'let' instead of 'var' would create a new lexical binding for each loop iteration, printing 0, 1, 2)."
  },
  {
    id: "coercion-math",
    title: "Coercion Arithmetic Weirdness",
    question: "What will this expression evaluate to?",
    code: `[] + {}`,
    options: [
      "0",
      "[object Object]",
      "NaN",
      "undefined"
    ],
    answerIdx: 1,
    explanation: "JavaScript tries to convert both operands to primitives. [].toString() yields the empty string ''. {}.toString() yields '[object Object]'. The '+' operator concatenates them: '' + '[object Object]', resulting in '[object Object]'."
  }
];

export default function InterviewView() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const active = PUZZLES_DATA[selectedIdx];

  const handleSelectPuzzle = (idx) => {
    setSelectedIdx(idx);
    setSelectedOption(null);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
  };

  const isCorrect = selectedOption === active.answerIdx;

  return (
    <div className="relative pt-28 pb-20 overflow-hidden min-h-screen text-left max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background radial glows */}
      <div className="absolute top-[10%] left-0 w-[400px] h-[400px] ambient-purple-glow -z-10 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-0 w-[300px] h-[300px] ambient-yellow-glow -z-10 pointer-events-none"></div>

      {/* Header section */}
      <div className="space-y-4 pb-8 border-b border-white/5 mb-10">
        <div className="inline-flex items-center gap-1.5 text-[10px] text-space-yellow font-display font-bold tracking-wider uppercase">
          <Target className="h-4.5 w-4.5" /> INTERVIEW PREP
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
          JSVerse Celestial Quizzes
        </h1>
        <p className="text-space-textSecondary text-xs sm:text-sm max-w-2xl leading-relaxed">
          Gamified output prediction, memory tracing, and asynchronous loop puzzles to prepare you for senior JavaScript interviews.
        </p>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left selectors (Col-5) */}
        <div className="lg:col-span-5 space-y-3">
          {PUZZLES_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              onClick={() => handleSelectPuzzle(idx)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                selectedIdx === idx 
                  ? 'bg-purple-600/10 border-purple-500 shadow-glow-purple' 
                  : 'glass-card-premium border-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="h-4.5 w-4.5 text-[#7C3AED]" />
                <span className="font-display font-bold text-xs text-white uppercase tracking-wider">{item.title}</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-space-textSecondary/40" />
            </motion.div>
          ))}
        </div>

        {/* Right challenge console (Col-7) */}
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
                <span className="text-[10px] bg-[#7C3AED]/20 text-[#C084FC] px-2 py-0.5 rounded font-mono font-bold uppercase">
                  Challenge
                </span>
              </div>

              {/* Question */}
              <div className="text-xs text-gray-300 font-semibold">{active.question}</div>

              {/* Code block */}
              <pre className="p-4 rounded-2xl bg-black/60 border border-white/5 font-mono text-xs text-gray-200 overflow-x-auto whitespace-pre leading-relaxed">
                <code>{active.code}</code>
              </pre>

              {/* Options */}
              <div className="space-y-2.5">
                {active.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => !submitted && setSelectedOption(idx)}
                      disabled={submitted}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs font-mono transition-all flex justify-between items-center ${
                        isSelected 
                          ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-white' 
                          : 'bg-white/5 border-white/5 text-gray-300 hover:border-white/10'
                      } ${submitted ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                    >
                      <span>{option}</span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-purple-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Action and feedback */}
              <div className="space-y-4">
                {!submitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#FACC15] font-display text-xs font-bold text-black uppercase tracking-wider shadow-glow-yellow active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className={`p-4 rounded-2xl flex items-start gap-3 border ${
                      isCorrect 
                        ? 'bg-green-500/10 border-green-500/20 text-green-300' 
                        : 'bg-red-500/10 border-red-500/20 text-red-300'
                    }`}>
                      {isCorrect ? <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                      <div>
                        <div className="font-bold text-xs font-mono uppercase tracking-wider mb-1">
                          {isCorrect ? "Correct Telemetry!" : "Incorrect Telemetry!"}
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {active.explanation}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectPuzzle(selectedIdx)}
                      className="w-full py-2 rounded-xl border border-white/10 text-space-textPrimary hover:bg-white/5 font-display text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                    >
                      Retry Challenge
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
