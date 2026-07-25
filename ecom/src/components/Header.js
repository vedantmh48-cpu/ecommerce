/**
 * Header Component — Vibrant Premium Navbar
 * 
 * Modern, energetic header with:
 * - Rainbow announcement bar
 * - Glassmorphism nav with vibrant accents
 * - Animated search with playful interactions
 * - Category filter pills with gradient
 * - Mobile menu with bouncy animations
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiSearch, FiShoppingBag, FiX, FiMenu, FiHome, FiGrid, 
  FiInfo, FiMail, FiClock, FiTag, FiZap, FiHeart 
} from "react-icons/fi";
import { useCart } from "../context/CartContext";

const CATEGORIES = [
  "All", "Home & Living", "Accessories", "Fashion",
  "Stationery", "Electronics", "Lifestyle",
];

const NAV_LINKS = [
  { label: "Home", section: "home", icon: FiHome },
  { label: "Shop", section: "products", icon: FiGrid },
  { label: "New", section: "new", icon: FiClock },
  { label: "Sale", section: "sale", icon: FiTag },
  { label: "About", section: "about", icon: FiInfo },
  { label: "Contact", section: "contact", icon: FiMail },
];

const Header = ({ activeCategory, onCategoryChange, onCartToggle, searchQuery, onSearchChange, onNavigate }) => {
  const { cartCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section) => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    if (onNavigate) onNavigate(section);
    else document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  const cartBounceVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 500, damping: 15 } },
    exit: { scale: 0, rotate: 180 },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* ===== VIBRANT ANNOUNCEMENT BAR ===== */}
      <div className="bg-gradient-to-r from-teal via-coral to-lavender text-white text-[10px] sm:text-[11px] font-semibold text-center py-1.5 tracking-wider h-7 sm:h-7 flex items-center justify-center">
        <span className="announcement-marquee flex items-center gap-3">
          <FiZap className="inline" size={12} />
          Free shipping on orders over $100 &middot; Use code WELCOME10 for 10% off
          <FiZap className="inline" size={12} />
        </span>
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <div className={`transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-soft border-b border-gray-100" 
          : "bg-white/80 backdrop-blur-md"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2.5 flex-shrink-0 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal via-teal-light to-coral text-white font-bold text-sm flex items-center justify-center shadow-vibrant group-hover:shadow-vibrant-lg transition-all duration-300 group-hover:rotate-3">
                TB
              </span>
              <span className="font-bold text-lg text-dark hidden sm:inline font-display">
                Trend<span className="text-teal">Basket</span>
              </span>
            </motion.button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5 bg-gray-50 rounded-2xl p-1 mx-4 border border-gray-100">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.section)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl text-gray-500 hover:text-teal hover:bg-white/80 transition-all whitespace-nowrap hover:shadow-sm"
                  >
                    <Icon size={14} />
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Search + Cart + Mobile */}
            <div className="flex items-center gap-2">
              {/* Desktop search */}
              <div className="hidden sm:block relative w-48 lg:w-56 group">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal transition-colors" size={15} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs text-dark placeholder-gray-300 focus:outline-none focus:border-teal/30 focus:ring-2 focus:ring-teal/10 transition-all group-hover:border-gray-200"
                />
              </div>

              {/* Mobile search toggle */}
              <motion.button
                onClick={() => { setSearchOpen(!searchOpen); if (!searchOpen) setTimeout(() => searchInputRef.current?.focus(), 100); }}
                className="sm:hidden w-9 h-9 flex items-center justify-center text-gray-500 hover:text-teal hover:bg-gray-50 rounded-xl transition-colors"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle search"
              >
                {searchOpen ? <FiX size={18} /> : <FiSearch size={18} />}
              </motion.button>

              {/* Cart */}
              <motion.button
                onClick={onCartToggle}
                className="relative w-9 h-9 flex items-center justify-center text-gray-500 hover:text-coral hover:bg-coral/5 rounded-xl transition-colors"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Open cart"
              >
                <FiShoppingBag size={19} />
                <AnimatePresence mode="wait">
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      variants={cartBounceVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-coral text-white text-[8px] font-bold flex items-center justify-center shadow-coral"
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile menu toggle */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center text-gray-500 hover:text-teal hover:bg-gray-50 rounded-xl transition-colors"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile search */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="sm:hidden overflow-hidden"
              >
                <div className="pb-3">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={15} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs text-dark placeholder-gray-300 focus:outline-none focus:border-teal/30 focus:ring-2 focus:ring-teal/10 transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category tabs */}
          {!mobileMenuOpen && (
            <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-2.5 pt-0.5 border-t border-gray-100">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-teal to-teal-light text-white shadow-vibrant"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 border border-gray-100"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-gray-100"
            >
              <div className="px-4 sm:px-6 lg:px-8 py-3 space-y-0.5 max-w-7xl mx-auto">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.button
                      key={link.label}
                      onClick={() => handleNavClick(link.section)}
                      whileHover={{ x: 4 }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-teal hover:bg-teal/5 rounded-xl transition-colors text-left"
                    >
                      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                        <Icon size={14} className="text-gray-400" />
                      </span>
                      {link.label}
                    </motion.button>
                  );
                })}

                {/* Mobile category tabs */}
                <div className="pt-3 pb-1 border-t border-gray-100 mt-2">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Categories</p>
                  <div className="flex flex-wrap gap-1.5 px-3">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { onCategoryChange(cat); setMobileMenuOpen(false); }}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                          activeCategory === cat
                            ? "bg-gradient-to-r from-teal to-teal-light text-white"
                            : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile extra */}
                <div className="pt-3 border-t border-gray-100 mt-2 px-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FiHeart size={12} className="text-coral" />
                    <span>Free shipping on orders $100+</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Header;