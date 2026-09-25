import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Send,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Search,
  Package,
  Clock,
  Sparkles,
  AlertCircle,
  Truck,
  RotateCcw,
  Check
} from "lucide-react";
import { useCart } from "../context/CartContext";
import {
  sendInquiryToTelegram,
  getOrderStatusFromShop,
  TELEGRAM_CONFIG
} from "../services/telegramService";

export const TelegramContactModal = () => {
  const { isTelegramModalOpen, setIsTelegramModalOpen, showToast, navigateTo } = useCart();

  // Active Tab: 'inquiry' or 'status'
  const [activeTab, setActiveTab] = useState("status");

  // Status Search State
  const [statusOrderId, setStatusOrderId] = useState("");
  const [isSearchingStatus, setIsSearchingStatus] = useState(false);
  const [statusResult, setStatusResult] = useState(null);
  const [statusError, setStatusError] = useState("");
  const [statusCopied, setStatusCopied] = useState(false);

  // Inquiry Form State
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState("Custom Furniture Commission");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleStatusSearch = async (e) => {
    if (e) e.preventDefault();
    if (!statusOrderId.trim()) {
      setStatusError("Please enter an Order ID (e.g. FUR-849201).");
      return;
    }

    setIsSearchingStatus(true);
    setStatusError("");
    setStatusResult(null);

    // Call real-time status lookup
    const res = await getOrderStatusFromShop(statusOrderId, { notifyTelegram: true });
    setIsSearchingStatus(false);

    if (res.found) {
      setStatusResult(res);
      if (showToast) showToast(`Order ${res.orderId} verified with workshop.`);
    } else {
      setStatusError(res.message || "Order ID not found.");
    }
  };

  const handleInquirySubmit = async (e) => {
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
    setStatusResult(null);
    setStatusError("");
  };

  const handleSelectSample = (sampleId) => {
    setStatusOrderId(sampleId);
    setStatusError("");
    // Automatically trigger search
    setTimeout(() => {
      getOrderStatusFromShop(sampleId, { notifyTelegram: false }).then((res) => {
        if (res.found) {
          setStatusResult(res);
        }
      });
    }, 50);
  };

  return (
    <AnimatePresence>
      {isTelegramModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/65 backdrop-blur-xs overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-stone-900 max-w-xl w-full rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 dark:border-stone-800 relative text-stone-900 dark:text-stone-100 max-h-[92vh] overflow-y-auto"
          >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-semibold mb-1">
            <Send className="w-4 h-4" />
            <span>Telegram Bot Integration • @{TELEGRAM_CONFIG.BOT_USERNAME}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Fur Workshop Terminal
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Direct integration with founder <b>{TELEGRAM_CONFIG.OWNER_NAME}</b> and Phnom Penh bench queue.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-stone-800 mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("status")}
            className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "status"
                ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-50 shadow-xs font-bold"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            }`}
          >
            <Package className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>Get Order Status</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("inquiry")}
            className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "inquiry"
                ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-50 shadow-xs font-bold"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            }`}
          >
            <Send className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Send Direct Message</span>
          </button>
        </div>

        {/* TAB 1: GET ORDER STATUS FEATURE */}
        {activeTab === "status" && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                Live Workshop Verification:
              </span>{" "}
              Enter your Studio Order ID below to query bench logs, crafting stage, and generate a real-time Telegram status sync.
            </div>

            {/* Order Lookup Input Form */}
            <form onSubmit={handleStatusSearch} className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                Input Order ID:
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={statusOrderId}
                    onChange={(e) => {
                      setStatusOrderId(e.target.value.toUpperCase());
                      setStatusError("");
                    }}
                    placeholder="eg. FUR-849201"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs font-mono font-medium rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-amber-700 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearchingStatus}
                  className="px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 disabled:opacity-50 shadow-xs"
                >
                  {isSearchingStatus ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-3.5 h-3.5" />
                      <span>Check Status</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Sample Selector */}
            <div className="pt-1">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
                Quick Test Sample Orders:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["FUR-849201", "FUR-392104", "FUR-712048", "FUR-502931"].map((sId) => (
                  <button
                    key={sId}
                    type="button"
                    onClick={() => handleSelectSample(sId)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
                  >
                    {sId}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {statusError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{statusError}</span>
              </div>
            )}

            {/* Real-time Order Status Result Display */}
            {statusResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-3.5 text-xs"
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-700/80 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                      Live Workshop Report
                    </span>
                    <span className="font-mono text-sm font-bold text-stone-900 dark:text-stone-100">
                      {statusResult.orderId}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                    Stage {statusResult.currentStage} of 6: {statusResult.stageName}
                  </span>
                </div>

                {/* Piece Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-600 dark:text-stone-300">
                  <div>
                    <span className="text-[11px] text-stone-400 block">Furniture Piece:</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      {statusResult.productName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 block">Customer & Destination:</span>
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      {statusResult.customerName} • {statusResult.destination}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 block">Timber & Finish:</span>
                    <span className="font-medium text-stone-800 dark:text-stone-200">
                      {statusResult.material}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 block">Estimated Arrival:</span>
                    <span className="font-medium text-amber-800 dark:text-amber-400">
                      {statusResult.estimatedDelivery}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-[11px] font-medium text-stone-500 dark:text-stone-400 mb-1">
                    <span>Handcrafting Completion</span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {statusResult.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
                    <div
                      className="h-full bg-amber-700 dark:bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${statusResult.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Latest Bench Log */}
                {statusResult.logs && statusResult.logs[0] && (
                  <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-700/70 text-[11px]">
                    <span className="font-semibold text-stone-900 dark:text-stone-100 mr-1.5">
                      Latest Bench Note ({statusResult.logs[0].time}):
                    </span>
                    <span className="text-stone-600 dark:text-stone-400">
                      {statusResult.logs[0].note}
                    </span>
                  </div>
                )}

                {/* Action Buttons: Telegram Sync + Pipeline Viewer */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <a
                    href={statusResult.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Open Update on Telegram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      localStorage.setItem("fur_last_lookup_id", statusResult.orderId);
                      navigateTo("tracking");
                    }}
                    className="py-2.5 px-4 rounded-full bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 text-stone-900 dark:text-stone-100 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    <span>View Full 6-Stage Timeline</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Quick Open Bot Callout */}
            <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 dark:border-stone-800">
              <span>Direct Bot: @{TELEGRAM_CONFIG.BOT_USERNAME}</span>
              <a
                href={TELEGRAM_CONFIG.BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 dark:text-sky-400 font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>Open Bot Channel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: SEND DIRECT INQUIRY */}
        {activeTab === "inquiry" && (
          <div>
            {sentSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Message Transmitted!
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-sm mx-auto leading-relaxed">
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
                    className="px-6 py-2.5 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 text-xs font-semibold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="eg. Theng Seyha"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700 text-stone-900 dark:text-stone-100"
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
                    placeholder="eg. +855 714 607 603 or @username"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden text-stone-900 dark:text-stone-100"
                  >
                    <option value="Custom Furniture Commission">Custom Furniture Commission</option>
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
                    placeholder="Tell us what you're looking for or your order questions..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching to Telegram...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message to Theng Seyha</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )}
  </AnimatePresence>
  );
};
