import React from 'react';
import { motion } from 'framer-motion';

/**
 * Visual representation of the active JavaScript call stack.
 * Displays frames growing upwards with active context highlighted.
 */
const CallStackCard = ({ stack }) => {
  if (!stack || stack.length === 0) {
    return <div className="text-gray-400 text-sm">Call stack is empty.</div>;
  }

  return (
    <div className="flex flex-col-reverse gap-2.5 max-h-72 overflow-y-auto p-1">
      {stack.map((frame, idx) => {
        const isActive = idx === stack.length - 1;
        return (
          <motion.div
            key={idx}
            className={`rounded-xl p-3 border text-xs font-mono flex justify-between items-center transition-all ${
              isActive
                ? 'bg-purple-600/35 border-purple-400 text-white shadow-lg shadow-purple-900/20'
                : 'bg-black/40 border-purple-500/10 text-purple-200'
            }`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            <span className="font-bold">{frame.name}</span>
            <span className="text-[10px] text-gray-500">line {frame.line}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default React.memo(CallStackCard);
