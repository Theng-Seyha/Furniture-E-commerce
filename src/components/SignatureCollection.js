import { ArrowRight } from 'lucide-react';
import { SIGNATURE_PRODUCTS } from '../data/furnitureData';
import { ProductCard } from './ProductCard';

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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-700 dark:bg-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                Crafted in Small Batches
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Signature Studio Pieces
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-xl">
              Tested daily in our workshop. Solid kiln-dried oak, natural plant wax, and dense fabrics made to last.
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
        </div>

        {/* Reusable Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SIGNATURE_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              aspectRatio="aspect-square"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
