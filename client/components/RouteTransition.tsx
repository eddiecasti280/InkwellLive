import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface RouteTransitionProps {
  children: React.ReactNode;
}

// Different transition styles for different types of pages
const transitionStyles = {
  // Main pages (home, dashboard) - gentle fade with slight scale
  main: {
    initial: { opacity: 0, scale: 0.95, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -30 },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  },
  // Detail pages (reading view, writing) - slide from right
  detail: {
    initial: { opacity: 0, x: 80, scale: 0.9 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -80, scale: 0.9 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  },
  // List pages (stories) - fade with blur effect
  list: {
    initial: { opacity: 0, filter: "blur(12px)", y: 40 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, filter: "blur(12px)", y: -40 },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
};

function getTransitionStyle(pathname: string) {
  if (pathname === "/" || pathname === "/dashboard") {
    return transitionStyles.main;
  }
  if (pathname.startsWith("/stories/") || pathname === "/new-writing") {
    return transitionStyles.detail;
  }
  if (pathname === "/stories") {
    return transitionStyles.list;
  }
  return transitionStyles.main;
}

export function RouteTransition({ children }: RouteTransitionProps) {
  const location = useLocation();
  const style = getTransitionStyle(location.pathname);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={style.initial}
        animate={style.animate}
        exit={style.exit}
        transition={style.transition}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 