import { Send, Instagram, Facebook, Twitter, Sun, Moon } from "lucide-react";
import { TELEGRAM_CONFIG } from "../services/telegramService";
import { useCart } from "../context/CartContext";
export const Footer = ({ onNavigate, onOpenVanillaModal }) => {
  const { setSelectedCategory, setIsTelegramModalOpen, isDarkMode, toggleDarkMode } = useCart();
  const handleShopCategory = (cat) => {
    setSelectedCategory(cat);
    onNavigate("featured-products");
  };
  return <footer className="bg-[#1C1A18] text-[#D8D4CF] pt-16 pb-12 border-t border-stone-800" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {
    /* Main Grid */
  }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-stone-800/80">
          
          {
    /* Brand Info & Telegram Link */
  }
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5 text-2xl font-serif font-bold text-white tracking-tight">
              <span>Anti</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mb-0.5" />
            </div>
            
            <p className="text-xs sm:text-sm text-stone-400 font-light max-w-sm leading-relaxed">
              Furniture for the way you live. Sculpted with honest solid woods and tactile fabrics designed to anchor life's most meaningful moments.
            </p>

            {
    /* Telegram Direct Order & Support Box */
  }
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 mb-1">
                <Send className="w-3.5 h-3.5" />
                <span>Direct Telegram Bot Support</span>
              </div>
              <p className="text-xs text-stone-400 mb-3">
                Speak directly with store owner <b>{TELEGRAM_CONFIG.OWNER_NAME}</b> or order via Telegram:
              </p>
              <div className="flex items-center gap-2">
                <a
    href={TELEGRAM_CONFIG.BOT_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-colors"
  >
                  <Send className="w-3 h-3" />
                  <span>@{TELEGRAM_CONFIG.BOT_USERNAME}</span>
                </a>
                <button
    onClick={() => setIsTelegramModalOpen(true)}
    className="px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-colors cursor-pointer"
  >
                  Send Inquiry
                </button>
              </div>
            </div>

            {
    /* Social Icons */
  }
            <div className="flex items-center space-x-3 pt-2">
              <a
    href={TELEGRAM_CONFIG.BOT_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-stone-800/80 hover:bg-sky-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
    aria-label="Telegram Bot"
  >
                <Send className="w-4 h-4" />
              </a>
              <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
    aria-label="Instagram"
  >
                <Instagram className="w-4 h-4" />
              </a>
              <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
    aria-label="Facebook"
  >
                <Facebook className="w-4 h-4" />
              </a>
              <a
    href="https://twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
    aria-label="Twitter"
  >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {
    /* Column 1: Shop */
  }
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
    onClick={() => handleShopCategory("All")}
    className="hover:text-white transition-colors cursor-pointer"
  >
                  All Products
                </button>
              </li>
              <li>
                <button
    onClick={() => handleShopCategory("Living Room")}
    className="hover:text-white transition-colors cursor-pointer"
  >
                  Living Room
                </button>
              </li>
              <li>
                <button
    onClick={() => handleShopCategory("Bedroom")}
    className="hover:text-white transition-colors cursor-pointer"
  >
                  Bedroom
                </button>
              </li>
              <li>
                <button
    onClick={() => handleShopCategory("Dining Room")}
    className="hover:text-white transition-colors cursor-pointer"
  >
                  Dining Room
                </button>
              </li>
              <li>
                <button
    onClick={() => handleShopCategory("Office")}
    className="hover:text-white transition-colors cursor-pointer"
  >
                  Office
                </button>
              </li>
              <li>
                <button
    onClick={() => handleShopCategory("Storage")}
    className="hover:text-white transition-colors cursor-pointer"
  >
                  Storage
                </button>
              </li>
            </ul>
          </div>

          {
    /* Column 2: Company */
  }
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
    onClick={() => onNavigate("why-anti")}
    className="hover:text-white transition-colors cursor-pointer"
  >
                  About Us
                </button>
              </li>
              <li>
                <button
    onClick={() => onNavigate("why-anti")}
    className="hover:text-white transition-colors cursor-pointer"
  >
                  Our Story
                </button>
              </li>
              <li>
                <button
    onClick={() => onNavigate("blog")}
    className="hover:text-white transition-colors cursor-pointer"
  >
                  Blog & Journal
                </button>
              </li>
              <li>
                <button
    onClick={() => onNavigate("why-anti")}
    className="hover:text-white transition-colors cursor-pointer"
  >
                  Sustainability
                </button>
              </li>
              <li>
                <button
    onClick={() => setIsTelegramModalOpen(true)}
    className="hover:text-white transition-colors cursor-pointer"
  >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {
    /* Column 3: Support */
  }
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
    onClick={() => setIsTelegramModalOpen(true)}
    className="hover:text-white transition-colors cursor-pointer"
  >
                  Help Center
                </button>
              </li>
              <li>
                <span className="text-stone-400">Shipping & Delivery</span>
              </li>
              <li>
                <span className="text-stone-400">Returns & 30-Day Refunds</span>
              </li>
              <li>
                <span className="text-stone-400">Care Guide & Wood Polish</span>
              </li>
              <li>
                <span className="text-stone-400">Terms & Conditions</span>
              </li>
              <li>
                <span className="text-stone-400">Privacy Policy</span>
              </li>
              {onOpenVanillaModal && (
                <li className="pt-1">
                  <button
                    onClick={onOpenVanillaModal}
                    className="text-amber-400/90 hover:text-amber-300 transition-colors cursor-pointer text-[11px] font-medium"
                  >
                    Pure Vanilla JS Edition
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>

        {
    /* Bottom Bar: Copyright, Theme Switcher & Payment Badges */
  }
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-4">
            <p>© 2025 Anti Furniture Studio. All rights reserved.</p>
            <button
              onClick={toggleDarkMode}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-[11px] transition-colors cursor-pointer border border-stone-700/50"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              id="footer-theme-toggle-btn"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-stone-400" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>

          {
    /* Payment Badges */
  }
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-[10px] font-medium text-stone-300">
              VISA
            </span>
            <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-[10px] font-medium text-stone-300">
              Mastercard
            </span>
            <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-[10px] font-medium text-stone-300">
              Amex
            </span>
            <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-[10px] font-medium text-stone-300">
              PayPal
            </span>
            <span className="px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-[10px] font-medium text-stone-300">
              Apple Pay
            </span>
            <span className="px-2.5 py-1 rounded-md bg-sky-950/80 border border-sky-800/80 text-[10px] font-medium text-sky-300 flex items-center gap-1">
              <Send className="w-2.5 h-2.5" /> Telegram Pay
            </span>
          </div>
        </div>

      </div>
    </footer>;
};
