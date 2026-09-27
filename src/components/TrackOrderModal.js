import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Search, 
  Package, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Send, 
  Loader2,
  AlertCircle,
  MapPin,
  Calendar,
  User,
  PackageCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getOrderStatusFromShop, TELEGRAM_CONFIG } from '../services/telegramService';
import { HANDCRAFTED_STAGES } from '../data/workshopStages';

/**
 * TrackOrderModal
 * Standalone modal that allows users to quickly verify order status with the workshop bot.
 */
export const TrackOrderModal = () => {
  const { 
    isTrackOrderModalOpen, 
    setIsTrackOrderModalOpen, 
    showToast,
    notifyTelegramResult,
    savedOrders = []
  } = useCart();

  const [orderId, setOrderId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [statusResult, setStatusResult] = useState(null);
  const [error, setError] = useState('');
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Auto-fill from most recent if available
  useEffect(() => {
    if (isTrackOrderModalOpen && !orderId) {
      const recent = localStorage.getItem('fur_recent_order');
      if (recent) {
        try {
          const parsed = JSON.parse(recent);
          if (parsed.orderId) setOrderId(parsed.orderId);
        } catch (e) {}
      }
    }
  }, [isTrackOrderModalOpen, orderId]);

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!orderId.trim()) {
      setError('Please enter your Order ID');
      return;
    }

    setIsSearching(true);
    setError('');
    setStatusResult(null);

    // Call service to fetch real-time status
    const result = await getOrderStatusFromShop(orderId, { notifyTelegram: true });
    setIsSearching(false);

    if (result.found) {
      setStatusResult(result);
      setActiveStageIndex(result.currentStage - 1);
      notifyTelegramResult(true, 'Workshop status');
    } else {
      setError(result.message || 'Order not found in our bench records.');
    }
  };

  const handleClose = () => {
    setIsTrackOrderModalOpen(false);
    setStatusResult(null);
    setError('');
  };

  return (
    <AnimatePresence>
      {isTrackOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/65 backdrop-blur-xs overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-[#181614] max-w-2xl w-full rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 relative text-stone-900 dark:text-stone-100 overflow-hidden max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold">Workshop Tracker</h3>
                  <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Live Production Pipeline</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
              {/* Search Form */}
              <div className="bg-stone-50 dark:bg-stone-900/40 p-5 rounded-2xl border border-stone-200 dark:border-stone-800">
                <form onSubmit={handleTrack} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="modal-order-id" className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-tight">
                      Telegram Order ID
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          id="modal-order-id"
                          type="text"
                          value={orderId}
                          onChange={(e) => {
                            setOrderId(e.target.value);
                            if (error) setError('');
                          }}
                          placeholder="e.g. FUR-849201"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 outline-hidden transition-all text-sm font-mono"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSearching}
                        className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-sm hover:bg-amber-800 dark:hover:bg-amber-200 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                      >
                        {isSearching ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ArrowRight className="w-4 h-4" />
                        )}
                        Track
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <p className="text-[10px] text-stone-400">
                    Enter the reference number sent to your Telegram after checkout.
                  </p>
                </form>
              </div>

              {/* Saved Orders Quick Access */}
              {savedOrders.length > 0 && !statusResult && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-500 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    Recently Placed Orders
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {savedOrders.slice(0, 4).map((ord) => (
                      <button
                        key={ord.orderId}
                        onClick={() => {
                          setOrderId(ord.orderId);
                          // Trigger track immediately
                          const id = ord.orderId;
                          setTimeout(() => {
                            getOrderStatusFromShop(id).then(res => {
                              if (res.found) {
                                setStatusResult(res);
                                setActiveStageIndex(res.currentStage - 1);
                              }
                            });
                          }, 50);
                        }}
                        className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 hover:bg-amber-50/20 dark:hover:bg-amber-950/10 text-left transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono font-bold text-stone-900 dark:text-stone-100">{ord.orderId}</span>
                          <PackageCheck className="w-3 h-3 text-stone-300 group-hover:text-amber-500 transition-colors" />
                        </div>
                        <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">{ord.orderDate}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Result Display */}
              {statusResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                  {/* Summary Card */}
                  <div className="bg-gradient-to-br from-stone-900 to-stone-800 p-5 rounded-2xl text-white">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold tracking-wider uppercase">
                        Active Order
                      </span>
                    </div>
                    <h4 className="text-lg font-serif font-bold leading-tight">{statusResult.productName}</h4>
                    <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <div className="text-[10px] flex flex-col">
                          <span className="text-stone-400">Order Date</span>
                          <span className="font-semibold">{statusResult.orderDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <div className="text-[10px] flex flex-col">
                          <span className="text-stone-400">Destination</span>
                          <span className="font-semibold truncate">{statusResult.destination.split(',')[0]}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Visualization */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-tight">
                        Stage {statusResult.currentStage}: {statusResult.stageName}
                      </span>
                      <span className="font-mono font-bold text-amber-700 dark:text-amber-400">{statusResult.progressPercent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden border border-stone-200 dark:border-stone-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${statusResult.progressPercent}%` }}
                        className="h-full bg-amber-600 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2.5">
                    {HANDCRAFTED_STAGES.map((stage, idx) => {
                      const isCompleted = statusResult.currentStage > stage.step;
                      const isCurrent = statusResult.currentStage === stage.step;
                      return (
                        <div 
                          key={stage.id} 
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                            isCurrent 
                              ? 'border-amber-500 bg-amber-50/30 dark:bg-amber-950/20' 
                              : isCompleted 
                              ? 'border-stone-100 dark:border-stone-800 opacity-60' 
                              : 'border-transparent opacity-30'
                          }`}
                        >
                          <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            isCompleted ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-amber-600 text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="text-[10px] font-bold">{stage.step}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className={`text-xs font-bold ${isCurrent ? 'text-stone-900 dark:text-stone-100' : 'text-stone-500 dark:text-stone-400'}`}>
                              {stage.name}
                            </h5>
                            {isCurrent && (
                              <p className="text-[10px] text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed">
                                {stage.description.slice(0, 85)}...
                              </p>
                            )}
                          </div>
                          {isCurrent && <span className="text-[9px] font-bold uppercase text-amber-700 dark:text-amber-500 bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded">Active</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Log Excerpt */}
                  <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      Recent Bench Log
                    </h5>
                    <div className="space-y-3">
                      {statusResult.logs.slice(0, 2).map((log, i) => (
                        <div key={i} className="flex gap-2 text-[11px]">
                          <span className="font-mono text-stone-400 shrink-0">{log.time}:</span>
                          <span className="text-stone-600 dark:text-stone-300 italic">"{log.note}"</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={statusResult.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Inquire on Telegram
                    </a>
                    <button
                      onClick={() => {
                        handleClose();
                        // Navigate to full tracking page
                        window.location.hash = `tracking?order=${statusResult.orderId}`;
                      }}
                      className="flex-1 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Full Analysis Dashboard
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-stone-50 dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 flex items-center justify-center shrink-0">
              <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-medium">
                <Send className="w-3 h-3" />
                <span>Verification provided by @{TELEGRAM_CONFIG.BOT_USERNAME}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
