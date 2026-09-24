import { Award, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export const ValueProps = () => {
  const values = [
    {
      icon: Award,
      title: "Solid Timber Only",
      description: "Real oak and walnut lumber, not paper veneer that bubbles after one spill."
    },
    {
      icon: Truck,
      title: "Apartment Friendly",
      description: "Carefully dimensioned to fit up stairwells and through narrow 75cm doorways."
    },
    {
      icon: RotateCcw,
      title: "30-Day Living Test",
      description: "Try it in your actual home. If it doesn't fit your space, we'll pick it back up."
    },
    {
      icon: ShieldCheck,
      title: "Workshop Direct",
      description: "Crafted locally in Phnom Penh. You pay for honest timber, not luxury showroom rent."
    }
  ];
  return (
    <section className="py-6 sm:py-8 border-y border-stone-200/80 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.title}
                animation="fade-up"
                delay={index * 80}
                duration={0.6}
                className="flex items-center gap-4 py-2"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-white dark:bg-stone-800 shadow-xs border border-stone-200/80 dark:border-stone-700/80 flex items-center justify-center text-amber-800 dark:text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
