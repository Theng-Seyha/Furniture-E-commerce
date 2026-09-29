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
    setIsOrdersModalOpen,
    notifyTelegramResult
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("Phnom Penh");
  const [notes, setNotes] = useState("");
  const [validationError, setValidationError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Telegram Pay / ABA");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  // 1. Strict Name input handler: contains ONLY text / letters (never numbers)
  const handleNameChange = (e) => {
    // Strips all numbers and disallowed symbols; allows letters, spaces, hyphens, periods, apostrophes, and Khmer script
    const cleanValue = e.target.value.replace(/[^a-zA-Z\s\u1780-\u17FF'.-]/g, "");
    setCustomerName(cleanValue);
    if (validationError) setValidationError("");
  };

  // 2. Phone input handler: accepts numbers, leading +, spaces and dashes
  const handlePhoneChange = (e) => {
    const cleanValue = e.target.value.replace(/[^\d+ -]/g, "");
    setPhoneNumber(cleanValue);
    if (validationError) setValidationError("");
  };

  // 3. City input handler: text only
  const handleCityChange = (e) => {
    const cleanValue = e.target.value.replace(/[^a-zA-Z\s\u1780-\u17FF-]/g, "");
    setDeliveryCity(cleanValue);
    if (validationError) setValidationError("");
  };

  // 4. Telegram input handler: @ and alphanumeric
  const handleTelegramChange = (e) => {
    const cleanValue = e.target.value.replace(/[^a-zA-Z0-9_@]/g, "");
    setTelegramUsername(cleanValue);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    // Strict Name Validation: must contain only letters, no digits, min 2 chars
    const trimmedName = customerName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setValidationError("Full Name is required (letters only, at least 2 characters).");
      if (showToast) showToast("Please enter a valid full name");
      return;
    }
    if (/\d/.test(trimmedName)) {
      setValidationError("Full Name must contain only text and cannot include numbers.");
      if (showToast) showToast("Full Name cannot include numbers");
      return;
    }

    // Strict Phone Validation: must contain only numbers, at least 8 digits
    const rawDigits = phoneNumber.replace(/\D/g, "");
    if (!rawDigits || rawDigits.length < 8 || rawDigits.length > 15) {
      setValidationError("Phone Number must contain only numbers (at least 8-9 digits, e.g. 012 345 678 or +855 714 607 603).");
      if (showToast) showToast("Please enter a valid phone number with only numbers");
      return;
    }

    // Strict Address Validation: minimum 5 characters
    const trimmedAddress = address.trim();
    if (!trimmedAddress || trimmedAddress.length < 5) {
      setValidationError("Please enter a complete delivery address (street, building or house number, at least 5 characters).");
      if (showToast) showToast("Please provide your complete delivery street address");
      return;
    }

    setValidationError("");
    setIsSubmitting(true);

    const orderData = {
      customerName: trimmedName,
      phoneNumber,
      telegramUsername,
      address: trimmedAddress,
      deliveryCity: deliveryCity.trim() || "Phnom Penh",
      notes: notes.trim(),
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
    
    if (recordNewOrder) {
      recordNewOrder(completedResult);
    }

    setOrderResult(completedResult);
    notifyTelegramResult(result.sent, 'Order');
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/65 backdrop-blur-xs overflow-y-auto overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-stone-900 max-w-xl w-full max-h-[92vh] overflow-y-auto overflow-x-hidden rounded-3xl p-5 sm:p-7 shadow-2xl border border-stone-200 dark:border-stone-800 relative text-stone-900 dark:text-stone-100 flex flex-col"
          >
            {/* Modal Dedicated Top Header Bar - Keeps Close Button (X) completely clean and separated out of the text */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-100 dark:border-stone-800/80 shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-[11px] font-semibold flex items-center gap-1">
                  <Send className="w-3 h-3" />
                  Telegram Instant Dispatch
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 flex items-center justify-center text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-all cursor-pointer shadow-2xs border border-stone-200/60 dark:border-stone-700/60 active:scale-95 shrink-0"
                aria-label="Close checkout"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

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
                  
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 text-xs font-mono font-semibold border border-amber-200 dark:border-amber-800">
                    <span>Order Ref:</span>
                    <b>{orderResult.orderId}</b>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-300 max-w-md mx-auto mt-3 leading-relaxed">
                    Thank you, <b>{orderResult.customerName}</b>. Your order details and timber specification manifest have been dispatched directly to <b>@{TELEGRAM_CONFIG.BOT_USERNAME}</b>.
                  </p>
                </div>

                {/* Printable Order Ticket Box */}
                <div id="printable-order-ticket" className="my-5 p-5 sm:p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-left text-xs space-y-3 font-mono print:border-black print:bg-white print:text-black">
                  <div className="flex justify-between items-start border-b border-stone-200 dark:border-stone-700 pb-3 print:border-black">
                    <div>
                      <h4 className="font-bold text-sm tracking-tight font-serif text-stone-900 dark:text-stone-100 print:text-black">
                        FUR STUDIO & WORKSHOP
                      </h4>
                      <p className="text-[10px] text-stone-500 print:text-stone-700">Official Artisanal Order Ticket</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-amber-800 dark:text-amber-400 print:text-black">{orderResult.orderId}</p>
                      <p className="text-[10px] text-stone-500 print:text-stone-700">{orderResult.orderDate}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-stone-500 dark:text-stone-400 block text-[9px] uppercase tracking-wider print:text-stone-700">Customer:</span>
                      <span className="font-bold text-stone-900 dark:text-stone-100 print:text-black">{orderResult.customerName}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 dark:text-stone-400 block text-[9px] uppercase tracking-wider print:text-stone-700">Phone:</span>
                      <span className="font-bold text-stone-900 dark:text-stone-100 print:text-black">{orderResult.phoneNumber}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-stone-500 dark:text-stone-400 block text-[9px] uppercase tracking-wider print:text-stone-700">Destination:</span>
                      <span className="text-stone-900 dark:text-stone-100 print:text-black">{orderResult.address}, {orderResult.deliveryCity}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 dark:text-stone-400 block text-[9px] uppercase tracking-wider print:text-stone-700">Payment:</span>
                      <span className="font-semibold text-stone-900 dark:text-stone-100 print:text-black">{orderResult.paymentMethod}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 dark:text-stone-400 block text-[9px] uppercase tracking-wider print:text-stone-700">Total:</span>
                      <span className="font-bold text-amber-800 dark:text-amber-400 text-xs print:text-black">${orderResult.total?.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Itemized list in receipt */}
                  <div className="border-t border-stone-200 dark:border-stone-700 pt-2 print:border-black">
                    <span className="text-[9px] text-stone-500 block uppercase tracking-wider mb-1 print:text-stone-700">Commissioned Pieces:</span>
                    <div className="space-y-1">
                      {orderResult.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-[11px]">
                          <span>{item.quantity}x {item.product.name} ({item.selectedColor})</span>
                          <span>${(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 print:hidden">
                  <button
                    onClick={handlePrintTicket}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors cursor-pointer border border-stone-300 dark:border-stone-700"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Order Ticket</span>
                  </button>

                  <button
                    onClick={() => {
                      handleClose();
                      if (setIsOrdersModalOpen) {
                        setIsOrdersModalOpen(true);
                      }
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 text-xs font-semibold transition-colors cursor-pointer border border-amber-200 dark:border-amber-800"
                  >
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>View in My Orders</span>
                  </button>

                  <a
                    href={orderResult.telegramUrl || TELEGRAM_CONFIG.BOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Open in Telegram</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>

                  <button
                    onClick={handleClose}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Input Form */
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Delivery & Payment Details
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Please enter your real delivery information. Your invoice and order specs will be dispatched directly to our workshop Telegram bot.
                </p>

                {validationError && (
                  <div className="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitOrder} className="mt-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={handleNameChange}
                        placeholder="eg. Theng Seyha"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700 text-stone-900 dark:text-stone-100 placeholder-stone-400"
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
                        onChange={handlePhoneChange}
                        placeholder="eg. +855 714 607 603"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700 text-stone-900 dark:text-stone-100 placeholder-stone-400"
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
                        onChange={handleTelegramChange}
                        placeholder="@yourhandle"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700 text-stone-900 dark:text-stone-100 placeholder-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        City / Province
                      </label>
                      <input
                        type="text"
                        value={deliveryCity}
                        onChange={handleCityChange}
                        placeholder="Phnom Penh"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700 text-stone-900 dark:text-stone-100 placeholder-stone-400"
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
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (validationError) setValidationError("");
                      }}
                      placeholder="Street, building name, apartment / condo unit number"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700 text-stone-900 dark:text-stone-100 placeholder-stone-400"
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
                      ].map((p) => (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => setPaymentMethod(p.id)}
                          className={`py-2 px-2 text-[11px] font-medium rounded-xl border text-center transition-colors cursor-pointer ${
                            paymentMethod === p.id
                              ? "border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold"
                              : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
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
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-hidden focus:ring-1 focus:ring-amber-700 text-stone-900 dark:text-stone-100 placeholder-stone-400"
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
                      <span>Estimated Shipping:</span>
                      <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-700 text-sm font-bold text-stone-900 dark:text-stone-100">
                      <span>Total Estimated:</span>
                      <span className="text-amber-800 dark:text-amber-400">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full py-3.5 px-4 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white font-semibold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 active:scale-98"
                    id="checkout-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Transmitting Order to Telegram...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Complete Order & Dispatch to Workshop (${total.toLocaleString()})</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
