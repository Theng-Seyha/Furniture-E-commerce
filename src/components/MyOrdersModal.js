import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  PackageCheck, 
  ExternalLink, 
  Clock, 
  Trash2, 
  ShoppingBag, 
  ChevronRight, 
  Send, 
  Printer, 
  CheckCircle2,
  Calendar,
  MapPin,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { TELEGRAM_CONFIG } from '../services/telegramService';

export const MyOrdersModal = () => {
  const {
    isOrdersModalOpen,
    setIsOrdersModalOpen,
    savedOrders,
    deleteOrder,
    clearAllOrders,
    navigateTo,
    showToast
  } = useCart();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleTrackInPipeline = (orderId) => {
    setIsOrdersModalOpen(false);
    navigateTo('tracking');
    // Pre-populate or trigger lookup
    // We will ensure OrderStatusTracking picks this up via its internal sync logic or props
    localStorage.setItem('fur_last_lookup_id', orderId);
  };

  return (
    <AnimatePresence>
      {isOrdersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/65 backdrop-blur-xs overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#FAF8F5] dark:bg-[#161412] text-stone-900 dark:text-stone-100 max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col relative"
          >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between bg-white dark:bg-stone-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                My Submitted Orders
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Archived in local storage from checkout completions ({savedOrders.length} {savedOrders.length === 1 ? 'order' : 'orders'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {savedOrders.length > 0 && (
              <button
                onClick={() => setShowConfirmClear(true)}
                title="Clear order history"
                className="p-2 rounded-full text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer text-xs"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsOrdersModalOpen(false)}
              className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close orders modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clear All Confirmation Banner */}
        <AnimatePresence>
          {showConfirmClear && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-rose-50 dark:bg-rose-950/60 border-b border-rose-200 dark:border-rose-900/60 p-4 text-xs flex items-center justify-between shrink-0"
            >
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Delete all archived order records from this browser?</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="px-3 py-1 rounded-lg bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold cursor-pointer border border-stone-200 dark:border-stone-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    clearAllOrders();
                    setShowConfirmClear(false);
                    setSelectedOrder(null);
                  }}
                  className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold cursor-pointer shadow-xs"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Body */}
        <div className="grow overflow-y-auto p-4 sm:p-6 space-y-4">
          {savedOrders.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-400 dark:text-stone-500 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-serif font-bold text-stone-800 dark:text-stone-200">
                No Previous Orders Yet
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm">
                When you complete an order in the checkout process, the invoice and handcrafted tracking spec will automatically be archived here.
              </p>
              <button
                onClick={() => {
                  setIsOrdersModalOpen(false);
                  navigateTo('shop');
                }}
                className="mt-6 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                Browse Furniture Pieces
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedOrders.map((order) => {
                const isExpanded = selectedOrder?.orderId === order.orderId;
                const itemsCount = (order.items || []).reduce((acc, it) => acc + (it.quantity || 1), 0);

                return (
                  <div
                    key={order.orderId}
                    className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs transition-all"
                  >
                    {/* Order Summary Top Line */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-stone-100 dark:border-stone-800/80">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100 px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700/60">
                          {order.orderId}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Transmitted to Workshop
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {order.orderDate || 'Recent'}
                        </span>
                        <span className="font-serif font-bold text-sm text-amber-800 dark:text-amber-400">
                          ${(order.total || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Customer & Destination overview */}
                    <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-600 dark:text-stone-300 gap-2">
                      <div className="flex items-center gap-4 flex-wrap">
                        <span>
                          <strong className="text-stone-900 dark:text-stone-100">Client:</strong> {order.customerName}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          {order.address}, {order.deliveryCity}
                        </span>
                      </div>

                      <div className="text-[11px] text-stone-400">
                        {itemsCount} {itemsCount === 1 ? 'item' : 'items'} • {order.paymentMethod || 'Telegram Pay'}
                      </div>
                    </div>

                    {/* Item Thumbnails / Listing */}
                    <div className="bg-stone-50 dark:bg-stone-950/50 rounded-xl p-3 border border-stone-200/60 dark:border-stone-800/60 space-y-2">
                      {(order.items || []).map((it, idx) => {
                        const itName = it.name || it.product?.name || 'Custom Specimen Piece';
                        const itColor = it.selectedColor || it.color || 'Standard Finish';
                        const itQty = it.quantity || 1;
                        const itPrice = it.price || it.product?.price || 0;
                        const hasAssembly = it.includeAssembly || it.assembly;

                        return (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-800 text-[10px] font-bold flex items-center justify-center text-stone-700 dark:text-stone-300">
                                {itQty}x
                              </span>
                              <span className="font-medium text-stone-800 dark:text-stone-200">{itName}</span>
                              <span className="text-stone-400">({itColor})</span>
                              {hasAssembly && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 font-semibold">
                                  +Assembly
                                </span>
                              )}
                            </div>
                            <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                              ${(itPrice * itQty).toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Bar */}
                    <div className="mt-3.5 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        {/* Live Tracking in Pipeline */}
                        <button
                          onClick={() => handleTrackInPipeline(order.orderId)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Track Progress</span>
                        </button>

                        {/* Open Telegram */}
                        {order.telegramUrl && (
                          <a
                            href={order.telegramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-xs font-semibold border border-sky-200 dark:border-sky-800/60 transition-colors"
                          >
                            <Send className="w-3 h-3" />
                            <span>Telegram Bot</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              window.print();
                            }}
                            title="Print invoice"
                            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer text-xs"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                          {/* Remove this single order */}
                          <button
                            onClick={() => deleteOrder(order.orderId)}
                            title="Remove from history"
                            className="p-1.5 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer text-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer Info */}
        <div className="p-4 bg-white dark:bg-stone-900 border-t border-stone-200/80 dark:border-stone-800/80 text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between shrink-0">
          <span>Orders synchronized locally in browser storage</span>
          <button
            onClick={() => setIsOrdersModalOpen(false)}
            className="px-4 py-1.5 rounded-full bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold hover:opacity-90 cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  )}
  </AnimatePresence>
  );
};
