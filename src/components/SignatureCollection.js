import { ArrowRight } from 'lucide-react';
import { SIGNATURE_PRODUCTS } from '../data/furnitureData';
import { ProductCard } from './ProductCard';
import { ScrollReveal } from './ScrollReveal';

/**
 * Signature Collection Showcase
 * Highlights heirloom pieces crafted with solid hardwoods and tactile upholstery.
 */
export const SignatureCollection = ({ onViewAll }) => {
  return (
    <section
      id="signature-collection"
      className="py-14 sm:py-20 bg-stone-100/60 dark:bg-stone-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal
          animation="fade-up"
          duration={0.7}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-px bg-amber-700/60 dark:bg-amber-400/60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-400">
                The Curated Edit
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
              Signature Artifacts.
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-3 leading-relaxed">
              Tested daily in our workshop. Solid kiln-dried oak, natural plant wax, and dense fabrics made for honest living.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-400 transition-colors self-start sm:self-auto cursor-pointer"
            id="view-all-signature-btn"
          >
            <span>View All Pieces</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </ScrollReveal>

        {/* Reusable Product Cards Grid with scroll reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SIGNATURE_PRODUCTS.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              aspectRatio="aspect-square"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
