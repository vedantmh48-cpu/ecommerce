/**
 * OrderSuccess Component
 * 
 * Displays a full receipt/modal after successful order placement.
 * Features:
 * - Animated success checkmark
 * - Order summary with items, totals, payment status
 * - Customer delivery details
 * - "Print Receipt" button (uses @media print styles)
 * - "Send to WhatsApp" button (generates PDF + opens WhatsApp)
 * 
 * The receipt container has id="receipt-container" for PDF generation.
 */

import React from "react";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiPrinter,
  FiSend,
  FiShoppingBag,
  FiMapPin,
  FiPhone,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { generateAndSharePDF, printReceipt } from "../utils/pdfGenerator";

const OrderSuccess = ({ order, onContinueShopping }) => {
  if (!order) return null;

  // Format date for display
  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-offwhite py-6 sm:py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark mb-1">
            Order Confirmed! 🎉
          </h1>
          <p className="text-brown/60 text-sm">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
        </motion.div>

        {/* Receipt Container — used for PDF generation and printing */}
        <div
          id="receipt-container"
          className="receipt-print-area bg-white rounded-2xl shadow-sm border border-brown/5 overflow-hidden"
        >
          {/* Receipt Header */}
          <div className="bg-teal px-6 py-5 text-offwhite">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-offwhite/20 flex items-center justify-center">
                  <FiShoppingBag size={18} />
                </div>
                <span className="font-bold text-lg">TrendBasket</span>
              </div>
              <span className="text-xs bg-offwhite/20 px-3 py-1 rounded-full">
                {order.status}
              </span>
            </div>
            <p className="text-offwhite/70 text-xs">Receipt</p>
          </div>

          {/* Order Info */}
          <div className="px-6 py-4 border-b border-brown/5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-brown/40 text-xs">Order ID</p>
                <p className="font-medium text-dark">{order.id}</p>
              </div>
              <div>
                <p className="text-brown/40 text-xs">Transaction ID</p>
                <p className="font-medium text-dark">{order.transactionId}</p>
              </div>
              <div>
                <p className="text-brown/40 text-xs">Date</p>
                <p className="font-medium text-dark">{formattedDate}</p>
              </div>
              <div>
                <p className="text-brown/40 text-xs">Payment</p>
                <p className="font-medium text-green-600 flex items-center gap-1">
                  <FiCheckCircle size={12} />
                  {order.paymentMethod}
                </p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="px-6 py-4 border-b border-brown/5">
            <h3 className="font-semibold text-dark text-sm mb-3">Items Ordered</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-dark">{item.name}</p>
                      <p className="text-brown/40 text-xs">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium text-dark">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="px-6 py-4 border-b border-brown/5">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-brown/60">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brown/60">
                <span>Tax (8%)</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brown/60">
                <span>Shipping</span>
                <span>
                  {order.shipping === 0 ? (
                    <span className="text-green-600 font-medium">FREE</span>
                  ) : (
                    `$${order.shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-dark font-bold text-base pt-2 border-t border-brown/10">
                <span>Total</span>
                <span className="text-teal">$${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="px-6 py-4">
            <h3 className="font-semibold text-dark text-sm mb-3">
              Delivery Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-brown/70">
                <FiUser size={14} className="text-teal" />
                <span>{order.customer.name}</span>
              </div>
              <div className="flex items-center gap-2 text-brown/70">
                <FiPhone size={14} className="text-teal" />
                <span>{order.customer.mobile}</span>
              </div>
              <div className="flex items-center gap-2 text-brown/70">
                <FiMail size={14} className="text-teal" />
                <span>{order.customer.email}</span>
              </div>
              <div className="flex items-start gap-2 text-brown/70">
                <FiMapPin size={14} className="text-teal mt-0.5" />
                <span>{order.customer.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (hidden in print) */}
        <div className="no-print mt-6 space-y-3">
          {/* Print Receipt */}
          <motion.button
            onClick={printReceipt}
            className="w-full py-3.5 bg-teal text-offwhite font-semibold rounded-xl shadow-md hover:bg-teal/90 transition-colors touch-target flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiPrinter size={18} />
            Print Receipt
          </motion.button>

          {/* Send to WhatsApp */}
          <motion.button
            onClick={() => generateAndSharePDF(order, order.customer.mobile)}
            className="w-full py-3.5 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-colors touch-target flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiSend size={18} />
            Send PDF to WhatsApp
          </motion.button>

          {/* Continue Shopping */}
          <motion.button
            onClick={onContinueShopping}
            className="w-full py-3.5 bg-offwhite text-brown font-semibold rounded-xl border border-brown/20 hover:bg-brown/5 transition-colors touch-target flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiShoppingBag size={18} />
            Continue Shopping
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;