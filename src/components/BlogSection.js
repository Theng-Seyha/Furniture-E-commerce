import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Calendar, Clock, X } from "lucide-react";
import { BLOG_POSTS } from "../data/furnitureData";
export const BlogSection = () => {
  const [activePost, setActivePost] = useState(null);
  return <section id="blog" className="py-14 sm:py-24 bg-stone-100/40 dark:bg-stone-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {
    /* Header */
  }
        <div className="flex items-center justify-between mb-10 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Studio Journal & Wood Notes
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
              Short notes from our bench on timber selection, apartment layouts, and caring for solid wood
            </p>
          </div>
          <button
            onClick={() => setActivePost(BLOG_POSTS[0])}
            className="group hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span>Read All Notes</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {
    /* 3 Blog Cards Grid */
  }
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post, index) => <motion.article
    key={post.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    onClick={() => setActivePost(post)}
    className="group flex flex-col bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 border border-stone-200/70 dark:border-stone-800 cursor-pointer"
  >
              {
    /* Cover Image */
  }
              <div className="relative aspect-16/10 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <img
    src={post.image}
    alt={post.title}
    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
    loading="lazy"
  />
              </div>

              {
    /* Text Info */
  }
              <div className="p-6 flex flex-col grow justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[11px] font-medium text-stone-400 dark:text-stone-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-xs text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-800 dark:text-amber-400 group-hover:underline flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.article>)}
        </div>

      </div>

      {
    /* Article Detail Reading Modal */
  }
      <AnimatePresence>
        {activePost && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
            <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="bg-white dark:bg-stone-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 relative"
  >
              <button
    onClick={() => setActivePost(null)}
    className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
    aria-label="Close article"
  >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-16/9 rounded-2xl overflow-hidden mb-6">
                <img
    src={activePost.image}
    alt={activePost.title}
    className="w-full h-full object-cover"
  />
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
                <span>{activePost.date}</span>
                <span>•</span>
                <span>{activePost.readTime}</span>
                <span>•</span>
                <span className="text-amber-800 dark:text-amber-400 font-medium">By {activePost.author}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {activePost.title}
              </h2>

              <div className="mt-6 space-y-4 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {activePost.content.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
                <button
    onClick={() => setActivePost(null)}
    className="px-6 py-2.5 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 text-xs font-semibold hover:opacity-90"
  >
                  Done Reading
                </button>
              </div>
            </motion.div>
          </div>}
      </AnimatePresence>
    </section>;
};
