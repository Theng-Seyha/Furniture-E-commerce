import { useState } from "react";
import { motion } from "motion/react";
import { Check, Mail } from "lucide-react";
import { useCart } from "../context/CartContext";
import { ScrollReveal } from "./ScrollReveal";

const PLANT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useCart();
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.");
      return;
    }
    setIsSubscribed(true);
    showToast("\u2728 Thank you for subscribing! Check your inbox for $50 off your first purchase.");
  };
  return (
    <section className="py-14 sm:py-20" id="newsletter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#FAF3EA] dark:bg-[#1A1816] border border-stone-200/90 dark:border-stone-800 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content with scroll reveal */}
            <ScrollReveal
              animation="fade-up"
              duration={0.75}
              className="lg:col-span-8 text-left"
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                Stay in touch with our workshop
              </h2>
              <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 font-normal max-w-xl">
                We only send an update when we complete a new timber batch or publish a wood repair guide. No promotional spam, ever.
              </p>

              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold"
                >
                  <Check className="w-4 h-4" />
                  <span>You are subscribed! Welcome to the Anti design circle.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md">
                  <div className="relative grow">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white dark:bg-stone-900 border border-stone-300/80 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-700"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </ScrollReveal>

            {/* Right Decorative Plant with scroll reveal */}
            <ScrollReveal
              animation="fade-left"
              delay={100}
              duration={0.8}
              className="lg:col-span-4 flex justify-center lg:justify-end"
            >
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-sm bg-stone-100 dark:bg-stone-800 p-2">
                <img
                  src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80"
                  alt="Architectural indoor plant"
                  onError={(e) => {
                    e.currentTarget.src = PLANT_FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
