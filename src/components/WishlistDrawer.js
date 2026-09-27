import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  Share2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * Clean & Responsive Wishlist / Saved Items Drawer
 * Optimized for mobile, tablet, and desktop viewports with zero clutter.
 */
export const WishlistDrawer = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    clearWishlist,
    addToCart,
    navigateToProduct,
    navigateTo,
    setSelectedCategory,
    showToast,
  } = useCart();

  const handleShareWishlist = () => {
    try {
      const url = window.location.origin + window.location.pathname + '#shop';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
      }
      showToast('Curation link copied! Share with your partner or client.');
    } catch {
      showToast('Curation link ready to share.');
    }
  };

  const handleMoveAllToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((item) => {
      const color = item.colors?.[0]?.name || 'Standard';
      addToCart(item, 1, color);
    });
    showToast(`Added all ${wishlist.length} saved pieces to your cart!`);
    setIsWishlistOpen(false);
  };

  const handleSelectQuickCategory = (catName) => {
    if (setSelectedCategory) {
      setSelectedCategory(catName);
    }
    setIsWishlistOpen(false);
    navigateTo('shop');
  };

  const totalValue = wishlist.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Wrapper - Full width on mobile, sleek slide-out on tablet/desktop */}
          <div className="fixed inset-y-0 right-0 max-w-full flex w-full sm:w-auto">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-full sm:w-[440px] md:w-[480px] bg-[#FAF8F5] dark:bg-[#161513] text-stone-900 dark:text-stone-100 shadow-2xl flex flex-col border-l border-stone-200/80 dark:border-stone-800/80 h-full"
            >
              {/* 1. Header */}
              <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-stone-200/70 dark:border-stone-800/80 bg-white/70 dark:bg-[#191816]/70 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200/60 dark:border-rose-900/60 flex items-center justify-center text-rose-600 dark:text-rose-400">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif text-base sm:text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100">
                        Saved Pieces
                      </h2>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/60 tabular-nums">
                        {wishlist.length}
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 hidden sm:block">
                      Private curation &amp; material shortlist
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5">
                  {wishlist.length > 0 && (
                    <>
                      <button
                        onClick={handleShareWishlist}
                        className="p-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                        title="Share curation link"
                        aria-label="Share wishlist"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={clearWishlist}
                        className="p-2 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer text-xs"
                        title="Clear all saved pieces"
                        aria-label="Clear wishlist"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="p-2 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 rounded-full hover:bg-stone-200/70 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                    aria-label="Close saved items drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 2. Scrollable List of Pieces */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3 sm:space-y-3.5 scrollbar-thin">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-2">
                    <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40 flex items-center justify-center text-rose-500 dark:text-rose-400 mb-4 shadow-xs">
                      <Heart className="w-7 h-7" />
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                      Your Wishlist is Empty
                    </h3>

                    <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mt-1.5 mb-6 leading-relaxed">
                      Tap the heart icon on any handcrafted piece while browsing to save it to your private studio shortlist.
                    </p>

                    <button
                      onClick={() => {
                        setIsWishlistOpen(false);
                        navigateTo('shop');
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-md active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
                      <span>Explore Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                    </button>

                    {/* Quick spaces chips */}
                    <div className="mt-8 pt-6 border-t border-stone-200/60 dark:border-stone-800/80 w-full max-w-xs">
                      <p className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-2.5">
                        Browse by space:
                      </p>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {['Living Room', 'Dining Room', 'Bedroom', 'Office'].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleSelectQuickCategory(cat)}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700/80 hover:border-amber-700 hover:text-amber-800 transition-colors cursor-pointer"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="group relative flex items-center gap-3 sm:gap-4 p-3 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-[#1A1816] hover:border-stone-300 dark:hover:border-stone-700 shadow-2xs hover:shadow-xs transition-all"
                    >
                      {/* Product Thumbnail */}
                      <div
                        onClick={() => {
                          navigateToProduct(product.id);
                          setIsWishlistOpen(false);
                        }}
                        className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Info & Actions */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 truncate">
                              {product.category}
                            </span>

                            <button
                              onClick={() => removeFromWishlist(product.id)}
                              className="text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1 -mt-1 -mr-1 cursor-pointer"
                              title="Remove from saved pieces"
                              aria-label={`Remove ${product.name} from wishlist`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <h3
                            onClick={() => {
                              navigateToProduct(product.id);
                              setIsWishlistOpen(false);
                            }}
                            className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 hover:text-amber-800 dark:hover:text-amber-400 cursor-pointer truncate transition-colors"
                          >
                            {product.name}
                          </h3>

                          <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                            {product.material}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2 mt-1 border-t border-stone-100 dark:border-stone-800/60">
                          <span className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 tabular-nums">
                            ${product.price?.toLocaleString()}
                          </span>

                          <button
                            onClick={() => {
                              const color = product.colors?.[0]?.name || 'Standard';
                              addToCart(product, 1, color);
                              removeFromWishlist(product.id);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Move to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* 3. Footer Summary & Primary Action */}
              {wishlist.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-stone-200/80 dark:border-stone-800/80 bg-white/80 dark:bg-[#191816]/80 backdrop-blur-md space-y-3 shrink-0 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
                  {/* Summary line */}
                  <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-300">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{wishlist.length} {wishlist.length === 1 ? 'piece' : 'pieces'} curated</span>
                    </span>
                    <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 tabular-nums">
                      ${totalValue.toLocaleString()}
                    </span>
                  </div>

                  {/* Move All to Cart */}
                  <button
                    onClick={handleMoveAllToCart}
                    className="w-full py-3.5 px-4 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white font-semibold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add All {wishlist.length} Pieces to Cart</span>
                  </button>

                  {/* Secondary Explore */}
                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      navigateTo('shop');
                    }}
                    className="w-full py-2 text-center text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors cursor-pointer"
                  >
                    Continue Exploring Catalog
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
