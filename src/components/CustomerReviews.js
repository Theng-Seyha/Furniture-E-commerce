import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "../data/furnitureData";
import { ScrollReveal } from "./ScrollReveal";

const REVIEW_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80";

export const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = TESTIMONIALS[currentIndex];
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };
  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-xl">
          {/* Dark Box with scroll reveal */}
          <ScrollReveal
            animation="fade-up"
            duration={0.75}
            className="lg:col-span-6 bg-[#323630] dark:bg-[#1C1F1B] text-[#FAF8F5] p-8 sm:p-12 lg:p-16 flex flex-col justify-between min-h-[380px]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs tracking-widest uppercase font-semibold text-amber-300">
                  Customer Testimonial
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6 tracking-tight">
                Notes from Recent Buyers
              </h3>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-base sm:text-lg font-serif font-light italic leading-relaxed text-stone-200">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-semibold text-amber-200">
                    — {current.author}, <span className="text-xs font-normal text-stone-300">{current.role}</span>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="mt-8 pt-6 border-t border-stone-600/50 flex items-center justify-between">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${currentIndex === idx ? "w-6 bg-white" : "w-2 bg-stone-500/60"}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className="p-2 rounded-full bg-stone-700/50 hover:bg-stone-700 text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next review"
                  className="p-2 rounded-full bg-stone-700/50 hover:bg-stone-700 text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Image with scroll reveal */}
          <ScrollReveal
            animation="fade-left"
            delay={100}
            duration={0.8}
            className="lg:col-span-6 min-h-[300px] lg:min-h-full bg-stone-200 relative overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
              alt="Cozy styled modern apartment living room"
              onError={(e) => {
                e.currentTarget.src = REVIEW_FALLBACK_IMAGE;
              }}
              className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
