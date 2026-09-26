import { motion } from 'framer-motion';

// Wraps each page's content: smooth fade/lift on mount, and a small fade-out
// on unmount as React Router swaps pages via AnimatePresence in App.jsx.
export default function PageFade({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  );
}
