/**
 * HeroSection Component — Vibrant Modern Hero
 * 
 * Energetic hero with:
 * - Animated gradient background with floating orbs
 * - Bold, playful typography with gradient text
 * - Animated decorative elements with bounce
 * - CTA buttons with playful hover effects
 * - Confetti-like floating dots
 * - Trust indicators with vibrant icons
 */

import React from "react";
import { motion } from "framer-motion";
import { 
  FiArrowRight, FiShoppingBag, FiShield, FiTruck, 
  FiRefreshCw, FiChevronRight, FiStar, FiZap, FiHeart 
} from "react-icons/fi";

const HeroSection = ({ onScrollToProducts }) => {
  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center bg-gradient-to-br from-teal via-teal-dark to-dark">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-coral/10 blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-lavender/10 blur-[120px]"
        />
        <motion.div 
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-amber/10 blur-[100px]"
        />
        <div className="absolute inset-0 pattern-dots opacity-20" />
        
        {/* Decorative SVG wave */}
        <svg className="absolute bottom-0 left-0 right-0 w-full h-auto text-teal/10" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 C360,40 720,80 1440,40 L1440,120 L0,120 Z" fill="currentColor" />
        </svg>

        {/* Confetti dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="confetti-dot"
            style={{
              top: `${20 + i * 12}%`,
              left: `${10 + i * 15}%`,
              background: ['#F43F5E', '#0D9488', '#8B5CF6', '#F59E0B', '#14B8A6', '#FB7185'][i],
              width: `${6 + i * 2}px`,
              height: `${6 + i * 2}px`,
            }}
            animate={{ 
              y: [0, -20, 0], 
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{ 
              duration: 3 + i * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.4 
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-6"
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-coral"
              />
              <span className="text-white/80 text-xs font-medium tracking-wide">
                Introducing the Spring/Summer 2026 Collection
              </span>
              <FiChevronRight size={12} className="text-white/40" />
            </motion.div>

            {/* Headline with gradient */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] mb-5 tracking-tight font-display">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Curated Essentials
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-gradient"
              >
                for Modern Living
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-white/60 text-sm sm:text-base lg:text-lg max-w-xl mb-10 leading-relaxed"
            >
              Discover thoughtfully designed products that blend minimalist aesthetics 
              with everyday functionality. From handcrafted ceramics to sustainable lifestyle 
              goods — each piece tells a story of quality and intention.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={onScrollToProducts}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-coral to-coral-light text-white font-semibold rounded-2xl shadow-coral-lg hover:shadow-coral transition-all touch-target text-sm sm:text-base"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <FiShoppingBag size={20} />
                Start Shopping
                <FiArrowRight size={18} />
              </motion.button>

              <motion.a
                href="#about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-medium rounded-2xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all touch-target backdrop-blur-sm text-sm sm:text-base"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <FiZap size={18} />
                Learn More
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center gap-6 sm:gap-8 mt-10 pt-6 border-t border-white/10"
            >
              {[
                { icon: FiTruck, label: "Free Shipping", sub: "on orders $100+" },
                { icon: FiShield, label: "Secure Checkout", sub: "SSL encrypted" },
                { icon: FiRefreshCw, label: "Easy Returns", sub: "30-day policy" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={item.label} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + idx * 0.1 }}
                    className="flex items-center gap-2.5 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-coral/20 transition-colors">
                      <Icon size={16} className="text-coral" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs sm:text-sm">{item.label}</p>
                      <p className="text-white/40 text-[10px] sm:text-xs">{item.sub}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right decorative */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-80 h-80 xl:w-96 xl:h-96">
              {/* Outer ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-white/10"
              />
              
              {/* Middle ring */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full bg-gradient-to-br from-coral/10 via-teal/10 to-lavender/10 backdrop-blur-sm border border-white/10"
              />
              
              {/* Inner dashed ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-dashed border-white/10"
              />
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-coral via-coral-light to-amber flex items-center justify-center shadow-coral-lg">
                    <FiHeart size={28} className="text-white" />
                  </div>
                  <p className="text-white font-bold text-xl xl:text-2xl font-display">Quality First</p>
                  <p className="text-coral/80 text-sm font-medium">Crafted with intention</p>
                </motion.div>
              </div>

              {/* Floating icons */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-teal/40 to-teal/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shadow-lg"
              >
                <FiShoppingBag size={20} className="text-white/80" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -bottom-4 right-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber/40 to-amber/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shadow-lg"
              >
                <FiStar size={18} className="text-white/80" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-8 -left-5 w-14 h-14 rounded-2xl bg-gradient-to-br from-coral/30 to-coral/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shadow-lg"
              >
                <FiZap size={18} className="text-white/80" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 18, 0], rotate: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute top-10 -right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-lavender/30 to-lavender/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shadow-lg"
              >
                <FiStar size={14} className="text-white/80" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;