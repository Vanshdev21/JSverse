import React from 'react';
import { motion } from 'framer-motion';

/**
 * Displays the current lexical scope chain with variables, values, and arrow flow.
 */
const ScopeChainCard = ({ chain }) => {
  if (!chain || chain.length === 0) {
    return <div className="text-gray-400 text-sm">Scope chain is empty.</div>;
  }

  return (
    <div className="flex flex-col gap-2 max-h-72 overflow-y-auto p-2">
      {chain.map((scope, idx) => (
        <React.Fragment key={idx}>
          <motion.div
            className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-purple-500/10 shadow-md relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-purple-300 font-mono">
                {scope.name}
              </span>
              {scope.variables.length > 0 && (
                <span className="text-[10px] bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded-full">
                  {scope.variables.length}
                </span>
              )}
            </div>
            {scope.variables && scope.variables.length > 0 ? (
              <div className="space-y-1.5">
                {scope.variables.map((v, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-mono">{v.name}</span>
                    <span className="text-yellow-400 font-mono">{v.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600 text-xs font-mono">(no variables)</div>
            )}
          </motion.div>
          {idx < chain.length - 1 && (
            <div className="flex justify-center my-0.5 text-purple-400/60 font-bold">
              ↑
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default React.memo(ScopeChainCard);
