import { createContext, useContext, useEffect, useState } from 'react';
import { ALL_PRODUCTS } from '../data/furnitureData';

const CartContext = createContext(undefined);

const CART_STORAGE_KEY = 'fur_furniture_cart_v2';
const WISHLIST_STORAGE_KEY = 'fur_furniture_wishlist_v1';
const THEME_STORAGE_KEY = 'fur_furniture_theme';
const ORDERS_STORAGE_KEY = 'fur_furniture_orders_v1';
const RECENT_ORDER_KEY = 'fur_recent_order';
const RECENTLY_VIEWED_KEY = 'fur_recently_viewed_v1';
const ASSEMBLY_FEE_PER_ITEM = 40;
const FREE_SHIPPING_THRESHOLD = 500;

export const CartProvider = ({ children }) => {
  // 1. Persistent Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Fallback for transition
      const oldSaved = localStorage.getItem('anti_furniture_cart_v2');
      if (oldSaved) return JSON.parse(oldSaved);
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cart]);

  // 2. Persistent Wishlist / Saved Items
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      const oldSaved = localStorage.getItem('anti_furniture_wishlist_v1');
      if (oldSaved) return JSON.parse(oldSaved);
    } catch (e) {
      console.error('Failed to load wishlist from localStorage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage:', e);
    }
  }, [wishlist]);

  // 2b. Persistent My Orders (Archived from checkout completions)
  const [savedOrders, setSavedOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      const oldSaved = localStorage.getItem('anti_furniture_orders_v1');
      if (oldSaved) return JSON.parse(oldSaved);

      // Check if there was an order saved in single recent key
      const singleRecent = localStorage.getItem(RECENT_ORDER_KEY) || localStorage.getItem('anti_recent_order');
      if (singleRecent) {
        return [JSON.parse(singleRecent)];
      }
    } catch (e) {
      console.error('Failed to load orders from localStorage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(savedOrders));
    } catch (e) {
      console.error('Failed to save orders to localStorage:', e);
    }
  }, [savedOrders]);

  const recordNewOrder = (orderData) => {
    setSavedOrders((prev) => {
      const existing = prev.filter((o) => o.orderId !== orderData.orderId);
      const updated = [orderData, ...existing];
      try {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
        localStorage.setItem(RECENT_ORDER_KEY, JSON.stringify(orderData));
      } catch (err) {
        console.warn('Storage error:', err);
      }
      return updated;
    });
  };

  const deleteOrder = (orderId) => {
    setSavedOrders((prev) => prev.filter((o) => o.orderId !== orderId));
    showToast(`Order ${orderId} removed from history`);
  };

  const clearAllOrders = () => {
    setSavedOrders([]);
    try {
      localStorage.removeItem(ORDERS_STORAGE_KEY);
      localStorage.removeItem(RECENT_ORDER_KEY);
    } catch (err) {
      console.warn('Storage clear error:', err);
    }
    showToast('Order history cleared');
  };

  // 2c. Persistent Recently Viewed Pieces (last 8 viewed)
  const [recentlyViewedIds, setRecentlyViewedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load recently viewed from localStorage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewedIds));
    } catch (e) {
      console.error('Failed to save recently viewed:', e);
    }
  }, [recentlyViewedIds]);

  const recordRecentlyViewed = (productId) => {
    if (!productId) return;
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewedIds([]);
    try {
      localStorage.removeItem(RECENTLY_VIEWED_KEY);
    } catch (err) {
      console.warn('Storage clear error:', err);
    }
  };

  const recentlyViewedProducts = recentlyViewedIds
    .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  // 3. Dark / Light Mode with system preference detection
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        return savedTheme === 'dark';
      }
      return (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // 4. View Routing via Hash
  const parseHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('product/')) {
      const pid = hash.replace('product/', '');
      return { view: 'product-detail', productId: pid };
    }
    if (hash === 'shop') return { view: 'shop', productId: null };
    if (hash === 'contact') return { view: 'contact', productId: null };
    if (hash === 'tracking') return { view: 'tracking', productId: null };
    return { view: 'home', productId: null };
  };

  const initialRoute = parseHash();
  const [currentView, setCurrentView] = useState(initialRoute.view);
  const [selectedProductId, setSelectedProductId] = useState(initialRoute.productId);

  useEffect(() => {
    const handleHashChange = () => {
      const route = parseHash();
      
      // Update state
      setCurrentView(route.view);
      setSelectedProductId(route.productId);
      
      const hash = window.location.hash.replace('#', '');
      
      // Determine if we should scroll to top
      // We only scroll to top if:
      // 1. It's a non-home view (shop, contact, tracking, product-detail)
      // 2. It's the home view AND the hash is empty (true home)
      const isHomeSection = route.view === 'home' && hash !== '' && hash !== 'home';
      
      if (!isHomeSection) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // For home sections, scroll to the ID with a delay to ensure mounting
        // We wait 450ms to allow AnimatePresence exit transitions (300ms) to complete
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 450);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToProduct = (productId) => {
    setSelectedProductId(productId);
    recordRecentlyViewed(productId);
    setCurrentView('product-detail');
    window.location.hash = `product/${productId}`;
    // scrollTo(0) is handled by handleHashChange
  };

  const navigateTo = (view, sectionId) => {
    if (view === 'home') {
      window.location.hash = sectionId ? `${sectionId}` : '';
      // If we are already on home and just changing hash, handleHashChange will fire.
      // If we are NOT on home, setting hash will trigger handleHashChange which switches view.
    } else {
      window.location.hash = view;
    }
  };

  const currentProduct = selectedProductId
    ? ALL_PRODUCTS.find((p) => p.id === selectedProductId) || null
    : null;

  // 5. Drawer and Modal Visibility States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Automatically record when product is opened in quick view
  useEffect(() => {
    if (quickViewProduct && quickViewProduct.id) {
      recordRecentlyViewed(quickViewProduct.id);
    }
  }, [quickViewProduct]);
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Cart Operations
  const addToCart = (product, quantity = 1, selectedColor, includeAssembly = false) => {
    const color =
      selectedColor || (product.colors && product.colors[0]?.name) || 'Standard';

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity,
          includeAssembly: includeAssembly || newCart[existingIndex].includeAssembly,
        };
        return newCart;
      } else {
        return [...prevCart, { product, quantity, selectedColor: color, includeAssembly }];
      }
    });

    showToast(`Added "${product.name}" (${color}) to your cart.`);
  };

  const removeFromCart = (productId, selectedColor) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (!selectedColor || item.selectedColor === selectedColor)
          )
      )
    );
  };

  const updateQuantity = (productId, quantity, selectedColor) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          item.product.id === productId &&
          (!selectedColor || item.selectedColor === selectedColor)
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const toggleItemAssembly = (productId, selectedColor) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          item.product.id === productId &&
          (!selectedColor || item.selectedColor === selectedColor)
        ) {
          return { ...item, includeAssembly: !item.includeAssembly };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Operations
  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isWishlisted(product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed "${product.name}" from saved pieces.`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to your wishlist.`);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  // Promo Codes
  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FUR25' || clean === 'SUMMER25' || clean === 'ANTI25') {
      setPromoCode(clean);
      setDiscountPercent(0.25);
      return { success: true, message: '🎉 Summer Special Deal applied! 25% discount activated.' };
    } else if (clean === 'STUDIO15') {
      setPromoCode(clean);
      setDiscountPercent(0.15);
      return { success: true, message: '15% Studio Friend discount applied.' };
    } else if (clean === 'WELCOME10') {
      setPromoCode(clean);
      setDiscountPercent(0.1);
      return { success: true, message: '10% Welcome Homeowner discount applied.' };
    }
    return { success: false, message: 'Invalid promo code. Try "SUMMER25" for 25% off!' };
  };

  // Calculations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const assemblyTotal = cart.reduce(
    (acc, item) => acc + (item.includeAssembly ? ASSEMBLY_FEE_PER_ITEM * item.quantity : 0),
    0
  );
  const discount = Math.round(subtotal * discountPercent);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 45;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const total = Math.max(0, subtotal + assemblyTotal - discount + (subtotal > 0 ? shipping : 0));

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleItemAssembly,
        clearCart,
        totalItemsCount,
        subtotal,
        assemblyTotal,
        discount,
        promoCode,
        applyPromoCode,
        shipping,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        total,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        wishlist,
        wishlistCount: wishlist.length,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        // Saved Orders & History
        savedOrders,
        savedOrdersCount: savedOrders.length,
        isOrdersModalOpen,
        setIsOrdersModalOpen,
        recordNewOrder,
        deleteOrder,
        clearAllOrders,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        recentlyViewedProducts,
        clearRecentlyViewed,
        recordRecentlyViewed,
        isTelegramModalOpen,
        setIsTelegramModalOpen,
        selectedCategory,
        setSelectedCategory,
        isDarkMode,
        toggleDarkMode,
        toastMessage,
        showToast,
        currentView,
        selectedProductId,
        currentProduct,
        navigateToProduct,
        navigateTo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
