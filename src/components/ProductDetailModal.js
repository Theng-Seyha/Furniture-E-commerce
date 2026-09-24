import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Star, Check, Plus, Minus, ShieldCheck, Ruler, ArrowRight, ExternalLink } from "lucide-react";
import { useCart } from "../context/CartContext";

export const ProductDetailModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, navigateToProduct } = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && quickViewProduct) {
        setQuickViewProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quickViewProduct, setQuickViewProduct]);

  // Reset image index when modal opens with a new product
  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
    setSelectedColor("");
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const activeColor =
    selectedColor ||
    (quickViewProduct.colors && quickViewProduct.colors[0]?.name) ||
    "Standard";

  const galleryImages =
    quickViewProduct.gallery && quickViewProduct.gallery.length > 0
      ? quickViewProduct.gallery
      : [quickViewProduct.image];

  const currentImage = galleryImages[selectedImageIndex] || quickViewProduct.image;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, activeColor);
    setQuickViewProduct(null);
  };

  const handleGoToProductPage = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    navigateToProduct(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white dark:bg-[#181614] max-w-3xl w-full max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 relative text-stone-900 dark:text-stone-100"
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left: Product Image & Gallery */}
          <div className="space-y-3">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shadow-2xs relative">
              <img
                src={currentImage}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {quickViewProduct.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase rounded-md bg-white/95 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 shadow-2xs">
                  {quickViewProduct.badge}
                </span>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      selectedImageIndex === idx
                        ? "border-amber-700 dark:border-amber-500 scale-105"
                        : "border-transparent opacity-65 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Specifications & Purchasing */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
                <span className="font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-semibold">{quickViewProduct.rating}</span>
                  <span>({quickViewProduct.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                {quickViewProduct.name}
              </h2>

              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                  ${quickViewProduct.price}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ${quickViewProduct.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  In Stock & Ready to Ship
                </span>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Color Options */}
            {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Finish: <span className="font-bold">{activeColor}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                        activeColor === c.name
                          ? "border-amber-700 ring-2 ring-amber-300 dark:ring-amber-800 scale-110"
                          : "border-stone-300 dark:border-stone-700 hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {activeColor === c.name && (
                        <Check className="w-3.5 h-3.5 text-stone-800 drop-shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dimension & Material Specs */}
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                <Ruler className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Dimensions: <b>{quickViewProduct.dimensions}</b></span>
              </div>
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                <ShieldCheck className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Materials: <b>{quickViewProduct.material}</b></span>
              </div>
            </div>

            {/* Quantity and CTA */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-full px-3 py-1.5 bg-stone-50 dark:bg-stone-800 shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="grow py-3 px-5 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-xs transition-all cursor-pointer"
              >
                Add to Cart • ${(quickViewProduct.price * quantity).toLocaleString()}
              </button>
            </div>

            {/* Full Story & Spec Sheet link */}
            <div className="pt-2 text-center">
              <button
                onClick={handleGoToProductPage}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer group"
              >
                <span>View Full Workshop Story &amp; Dimensions</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
