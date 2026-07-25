/**
 * CheckoutForm Component
 * 
 * Collects customer details and payment method.
 * Features:
 * - Form fields: Name, Mobile, Address, Email
 * - Payment method selection (Stripe, Razorpay, COD)
 * - Smooth accordion-style field expansion
 * - Form validation
 * - Order submission with receipt generation
 * 
 * Payment integrations are simulated (sandbox mode) for testing.
 * In production, replace with actual Stripe/Razorpay SDKs.
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiPhone, FiMapPin, FiMail, FiCreditCard, FiDollarSign } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { v4 as uuidv4 } from "uuid";

// Payment method options
const PAYMENT_METHODS = [
  { id: "stripe", label: "Stripe", icon: FiCreditCard, description: "Pay with credit/debit card" },
  { id: "razorpay", label: "Razorpay", icon: FiDollarSign, description: "UPI, Net Banking, Cards" },
  { id: "cod", label: "Cash on Delivery", icon: FiDollarSign, description: "Pay when you receive" },
];

const CheckoutForm = ({ onOrderComplete, onBack }) => {
  const { items, subtotal, tax, shipping, total, dispatch } = useCart();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setPaymentStep] = useState("form"); // form | processing | success (unused var but kept for clarity)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\+?[\d\s-]{10,15}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Enter a valid mobile number";
    }
    if (!formData.address.trim()) newErrors.address = "Delivery address is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simulate payment processing
  const processPayment = async () => {
    setPaymentStep("processing");
    // Simulate payment gateway delay (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { success: true, transactionId: `TXN${uuidv4().slice(0, 8).toUpperCase()}` };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Process payment (simulated)
      const paymentResult = await processPayment();

      if (paymentResult.success) {
        // Build order details
        const orderDetails = {
          id: `ORD${uuidv4().slice(0, 8).toUpperCase()}`,
          items: [...items],
          subtotal,
          tax,
          shipping,
          total,
          paymentMethod: PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.label || paymentMethod,
          transactionId: paymentResult.transactionId,
          customer: { ...formData },
          date: new Date().toISOString(),
          status: "Confirmed",
        };

        setPaymentStep("success");
        // Clear the cart
        dispatch({ type: "CLEAR_CART" });
        // Notify parent with order details
        setTimeout(() => {
          onOrderComplete(orderDetails);
        }, 800);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setErrors({ form: "Payment failed. Please try again." });
      setPaymentStep("form");
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Form-level error */}
        {errors.form && (
          <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl">{errors.form}</p>
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
            `Pay $${total.toFixed(2)}`
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default CheckoutForm;