/**
 * ProductDetailModal Component
 *
 * Full-screen modal that displays detailed product information:
 * - Large product image with zoom/hover effect
 * - Product name, description, price, rating, category
 * - Image description / alt text
 * - Related products section
 * - Add to Cart functionality
 * - Attractive and professional design
 */

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiShoppingBag,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiHeart,
  FiShare2,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import products from "../data/products";

// Overlay animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 28, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const ProductDetailModal = ({ product, onClose }) => {
  const { dispatch } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Build image gallery: primary + any additional images
  const images = useMemo(() => {
    if (!product) return [];
    const imgs = [product.image];
    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        if (!imgs.includes(img)) imgs.push(img);
      });
    }
    return imgs;
  }, [product]);

  // Find related products (same category, excluding current product)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.category === product.category ||
            p.collection === product.collection)
      )
      .slice(0, 4);
  }, [product]);

  // Handle add to cart
  const handleAddToCart = (e) => {
    e?.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: product });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Handle related product click
  const handleRelatedProductClick = (relatedProduct) => {
    // We'll re-render by updating from parent via a custom approach
    // For simplicity, we'll close and reopen is complex - let's use a different approach
    onClose();
    // Small delay to allow modal to close, then re-open with new product
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("openProductDetail", { detail: relatedProduct })
      );
    }, 300);
  };

  // Image navigation
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!product) return null;

  const currentPrice = product.onSale && product.salePrice
    ? product.salePrice
    : product.price;
  const originalPrice = product.onSale && product.salePrice
    ? product.price
    : null;
  const discountPercent = originalPrice
    ? Math.round((1 - currentPrice / originalPrice) * 100)
    : 0;

  return (
    <AnimatePresence>
      <motion.div
        key="product-detail-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          key="product-detail-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl bg-offwhite rounded-3xl overflow-hidden shadow-2xl mx-auto my-4 sm:my-8 max-h-[95vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            aria-label="Close product detail"
          >
            <FiX size={20} className="text-dark" />
          </button>

          {/* ===== MAIN CONTENT ===== */}
          <div className="flex flex-col lg:flex-row">
            {/* Left: Image Gallery */}
            <div className="relative w-full lg:w-[55%] bg-gradient-to-br from-brown/5 to-offwhite p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]">
              {/* Image count indicator */}
              {images.length > 1 && (
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-brown">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}

              {/* Sale badge */}
              {product.onSale && product.salePrice && (
                <span className="absolute top-4 left-16 z-10 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold shadow-md">
                  -{discountPercent}% OFF
                </span>
              )}

              {/* Main Image */}
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-white shadow-sm group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={`${product.name} - Product image ${currentImageIndex + 1}`}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </AnimatePresence>

                {/* Image navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Previous image"
                    >
                      <FiChevronLeft size={18} className="text-dark" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Next image"
                    >
                      <FiChevronRight size={18} className="text-dark" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail navigation */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        idx === currentImageIndex
                          ? "border-teal shadow-md scale-105"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Image Description */}
              <div className="w-full mt-4 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-brown/5">
                <p className="text-xs sm:text-sm text-brown/60 leading-relaxed italic">
                  <span className="font-medium text-brown not-italic">📸 Product Image: </span>
                  {product.imageDescription ||
                    `High-quality product photo showcasing the ${product.name}. Features a clean, minimal aesthetic with the product displayed prominently against a neutral background, highlighting its design, texture, and craftsmanship. Perfect for visualizing this premium ${product.category.toLowerCase()} item.`}
                </p>
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="w-full lg:w-[45%] p-6 sm:p-8 lg:p-10 flex flex-col">
              {/* Category badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-teal/10 text-teal rounded-full text-xs font-semibold">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-terracotta/10 text-terracotta rounded-full text-xs font-semibold">
                  {product.collection}
                </span>
              </div>

              {/* Product name */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark mb-3 leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating)
                          ? "text-terracotta fill-current"
                          : "text-brown/20"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-brown">
                  {product.rating}
                </span>
                <span className="text-xs text-brown/40">| Verified Reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-dark">
                  ${currentPrice.toFixed(2)}
                </span>
                {originalPrice && (
                  <>
                    <span className="text-lg sm:text-xl text-brown/40 line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="px-2 py-0.5 bg-red-500/10 text-red-500 rounded-md text-xs font-bold">
                      Save ${(originalPrice - currentPrice).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-dark uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-brown/70 text-sm sm:text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="mb-6 p-4 bg-brown/5 rounded-xl">
                <h3 className="text-sm font-semibold text-dark mb-3 flex items-center gap-2">
                  <FiCheck size={16} className="text-teal" />
                  Key Features
                </h3>
                <ul className="space-y-2 text-sm text-brown/70">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                    Premium quality materials and craftsmanship
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                    Ethically sourced and sustainably produced
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                    Free shipping on orders over $50
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                    30-day hassle-free returns
                  </li>
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-brown/10">
                <motion.button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm shadow-md transition-all touch-target ${
                    addedToCart
                      ? "bg-green-500 text-white"
                      : "bg-teal text-offwhite hover:bg-teal/90"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={
                    addedToCart
                      ? `${product.name} added to cart`
                      : `Add ${product.name} to cart`
                  }
                >
                  {addedToCart ? (
                    <>
                      <FiCheck size={18} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <FiShoppingBag size={18} />
                      Add to Cart
                    </>
                  )}
                </motion.button>
                <motion.button
                  className="w-12 h-12 flex items-center justify-center rounded-xl border border-brown/10 text-brown/50 hover:text-terracotta hover:border-terracotta/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Add to wishlist"
                >
                  <FiHeart size={18} />
                </motion.button>
                <motion.button
                  className="w-12 h-12 flex items-center justify-center rounded-xl border border-brown/10 text-brown/50 hover:text-teal hover:border-teal/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Share product"
                >
                  <FiShare2 size={18} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* ===== RELATED PRODUCTS ===== */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-brown/10 px-6 sm:px-8 lg:px-10 py-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-dark">
                    Related Products
                  </h3>
                  <p className="text-xs sm:text-sm text-brown/50 mt-0.5">
                    You might also like these similar items
                  </p>
                </div>
                <span className="text-xs text-brown/40">
                  {relatedProducts.length} items
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {relatedProducts.map((rp) => (
                  <motion.button
                    key={rp.id}
                    onClick={() => handleRelatedProductClick(rp)}
                    className="group text-left bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-brown/5"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="aspect-square overflow-hidden bg-offwhite">
                      <img
                        src={rp.image}
                        alt={rp.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-semibold text-dark line-clamp-1 mb-0.5">
                        {rp.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-teal">
                          $
                          {rp.onSale && rp.salePrice
                            ? rp.salePrice.toFixed(2)
                            : rp.price.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-0.5">
                          <FiStar
                            size={10}
                            className="text-terracotta fill-current"
                          />
                          <span className="text-[10px] text-brown/60">
                            {rp.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;