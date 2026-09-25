import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Star,
  Check,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Ruler,
  Clock,
  Sparkles,
  ShoppingBag,
  Send,
  ZoomIn,
  X,
  Layers,
  ChevronRight,
  Heart,
  Share2,
  CheckCircle2,
  MapPin,
  Tag,
  Box,
  Compass
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { ALL_PRODUCTS } from "../data/furnitureData";
import { TELEGRAM_CONFIG } from "../services/telegramService";
import { ProductCard } from "./ProductCard";
import { RecentlyViewed } from "./RecentlyViewed";

const PRODUCT_DETAIL_FALLBACK =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80";

export const ProductDetailPage = ({ product }) => {
  const {
    addToCart,
    setIsCartOpen,
    navigateTo,
    navigateToProduct,
    setIsTelegramModalOpen,
    isWishlisted,
    toggleWishlist,
    showToast
  } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors[0] ? product.colors[0].name : "Standard"
  );
  const [quantity, setQuantity] = useState(1);
  const [includeAssembly, setIncludeAssembly] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState("dimensions");
  const [deliveryLocation, setDeliveryLocation] = useState("Phnom Penh Central");
  const [bundleAdded, setBundleAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const activeImage = galleryImages[activeImageIndex] || product.image;
  const assemblyPricePerUnit = 40;
  const unitPrice = product.price;
  const itemsSubtotal = unitPrice * quantity;
  const assemblySubtotal = includeAssembly ? assemblyPricePerUnit * quantity : 0;
  const calculatedGrandTotal = itemsSubtotal + assemblySubtotal;
  const relatedProducts = ALL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
  const bundleCompanion = relatedProducts[0];

  // Delivery estimates by city
  const deliveryEstimates = {
    "Phnom Penh Central": { time: "Within 24 Hours", slot: "Same-day / Next-day White Glove Van", cost: "FREE" },
    "Toul Kork & Chroy Changvar": { time: "24–48 Hours", slot: "Direct Studio Fleet", cost: "FREE" },
    "Siem Reap": { time: "2–3 Business Days", slot: "Climate-Controlled Freight", cost: "$25 (Free over $500)" },
    "Sihanoukville": { time: "2–3 Business Days", slot: "Express Coastal Route", cost: "$25 (Free over $500)" },
    "Battambang": { time: "3 Business Days", slot: "Regional Carrier", cost: "$30 (Free over $500)" },
  };

  // Material and finish details
  const finishDetailsMap = {
    "Natural White Oak": {
      timber: "American Solid White Oak (FSC-Certified)",
      finish: "Matte Organic Plant Oil (Zero VOC, Food-Safe)",
      grain: "Fine open pore grain, warm honey blonde hue",
      care: "Weekly dry microfiber dusting; organic wax refresh once a year."
    },
    "Oatmeal Bouclé": {
      timber: "Solid Kiln-Dried Hardwood Base",
      finish: "Custom Woven Italian Heavy Wool Bouclé",
      grain: "Tactile loop weave, 55,000 double rub commercial rating",
      care: "Nano-treated water repellent. Gentle dab cleaning with damp wool sponge."
    },
    "Charcoal Linen": {
      timber: "FSC Kiln-Dried European Ash Frame",
      finish: "Belgian Stone-Washed Performance Canvas",
      grain: "Breathable textured weave, natural slub texture",
      care: "Machine-removable zippered cushion covers."
    },
    "Smoked Walnut": {
      timber: "Solid American Black Walnut",
      finish: "Double-boiled Linseed & Carnauba Wax",
      grain: "Rich deep espresso heartwood with flowing dark waves",
      care: "Buff with dry walnut cloth every 6 months."
    }
  };

  const currentFinishInfo =
    finishDetailsMap[selectedColor] || {
      timber: product.material || "Kiln-Dried Solid Hardwood",
      finish: "Hand-applied organic matte seal",
      grain: "Distinctive architectural grain texture",
      care: "Wipe with dry microfiber cloth. Avoid direct radiators."
    };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, includeAssembly);
    setIsCartOpen(true);
  };

  const handleAddBundleToCart = () => {
    if (!bundleCompanion) return;
    addToCart(product, 1, selectedColor, false);
    addToCart(bundleCompanion, 1, bundleCompanion.colors?.[0]?.name || "Standard", false);
    setBundleAdded(true);
    if (showToast) {
      showToast(`Studio Pair added! 10% bundle applied on both items.`);
    }
    setTimeout(() => {
      setBundleAdded(false);
      setIsCartOpen(true);
    }, 900);
  };

  const handleDirectTelegramOrder = () => {
    addToCart(product, quantity, selectedColor, includeAssembly);
    const text = encodeURIComponent(
      `Hello Theng Seyha! I'd like to order: ${product.name} (${selectedColor}) x${quantity} with ${includeAssembly ? "White Glove Assembly" : "Standard Delivery"} to ${deliveryLocation}. Total: $${calculatedGrandTotal.toLocaleString()}.`
    );
    window.open(`${TELEGRAM_CONFIG.BOT_URL}?text=${text}`, "_blank");
  };

  const handleOrderSwatchKit = () => {
    const text = encodeURIComponent(
      `Hello Theng Seyha! I would like to request a Free Wood & Fabric Swatch Kit for piece: "${product.name}" (Finish: ${selectedColor}). Delivery to: ${deliveryLocation}.`
    );
    window.open(`${TELEGRAM_CONFIG.BOT_URL}?text=${text}`, "_blank");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };
  return <div className="bg-[#FAF8F5] dark:bg-[#121110] min-h-screen text-stone-900 dark:text-stone-100 transition-colors duration-300 pb-20">
      
      {
    /* 1. Breadcrumb Bar */
  }
      <div className="border-b border-stone-200/70 dark:border-stone-800/70 bg-white/60 dark:bg-stone-900/60 backdrop-blur-xs sticky top-[69px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2 text-stone-500 dark:text-stone-400 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button
    onClick={() => navigateTo("home")}
    className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
  >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-stone-400" />
            <button
    onClick={() => navigateTo("shop")}
    className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
  >
              Catalog
            </button>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-stone-400" />
            <span className="text-stone-400">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-stone-400" />
            <span className="font-semibold text-stone-900 dark:text-stone-100 truncate max-w-[180px] sm:max-w-xs">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                wishlisted
                  ? "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-900"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
              }`}
              title={wishlisted ? "Remove from wishlist" : "Save piece to wishlist"}
            >
              <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">{wishlisted ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all cursor-pointer"
              title="Copy shareable link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copiedLink ? "Link Copied!" : "Share"}</span>
            </button>

            <button
              onClick={() => navigateTo("shop")}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Catalog</span>
            </button>
          </div>
        </div>
      </div>

      {
    /* 2. Main Product Grid */
  }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {
    /* Left Column: Larger Image Gallery with Multi-Angles & Lightbox (7 cols) */
  }
          <div className="lg:col-span-7 space-y-4">
            
            {
    /* Main Stage Image */
  }
            <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden bg-stone-200/50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-800 shadow-md group">
              <motion.img
    key={activeImage}
    initial={{ opacity: 0.4, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    src={activeImage}
    alt={product.name}
    onError={(e) => {
      e.currentTarget.src = PRODUCT_DETAIL_FALLBACK;
    }}
    className="w-full h-full object-cover object-center cursor-zoom-in"
    onClick={() => setIsLightboxOpen(true)}
  />

              {
    /* Status / Feature Badges */
  }
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {product.badge && <span className="px-3 py-1 rounded-full bg-stone-900/90 dark:bg-stone-100/90 text-stone-50 dark:text-stone-900 text-xs font-semibold backdrop-blur-md shadow-xs">
                    {product.badge}
                  </span>}
                {product.inStock && <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-semibold backdrop-blur-md shadow-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    In Stock ({product.stockCount} left)
                  </span>}
              </div>

              {
    /* Top-Right Quick Action Icons */
  }
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
    onClick={handleShare}
    aria-label="Share product"
    title="Copy link"
    className="p-2.5 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 hover:text-stone-950 backdrop-blur-md shadow-sm transition-transform hover:scale-105 cursor-pointer"
  >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
                  title={wishlisted ? "Remove from favorites" : "Save to favorites"}
                  className={`p-2.5 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md shadow-sm transition-transform hover:scale-105 cursor-pointer ${wishlisted ? "text-rose-600" : "text-stone-700 dark:text-stone-200"}`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? "fill-rose-600 text-rose-600" : ""}`} />
                </button>
                <button
    onClick={() => setIsLightboxOpen(true)}
    aria-label="Enlarge image"
    title="Inspect textures in fullscreen"
    className="p-2.5 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 hover:text-stone-950 backdrop-blur-md shadow-sm transition-transform hover:scale-105 cursor-pointer"
  >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {
    /* Bottom Angle Indicator */
  }
              <div className="absolute bottom-4 right-4 bg-stone-950/60 text-white text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-md">
                Angle {activeImageIndex + 1} of {galleryImages.length}
              </div>
            </div>

            {
    /* Thumbnail Preview Selector */
  }
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => <button
    key={idx}
    onClick={() => setActiveImageIndex(idx)}
    className={`relative aspect-4/3 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-stone-100 dark:bg-stone-800 ${activeImageIndex === idx ? "border-amber-700 dark:border-amber-500 shadow-md ring-2 ring-amber-300 dark:ring-amber-900" : "border-transparent opacity-75 hover:opacity-100"}`}
  >
                  <img
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  onError={(e) => {
                    e.currentTarget.src = PRODUCT_DETAIL_FALLBACK;
                  }}
                  className="w-full h-full object-cover"
                />
                  {activeImageIndex === idx && <span className="absolute inset-0 bg-amber-900/10 pointer-events-none" />}
                </button>)}
            </div>

            {
    /* Workshop Authenticity Guarantee Banner */
  }
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-amber-800 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                <p className="font-semibold text-sm mb-0.5">The Fur Studio Standard</p>
                <p className="text-amber-900/80 dark:text-amber-300/80">
                  Every piece is built in small batches using sustainably harvested kiln-dried timber, mortise-and-tenon joinery, and non-toxic food-safe hardwax oils. Covered by our 10-year solid frame structural guarantee.
                </p>
              </div>
            </div>

          </div>

          {
    /* Right Column: Pricing, Options & Dynamic Calculator (5 cols) */
  }
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {
    /* Title & Reviews */
  }
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
                <span className="font-medium tracking-wide uppercase">{product.category} • SKU: {product.sku}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Ready to Dispatch
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                {product.name}
              </h1>

              {
    /* Ratings and Reviews Link */
  }
              <div className="mt-2.5 flex items-center gap-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => <Star
    key={i}
    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-500 text-amber-500" : "fill-stone-200 dark:fill-stone-700 text-stone-200 dark:text-stone-700"}`}
  />)}
                </div>
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{product.rating}</span>
                <span className="text-xs text-stone-400">
                  ({product.reviewCount} verified studio reviews)
                </span>
              </div>

              {
    /* Price Banner */
  }
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && <span className="text-base text-stone-400 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>}
                {product.originalPrice && <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold">
                    Save ${(product.originalPrice - product.price).toLocaleString()}
                  </span>}
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                Prices include all local taxes. Free white-glove shipping on orders over $500.
              </p>
            </div>

            {
    /* Short Narrative Description */
  }
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              {product.longDescription || product.description}
            </p>

            {/* Finish / Color Selection Swatches with Live Timber Profile */}
            {product.colors && product.colors.length > 0 && (
              <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                      Finish / Timber Option:
                    </label>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      Hand-planed & finished in small studio batches
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-900">
                    {selectedColor}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? "border-amber-800 dark:border-amber-500 ring-2 ring-amber-300 dark:ring-amber-900 scale-110 shadow-sm"
                          : "border-stone-300 dark:border-stone-700 opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check className="w-4 h-4 text-stone-900 drop-shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Live Swatch Material Detail Card */}
                <div className="p-3.5 rounded-2xl bg-stone-100/70 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-stone-900 dark:text-stone-100 block">
                        {currentFinishInfo.timber}
                      </span>
                      <span className="text-[11px] text-amber-800 dark:text-amber-400 font-medium">
                        {currentFinishInfo.finish}
                      </span>
                    </div>
                    <button
                      onClick={handleOrderSwatchKit}
                      className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 hover:bg-amber-200 cursor-pointer transition-colors"
                      title="Request real wood & fabric sample mailed to you"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Free Swatch Kit</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-tight">
                    {currentFinishInfo.grain}
                  </p>
                </div>
              </div>
            )}

            {/* Dynamic Add-to-Cart Price Calculator Panel */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Cart Price Calculator
                </span>
                <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                  Live Estimate
                </span>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between py-1">
                <div>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                    Quantity
                  </span>
                  <span className="text-[11px] text-stone-400 tabular-nums">
                    ${unitPrice.toLocaleString()} per piece
                  </span>
                </div>

                <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-full px-2 py-1 bg-stone-50 dark:bg-stone-800">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 disabled:opacity-30 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-xs font-bold tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* White-Glove In-Home Assembly Add-on */}
              <label className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 cursor-pointer transition-colors hover:bg-stone-100/70">
                <input
                  type="checkbox"
                  checked={includeAssembly}
                  onChange={(e) => setIncludeAssembly(e.target.checked)}
                  className="mt-0.5 rounded border-stone-300 text-amber-800 focus:ring-amber-700 cursor-pointer"
                />
                <div className="text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      Add White-Glove In-Home Assembly
                    </span>
                    <span className="font-bold text-amber-800 dark:text-amber-400 tabular-nums">
                      +${(assemblyPricePerUnit * quantity).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    Our two-person team will unbox, assemble in your chosen room, and haul away all packaging.
                  </p>
                </div>
              </label>

              {/* Live Delivery City Estimator Selector */}
              <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/50 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    Delivery Destination:
                  </span>
                  <select
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="text-xs bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-2 py-1 font-medium text-stone-800 dark:text-stone-200 cursor-pointer"
                  >
                    {Object.keys(deliveryEstimates).map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-600 dark:text-stone-400">
                  <span>Dispatch Window:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {deliveryEstimates[deliveryLocation]?.time} ({deliveryEstimates[deliveryLocation]?.slot})
                  </span>
                </div>
              </div>

              {/* Price Calculation Breakdown with Tabular Numbers */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-1 text-xs text-stone-600 dark:text-stone-300 tabular-nums">
                <div className="flex justify-between">
                  <span>
                    Items ({quantity} {quantity === 1 ? "piece" : "pieces"})
                  </span>
                  <span>${itemsSubtotal.toLocaleString()}</span>
                </div>
                {includeAssembly && (
                  <div className="flex justify-between text-amber-800 dark:text-amber-400 font-medium">
                    <span>In-Home Assembly Service</span>
                    <span>+${assemblySubtotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-500 dark:text-stone-400">
                  <span>Shipping ({deliveryLocation})</span>
                  <span>{calculatedGrandTotal >= 500 ? "FREE (White-Glove)" : deliveryEstimates[deliveryLocation]?.cost}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex justify-between items-baseline font-bold text-base text-stone-900 dark:text-stone-100">
                  <span>Calculated Total</span>
                  <span className="text-xl font-serif text-amber-800 dark:text-amber-400">
                    ${calculatedGrandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 px-6 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 font-semibold text-xs sm:text-sm tracking-wide shadow-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                  id="pdp-add-to-cart-btn"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add to Cart • ${calculatedGrandTotal.toLocaleString()}
                  </span>
                </button>

                <button
                  onClick={handleDirectTelegramOrder}
                  className="w-full py-3 px-6 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  id="pdp-telegram-order-btn"
                  title="Directly chat with Theng Seyha on Telegram with this configuration"
                >
                  <Send className="w-4 h-4" />
                  <span>Order Directly via Telegram Bot</span>
                </button>
              </div>

              {/* Support & Quick Inquiry */}
              <div className="pt-2 text-center">
                <button
                  onClick={() => setIsTelegramModalOpen(true)}
                  className="text-[11px] text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 underline cursor-pointer"
                >
                  Need custom dimensions or timber swatches? Ask Theng Seyha
                </button>
              </div>
            </div>

            {/* Architectural Doorway & Elevator Clearance Indicator */}
            <div className="p-3.5 rounded-2xl bg-stone-100/80 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-amber-700" />
                <div>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                    Doorway Clearance Verified
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    Package profile fits standard 76 cm (30") doorways & elevators
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                Guaranteed Fit
              </span>
            </div>

            {/* Bundle & Save 10% Pairing Module */}
            {bundleCompanion && (
              <div className="p-4 rounded-2xl bg-stone-900 text-stone-100 dark:bg-stone-800/90 border border-stone-800 dark:border-stone-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    Studio Curated Pairing • Save 10%
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                    Bundle Discount
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={bundleCompanion.image}
                    alt={bundleCompanion.name}
                    onError={(e) => {
                      e.currentTarget.src = PRODUCT_DETAIL_FALLBACK;
                    }}
                    className="w-14 h-14 rounded-xl object-cover bg-stone-800 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-white truncate">
                      Pair with: {bundleCompanion.name}
                    </h5>
                    <p className="text-[11px] text-stone-400 truncate">
                      {bundleCompanion.category} • Matching timber finish
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 tabular-nums">
                      <span className="text-xs font-bold text-amber-400">
                        Bundle Total: ${Math.round((product.price + bundleCompanion.price) * 0.9).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-stone-500 line-through">
                        ${(product.price + bundleCompanion.price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddBundleToCart}
                  disabled={bundleAdded}
                  className="w-full py-2.5 px-4 rounded-full bg-amber-700 hover:bg-amber-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {bundleAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added Pair to Cart!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Both to Cart (Save 10%)</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-2 gap-3 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-100/60 dark:bg-stone-800/40">
                <Truck className="w-4 h-4 text-stone-400" />
                <span>Dispatched in 24h</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-100/60 dark:bg-stone-800/40">
                <Clock className="w-4 h-4 text-stone-400" />
                <span>30-Day in-home trial</span>
              </div>
            </div>

          </div>

        </div>

        {
    /* 3. Detailed Technical Specifications (Tabs & Accordions) */
  }
        <div className="mt-16 sm:mt-24 pt-12 border-t border-stone-200 dark:border-stone-800">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                Craftsmanship & Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-1 text-stone-900 dark:text-stone-100">
                Specifications & Materials
              </h2>
            </div>

            {
    /* Tab Navigation */
  }
            <div className="flex items-center justify-center gap-2 sm:gap-4 border-b border-stone-200 dark:border-stone-800 pb-3 mb-8 overflow-x-auto">
              {[
    { id: "dimensions", label: "Dimensions & Fit", icon: Ruler },
    { id: "materials", label: "Materials & Joinery", icon: Layers },
    { id: "delivery", label: "Shipping & Delivery", icon: Truck },
    { id: "care", label: "Care & Maintenance", icon: Sparkles }
  ].map((tab) => {
    const Icon = tab.icon;
    return <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${activeTab === tab.id ? "bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 bg-stone-100/60 dark:bg-stone-800/60"}`}
    >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>;
  })}
            </div>

            {
    /* Tab 1: Dimensions & Fit */
  }
            {activeTab === "dimensions" && <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 space-y-6"
  >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
                      Overall Dimensions
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
                      <li className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                        <span>Width</span>
                        <span className="font-semibold">{product.detailedDimensions?.width || product.dimensions}</span>
                      </li>
                      <li className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                        <span>Depth</span>
                        <span className="font-semibold">{product.detailedDimensions?.depth || "Standard"}</span>
                      </li>
                      <li className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                        <span>Height</span>
                        <span className="font-semibold">{product.detailedDimensions?.height || "Standard"}</span>
                      </li>
                      {product.detailedDimensions?.seatHeight && <li className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                          <span>Seat Height</span>
                          <span className="font-semibold">{product.detailedDimensions.seatHeight}</span>
                        </li>}
                      {product.detailedDimensions?.seatDepth && <li className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                          <span>Seat Depth</span>
                          <span className="font-semibold">{product.detailedDimensions.seatDepth}</span>
                        </li>}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
                      Weight & Packaging
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
                      <li className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                        <span>Product Weight</span>
                        <span className="font-semibold">{product.weight}</span>
                      </li>
                      <li className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                        <span>Assembly Level</span>
                        <span className="font-semibold">{product.assembly}</span>
                      </li>
                      <li className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                        <span>Doorway Clearance</span>
                        <span className="font-semibold">Requires 30" (76 cm) minimum entry width</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {product.features && product.features.length > 0 && <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                      Key Architectural Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.features.map((feat, i) => <div key={i} className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
                          <Check className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                          <span>{feat}</span>
                        </div>)}
                    </div>
                  </div>}
              </motion.div>}

            {
    /* Tab 2: Materials & Joinery */
  }
            {activeTab === "materials" && <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 space-y-4"
  >
                <div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
                    Primary Materials
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {product.material}
                  </p>
                </div>

                {product.specs && product.specs.length > 0 && <div className="pt-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                      Joinery & Construction Data
                    </h4>
                    <div className="divide-y divide-stone-100 dark:divide-stone-800 text-xs">
                      {product.specs.map((s, i) => <div key={i} className="py-2.5 flex justify-between gap-4">
                          <span className="text-stone-500 dark:text-stone-400">{s.label}</span>
                          <span className="font-semibold text-right text-stone-900 dark:text-stone-100">{s.value}</span>
                        </div>)}
                    </div>
                  </div>}
              </motion.div>}

            {
    /* Tab 3: Shipping & Delivery */
  }
            {activeTab === "delivery" && <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed"
  >
                <div className="space-y-3">
                  <p>
                    <b>Lead Time:</b> {product.leadTime}
                  </p>
                  <p>
                    <b>Phnom Penh & Regional Delivery:</b> Scheduled via our private climate-controlled van fleet. Customers receive an SMS and Telegram notification with live courier GPS link prior to arrival.
                  </p>
                  <p>
                    <b>In-Home White Glove Service:</b> If selected, our two-person crew unboxes the item, places it in your specified room, performs any necessary joinery setup, and takes away all cardboard for recycling.
                  </p>
                  <p>
                    <b>30-Day Guarantee:</b> Try the piece in your home for up to 30 days. If the dimensions or feel are not right, we will coordinate pickup and issue a full refund.
                  </p>
                </div>
              </motion.div>}

            {
    /* Tab 4: Care & Maintenance */
  }
            {activeTab === "care" && <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed"
  >
                <p><b>Routine Cleaning:</b> {product.careGuide}</p>
                <p><b>Natural Wood Care:</b> Solid timber reacts gently to seasonal humidity changes. Avoid placing solid oak pieces directly against hot radiant heaters or in non-stop direct sun. Clean surface dust using a dry microfiber cloth.</p>
                <p><b>Fabric Protection:</b> Our bouclé and linen textiles come pre-treated with water-repellent nano-coatings. Liquid spills will bead on the surface for up to 15 minutes before soaking in—dab gently with a clean dry towel without scrubbing.</p>
              </motion.div>}

          </div>
        </div>

        {
    /* 4. Customer Reviews Section */
  }
        {product.reviewsList && product.reviewsList.length > 0 && <div className="mt-16 sm:mt-24 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Customer Reviews
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Verified owner feedback from real homes
                </p>
              </div>

              <button
    onClick={() => setIsTelegramModalOpen(true)}
    className="text-xs font-semibold px-4 py-2 rounded-full border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
  >
                Submit a Review
              </button>
            </div>

            <div className="space-y-4">
              {product.reviewsList.map((rev) => <div
    key={rev.id}
    className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-2"
  >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{rev.author}</span>
                      {rev.verified && <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold">
                          Verified Buyer
                        </span>}
                    </div>
                    <span className="text-[11px] text-stone-400">{rev.date}</span>
                  </div>

                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />)}
                  </div>

                  <h5 className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    "{rev.title}"
                  </h5>

                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                    {rev.comment}
                  </p>

                  <p className="text-[10px] text-stone-400">Location: {rev.location}</p>
                </div>)}
            </div>
          </div>}

        {
    /* 5. You May Also Like / Curated Pairings */
  }
        <div className="mt-20 pt-12 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                Curated Pairings
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                Pieces That Complement This Space
              </h3>
            </div>

            <button
    onClick={() => navigateTo("shop")}
    className="text-xs font-semibold text-stone-900 dark:text-stone-100 hover:underline flex items-center gap-1 cursor-pointer"
  >
              <span>View full catalog</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>

        {/* Recently Viewed Shelf */}
        <div className="mt-12">
          <RecentlyViewed />
        </div>

      </div>

      {/* Sticky Mobile Purchase Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#181614]/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800/80 px-4 py-2.5 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = PRODUCT_DETAIL_FALLBACK;
            }}
            className="w-10 h-10 rounded-lg object-cover bg-stone-100 dark:bg-stone-800 shrink-0"
          />
          <div className="truncate">
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
              {product.name}
            </h4>
            <p className="text-[11px] font-bold text-amber-800 dark:text-amber-400">
              ${calculatedGrandTotal.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2 rounded-full border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer ${
              wishlisted
                ? "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
                : "text-stone-600 dark:text-stone-300"
            }`}
            aria-label="Save piece to wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={handleAddToCart}
            className="py-2 px-4 rounded-full bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {
    /* 6. Fullscreen Image Lightbox Modal */
  }
      <AnimatePresence>
        {isLightboxOpen && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md">
            <button
    onClick={() => setIsLightboxOpen(false)}
    className="absolute top-6 right-6 p-3 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
    aria-label="Close fullscreen view"
  >
              <X className="w-6 h-6" />
            </button>

            <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
  >
              <img
                src={activeImage}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.src = PRODUCT_DETAIL_FALLBACK;
                }}
                className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
              <p className="text-white/70 text-xs mt-3 text-center">
                {product.name} • {selectedColor} (Viewing angle {activeImageIndex + 1} of {galleryImages.length})
              </p>
            </motion.div>
          </div>}
      </AnimatePresence>

    </div>;
};
