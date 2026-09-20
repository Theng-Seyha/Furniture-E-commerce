import { useState } from "react";
import { motion } from "motion/react";
import { X, Star, Check, Plus, Minus, ShieldCheck, Ruler } from "lucide-react";
import { useCart } from "../context/CartContext";
export const ProductDetailModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  if (!quickViewProduct) return null;
  const activeColor = selectedColor || quickViewProduct.colors && quickViewProduct.colors[0]?.name || "Standard";
  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, activeColor);
    setQuickViewProduct(null);
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="bg-white dark:bg-stone-900 max-w-3xl w-full max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 relative text-stone-900 dark:text-stone-100"
  >
        <button
    onClick={() => setQuickViewProduct(null)}
    className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
    aria-label="Close details"
  >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {
    /* Left: Product Image */
  }
          <div className="space-y-3">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shadow-xs">
              <img
    src={quickViewProduct.image}
    alt={quickViewProduct.name}
    className="w-full h-full object-cover"
  />
            </div>

            {quickViewProduct.badge && <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300">
                {quickViewProduct.badge}
              </span>}
          </div>

          {
    /* Right: Specifications & Purchasing */
  }
          <div className="flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
                <span>{quickViewProduct.category}</span>
                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-semibold">{quickViewProduct.rating}</span>
                  <span>({quickViewProduct.reviewCount} verified reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {quickViewProduct.name}
              </h2>

              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                  ${quickViewProduct.price}
                </span>
                {quickViewProduct.originalPrice && <span className="text-sm text-stone-400 line-through">
                    ${quickViewProduct.originalPrice}
                  </span>}
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  In Stock & Ready to Ship
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                {quickViewProduct.description}
              </p>
            </div>

            {
    /* Color Options */
  }
            {quickViewProduct.colors && quickViewProduct.colors.length > 0 && <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Color / Finish: <span className="font-bold">{activeColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {quickViewProduct.colors.map((c) => <button
    key={c.name}
    onClick={() => setSelectedColor(c.name)}
    className={`group relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${activeColor === c.name ? "border-amber-700 ring-2 ring-amber-300 dark:ring-amber-800" : "border-stone-300 dark:border-stone-700"}`}
    style={{ backgroundColor: c.hex }}
    title={c.name}
  >
                      {activeColor === c.name && <Check className="w-3.5 h-3.5 text-stone-800 drop-shadow-xs" />}
                    </button>)}
                </div>
              </div>}

            {
    /* Specs Specs */
  }
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                <Ruler className="w-4 h-4 text-stone-400" />
                <span>Dimensions: <b>{quickViewProduct.dimensions}</b></span>
              </div>
              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                <ShieldCheck className="w-4 h-4 text-stone-400" />
                <span>Materials: <b>{quickViewProduct.material}</b></span>
              </div>
            </div>

            {
    /* Quantity and CTA */
  }
            <div className="pt-2 flex items-center gap-4">
              <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-full px-3 py-1.5 bg-stone-50 dark:bg-stone-800">
                <button
    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
    className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
    aria-label="Decrease quantity"
  >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-bold">{quantity}</span>
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
    className="grow py-3 px-6 rounded-full bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer"
  >
                Add to Cart • ${(quickViewProduct.price * quantity).toLocaleString()}
              </button>
            </div>

          </div>

        </div>
      </motion.div>
    </div>;
};
