import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const CRAFT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80";

export const WhyChooseAnti = () => {
  const [showStoryModal, setShowStoryModal] = useState(false);
  const points = [
    {
      title: "Real Solid Hardwood",
      desc: "Every frame is cut from solid kiln-dried oak and ash. When you bump into it, you get wood grain—not pressed cardboard."
    },
    {
      title: "Joints That Stay Tight",
      desc: "Interlocking mortise-and-tenon joints with brass inserts so legs never wobble, even after moving between three apartments."
    },
    {
      title: "Surfaces You Can Actually Repair",
      desc: "Finished with natural plant oil and beeswax. If you get a water ring or scuff, a two-minute rub with wax restores it."
    },
    {
      title: "Built for Real Living Spaces",
      desc: "Proportions tested in typical urban apartments: deep enough for a long study session, compact enough to walk around comfortably."
    }
  ];
  return (
    <section id="why-anti" className="py-14 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text & Features with scroll reveal */}
          <ScrollReveal
            animation="fade-up"
            duration={0.75}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-px bg-amber-700/60 dark:bg-amber-400/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-400">
                Philosophy
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight">
              Quiet intention, <br />
              built to last.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-stone-500 dark:text-stone-400 font-normal leading-relaxed">
              As an architecture student in Phnom Penh, I got tired of furniture that falls apart the second you move it. Here is what we do differently.
            </p>

            <div className="mt-6 mb-8">
              <button
                onClick={() => setShowStoryModal(true)}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition-colors cursor-pointer"
              >
                <span>Read the Student Workshop Notes</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Checklist */}
            <div className="space-y-4">
              {points.map((pt, i) => (
                <ScrollReveal
                  key={pt.title}
                  animation="fade-up"
                  delay={i * 80}
                  duration={0.5}
                  className="flex items-start gap-3.5"
                >
                  <div className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-800 dark:text-amber-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      {pt.title}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      {pt.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Styled Composition Image with scroll reveal */}
          <ScrollReveal
            animation="fade-left"
            delay={100}
            duration={0.8}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-stone-200 dark:bg-stone-800 aspect-4/3 sm:aspect-5/4">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
                alt="Anti furniture craftsmanship and design detail"
                onError={(e) => {
                  e.currentTarget.src = CRAFT_FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs sm:text-sm font-light italic">
                &ldquo;Honest timber. Balanced form. Built with quiet intention.&rdquo;
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>

      {
    /* Story Philosophy Modal */
  }
      <AnimatePresence>
        {showStoryModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
            <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="bg-white dark:bg-stone-900 max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 relative"
  >
              <button
    onClick={() => setShowStoryModal(false)}
    className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
  >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Notes from the Workshop Desk
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 mt-4 leading-relaxed">
                Hi, I'm Theng Seyha. I study architecture in Phnom Penh and spend my weekends in our small woodshop. I started Anti because all the modern furniture I could afford as a student was made from glued sawdust with paper veneer that bubbled the first time I set down a cold drink.
              </p>
              <p className="text-sm text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
                We do things the slow way: solid kiln-dried oak, traditional mortise joints, and non-toxic plant wax. You can assemble or disassemble each piece in under 10 minutes without stripping the screws. If you ever have a question about sizing or custom timber, reach out directly to me on Telegram.
              </p>

              <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
                <button
    onClick={() => setShowStoryModal(false)}
    className="px-5 py-2 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 text-xs font-semibold"
  >
                  Close
                </button>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>
    </section>
  );
};
