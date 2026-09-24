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
  const [activeTab, setActiveTab] = useState(
    platform === 'ios' ? 'ios' : platform === 'android' ? 'android' : 'desktop'
  );

  useEffect(() => {
    if (platform === 'ios') setActiveTab('ios');
    else if (platform === 'android') setActiveTab('android');
    else setActiveTab('desktop');
  }, [platform]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[120] flex items-center justify-center bg-stone-950/60 backdrop-blur-xs p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md bg-[#FAF8F5] dark:bg-stone-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-stone-200/80 dark:border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-700 text-white flex items-center justify-center shadow-xs">
                <Download className="w-5 h-5 text-amber-100" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                  Install Anti App
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Progressive Web App • Fast & Offline
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* In-Preview / Iframe Banner Notice */}
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-600/30 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
              <span className="font-bold text-amber-800 dark:text-amber-300">Tip for direct home screen installation:</span> Browsers disable home screen installation when previewing inside an iframe container. Open this web app directly in your browser tab to trigger the direct 1-tap installation.
              <div className="mt-2">
                <a
                  href={window.location.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-[11px] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open in Direct Tab</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Trigger Button if native prompt is supported */}
          {isInstallable && (
            <div className="mt-3 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 flex items-center justify-between gap-3">
              <div className="text-xs text-emerald-900 dark:text-emerald-200">
                <span className="font-bold">Prompt Ready!</span> Click to add directly to home screen.
              </div>
              <button
                onClick={async () => {
                  const res = await onDirectInstall();
                  if (res) onClose();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs active:scale-95 transition-all whitespace-nowrap cursor-pointer"
              >
                Install Now
              </button>
            </div>
          )}

          {/* Platform Tabs */}
          <div className="flex items-center gap-1.5 mt-4 p-1 rounded-2xl bg-stone-200/70 dark:bg-stone-800">
            <button
              onClick={() => setActiveTab('desktop')}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'desktop'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setActiveTab('ios')}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'ios'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>iPhone/iPad</span>
            </button>
            <button
              onClick={() => setActiveTab('android')}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'android'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android</span>
            </button>
          </div>

          {/* Instructions Content */}
          <div className="mt-5 space-y-3.5 text-xs text-stone-700 dark:text-stone-300">
            {activeTab === 'desktop' && (
              <div className="space-y-3 bg-stone-100/70 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">Look for the Install icon in the URL bar</p>
                    <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5">
                      In Chrome, Edge, or Brave, click the <strong>install icon (⊕ or desktop arrow)</strong> located on the right side of your browser address bar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">Alternative: Browser Menu</p>
                    <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5">
                      Click the three dots <strong>(⋮)</strong> &gt; <em>"Save and share"</em> or <em>"Cast, save, and share"</em> &gt; <strong>"Install Anti Furniture Studio"</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">Safari on macOS Sonoma+</p>
                    <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5">
                      Click <em>File</em> in menu bar &gt; <strong>"Add to Dock..."</strong> to install Anti as a native Mac app.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ios' && (
              <div className="space-y-3 bg-stone-100/70 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-stone-200 dark:bg-stone-700 flex items-center justify-center shrink-0">
                    <Share className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">1. Tap the Share button</p>
                    <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5">
                      Open in Safari and tap the square icon with an arrow pointing up at the bottom toolbar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-stone-200 dark:bg-stone-700 flex items-center justify-center shrink-0">
                    <PlusSquare className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">2. Select "Add to Home Screen"</p>
                    <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5">
                      Scroll down the share sheet and tap <strong>Add to Home Screen</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">3. Tap "Add"</p>
                    <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5">
                      Anti will be added to your home screen with its custom studio icon.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'android' && (
              <div className="space-y-3 bg-stone-100/70 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">Tap Browser Options (⋮)</p>
                    <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5">
                      In Chrome, tap the 3 vertical dots at the top right of your screen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">Tap "Install App" or "Add to Home screen"</p>
                    <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-0.5">
                      Confirm installation to place the app on your app drawer and home screen.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* App Benefits Pill List */}
          <div className="mt-5 pt-4 border-t border-stone-200/80 dark:border-stone-800 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] font-semibold text-stone-700 dark:text-stone-300">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Full-screen app view
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] font-semibold text-stone-700 dark:text-stone-300">
              <WifiOff className="w-3 h-3 text-amber-600" />
              Works offline
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] font-semibold text-stone-700 dark:text-stone-300">
              <CheckCircle2 className="w-3 h-3 text-amber-600" />
              Instant launch
            </span>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={onClose}
            className="mt-5 w-full py-2.5 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs hover:bg-stone-800 dark:hover:bg-white active:scale-[0.98] transition-all cursor-pointer"
          >
            Close Guide
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
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
