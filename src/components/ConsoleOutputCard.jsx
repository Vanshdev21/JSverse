import React from 'react';
import { motion } from 'framer-motion';

/**
 * Renders console outputs in a developer terminal shell style.
 */
const ConsoleOutputCard = ({ logs }) => {
  return (
    <div className="bg-black/60 border border-purple-500/10 rounded-2xl p-4 h-full min-h-[300px] overflow-y-auto font-mono text-xs shadow-inner flex flex-col">
      <div className="flex justify-between items-center text-[10px] text-gray-500 pb-2 border-b border-white/5 mb-2">
        <span>CONSOLE OUTPUT</span>
        <span className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full font-mono">
          {logs ? logs.length : 0} logs
        </span>
      </div>
      <div className="flex-1 space-y-1.5 overflow-y-auto">
        {logs && logs.length > 0 ? (
          logs.map((line, i) => (
            <motion.div
              key={i}
              className={`flex items-start gap-2 py-1 px-1.5 rounded transition ${
                line.startsWith('Error:') ? 'bg-red-500/10 text-red-300 border border-red-500/20' : 'hover:bg-white/5 text-gray-200'
              }`}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
            >
              <span className="text-purple-500 font-bold select-none">›</span>
              <span className="whitespace-pre-wrap">{line}</span>
            </motion.div>
          ))
        ) : (
          <div className="text-gray-500 italic py-12 text-center">
            No output yet. Run the code to see logs.
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ConsoleOutputCard);
