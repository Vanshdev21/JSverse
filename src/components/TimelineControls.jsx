import React from 'react';
import { motion } from 'framer-motion';

/**
 * Simple timeline controls for stepping through execution steps.
 * Props:
 *   - steps: array of execution steps
 *   - current: index of current step
 *   - setCurrent: function to change current step
 *   - autoRun: boolean indicating if auto‑run is active
 *   - setAutoRun: toggle auto‑run
 */
const TimelineControls = ({ steps, current, setCurrent, autoRun, setAutoRun }) => {
  const total = steps.length;
  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };
  const handleNext = () => {
    if (current < total - 1) setCurrent(current + 1);
  };
  return (
    <motion.div
      className="col-span-1 md:col-span-2 lg:col-span-2 flex items-center justify-between bg-black/30 backdrop-blur-sm rounded-md p-2 mt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className={`px-2 py-1 rounded ${current === 0 ? 'bg-gray-700 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'} text-white`}
        >
          ⬅︎ Prev
        </button>
        <button
          onClick={handleNext}
          disabled={current >= total - 1}
          className={`px-2 py-1 rounded ${current >= total - 1 ? 'bg-gray-700 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'} text-white`}
        >
          Next ➡︎
        </button>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-300">
        <span className="font-mono">{current + 1} / {total}</span>
        <button
          onClick={() => setAutoRun(!autoRun)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border transition-all ${
            autoRun 
              ? 'bg-purple-600/35 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(124,58,237,0.3)] animate-pulse' 
              : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-600'
          }`}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${autoRun ? 'bg-purple-400' : 'bg-gray-500'}`} />
          Auto‑Play
        </button>
      </div>
    </motion.div>
  );
};

export default TimelineControls;
