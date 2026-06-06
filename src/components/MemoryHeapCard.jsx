import React from 'react';
import { motion } from 'framer-motion';

/**
 * Visualizes the JavaScript memory heap with type badges and reference values.
 */
const MemoryHeapCard = ({ heap }) => {
  if (!heap || heap.length === 0) {
    return <div className="text-gray-400 text-sm">Memory heap is empty.</div>;
  }

  return (
    <div className="space-y-2.5 max-h-72 overflow-y-auto p-1">
      <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
        <span>ALLOCATED HEAP NODES</span>
        <span className="bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full text-[9px] font-mono">
          {heap.length} {heap.length === 1 ? 'object' : 'objects'}
        </span>
      </div>
      {heap.map((item, idx) => (
        <motion.div
          key={idx}
          className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-purple-500/10 shadow-md flex justify-between items-start text-xs font-mono"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, delay: idx * 0.03 }}
        >
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-purple-400 font-bold">{item.id}</span>
              <span className="text-gray-500 text-[10px]">({item.type.toLowerCase()})</span>
            </div>
            <div className="text-gray-300 break-words line-clamp-3">{item.value}</div>
          </div>
          <span className="text-[9px] bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded uppercase tracking-wider">
            heap ref
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default React.memo(MemoryHeapCard);
