import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable glass‑styled card for sandbox visualizations.
 * Props:
 *   - title: string – section heading displayed at top.
 *   - children: ReactNode – visualization content.
 */
const VisualizationCard = ({ title, children }) => {
  return (
    <motion.div
      className="bg-black/40 backdrop-blur-lg rounded-2xl border border-purple-500/30 p-4 shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-3 text-purple-300 border-b border-purple-500/20 pb-1">
          {title}
        </h3>
      )}
      <div className="space-y-2">{children}</div>
    </motion.div>
  );
};

export default React.memo(VisualizationCard);
