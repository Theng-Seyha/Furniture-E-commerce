import { useState, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { Search, X, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { ALL_PRODUCTS } from '../data/furnitureData';
import { ProductCard } from './ProductCard';

/**
 * Primary Product Catalog & Filtering Hub
 * Allows shoppers to refine pieces by room type, category, price, and in-stock status.
 */
export const FeaturedProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemType, setSelectedItemType] = useState('all');
  const [selectedRoomCategory, setSelectedRoomCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(1200);
  const [priceBracket, setPriceBracket] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filterTabs = [
    { id: 'all', label: 'All Catalog' },
    { id: 'sofa', label: 'Sofas & Couches' },
    { id: 'chair', label: 'Lounge Chairs' },
    { id: 'table', label: 'Dining & Tables' },
    { id: 'storage', label: 'Storage & Credenzas' },
    { id: 'bed', label: 'Beds & Headboards' },
    { id: 'desk', label: 'Desks & Study' },
    { id: 'lighting', label: 'Lamps & Lighting' },
  ];

  const priceBrackets = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-300', label: 'Under $300', max: 300, min: 0 },
    { id: '300-600', label: '$300 – $600', min: 300, max: 600 },
    { id: '600-900', label: '$600 – $900', min: 600, max: 900 },
    { id: '900-plus', label: '$900 & Above', min: 900, max: 2000 },
  ];

  const handlePriceBracketChange = (bracketId) => {
    setPriceBracket(bracketId);
    const found = priceBrackets.find((b) => b.id === bracketId);
    if (found && found.max) {
      setMaxPrice(found.max);
    } else if (bracketId === 'all') {
      setMaxPrice(1200);
    }
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedItemType('all');
    setSelectedRoomCategory('all');
    setMaxPrice(1200);
    setPriceBracket('all');
    setInStockOnly(false);
    setSortBy('popularity');
  };

  const isFiltered =
    searchQuery !== '' ||
    selectedItemType !== 'all' ||
    selectedRoomCategory !== 'all' ||
    maxPrice < 1200 ||
    priceBracket !== 'all' ||
    inStockOnly;

  // Filter and sort product collection
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      if (selectedItemType !== 'all' && product.itemType !== selectedItemType) {
        return false;
      }
      if (
        selectedRoomCategory !== 'all' &&
        product.category !== selectedRoomCategory
      ) {
        return false;
      }
      if (priceBracket !== 'all') {
        const bracket = priceBrackets.find((b) => b.id === priceBracket);
        if (bracket) {
          if (bracket.min !== undefined && product.price < bracket.min) return false;
          if (bracket.max !== undefined && product.price > bracket.max) return false;
        }
      } else {
        if (product.price > maxPrice) {
          return false;
        }
      }
      if (inStockOnly && !product.inStock) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesMat = product.material.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesMat && !matchesCat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.reviewCount - a.reviewCount;
      return b.rating * b.reviewCount - a.rating * a.reviewCount; // popularity
    });
  }, [
    selectedItemType,
    selectedRoomCategory,
    priceBracket,
    maxPrice,
    inStockOnly,
    searchQuery,
    sortBy,
  ]);

  return (
    <section id="featured-products" className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-700 dark:bg-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                Honest Materials &bull; Lifetime Care
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Furniture Built for Daily Living
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-xl">
              Showing {filteredProducts.length} pieces built in our workshop. Every piece comes with simple care wax and hardware that never strips.
            </p>
          </div>

          {/* Reset Filters Quick Button if active */}
          {isFiltered && (
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100 transition-colors self-start md:self-auto cursor-pointer border border-amber-200/80 dark:border-amber-800/60"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>

        {/* Category Filter Pills (Horizontal Scroll) */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedItemType(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedItemType === tab.id
                  ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Toolbar (Search, Price Brackets, Stock, Sort) */}
        <div className="mb-8 p-4 rounded-2xl bg-white dark:bg-[#181614] border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search within catalog */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by wood, linen, bouclé, or name..."
                className="w-full pl-10 pr-9 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort & In-Stock */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-stone-300 text-amber-800 focus:ring-amber-700 cursor-pointer"
                />
                <span className="font-medium">In Stock Only</span>
              </label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-2 pl-3 pr-8 text-xs font-semibold rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-hidden cursor-pointer"
              >
                <option value="popularity">Sort: Most Popular</option>
                <option value="price-low">Sort: Price (Low to High)</option>
                <option value="price-high">Sort: Price (High to Low)</option>
                <option value="rating">Sort: Top Rated</option>
                <option value="newest">Sort: New Releases</option>
              </select>
            </div>
          </div>

          {/* Price Brackets Bar */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mr-1">
                Price:
              </span>
              {priceBrackets.map((bracket) => (
                <button
                  key={bracket.id}
                  onClick={() => handlePriceBracketChange(bracket.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    priceBracket === bracket.id
                      ? 'bg-amber-800 text-white dark:bg-amber-600'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {bracket.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-stone-500 dark:text-stone-400">
              Showing <strong>{filteredProducts.length}</strong> items
            </div>
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-[#181614] rounded-2xl border border-dashed border-stone-200 dark:border-stone-800 p-8">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              No Pieces Match Your Filters
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-md mx-auto">
              Try adjusting your price filter, keyword, or clearing the active category.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
