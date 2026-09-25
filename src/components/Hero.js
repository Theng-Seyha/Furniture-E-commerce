import { motion } from "motion/react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
export const Hero = ({ onShopNow, onViewCollections }) => {
  return <section id="hero" className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {
    /* Left Text Column */
  }
          <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="lg:col-span-5 flex flex-col justify-center text-left"
  >
            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-7xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-[1.05] tracking-tight">
              Furniture made to be lived with, <br />
              <span className="text-amber-800 dark:text-amber-500 italic font-medium">not just looked at.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-lg font-normal leading-relaxed">
              I started building these pieces because most modern furniture feels disposable. We use solid kiln-dried timber and traditional joinery to create furniture that survives real life and ages beautifully in your home.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onShopNow}
                className="px-7 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 text-sm font-semibold tracking-tight shadow-sm transition-all cursor-pointer"
                id="hero-shop-now-btn"
              >
                Explore Pieces
              </motion.button>

              <button
                onClick={onViewCollections}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer"
                id="hero-view-collections-btn"
              >
                <span>View Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Highlights row */}
            <div className="mt-9 pt-6 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-wrap items-center gap-5 text-xs text-stone-600 dark:text-stone-400 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 dark:text-amber-500" />
                Solid Oak & Walnut Timber
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 dark:text-amber-500" />
                Scaled for Real Apartments
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700 dark:text-amber-500" />
                Workshop-Direct Pricing
              </span>
            </div>
          </motion.div>

          {
    /* Right Hero Image Column */
  }
          <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    className="lg:col-span-7 relative"
  >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-stone-200 dark:bg-stone-800 aspect-4/3 sm:aspect-16/11">
              <img
    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85"
    alt="Fur modern furniture living room collection"
    className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
    loading="eager"
  />

              {
    /* Floating Pill Badge */
  }
              <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.6 }}
    className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/40 dark:border-stone-700/60 shadow-lg flex items-center gap-3"
  >
                <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-800 dark:text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">Signature Living 2025</p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">Handcrafted in small batches</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>;
};
