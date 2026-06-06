import React from 'react';
import { motion } from 'framer-motion';

/**
 * Displays execution context details (active env, this binding, lexical variables).
 */
const ExecutionContextCard = ({ ctx }) => {
  if (!ctx) {
    return <div className="text-gray-400 text-sm">No active execution context.</div>;
  }

  const { thisValue, lexicalEnv, variables } = ctx;

  return (
    <div className="space-y-3 max-h-72 overflow-y-auto p-1">
      <motion.div
        className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-purple-500/10 shadow-md"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-[10px] text-gray-500 block mb-0.5 uppercase tracking-wider">Active Context</span>
        <div className="text-sm font-semibold text-purple-300 font-mono">{lexicalEnv || '(none)'}</div>
      </motion.div>

      <motion.div
        className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-purple-500/10 shadow-md"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
      >
        <span className="text-[10px] text-gray-500 block mb-0.5 uppercase tracking-wider">this Binding</span>
        <div className="text-sm font-semibold text-yellow-400 font-mono">{thisValue || 'undefined'}</div>
      </motion.div>

      {variables && variables.length > 0 && (
        <motion.div
          className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-purple-500/10 shadow-md"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <span className="text-[10px] text-gray-500 block mb-2 uppercase tracking-wider">Lexical Bindings</span>
          <div className="space-y-1.5">
            <div className="flex justify-between border-b border-white/5 pb-1 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
              <span>Variable</span>
              <span>Value</span>
            </div>
            {variables.map((v, i) => (
              <div key={i} className="flex justify-between items-center text-xs font-mono">
                <span className="text-gray-300">{v.name}</span>
                <span className="text-yellow-400">{v.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default React.memo(ExecutionContextCard);
