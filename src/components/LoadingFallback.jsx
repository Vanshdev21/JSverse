import React from 'react';
import { motion } from 'framer-motion';

const loadingVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function LoadingFallback() {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-space-bg bg-opacity-80 backdrop-blur-lg"
      variants={loadingVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full bg-purple-500"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
