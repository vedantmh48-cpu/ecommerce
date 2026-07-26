/**
 * NewArrivalsSection Component — Enhanced with staggered slide-in animations
 * 
 * Displays products marked with isNew: true.
 * Shows at least 20 products in a grid layout.
 */

import React from "react";
import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";
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

const NewArrivalsSection = ({ id, onOpenDetail }) => {
  const newItems = products.filter((p) => p.isNew);

  return (
    <section id={id || "new"} className="section-padding section-alt">
      <div className="container-premium">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center sm:text-left mb-10"
        >
          <motion.div variants={childVariants} className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal/10 rounded-full text-teal text-xs font-medium mb-4">
            <FiZap size={14} />
            Fresh Drops — Just In
          </motion.div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <motion.h2 variants={childVariants} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark font-display">
                New Arrivals
              </motion.h2>
              <motion.p variants={childVariants} className="text-brown/50 text-sm mt-1.5">
                {newItems.length} freshly added products — be the first to shop them!
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
          {newItems.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} onOpenDetail={onOpenDetail} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
