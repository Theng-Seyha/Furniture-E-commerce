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
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { TELEGRAM_CONFIG } from '../services/telegramService';

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
    setIsSearchOpen,
    isDarkMode,
    toggleDarkMode,
    setIsTelegramModalOpen,
    showToast,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTicker, setShowTicker] = useState(true);

  // Track window scroll for elevation styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'featured-products', label: 'Shop All', view: 'shop' },
    { id: 'signature-collection', label: 'Signature', view: 'home' },
    { id: 'why-anti', label: 'Craftsmanship', view: 'home' },
    { id: 'reviews', label: 'Reviews', view: 'home' },
    { id: 'stories', label: 'Journal', view: 'home' },
    { id: 'contact', label: 'Contact', view: 'contact' },
  ];

  const handleLinkClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. Micro Announcement Ticker */}
      {showTicker && (
        <div className="bg-[#24211E] text-[#EDE8E1] text-[11px] font-medium py-1.5 px-4 border-b border-stone-800/80 transition-colors duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none mx-auto sm:mx-0">
              <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold uppercase tracking-wider text-[10px]">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Workshop Live
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-stone-300">
                Phnom Penh Studio queue: <b>24–48h courier dispatch</b>
              </span>
              <span className="hidden md:inline text-stone-500">•</span>
              <span className="hidden md:inline text-stone-300">
                Free White-Glove In-Home Assembly on orders over $500
              </span>
            </div>

            <button
              onClick={() => setShowTicker(false)}
              className="text-stone-400 hover:text-white p-0.5 ml-3 hidden sm:inline-block cursor-pointer"
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
            ? 'bg-[#FAF8F5]/85 dark:bg-[#121110]/85 backdrop-blur-md shadow-xs border-b border-stone-200/60 dark:border-stone-800/60 py-2.5'
            : 'bg-[#FAF8F5] dark:bg-[#121110] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100">
              Anti
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-700 dark:bg-amber-500 group-hover:scale-125 transition-transform" />
            <span className="hidden xl:inline text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-300/40 dark:border-stone-700">
              Studio
            </span>
          </div>

          {/* Desktop Navigation Links with Active Indicator */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-stone-100/70 dark:bg-stone-900/60 p-1.5 rounded-full border border-stone-200/60 dark:border-stone-800/60">
            {navLinks.map((link) => {
              const isActive =
                currentView === link.view &&
                (link.view !== 'home' || link.id === 'signature-collection');
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-2xs'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Quick Search Spotlight Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search catalog (Cmd+K)"
              title="Search catalog (Cmd+K)"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-stone-600 dark:text-stone-300 bg-stone-100/80 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors cursor-pointer border border-stone-200/60 dark:border-stone-700/60"
              id="search-spotlight-btn"
            >
              <Search className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden lg:inline text-xs text-stone-500 dark:text-stone-400 font-medium">
                Search pieces...
              </span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 text-[9px] font-mono text-stone-500 bg-white dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-700">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist / Saved Items Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Open saved wishlist"
              title="Saved pieces"
              className="relative p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors cursor-pointer"
              id="wishlist-toggle-btn"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 flex items-center justify-center bg-rose-600 text-white text-[10px] font-bold rounded-full shadow-2xs tabular-nums">
                  {wishlistCount}
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
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-stone-700 dark:text-stone-200 bg-stone-100/90 hover:bg-stone-200/90 dark:bg-stone-800/90 dark:hover:bg-stone-700/90 transition-all cursor-pointer border border-stone-200/70 dark:border-stone-700/70"
              id="theme-toggle-btn"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden lg:inline text-[11px] font-semibold text-stone-300">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-stone-700" />
                  <span className="hidden lg:inline text-[11px] font-semibold text-stone-700">Dark</span>
                </>
              )}
            </button>

            {/* Telegram Direct Bot Header Pill */}
            <button
              onClick={() => setIsTelegramModalOpen(true)}
              aria-label="Connect via Telegram Bot"
              title="Chat directly with our Telegram Bot"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors cursor-pointer"
              id="telegram-header-btn"
            >
              <Send className="w-3.5 h-3.5" />
              <span>@FurnitureOnlineSellingbot</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              className="relative p-2 sm:px-3 sm:py-1.5 rounded-full text-stone-800 dark:text-stone-100 bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-all cursor-pointer flex items-center gap-2 shadow-xs"
              id="cart-toggle-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-bold tabular-nums">
                {totalItemsCount}
              </span>
              {totalItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalItemsCount}
                  className="sm:hidden absolute top-0.5 right-0.5 w-4 h-4 flex items-center justify-center bg-amber-700 dark:bg-amber-600 text-white text-[10px] font-bold rounded-full shadow-xs tabular-nums"
                >
                  {totalItemsCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors"
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
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className="text-left text-sm font-medium text-stone-700 dark:text-stone-200 hover:text-amber-800 dark:hover:text-amber-400 py-1.5"
                  >
                    {link.label}
                  </button>
                ))}

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2.5">
                  {/* Mobile Theme Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium transition-colors"
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

                  {/* Mobile Telegram Link */}
                  <a
                    href={TELEGRAM_CONFIG.BOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-sky-600 text-white font-medium text-xs hover:bg-sky-700 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Open Telegram Bot</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. Ergonomic Mobile Bottom Thumb Dock (Sticky Mobile Navigation) */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#FAF8F5]/90 dark:bg-[#181614]/90 backdrop-blur-md rounded-2xl border border-stone-300/80 dark:border-stone-700/80 shadow-xl px-4 py-2 flex items-center justify-around">
        <button
          onClick={() => handleLinkClick('home')}
          className={`flex flex-col items-center gap-1 p-1.5 transition-colors cursor-pointer ${
            currentView === 'home'
              ? 'text-amber-800 dark:text-amber-400 font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
          aria-label="Go to Home"
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => handleLinkClick('shop')}
          className={`flex flex-col items-center gap-1 p-1.5 transition-colors cursor-pointer ${
            currentView === 'shop'
              ? 'text-amber-800 dark:text-amber-400 font-bold'
              : 'text-stone-500 dark:text-stone-400'
          }`}
          aria-label="Browse Catalog"
        >
          <Grid className="w-4 h-4" />
          <span className="text-[10px]">Catalog</span>
        </button>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-1 p-1.5 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
          aria-label="Search Products"
        >
          <Search className="w-4 h-4" />
          <span className="text-[10px]">Search</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center gap-1 p-1.5 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
          aria-label="View Saved Items"
        >
          <Heart className="w-4 h-4" />
          <span className="text-[10px]">Saved</span>
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[8px] font-bold flex items-center justify-center tabular-nums">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 p-1.5 text-stone-900 dark:text-stone-100 transition-colors cursor-pointer font-semibold"
          aria-label="View Shopping Cart"
        >
          <ShoppingBag className="w-4 h-4 text-amber-800 dark:text-amber-400" />
          <span className="text-[10px]">Cart</span>
          {totalItemsCount > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-amber-700 text-white text-[8px] font-bold flex items-center justify-center tabular-nums">
              {totalItemsCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
};
