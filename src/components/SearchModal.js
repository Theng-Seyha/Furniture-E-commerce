import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { ALL_PRODUCTS } from '../data/furnitureData';
import { useCart } from '../context/CartContext';

/**
 * Clean Search Spotlight & Command Palette (Cmd+K / Ctrl+K)
 * Allows fast, friction-free discovery without cluttering main screens.
 */
export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProduct } = useCart();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const inputRef = useRef(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
      setSelectedCategory('All');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K and Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Filter products by query and active category chip
  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    if (!matchesCategory) return false;
    if (!query.trim()) return true;

    const q = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.material.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.itemType.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q)
    );
  }).slice(0, 8);

  const categories = ['All', 'Living Room', 'Dining Room', 'Bedroom', 'Office', 'Storage'];

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#181614] rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 sm:px-6 py-4 border-b border-stone-100 dark:border-stone-800/80">
            <Search className="w-5 h-5 text-stone-400 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search solid walnut, bouclé sofas, desks, dining..."
              className="w-full text-base bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-md text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 mr-2"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="px-2 py-1 text-[11px] font-semibold text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 rounded-md bg-stone-100 dark:bg-stone-800 transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Quick Filter Category Pills */}
          <div className="px-4 sm:px-6 py-2.5 bg-stone-50/70 dark:bg-stone-900/40 border-b border-stone-100 dark:border-stone-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-800 dark:bg-amber-600 text-white'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800/60 p-2 sm:p-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    navigateToProduct(product.id);
                    setIsSearchOpen(false);
                  }}
                  className="group flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100 dark:bg-stone-800 shrink-0"
                    />
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 truncate">
                          {product.name}
                        </h4>
                        {product.badge && (
                          <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-semibold uppercase rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                        {product.material} &bull; {product.dimensions}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      ${product.price}
                    </span>
                    <ArrowRight className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <Sparkles className="w-8 h-8 text-stone-300 dark:text-stone-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  No furniture pieces found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Try searching for &ldquo;walnut&rdquo;, &ldquo;sofa&rdquo;, or &ldquo;dining&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="px-4 sm:px-6 py-2.5 bg-stone-50 dark:bg-stone-900/50 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
            <span>
              Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono text-[10px]">⌘</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono text-[10px]">K</kbd> anywhere to trigger quick search
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              Select <CornerDownLeft className="w-3 h-3" />
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
