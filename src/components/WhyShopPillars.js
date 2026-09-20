import { motion } from "motion/react";
import { Gem, Compass, Sparkles, HeartHandshake } from "lucide-react";
export const WhyShopPillars = () => {
  const pillars = [
    {
      icon: Gem,
      title: "Kiln-Dried Hardwood",
      desc: "Dried to 8% moisture so the wood won't crack or warp when the monsoon season hits."
    },
    {
      icon: Compass,
      title: "Interlocking Joinery",
      desc: "Wood-to-wood joinery with solid brass fittings, not flimsy plastic brackets."
    },
    {
      icon: Sparkles,
      title: "Apartment Proportions",
      desc: "Sensible footprints that leave breathing room in compact studios and busy living rooms."
    },
    {
      icon: HeartHandshake,
      title: "Direct Workshop Help",
      desc: "Chat with me or our woodworkers on Telegram anytime for sizing advice or care tips."
    }
  ];
  return <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            What goes into every piece
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
            Simple, honest build principles we test in our studio before anything ships
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((item, index) => {
    const Icon = item.icon;
    return <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-md transition-shadow"
    >
                <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800/80 flex items-center justify-center text-amber-800 dark:text-amber-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                  {item.desc}
                </p>
              </motion.div>;
  })}
        </div>

      </div>
    </section>;
};
