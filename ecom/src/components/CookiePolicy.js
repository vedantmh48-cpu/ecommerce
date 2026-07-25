/**
 * CookiePolicy Component
 * 
 * A modal/drawer overlay that displays the Cookie Policy.
 * Follows same pattern as PrivacyPolicy modal.
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

const CookiePolicy = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cp-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-dark/50 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            key="cp-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-4 sm:inset-10 md:inset-20 z-[60] overflow-hidden rounded-2xl bg-offwhite shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-brown/10 bg-white">
              <div className="flex items-center gap-2">
                <FiShield size={20} className="text-teal" />
                <h2 className="text-lg font-bold text-dark">Cookie Policy</h2>
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
                <h3 className="font-semibold text-dark text-base mb-2">1. What Are Cookies</h3>
                <p>
                  Cookies are small text files stored on your device when you visit a website. They help 
                  websites remember your preferences, login status, and browsing activity. Cookies enable 
                  us to provide you with a personalized and seamless shopping experience on TrendBasket.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">2. How We Use Cookies</h3>
                <p>We use cookies for the following purposes:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly, including shopping cart functionality and secure checkout.</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings, language, and region preferences for a better experience.</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site, what pages are popular, and how we can improve.</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">3. Third-Party Cookies</h3>
                <p>
                  We may use third-party services such as Google Analytics, Facebook Pixel, and payment 
                  processors that set their own cookies. These third parties have their own privacy policies 
                  governing the use of your data. We recommend reviewing their policies for more information.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">4. Managing Cookies</h3>
                <p>
                  You can control and manage cookies in your browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>View cookies stored on your device and delete them individually</li>
                  <li>Block third-party cookies</li>
                  <li>Block all cookies</li>
                  <li>Set preferences for when cookies are stored</li>
                </ul>
                <p className="mt-2">
                  Please note that disabling certain cookies may affect the functionality of our website, 
                  including the ability to add items to your cart or complete checkout.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">5. Types of Cookies We Use</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs mt-2 border-collapse">
                    <thead>
                      <tr className="bg-brown/5">
                        <th className="p-2 font-semibold text-dark">Cookie Type</th>
                        <th className="p-2 font-semibold text-dark">Purpose</th>
                        <th className="p-2 font-semibold text-dark">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brown/10">
                      <tr>
                        <td className="p-2">Session</td>
                        <td className="p-2">Maintain cart and login state</td>
                        <td className="p-2">Session</td>
                      </tr>
                      <tr>
                        <td className="p-2">Authentication</td>
                        <td className="p-2">Remember login status</td>
                        <td className="p-2">30 days</td>
                      </tr>
                      <tr>
                        <td className="p-2">Analytics</td>
                        <td className="p-2">Track page views and behavior</td>
                        <td className="p-2">1 year</td>
                      </tr>
                      <tr>
                        <td className="p-2">Marketing</td>
                        <td className="p-2">Ad personalization</td>
                        <td className="p-2">90 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">6. Updates to This Policy</h3>
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in technology, 
                  legislation, or our data practices. We encourage you to review this page periodically 
                  for the latest information on our cookie practices.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-dark text-base mb-2">7. Contact Us</h3>
                <p>
                  If you have questions about our use of cookies, please contact us:
                </p>
                <div className="mt-2 space-y-1 text-sm">
                  <p>Email: <strong className="text-teal">privacy@TrendBasket.com</strong></p>
                  <p>Phone: <strong className="text-teal">+1 (555) 123-4567</strong></p>
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

export default CookiePolicy;