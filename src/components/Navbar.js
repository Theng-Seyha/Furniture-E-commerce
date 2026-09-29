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
  Clock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { TELEGRAM_CONFIG } from '../services/telegramService';
import { PWAInstallButton, MobilePWAInstallItem } from './PWAControls';

/**
 * Senior Software Engineering Navigation Architecture
 * - Full-screen computer and laptop responsive grid (zero horizontal overflow across 1024px, 1280px, 1440px, 1920px+)
 * - Logical visual clustering with subtle dividers: [Search, Theme] | [Wishlist, Orders, Telegram] | [Cart, Mobile Toggle]
 * - Progressive disclosure: concise controls on standard laptops, expanded pills on ultra-wide displays
 * - Ergonomic mobile bottom thumb dock for one-handed reachability
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
    isTrackOrderModalOpen,
    setIsTrackOrderModalOpen,
    setIsSearchOpen,
    isDarkMode,
    toggleDarkMode,
    setIsTelegramModalOpen,
    showToast,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTicker, setShowTicker] = useState(true);
  const [activeNavId, setActiveNavId] = useState('');
  const [isManualNav, setIsManualNav] = useState(false);

  // Track window scroll for subtle elevation styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronize active nav item with route changes and hash
  useEffect(() => {
    const syncActiveNav = () => {
      const hash = window.location.hash.replace('#', '');
      
      if (currentView === 'shop') {
        setActiveNavId('featured-products');
      } else if (currentView === 'contact') {
        setActiveNavId('contact');
      } else if (currentView === 'tracking') {
        setActiveNavId('order-tracking');
      } else if (currentView === 'product-detail') {
        setActiveNavId('');
      } else if (currentView === 'home') {
        if (hash && ['signature-collection', 'why-fur', 'customer-reviews', 'blog'].includes(hash)) {
          setActiveNavId(hash);
        } else {
          setActiveNavId('');
        }
      }
    };

    syncActiveNav();
    window.addEventListener('hashchange', syncActiveNav);
    return () => window.removeEventListener('hashchange', syncActiveNav);
  }, [currentView]);

  // Track active section on home page as user scrolls
  useEffect(() => {
    if (currentView !== 'home' || isManualNav) return;

    const sectionIds = [
      'signature-collection',
      'why-fur',
      'customer-reviews',
      'blog',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by distance to top of viewport to find dominant visible section
          visibleEntries.sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );
          setActiveNavId(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-10% 0px -40% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentView, isManualNav]);

  const navLinks = [
    { id: 'featured-products', label: 'Shop All', view: 'shop', primary: true },
    { id: 'signature-collection', label: 'Signature', view: 'home', primary: true },
    { id: 'why-fur', label: 'Craftsmanship', view: 'home', primary: true },
    { id: 'customer-reviews', label: 'Reviews', view: 'home', primary: true },
    { id: 'order-tracking', label: 'Tracking', view: 'tracking', primary: true },
    { id: 'blog', label: 'Journal', view: 'home', primary: false },
    { id: 'contact', label: 'Contact', view: 'contact', primary: true },
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    setIsManualNav(true);

    if (id === 'home') {
      setActiveNavId('');
      if (currentView === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setIsManualNav(false), 800);
      } else {
        onNavigate('home');
      }
      return;
    }

    setActiveNavId(id);

    const targetLink = navLinks.find((l) => l.id === id);

    // If currently on home and navigating to an in-page section, scroll immediately and smoothly
    if (currentView === 'home' && targetLink && targetLink.view === 'home') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => setIsManualNav(false), 1200);
      return;
    }

    onNavigate(id);
    setTimeout(() => setIsManualNav(false), 1200);
  };

  const getIsActive = (link) => {
    if (currentView === 'shop') return link.id === 'featured-products';
    if (currentView === 'contact') return link.id === 'contact';
    if (currentView === 'tracking') return link.id === 'order-tracking';
    if (currentView === 'product-detail') return false;
    return activeNavId === link.id;
  };

  return (
    <>
      {/* 1. Micro Announcement Ticker */}
      {showTicker && (
        <div className="bg-[#24211E] text-[#EDE8E1] text-[11px] font-medium py-1.5 px-4 border-b border-stone-800/80 transition-colors duration-300">
          <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <span className="inline-flex items-center gap-1.5 text-amber-300 font-medium text-[11px] shrink-0">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Handcrafted in Phnom Penh
              </span>
              <span className="text-stone-500 shrink-0">•</span>
              <span className="text-stone-200 truncate">
                Direct courier dispatch within <b className="text-white font-semibold">24–48 hours</b>
              </span>
              <span className="hidden lg:inline text-stone-500 shrink-0">•</span>
              <span className="hidden lg:inline text-stone-300 truncate">
                Complimentary white-glove assembly on orders over $500
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

      {/* 2. Floating Island Header - Fully responsive across laptops and desktop monitors */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/90 dark:bg-[#121110]/90 backdrop-blur-md shadow-xs border-b border-stone-200/60 dark:border-stone-800/60 py-2 sm:py-2.5'
            : 'bg-[#FAF8F5] dark:bg-[#121110] py-2.5 sm:py-3.5'
        }`}
      >
        <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4 xl:gap-6">
          
          {/* Left: Brand Logo */}
          <button
            type="button"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 cursor-pointer group select-none shrink-0 p-1.5 -ml-1.5 rounded-2xl hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-all duration-300 ease-out"
            title="Fur Home"
          >
            <div className="flex items-center shrink-0">
              <span className="text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                Fur
              </span>
              <div className="flex items-center ml-1 md:ml-1.5 gap-1 md:gap-1.5">
                <span className="block w-1.5 h-1.5 rounded-full bg-amber-700 dark:bg-amber-500 group-hover:scale-125 transition-transform" />
                <img 
                  src="/cambodia.jpg" 
                  alt="Cambodia" 
                  className="w-4.5 h-3 md:w-5 md:h-3.5 rounded-xs object-cover select-none shadow-2xs border border-stone-200/40 dark:border-stone-800/40"
                />
              </div>
            </div>
          </button>

          {/* Center: Desktop Navigation Capsule (Adaptive for 1024px laptops up to 4K monitors) */}
          <nav className="hidden lg:flex items-center bg-stone-100/90 dark:bg-stone-900/80 p-1 rounded-full border border-stone-200/80 dark:border-stone-800/80 shrink-0 shadow-2xs transition-all duration-300">
            {navLinks.map((link) => {
              const isActive = getIsActive(link);
              return (
                <button
                  key={link.id}
                  type="button"
                  data-active={isActive}
                  onClick={(e) => { handleLinkClick(link.id); e.currentTarget.blur(); }}
                  className={`relative px-3 xl:px-4 py-1.5 rounded-full text-[11px] xl:text-xs font-semibold tracking-wide uppercase transition-all duration-300 ease-out cursor-pointer whitespace-nowrap select-none shrink-0 inline-flex items-center justify-center ${
                    !link.primary ? 'hidden 2xl:inline-flex' : 'inline-flex'
                  } text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 data-[active=true]:bg-stone-900 data-[active=true]:text-white data-[active=true]:dark:bg-stone-100 data-[active=true]:dark:text-stone-900 data-[active=true]:shadow-sm data-[active=true]:font-bold data-[active=true]:transform data-[active=true]:scale-[1.03] active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-700/50`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Clean, Well-Organized Action Controls */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 shrink-0">
            
            {/* Cluster 1: Discovery & Aesthetics */}
            <div className="flex items-center space-x-1 sm:space-x-1.5">
              {/* Search Spotlight Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search catalog (Cmd+K)"
                title="Search catalog (Cmd+K)"
                className="flex items-center gap-1.5 p-2 xl:px-3 xl:py-1.5 rounded-full text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 bg-stone-100/80 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700 transition-all cursor-pointer active:scale-95"
                id="search-spotlight-btn"
              >
                <Search className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                <span className="hidden xl:inline text-xs font-medium text-stone-600 dark:text-stone-300">
                  Search
                </span>
                <kbd className="hidden 2xl:inline px-1 py-0.5 text-[9px] font-mono text-stone-400 dark:text-stone-500 bg-white dark:bg-stone-800 rounded border border-stone-200 dark:border-stone-700">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={() => {
                  toggleDarkMode();
                  if (showToast) {
                    showToast(!isDarkMode ? 'Dark theme enabled' : 'Light theme enabled');
                  }
                }}
                aria-label="Toggle theme appearance"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="p-2 rounded-full text-stone-700 dark:text-stone-200 bg-stone-100/80 hover:bg-stone-200/80 dark:bg-stone-900/70 dark:hover:bg-stone-800/80 border border-stone-200/80 dark:border-stone-800/80 transition-all cursor-pointer active:scale-95"
                id="theme-toggle-btn"
              >
                <motion.div
                  key={isDarkMode ? 'dark' : 'light'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.85 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  {isDarkMode ? (
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 text-stone-700" />
                  )}
                </motion.div>
              </button>
            </div>

            {/* Subtle Divider */}
            <div className="h-4 w-px bg-stone-200/80 dark:bg-stone-800 hidden sm:block shrink-0" />

            {/* Cluster 2: Customer Shortlist & Orders */}
            <div className="flex items-center space-x-1 sm:space-x-1.5">
              {/* Wishlist / Saved Items Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                aria-label="Open saved wishlist"
                title="Saved pieces"
                className="relative p-2 rounded-full text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-transparent hover:bg-stone-200/60 dark:hover:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800/80 active:scale-95 transition-all cursor-pointer"
                id="wishlist-toggle-btn"
              >
                <Heart className="w-3.5 h-3.5" />
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
                className="relative p-2 rounded-full text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-transparent hover:bg-stone-200/60 dark:hover:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800/80 active:scale-95 transition-all cursor-pointer"
                id="my-orders-btn"
              >
                <PackageCheck className="w-3.5 h-3.5" />
                {savedOrdersCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-amber-700 text-white text-[10px] font-bold rounded-full shadow-2xs tabular-nums border border-white dark:border-stone-900">
                    {savedOrdersCount}
                  </span>
                )}
              </button>

              {/* Telegram Support Button - Adaptively collapsed on laptops, expanded on wide 2XL screens */}
              <button
                type="button"
                onClick={() => setIsTelegramModalOpen(true)}
                aria-label="Connect via Telegram Bot"
                title="Direct Workshop Telegram Bot (@FurnitureOnlineSellingbot)"
                className="hidden xl:inline-flex items-center gap-1.5 p-2 2xl:px-3 2xl:py-1.5 text-xs font-semibold rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800/60 hover:bg-sky-100 dark:hover:bg-sky-900/50 active:scale-95 transition-all cursor-pointer"
                id="telegram-header-btn"
              >
                <Send className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span className="hidden 2xl:inline">Telegram Bot</span>
              </button>

              {/* PWA Install Button - Visible on wide desktop screens */}
              <div className="hidden 2xl:flex items-center">
                <PWAInstallButton />
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="h-4 w-px bg-stone-200/80 dark:bg-stone-800 hidden sm:block shrink-0" />

            {/* Cluster 3: Primary Cart Action & Mobile Menu */}
            <div className="flex items-center space-x-1 sm:space-x-1.5">
              {/* Shopping Bag / Cart Pill */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Open Cart"
                className="relative px-3 py-1.5 rounded-full text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-white border border-stone-900 dark:border-stone-100 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                id="cart-toggle-btn"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600 shrink-0" />
                <span className="text-xs font-bold tabular-nums">
                  {totalItemsCount}
                </span>
              </button>

              {/* Mobile / Tablet Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-stone-700 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 active:scale-95 transition-all cursor-pointer"
                id="mobile-menu-toggle-btn"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile & Tablet Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#FAF8F5] dark:bg-[#141211] border-b border-stone-200 dark:border-stone-800 px-6 py-5 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const isActive = getIsActive(link);
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.id);
                      }}
                      className={`text-left text-sm font-medium px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-between ${
                        isActive
                          ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold shadow-xs'
                          : 'text-stone-700 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800/60'
                      } active:scale-[0.98]`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 dark:bg-amber-600" />
                      )}
                    </a>
                  );
                })}

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2.5">
                  {/* PWA Install Button for Mobile Drawer */}
                  <MobilePWAInstallItem />

                  {/* Track Order (Mobile & Tablet) */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsTrackOrderModalOpen(true);
                    }}
                    className="flex items-center gap-2 w-full py-2.5 px-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 text-xs font-bold transition-all cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/40 shadow-xs active:scale-95"
                    id="mobile-track-order-btn"
                  >
                    <Clock className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <span>Quick Track Workshop Status</span>
                  </button>

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
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-300 ease-out cursor-pointer ${
            currentView === 'home'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold shadow-2xs'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
          } active:scale-95`}
          aria-label="Go to Home"
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px]">Home</span>
        </a>

        <a
          href="/shop"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('featured-products');
          }}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            currentView === 'shop'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold shadow-2xs'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          } active:scale-95`}
          aria-label="Browse Catalog"
        >
          <Grid className="w-4 h-4" />
          <span className="text-[10px]">Catalog</span>
        </a>

        <a
          href="/search"
          onClick={(e) => {
            e.preventDefault();
            setIsSearchOpen(true);
          }}
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 active:scale-95 transition-all cursor-pointer"
          aria-label="Search Products"
        >
          <Search className="w-4 h-4" />
          <span className="text-[10px]">Search</span>
        </a>

        <a
          href="/wishlist"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlistOpen(true);
          }}
          className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 active:scale-95 transition-all cursor-pointer"
          aria-label="View Saved Items"
        >
          <Heart className="w-4 h-4" />
          <span className="text-[10px]">Saved</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-0.5 right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[8px] font-bold flex items-center justify-center tabular-nums">
              {wishlistCount}
            </span>
          )}
        </a>

        <a
          href="/cart"
          onClick={(e) => {
            e.preventDefault();
            setIsCartOpen(true);
          }}
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
        </a>
      </div>
    </>
  );
};
