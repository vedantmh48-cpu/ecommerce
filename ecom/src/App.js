/**
 * App.js — Main Application Entry Point
 * 
 * Manages top-level state and page navigation between:
 * 1. Product Catalog (Home) — Hero, Products, Sale, New Arrivals, Best Sellers, 
 *    Collections, Limited Edition, Gift Cards, About, Contact, Footer
 * 2. Checkout Form
 * 3. Order Success / Receipt
 * 
 * All Footer links are functional via `onNavigate` handler.
 * Policy modals (Privacy, Terms, Cookies, Sitemap) included.
 * Brand Strip appears above footer.
 */

import React, { useState, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";
import { CartProvider, useCart } from "./context/CartContext";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import CheckoutForm from "./components/CheckoutForm";
import OrderSuccess from "./components/OrderSuccess";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import CookiePolicy from "./components/CookiePolicy";
import Sitemap from "./components/Sitemap";
import GiftCardsSection from "./components/GiftCardsSection";
import SaleSection from "./components/SaleSection";
import NewArrivalsSection from "./components/NewArrivalsSection";
import BestSellersSection from "./components/BestSellersSection";
import CollectionsSection from "./components/CollectionsSection";
import LimitedEditionSection from "./components/LimitedEditionSection";
import CustomerServiceSection from "./components/CustomerServiceSection";
import ContactForm from "./components/ContactForm";
import ProductDetailModal from "./components/ProductDetailModal";
import LoadingScreen from "./components/LoadingScreen";
import products from "./data/products";

// View states
const VIEWS = { CATALOG: "catalog", CHECKOUT: "checkout", SUCCESS: "success" };

const AppContent = () => {
  const { items } = useCart();
  const [loading, setLoading] = useState(true);

  const [currentView, setCurrentView] = useState(VIEWS.CATALOG);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [cookiesOpen, setCookiesOpen] = useState(false);
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState("help");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productsRef = useRef(null);
  const saleRef = useRef(null);
  const newRef = useRef(null);
  const bestRef = useRef(null);
  const collectionsRef = useRef(null);
  const limitedRef = useRef(null);
  const giftRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const serviceRef = useRef(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== "All") result = result.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    return result;
  }, [activeCategory, searchQuery]);

  // Navigation handlers
  const handleCheckout = () => setCurrentView(VIEWS.CHECKOUT);
  const handleOrderComplete = (order) => { setOrderDetails(order); setCurrentView(VIEWS.SUCCESS); };
  const handleContinueShopping = () => { setOrderDetails(null); setCurrentView(VIEWS.CATALOG); };
  const handleBackToCatalog = () => setCurrentView(VIEWS.CATALOG);

  // Smart navigation from Footer or Header links
  const handleNavigate = (section) => {
    setCurrentView(VIEWS.CATALOG);
    // Small delay to ensure view is rendered
    setTimeout(() => {
      // Map of section names to refs
      const refMap = {
        products: productsRef, sale: saleRef, new: newRef, newarrivals: newRef,
        bestsellers: bestRef, collections: collectionsRef, limited: limitedRef,
        giftcards: giftRef, gift: giftRef, about: aboutRef, contact: contactRef,
        help: serviceRef, track: serviceRef, shipping: serviceRef, returns: serviceRef,
        faq: serviceRef, sizeguide: serviceRef,
        careers: null, press: null, sustainability: null,
      };
      const ref = refMap[section];
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (section === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // For sections without a ref, try scrolling to ID
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const scrollToProducts = () => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Product detail modal handlers
  const handleOpenProductDetail = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
  };

  // Listen for custom event from ProductDetailModal related products
  React.useEffect(() => {
    const handleCustomEvent = (e) => {
      setSelectedProduct(e.detail);
    };
    window.addEventListener("openProductDetail", handleCustomEvent);
    return () => window.removeEventListener("openProductDetail", handleCustomEvent);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  // Handle customer service navigation with tab switching
  const handleServiceNav = (section) => {
    setActiveServiceTab(section);
    setCurrentView(VIEWS.CATALOG);
    setTimeout(() => {
      if (serviceRef.current) {
        serviceRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  // Helper to open policy modals
  const openPrivacy = () => setPrivacyOpen(true);
  const openTerms = () => setTermsOpen(true);
  const openCookies = () => setCookiesOpen(true);
  const openSitemap = () => setSitemapOpen(true);

  return (
    <div className="min-h-screen bg-offwhite text-dark flex flex-col">
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {/* ============================================
          VIEW 1: CATALOG (HOME)
          ============================================ */}
      {currentView === VIEWS.CATALOG && (
        <>
          {/* Header (sticky, no spacer needed) */}
          <div id="home">
            <Header
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onCartToggle={() => setCartOpen(true)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onNavigate={handleNavigate}
            />
          </div>

          {/* Hero Section */}
          <HeroSection onScrollToProducts={scrollToProducts} />

          {/* Products Section */}
          <main ref={productsRef} id="products" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-dark font-display">
                {activeCategory === "All" ? "All Products" : activeCategory}
              </h2>
              <p className="text-gray-400 text-sm mt-1">{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found</p>
            </motion.div>

            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20">
                  <p className="text-gray-300 text-lg">No products found</p>
                  <p className="text-gray-300 text-sm mt-1">Try adjusting your search or filter</p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeCategory + searchQuery}
                  initial="initial" animate="animate" exit="exit"
                  variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1, transition: { staggerChildren: 0.05 } },
                    exit: { opacity: 0 },
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} onOpenDetail={handleOpenProductDetail} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* New Arrivals Section */}
          <div ref={newRef}>
            <NewArrivalsSection id="new" onOpenDetail={handleOpenProductDetail} />
          </div>

          {/* Best Sellers Section */}
          <div ref={bestRef}>
            <BestSellersSection id="bestsellers" onOpenDetail={handleOpenProductDetail} />
          </div>

          {/* Sale Section */}
          <div ref={saleRef}>
            <SaleSection id="sale" onOpenDetail={handleOpenProductDetail} />
          </div>

          {/* Collections Section */}
          <div ref={collectionsRef}>
            <CollectionsSection id="collections" onOpenDetail={handleOpenProductDetail} />
          </div>

          {/* Limited Edition Section */}
          <div ref={limitedRef}>
            <LimitedEditionSection id="limited" onOpenDetail={handleOpenProductDetail} />
          </div>

          {/* Customer Service Section */}
          <div ref={serviceRef}>
            <CustomerServiceSection
              id="customer-service"
              activeTab={activeServiceTab}
              onTabChange={setActiveServiceTab}
            />
          </div>

          {/* Gift Cards / Discount Tiers Section */}
          <div ref={giftRef}>
            <GiftCardsSection onScrollToProducts={scrollToProducts} />
          </div>

          {/* About Us Section */}
          <div ref={aboutRef}>
            <section id="about" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-soft border border-gray-100">
                  <div className="max-w-3xl mx-auto text-center">
                    <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl sm:text-3xl font-bold text-dark mb-4 font-display">
                      About TrendBasket
                    </motion.h2>
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="w-16 h-1 bg-gradient-to-r from-teal to-coral rounded-full mx-auto mb-6" />
                    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
                      At TrendBasket, we believe that the objects we surround ourselves with should bring joy, function, and beauty into our daily lives. Founded in 2026, we set out to create a curated shopping experience that connects you with thoughtfully designed products from independent makers and sustainable brands around the world.
                    </motion.p>
                    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
                      Every item in our collection is carefully selected for its quality, craftsmanship, and timeless appeal. We prioritize eco-friendly materials, ethical production, and minimalist design that fits seamlessly into your life — not just for a season, but for years to come.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10">
                      {[
                        { value: "500+", label: "Products Curated" },
                        { value: "50+", label: "Partner Makers" },
                        { value: "10K+", label: "Happy Customers" },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <p className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</p>
                          <p className="text-gray-400 text-xs sm:text-sm mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
            </section>
          </div>

          {/* Contact Section with Contact Form */}
          <div ref={contactRef}>
            <section id="contact" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-gradient-to-br from-teal via-teal-dark to-dark rounded-3xl p-8 sm:p-12 text-center text-white">
                  <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl sm:text-3xl font-bold mb-3 font-display">
                    Get in Touch
                  </motion.h2>
                  <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/70 text-sm sm:text-base max-w-lg mx-auto mb-6">
                    Have a question, feedback, or want to collaborate? Send us a message and we'll respond via WhatsApp.
                  </motion.p>
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <ContactForm />
                </motion.div>
              </div>
            </section>
          </div>

          {/* Footer with BrandStrip */}
          <Footer
            onOpenPrivacy={openPrivacy}
            onOpenTerms={openTerms}
            onOpenCookies={openCookies}
            onOpenSitemap={openSitemap}
            onNavigate={handleNavigate}
            onServiceNav={handleServiceNav}
          />

          {/* Privacy Policy Modal */}
          <PrivacyPolicy isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />

          {/* Terms of Service Modal */}
          <TermsOfService isOpen={termsOpen} onClose={() => setTermsOpen(false)} />

          {/* Cookie Policy Modal */}
          <CookiePolicy isOpen={cookiesOpen} onClose={() => setCookiesOpen(false)} />

          {/* Sitemap Modal */}
          <Sitemap isOpen={sitemapOpen} onClose={() => setSitemapOpen(false)} />

          {/* Cart Drawer */}
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />

          {/* Mobile bottom bar */}
          {items.length > 0 && (
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-t border-brown/10 px-4 py-3 sm:hidden">
              <button onClick={() => setCartOpen(true)} className="w-full py-3 bg-gradient-to-r from-teal to-teal-light text-white font-semibold rounded-xl shadow-vibrant hover:shadow-vibrant-lg transition-all touch-target flex items-center justify-center gap-2">
                <FiShoppingBag size={18} />
                View Cart ({items.reduce((sum, i) => sum + i.quantity, 0)} items)
              </button>
            </motion.div>
          )}
        </>
      )}

      {/* ============================================
          VIEW 2: CHECKOUT
          ============================================ */}
      {currentView === VIEWS.CHECKOUT && (
        <motion.div key="checkout" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex-1">
          <CheckoutForm onOrderComplete={handleOrderComplete} onBack={handleBackToCatalog} />
        </motion.div>
      )}

      {/* ============================================
          VIEW 3: SUCCESS
          ============================================ */}
      {currentView === VIEWS.SUCCESS && (
        <motion.div key="success" variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <OrderSuccess order={orderDetails} onContinueShopping={handleContinueShopping} />
        </motion.div>
      )}
      {/* ============================================
          GLOBAL: Product Detail Modal
          ============================================ */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseProductDetail}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;