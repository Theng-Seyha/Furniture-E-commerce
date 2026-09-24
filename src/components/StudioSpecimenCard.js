import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ShieldCheck, Ruler, Sparkles, Check, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ScrollReveal } from './ScrollReveal';

const SPECIMEN_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80';

/**
 * StudioSpecimenCard
 * Architectural Timber & Joinery Laboratory
 * Allows clients to inspect raw timber grains, dry density, kiln-dry moisture metrics,
 * and calculate apartment doorway clearances before placing bespoke orders.
 */
export const StudioSpecimenCard = () => {
  const { isDarkMode, toggleDarkMode, showToast } = useCart();
  const [selectedSpecimen, setSelectedSpecimen] = useState('oak');
  const [doorWidthInput, setDoorWidthInput] = useState('75');
  const [isWaxSimulated, setIsWaxSimulated] = useState(false);

  const specimens = {
    oak: {
      name: 'American White Oak',
      origin: 'Appalachian FSC Woodlands',
      density: '750 kg/m³',
      moisture: '8.5% Kiln-Dried',
      finish: 'Cold-Pressed Plant Wax',
      joint: 'Double-Pinned Mortise & Tenon',
      colorBadge: 'bg-[#D9C4A5]',
      artisanNote:
        'White oak has closed cellular tyloses, so if you spill a beverage during daily use, the liquid beads on the surface instead of soaking in and leaving dark water marks.',
      durability: 'Heirloom Grade (25+ yrs)',
      recommendedCare: 'Buff with a pea-sized dab of natural wax once a year.',
      image:
        'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=600&q=80',
    },
    walnut: {
      name: 'Smoked Walnut',
      origin: 'Sustainably Managed Ohio River Valley',
      density: '640 kg/m³',
      moisture: '9.0% Kiln-Dried',
      finish: 'Boiled Linseed & Carnauba',
      joint: 'Interlocking Finger Joints & Brass Bolts',
      colorBadge: 'bg-[#6B4E3D]',
      artisanNote:
        'Walnut has a naturally dark heartwood that lightens gracefully over decades with indirect natural light, developing that soft vintage patina admired in mid-century architectural studios.',
      durability: 'High Stability (20+ yrs)',
      recommendedCare: 'Wipe with a clean dry microfiber cloth. Avoid harsh ammonia cleaners.',
      image:
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80',
    },
    ash: {
      name: 'Natural Blonde Ash',
      origin: 'Temperate Northern Forests',
      density: '680 kg/m³',
      moisture: '8.0% Kiln-Dried',
      finish: 'Matte Breathable Hardwax',
      joint: 'Reinforced Corner Blocks & Tenons',
      colorBadge: 'bg-[#E5D7BF]',
      artisanNote:
        'Ash possesses extraordinary shock-absorption and tensile strength—the same timber favored for high-impact sporting gear. It accommodates everyday household life without risk of splitting.',
      durability: 'Heavy Daily Use (15+ yrs)',
      recommendedCare: 'Diluted natural castile soap in lukewarm water for stubborn marks.',
      image:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    },
  };

  const current = specimens[selectedSpecimen];
  const numDoorWidth = parseFloat(doorWidthInput) || 0;
  const clearsDoor = numDoorWidth >= 70;

  const handleSimulateWax = () => {
    setIsWaxSimulated(true);
    if (showToast) {
      showToast('Surface polished with non-toxic beeswax balm!');
    }
    setTimeout(() => setIsWaxSimulated(false), 2400);
  };

  return (
    <section
      id="studio-specimen-component"
      className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#121110] transition-colors duration-300 border-t border-stone-200/80 dark:border-stone-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Component Header with Quick Theme Swap Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/90 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Workshop Material & Architecture Lab</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Raw Timber & Joinery Specifications
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-xl">
              Inspect the exact wood grains, moisture metrics, and apartment clearances we test in our studio.
            </p>
          </div>

          {/* Theme Quick Toggle Pill */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Mode:</span>
            <button
              onClick={() => {
                toggleDarkMode();
                if (showToast) {
                  showToast(!isDarkMode ? 'Dark mode enabled' : 'Light mode enabled');
                }
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 shadow-2xs hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors cursor-pointer"
              title="Toggle Light or Dark Mode"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-stone-700" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Master Component Card */}
        <div className="rounded-3xl bg-white dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800 shadow-md overflow-hidden">
          {/* Top Specimen Tabs */}
          <div className="flex border-b border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/40 p-2 gap-2 overflow-x-auto">
            {Object.keys(specimens).map((key) => {
              const item = specimens[key];
              const isSelected = selectedSpecimen === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSpecimen(key)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-2xs border border-stone-200/80 dark:border-stone-700'
                      : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${item.colorBadge} shadow-2xs`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Technical Inspection (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSpecimen}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                        {current.name}
                      </h3>
                      <span className="text-xs px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-medium">
                        {current.origin}
                      </span>
                    </div>

                    {/* Artisan Workshop Note */}
                    <div className="mt-3 p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
                      <div className="flex items-start gap-2.5">
                        <span className="text-amber-800 dark:text-amber-400 font-bold text-xs uppercase tracking-wider shrink-0 mt-0.5">
                          Artisan Note:
                        </span>
                        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                          "{current.artisanNote}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4 Physical Specification Tiles */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200/70 dark:border-stone-800">
                      <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block">
                        Dry Density
                      </span>
                      <span className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-1 block">
                        {current.density}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200/70 dark:border-stone-800">
                      <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block">
                        Moisture Content
                      </span>
                      <span className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-1 block">
                        {current.moisture}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200/70 dark:border-stone-800">
                      <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block">
                        Joinery Type
                      </span>
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 mt-1 block leading-snug truncate">
                        {current.joint}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200/70 dark:border-stone-800">
                      <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400 block">
                        Lifespan Rating
                      </span>
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-1 block">
                        {current.durability}
                      </span>
                    </div>
                  </div>

                  {/* Surface Maintenance & Wax Interaction */}
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-xs text-stone-600 dark:text-stone-400">
                      <span className="font-semibold text-stone-900 dark:text-stone-200">Recommended Care:</span>{' '}
                      {current.recommendedCare}
                    </div>

                    <button
                      onClick={handleSimulateWax}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-900 text-stone-50 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-all cursor-pointer shadow-2xs shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isWaxSimulated ? 'Surface Waxed & Protected' : 'Buff Wood Surface'}</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Apartment Doorway Clearance Calculator */}
              <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 dark:text-stone-100">
                    <Ruler className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <span>Check Apartment Door Clearance:</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="number"
                        min="50"
                        max="150"
                        value={doorWidthInput}
                        onChange={(e) => setDoorWidthInput(e.target.value)}
                        className="w-20 px-2.5 py-1 text-xs font-bold rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-center focus:outline-hidden focus:ring-1 focus:ring-amber-600"
                      />
                      <span className="absolute right-2 top-1 text-[10px] text-stone-400 pointer-events-none">
                        cm
                      </span>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        clearsDoor
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                      }`}
                    >
                      {clearsDoor ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Passes cleanly through door</span>
                        </>
                      ) : (
                        <span>Needs angled leg unbolting</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Stage (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-5/4 bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-sm">
                <img
                  src={current.image}
                  alt={current.name}
                  onError={(e) => {
                    e.currentTarget.src = SPECIMEN_FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Specimen Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 dark:border-stone-700 shadow-md flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      {current.name}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Finish: {current.finish}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Zero VOC Wax</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
