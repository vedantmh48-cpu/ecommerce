import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = prev < 50 ? 4 : prev < 80 ? 2.5 : prev < 95 ? 1 : 0.4;
        const next = Math.min(prev + increment, 100);
        if (next >= 100) clearInterval(interval);
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setDone(true), 400);
      return () => clearTimeout(t);
    }
  }, [progress]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => onFinish?.(), 900);
      return () => clearTimeout(t);
    }
  }, [done, onFinish]);

  const LABELS = [
    { at: 0,  text: "Curating products..." },
    { at: 35, text: "Polishing every pixel..." },
    { at: 65, text: "Almost there..." },
    { at: 90, text: "Welcome to TrendBasket" },
  ];
  const label = [...LABELS].reverse().find((l) => progress >= l.at)?.text ?? "";

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Ambient glow blobs */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal blur-[140px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1.3, 1, 1.3], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-coral blur-[140px] pointer-events-none"
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-10 px-6 w-full max-w-sm">

            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex flex-col items-center gap-4"
            >
              {/* Icon */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal via-coral to-lavender opacity-60 blur-md"
                />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-teal to-coral flex items-center justify-center shadow-vibrant-lg">
                  <span className="text-white font-bold text-2xl font-display tracking-tight">TB</span>
                </div>
              </div>

              {/* Brand name — letter stagger */}
              <div className="flex items-baseline gap-0 overflow-hidden">
                {"TrendBasket".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.04, duration: 0.4, ease: "easeOut" }}
                    className={`font-display font-bold text-3xl tracking-tight ${
                      i >= 5 ? "text-teal-light" : "text-white"
                    }`}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-white/40 text-xs tracking-[0.2em] uppercase"
              >
                Curated Essentials
              </motion.p>
            </motion.div>

            {/* Progress section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="w-full flex flex-col gap-3"
            >
              {/* Track */}
              <div className="relative w-full h-[2px] bg-white/8 rounded-full overflow-hidden">
                {/* Glow fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
                    boxShadow: "0 0 12px rgba(6,182,212,0.6)",
                  }}
                  transition={{ duration: 0.08 }}
                />
                {/* Shimmer sweep */}
                <motion.div
                  animate={{ x: ["-100%", "400%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
                  className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ width: `${progress}%`, maxWidth: "100%" }}
                />
              </div>

              {/* Label row */}
              <div className="flex items-center justify-between">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/35 text-[11px] tracking-wide"
                  >
                    {label}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-teal-light text-[11px] font-semibold tabular-nums"
                >
                  {Math.floor(progress)}%
                </motion.span>
              </div>
            </motion.div>

            {/* Pulsing dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-teal-light"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      ) : (
        /* Split-panel exit — two panels slide up/down to reveal the site */
        <motion.div key="exit" className="fixed inset-0 z-[100] pointer-events-none">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-0 h-1/2 bg-dark"
          />
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-dark"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
