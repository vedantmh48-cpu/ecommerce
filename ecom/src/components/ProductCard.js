/**
 * ProductCard Component
 */

import React from "react";
import { motion } from "framer-motion";
import { FiShoppingBag, FiStar, FiEye, FiHeart } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product, index, showSaleBadge, onOpenDetail }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleOpenDetail = () => {
    if (onOpenDetail) onOpenDetail(product);
  };

  const currentPrice = product.onSale && product.salePrice ? product.salePrice : product.price;
  const originalPrice = product.onSale && product.salePrice ? product.price : null;

  return (
    <div
      onClick={handleOpenDetail}
      className="group bg-cream rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow duration-300 border border-dark/8 cursor-pointer relative"
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal/10 via-teal-light/5 to-transparent blur-xl" />
      </div>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-offwhite to-cream">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick view */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.span
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className="px-5 py-2.5 bg-cream/90 backdrop-blur-md rounded-xl text-xs font-semibold text-dark shadow-lg border border-cream/50"
          >
            <FiEye size={14} className="inline mr-1.5" />
            Quick View
          </motion.span>
        </div>

        {/* Sale badge */}
        {showSaleBadge && product.onSale && product.salePrice && (
          <motion.span
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="absolute top-3 left-3 px-3 py-1 bg-dark text-cream rounded-full text-[11px] font-bold shadow-vibrant badge-pulse"
          >
            {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
          </motion.span>
        )}

        {/* Category tag */}
        {!showSaleBadge && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-cream/85 backdrop-blur-sm rounded-full text-[11px] font-medium text-dark/70 shadow-sm border border-cream/50">
            {product.category}
          </span>
        )}

        {/* Rating */}
        <span className="absolute top-3 right-3 px-2.5 py-1 bg-cream/85 backdrop-blur-sm rounded-full text-[11px] font-medium text-dark/70 flex items-center gap-1 shadow-sm border border-cream/50">
          <FiStar size={10} className="text-teal fill-current" />
          {product.rating}
        </span>

        {/* Wishlist */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-cream/85 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-dark hover:text-cream"
        >
          <FiHeart size={14} />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        <h3 className="font-semibold text-dark text-sm sm:text-base leading-tight mb-1 line-clamp-1 group-hover:text-teal transition-colors">
          {product.name}
        </h3>
        <p className="text-dark/50 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1.5">
            {originalPrice ? (
              <>
                <span className="text-lg sm:text-xl font-bold price-tag text-teal">
                  ${currentPrice.toFixed(2)}
                </span>
                <span className="text-sm text-dark/30 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg sm:text-xl font-bold price-tag text-dark">
                ${currentPrice.toFixed(2)}
              </span>
            )}
          </div>
          <motion.button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-dark text-cream rounded-xl text-sm font-medium shadow-vibrant hover:bg-teal transition-colors touch-target"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Add ${product.name} to cart`}
          >
            <FiShoppingBag size={15} />
            <span className="hidden xs:inline md:hidden lg:inline text-xs">Add</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
