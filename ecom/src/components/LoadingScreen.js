/**
 * LoadingScreen Component — Animated Splash Screen
 * 
 * A vibrant loading/splash screen that appears when the app first loads.
 * Features:
 * - Animated walking shoe with trail
 * - Gradient background with floating orbs
 * - Progress bar with percentage
 * - Brand name reveal animation
 * - Auto-dismisses after loading completes
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShoeAnimation, { ShoeTrailAnimation } from "./ShoeAnimation";

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after a brief delay
    const contentTimer = setTimeout(() => setShowContent(true), 200);

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Slow down as it approaches 100
        const increment = prev < 60 ? 3 : prev < 80 ? 2 : prev < 95 ? 1 : 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => {
      clearTimeout(contentTimer);
      clearInterval(interval);
    };
  }, []);

  // When progress hits 100, wait a moment then finish
  useEffect(() => {
    if (progress >= 100) {
      const finishTimer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 600);
      return () => clearTimeout(finishTimer);
    }
  }, [progress, onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-teal via-teal-dark to-dark overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-coral/10 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.3, 1, 1.3], rotate: [360, 180, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-lavender/10 blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-amber/10 blur-[80px]"
        />
        <div className="absolute inset-0 pattern-dots opacity-10" />
      </div>

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-light via-teal to-coral text-white font-bold text-2xl flex items-center justify-center shadow-vibrant-lg mb-6"
            >
              TB
            </motion.div>

            {/* Brand name */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold text-white font-display mb-2"
            >
              Trend<span className="text-teal-light">Basket</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-white/50 text-sm mb-8"
            >
              Curated Essentials for Modern Living
            </motion.p>

            {/* Animated shoe walking */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-4">
                <ShoeTrailAnimation count={3} />
                <ShoeAnimation size={50} direction="right" color="#14B8A6" />
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-teal-light text-xs font-medium"
                >
                  walking...
                </motion.span>
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="w-64 sm:w-80"
            >
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-teal-light via-coral to-lavender"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/40">
                <span>Loading experience...</span>
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {Math.floor(progress)}%
                </motion.span>
              </div>
            </motion.div>

            {/* Loading tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-8 text-white/30 text-xs max-w-xs"
            >
              <p className="animate-pulse-soft">
                {progress < 30 && "Curating the finest products..."}
                {progress >= 30 && progress < 60 && "Polishing every pixel..."}
                {progress >= 60 && progress < 90 && "Almost ready to shop..."}
                {progress >= 90 && "Getting your basket ready!"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;