import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Sun,
  Moon,
  Menu,
  X,
  Send,
  Search,
  Heart,
  Sparkles,
  Home,
  Grid,
  PackageCheck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { TELEGRAM_CONFIG } from '../services/telegramService';
import { PWAInstallButton, MobilePWAInstallItem } from './PWAControls';

/**
 * Main Application Header & Ergonomic Navigation
 * - Floating glassmorphic island with subtle border and blur
 * - Micro announcement ticker with workshop status & free delivery progress
 * - Dedicated mobile bottom thumb dock for instant one-handed catalog, search, wishlist & cart access
 */
export const Navbar = ({ onNavigate }) => {
  const {
    currentView,
    totalItemsCount,
    setIsCartOpen,
    wishlistCount,
    setIsWishlistOpen,
    savedOrdersCount,
    setIsOrdersModalOpen,
    setIsSearchOpen,
    isDarkMode,
    toggleDarkMode,
    setIsTelegramModalOpen,
    showToast,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTicker, setShowTicker] = useState(true);
  const [activeNavId, setActiveNavId] = useState('signature-collection');

  // Track window scroll for elevation styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronize active nav item with route changes
  useEffect(() => {
    if (currentView === 'shop') {
      setActiveNavId('featured-products');
    } else if (currentView === 'contact') {
      setActiveNavId('contact');
    } else if (currentView === 'home' && !activeNavId) {
      setActiveNavId('signature-collection');
    }
  }, [currentView, activeNavId]);

  // Track active section on home page as user scrolls
  useEffect(() => {
    if (currentView !== 'home') return;

    const sectionIds = [
      'signature-collection',
      'why-anti',
      'order-tracking',
      'customer-reviews',
      'blog',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNavId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentView]);

  const navLinks = [
    { id: 'featured-products', label: 'Shop All', view: 'shop' },
    { id: 'signature-collection', label: 'Signature', view: 'home' },
    { id: 'why-anti', label: 'Craftsmanship', view: 'home' },
    { id: 'order-tracking', label: 'Tracking', view: 'home' },
    { id: 'customer-reviews', label: 'Reviews', view: 'home' },
    { id: 'blog', label: 'Journal', view: 'home' },
    { id: 'contact', label: 'Contact', view: 'contact' },
  ];

  const handleLinkClick = (id) => {
    setActiveNavId(id);
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const getIsActive = (link) => {
    if (currentView === 'shop') return link.id === 'featured-products';
    if (currentView === 'contact') return link.id === 'contact';
    return activeNavId === link.id;
  };

  return (
    <>
      {/* 1. Micro Announcement Ticker */}
      {showTicker && (
        <div className="bg-[#24211E] text-[#EDE8E1] text-[11px] font-medium py-1.5 px-4 border-b border-stone-800/80 transition-colors duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold uppercase tracking-wider text-[10px] shrink-0">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Workshop Live
              </span>
              <span className="text-stone-500 shrink-0">•</span>
              <span className="text-stone-300 truncate">
                Phnom Penh Studio queue: <b className="text-white">24–48h courier dispatch</b>
              </span>
              <span className="hidden lg:inline text-stone-500 shrink-0">•</span>
              <span className="hidden lg:inline text-stone-300 truncate">
                Free White-Glove In-Home Assembly on orders over $500
              </span>
            </div>

            <button
              onClick={() => setShowTicker(false)}
              className="text-stone-400 hover:text-white p-1 rounded-full hover:bg-stone-800/80 shrink-0 hidden sm:inline-flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Dismiss announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating Island Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/90 dark:bg-[#121110]/90 backdrop-blur-md shadow-xs border-b border-stone-200/60 dark:border-stone-800/60 py-2.5'
            : 'bg-[#FAF8F5] dark:bg-[#121110] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => handleLinkClick('signature-collection')}
            className="flex items-center gap-2 cursor-pointer group select-none shrink-0"
          >
            <span className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Anti
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-700 dark:bg-amber-500 group-hover:scale-125 transition-transform" />
            <span className="hidden xl:inline text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-300/40 dark:border-stone-700">
              Studio
            </span>
          </div>

          {/* Desktop & Tablet Navigation Capsule - All 7 Links visible without scrolling */}
          <nav className="hidden md:flex items-center space-x-0.5 lg:space-x-1 bg-stone-100/90 dark:bg-stone-900/80 p-1 rounded-full border border-stone-200/80 dark:border-stone-800/80 shrink-0">
            {navLinks.map((link) => {
              const isActive = getIsActive(link);
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-2.5 md:px-2 lg:px-3 py-1 md:py-1.5 rounded-full text-[11px] lg:text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer whitespace-nowrap select-none shrink-0 ${
                    isActive
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs font-bold'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800/60'
                  } active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-700`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 lg:space-x-2 shrink-0">
            {/* Quick Search Spotlight Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search catalog (Cmd+K)"
              title="Search catalog (Cmd+K)"
              className="flex items-center gap-1.5 p-2 xl:px-3 xl:py-1.5 rounded-full text-stone-600 dark:text-stone-300 bg-stone-100/90 dark:bg-stone-800/90 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all cursor-pointer border border-stone-200/80 dark:border-stone-700/80 hover:border-stone-300 dark:hover:border-stone-600 active:border-amber-700 active:ring-2 active:ring-amber-700/20 active:scale-95"
              id="search-spotlight-btn"
            >
              <Search className="w-4 h-4 text-stone-500 dark:text-stone-400" />
              <span className="hidden xl:inline text-xs text-stone-600 dark:text-stone-300 font-medium">
                Search pieces...
              </span>
              <kbd className="hidden xl:inline px-1.5 py-0.5 text-[9px] font-mono text-stone-500 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-700">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist / Saved Items Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Open saved wishlist"
              title="Saved pieces"
              className="relative p-2 rounded-full text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-transparent hover:bg-stone-200/60 dark:hover:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 hover:border-stone-300 dark:hover:border-stone-600 active:border-amber-700 active:ring-2 active:ring-amber-700/20 active:scale-95 transition-all cursor-pointer"
              id="wishlist-toggle-btn"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-rose-600 text-white text-[10px] font-bold rounded-full shadow-2xs tabular-nums border border-white dark:border-stone-900">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* My Orders Button */}
            <button
              onClick={() => setIsOrdersModalOpen(true)}
              aria-label="View My Orders"
              title="View previously submitted orders"
              className="relative p-2 rounded-full text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-transparent hover:bg-stone-200/60 dark:hover:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 hover:border-stone-300 dark:hover:border-stone-600 active:border-amber-700 active:ring-2 active:ring-amber-700/20 active:scale-95 transition-all cursor-pointer"
              id="my-orders-btn"
            >
              <PackageCheck className="w-4 h-4" />
              {savedOrdersCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-amber-700 text-white text-[10px] font-bold rounded-full shadow-2xs tabular-nums border border-white dark:border-stone-900">
                  {savedOrdersCount}
                </span>
              )}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => {
                toggleDarkMode();
                if (showToast) {
                  showToast(!isDarkMode ? 'Dark theme enabled' : 'Light theme enabled');
                }
              }}
              aria-label="Toggle theme appearance"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 rounded-full text-xs font-medium text-stone-700 dark:text-stone-200 bg-stone-100/90 hover:bg-stone-200/90 dark:bg-stone-800/90 dark:hover:bg-stone-700/90 transition-all cursor-pointer border border-stone-200/80 dark:border-stone-700/80 hover:border-stone-300 dark:hover:border-stone-600 active:border-amber-700 active:ring-2 active:ring-amber-700/20 active:scale-95"
              id="theme-toggle-btn"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden xl:inline text-[11px] font-semibold text-stone-300">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-stone-700" />
                  <span className="hidden xl:inline text-[11px] font-semibold text-stone-700">Dark</span>
                </>
              )}
            </button>

            {/* Telegram Direct Bot Header Pill - Responsive widths */}
            <button
              onClick={() => setIsTelegramModalOpen(true)}
              aria-label="Connect via Telegram Bot"
              title="Chat directly with our Telegram Bot"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 hover:border-sky-400 active:border-sky-600 active:ring-2 active:ring-sky-500/20 active:scale-95 transition-all cursor-pointer"
              id="telegram-header-btn"
            >
              <Send className="w-3.5 h-3.5" />
              <span>@FurnitureOnlineSellingbot</span>
            </button>

            {/* PWA Install Button */}
            <div className="flex items-center">
              <PWAInstallButton />
            </div>
            
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              className="relative p-2 sm:px-3 sm:py-1.5 rounded-full text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-white border border-stone-900 dark:border-stone-100 active:border-amber-700 active:ring-2 active:ring-amber-700/30 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              id="cart-toggle-btn"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 dark:text-amber-600" />
              <span className="hidden sm:inline text-xs font-bold tabular-nums">
                {totalItemsCount}
              </span>
              {totalItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalItemsCount}
                  className="sm:hidden absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-amber-700 text-white text-[10px] font-bold rounded-full shadow-xs tabular-nums border border-white dark:border-stone-900"
                >
                  {totalItemsCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Button - Shown exclusively on mobile screens */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-stone-700 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 hover:border-stone-300 dark:hover:border-stone-600 active:border-amber-700 active:ring-2 active:ring-amber-700/20 active:scale-95 transition-all cursor-pointer"
              id="mobile-menu-toggle-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FAF8F5] dark:bg-[#141211] border-b border-stone-200 dark:border-stone-800 px-6 py-5 shadow-lg"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const isActive = getIsActive(link);
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`text-left text-sm font-medium px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'border-2 border-amber-800 dark:border-amber-400 bg-amber-50/80 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold shadow-xs'
                          : 'border-2 border-transparent text-stone-700 dark:text-stone-200 hover:text-amber-800 dark:hover:text-amber-400 hover:bg-stone-100/80 dark:hover:bg-stone-800/60 hover:border-stone-200 dark:hover:border-stone-700'
                      } active:scale-[0.98] active:border-amber-700`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-amber-700 dark:bg-amber-400" />
                      )}
                    </button>
                  );
                })}

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2.5">
                  {/* PWA Install Button for Mobile Drawer */}
                  <MobilePWAInstallItem />

                  {/* View My Orders (Mobile & Tablet) */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsOrdersModalOpen(true);
                    }}
                    className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium transition-colors cursor-pointer hover:bg-stone-200/80 dark:hover:bg-stone-700/80"
                    id="mobile-my-orders-btn"
                  >
                    <span className="flex items-center gap-2">
                      <PackageCheck className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                      <span>View My Orders</span>
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold">
                      {savedOrdersCount}
                    </span>
                  </button>

                  {/* Mobile & Tablet Theme Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium transition-colors cursor-pointer hover:bg-stone-200/80 dark:hover:bg-stone-700/80"
                    id="mobile-theme-toggle-btn"
                  >
                    <span className="flex items-center gap-2">
                      {isDarkMode ? (
                        <Sun className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Moon className="w-4 h-4 text-stone-600" />
                      )}
                      <span>Theme Appearance</span>
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 font-semibold">
                      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </button>

                  {/* Mobile & Tablet Telegram Order Status & Support Link */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsTelegramModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-sky-600 text-white font-medium text-xs hover:bg-sky-700 transition-colors cursor-pointer shadow-xs"
                    id="mobile-telegram-status-btn"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Get Order Status via Telegram</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. Ergonomic Mobile Bottom Thumb Dock (Sticky Mobile Navigation) */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#FAF8F5]/90 dark:bg-[#181614]/90 backdrop-blur-md rounded-2xl border border-stone-300/80 dark:border-stone-700/80 shadow-xl px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => handleLinkClick('signature-collection')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            currentView === 'home'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold shadow-2xs'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          } active:scale-95`}
          aria-label="Go to Home"
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => handleLinkClick('featured-products')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            currentView === 'shop'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold shadow-2xs'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          } active:scale-95`}
          aria-label="Browse Catalog"
        >
          <Grid className="w-4 h-4" />
          <span className="text-[10px]">Catalog</span>
        </button>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 active:scale-95 transition-all cursor-pointer"
          aria-label="Search Products"
        >
          <Search className="w-4 h-4" />
          <span className="text-[10px]">Search</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 active:scale-95 transition-all cursor-pointer"
          aria-label="View Saved Items"
        >
          <Heart className="w-4 h-4" />
          <span className="text-[10px]">Saved</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-0.5 right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[8px] font-bold flex items-center justify-center tabular-nums">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-stone-900 dark:text-stone-100 active:scale-95 transition-all cursor-pointer font-semibold"
          aria-label="View Shopping Cart"
        >
          <ShoppingBag className="w-4 h-4 text-amber-800 dark:text-amber-400" />
          <span className="text-[10px]">Cart</span>
          {totalItemsCount > 0 && (
            <span className="absolute -top-0.5 right-1 w-3.5 h-3.5 rounded-full bg-amber-700 text-white text-[8px] font-bold flex items-center justify-center tabular-nums">
              {totalItemsCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
};
