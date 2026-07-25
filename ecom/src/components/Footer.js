/**
 * Footer Component — Vibrant Redesign
 * 
 * Comprehensive footer with:
 * - Gradient separator bar
 * - BrandStrip moving brand bar
 * - Playful social buttons with hover effects
 * - Vibrant newsletter section
 * - Animated link underlines
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FiInstagram, FiLinkedin, FiMail, FiHeart, FiTwitter, 
  FiYoutube, FiZap, FiSend 
} from "react-icons/fi";
import BrandStrip from "./BrandStrip";

const Footer = ({ onOpenPrivacy, onOpenTerms, onOpenCookies, onOpenSitemap, onNavigate, onServiceNav }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleNav = (section) => {
    const serviceSections = ["help", "track", "shipping", "returns", "faq", "sizeguide"];
    if (serviceSections.includes(section) && onServiceNav) {
      onServiceNav(section);
    } else if (onNavigate) {
      onNavigate(section);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: FiInstagram, href: "https://instagram.com", color: "hover:bg-gradient-to-br hover:from-pink-500 hover:via-purple-500 hover:to-orange-400 hover:text-white" },
    { icon: FiTwitter, href: "https://twitter.com", color: "hover:bg-black hover:text-white" },
    { icon: FiLinkedin, href: "https://linkedin.com", color: "hover:bg-blue-600 hover:text-white" },
    { icon: FiYoutube, href: "https://youtube.com", color: "hover:bg-red-600 hover:text-white" },
    { icon: FiMail, href: "mailto:hello@TrendBasket.com", color: "hover:bg-teal hover:text-white" },
  ];

  return (
    <>
      <BrandStrip />

      <footer className="bg-dark text-white/80">
        {/* Rainbow gradient separator */}
        <div className="h-2 bg-gradient-to-r from-teal via-coral via-lavender to-amber" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* ============ Column 1: Brand ============ */}
            <div className="sm:col-span-2 lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-4"
              >
                <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal to-teal-light text-white font-bold text-sm flex items-center justify-center shadow-vibrant">
                  TB
                </span>
                <span className="font-bold text-xl text-white font-display">Trend<span className="text-teal">Basket</span></span>
              </motion.div>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                TrendBasket is a minimal, modern e-commerce destination curated for those who appreciate 
                thoughtful design and quality craftsmanship. We partner with independent makers 
                and sustainable brands to bring you products that elevate everyday living.
              </p>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <FiHeart size={14} className="text-coral animate-pulse-soft" />
                <span>Made with care for a better shopping experience</span>
              </div>
            </div>

            {/* ============ Column 2: Shop ============ */}
            <div>
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 font-display">Shop</h3>
              <ul className="space-y-2.5">
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
                      onClick={() => handleNav(link.section)}
                      className="text-white/50 hover:text-teal transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-teal transition-all" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ============ Column 3: Customer Service ============ */}
            <div>
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 font-display">Customer Service</h3>
              <ul className="space-y-2.5">
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
                      onClick={() => handleNav(link.section)}
                      className="text-white/50 hover:text-teal transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-teal transition-all" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ============ Column 4: Company + Social ============ */}
            <div>
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 font-display">Company</h3>
              <ul className="space-y-2.5">
                {[
                  { label: "About Us", section: "about" },
                  { label: "Contact Us", section: "contact" },
                  { label: "Careers", section: "careers" },
                  { label: "Press", section: "press" },
                  { label: "Sustainability", section: "sustainability" },
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNav(link.section)}
                      className="text-white/50 hover:text-teal transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-teal transition-all" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider mt-6 mb-3 font-display">Follow Us</h3>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/50 transition-all ${social.color}`}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.href}
                    >
                      <Icon size={16} />
                    </motion.a>
                  );
                })}
              </div>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/919028076580"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-white/5 rounded-lg text-xs text-white/50 hover:bg-green-500/20 hover:text-green-400 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp: +91 9028076580
              </motion.a>
            </div>

            {/* ============ Column 5: Newsletter ============ */}
            <div>
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 font-display">Stay Updated</h3>
              <p className="text-white/50 text-sm mb-4">Get early access to new arrivals, exclusive deals, and 10% off your first order.</p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative group">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-teal transition-colors" size={16} />
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="your@email.com" 
                    required 
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all group-hover:border-white/20" 
                  />
                </div>
                <motion.button 
                  type="submit" 
                  className="w-full py-2.5 bg-gradient-to-r from-teal to-teal-light text-white font-medium rounded-xl text-sm hover:shadow-vibrant transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiSend size={14} />
                  Subscribe
                </motion.button>
                {subscribed && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-teal text-xs text-center flex items-center justify-center gap-1"
                  >
                    <FiZap size={12} />
                    Thanks for subscribing!
                  </motion.p>
                )}
              </form>
              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-white/30 space-y-1">
                <p>WhatsApp: +91 9028076580</p>
                <p>Email: hello@TrendBasket.com</p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40"
          >
            <p>&copy; {new Date().getFullYear()} TrendBasket/VM builds. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {onOpenPrivacy && (
                <button onClick={onOpenPrivacy} className="hover:text-teal transition-colors link-underline">Privacy Policy</button>
              )}
              {onOpenTerms && (
                <button onClick={onOpenTerms} className="hover:text-teal transition-colors link-underline">Terms of Service</button>
              )}
              {onOpenCookies && (
                <button onClick={onOpenCookies} className="hover:text-teal transition-colors link-underline">Cookie Policy</button>
              )}
              {onOpenSitemap && (
                <button onClick={onOpenSitemap} className="hover:text-teal transition-colors link-underline">Sitemap</button>
              )}
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;