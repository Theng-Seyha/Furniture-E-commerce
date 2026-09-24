import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueProps } from './components/ValueProps';
import { CategoryBrowser } from './components/CategoryBrowser';
import { SignatureCollection } from './components/SignatureCollection';
import { WhyChooseAnti } from './components/WhyChooseAnti';
import { StudioSpecimenCard } from './components/StudioSpecimenCard';
import { SocialProofBanner } from './components/SocialProofBanner';
import { SummerDealBanner } from './components/SummerDealBanner';
import { WhyShopPillars } from './components/WhyShopPillars';
import { FeaturedProducts } from './components/FeaturedProducts';
import { CustomerReviews } from './components/CustomerReviews';
import { BlogSection } from './components/BlogSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TelegramContactModal } from './components/TelegramContactModal';
import { ToastNotification } from './components/ToastNotification';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ContactSection } from './components/ContactSection';
import { VanillaCodeModal } from './components/VanillaCodeModal';
import { OrderStatusTracking } from './components/OrderStatusTracking';
import { MyOrdersModal } from './components/MyOrdersModal';
import { Send, ArrowLeft } from 'lucide-react';
import { OfflineIndicator, SmartInstallBanner } from './components/PWAControls';

/**
 * Main Layout Shell
 */
const MainLayout = () => {
  const {
    currentView,
    currentProduct,
    setSelectedCategory,
    setIsTelegramModalOpen,
    navigateTo,
  } = useCart();

  const [isVanillaModalOpen, setIsVanillaModalOpen] = useState(false);

  const handleNavigate = (sectionId) => {
    if (sectionId === 'featured-products' || sectionId === 'shop') {
      navigateTo('shop');
      return;
    }
    if (sectionId === 'contact') {
      navigateTo('contact');
      return;
    }
    if (sectionId === 'order-tracking' || sectionId === 'tracking') {
      navigateTo('tracking');
      return;
    }
    
    // Centralize all home section navigation through navigateTo
    // this ensures hash updates and robust scroll-into-view behavior
    navigateTo('home', sectionId);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    navigateTo('shop');
    setTimeout(() => {
      const el = document.getElementById('featured-products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 dark:bg-[#121110] dark:text-[#F5F2EB] flex flex-col font-sans transition-colors duration-300">
      {/* 1. Global Status Indicators */}
      <OfflineIndicator />
      <SmartInstallBanner />
      
      {/* Top Navigation Bar */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main View Router with Kinetic Transitions */}
      <main className="grow overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'product-detail' && currentProduct ? (
            <motion.div
              key="product-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ProductDetailPage product={currentProduct} />
            </motion.div>
          ) : currentView === 'contact' ? (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-stone-100/70 dark:bg-stone-900/60 py-8 border-b border-stone-200/80 dark:border-stone-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                      Contact Our Studio & Workshop
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                      Connect directly with Theng Seyha and our team of master artisans
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo('home')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold shadow-xs hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Home</span>
                  </button>
                </div>
              </div>
              <ContactSection />
            </motion.div>
          ) : currentView === 'tracking' ? (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-stone-100/70 dark:bg-stone-900/60 py-8 border-b border-stone-200/80 dark:border-stone-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                      Order Progress & Workshop Logs
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                      Track your handcrafted furniture through the production pipeline
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo('home')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold shadow-xs hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Home</span>
                  </button>
                </div>
              </div>
              <div className="min-h-[60vh]">
                <OrderStatusTracking />
              </div>
            </motion.div>
          ) : currentView === 'shop' ? (
            <motion.div
              key="shop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-stone-100/70 dark:bg-stone-900/60 py-8 border-b border-stone-200/80 dark:border-stone-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                      Complete Furniture Catalog
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                      Explore all handcrafted seating, tables, storage, and bedroom furniture
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo('home')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold shadow-xs hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Home</span>
                  </button>
                </div>
              </div>
              <FeaturedProducts />
              <SummerDealBanner onGrabDeal={() => handleNavigate('featured-products')} />
              <div className="py-12">
                <WhyShopPillars />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Hero
                onShopNow={() => navigateTo('shop')}
                onViewCollections={() => handleNavigate('signature-collection')}
              />

              {/* Consolidated Value Props */}
              <ValueProps />

              <CategoryBrowser onSelectCategory={handleCategoryClick} />

              <SignatureCollection onViewAll={() => navigateTo('shop')} />

              {/* Merged Craftsmanship & Standards */}
              <WhyChooseAnti />
              <StudioSpecimenCard />

              <SocialProofBanner onReadStories={() => handleNavigate('customer-reviews')} />

              <SummerDealBanner onGrabDeal={() => navigateTo('shop')} />

              {/* Reduced redundant sections on home */}
              <div className="bg-stone-100/30 dark:bg-stone-900/20 py-16">
                <WhyShopPillars />
              </div>

              <div id="customer-reviews">
                <CustomerReviews />
              </div>

              <BlogSection />

              <Newsletter />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onOpenVanillaModal={() => setIsVanillaModalOpen(true)} />

      {/* Overlays & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <CheckoutModal />
      <MyOrdersModal />
      <ProductDetailModal />
      <TelegramContactModal />
      <VanillaCodeModal
        isOpen={isVanillaModalOpen}
        onClose={() => setIsVanillaModalOpen(false)}
      />
      <ToastNotification />

      {/* Floating Telegram Support Quick Action */}
      <button
        onClick={() => setIsTelegramModalOpen(true)}
        aria-label="Telegram Bot Support"
        title="Chat with Anti Support Bot on Telegram"
        className="fixed bottom-6 right-6 z-30 p-3.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
        id="floating-telegram-btn"
      >
        <Send className="w-5 h-5" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide pr-1">
          Chat on Telegram
        </span>
      </button>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
}
