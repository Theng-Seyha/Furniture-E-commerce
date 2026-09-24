import React, { useState, useEffect } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { 
  Download, 
  X, 
  WifiOff, 
  Share, 
  PlusSquare, 
  Monitor, 
  Smartphone, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * High-visibility Install App Button for Navbar
 * Always visible in the web browser so users can install or learn how to install.
 */
export const PWAInstallButton = () => {
  const { isInstallable, isInstalled, platform, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  // If running inside standalone installed app, show a discreet status or hide
  if (isInstalled) {
    return (
      <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
        <span>Installed</span>
      </span>
    );
  }

  const handleClick = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (isInstallable) {
      // Direct install to home screen via native browser prompt
      const success = await install();
      if (success) {
        return;
      }
    }
    // Only show helper modal if device/browser doesn't support automatic prompt (like iOS Safari or desktop browser without active prompt)
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        id="navbar-pwa-install-btn"
        aria-label="Install Anti Web App"
        title="Install Anti App to your device"
        className="group relative flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white text-[11px] sm:text-xs font-semibold shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer border border-amber-700/80"
      >
        <Download className="w-3.5 h-3.5 text-amber-200 transition-transform group-hover:translate-y-0.5" />
        <span className="hidden xs:inline sm:inline whitespace-nowrap tracking-tight">Install App</span>
        <span className="xs:hidden whitespace-nowrap tracking-tight">Install</span>
      </button>

      <PWAInstallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        platform={platform}
        isInstallable={isInstallable}
        onDirectInstall={install}
      />
    </>
  );
};

/**
 * Mobile Drawer Menu item for Install PWA
 */
export const MobilePWAInstallItem = () => {
  const { isInstallable, isInstalled, platform, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  if (isInstalled) return null;

  const handleClick = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (isInstallable) {
      const ok = await install();
      if (ok) return;
    }
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        id="mobile-drawer-pwa-install-btn"
      >
        <span className="flex items-center gap-2">
          <Download className="w-4 h-4 text-amber-200" />
          <span>Install Anti App (PWA)</span>
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-200 font-bold uppercase tracking-wider">
          Add
        </span>
      </button>

      <PWAInstallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        platform={platform}
        isInstallable={isInstallable}
        onDirectInstall={install}
      />
    </>
  );
};

/**
 * Comprehensive PWA Install Guide Modal
 */
export const PWAInstallModal = ({ isOpen, onClose, platform, isInstallable, onDirectInstall }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Disable pull-to-refresh when modal is open
      document.body.style.overscrollBehavior = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.overscrollBehavior = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.overscrollBehavior = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[120] flex items-center justify-center p-6"
      >
        {/* Subtle backdrop - clicking here closes */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-stone-900/30 backdrop-blur-xs cursor-pointer"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-[380px] bg-white dark:bg-stone-900 rounded-[2rem] p-6 sm:p-8 shadow-2xl border border-stone-100 dark:border-stone-800 text-stone-900 dark:text-stone-100 my-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top-Right Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon & Title */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-stone-50 dark:border-stone-800">
            <div className="w-16 h-16 rounded-2xl bg-amber-800 text-white flex items-center justify-center shadow-lg overflow-hidden border-2 border-white dark:border-stone-800 mb-4">
              <img 
                src="/pwa-192x192.png" 
                alt="Anti Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              Install Anti Studio App
            </h3>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 font-bold uppercase tracking-widest">
              Premier Workshop Access
            </p>
          </div>

          {/* Action Area */}
          <div className="mt-8 space-y-5">
            {isInstallable ? (
              <div className="space-y-4">
                <button
                  onClick={async () => {
                    const res = await onDirectInstall();
                    if (res) onClose();
                  }}
                  className="w-full py-4 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white text-sm font-bold shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Install Directly
                </button>
                <p className="text-[10px] text-center text-stone-400 italic">
                  One-tap installation to your home screen
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Visual Step-by-Step for iOS/Manual */}
                <div className="relative space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0">
                      {platform === 'ios' ? <Share className="w-4 h-4 text-stone-600 dark:text-stone-400" /> : <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        {platform === 'ios' ? '1. Tap the Share icon' : '1. Open browser menu'}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">Found at the bottom or top of your browser.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0">
                      {platform === 'ios' ? <PlusSquare className="w-4 h-4 text-stone-600 dark:text-stone-400" /> : <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        2. Add to Home Screen
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">Scroll down to find the installation option.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-50 dark:border-stone-800">
                  <button
                    onClick={onClose}
                    className="w-full py-3.5 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold shadow-md hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Got it, thanks
                  </button>
                </div>
              </div>
            )}
            
            {isInstallable && (
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 text-xs font-semibold transition-all cursor-pointer"
              >
                Maybe Later
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/**
 * Professional Contextual Install Banner
 * Appears after user engagement to increase conversion without being annoying.
 */
export const SmartInstallBanner = () => {
  const { isInstallable, isInstalled, platform, install } = usePWAInstall();
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show after 10 seconds of browsing, only if not installed and hasn't been dismissed this session
    const hasBeenDismissed = sessionStorage.getItem('pwa-banner-dismissed');
    
    if (!isInstalled && !hasBeenDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 15000); // 15 seconds
      return () => clearTimeout(timer);
    }
  }, [isInstalled]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('pwa-banner-dismissed', 'true');
  };

  const handleInstall = async () => {
    if (isInstallable) {
      const ok = await install();
      if (ok) return;
    }
    setShowModal(true);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-8 sm:w-[400px] z-40"
          >
            <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-stone-200 dark:border-stone-800 flex items-center gap-5">
              <div className="w-16 h-16 rounded-[1.25rem] bg-amber-800 shrink-0 overflow-hidden shadow-xl border-2 border-white dark:border-stone-800">
                <img src="/pwa-192x192.png" alt="App Icon" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">Anti Studio Mobile</h4>
                  <span className="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-400 text-[8px] font-black uppercase tracking-tighter">Official</span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">Install the official workshop app for faster browsing and offline access to our catalog.</p>
                <div className="mt-3.5 flex items-center gap-4">
                  <button 
                    onClick={handleInstall}
                    className="px-5 py-2 rounded-full bg-amber-800 hover:bg-amber-900 text-white text-[11px] font-bold shadow-lg shadow-amber-900/20 active:scale-95 transition-all cursor-pointer"
                  >
                    Get the App
                  </button>
                  <button 
                    onClick={handleDismiss}
                    className="text-[11px] font-bold text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
                  >
                    Later
                  </button>
                </div>
              </div>
              <button 
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-stone-300 hover:text-stone-900 dark:text-stone-600 dark:hover:text-stone-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PWAInstallModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setIsVisible(false);
          sessionStorage.setItem('pwa-banner-dismissed', 'true');
        }}
        platform={platform}
        isInstallable={isInstallable}
        onDirectInstall={install}
      />
    </>
  );
};

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-2xl bg-amber-600 text-white shadow-xl border border-amber-500"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <WifiOff className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold leading-none">Offline Mode</p>
            <p className="text-[10px] opacity-90 mt-1">Viewing cached workshop data.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
