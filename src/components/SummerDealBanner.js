import { motion } from "motion/react";
import { ArrowRight, Tag, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
import { ScrollReveal } from "./ScrollReveal";

const DEAL_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80";

export const SummerDealBanner = ({ onGrabDeal }) => {
  const { applyPromoCode, showToast } = useCart();
  const handleClaim = () => {
    applyPromoCode("SUMMER25");
    showToast('\u{1F3F7}\uFE0F "SUMMER25" applied! Enjoy 25% off your order.');
    onGrabDeal();
  };
  return (
    <section className="py-8 sm:py-12" id="summer-deal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#ECE6DC] dark:bg-[#1E1B19] border border-stone-300/60 dark:border-stone-800 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Offer Content with scroll reveal */}
            <ScrollReveal
              animation="fade-up"
              duration={0.75}
              className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/80 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-xs font-semibold self-start mb-4">
                <Tag className="w-3.5 h-3.5" />
                <span>Seasonal Studio Batch</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-[1.15]">
                Summer Workshop Batch <br />
                <span className="text-amber-800 dark:text-amber-500 font-normal">
                  25% Off Dining & Seating
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-stone-600 dark:text-stone-300 font-normal max-w-md">
                We just finished our seasonal timber run of solid oak tables and lounge chairs. Use code{" "}
                <span className="font-semibold text-stone-800 dark:text-stone-100">SUMMER25</span> to
                take 25% off while timber stocks last.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClaim}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
                  id="grab-deal-btn"
                >
                  <span>Grab the Deal</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-300/60 dark:border-stone-700">
                  CODE: SUMMER25
                </span>
              </div>
            </ScrollReveal>

            {/* Right Dining Set Image with scroll reveal */}
            <ScrollReveal
              animation="zoom-in"
              delay={100}
              duration={0.8}
              className="lg:col-span-6 h-72 sm:h-96 lg:h-full relative overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80"
                alt="Anti Summer Dining Table & Chairs Special"
                onError={(e) => {
                  e.currentTarget.src = DEAL_FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs px-3 py-1.5 rounded-full text-xs font-semibold text-stone-800 dark:text-stone-200 shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Free White-Glove Assembly
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
