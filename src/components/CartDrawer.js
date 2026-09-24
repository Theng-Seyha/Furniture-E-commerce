import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Send, Truck, Wrench, PackageCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { TELEGRAM_CONFIG } from "../services/telegramService";
export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    toggleItemAssembly,
    clearCart,
    subtotal,
    assemblyTotal,
    discount,
    promoCode,
    applyPromoCode,
    shipping,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    total,
    setIsCheckoutOpen,
    navigateToProduct,
    savedOrdersCount,
    setIsOrdersModalOpen
  } = useCart();
  const [inputCode, setInputCode] = useState("");
  const [promoFeedback, setPromoFeedback] = useState(null);
  const handleApplyCode = (e) => {
    e.preventDefault();
    if (!inputCode) return;
    const res = applyPromoCode(inputCode);
    setPromoFeedback(res);
  };
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const shippingProgress = Math.min(100, subtotal / freeShippingThreshold * 100);
  return <AnimatePresence>
      {isCartOpen && <div className="fixed inset-0 z-50 overflow-hidden">
          {
    /* Backdrop */
  }
          <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setIsCartOpen(false)}
    className="absolute inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity"
  />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ type: "spring", damping: 28, stiffness: 280 }}
    className="w-screen max-w-md bg-[#FAF8F5] dark:bg-[#161412] text-stone-900 dark:text-stone-100 shadow-2xl flex flex-col"
  >
              
              {
    /* Header */
  }
              <div className="p-5 sm:p-6 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-800 dark:text-amber-500" />
                  <h2 className="text-lg font-serif font-bold">Your Cart</h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 font-bold">
                    {cart.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                </div>
                <button
    onClick={() => setIsCartOpen(false)}
    className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 cursor-pointer"
    aria-label="Close cart"
  >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {
    /* Free Shipping Calculator Progress Bar */
  }
              <div className="bg-stone-100/80 dark:bg-stone-900/90 px-6 py-3 border-b border-stone-200/70 dark:border-stone-800 text-xs">
                <div className="flex items-center justify-between text-stone-700 dark:text-stone-300 font-medium mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    {amountNeededForFreeShipping === 0 ? "You unlocked Free White-Glove Shipping!" : `Add $${amountNeededForFreeShipping.toLocaleString()} more for Free Shipping`}
                  </span>
                  <span className="font-bold text-amber-800 dark:text-amber-400">
                    {Math.round(shippingProgress)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
    className="h-full bg-amber-700 dark:bg-amber-500 transition-all duration-500 rounded-full"
    style={{ width: `${shippingProgress}%` }}
  />
                </div>
              </div>

              {
    /* Telegram Dispatch Banner */
  }
              <div className="bg-sky-50 dark:bg-sky-950/40 px-6 py-2 border-b border-sky-100 dark:border-sky-900/50 flex items-center justify-between text-[11px] text-sky-800 dark:text-sky-300">
                <span className="flex items-center gap-1.5">
                  <Send className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                  Direct order to @{TELEGRAM_CONFIG.BOT_USERNAME}
                </span>
                <span className="font-semibold">{TELEGRAM_CONFIG.OWNER_NAME}</span>
              </div>

              {
    /* Items List */
  }
              <div className="grow overflow-y-auto p-5 sm:p-6 space-y-4">
                {cart.length === 0 ? <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-400 mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-base font-serif font-semibold text-stone-800 dark:text-stone-200">
                      Your cart is empty
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xs">
                      Explore our handcrafted solid timber and bouclé pieces.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 mt-6">
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="px-6 py-2.5 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 text-xs font-semibold hover:opacity-90 cursor-pointer"
                      >
                        Browse Catalog
                      </button>
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          setIsOrdersModalOpen(true);
                        }}
                        className="px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700 text-xs font-semibold cursor-pointer border border-stone-200 dark:border-stone-700 flex items-center justify-center gap-1.5"
                      >
                        <PackageCheck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                        <span>View My Orders ({savedOrdersCount})</span>
                      </button>
                    </div>
                  </div> : cart.map((item) => <motion.div
    key={`${item.product.id}-${item.selectedColor}`}
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="flex flex-col p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 shadow-2xs space-y-2.5"
  >
                      <div className="flex gap-3">
                        {
    /* Image */
  }
                        <div
    onClick={() => {
      setIsCartOpen(false);
      navigateToProduct(item.product.id);
    }}
    className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 cursor-pointer"
  >
                          <img
    src={item.product.image}
    alt={item.product.name}
    className="w-full h-full object-cover hover:scale-105 transition-transform"
  />
                        </div>

                        {
    /* Content */
  }
                        <div className="grow flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4
    onClick={() => {
      setIsCartOpen(false);
      navigateToProduct(item.product.id);
    }}
    className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 line-clamp-1 hover:text-amber-800 cursor-pointer"
  >
                                {item.product.name}
                              </h4>
                              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                                Finish: {item.selectedColor || "Standard"}
                              </p>
                            </div>
                            <button
    onClick={() => removeFromCart(item.product.id, item.selectedColor)}
    className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer p-1"
    aria-label={`Remove ${item.product.name}`}
  >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1.5 border border-stone-200 dark:border-stone-700 rounded-full px-2 py-0.5 bg-stone-50 dark:bg-stone-800">
                              <button
    onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
    className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
    aria-label="Decrease quantity"
  >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-semibold px-1.5">{item.quantity}</span>
                              <button
    onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
    className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
    aria-label="Increase quantity"
  >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 font-serif">
                              ${(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {
    /* White-Glove In-Home Assembly Add-On Toggle */
  }
                      <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[11px]">
                        <label className="flex items-center gap-2 cursor-pointer text-stone-600 dark:text-stone-300">
                          <input
    type="checkbox"
    checked={!!item.includeAssembly}
    onChange={() => toggleItemAssembly(item.product.id, item.selectedColor)}
    className="rounded border-stone-300 text-amber-800 focus:ring-amber-700 cursor-pointer"
  />
                          <span className="flex items-center gap-1">
                            <Wrench className="w-3 h-3 text-stone-400" />
                            White-Glove Assembly (+${40 * item.quantity})
                          </span>
                        </label>
                        {item.includeAssembly && <span className="text-amber-800 dark:text-amber-400 font-semibold">
                            Included
                          </span>}
                      </div>
                    </motion.div>)}
              </div>

              {
    /* Cart Footer & Real-Time Price Calculator */
  }
              {cart.length > 0 && <div className="p-5 sm:p-6 border-t border-stone-200/80 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 backdrop-blur-xs space-y-3.5">
                  {
    /* Promo Code Form */
  }
                  <form onSubmit={handleApplyCode} className="flex gap-2">
                    <div className="relative grow">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
    type="text"
    value={inputCode}
    onChange={(e) => setInputCode(e.target.value)}
    placeholder="Promo code (Try: SUMMER25)"
    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 uppercase placeholder:normal-case focus:outline-hidden focus:ring-1 focus:ring-amber-700"
  />
                    </div>
                    <button
    type="submit"
    className="px-4 py-1.5 rounded-xl bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold hover:opacity-90 cursor-pointer"
  >
                      Apply
                    </button>
                  </form>

                  {promoFeedback && <p
    className={`text-[11px] ${promoFeedback.success ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
  >
                      {promoFeedback.message}
                    </p>}

                  {
    /* Pricing Breakdown Calculator */
  }
                  <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                    <div className="flex justify-between">
                      <span>Items Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>

                    {assemblyTotal > 0 && <div className="flex justify-between text-amber-800 dark:text-amber-400 font-medium">
                        <span>White-Glove Assembly</span>
                        <span>+${assemblyTotal.toLocaleString()}</span>
                      </div>}

                    {discount > 0 && <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                        <span>Discount ({promoCode})</span>
                        <span>-${discount.toLocaleString()}</span>
                      </div>}

                    <div className="flex justify-between">
                      <span>White-Glove Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                    </div>

                    <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex justify-between items-baseline text-base font-bold text-stone-900 dark:text-stone-100">
                      <span>Grand Total</span>
                      <span className="text-xl font-serif text-amber-800 dark:text-amber-400">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {
    /* Checkout Button */
  }
                  <button
    onClick={handleProceedToCheckout}
    className="w-full py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 font-semibold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
    id="cart-checkout-btn"
  >
                    <span>Proceed to Order Form</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-0.5">
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsOrdersModalOpen(true);
                      }}
                      className="text-stone-500 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 underline cursor-pointer flex items-center gap-1"
                    >
                      <PackageCheck className="w-3 h-3" />
                      <span>My Orders ({savedOrdersCount})</span>
                    </button>
                    <button
                      onClick={clearCart}
                      className="text-stone-400 hover:text-rose-500 underline cursor-pointer"
                    >
                      Clear cart
                    </button>
                  </div>
                </div>}

            </motion.div>
          </div>
        </div>}
    </AnimatePresence>;
};
