import { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Search,
  X,
  RotateCcw,
  SlidersHorizontal,
  LayoutGrid,
  Grid2X2,
  Sparkles,
  Check,
  ChevronDown,
} from 'lucide-react';
import { ALL_PRODUCTS, CATEGORIES } from '../data/furnitureData';
import { ProductCard } from './ProductCard';
import { RecentlyViewed } from './RecentlyViewed';
import { useCart } from '../context/CartContext';

/**
 * Primary Product Catalog & Discovery Hub
 * Engineered for effortless browsing, zero-friction filtering, and clean luxury visuals.
 */
export const FeaturedProducts = () => {
  const { selectedCategory, setSelectedCategory } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemType, setSelectedItemType] = useState('all');
  const [selectedRoomCategory, setSelectedRoomCategory] = useState(
    selectedCategory && selectedCategory !== 'All' ? selectedCategory : 'all'
  );
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [priceBracket, setPriceBracket] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [layoutMode, setLayoutMode] = useState('standard'); // 'standard' (3 cols) | 'compact' (4 cols)

  // Synchronize with external category selections (e.g. from CategoryBrowser or Hero)
  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'All') {
      setSelectedRoomCategory(selectedCategory);
    } else if (selectedCategory === 'All') {
      setSelectedRoomCategory('all');
    }
  }, [selectedCategory]);

  const roomCategories = [
    { id: 'all', label: 'All Spaces' },
    { id: 'Living Room', label: 'Living Room' },
    { id: 'Dining Room', label: 'Dining Room' },
    { id: 'Bedroom', label: 'Bedroom' },
    { id: 'Office', label: 'Office & Study' },
    { id: 'Storage', label: 'Credenzas & Storage' },
    { id: 'Lighting', label: 'Lighting' },
  ];

  const itemTypes = [
    { id: 'all', label: 'All Furniture' },
    { id: 'sofa', label: 'Sofas' },
    { id: 'chair', label: 'Lounge Chairs' },
    { id: 'table', label: 'Tables' },
    { id: 'storage', label: 'Storage' },
    { id: 'bed', label: 'Beds' },
    { id: 'desk', label: 'Desks' },
    { id: 'lighting', label: 'Lamps' },
  ];

  const materialTags = [
    { id: 'all', label: 'All Materials' },
    { id: 'teak', label: 'Solid Teak', keyword: 'teak' },
    { id: 'walnut', label: 'American Walnut', keyword: 'walnut' },
    { id: 'oak', label: 'White Oak', keyword: 'oak' },
    { id: 'leather', label: 'Top-Grain Leather', keyword: 'leather' },
    { id: 'boucle', label: 'Bouclé', keyword: 'boucl' },
    { id: 'marble', label: 'Travertine & Marble', keyword: 'marble' },
  ];

  const priceBrackets = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-300', label: 'Under $300', min: 0, max: 300 },
    { id: '300-600', label: '$300 – $600', min: 300, max: 600 },
    { id: '600-900', label: '$600 – $900', min: 600, max: 900 },
    { id: '900-plus', label: '$900+', min: 900, max: 3000 },
  ];

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedItemType('all');
    setSelectedRoomCategory('all');
    setSelectedMaterial('all');
    setPriceBracket('all');
    setInStockOnly(false);
    setSortBy('popularity');
    if (setSelectedCategory) setSelectedCategory('All');
  };

  const isFiltered =
    searchQuery !== '' ||
    selectedItemType !== 'all' ||
    selectedRoomCategory !== 'all' ||
    selectedMaterial !== 'all' ||
    priceBracket !== 'all' ||
    inStockOnly;

  // Filter and sort product collection
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Room Category filter
      if (
        selectedRoomCategory !== 'all' &&
        product.category !== selectedRoomCategory
      ) {
        return false;
      }

      // Furniture Type filter
      if (selectedItemType !== 'all' && product.itemType !== selectedItemType) {
        return false;
      }

      // Material filter
      if (selectedMaterial !== 'all') {
        const mat = materialTags.find((m) => m.id === selectedMaterial);
        if (
          mat &&
          mat.keyword &&
          !product.material.toLowerCase().includes(mat.keyword.toLowerCase())
        ) {
          return false;
        }
      }

      // Price Bracket filter
      if (priceBracket !== 'all') {
        const bracket = priceBrackets.find((b) => b.id === priceBracket);
        if (bracket) {
          if (bracket.min !== undefined && product.price < bracket.min) return false;
          if (bracket.max !== undefined && product.price > bracket.max) return false;
        }
      }

      // Stock status
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Text query
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
    selectedMaterial,
    priceBracket,
    inStockOnly,
    searchQuery,
    sortBy,
  ]);

  return (
    <section id="featured-products" className="py-12 sm:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-px bg-amber-700/60 dark:bg-amber-400/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-400">
                Workshop Catalog
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
              Honest Furniture for <br className="hidden sm:block" />
              Inspired Living.
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-3 max-w-xl leading-relaxed">
              Every piece in our <b className="text-stone-900 dark:text-stone-100">{filteredProducts.length}</b> piece collection is handcrafted in Phnom Penh using sustainably sourced solid hardwoods and traditional joinery.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            {isFiltered && (
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[11px] font-bold hover:text-stone-900 dark:hover:text-white transition-all cursor-pointer border border-stone-200 dark:border-stone-700 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}

            <div className="hidden lg:flex items-center bg-stone-100 dark:bg-stone-800/70 p-1 rounded-full border border-stone-200/80 dark:border-stone-700/80">
              <button
                onClick={() => setLayoutMode('standard')}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  layoutMode === 'standard'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('compact')}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  layoutMode === 'compact'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 1. Primary Filter Bar: Rooms / Spaces */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 shrink-0 mr-1 hidden sm:inline">
              Space:
            </span>
            {roomCategories.map((room) => {
              const isSelected = selectedRoomCategory === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => {
                    setSelectedRoomCategory(room.id);
                    if (setSelectedCategory) {
                      setSelectedCategory(room.id === 'all' ? 'All' : room.id);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer select-none shrink-0 ${
                    isSelected
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                      : 'bg-stone-100/90 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/80 dark:hover:bg-stone-700'
                  }`}
                >
                  {room.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Secondary Filter Bar: Furniture Types */}
        <div className="mb-6 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 shrink-0 mr-1 hidden sm:inline">
            Type:
          </span>
          {itemTypes.map((type) => {
            const isSelected = selectedItemType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedItemType(type.id)}
                className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all cursor-pointer select-none shrink-0 ${
                  isSelected
                    ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                    : 'bg-stone-100/70 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>

        {/* 3. Refined Control Toolbar (Search, Materials, Price, Stock, Sort) */}
        <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#181614] border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Instant Search within catalog */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by wood finish, leather, bouclé, or name..."
                className="w-full pl-9 pr-9 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-amber-700"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* In-Stock Toggle & Sort Selector */}
            <div className="flex items-center gap-3 justify-between sm:justify-end">
              <label className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-stone-300 text-amber-800 focus:ring-amber-700 cursor-pointer"
                />
                <span className="font-medium">In Stock Only</span>
              </label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-1.5 pl-3 pr-8 text-xs font-semibold rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-hidden cursor-pointer"
              >
                <option value="popularity">Sort: Most Popular</option>
                <option value="price-low">Sort: Price (Low to High)</option>
                <option value="price-high">Sort: Price (High to Low)</option>
                <option value="rating">Sort: Top Rated</option>
                <option value="newest">Sort: New Releases</option>
              </select>
            </div>
          </div>

          {/* Materials & Price Filters Row */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            {/* Material Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mr-1">
                Wood & Finish:
              </span>
              {materialTags.map((mat) => {
                const isSelected = selectedMaterial === mat.id;
                return (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-800 text-white dark:bg-amber-600'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    {mat.label}
                  </button>
                );
              })}
            </div>

            {/* Price Brackets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mr-1">
                Budget:
              </span>
              {priceBrackets.map((bracket) => {
                const isSelected = priceBracket === bracket.id;
                return (
                  <button
                    key={bracket.id}
                    onClick={() => setPriceBracket(bracket.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-800 text-white dark:bg-amber-600'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    {bracket.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. Active Filters Badges Strip (Instant clarity on active criteria) */}
        {isFiltered && (
          <div className="mb-6 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Active Filters:
            </span>

            {selectedRoomCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-medium">
                <span>Space: {selectedRoomCategory}</span>
                <button
                  onClick={() => setSelectedRoomCategory('all')}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedItemType !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-medium">
                <span>Type: {itemTypes.find((t) => t.id === selectedItemType)?.label}</span>
                <button
                  onClick={() => setSelectedItemType('all')}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedMaterial !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-medium">
                <span>Material: {materialTags.find((m) => m.id === selectedMaterial)?.label}</span>
                <button
                  onClick={() => setSelectedMaterial('all')}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {priceBracket !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-medium">
                <span>Price: {priceBrackets.find((b) => b.id === priceBracket)?.label}</span>
                <button
                  onClick={() => setPriceBracket('all')}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-medium">
                <span>In Stock Only</span>
                <button
                  onClick={() => setInStockOnly(false)}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-medium">
                <span>Query: &ldquo;{searchQuery}&rdquo;</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-[11px] font-semibold text-amber-800 dark:text-amber-400 hover:underline cursor-pointer ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        {/* 5. Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-[#181614] rounded-2xl border border-dashed border-stone-200 dark:border-stone-800 p-8">
            <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
              No Pieces Match Your Current Selection
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-md mx-auto">
              We couldn&apos;t find furniture matching all selected criteria. Try removing one or more filters or searching by a broader term.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
              <button
                onClick={() => {
                  resetAllFilters();
                  setSelectedRoomCategory('Living Room');
                }}
                className="px-4 py-2.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium hover:bg-stone-200 cursor-pointer"
              >
                View Living Room Pieces
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`grid gap-6 sm:gap-8 ${
              layoutMode === 'compact'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            <AnimatePresence>
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                  aspectRatio={layoutMode === 'compact' ? 'aspect-square' : 'aspect-4/3'}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 6. Recently Viewed Shelf (Clean, unobtrusive, helpful) */}
      <RecentlyViewed />
    </section>
  );
};
