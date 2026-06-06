import React from 'react';
import { motion } from 'framer-motion';

/**
 * Visualizes the microtask queue (Promise callbacks).
 */
const MicrotaskQueueCard = ({ queue }) => {
  return (
    <div className="space-y-3 p-1">
      <div className="flex justify-between items-center text-[10px] text-gray-500">
        <span>MICROTASK QUEUE</span>
        <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full text-[9px] font-mono">
          {queue ? queue.length : 0} items
        </span>
      </div>

      <div className="space-y-1.5 max-h-48 overflow-y-auto mt-2">
        {queue && queue.length > 0 ? (
          queue.map((task, idx) => (
            <motion.div
              key={idx}
              className="bg-black/40 backdrop-blur-md rounded-xl p-2.5 border border-purple-500/10 text-xs font-mono text-gray-300 flex justify-between items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
            >
              <span className="truncate pr-1">{task}</span>
              <span className="text-[9px] text-purple-300 bg-purple-500/10 px-1 rounded uppercase tracking-wider shrink-0">
                promise
              </span>
            </motion.div>
          ))
        ) : (
          <div className="text-gray-600 text-xs font-mono text-center py-8">
            (empty)
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(MicrotaskQueueCard);
