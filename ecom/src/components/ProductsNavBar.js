/**
 * ProductsNavBar — Enhanced sticky sub-navigation below the hero section
 * Shows category filters + quick-jump links to all product sections
 * All items slide in from left with staggered animations
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGrid, FiZap, FiStar, FiTag, FiLayers, FiAward, FiGift } from "react-icons/fi";

const CATEGORIES = [
  "All", "Home & Living", "Accessories", "Fashion",
  "Stationery", "Electronics", "Lifestyle",
];

const SECTION_LINKS = [
  { label: "New", section: "new", icon: FiZap },
  { label: "Best Sellers", section: "bestsellers", icon: FiStar },
  { label: "Sale", section: "sale", icon: FiTag },
  { label: "Collections", section: "collections", icon: FiLayers },
  { label: "Limited", section: "limited", icon: FiAward },
  { label: "Gifts", section: "giftcards", icon: FiGift },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 18, mass: 0.6 },
  },
};

const ProductsNavBar = ({ activeCategory, onCategoryChange }) => {
  const [stuck, setStuck] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("home");
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        setStuck(heroBottom <= 64);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`sticky z-40 transition-all duration-500 ${
        stuck
          ? "top-[calc(var(--header-h)+28px)] bg-cream/95 backdrop-blur-xl shadow-soft border-b border-dark/10"
          : "top-[calc(var(--header-h)+28px)] bg-cream/80 backdrop-blur-md border-b border-dark/8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category filters row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
          className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar py-2.5"
        >
          <motion.span
            variants={pillVariants}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-dark/40 uppercase tracking-wider mr-1 flex-shrink-0"
          >
            <FiGrid size={12} />
            Filter:
          </motion.span>
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              variants={pillVariants}
              onClick={() => onCategoryChange(cat)}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex-shrink-0 ${
                activeCategory === cat
                  ? "bg-dark text-cream shadow-vibrant"
                  : "bg-dark/5 text-dark/60 hover:bg-dark/10 hover:text-dark border border-dark/10"
              }`}
            >
              {cat}
            </motion.button>
          ))}

          {/* Divider */}
          <motion.div variants={pillVariants} className="w-px h-5 bg-dark/15 mx-1 flex-shrink-0" />

          {/* Section quick-links */}
          {SECTION_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <motion.button
                key={link.section}
                variants={pillVariants}
                onClick={() => scrollToSection(link.section)}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="whitespace-nowrap flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium bg-teal/10 text-teal hover:bg-teal hover:text-cream transition-all flex-shrink-0 border border-teal/20"
              >
                <Icon size={11} />
                {link.label}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductsNavBar;
