import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Eye, Plus, Heart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const FALLBACK_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80';

/**
 * Reusable Product Card Component
 * Clean, tactile, and responsive with progressive disclosure.
 * Powered by Intersection Observer for smooth scroll-triggered reveals.
 *
 * @param {Object} props
 * @param {Object} props.product - The product data object
 * @param {string} [props.aspectRatio] - Image aspect ratio class (default: 'aspect-4/3')
 * @param {number} [props.index=0] - Position in grid for staggered reveal
 * @param {number} [props.delay] - Explicit delay in milliseconds
 */
export const ProductCard = ({
  product,
  aspectRatio = 'aspect-4/3',
  index = 0,
  delay,
}) => {
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
  const [imageLoaded, setImageLoaded] = useState(false);

  // Intersection Observer scroll trigger
  const [cardRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: true,
  });

  const wishlisted = isWishlisted(product.id);

  // Staggered reveal timing based on grid column
  const calculatedDelay =
    typeof delay === 'number' ? delay : Math.min((index % 4) * 75, 225);

  // Secondary angle peek if gallery has more than 1 image
  const displayImage =
    isHovered && product.gallery && product.gallery.length > 1
      ? product.gallery[1]
      : product.image;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate3d(0, 0, 0) scale(1)'
          : 'translate3d(0, 28px, 0) scale(0.98)',
        transitionProperty: 'opacity, transform',
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${calculatedDelay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col bg-white dark:bg-[#181614] rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] transition-shadow duration-500"
    >
      {/* Product Image Frame */}
      <div
        onClick={() => navigateToProduct(product.id)}
        className={`relative ${aspectRatio} w-full bg-stone-100 dark:bg-stone-800/50 overflow-hidden cursor-pointer`}
      >
        {/* Placeholder skeleton while image loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-stone-100 dark:bg-stone-800 animate-pulse" />
        )}

        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={displayImage}
              src={displayImage}
              alt={product.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                setImageLoaded(true);
                e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
              }}
              className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
          </AnimatePresence>
        </div>

        {/* Badges (Stock & Editorial) */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none z-10">
          {product.badge && (
            <span className="px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase rounded-md bg-stone-900/90 dark:bg-white/95 backdrop-blur-sm text-white dark:text-stone-900 shadow-sm border border-white/10 dark:border-black/5">
              {product.badge}
            </span>
          )}
          {product.stockCount <= 4 && (
            <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded-md bg-amber-600 text-white shadow-sm">
              Low Stock
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={wishlisted ? 'Remove from saved' : 'Save for later'}
          className={`absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-sm cursor-pointer shadow-sm ${
            wishlisted
              ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 scale-100'
              : 'bg-white/90 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-white dark:hover:bg-stone-800 hover:text-rose-600'
          }`}
        >
          <Heart
            className={`w-4.5 h-4.5 transition-transform duration-300 ${
              wishlisted ? 'fill-current scale-110' : 'group-hover/heart:scale-110'
            }`}
          />
        </button>

        {/* Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hidden sm:block z-10 pointer-events-none">
          <div className="flex gap-2 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProduct(product);
              }}
              className="flex-1 py-2.5 rounded-xl bg-white/95 dark:bg-stone-800/95 text-stone-900 dark:text-stone-100 text-xs font-bold shadow-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors cursor-pointer border border-stone-200 dark:border-stone-700 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Details</span>
            </button>

            <button
              onClick={handleQuickAdd}
              className={`w-12 h-10 rounded-xl shadow-lg transition-all flex items-center justify-center cursor-pointer border ${
                justAdded
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100 hover:bg-amber-800 dark:hover:bg-amber-100'
              }`}
            >
              {justAdded ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile quick action icons bar */}
        <div className="absolute bottom-3 right-3 flex sm:hidden items-center gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-8 h-8 rounded-full bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200 shadow-md flex items-center justify-center"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleQuickAdd}
            className={`w-8 h-8 rounded-full shadow-md text-white flex items-center justify-center ${
              justAdded ? 'bg-emerald-600' : 'bg-stone-900 dark:bg-stone-100 dark:text-stone-900'
            }`}
          >
            {justAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          {/* Rating and Category Meta */}
          <div className="flex items-center justify-between gap-2 mb-2 text-[10px] font-bold uppercase tracking-widest">
            <span className="text-amber-800 dark:text-amber-400">
              {product.category}
            </span>

            <div className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-stone-900 dark:text-stone-100">
                {product.rating}
              </span>
              <span className="opacity-60">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => navigateToProduct(product.id)}
            className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer tracking-tight mb-1"
          >
            {product.name}
          </h3>

          {/* Material Subtitle */}
          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 font-medium">
            {product.material}
          </p>
        </div>

        {/* Bottom Details: Color Swatches & Price */}
        <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2">
          {/* Swatches */}
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-1">
              {product.colors?.slice(0, 3).map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c.name);
                  }}
                  className={`w-4 h-4 rounded-full transition-all border-2 border-white dark:border-stone-900 cursor-pointer relative z-0 hover:z-10 hover:scale-125 ${
                    selectedColor === c.name
                      ? 'ring-1 ring-stone-900 dark:ring-stone-100 scale-110 z-10'
                      : ''
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors?.length > 3 && (
                <div className="w-4 h-4 rounded-full bg-stone-100 dark:bg-stone-800 border border-white dark:border-stone-900 flex items-center justify-center text-[8px] font-bold text-stone-500">
                  +{product.colors.length - 3}
                </div>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 tabular-nums">
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-medium">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
