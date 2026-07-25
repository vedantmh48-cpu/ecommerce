/**
 * ContactForm Component — Vibrant Redesign
 * 
 * A contact form that sends queries directly to WhatsApp number 9028076580.
 * Fields: Name, Email, Subject, Message
 * On submit, opens WhatsApp with the formatted message.
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiMessageSquare, FiSend, FiCheckCircle, FiZap } from "react-icons/fi";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Format message for WhatsApp
    const whatsappMessage = encodeURIComponent(
      `*New Query from TrendBasket Website*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Subject:* ${subject || "N/A"}\n` +
      `*Message:*\n${message}`
    );

    // Open WhatsApp with the message to 9028076580
    window.open(`https://wa.me/919028076580?text=${whatsappMessage}`, "_blank");

    setSent(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto text-left">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative group">
          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-coral transition-colors" size={16} />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-coral/50 focus:ring-2 focus:ring-coral/20 transition-all group-hover:border-white/30"
          />
        </div>
        <div className="relative group">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-coral transition-colors" size={16} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-coral/50 focus:ring-2 focus:ring-coral/20 transition-all group-hover:border-white/30"
          />
        </div>
      </div>
      <div className="relative group">
        <FiMessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-coral transition-colors" size={16} />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject (optional)"
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-coral/50 focus:ring-2 focus:ring-coral/20 transition-all group-hover:border-white/30"
        />
      </div>
      <div className="relative group">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          rows={4}
          className="w-full pl-4 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-coral/50 focus:ring-2 focus:ring-coral/20 transition-all resize-none group-hover:border-white/30"
        />
      </div>
      <motion.button
        type="submit"
        className="w-full py-3.5 bg-gradient-to-r from-coral to-coral-light text-white font-semibold rounded-xl shadow-coral hover:shadow-coral-lg transition-all flex items-center justify-center gap-2 touch-target"
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        {sent ? (
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2"
          >
            <FiCheckCircle size={18} />
            Message Sent via WhatsApp!
          </motion.span>
        ) : (
          <span className="flex items-center gap-2">
            <FiSend size={18} />
            Send Message
            <FiZap size={14} />
          </span>
        )}
      </motion.button>
    </form>
  );
};

export default ContactForm;