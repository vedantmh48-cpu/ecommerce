/**
 * SaleSection Component — Vibrant Redesign
 * 
 * Displays products currently on sale with discount badges.
 * Shows sale items from the product catalog marked with `onSale: true`.
 */

import React from "react";
import { motion } from "framer-motion";
import { FiZap, FiClock } from "react-icons/fi";
import ProductCard from "./ProductCard";
import products from "../data/products";

const SaleSection = ({ onOpenDetail }) => {
  const saleItems = products.filter((p) => p.onSale);

  return (
    <section id="sale" className="section-padding section-coral-alt">
      <div className="container-premium">
        {/* Section header */}
        <div className="text-center sm:text-left mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-coral/10 rounded-full text-coral text-xs font-medium mb-4"
          >
            <FiZap size={14} />
            Limited Time Offers — Up to 40% Off
          </motion.div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark font-display"
              >
                Special Offers
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-sm mt-1.5"
              >
                {saleItems.length} items at discounted prices — grab them while they last!
              </motion.p>
            </div>
            <div className="hidden sm:block">
              <div className="divider-premium sm:mx-0" />
            </div>
          </div>
        </div>

        {/* Sale product grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          {saleItems.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} showSaleBadge onOpenDetail={onOpenDetail} />
          ))}
        </motion.div>

        {/* Timer banner */}
        {saleItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-5 bg-gradient-to-r from-coral/5 via-coral/10 to-coral/5 rounded-2xl border border-coral/10 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <FiClock size={16} className="text-coral animate-pulse-soft" />
              <p className="text-coral-dark text-sm font-semibold">Hurry! Sale Ends Soon</p>
            </div>
            <p className="text-gray-500 text-xs">
              These deals won't last forever. Once they're gone, they're gone!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SaleSection;