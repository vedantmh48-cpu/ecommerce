/**
 * BestSellersSection Component — Vibrant Redesign
 * 
 * Displays products marked with isBestSeller: true.
 * Shows at least 20 products in a grid layout.
 */

import React from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import ProductCard from "./ProductCard";
import products from "../data/products";

const BestSellersSection = ({ id, onOpenDetail }) => {
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <section id={id || "bestsellers"} className="section-padding">
      <div className="container-premium">
        <div className="text-center sm:text-left mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber/10 rounded-full text-amber text-xs font-medium mb-4"
          >
            <FiStar size={14} />
            Most Popular — Customer Favorites
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
                Best Sellers
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-sm mt-1.5"
              >
                {bestSellers.length} customer favorites — shop what everyone loves!
              </motion.p>
            </div>
            <div className="hidden sm:block">
              <div className="divider-premium sm:mx-0" />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          {bestSellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} onOpenDetail={onOpenDetail} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellersSection;