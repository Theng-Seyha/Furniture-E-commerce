import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
export const ToastNotification = () => {
  const { toastMessage, setIsCartOpen } = useCart();
  return <AnimatePresence>
      {toastMessage && <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.95 }}
    className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-stone-900/95 dark:bg-stone-100/95 text-stone-50 dark:text-stone-900 px-4 py-3 rounded-2xl shadow-xl border border-stone-700 dark:border-stone-300 backdrop-blur-md flex items-center justify-between gap-3"
  >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 dark:text-amber-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4" />
            </div>
            <p className="text-xs font-medium leading-tight line-clamp-2">
              {toastMessage}
            </p>
          </div>

          <button
    onClick={() => setIsCartOpen(true)}
    className="text-[11px] font-bold text-amber-400 dark:text-amber-700 hover:underline shrink-0 flex items-center gap-1"
  >
            <ShoppingBag className="w-3 h-3" />
            <span>View</span>
          </button>
        </motion.div>}
    </AnimatePresence>;
};
