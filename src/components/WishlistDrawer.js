import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2, Share2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * Clean Wishlist / Saved Items Drawer
 * Provides high-consideration furniture shoppers with an uncluttered space to curate favorites.
 */
export const WishlistDrawer = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    addToCart,
    navigateToProduct,
    navigateTo,
    showToast,
  } = useCart();

  const handleShareWishlist = () => {
    try {
      const url = window.location.origin + window.location.pathname + '#shop';
      navigator.clipboard.writeText(url);
      showToast('Curation link copied! Share with your partner or client.');
    } catch {
      showToast('Curation link ready to share.');
    }
  };

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
            className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white dark:bg-[#181614] shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800"
            >
            {/* Header */}
            <div className="px-6 py-5 border-b border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600 fill-current" />
                <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                  Saved Pieces ({wishlist.length})
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {wishlist.length > 0 && (
                  <button
                    onClick={handleShareWishlist}
                    className="p-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                    title="Share curated favorites"
                    aria-label="Share wishlist"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  aria-label="Close saved items"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-500 mb-4">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200">
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mt-1 mb-6">
                    Click the heart icon on any piece while exploring to save it to your private curation.
                  </p>
                  <button
                    onClick={() => {
                      setIsWishlistOpen(false);
                      navigateTo('shop');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                  >
                    <span>Browse Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3 rounded-xl border border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/30 hover:border-stone-200 dark:hover:border-stone-700 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => {
                        navigateToProduct(product.id);
                        setIsWishlistOpen(false);
                      }}
                      className="w-20 h-20 rounded-lg object-cover bg-stone-100 dark:bg-stone-800 cursor-pointer shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4
                            onClick={() => {
                              navigateToProduct(product.id);
                              setIsWishlistOpen(false);
                            }}
                            className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 hover:text-amber-800 dark:hover:text-amber-400 cursor-pointer truncate"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                          {product.material}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                          ${product.price}
                        </span>

                        <button
                          onClick={() => {
                            addToCart(product, 1);
                            removeFromWishlist(product.id);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer action */}
            {wishlist.length > 0 && (
              <div className="p-6 border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/30">
                <button
                  onClick={() => {
                    wishlist.forEach((item) => addToCart(item, 1));
                    showToast(`Moved all ${wishlist.length} pieces to your cart!`);
                    setIsWishlistOpen(false);
                  }}
                  className="w-full py-3 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 font-semibold text-xs tracking-wide uppercase hover:opacity-90 transition-opacity cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add All Saved Pieces to Cart</span>
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
