import React from 'react';
import { motion } from 'framer-motion';

/**
 * Visualizes the JavaScript event loop queue with rotation animation and status checks.
 */
const EventLoopCard = ({ data }) => {
  if (!data) {
    return <div className="text-gray-400 text-sm">Event loop data unavailable.</div>;
  }

  const { status, queue } = data;

  return (
    <div className="space-y-3 p-1">
      <div className="flex justify-between items-center text-[10px] text-gray-500">
        <span>EVENT LOOP STATUS</span>
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono flex items-center gap-1 ${status === 'Running' ? 'bg-green-500/20 text-green-300' : 'bg-gray-800 text-gray-400'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status === 'Running' ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
          {status}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center py-2">
        <motion.div
          className="w-14 h-14 rounded-full border border-dashed border-purple-500/40 flex items-center justify-center relative"
          animate={status === 'Running' ? { rotate: 360 } : {}}
          transition={status === 'Running' ? { repeat: Infinity, duration: 4, ease: 'linear' } : {}}
        >
          <span className="text-[9px] text-purple-300 font-mono font-bold absolute">LOOP</span>
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full absolute -top-1" />
        </motion.div>
      </div>

      <div className="space-y-1.5 max-h-32 overflow-y-auto">
        <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Macrotask Queue</span>
        {queue && queue.length > 0 ? (
          queue.map((task, idx) => (
            <motion.div
              key={idx}
              className="bg-black/40 backdrop-blur-md rounded-xl p-2 border border-purple-500/10 text-xs font-mono text-gray-300 flex justify-between"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
            >
              <span>{task}</span>
              <span className="text-[9px] text-yellow-400 bg-yellow-500/10 px-1 rounded">timeout</span>
            </motion.div>
          ))
        ) : (
          <div className="text-gray-600 text-xs font-mono">(empty)</div>
        )}
      </div>
    </div>
  );
};

export default React.memo(EventLoopCard);
