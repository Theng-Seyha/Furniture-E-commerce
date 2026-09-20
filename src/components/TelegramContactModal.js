import { useState } from "react";
import { motion } from "motion/react";
import { X, Send, CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { sendInquiryToTelegram, TELEGRAM_CONFIG } from "../services/telegramService";
export const TelegramContactModal = () => {
  const { isTelegramModalOpen, setIsTelegramModalOpen } = useCart();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState("Custom Furniture Inquiry");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  if (!isTelegramModalOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !contact || !message) return;
    setIsSending(true);
    await sendInquiryToTelegram({
      name,
      emailOrPhone: contact,
      subject,
      message
    });
    setIsSending(false);
    setSentSuccess(true);
  };
  const handleClose = () => {
    setIsTelegramModalOpen(false);
    setSentSuccess(false);
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="bg-white dark:bg-stone-900 max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 relative text-stone-900 dark:text-stone-100"
  >
        <button
    onClick={handleClose}
    className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
    aria-label="Close modal"
  >
          <X className="w-5 h-5" />
        </button>

        {sentSuccess ? <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-serif font-bold">Message Transmitted!</h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-sm mx-auto">
              Your inquiry has been delivered directly to <b>{TELEGRAM_CONFIG.OWNER_NAME}</b> via <code>@{TELEGRAM_CONFIG.BOT_USERNAME}</code>. We usually reply in under 15 minutes!
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
    href={TELEGRAM_CONFIG.BOT_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-colors"
  >
                <Send className="w-3.5 h-3.5" />
                <span>Open Chat in Telegram</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
    onClick={handleClose}
    className="px-6 py-2.5 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 text-xs font-semibold"
  >
                Done
              </button>
            </div>
          </div> : <div>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-semibold mb-1">
              <Send className="w-4 h-4" />
              <span>Direct Telegram Bot Support</span>
            </div>

            <h3 className="text-2xl font-serif font-bold">Contact Anti Furniture</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Connect directly with owner <b>{TELEGRAM_CONFIG.OWNER_NAME}</b> on Telegram.
            </p>

            {
    /* Quick Open Bot Link */
  }
            <div className="mt-4 p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 flex items-center justify-between">
              <div className="text-xs">
                <p className="font-semibold text-sky-900 dark:text-sky-200">
                  Prefer direct Telegram chat?
                </p>
                <p className="text-[11px] text-sky-700 dark:text-sky-400">
                  t.me/{TELEGRAM_CONFIG.BOT_USERNAME}
                </p>
              </div>
              <a
    href={TELEGRAM_CONFIG.BOT_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="px-3.5 py-1.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium inline-flex items-center gap-1.5 shadow-xs"
  >
                <span>Open Bot</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {
    /* Form */
  }
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Your Name *
                </label>
                <input
    type="text"
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="e.g. Sokha / Alex"
    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
  />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Phone Number or Telegram Handle *
                </label>
                <input
    type="text"
    required
    value={contact}
    onChange={(e) => setContact(e.target.value)}
    placeholder="+855 12 345 678 or @myusername"
    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
  />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Subject
                </label>
                <select
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden"
  >
                  <option value="Custom Furniture Inquiry">Custom Furniture Commission</option>
                  <option value="Order Status Check">Order Status Check</option>
                  <option value="Dimension & Wood Sample Request">Dimension & Wood Sample Request</option>
                  <option value="Wholesale / Architectural Project">Wholesale / Interior Project</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Message *
                </label>
                <textarea
    required
    rows={3}
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Tell us what you're looking for..."
    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
  />
              </div>

              <button
    type="submit"
    disabled={isSending}
    className="w-full py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
  >
                {isSending ? <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching...</span>
                  </> : <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Telegram</span>
                  </>}
              </button>
            </form>
          </div>}
      </motion.div>
    </div>;
};
