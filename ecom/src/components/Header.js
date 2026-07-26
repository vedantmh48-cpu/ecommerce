/**
 * Header Component — Redesigned with Products dropdown & new palette
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiShoppingBag, FiX, FiMenu, FiHome, FiGrid,
  FiInfo, FiMail, FiClock, FiTag, FiZap, FiHeart,
  FiChevronDown, FiStar, FiPackage, FiLayers, FiGift, FiAward
} from "react-icons/fi";
import { useCart } from "../context/CartContext";

const CATEGORIES = [
  "All", "Home & Living", "Accessories", "Fashion",
  "Stationery", "Electronics", "Lifestyle",
];

const PRODUCTS_DROPDOWN = [
  { label: "All Products", section: "products", icon: FiGrid, desc: "Browse everything" },
  { label: "New Arrivals", section: "new", icon: FiZap, desc: "Fresh drops" },
  { label: "Best Sellers", section: "bestsellers", icon: FiStar, desc: "Customer favorites" },
  { label: "Sale", section: "sale", icon: FiTag, desc: "Up to 50% off" },
  { label: "Collections", section: "collections", icon: FiLayers, desc: "Curated themes" },
  { label: "Limited Edition", section: "limited", icon: FiAward, desc: "Exclusive drops" },
  { label: "Gift Cards", section: "giftcards", icon: FiGift, desc: "Give the gift of choice" },
];

const NAV_LINKS = [
  { label: "Home", section: "home", icon: FiHome },
  { label: "Products", section: "products", icon: FiPackage, hasDropdown: true },
  { label: "About", section: "about", icon: FiInfo },
  { label: "Contact", section: "contact", icon: FiMail },
];

const Header = ({ activeCategory, onCategoryChange, onCartToggle, searchQuery, onSearchChange, onNavigate }) => {
  const { cartCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (section) => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setProductsDropdownOpen(false);
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
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-dark via-teal to-dark text-cream text-[10px] sm:text-[11px] font-semibold text-center py-1.5 h-7 flex items-center justify-center overflow-hidden">
        <span className="announcement-marquee flex items-center gap-3 whitespace-nowrap">
          <FiZap className="inline" size={12} />
          Free shipping on orders over $100 &middot; Use code WELCOME10 for 10% off &middot; New arrivals every week
          <FiZap className="inline" size={12} />
        </span>
      </div>

      {/* Main navbar */}
      <div className={`transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-xl shadow-soft border-b border-dark/10"
          : "bg-cream/85 backdrop-blur-md"
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
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-dark via-teal to-teal-light text-cream font-bold text-sm flex items-center justify-center shadow-vibrant group-hover:shadow-vibrant-lg transition-all duration-300 group-hover:rotate-3">
                TB
              </span>
              <span className="font-bold text-lg text-dark hidden sm:inline font-display">
                Trend<span className="text-teal">Basket</span>
              </span>
            </motion.button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5 bg-offwhite/60 rounded-2xl p-1 mx-4 border border-dark/10">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                if (link.hasDropdown) {
                  return (
                    <div key={link.label} className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap hover:shadow-sm ${
                          productsDropdownOpen
                            ? "bg-dark text-cream shadow-sm"
                            : "text-dark/60 hover:text-dark hover:bg-cream/80"
                        }`}
                      >
                        <Icon size={14} />
                        {link.label}
                        <motion.span animate={{ rotate: productsDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <FiChevronDown size={12} />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {productsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-cream/98 backdrop-blur-xl rounded-2xl shadow-soft-lg border border-dark/10 overflow-hidden z-50"
                          >
                            <div className="p-2">
                              <p className="text-[10px] font-semibold text-dark/40 uppercase tracking-wider px-3 py-1.5">Browse</p>
                              {PRODUCTS_DROPDOWN.map((item, i) => {
                                const DIcon = item.icon;
                                return (
                                  <motion.button
                                    key={item.section}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    onClick={() => handleNavClick(item.section)}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-dark/5 transition-colors text-left group"
                                  >
                                    <span className="w-8 h-8 rounded-lg bg-dark/5 flex items-center justify-center group-hover:bg-dark/10 transition-colors flex-shrink-0">
                                      <DIcon size={14} className="text-dark/60" />
                                    </span>
                                    <div>
                                      <p className="text-xs font-semibold text-dark">{item.label}</p>
                                      <p className="text-[10px] text-dark/40">{item.desc}</p>
                                    </div>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.section)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl text-dark/60 hover:text-dark hover:bg-cream/80 transition-all whitespace-nowrap hover:shadow-sm"
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
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/30 group-focus-within:text-teal transition-colors" size={15} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-offwhite/60 border border-dark/10 rounded-xl text-xs text-dark placeholder-dark/30 focus:outline-none focus:border-teal/40 focus:ring-2 focus:ring-teal/10 transition-all"
                />
              </div>

              {/* Mobile search toggle */}
              <motion.button
                onClick={() => { setSearchOpen(!searchOpen); if (!searchOpen) setTimeout(() => searchInputRef.current?.focus(), 100); }}
                className="sm:hidden w-9 h-9 flex items-center justify-center text-dark/60 hover:text-dark hover:bg-dark/5 rounded-xl transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                {searchOpen ? <FiX size={18} /> : <FiSearch size={18} />}
              </motion.button>

              {/* Cart */}
              <motion.button
                onClick={onCartToggle}
                className="relative w-9 h-9 flex items-center justify-center text-dark/60 hover:text-dark hover:bg-dark/5 rounded-xl transition-colors"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
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
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-dark text-cream text-[8px] font-bold flex items-center justify-center"
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile menu toggle */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center text-dark/60 hover:text-dark hover:bg-dark/5 rounded-xl transition-colors"
                whileTap={{ scale: 0.9 }}
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
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="sm:hidden overflow-hidden"
              >
                <div className="pb-3">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/30" size={15} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-offwhite/60 border border-dark/10 rounded-xl text-xs text-dark placeholder-dark/30 focus:outline-none focus:border-teal/40 focus:ring-2 focus:ring-teal/10 transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-dark/10"
            >
              <div className="px-4 py-3 space-y-0.5 max-w-7xl mx-auto">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  if (link.hasDropdown) {
                    return (
                      <div key={link.label}>
                        <motion.button
                          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                          whileHover={{ x: 4 }}
                          className="w-full flex items-center justify-between gap-3 px-3 py-2.5 text-sm font-medium text-dark/70 hover:text-dark hover:bg-dark/5 rounded-xl transition-colors"
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-dark/5 flex items-center justify-center">
                              <Icon size={14} className="text-dark/40" />
                            </span>
                            {link.label}
                          </span>
                          <motion.span animate={{ rotate: mobileProductsOpen ? 180 : 0 }}>
                            <FiChevronDown size={14} />
                          </motion.span>
                        </motion.button>
                        <AnimatePresence>
                          {mobileProductsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden ml-4 pl-3 border-l-2 border-dark/10"
                            >
                              {PRODUCTS_DROPDOWN.map((item) => {
                                const DIcon = item.icon;
                                return (
                                  <button
                                    key={item.section}
                                    onClick={() => handleNavClick(item.section)}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-dark/60 hover:text-dark hover:bg-dark/5 rounded-lg transition-colors text-left"
                                  >
                                    <DIcon size={13} />
                                    {item.label}
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  return (
                    <motion.button
                      key={link.label}
                      onClick={() => handleNavClick(link.section)}
                      whileHover={{ x: 4 }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-dark/70 hover:text-dark hover:bg-dark/5 rounded-xl transition-colors text-left"
                    >
                      <span className="w-7 h-7 rounded-lg bg-dark/5 flex items-center justify-center">
                        <Icon size={14} className="text-dark/40" />
                      </span>
                      {link.label}
                    </motion.button>
                  );
                })}

                {/* Mobile categories */}
                <div className="pt-3 pb-1 border-t border-dark/10 mt-2">
                  <p className="text-[10px] font-semibold text-dark/40 uppercase tracking-wider mb-2 px-3">Categories</p>
                  <div className="flex flex-wrap gap-1.5 px-3">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { onCategoryChange(cat); setMobileMenuOpen(false); }}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                          activeCategory === cat
                            ? "bg-dark text-cream"
                            : "bg-dark/5 text-dark/60 hover:bg-dark/10"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-dark/10 mt-2 px-3">
                  <div className="flex items-center gap-2 text-xs text-dark/40">
                    <FiHeart size={12} className="text-teal" />
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
