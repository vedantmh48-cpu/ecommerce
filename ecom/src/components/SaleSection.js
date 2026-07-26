/**
 * SaleSection Component — Enhanced with staggered slide-in animations
 * 
 * Displays products currently on sale with discount badges.
 * Shows sale items from the product catalog marked with `onSale: true`.
 */

import React from "react";
import { motion } from "framer-motion";
import { FiZap, FiClock } from "react-icons/fi";
import ProductCard from "./ProductCard";
import products from "../data/products";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const childVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

const SaleSection = ({ onOpenDetail }) => {
  const saleItems = products.filter((p) => p.onSale);

  return (
    <section id="sale" className="section-padding section-coral-alt">
      <div className="container-premium">
        {/* Section header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center sm:text-left mb-10"
        >
          <motion.div variants={childVariants} className="inline-flex items-center gap-2 px-4 py-1.5 bg-coral/10 rounded-full text-coral text-xs font-medium mb-4">
            <FiZap size={14} />
            Limited Time Offers — Up to 40% Off
          </motion.div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <motion.h2 variants={childVariants} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark font-display">
                Special Offers
              </motion.h2>
              <motion.p variants={childVariants} className="text-gray-400 text-sm mt-1.5">
                {saleItems.length} items at discounted prices — grab them while they last!
              </motion.p>
            </div>
            <div className="hidden sm:block">
              <div className="divider-premium sm:mx-0" />
            </div>
          </div>
        </motion.div>

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
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="mt-8 p-5 bg-gradient-to-r from-coral/5 via-coral/10 to-coral/5 rounded-2xl border border-coral/10 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <FiClock size={16} className="text-coral" />
              </motion.div>
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
