/**
 * CollectionsSection Component — Enhanced with staggered slide-in animations
 * 
 * Displays products grouped by collection.
 * Shows collection cards that filter to show products from each collection.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight, FiGrid } from "react-icons/fi";
import ProductCard from "./ProductCard";
import products from "../data/products";

// Get unique collections and count products in each
const collectionData = products.reduce((acc, p) => {
  const col = p.collection || "General";
  if (!acc[col]) acc[col] = { name: col, products: [] };
  acc[col].products.push(p);
  return acc;
}, {});

const collections = Object.values(collectionData).sort((a, b) => b.products.length - a.products.length);

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

const tabContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const tabVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 18 },
  },
};

const CollectionsSection = ({ id, onOpenDetail }) => {
  const [activeCollection, setActiveCollection] = useState("All");

  const filteredProducts =
    activeCollection === "All"
      ? products
      : products.filter((p) => (p.collection || "General") === activeCollection);

  return (
    <section id={id || "collections"} className="section-padding section-alt">
      <div className="container-premium">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center sm:text-left mb-10"
        >
          <motion.div variants={childVariants} className="inline-flex items-center gap-2 px-4 py-1.5 bg-lavender/10 rounded-full text-lavender text-xs font-medium mb-4">
            <FiGrid size={14} />
            Curated Collections
          </motion.div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <motion.h2 variants={childVariants} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark font-display">
                Collections
              </motion.h2>
              <motion.p variants={childVariants} className="text-gray-400 text-sm mt-1.5">
                Browse our curated collections — {collections.length} unique themes to explore
              </motion.p>
            </div>
            <div className="hidden sm:block">
              <div className="divider-premium sm:mx-0" />
            </div>
          </div>
        </motion.div>

        {/* Collection tabs */}
        <motion.div
          variants={tabContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <motion.button
            variants={tabVariants}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCollection("All")}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeCollection === "All"
                ? "bg-gradient-to-r from-teal to-teal-light text-white shadow-vibrant"
                : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-dark border border-gray-100"
            }`}
          >
            All ({products.length})
          </motion.button>
          {collections.map((col) => (
            <motion.button
              key={col.name}
              variants={tabVariants}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCollection(col.name)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeCollection === col.name
                  ? "bg-gradient-to-r from-teal to-teal-light text-white shadow-vibrant"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-dark border border-gray-100"
              }`}
            >
              {col.name} ({col.products.length})
            </motion.button>
          ))}
        </motion.div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCollection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
          >
            {filteredProducts.slice(0, 20).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} onOpenDetail={onOpenDetail} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length > 20 && (
          <div className="text-center mt-10">
            <motion.button
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-teal to-teal-light text-white font-semibold rounded-xl shadow-vibrant hover:shadow-vibrant-lg transition-all"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              View All {filteredProducts.length} Products
              <FiChevronRight size={16} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CollectionsSection;

