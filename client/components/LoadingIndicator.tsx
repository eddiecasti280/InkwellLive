import { motion } from "framer-motion";

interface LoadingIndicatorProps {
  isLoading?: boolean;
}

export function LoadingIndicator({ isLoading = false }: LoadingIndicatorProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-warm-200">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-warm-300 border-t-warm-600 rounded-full"
        />
        <span className="text-sm text-warm-700">Loading...</span>
      </div>
    </motion.div>
  );
} 