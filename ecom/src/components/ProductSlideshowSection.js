/**
 * ProductSlideshowSection Component — Animated Featured Products Slideshow
 *
 * An auto-advancing carousel showcasing featured products with:
 * - Smooth fade/slide transitions (auto-advance every 4s)
 * - Left/right arrow navigation and dot indicators
 * - Product image, name, price, rating, description, and "Shop Now" CTA
 * - Consistent premium styling with the existing brand theme
 */

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiShoppingBag,
  FiArrowRight,
  FiTrendingUp,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import products from "../data/products";

// Curated featured products: mix of best sellers and sale items
const featuredProducts = products
  .filter((p) => p.isBestSeller || p.onSale)
  .slice(0, 8);

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const infoVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const ProductSlideshowSection = ({ onOpenDetail, onScrollToProducts }) => {
  const { dispatch } = useCart();
  const [[currentIndex, direction], setSlideState] = useState([0, 0]);

  const totalSlides = featuredProducts.length;
  const currentProduct = featuredProducts[currentIndex];

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideState((prev) => {
        const nextIndex = (prev[0] + 1) % totalSlides;
        return [nextIndex, 1];
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setSlideState((prev) => {
      const nextIndex = (prev[0] + 1) % totalSlides;
      return [nextIndex, 1];
    });
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setSlideState((prev) => {
      const prevIndex = (prev[0] - 1 + totalSlides) % totalSlides;
      return [prevIndex, -1];
    });
  }, [totalSlides]);

  const handleDotClick = useCallback((index) => {
    setSlideState((prev) => {
      const dir = index > prev[0] ? 1 : -1;
      return [index, dir];
    });
  }, []);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: currentProduct });
  };

  const handleOpenDetail = () => {
    if (onOpenDetail) onOpenDetail(currentProduct);
  };

  const currentPrice =
    currentProduct.onSale && currentProduct.salePrice
      ? currentProduct.salePrice
      : currentProduct.price;
  const originalPrice =
    currentProduct.onSale && currentProduct.salePrice
      ? currentProduct.price
      : null;

  // If no slides, don't render
  if (totalSlides === 0) return null;

  return (
    <section className="section-padding bg-gradient-to-b from-offwhite via-cream to-offwhite overflow-hidden">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center sm:text-left mb-10"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-teal/10 to-coral/10 rounded-full text-teal text-xs font-medium mb-4"
          >
            <FiTrendingUp size={14} />
            Featured Collection — Curated Just for You
          </motion.div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark font-display"
              >
                Product Spotlight
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-gray-400 text-sm mt-1.5"
              >
                Swipe through our handpicked selection of trending products
              </motion.p>
            </div>
            <div className="hidden sm:block">
              <div className="divider-premium sm:mx-0" />
            </div>
          </div>
        </motion.div>

        {/* Slideshow Content */}
        <div className="relative">
          <div className="relative bg-white rounded-3xl shadow-soft-lg border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0 min-h-[420px] md:min-h-[480px]">
              {/* Image Side */}
              <div className="relative bg-gradient-to-br from-cream to-offwhite flex items-center justify-center p-8 md:p-12 overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-teal/5 blur-[60px]"
                  />
                  <motion.div
                    animate={{ scale: [1.1, 1, 1.1], rotate: [0, -5, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-coral/5 blur-[70px]"
                  />
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentProduct.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="relative z-10 w-full max-w-sm"
                  >
                    <div className="relative aspect-square">
                      <img
                        src={currentProduct.image}
                        alt={currentProduct.name}
                        className="w-full h-full object-cover rounded-2xl shadow-vibrant"
                      />

                      {/* Discount badge */}
                      {currentProduct.onSale && currentProduct.salePrice && (
                        <motion.span
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 15,
                          }}
                          className="absolute -top-3 -right-3 px-3.5 py-1.5 bg-dark text-cream rounded-full text-xs font-bold shadow-vibrant-lg"
                        >
                          {Math.round(
                            (1 - currentProduct.salePrice / currentProduct.price) *
                              100
                          )}
                          % OFF
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Info Side */}
              <div className="flex flex-col justify-center p-8 md:p-12 bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProduct.id}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-4"
                  >
                    {/* Category badge */}
                    <motion.div variants={infoVariants} custom={0}>
                      <span className="inline-block px-3 py-1 bg-teal/10 rounded-full text-[11px] font-semibold text-teal tracking-wide uppercase">
                        {currentProduct.category}
                      </span>
                    </motion.div>

                    {/* Product name */}
                    <motion.h3
                      variants={infoVariants}
                      custom={1}
                      className="text-2xl sm:text-3xl font-bold text-dark font-display leading-tight"
                    >
                      {currentProduct.name}
                    </motion.h3>

                    {/* Rating */}
                    <motion.div
                      variants={infoVariants}
                      custom={2}
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            size={14}
                            className={
                              i < Math.floor(currentProduct.rating)
                                ? "text-teal fill-current"
                                : "text-gray-200"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs font-medium">
                        {currentProduct.rating}
                      </span>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      variants={infoVariants}
                      custom={3}
                      className="text-gray-500 text-sm leading-relaxed"
                    >
                      {currentProduct.description}
                    </motion.p>

                    {/* Price */}
                    <motion.div
                      variants={infoVariants}
                      custom={4}
                      className="flex items-baseline gap-2.5"
                    >
                      <span className="text-3xl font-bold text-dark">
                        ${currentPrice.toFixed(2)}
                      </span>
                      {originalPrice && (
                        <span className="text-lg text-gray-300 line-through">
                          ${originalPrice.toFixed(2)}
                        </span>
                      )}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                      variants={infoVariants}
                      custom={5}
                      className="flex flex-wrap gap-3 pt-2"
                    >
                      <motion.button
                        onClick={handleAddToCart}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-dark text-cream font-semibold rounded-xl shadow-vibrant hover:bg-teal transition-all touch-target text-sm"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiShoppingBag size={16} />
                        Add to Cart
                      </motion.button>

                      <motion.button
                        onClick={handleOpenDetail}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-cream text-dark font-semibold rounded-xl border border-dark/10 hover:bg-offwhite hover:border-dark/20 transition-all touch-target text-sm"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Quick View
                        <FiArrowRight size={14} />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Arrows */}
            <motion.button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-soft border border-gray-100 flex items-center justify-center text-dark hover:bg-dark hover:text-cream transition-all z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous product"
            >
              <FiChevronLeft size={20} />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-soft border border-gray-100 flex items-center justify-center text-dark hover:bg-dark hover:text-cream transition-all z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next product"
            >
              <FiChevronRight size={20} />
            </motion.button>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {featuredProducts.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-dark w-8 h-2.5"
                    : "bg-dark/20 w-2.5 h-2.5 hover:bg-dark/40"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="text-center mt-3">
            <span className="text-gray-400 text-xs font-medium">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(totalSlides).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSlideshowSection;

