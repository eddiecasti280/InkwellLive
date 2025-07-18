import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface SimpleTransitionProps {
  children: React.ReactNode;
}

export function SimpleTransition({ children }: SimpleTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 