/**
 * PrivacyPolicy Component
 * 
 * A modal/drawer overlay that displays the Privacy Policy.
 * Covers: data collection, usage, sharing, cookies, and user rights.
 * Can be closed via backdrop click or close button.
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiShield } from "react-icons/fi";

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

const PrivacyPolicy = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="pp-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="pp-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-4 sm:inset-10 md:inset-20 z-[60] overflow-hidden rounded-2xl bg-offwhite shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brown/10 bg-white">
              <div className="flex items-center gap-2">
                <FiShield size={20} className="text-teal" />
                <h2 className="text-lg font-bold text-dark">Privacy Policy</h2>
              </div>
              <button
                onClick={onClose}
                className="touch-target w-10 h-10 flex items-center justify-center rounded-full hover:bg-brown/10 transition-colors"
                aria-label="Close"
              >
                <FiX size={20} className="text-brown" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm text-brown/80 leading-relaxed">
              <section>
                <h3 className="font-semibold text-dark text-base mb-2">1. Information We Collect</h3>
                <p>
                  When you use TrendBasket, we collect information you provide directly, such as your name, 
                  email address, phone number, shipping address, and payment information. We also 
                  automatically collect certain data when you visit our site, including your IP address, 
                  browser type, device information, and browsing behavior using cookies and similar technologies.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">2. How We Use Your Information</h3>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Process and fulfill your orders, including sending order confirmations and receipts</li>
                  <li>Communicate with you about your orders, returns, and customer service inquiries</li>
                  <li>Send you marketing communications (with your consent) about new products and promotions</li>
                  <li>Improve our website, products, and services based on your browsing and purchasing patterns</li>
                  <li>Detect and prevent fraudulent transactions and ensure the security of our platform</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">3. Information Sharing</h3>
                <p>
                  We do not sell your personal information to third parties. We may share your data with 
                  trusted service providers who assist us in operating our website, processing payments, 
                  delivering orders (shipping carriers), and sending communications. These providers are 
                  contractually obligated to protect your data and use it only for the services they provide.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">4. Cookies & Tracking</h3>
                <p>
                  TrendBasket uses cookies and similar tracking technologies to enhance your browsing experience, 
                  analyze site traffic, and understand where our visitors come from. You can control cookie 
                  preferences through your browser settings. Disabling certain cookies may affect site functionality.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">5. Data Security</h3>
                <p>
                  We implement industry-standard security measures, including SSL/TLS encryption for all 
                  data transmissions, secure payment processing through PCI-compliant gateways, and 
                  regular security audits. However, no method of transmission over the Internet is 100% 
                  secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">6. Your Rights</h3>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction or deletion of your data</li>
                  <li>Opt out of marketing communications at any time</li>
                  <li>Request a copy of your data in a portable format</li>
                  <li>Withdraw consent where processing is based on consent</li>
                </ul>
                <p className="mt-2">
                  To exercise any of these rights, please contact us at <strong>privacy@TrendBasket.com</strong>.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">7. Third-Party Links</h3>
                <p>
                  Our website may contain links to third-party sites (e.g., social media platforms, payment 
                  processors). We are not responsible for the privacy practices of these external sites. 
                  We encourage you to review their privacy policies before providing any personal information.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">8. Updates to This Policy</h3>
                <p>
                  We may update this Privacy Policy from time to time. Changes will be posted on this page 
                  with an updated effective date. We encourage you to review this policy periodically. 
                  Continued use of TrendBasket after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">9. Contact Us</h3>
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy, please 
                  reach out to us:
                </p>
                <div className="mt-2 space-y-1 text-sm">
                  <p>Email: <strong className="text-teal">privacy@TrendBasket.com</strong></p>
                  <p>Phone: <strong className="text-teal">+1 (555) 123-4567</strong></p>
                  <p>Address: 123 Design District, San Francisco, CA 94102</p>
                </div>
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

export default PrivacyPolicy;