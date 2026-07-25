/**
 * CartDrawer Component — Vibrant Redesign
 * 
 * Slide-over cart drawer with:
 * - Gradient discount banner with animated progress
 * - Bouncy item animations
 * - Vibrant color accents
 * - Playful empty state
 * - Animated total section
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiGift, FiTag, FiZap } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring", damping: 28, stiffness: 280 } },
  exit: { x: "100%", transition: { type: "spring", damping: 28, stiffness: 280 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const CartDrawer = ({ isOpen, onClose, onCheckout }) => {
  const { items, subtotal, tax, shipping, discount, discountLabel, nextTierAmount, qualifiesForGift, total, cartCount, dispatch } = useCart();

  const updateQuantity = (id, delta) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: item.quantity + delta } });
    }
  };

  const progressToNext = nextTierAmount ? Math.min((subtotal / nextTierAmount) * 100, 100) : 100;
  const remainingForNext = nextTierAmount ? (nextTierAmount - subtotal).toFixed(2) : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="cart-backdrop" variants={backdropVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }} className="fixed inset-0 bg-dark/30 backdrop-blur-sm z-50" onClick={onClose} />
          <motion.div key="cart-drawer" variants={drawerVariants} initial="hidden" animate="visible" exit="exit" className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal to-teal-light flex items-center justify-center">
                  <FiShoppingBag size={18} className="text-white" />
                </div>
                <h2 className="text-lg font-semibold text-dark font-display">Your Cart</h2>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-2 py-0.5 bg-coral/10 text-coral text-xs font-medium rounded-full"
                  >
                    {cartCount} {cartCount === 1 ? "item" : "items"}
                  </motion.span>
                )}
              </div>
              <motion.button 
                onClick={onClose} 
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="touch-target w-10 h-10 flex items-center justify-center text-gray-400 hover:text-dark transition-colors rounded-lg" 
                aria-label="Close cart"
              >
                <FiX size={22} />
              </motion.button>
            </div>

            {/* Gift Card / Discount Banner */}
            {subtotal > 0 && (
              <div className="px-5 py-3 bg-gradient-to-r from-teal/5 via-coral/5 to-lavender/5 border-b border-gray-100">
                {qualifiesForGift ? (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <FiGift size={16} className="text-teal" />
                    <span className="text-teal-dark font-medium">{discountLabel} applied!</span>
                    <span className="text-coral font-semibold">-${discount.toFixed(2)}</span>
                  </motion.div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FiZap size={14} className="text-coral" />
                      <span>Add <strong className="text-teal">${remainingForNext}</strong> more for a <strong className="text-coral">10% discount</strong>!</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressToNext}%` }}
                        className="h-full bg-gradient-to-r from-teal via-coral to-lavender rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto hide-scrollbar px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-gray-300"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-4">
                    <FiShoppingBag size={36} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Your cart is empty</p>
                  <p className="text-xs mt-1 text-gray-400">Add some items to get started!</p>
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4 px-6 py-2.5 bg-gradient-to-r from-teal to-teal-light text-white rounded-xl text-sm font-medium shadow-vibrant"
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    key={item.id} 
                    layout 
                    initial={{ opacity: 0, x: 50, scale: 0.95 }} 
                    animate={{ opacity: 1, x: 0, scale: 1 }} 
                    exit={{ opacity: 0, x: 50, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-teal/20 transition-colors"
                  >
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-dark truncate">{item.name}</h4>
                      <p className="text-teal font-semibold text-sm mt-0.5">${(item.price * item.quantity).toFixed(2)}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <motion.button 
                          whileTap={{ scale: 0.85 }} 
                          onClick={() => updateQuantity(item.id, -1)} 
                          className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors" 
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={12} />
                        </motion.button>
                        <span className="w-7 text-center text-sm font-medium text-dark">{item.quantity}</span>
                        <motion.button 
                          whileTap={{ scale: 0.85 }} 
                          onClick={() => updateQuantity(item.id, 1)} 
                          className="w-7 h-7 rounded-full bg-teal/10 flex items-center justify-center text-teal hover:bg-teal/20 transition-colors" 
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={12} />
                        </motion.button>
                        <motion.button 
                          onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })} 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="ml-auto touch-target w-8 h-8 flex items-center justify-center text-gray-300 hover:text-coral transition-colors" 
                          aria-label="Remove item"
                        >
                          <FiTrash2 size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer with totals + checkout */}
            {items.length > 0 && (
              <motion.div 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="border-t border-gray-100 px-5 py-4 space-y-3 bg-white"
              >
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="text-dark font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  {qualifiesForGift && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex justify-between text-teal font-medium"
                    >
                      <span><FiGift size={14} className="inline mr-1" />{discountLabel}</span>
                      <span>-${discount.toFixed(2)}</span>
                    </motion.div>
                  )}
                  <div className="flex justify-between text-gray-500">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-teal font-medium">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-dark font-bold text-base pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <motion.span 
                      key={total}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-gradient"
                    >
                      ${total.toFixed(2)}
                    </motion.span>
                  </div>
                </div>
                <motion.button 
                  onClick={() => { onClose(); onCheckout(); }} 
                  className="w-full py-3.5 bg-gradient-to-r from-teal to-teal-light text-white font-semibold rounded-xl shadow-vibrant hover:shadow-vibrant-lg transition-all touch-target flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiShoppingBag size={18} />
                  Proceed to Checkout
                </motion.button>
                {shipping > 0 && (
                  <p className="text-xs text-center text-gray-400">
                    <FiTag size={12} className="inline mr-1" />
                    Free shipping on orders over $100.00
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;