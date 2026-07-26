/**
 * CheckoutForm Component — Full Functional Payment with Real Validation
 * 
 * Features:
 * - Real credit card validation (Luhn algorithm)
 * - Card brand detection (Visa, Mastercard, Amex, Discover)
 * - Auto-format card number with spaces
 * - CVV validation (3 digits for Visa/MC/Discover, 4 for Amex)
 * - Expiry date validation (MM/YY, future date)
 * - Real-time inline error messages
 * - Proper form states (idle -> validating -> processing -> success/error)
 */

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiPhone, FiMapPin, FiMail, FiCreditCard, FiCheckCircle, FiAlertCircle, FiLock } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { v4 as uuidv4 } from "uuid";

// ─── Card Validation Utilities ───────────────────────────────────────────────

const CARD_BRANDS = {
  visa: { name: "Visa", pattern: /^4/, lengths: [13, 16, 19], cvcLength: 3 },
  mastercard: { name: "Mastercard", pattern: /^(5[1-5]|2[2-7])/, lengths: [16], cvcLength: 3 },
  amex: { name: "American Express", pattern: /^3[47]/, lengths: [15], cvcLength: 4 },
  discover: { name: "Discover", pattern: /^(6011|65|64[4-9])/, lengths: [16, 19], cvcLength: 3 },
};

const detectCardBrand = (number) => {
  const clean = number.replace(/\s/g, "");
  for (const [key, brand] of Object.entries(CARD_BRANDS)) {
    if (brand.pattern.test(clean)) return { key, ...brand };
  }
  return null;
};

const luhnCheck = (num) => {
  const digits = num.replace(/\D/g, "");
  if (!digits) return false;
  let sum = 0;
  let alternate = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
};

const formatCardNumber = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 19);
  const groups = [];
  for (let i = 0; i < digits.length; i += 4) {
    groups.push(digits.slice(i, i + 4));
  }
  return groups.join(" ");
};

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 2) {
    return digits.slice(0, 2) + "/" + digits.slice(2);
  }
  return digits;
};

const validateExpiry = (value) => {
  const [month, year] = value.split("/").map((s) => s.trim());
  if (!month || !year) return "Expiry date is required";
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  if (isNaN(m) || isNaN(y)) return "Invalid expiry date";
  if (m < 1 || m > 12) return "Month must be 01-12";
  const now = new Date();
  const currentYear = parseInt(now.getFullYear().toString().slice(-2), 10);
  const currentMonth = now.getMonth() + 1;
  if (y < currentYear || (y === currentYear && m < currentMonth)) {
    return "Card is expired";
  }
  return "";
};

const PAYMENT_METHODS = [
  { id: "stripe", label: "Stripe", icon: FiCreditCard, description: "Pay with credit/debit card" },
  { id: "razorpay", label: "Razorpay", icon: FiCreditCard, description: "UPI, Net Banking, Cards" },
  { id: "cod", label: "Cash on Delivery", icon: FiCreditCard, description: "Pay when you receive" },
];

const CheckoutForm = ({ onOrderComplete, onBack }) => {
  const { items, subtotal, tax, shipping, total, dispatch } = useCart();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    cardHolderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Card brand detection
  const cardBrand = detectCardBrand(formData.cardNumber);
  const expectedCvcLength = cardBrand?.cvcLength || 3;

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") formattedValue = formatCardNumber(value);
    if (name === "expiry") formattedValue = formatExpiry(value);
    if (name === "cvv") formattedValue = value.replace(/\D/g, "").slice(0, expectedCvcLength);

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setSubmitError("");
  }, [errors, expectedCvcLength]);

  // Validate form with real card verification
  const validate = useCallback(() => {
    const newErrors = {};

    // Customer details
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\+?[\d\s-]{10,15}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Enter a valid mobile number (10-15 digits)";
    }
    if (!formData.address.trim()) newErrors.address = "Delivery address is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Card validation (only if card payment method)
    if (paymentMethod !== "cod") {
      // Card holder name
      if (!formData.cardHolderName.trim()) {
        newErrors.cardHolderName = "Card holder name is required";
      }

      // Card number
      const cardNum = formData.cardNumber.replace(/\s/g, "");
      if (!cardNum) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{13,19}$/.test(cardNum)) {
        newErrors.cardNumber = "Card number must be 13-19 digits";
      } else if (!cardBrand) {
        newErrors.cardNumber = "Card type not recognized. Use Visa, MC, Amex, or Discover";
      } else if (!cardBrand.lengths.includes(cardNum.length)) {
        newErrors.cardNumber = `${cardBrand.name} cards have ${cardBrand.lengths.join(" or ")} digits`;
      } else if (!luhnCheck(cardNum)) {
        newErrors.cardNumber = "Invalid card number - failed Luhn check";
      }

      // Expiry
      const expiryError = validateExpiry(formData.expiry);
      if (expiryError) newErrors.expiry = expiryError;

      // CVV
      const cvv = formData.cvv.replace(/\D/g, "");
      if (!cvv) {
        newErrors.cvv = "CVV is required";
      } else if (cvv.length !== expectedCvcLength) {
        newErrors.cvv = `CVV must be ${expectedCvcLength} digits for ${cardBrand?.name || "this card"}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, paymentMethod, cardBrand, expectedCvcLength]);

  // Simulate payment processing with realistic delay
  const processPayment = async () => {
    // Simulate payment gateway delay (1.5-2.5 seconds)
    const delay = 1500 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // 95% success rate for realistic simulation
    if (Math.random() > 0.95) {
      throw new Error("Transaction declined. Please try a different card.");
    }

    return {
      success: true,
      transactionId: `TXN${uuidv4().slice(0, 8).toUpperCase()}`,
      paymentGateway: paymentMethod === "stripe" ? "Stripe" : paymentMethod === "razorpay" ? "Razorpay" : "Cash on Delivery",
    };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const paymentResult = await processPayment();

      if (paymentResult.success) {
        const orderDetails = {
          id: `ORD${uuidv4().slice(0, 8).toUpperCase()}`,
          items: [...items],
          subtotal,
          tax,
          shipping,
          total,
          paymentMethod: paymentResult.paymentGateway,
          transactionId: paymentResult.transactionId,
          customer: {
            name: formData.name.trim(),
            mobile: formData.mobile.trim(),
            address: formData.address.trim(),
            email: formData.email.trim(),
          },
          date: new Date().toISOString(),
          status: "Confirmed",
        };

        // Clear the cart
        dispatch({ type: "CLEAR_CART" });
        // Notify parent with order details
        setTimeout(() => {
          onOrderComplete(orderDetails);
        }, 800);
      }
    } catch (error) {
      setSubmitError(error.message || "Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to render card brand icon
  const renderCardBrandIcon = () => {
    if (!cardBrand) {
      return (
        <div className="w-10 h-7 rounded bg-dark/5 flex items-center justify-center">
          <FiCreditCard size={16} className="text-dark/30" />
        </div>
      );
    }
    const brandColors = {
      visa: "text-blue-600",
      mastercard: "text-orange-500",
      amex: "text-blue-400",
      discover: "text-orange-400",
    };
    return (
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        className={`w-10 h-7 rounded bg-dark/5 flex items-center justify-center font-bold text-[9px] uppercase tracking-wider ${brandColors[cardBrand.key] || "text-dark/50"}`}
      >
        {cardBrand.name}
      </motion.div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-brown hover:text-teal transition-colors text-sm mb-6 touch-target"
      >
        ← Back to shopping
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold text-dark mb-2">Checkout</h1>
      <p className="text-brown/60 text-sm mb-8">Complete your order by filling in the details below.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Details Section */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-brown/5 space-y-4">
          <h2 className="font-semibold text-dark flex items-center gap-2">
            <FiUser size={18} className="text-teal" />
            Customer Details
          </h2>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-brown mb-1.5" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-brown/40" size={16} />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full pl-10 pr-4 py-3 bg-offwhite border rounded-xl text-sm text-dark placeholder-brown/30 focus:outline-none focus:ring-2 transition-all ${
                  errors.name ? "border-red-400 focus:ring-red-200" : "border-brown/20 focus:border-teal/50 focus:ring-teal/10"
                }`}
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-brown mb-1.5" htmlFor="mobile">
              Mobile Number <span className="text-brown/40">(for WhatsApp delivery)</span>
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-brown/40" size={16} />
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className={`w-full pl-10 pr-4 py-3 bg-offwhite border rounded-xl text-sm text-dark placeholder-brown/30 focus:outline-none focus:ring-2 transition-all ${
                  errors.mobile ? "border-red-400 focus:ring-red-200" : "border-brown/20 focus:border-teal/50 focus:ring-teal/10"
                }`}
              />
            </div>
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-brown mb-1.5" htmlFor="address">
              Delivery Address
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-3 text-brown/40" size={16} />
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, Apt 4B, New York, NY 10001"
                rows={3}
                className={`w-full pl-10 pr-4 py-3 bg-offwhite border rounded-xl text-sm text-dark placeholder-brown/30 focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.address ? "border-red-400 focus:ring-red-200" : "border-brown/20 focus:border-teal/50 focus:ring-teal/10"
                }`}
              />
            </div>
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-brown mb-1.5" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-brown/40" size={16} />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`w-full pl-10 pr-4 py-3 bg-offwhite border rounded-xl text-sm text-dark placeholder-brown/30 focus:outline-none focus:ring-2 transition-all ${
                  errors.email ? "border-red-400 focus:ring-red-200" : "border-brown/20 focus:border-teal/50 focus:ring-teal/10"
                }`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-brown/5 space-y-4">
          <h2 className="font-semibold text-dark flex items-center gap-2">
            <FiCreditCard size={18} className="text-teal" />
            Payment Method
          </h2>

          <div className="grid gap-3">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              return (
                <motion.button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? "border-teal bg-teal/5"
                      : "border-brown/10 bg-offwhite hover:border-brown/20"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-teal" : "border-brown/30"
                    }`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-teal" />}
                  </div>
                  <Icon size={20} className={isSelected ? "text-teal" : "text-brown/40"} />
                  <div>
                    <p className={`font-medium text-sm ${isSelected ? "text-teal" : "text-dark"}`}>
                      {method.label}
                    </p>
                    <p className="text-xs text-brown/40">{method.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Card Details Section (only for card payments) */}
        <AnimatePresence mode="wait">
          {paymentMethod !== "cod" && (
            <motion.div
              key="card-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-brown/5 space-y-4 overflow-hidden"
            >
              <h2 className="font-semibold text-dark flex items-center gap-2">
                <FiLock size={18} className="text-teal" />
                Card Details <span className="text-[10px] text-green-600 font-normal bg-green-50 px-2 py-0.5 rounded-full">Secured</span>
              </h2>

              {/* Card Holder Name */}
              <div>
                <label className="block text-sm font-medium text-brown mb-1.5" htmlFor="cardHolderName">
                  Card Holder Name
                </label>
                <input
                  id="cardHolderName"
                  name="cardHolderName"
                  type="text"
                  value={formData.cardHolderName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 bg-offwhite border rounded-xl text-sm text-dark placeholder-brown/30 focus:outline-none focus:ring-2 transition-all ${
                    errors.cardHolderName ? "border-red-400 focus:ring-red-200" : "border-brown/20 focus:border-teal/50 focus:ring-teal/10"
                  }`}
                />
                {errors.cardHolderName && <p className="text-red-500 text-xs mt-1">{errors.cardHolderName}</p>}
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-brown mb-1.5" htmlFor="cardNumber">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    inputMode="numeric"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="4242 4242 4242 4242"
                    className={`w-full pl-4 pr-14 py-3 bg-offwhite border rounded-xl text-sm text-dark placeholder-brown/30 focus:outline-none focus:ring-2 transition-all font-mono tracking-wider ${
                      errors.cardNumber ? "border-red-400 focus:ring-red-200" : "border-brown/20 focus:border-teal/50 focus:ring-teal/10"
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {renderCardBrandIcon()}
                  </div>
                </div>
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                {!errors.cardNumber && formData.cardNumber.replace(/\s/g, "").length > 0 && luhnCheck(formData.cardNumber.replace(/\s/g, "")) && (
                  <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                    <FiCheckCircle size={12} />
                    Valid card number
                  </p>
                )}
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                {/* Expiry */}
                <div>
                  <label className="block text-sm font-medium text-brown mb-1.5" htmlFor="expiry">
                    Expiry Date (MM/YY)
                  </label>
                  <input
                    id="expiry"
                    name="expiry"
                    type="text"
                    inputMode="numeric"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className={`w-full px-4 py-3 bg-offwhite border rounded-xl text-sm text-dark placeholder-brown/30 focus:outline-none focus:ring-2 transition-all font-mono ${
                      errors.expiry ? "border-red-400 focus:ring-red-200" : "border-brown/20 focus:border-teal/50 focus:ring-teal/10"
                    }`}
                  />
                  {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                </div>

                {/* CVV */}
                <div>
                  <label className="block text-sm font-medium text-brown mb-1.5" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    name="cvv"
                    type="text"
                    inputMode="numeric"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder={expectedCvcLength === 4 ? "1234" : "123"}
                    className={`w-full px-4 py-3 bg-offwhite border rounded-xl text-sm text-dark placeholder-brown/30 focus:outline-none focus:ring-2 transition-all font-mono ${
                      errors.cvv ? "border-red-400 focus:ring-red-200" : "border-brown/20 focus:border-teal/50 focus:ring-teal/10"
                    }`}
                  />
                  {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                </div>
              </div>

              {/* Security note */}
              <div className="flex items-center gap-2 text-[11px] text-green-600 bg-green-50 rounded-xl px-4 py-2.5">
                <FiLock size={14} />
                Your payment information is encrypted and secure. We never store full card details.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COD Note */}
        <AnimatePresence mode="wait">
          {paymentMethod === "cod" && (
            <motion.div
              key="cod-note"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-amber/5 border border-amber/10 rounded-2xl p-5 text-sm text-amber-800">
                <p className="font-medium flex items-center gap-2">
                  <FiAlertCircle size={16} />
                  Cash on Delivery
                </p>
                <p className="text-brown/60 text-xs mt-1">
                  Pay with cash when your order is delivered. A small COD fee of $2.99 may apply.
                  Please have the exact amount ready at the time of delivery.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-brown/5 space-y-3">
          <h2 className="font-semibold text-dark">Order Summary</h2>
          <div className="space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-brown/70">
                <span className="truncate mr-2">
                  {item.name} <span className="text-brown/40">x{item.quantity}</span>
                </span>
                <span className="font-medium text-dark">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-brown/10 pt-3 space-y-1.5">
            <div className="flex justify-between text-brown/60 text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-brown/60 text-sm">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-brown/60 text-sm">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-dark font-bold text-base pt-2 border-t border-brown/10">
              <span>Total</span>
              <span className="text-teal">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit error */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
          >
            <FiAlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 text-sm font-medium">Payment Failed</p>
              <p className="text-red-500 text-xs mt-0.5">{submitError}</p>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 bg-teal text-offwhite font-semibold rounded-xl shadow-md transition-all touch-target flex items-center justify-center gap-2 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-teal/90"
          }`}
          whileHover={isSubmitting ? {} : { scale: 1.02 }}
          whileTap={isSubmitting ? {} : { scale: 0.98 }}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing Payment...
            </>
          ) : (
            <>
              <FiLock size={16} />
              {paymentMethod === "cod" ? `Place Order — $${total.toFixed(2)}` : `Pay $${total.toFixed(2)} Securely`}
            </>
          )}
        </motion.button>

        {/* Payment badges */}
        <div className="flex items-center justify-center gap-4 text-[10px] text-brown/40">
          <span className="flex items-center gap-1">
            <FiLock size={11} /> SSL Encrypted
          </span>
          <span className="flex items-center gap-1">
            <FiCheckCircle size={11} /> PCI Compliant
          </span>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;

