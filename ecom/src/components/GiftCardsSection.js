/**
 * GiftCardsSection Component — Vibrant Redesign
 * 
 * Displays discount tiers/gift card offers in a visually engaging grid.
 * Tiers: Silver ($50+ = 10% off), Gold ($100+ = 15% off), Platinum ($200+ = 20% off)
 * Shows live progress based on subtotal.
 */

import React from "react";
import { motion } from "framer-motion";
import { FiStar, FiAward, FiZap, FiChevronRight } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const TIERS = [
  { name: "Silver", min: 50, discount: 10, icon: FiStar, desc: "10% off your order", color: "from-gray-300 to-gray-400", textColor: "text-gray-600", bgColor: "bg-gray-100" },
  { name: "Gold", min: 100, discount: 15, icon: FiAward, desc: "15% off your order", color: "from-amber-300 to-amber-500", textColor: "text-amber-700", bgColor: "bg-amber-50" },
  { name: "Platinum", min: 200, discount: 20, icon: FiZap, desc: "20% off your order", color: "from-lavender-300 to-lavender-500", textColor: "text-lavender", bgColor: "bg-lavender/10" },
];

const GiftCardsSection = ({ onScrollToProducts }) => {
  const { subtotal, qualifiesForGift, discountPercent } = useCart();

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-coral/10 rounded-full text-coral text-xs font-medium mb-3"
        >
          <FiZap size={14} />
          Special Offers
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-bold text-dark font-display"
        >
          Gift Card Discounts
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm mt-2 max-w-md mx-auto"
        >
          Spend more and save more with our tiered discount system. Discount auto-applies at checkout.
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        {TIERS.map((tier, idx) => {
          const Icon = tier.icon;
          const isUnlocked = subtotal >= tier.min;
          const progress = subtotal >= tier.min ? 100 : Math.min((subtotal / tier.min) * 100, 100);
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-2xl p-6 border-2 transition-all ${
                isUnlocked
                  ? "bg-white border-teal shadow-vibrant"
                  : "bg-white/60 border-gray-100 opacity-70"
              }`}
            >
              {/* Background gradient */}
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-br ${tier.color} opacity-10`} />

              {isUnlocked && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 px-2 py-0.5 bg-teal/10 text-teal text-[10px] font-bold rounded-full"
                >
                  UNLOCKED
                </motion.div>
              )}

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4 ${isUnlocked ? "shadow-vibrant" : ""}`}>
                <Icon size={22} className="text-white" />
              </div>
              <h3 className={`font-bold text-lg ${tier.textColor}`}>{tier.name}</h3>
              <p className="text-2xl font-bold text-dark mt-1">{tier.discount}% Off</p>
              <p className="text-gray-400 text-sm mt-1">{tier.desc}</p>
              <p className="text-gray-300 text-xs mt-2">Spend ${tier.min}+</p>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    viewport={{ once: true }}
                    className={`h-full rounded-full bg-gradient-to-r ${tier.color}`}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {isUnlocked ? "Unlocked!" : `$${(tier.min - subtotal > 0 ? (tier.min - subtotal).toFixed(2) : "0")} away`}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Current discount banner */}
      {qualifiesForGift && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-4 bg-gradient-to-r from-teal via-teal-light to-teal rounded-2xl text-white text-center shadow-vibrant"
        >
          <p className="font-semibold text-lg">
            You qualify for a {discountPercent}% discount! Applied automatically at checkout.
          </p>
        </motion.div>
      )}

      {!qualifiesForGift && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <motion.button
            onClick={onScrollToProducts}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal to-teal-light text-white font-medium rounded-xl shadow-vibrant hover:shadow-vibrant-lg transition-all"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Shop Now to Unlock Discounts
            <FiChevronRight size={16} />
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default GiftCardsSection;