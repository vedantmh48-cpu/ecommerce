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

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiArrowRight, FiShoppingBag, FiShield, FiTruck, 
  FiRefreshCw, FiChevronRight, FiZap 
} from "react-icons/fi";

const SLIDE_PRODUCTS = [
  { id: 1,  name: "Minimalist Watch",       price: "$119",  image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop" },
  { id: 2,  name: "Leather Crossbody Bag",  price: "$245",  image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop" },
  { id: 3,  name: "Noise Cancelling Headphones", price: "$199", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop" },
  { id: 4,  name: "Cashmere Crew Sweater",  price: "$149",  image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop" },
  { id: 5,  name: "Artisan Coffee Mug",     price: "$24.99", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop" },
];

const HeroSection = ({ onScrollToProducts }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDE_PRODUCTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
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

          {/* Right — Product Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-80 h-80 xl:w-96 xl:h-96 rounded-3xl overflow-hidden shadow-2xl">
              {/* Glow ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-teal via-coral to-lavender opacity-30 blur-lg pointer-events-none" />

              {/* Slides */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <img
                    src={SLIDE_PRODUCTS[current].image}
                    alt={SLIDE_PRODUCTS[current].name}
                    className="w-full h-full object-cover"
                  />
                  {/* Bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                  {/* Product label */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="absolute bottom-5 left-5 right-5"
                  >
                    <p className="text-white font-bold text-lg font-display leading-tight">{SLIDE_PRODUCTS[current].name}</p>
                    <p className="text-coral font-semibold text-sm mt-0.5">{SLIDE_PRODUCTS[current].price}</p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators */}
              <div className="absolute top-4 right-4 flex flex-col gap-1.5">
                {SLIDE_PRODUCTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "h-6 bg-white" : "h-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;