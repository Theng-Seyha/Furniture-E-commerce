import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  CheckCircle2,
  Clock,
  Send,
  Printer,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  MapPin,
  Calendar,
  User,
  Package,
  PackageCheck,
  Sparkles,
} from 'lucide-react';
import { TELEGRAM_CONFIG } from '../services/telegramService';
import { useCart } from '../context/CartContext';
import { HANDCRAFTED_STAGES, SAMPLE_ORDERS } from '../data/workshopStages';

export { HANDCRAFTED_STAGES, SAMPLE_ORDERS };

/**
 * OrderStatusTracking Component
 * Real-time handcrafted workflow pipeline tracker with high visual fidelity,
 * direct Telegram verification, interactive stage inspector, and search lookup.
 */
export const OrderStatusTracking = ({ initialOrderId }) => {
  const { showToast, savedOrders = [], setIsOrdersModalOpen } = useCart();

  // Search input state
  const [searchInput, setSearchInput] = useState('');
  const [activeOrder, setActiveOrder] = useState(SAMPLE_ORDERS['ANTI-849201']);
  const [selectedStageIndex, setSelectedStageIndex] = useState(3); // 0-indexed (Stage 4)
  const [copied, setCopied] = useState(false);
  const [recentStoredOrder, setRecentStoredOrder] = useState(null);

  // Check localStorage for recently placed session orders or requested lookups
  useEffect(() => {
    try {
      const lastLookup = localStorage.getItem('anti_last_lookup_id');
      const recent = localStorage.getItem('anti_recent_order');
      
      if (lastLookup) {
        handleLookup(lastLookup);
        localStorage.removeItem('anti_last_lookup_id'); // Clear after use
      } else if (initialOrderId) {
        handleLookup(initialOrderId);
      } else if (recent) {
        const parsed = JSON.parse(recent);
        setRecentStoredOrder(parsed);
      }
    } catch {
      // Ignore parse issues
    }
  }, [initialOrderId]);

  const handleLookup = (id) => {
    const cleanId = id.trim().toUpperCase();
    setSearchInput(cleanId);

    if (SAMPLE_ORDERS[cleanId]) {
      const ord = SAMPLE_ORDERS[cleanId];
      setActiveOrder(ord);
      setSelectedStageIndex(ord.currentStage - 1);
      if (showToast) showToast(`Loaded order ${cleanId}`);
      return;
    }

    // If order was stored in saved orders list (localStorage)
    const matchedSaved = savedOrders.find((o) => o.orderId === cleanId);
    if (matchedSaved) {
      const dynamicOrder = {
        orderId: matchedSaved.orderId,
        customerName: matchedSaved.customerName || 'Valued Client',
        productName: matchedSaved.items?.[0]?.name || matchedSaved.items?.[0]?.product?.name || 'Custom Studio Furniture Item',
        material: 'Kiln-Dried Hardwood & Sustainable Joinery',
        destination: `${matchedSaved.address || 'Phnom Penh'}, ${matchedSaved.deliveryCity || 'Cambodia'}`,
        orderDate: matchedSaved.orderDate || 'Today',
        estimatedDelivery: '5–7 Business Days',
        currentStage: 1, // Order Received
        progressPercent: 18,
        artisanLead: 'Theng Seyha',
        workshopBay: 'Intake Bay - Queue Scheduled',
        logs: [
          { time: 'Dispatched', note: 'Order dispatched to Telegram bot @FurnitureOnlineSellingbot. Workshop blueprinting queued.' }
        ]
      };
      setActiveOrder(dynamicOrder);
      setSelectedStageIndex(0);
      if (showToast) showToast(`Tracking your order ${cleanId}`);
      return;
    }

    // If order was stored in session localStorage
    try {
      const recent = localStorage.getItem('anti_recent_order');
      if (recent) {
        const parsed = JSON.parse(recent);
        if (parsed.orderId === cleanId) {
          const dynamicOrder = {
            orderId: parsed.orderId,
            customerName: parsed.customerName || 'Valued Client',
            productName: parsed.items?.[0]?.name || 'Custom Studio Furniture Item',
            material: 'Kiln-Dried Hardwood & Sustainable Joinery',
            destination: `${parsed.address || 'Phnom Penh'}, ${parsed.deliveryCity || 'Cambodia'}`,
            orderDate: parsed.orderDate || 'Today',
            estimatedDelivery: '5–7 Business Days',
            currentStage: 1, // Just received
            progressPercent: 18,
            artisanLead: 'Theng Seyha (Studio Intake)',
            workshopBay: 'Intake Bay - Queue Scheduled',
            logs: [
              { time: 'Just now', note: 'Order dispatched to Telegram bot @FurnitureOnlineSellingbot. Workshop blueprinting queued.' }
            ]
          };
          setActiveOrder(dynamicOrder);
          setSelectedStageIndex(0);
          if (showToast) showToast(`Tracking your recent order ${cleanId}`);
          return;
        }
      }
    } catch {
      // Ignore
    }

    // Dynamic generation for any typed order number to provide a seamless preview
    const hashNum = cleanId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const mockStage = (hashNum % 5) + 1;
    const mockPercent = Math.min(95, Math.max(15, mockStage * 18));
    const dynamicOrder = {
      orderId: cleanId,
      customerName: 'Studio Collector',
      productName: 'Handcrafted Solid Wood Commission',
      material: 'Kiln-Dried Solid Oak & Natural Plant Wax',
      destination: 'Phnom Penh, Cambodia',
      orderDate: 'Recent',
      estimatedDelivery: 'In Progress',
      currentStage: mockStage,
      progressPercent: mockPercent,
      artisanLead: 'Theng Seyha Studio Craftsmen',
      workshopBay: `Studio Workstation #${(hashNum % 4) + 1}`,
      logs: [
        { time: 'Today', note: `Workshop stage updated to ${HANDCRAFTED_STAGES[mockStage - 1].name}. Quality benchmarks aligned.` }
      ]
    };
    setActiveOrder(dynamicOrder);
    setSelectedStageIndex(mockStage - 1);
    if (showToast) showToast(`Displaying status for ${cleanId}`);
  };

  const handleCopyTracking = () => {
    const url = `${window.location.origin}/#order-tracking`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${url}?order=${activeOrder.orderId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (showToast) showToast('Tracking link copied to clipboard');
    }
  };

  const currentStageObj = HANDCRAFTED_STAGES[selectedStageIndex] || HANDCRAFTED_STAGES[0];
  const orderStageObj = HANDCRAFTED_STAGES[activeOrder.currentStage - 1] || HANDCRAFTED_STAGES[0];

  const directTelegramInquiryUrl = `${TELEGRAM_CONFIG.BOT_URL}?text=${encodeURIComponent(
    `Hello Theng Seyha! I am tracking order ${activeOrder.orderId} (${activeOrder.productName}). Could you please send me a live workshop photo from Stage ${activeOrder.currentStage}: ${orderStageObj.name}?`
  )}`;

  return (
    <section id="order-tracking" className="py-16 sm:py-24 bg-[#FAF8F5] dark:bg-[#121110] border-t border-stone-200/80 dark:border-stone-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>Live Artisan Workshop Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Order Status & Crafting Timeline
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
              We do not pull boxed flat-packs from a warehouse shelf. Every piece is built to order through six traditional woodworking stages in Phnom Penh.
            </p>
          </div>

          {/* Search Lookup Form */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLookup(searchInput)}
                placeholder="Enter Order ID (eg. ANTI-849201)"
                className="w-full pl-10 pr-3 py-2.5 rounded-full text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-700 dark:focus:ring-amber-500 transition-all font-mono"
                id="order-tracking-input"
              />
            </div>
            <button
              onClick={() => handleLookup(searchInput)}
              className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 text-xs font-semibold tracking-wide transition-colors cursor-pointer shrink-0 shadow-xs flex items-center justify-center gap-1.5"
              id="order-tracking-search-btn"
            >
              <span>Track Order</span>
            </button>
          </div>
        </div>

        {/* Demo Order Selector Pills */}
        <div className="mb-8 p-3 rounded-2xl bg-stone-100/70 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 px-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            Live Sample Orders:
          </span>
          {Object.values(SAMPLE_ORDERS).map((ord) => {
            const isSelected = activeOrder.orderId === ord.orderId;
            return (
              <button
                key={ord.orderId}
                onClick={() => handleLookup(ord.orderId)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-800 text-white shadow-xs font-semibold dark:bg-amber-600'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <span className="font-mono font-bold text-[11px]">{ord.orderId}</span>
                <span className="text-[10px] opacity-85 hidden md:inline">
                  • {HANDCRAFTED_STAGES[ord.currentStage - 1].shortLabel}
                </span>
              </button>
            );
          })}

          {recentStoredOrder && (
            <button
              onClick={() => handleLookup(recentStoredOrder.orderId)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-200 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Your Checkout Order ({recentStoredOrder.orderId})</span>
            </button>
          )}

          {/* View My Orders Trigger */}
          <button
            onClick={() => setIsOrdersModalOpen(true)}
            className="ml-auto px-3.5 py-1.5 rounded-full text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            id="view-my-orders-tracking-btn"
          >
            <PackageCheck className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
            <span>View My Orders ({savedOrders.length})</span>
          </button>
        </div>

        {/* Main Status Container */}
        <div className="bg-white dark:bg-[#181614] rounded-3xl border border-stone-200/90 dark:border-stone-800/90 shadow-xl overflow-hidden">
          
          {/* Order Meta Header Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-stone-900 via-stone-800 to-[#2A241F] text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold tracking-wider">
                  REF: {activeOrder.orderId}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-700/60 text-stone-300 text-xs font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-stone-400" />
                  Ordered: {activeOrder.orderDate}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/40 text-xs font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Est. Delivery: {activeOrder.estimatedDelivery}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
                {activeOrder.productName}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>Material: <b>{activeOrder.material}</b></span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {activeOrder.destination}
                </span>
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={directTelegramInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                id="order-telegram-live-photo-btn"
                title="Request live photo from bench"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask for Live Photo</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={handleCopyTracking}
                className="px-3.5 py-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy tracking link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                title="Print process certificate"
                aria-label="Print tracking status"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Overview Bar */}
          <div className="px-6 sm:px-8 py-6 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                <span>Current Stage:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 font-bold">
                  Stage {activeOrder.currentStage} of 6 — {orderStageObj.name}
                </span>
              </span>
              <span className="font-mono font-bold text-amber-800 dark:text-amber-400 text-sm tabular-nums">
                {activeOrder.progressPercent}% Complete
              </span>
            </div>

            {/* Smooth animated progress track */}
            <div className="w-full h-3 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${activeOrder.progressPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 rounded-full relative"
              >
                <span className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 animate-pulse" />
              </motion.div>
            </div>
          </div>

          {/* 6-Stage Timeline Stepper Navigation */}
          <div className="p-6 sm:p-8">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-6 flex items-center justify-between">
              <span>Interactive Workflow Timeline (Click any stage to inspect)</span>
              <span className="text-[11px] font-normal text-stone-400 lowercase italic">
                showing bench details
              </span>
            </div>

            {/* Timeline Stepper Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative">
              {HANDCRAFTED_STAGES.map((stage, idx) => {
                const Icon = stage.icon;
                const isCompleted = activeOrder.currentStage > stage.step;
                const isCurrent = activeOrder.currentStage === stage.step;
                const isSelected = selectedStageIndex === idx;

                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStageIndex(idx)}
                    className={`relative text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[140px] group ${
                      isSelected
                        ? 'border-amber-700 dark:border-amber-500 ring-2 ring-amber-700/20 dark:ring-amber-500/20 bg-amber-50/40 dark:bg-amber-950/20'
                        : isCurrent
                        ? 'border-amber-500/80 bg-amber-50/20 dark:bg-amber-950/10'
                        : isCompleted
                        ? 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30'
                        : 'border-stone-200/60 dark:border-stone-800/60 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {/* Top Row: Icon + Status Pill */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : isCurrent
                            ? 'bg-amber-700 text-white dark:bg-amber-600'
                            : 'bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>

                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                            : isCurrent
                            ? 'bg-amber-200/80 dark:bg-amber-900/80 text-amber-950 dark:text-amber-200 animate-pulse'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                        }`}
                      >
                        {isCompleted ? 'Done' : isCurrent ? 'Active' : `Step ${stage.step}`}
                      </span>
                    </div>

                    {/* Step Title & Standard Timeframe */}
                    <div>
                      <p className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
                        Stage 0{stage.step}
                      </p>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 mt-0.5 leading-snug group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                        {stage.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1">
                        {stage.duration}
                      </p>
                    </div>

                    {/* Active highlight dot */}
                    {isSelected && (
                      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-amber-700 dark:bg-amber-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Stage Deep Dive View: Craftsmanship Specs & Photography */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStageObj.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="mt-8 pt-8 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Workbench Details & Quality Checklist */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-[11px] font-bold uppercase tracking-wider font-mono">
                      Stage {currentStageObj.step} of 6
                    </span>
                    <span className="text-xs font-semibold text-amber-800 dark:text-amber-400">
                      Standard Time: {currentStageObj.standardTimeframe}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    {currentStageObj.headline}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {currentStageObj.description}
                  </p>

                  {/* Quality Checklist */}
                  <div className="pt-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-2.5">
                      Artisan Quality Checkpoints:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentStageObj.checklist.map((item, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Workshop Log & Artisan Assigned */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                        Assigned Artisan Lead
                      </span>
                      <p className="font-semibold text-stone-900 dark:text-stone-100 mt-0.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                        {activeOrder.artisanLead}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                        Workshop Bay
                      </span>
                      <p className="font-mono text-stone-700 dark:text-stone-300 mt-0.5">
                        {activeOrder.workshopBay}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Stage Workbench Photographic Specimen */}
                <div className="lg:col-span-5 relative">
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 shadow-lg bg-stone-100 dark:bg-stone-800">
                    <img
                      src={currentStageObj.image}
                      alt={currentStageObj.name}
                      className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-amber-300">
                        Phnom Penh Studio Bench
                      </p>
                      <p className="text-xs font-medium text-stone-200 mt-0.5">
                        {currentStageObj.name} — Handcrafted with FSC Timber
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bench Activity Feed Logs */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 dark:border-stone-800/80">
              <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                Live Bench Action Log for {activeOrder.orderId}:
              </h5>
              <div className="space-y-2">
                {activeOrder.logs.map((log, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 flex items-start gap-3 text-xs"
                  >
                    <span className="font-mono text-[11px] font-semibold text-stone-400 shrink-0 mt-0.5">
                      {log.time}
                    </span>
                    <span className="text-stone-700 dark:text-stone-300 leading-normal">
                      {log.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Direct Telegram Inquiry Callout */}
          <div className="px-6 py-4 bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400 text-center sm:text-left">
              <Package className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
              <span>
                Want to customize this piece before finishing? Contact <b>{TELEGRAM_CONFIG.OWNER_NAME}</b> directly.
              </span>
            </div>
            <a
              href={TELEGRAM_CONFIG.BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-sky-700 dark:text-sky-400 hover:underline cursor-pointer"
            >
              <span>Chat with Workshop on Telegram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
