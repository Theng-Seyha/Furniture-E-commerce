import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Eye, Plus, Heart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * Reusable Product Card Component
 * Designed with progressive disclosure to keep the UI clean and uncluttered.
 *
 * @param {Object} props
 * @param {Object} props.product - The product data object
 * @param {string} [props.aspectRatio] - Image aspect ratio class (default: 'aspect-4/3')
 */
export const ProductCard = ({ product, aspectRatio = 'aspect-4/3' }) => {
  const {
    addToCart,
    setQuickViewProduct,
    navigateToProduct,
    isWishlisted,
    toggleWishlist,
  } = useCart();

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || 'Standard'
  );
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);

  // Secondary angle peek if gallery has more than 1 image
  const displayImage =
    isHovered && product.gallery && product.gallery.length > 1
      ? product.gallery[1]
      : product.image;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.28 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col bg-white dark:bg-[#181614] rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700 shadow-xs hover:shadow-xl transition-all duration-300"
    >
      {/* Product Image Frame */}
      <div
        onClick={() => navigateToProduct(product.id)}
        className={`relative ${aspectRatio} w-full bg-stone-100 dark:bg-stone-800/50 overflow-hidden cursor-pointer`}
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges (Stock & Editorial) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          {product.badge && (
            <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase rounded-md bg-white/95 dark:bg-stone-900/90 backdrop-blur-xs text-stone-900 dark:text-stone-100 shadow-xs">
              {product.badge}
            </span>
          )}
          {product.stockCount <= 4 && (
            <span className="px-2 py-0.5 text-[9px] font-bold tracking-wide uppercase rounded-md bg-amber-600 text-white shadow-xs">
              Low Stock ({product.stockCount} left)
            </span>
          )}
        </div>

        {/* Wishlist Heart Button (Clean & Modern) */}
        <button
          onClick={handleWishlistToggle}
          aria-label={wishlisted ? 'Remove from saved' : 'Save for later'}
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-xs cursor-pointer ${
            wishlisted
              ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 scale-100 shadow-xs'
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-stone-800 hover:text-rose-600'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              wishlisted ? 'fill-current scale-110' : ''
            }`}
          />
        </button>

        {/* Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center gap-2.5 p-4 pointer-events-none z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="pointer-events-auto p-2.5 rounded-full bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 shadow-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-transform transform hover:scale-110 cursor-pointer"
            title="Quick view product specs"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={handleQuickAdd}
            className={`pointer-events-auto p-2.5 rounded-full shadow-lg transition-all transform hover:scale-110 cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-800 dark:bg-amber-600 hover:bg-amber-900 text-white'
            }`}
            title={justAdded ? 'Added!' : 'Add 1 to Cart'}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Rating and Category Meta */}
          <div className="flex items-center justify-between gap-2 mb-1.5 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-medium text-[11px] uppercase tracking-wider text-amber-900/80 dark:text-amber-400/80">
              {product.category}
            </span>

            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {product.rating}
              </span>
              <span className="text-stone-400 text-[11px]">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => navigateToProduct(product.id)}
            className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer tracking-tight"
          >
            {product.name}
          </h3>

          {/* Material Subtitle */}
          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
            {product.material}
          </p>
        </div>

        {/* Bottom Details: Color Swatches & Price */}
        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2">
          {/* Swatches (Discreet dots with micro label) */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              {product.colors?.slice(0, 4).map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                  }}
                  className={`w-3.5 h-3.5 rounded-full transition-transform cursor-pointer ${
                    selectedColor === c.name
                      ? 'ring-2 ring-amber-700 dark:ring-amber-400 ring-offset-1 dark:ring-offset-stone-900 scale-115'
                      : 'hover:scale-115 opacity-75 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={`Select ${c.name} finish`}
                />
              ))}
              {product.colors?.length > 4 && (
                <span className="text-[10px] text-stone-400 font-medium ml-0.5">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-400 dark:text-stone-500 font-medium truncate max-w-[80px]">
              {selectedColor}
            </span>
          </div>

          {/* Price with tabular-nums */}
          <div className="flex items-baseline gap-1.5 tabular-nums">
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
