/**
 * TermsOfService Component
 * 
 * A modal/drawer overlay that displays the Terms of Service.
 * Follows same pattern as PrivacyPolicy modal.
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiFileText } from "react-icons/fi";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const TermsOfService = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="tos-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            key="tos-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-4 sm:inset-10 md:inset-20 z-[60] overflow-hidden rounded-2xl bg-offwhite shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-brown/10 bg-white">
              <div className="flex items-center gap-2">
                <FiFileText size={20} className="text-teal" />
                <h2 className="text-lg font-bold text-dark">Terms of Service</h2>
              </div>
              <button
                onClick={onClose}
                className="touch-target w-10 h-10 flex items-center justify-center rounded-full hover:bg-brown/10 transition-colors"
                aria-label="Close"
              >
                <FiX size={20} className="text-brown" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm text-brown/80 leading-relaxed">
              <section>
                <h3 className="font-semibold text-dark text-base mb-2">1. Acceptance of Terms</h3>
                <p>
                  By accessing or using TrendBasket ("the Service"), you agree to be bound by these Terms of Service. 
                  If you do not agree to all the terms, you may not access or use the Service. These terms apply 
                  to all visitors, users, and customers who access or use the Service.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">2. Account Registration</h3>
                <p>
                  When you create an account with us, you must provide accurate, complete, and current information. 
                  You are responsible for safeguarding the password and for all activities under your account. 
                  We reserve the right to terminate accounts at our sole discretion.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">3. Products & Pricing</h3>
                <p>
                  All product descriptions, images, and pricing are subject to change without notice. We reserve 
                  the right to modify or discontinue any product without prior notice. We make every effort to 
                  display accurate colors and details, but we cannot guarantee that your monitor's display is accurate.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">4. Orders & Payment</h3>
                <p>
                  By placing an order, you agree to provide current, complete, and accurate purchase information. 
                  We reserve the right to refuse or cancel any order for reasons including product availability, 
                  pricing errors, or suspected fraud. Payment is due at the time of purchase.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">5. Shipping & Delivery</h3>
                <p>
                  Shipping times are estimates and not guaranteed. We are not responsible for delays caused by 
                  carriers, customs, or unforeseen circumstances. Risk of loss passes to you upon delivery. 
                  For digital products, delivery is immediate upon payment confirmation.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">6. Returns & Refunds</h3>
                <p>
                  Our return policy allows returns within 30 days of delivery for most physical products. 
                  Items must be unused, in original packaging, and in resellable condition. Refunds are processed 
                  within 5-10 business days after we receive the returned item. Digital products are non-refundable 
                  once accessed.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">7. Intellectual Property</h3>
                <p>
                  The Service and its original content, features, and functionality are owned by TrendBasket and are 
                  protected by international copyright, trademark, and other intellectual property laws. You may 
                  not reproduce, distribute, modify, or create derivative works without our express written consent.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">8. Limitation of Liability</h3>
                <p>
                  TrendBasket shall not be liable for any indirect, incidental, special, consequential, or punitive 
                  damages arising from your use of the Service. Our total liability shall not exceed the amount 
                  paid by you for the products purchased. Some jurisdictions do not allow certain limitations, 
                  so these may not apply to you.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">9. Governing Law</h3>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the State of 
                  California, without regard to its conflict of law provisions. Any disputes arising from these 
                  terms shall be resolved in the courts of San Francisco County, California.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">10. Changes to Terms</h3>
                <p>
                  We reserve the right to update or modify these Terms at any time. Changes are effective 
                  immediately upon posting. Continued use of the Service after changes constitutes acceptance 
                  of the new terms. We encourage you to review these Terms periodically.
                </p>
              </section>

              <p className="text-brown/40 text-xs pt-4 border-t border-brown/10">
                Last updated: July 2026
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TermsOfService;