/**
 * LimitedEditionSection Component — Enhanced with staggered slide-in animations
 * 
 * Displays products marked with isLimitedEdition: true.
 * Shows exclusive limited-run products with a premium badge.
 */

import React from "react";
import { motion } from "framer-motion";
import { FiClock, FiStar } from "react-icons/fi";
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

const LimitedEditionSection = ({ id, onOpenDetail }) => {
  const limitedItems = products.filter((p) => p.isLimitedEdition);

  return (
    <section id={id || "limited"} className="section-padding">
      <div className="container-premium">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center sm:text-left mb-10"
        >
          <motion.div variants={childVariants} className="inline-flex items-center gap-2 px-4 py-1.5 bg-lavender/10 rounded-full text-lavender text-xs font-medium mb-4">
            <FiStar size={14} />
            Exclusive Drops — Limited Quantities
          </motion.div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <motion.h2 variants={childVariants} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark font-display">
                Limited Edition
              </motion.h2>
              <motion.p variants={childVariants} className="text-gray-400 text-sm mt-1.5">
                {limitedItems.length} exclusive products — once they're gone, they're gone forever
              </motion.p>
            </div>
            <div className="hidden sm:block">
              <div className="divider-premium sm:mx-0" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          {limitedItems.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} showSaleBadge={false} onOpenDetail={onOpenDetail} />
          ))}
        </motion.div>

        {limitedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="mt-10 p-6 bg-gradient-to-r from-lavender/5 via-lavender/10 to-lavender/5 rounded-2xl border border-lavender/10 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <FiClock size={16} className="text-lavender" />
              </motion.div>
              <p className="text-lavender-dark text-sm font-semibold">Limited Stock Alert</p>
            </div>
            <p className="text-gray-500 text-sm">
              These limited edition pieces are crafted in small batches. When they're sold out, 
              they won't be restocked. Get yours before they're gone.
            </p>
            <motion.button
              onClick={onOpenDetail ? () => {} : undefined}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-lavender to-lavender-light text-white rounded-xl text-sm font-medium shadow-lavender hover:shadow-lg transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Shop Limited Edition
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LimitedEditionSection;
