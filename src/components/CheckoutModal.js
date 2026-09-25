import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2, Loader2, ExternalLink, Wrench, Printer, FileText, Clock, AlertCircle, PackageCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { sendOrderToTelegram, TELEGRAM_CONFIG } from "../services/telegramService";
export const CheckoutModal = () => {
  const {
    cart,
    subtotal,
    assemblyTotal,
    discount,
    promoCode,
    shipping,
    total,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    navigateTo,
    showToast,
    recordNewOrder,
    setIsOrdersModalOpen
  } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("Phnom Penh");
  const [notes, setNotes] = useState("");
  const [validationError, setValidationError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(
    "Telegram Pay / ABA"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !phoneNumber.trim() || !address.trim()) {
      setValidationError("Please enter your name, phone number, and delivery address.");
      if (showToast) showToast("Please fill in required delivery details");
      return;
    }
    setValidationError("");
    setIsSubmitting(true);
    const orderData = {
      customerName,
      phoneNumber,
      telegramUsername,
      address,
      deliveryCity,
      notes,
      paymentMethod,
      items: [...cart],
      subtotal,
      assemblyFee: assemblyTotal,
      discount,
      shipping,
      total,
      promoCode,
      orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    const result = await sendOrderToTelegram(orderData);
    setIsSubmitting(false);
    const assignedOrderId = result.orderId || `FUR-${Math.floor(1e5 + Math.random() * 9e5)}`;
    const completedResult = {
      success: true,
      orderId: assignedOrderId,
      telegramUrl: result.telegramUrl,
      orderDate: orderData.orderDate,
      ...orderData
    };
    
    // Save to localStorage for the Order Status Tracking section and My Orders history
    try {
      localStorage.setItem('fur_recent_order', JSON.stringify(completedResult));
    } catch (err) {
      console.warn("Storage warning:", err);
    }

    if (recordNewOrder) {
      recordNewOrder(completedResult);
    }

    setOrderResult(completedResult);
    if (showToast) showToast(`Order ${assignedOrderId} transmitted to workshop!`);
    clearCart();
  };
  const handlePrintTicket = () => {
    window.print();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderResult(null);
    setValidationError("");
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-stone-900 max-w-xl w-full max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 relative text-stone-900 dark:text-stone-100"
          >
        <button
    onClick={handleClose}
    className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
    aria-label="Close checkout"
  >
          <X className="w-5 h-5" />
        </button>

        {orderResult ? (
    /* Order Confirmation Screen & Printable Ticket */
    <div className="text-center py-2 print:p-0">
            <div className="print:hidden">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Order Transmitted to Workshop
              </h3>
              
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-md mx-auto">
                Your order receipt has been sent directly to <b>{TELEGRAM_CONFIG.OWNER_NAME}</b> via Telegram Bot (<code>@{TELEGRAM_CONFIG.BOT_USERNAME}</code>).
              </p>
            </div>

            {/* THE TICKET - This is optimized for both screen and PRINT */}
            <div className="my-6 p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-left space-y-4 print:border-0 print:bg-white print:p-0 print:text-black">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-700 pb-4 print:border-stone-300">
                <div>
                  <h4 className="text-lg font-serif font-bold tracking-tight">THE FUR STUDIO</h4>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Official Order Ticket</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono text-stone-400">REF: {orderResult.orderId}</p>
                  <p className="text-[10px] font-mono text-stone-400">{orderResult.orderDate}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs tabular-nums">
                <div className="flex justify-between text-stone-500 dark:text-stone-400 print:text-stone-600">
                  <span>Customer Details:</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100 print:text-black">{customerName}</span>
                </div>
                <div className="flex justify-between text-stone-500 dark:text-stone-400 print:text-stone-600">
                  <span>Contact:</span>
                  <span className="font-medium">{phoneNumber}</span>
                </div>
                <div className="flex justify-between text-stone-500 dark:text-stone-400 print:text-stone-600">
                  <span>Destination:</span>
                  <span className="font-medium text-right max-w-[200px]">{address}, {deliveryCity}</span>
                </div>
                {telegramUsername && (
                  <div className="flex justify-between text-stone-500 dark:text-stone-400 print:text-stone-600">
                    <span>Telegram:</span>
                    <span className="font-medium">{telegramUsername}</span>
                  </div>
                )}
              </div>

              {/* Items Table */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-700 space-y-3 print:border-stone-300">
                <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Order Manifest</p>
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-1">
                    <div className="w-8 h-8 rounded bg-stone-200 dark:bg-stone-700 flex-shrink-0 print:border print:border-stone-200">
                      <img src={item.image} alt="" className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{item.name}</p>
                      <p className="text-[10px] text-stone-500">{item.color} • Qty: {item.quantity}</p>
                    </div>
                    <div className="text-xs font-bold tabular-nums">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-700 space-y-1.5 text-xs tabular-nums print:border-stone-300">
                <div className="flex justify-between text-stone-500 dark:text-stone-400 print:text-stone-600">
                  <span>Workshop Subtotal:</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                {assemblyTotal > 0 && (
                  <div className="flex justify-between text-amber-800 dark:text-amber-400 font-medium">
                    <span>In-Home Assembly:</span>
                    <span>+${assemblyTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-500 dark:text-stone-400 print:text-stone-600">
                  <span>Studio Freight ({deliveryCity}):</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-700 text-sm font-bold text-amber-800 dark:text-amber-400 font-serif print:border-stone-300 print:text-black">
                  <span>Grand Total Due:</span>
                  <span className="text-lg">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-6 text-center print:block hidden">
                <p className="text-[10px] text-stone-400">
                  Thank you for choosing Fur Studio. Please keep this ticket for delivery verification.
                  Managed by Theng Seyha • Workshop ID: @{TELEGRAM_CONFIG.BOT_USERNAME}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 justify-center print:hidden">
              <button
                onClick={() => {
                  handleClose();
                  navigateTo('home', 'order-tracking');
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                <span>Track Handcrafted Progress</span>
              </button>

              <a
                href={orderResult.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Open Telegram Chat</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => {
                  handleClose();
                  setIsOrdersModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-stone-100 text-xs font-semibold transition-all border border-stone-200 dark:border-stone-700 cursor-pointer"
              >
                <PackageCheck className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>View My Orders</span>
              </button>

              <button
                onClick={handlePrintTicket}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-stone-100 text-xs font-semibold transition-all border border-stone-200 dark:border-stone-700 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Ticket</span>
              </button>

              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
  ) : (
    /* Checkout Input Form */
    <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-[11px] font-semibold flex items-center gap-1">
                <Send className="w-3 h-3" />
                Telegram Instant Dispatch
              </span>
            </div>
            
            <h3 className="text-2xl font-serif font-bold">Delivery & Payment Details</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Please enter your delivery information. Your invoice and order specs will be sent directly to our workshop Telegram bot.
            </p>

            {validationError && (
              <div className="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="mt-6 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Full Name *
                  </label>
                  <input
      type="text"
      required
      value={customerName}
      onChange={(e) => setCustomerName(e.target.value)}
      placeholder="eg. Theng Seyha"
      className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
    />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Phone Number (Telegram / WhatsApp) *
                  </label>
                  <input
      type="tel"
      required
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      placeholder="eg. +855 714 607 603"
      className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
    />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Telegram Handle (Optional)
                  </label>
                  <input
      type="text"
      value={telegramUsername}
      onChange={(e) => setTelegramUsername(e.target.value)}
      placeholder="@yourhandle"
      className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
    />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                    City / Province
                  </label>
                  <input
      type="text"
      value={deliveryCity}
      onChange={(e) => setDeliveryCity(e.target.value)}
      placeholder="Phnom Penh"
      className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
    />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Delivery Address & Street Details *
                </label>
                <textarea
      required
      rows={2}
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      placeholder="Street, building name, apartment / condo unit number"
      className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
    />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
      { id: "Telegram Pay / ABA", label: "ABA / KHQR Pay" },
      { id: "Cash on Delivery", label: "Cash on Delivery" },
      { id: "Credit / Debit Card", label: "Card" }
    ].map((p) => <button
      type="button"
      key={p.id}
      onClick={() => setPaymentMethod(p.id)}
      className={`py-2 px-2 text-[11px] font-medium rounded-xl border text-center transition-colors cursor-pointer ${paymentMethod === p.id ? "border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold" : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300"}`}
    >
                      {p.label}
                    </button>)}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Special Notes or Gate Instructions (Optional)
                </label>
                <input
      type="text"
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      placeholder="e.g. Please call 15 minutes before arrival, elevator available"
      className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
    />
              </div>

              {/* Order Price Calculator Summary snippet */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-1.5 text-xs tabular-nums">
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Items count:</span>
                  <span>{cart.reduce((s, i) => s + i.quantity, 0)} items</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                {assemblyTotal > 0 && (
                  <div className="flex justify-between text-amber-800 dark:text-amber-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Wrench className="w-3 h-3" />
                      White-Glove Assembly:
                    </span>
                    <span>+${assemblyTotal.toLocaleString()}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Discount ({promoCode}):</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>White-Glove Shipping:</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-stone-900 dark:text-stone-100 pt-1.5 border-t border-stone-200 dark:border-stone-700">
                  <span>Total Amount Due:</span>
                  <span className="text-base font-serif text-amber-800 dark:text-amber-400">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {
      /* Submit CTA */
    }
              <button
      type="submit"
      disabled={isSubmitting || cart.length === 0}
      className="w-full py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 font-semibold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
      id="submit-order-telegram-btn"
    >
                {isSubmitting ? <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching Order to Telegram...</span>
                  </> : <>
                    <Send className="w-4 h-4" />
                    <span>Send Order to Telegram Bot (@{TELEGRAM_CONFIG.BOT_USERNAME})</span>
                  </>}
              </button>

              <p className="text-[11px] text-center text-stone-400">
                Direct transmission to @{TELEGRAM_CONFIG.BOT_USERNAME} • Managed by Theng Seyha
              </p>
            </form>
          </div>
  )}
      </motion.div>
    </div>
  )}
  </AnimatePresence>
  );
};
