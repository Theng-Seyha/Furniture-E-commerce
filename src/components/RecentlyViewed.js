import { motion, AnimatePresence } from 'motion/react';
import { History, X, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * Clean & Unobtrusive "Recently Viewed Pieces" Shelf
 * Helps luxury shoppers quickly reference and compare items they inspected.
 */
export const RecentlyViewed = () => {
  const {
    recentlyViewedProducts,
    clearRecentlyViewed,
    navigateToProduct,
    setQuickViewProduct,
    addToCart,
  } = useCart();

  if (!recentlyViewedProducts || recentlyViewedProducts.length < 2) {
    return null;
  }

  return (
    <section className="py-10 border-t border-stone-200/80 dark:border-stone-800/80 bg-stone-50/60 dark:bg-stone-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
              <History className="w-3.5 h-3.5" />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                Recently Viewed Pieces
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Pieces you inspected during this session
              </p>
            </div>
          </div>

          <button
            onClick={clearRecentlyViewed}
            className="text-[11px] font-medium text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer flex items-center gap-1"
            title="Clear viewing history"
          >
            <X className="w-3 h-3" />
            <span>Clear History</span>
          </button>
        </div>

        {/* Horizontal scrollable row on mobile / clean grid on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          <AnimatePresence>
            {recentlyViewedProducts.slice(0, 6).map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative bg-white dark:bg-[#181614] rounded-xl p-2.5 border border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700 transition-all flex flex-col justify-between shadow-2xs hover:shadow-md cursor-pointer"
                onClick={() => navigateToProduct(product.id)}
              >
                {/* Image */}
                <div className="aspect-square w-full rounded-lg bg-stone-100 dark:bg-stone-800 overflow-hidden relative mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="absolute bottom-1.5 right-1.5 p-1 rounded-md bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs"
                    title="Quick Specs"
                    aria-label={`Quick view ${product.name}`}
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 dark:text-amber-400 block truncate">
                    {product.category}
                  </span>
                  <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                      ${product.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="p-1 rounded-md text-stone-500 hover:text-amber-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                      title="Add to cart"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingBag className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
