import { ArrowRight, Quote } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const AVATAR_FALLBACK =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80";

export const SocialProofBanner = ({ onReadStories }) => {
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80"
  ];
  return (
    <section className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-xl">
          {/* Dark Warm Card with scroll reveal */}
          <ScrollReveal
            animation="fade-up"
            duration={0.75}
            className="lg:col-span-6 bg-[#2B231F] text-[#F9F7F4] p-8 sm:p-12 lg:p-16 flex flex-col justify-between"
          >
            <div>
              <Quote className="w-10 h-10 text-amber-500/80 mb-6" />
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic font-normal leading-snug tracking-tight text-amber-50/95">
                &ldquo;A good table should survive late-night study sessions, coffee spills, and three apartment moves without wobbling.&rdquo;
              </h3>
            </div>

            <div className="mt-10 pt-8 border-t border-stone-700/60">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5 overflow-hidden">
                    {avatars.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt="Customer portrait"
                        onError={(e) => {
                          e.currentTarget.src = AVATAR_FALLBACK;
                        }}
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-[#2B231F] object-cover"
                      />
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">Furnishing Real Homes</p>
                    <p className="text-xs text-stone-400">Over 2,000 apartments & studios across Phnom Penh & SE Asia</p>
                  </div>
                </div>

                <button
                  onClick={onReadStories}
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>Read Customer Notes</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Warm Ambient Photo with scroll reveal */}
          <ScrollReveal
            animation="fade-left"
            delay={100}
            duration={0.8}
            className="lg:col-span-6 min-h-[300px] lg:min-h-full bg-stone-300 relative overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80"
              alt="Warm nightstand lamp and ceramic setting"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80";
              }}
              className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-stone-900/15 pointer-events-none" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
