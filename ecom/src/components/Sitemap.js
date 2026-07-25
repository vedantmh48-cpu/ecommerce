/**
 * Sitemap Component
 * 
 * A modal/drawer overlay that displays the Sitemap.
 * Follows same pattern as PrivacyPolicy modal.
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMap } from "react-icons/fi";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const Sitemap = ({ isOpen, onClose }) => {
  const handleNavClick = (section) => {
    onClose();
    // Small delay to let modal close
    setTimeout(() => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="sm-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            key="sm-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-4 sm:inset-10 md:inset-20 z-[60] overflow-hidden rounded-2xl bg-offwhite shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-brown/10 bg-white">
              <div className="flex items-center gap-2">
                <FiMap size={20} className="text-teal" />
                <h2 className="text-lg font-bold text-dark">Sitemap</h2>
              </div>
              <button
                onClick={onClose}
                className="touch-target w-10 h-10 flex items-center justify-center rounded-full hover:bg-brown/10 transition-colors"
                aria-label="Close"
              >
                <FiX size={20} className="text-brown" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <p className="text-brown/50 text-sm mb-6">
                Browse all pages and sections available on TrendBasket. Click any link to navigate directly.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Shop */}
                <div>
                  <h3 className="font-semibold text-dark text-sm uppercase tracking-wider mb-3">Shop</h3>
                  <ul className="space-y-2">
                    {[
                      { label: "All Products", section: "products" },
                      { label: "New Arrivals", section: "new" },
                      { label: "Best Sellers", section: "bestsellers" },
                      { label: "Sale", section: "sale" },
                      { label: "Gift Cards", section: "giftcards" },
                      { label: "Collections", section: "collections" },
                      { label: "Limited Edition", section: "limited" },
                    ].map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => handleNavClick(link.section)}
                          className="text-teal hover:text-terracotta transition-colors text-sm"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Customer Service */}
                <div>
                  <h3 className="font-semibold text-dark text-sm uppercase tracking-wider mb-3">Customer Service</h3>
                  <ul className="space-y-2">
                    {[
                      { label: "Help Center", section: "help" },
                      { label: "Track Order", section: "track" },
                      { label: "Shipping & Delivery", section: "shipping" },
                      { label: "Returns & Exchanges", section: "returns" },
                      { label: "FAQs", section: "faq" },
                      { label: "Size Guide", section: "sizeguide" },
                    ].map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => handleNavClick(link.section)}
                          className="text-teal hover:text-terracotta transition-colors text-sm"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="font-semibold text-dark text-sm uppercase tracking-wider mb-3">Company</h3>
                  <ul className="space-y-2">
                    {[
                      { label: "About Us", section: "about" },
                      { label: "Contact Us", section: "contact" },
                      { label: "Careers", section: "careers" },
                      { label: "Press", section: "press" },
                      { label: "Sustainability", section: "sustainability" },
                    ].map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={() => handleNavClick(link.section)}
                          className="text-teal hover:text-terracotta transition-colors text-sm"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Policies */}
                <div>
                  <h3 className="font-semibold text-dark text-sm uppercase tracking-wider mb-3">Policies</h3>
                  <ul className="space-y-2">
                    <li>
                      <button onClick={() => { onClose(); }} className="text-teal hover:text-terracotta transition-colors text-sm">
                        Privacy Policy
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onClose(); }} className="text-teal hover:text-terracotta transition-colors text-sm">
                        Terms of Service
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onClose(); }} className="text-teal hover:text-terracotta transition-colors text-sm">
                        Cookie Policy
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-dark text-sm uppercase tracking-wider mb-3">Categories</h3>
                  <ul className="space-y-2">
                    {["Home & Living", "Fashion", "Electronics", "Stationery", "Lifestyle", "Beauty", "Accessories"].map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => {
                            onClose();
                            setTimeout(() => {
                              const el = document.getElementById("products");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }, 300);
                          }}
                          className="text-teal hover:text-terracotta transition-colors text-sm"
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="font-semibold text-dark text-sm uppercase tracking-wider mb-3">Contact</h3>
                  <ul className="space-y-2 text-sm text-brown/70">
                    <li>Email: hello@TrendBasket.com</li>
                    <li>WhatsApp: +91 9028076580</li>
                    <li>Instagram: @TrendBasket</li>
                    <li>Twitter: @TrendBasket</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sitemap;