import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Code2, Check, Sparkles, Terminal, FileCode, Send } from 'lucide-react';
import { TELEGRAM_CONFIG } from '../services/telegramService';

/**
 * VanillaCodeModal - Pure Vanilla JS Edition Showcase
 * Presents the zero-dependency pure JavaScript/HTML5/CSS3 companion version
 * built by Theng Seyha.
 */
export const VanillaCodeModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyPath = () => {
    const fullUrl = `${window.location.origin}/vanilla/index.html`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const features = [
    {
      title: 'Zero Dependencies',
      desc: '100% pure ES6+ JavaScript, native DOM manipulation, semantic HTML5, and vanilla CSS variables.'
    },
    {
      title: 'Full Telegram Bot Integration',
      desc: `Direct fetch requests to @${TELEGRAM_CONFIG.BOT_USERNAME} for automated real-time order notifications.`
    },
    {
      title: 'Local State Persistence',
      desc: 'Cart items, user preferences, and Dark/Light mode saved locally via native localStorage.'
    },
    {
      title: 'Dynamic Calculators',
      desc: 'Real-time assembly fees, free shipping progress bar, and discount voucher calculation.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-stone-900 max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 relative text-stone-900 dark:text-stone-100 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5" />
            Standalone Vanilla Edition
          </span>
          <span className="text-xs text-stone-500 font-mono">/public/vanilla/</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
          Pure JavaScript Furniture Store
        </h3>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
          Crafted by <b>Theng Seyha</b> without React, Vue, or any external front-end framework. Runs directly in any modern browser with lightning performance.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 space-y-1"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {f.title}
                </h4>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal pl-5">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Path preview box */}
        <div className="p-4 rounded-2xl bg-stone-900 text-stone-200 border border-stone-800 font-mono text-xs flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 truncate">
            <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate text-stone-300">/vanilla/index.html</span>
          </div>
          <button
            onClick={handleCopyPath}
            className="shrink-0 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-sans transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <span>Copy URL</span>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/vanilla/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-6 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 font-semibold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
            id="open-vanilla-app-btn"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Launch Pure Vanilla JS Store</span>
          </a>

          <button
            onClick={onClose}
            className="py-3 px-6 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 font-semibold text-xs transition-colors cursor-pointer"
          >
            Stay in React App
          </button>
        </div>
      </motion.div>
    </div>
  );
};
