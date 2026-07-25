/**
 * CustomerServiceSection Component — Vibrant Redesign
 * 
 * Displays all customer service content sections (Help Center, Track Order,
 * Shipping & Delivery, Returns & Exchanges, FAQs, Size Guide).
 * Each section is shown/hidden based on the active tab.
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHelpCircle, FiPackage, FiTruck, FiRefreshCw, FiMessageCircle, FiGrid } from "react-icons/fi";

const serviceTabs = [
  { id: "help", label: "Help Center", icon: FiHelpCircle },
  { id: "track", label: "Track Order", icon: FiPackage },
  { id: "shipping", label: "Shipping & Delivery", icon: FiTruck },
  { id: "returns", label: "Returns & Exchanges", icon: FiRefreshCw },
  { id: "faq", label: "FAQs", icon: FiMessageCircle },
  { id: "sizeguide", label: "Size Guide", icon: FiGrid },
];

const serviceContent = {
  help: {
    title: "Help Center",
    content: (
      <div className="space-y-4">
        <p className="text-gray-500">
          Welcome to the TrendBasket Help Center. We're here to assist you with any questions or concerns.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { q: "How do I place an order?", a: "Browse our products, add items to your cart, and proceed to checkout. Enter your shipping details and payment information to complete your purchase." },
            { q: "Can I change my order?", a: "Orders can be modified within 1 hour of placement. Contact us via WhatsApp at +91 9028076580 for immediate assistance." },
            { q: "What payment methods do you accept?", a: "We accept all major credit cards, debit cards, UPI, and net banking. All payments are processed securely." },
            { q: "How do I contact support?", a: "You can reach us via WhatsApp at +91 9028076580, email at hello@TrendBasket.com, or through our contact form." },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-teal/20 transition-colors">
              <h4 className="font-semibold text-dark text-sm mb-1">{item.q}</h4>
              <p className="text-gray-400 text-xs">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  track: {
    title: "Track Order",
    content: (
      <div className="space-y-4">
        <p className="text-gray-500">
          Enter your order number and email address to track your package in real-time.
        </p>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 max-w-md">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-dark mb-1">Order Number</label>
              <input type="text" placeholder="e.g. SHOP-2026-001" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm text-dark placeholder-gray-300 focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-medium text-dark mb-1">Email Address</label>
              <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm text-dark placeholder-gray-300 focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20 transition-all" />
            </div>
            <button className="w-full py-2.5 bg-gradient-to-r from-teal to-teal-light text-white font-medium rounded-xl text-sm shadow-vibrant hover:shadow-vibrant-lg transition-all">
              Track Order
            </button>
          </div>
        </div>
        <p className="text-gray-300 text-xs">
          Orders are typically delivered within 5-7 business days. You will receive tracking information via email once your order ships.
        </p>
      </div>
    ),
  },
  shipping: {
    title: "Shipping & Delivery",
    content: (
      <div className="space-y-4">
        <p className="text-gray-500">
          We offer fast and reliable shipping options to ensure your order arrives safely and on time.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 font-semibold text-dark">Shipping Method</th>
                <th className="p-3 font-semibold text-dark">Estimated Time</th>
                <th className="p-3 font-semibold text-dark">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3 text-gray-500">Standard Shipping</td>
                <td className="p-3 text-gray-500">5-7 Business Days</td>
                <td className="p-3 text-gray-500">$9.99 (Free over $100)</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-500">Express Shipping</td>
                <td className="p-3 text-gray-500">2-3 Business Days</td>
                <td className="p-3 text-gray-500">$19.99</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-500">Next Day Delivery</td>
                <td className="p-3 text-gray-500">1 Business Day</td>
                <td className="p-3 text-gray-500">$29.99</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-500">International Shipping</td>
                <td className="p-3 text-gray-500">10-15 Business Days</td>
                <td className="p-3 text-gray-500">Calculated at checkout</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-teal/5 rounded-xl p-4 border border-teal/10">
          <p className="text-teal text-sm font-medium">Free Shipping on all orders over $100! Use code FREESHIP at checkout.</p>
        </div>
      </div>
    ),
  },
  returns: {
    title: "Returns & Exchanges",
    content: (
      <div className="space-y-4">
        <p className="text-gray-500">
          We want you to love your purchase. If something isn't right, we're here to help with our hassle-free return policy.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: "30-Day Returns", desc: "Items can be returned within 30 days of delivery for a full refund." },
            { title: "Free Exchanges", desc: "Need a different size or color? We'll exchange it for free." },
            { title: "Condition", desc: "Items must be unused, in original packaging, and in resellable condition." },
            { title: "Refund Timeline", desc: "Refunds are processed within 5-10 business days after we receive your return." },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h4 className="font-semibold text-dark text-sm mb-1">{item.title}</h4>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-coral/5 rounded-xl p-4 border border-coral/10">
          <p className="text-coral text-sm">
            <strong>Note:</strong> Digital products, gift cards, and final sale items are non-refundable. 
            To initiate a return, please contact us at hello@TrendBasket.com with your order number.
          </p>
        </div>
      </div>
    ),
  },
  faq: {
    title: "Frequently Asked Questions",
    content: (
      <div className="space-y-3">
        {[
          { q: "Is my payment information secure?", a: "Absolutely. We use industry-standard SSL encryption and PCI-compliant payment gateways. Your payment details are never stored on our servers." },
          { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide. International shipping costs are calculated at checkout based on your location and order weight." },
          { q: "Can I cancel my order?", a: "Orders can be cancelled within 1 hour of placement. After that, the order enters processing and cannot be cancelled, but can be returned once received." },
          { q: "How do I use a discount code?", a: "Enter your discount code at checkout in the 'Promo Code' field. The discount will be applied to your order total before payment." },
          { q: "What if my item arrives damaged?", a: "We're sorry to hear that! Please contact us within 48 hours of delivery with photos of the damage, and we'll arrange a replacement or refund immediately." },
          { q: "Do you offer gift wrapping?", a: "Yes! We offer premium gift wrapping for $4.99 per item. You can select this option during checkout." },
        ].map((item, i) => (
          <details key={i} className="bg-gray-50 rounded-xl border border-gray-100 group">
            <summary className="px-4 py-3 cursor-pointer font-medium text-dark text-sm flex items-center justify-between hover:bg-gray-100 rounded-xl transition-colors">
              {item.q}
              <span className="text-gray-300 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-4 pb-3 text-gray-500 text-sm">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    ),
  },
  sizeguide: {
    title: "Size Guide",
    content: (
      <div className="space-y-4">
        <p className="text-gray-500">
          Find your perfect fit with our comprehensive size guide. Measurements are in inches.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 font-semibold text-dark">Size</th>
                <th className="p-3 font-semibold text-dark">Chest</th>
                <th className="p-3 font-semibold text-dark">Waist</th>
                <th className="p-3 font-semibold text-dark">Hips</th>
                <th className="p-3 font-semibold text-dark">Inseam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="p-3 font-medium text-dark">XS</td><td className="p-3 text-gray-500">32-34</td><td className="p-3 text-gray-500">26-28</td><td className="p-3 text-gray-500">34-36</td><td className="p-3 text-gray-500">30</td></tr>
              <tr><td className="p-3 font-medium text-dark">S</td><td className="p-3 text-gray-500">35-37</td><td className="p-3 text-gray-500">29-31</td><td className="p-3 text-gray-500">37-39</td><td className="p-3 text-gray-500">31</td></tr>
              <tr><td className="p-3 font-medium text-dark">M</td><td className="p-3 text-gray-500">38-40</td><td className="p-3 text-gray-500">32-34</td><td className="p-3 text-gray-500">40-42</td><td className="p-3 text-gray-500">32</td></tr>
              <tr><td className="p-3 font-medium text-dark">L</td><td className="p-3 text-gray-500">41-43</td><td className="p-3 text-gray-500">35-37</td><td className="p-3 text-gray-500">43-45</td><td className="p-3 text-gray-500">33</td></tr>
              <tr><td className="p-3 font-medium text-dark">XL</td><td className="p-3 text-gray-500">44-46</td><td className="p-3 text-gray-500">38-40</td><td className="p-3 text-gray-500">46-48</td><td className="p-3 text-gray-500">34</td></tr>
              <tr><td className="p-3 font-medium text-dark">XXL</td><td className="p-3 text-gray-500">47-49</td><td className="p-3 text-gray-500">41-43</td><td className="p-3 text-gray-500">49-51</td><td className="p-3 text-gray-500">35</td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p className="text-gray-500 text-sm">
            <strong className="text-dark">Tip:</strong> For the best fit, measure yourself wearing the undergarments you plan to wear with the item. 
            If you're between sizes, we recommend sizing up for a more comfortable fit.
          </p>
        </div>
      </div>
    ),
  },
};

const CustomerServiceSection = ({ id, activeTab, onTabChange }) => {
  const currentTab = activeTab || "help";
  const currentContent = serviceContent[currentTab];

  return (
    <section id={id || "customer-service"} className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center sm:text-left mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-dark font-display"
        >
          {currentContent?.title || "Customer Service"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-sm mt-1"
        >
          We're here to help with everything you need
        </motion.p>
      </div>

      {/* Service tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {serviceTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onTabChange && onTabChange(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                currentTab === tab.id
                  ? "bg-gradient-to-r from-teal to-teal-light text-white shadow-vibrant"
                  : "bg-white text-gray-500 hover:bg-gray-50 hover:text-dark border border-gray-100"
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-soft"
        >
          {currentContent?.content}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default CustomerServiceSection;