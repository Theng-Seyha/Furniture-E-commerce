import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "../data/furnitureData";
import { useCart } from "../context/CartContext";
import { ScrollReveal } from "./ScrollReveal";

const CATEGORY_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80";

export const CategoryBrowser = ({ onSelectCategory }) => {
  const { selectedCategory } = useCart();
  return (
    <section className="py-14 sm:py-20" id="categories-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal
          animation="fade-up"
          duration={0.7}
          className="flex items-center justify-between mb-8 sm:mb-12"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Browse by Room & Category
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
              Solid wood furniture dimensioned to fit practical apartment floor plans
            </p>
          </div>
          <button
            onClick={() => onSelectCategory("All")}
            className="group hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </ScrollReveal>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
          {CATEGORIES.map((cat, index) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <ScrollReveal
                key={cat.id}
                animation="fade-up"
                delay={index * 60}
                duration={0.6}
                as="button"
                onClick={() => onSelectCategory(cat.name)}
                className="group flex flex-col items-center text-center cursor-pointer focus:outline-hidden"
              >
                {/* Circular image with hover border ring */}
                <div
                  className={`w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden p-1 transition-all duration-300 ${isSelected ? "ring-2 ring-amber-700 dark:ring-amber-500 shadow-md scale-105" : "group-hover:ring-2 group-hover:ring-stone-400 dark:group-hover:ring-stone-600"}`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      onError={(e) => {
                        e.currentTarget.src = CATEGORY_FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Category Name */}
                <span
                  className={`mt-3 text-xs sm:text-sm font-medium tracking-tight transition-colors ${isSelected ? "text-amber-800 dark:text-amber-400 font-semibold" : "text-stone-800 dark:text-stone-200 group-hover:text-stone-950 dark:group-hover:text-white"}`}
                >
                  {cat.name}
                </span>
                <span className="text-[11px] text-stone-400 dark:text-stone-500">
                  {cat.itemCount} items
                </span>
              </ScrollReveal>
            );
          })}
        </div>

        {
    /* Mobile View All button */
  }
        <div className="mt-8 text-center sm:hidden">
          <button
    onClick={() => onSelectCategory("All")}
    className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:text-amber-800"
  >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
