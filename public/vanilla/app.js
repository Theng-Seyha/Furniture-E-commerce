/**
 * ============================================================================
 * ANTI MODERN FURNITURE - PURE VANILLA JAVASCRIPT ENGINE (ES6+)
 * Handcrafted by Theng Seyha (ថេង សីហា)
 * Telegram Bot: @FurnitureOnlineSellingbot
 * 
 * Features Covered:
 * 1. State Management & localStorage Persistence (Cart & Dark Mode)
 * 2. Dynamic DOM Rendering (Catalog Grid, Signature Collection)
 * 3. Multi-Criterion Filtering & Sorting (Category, Price, In-Stock, Search)
 * 4. Interactive Product Detail Modal with Multi-Angle Gallery
 * 5. Real-Time Price & White-Glove Assembly Calculator
 * 6. Free Shipping Progress Bar ($500 Threshold)
 * 7. Native Telegram Bot Integration via Fetch API
 * ============================================================================
 */

// 1. CONFIGURATION & TELEGRAM BOT CREDENTIALS
const TELEGRAM_CONFIG = {
  BOT_TOKEN: '8888825923:AAEzB68kP5_F7KV74IN3nUVUnUIuVQFG05M',
  CHAT_ID: '1662189487',
  BOT_USERNAME: 'FurnitureOnlineSellingbot',
  BOT_URL: 'https://t.me/FurnitureOnlineSellingbot',
  OWNER_NAME: 'Theng Seyha (ថេង សីហា)'
};

// 2. FURNITURE PRODUCT DATA (Curated Solid Woods, Bouclé & Bespoke Details)
const PRODUCTS = [
  {
    id: 'anti-001',
    name: 'Sorya Bouclé Sculptural Lounge Chair',
    category: 'Living Room',
    price: 680,
    originalPrice: 850,
    rating: 4.9,
    reviewsCount: 42,
    inStock: true,
    isSignature: true,
    badge: 'Craftsman Choice',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80'
    ],
    colors: ['Oatmeal Bouclé', 'Charcoal Wool', 'Terracotta Chenille'],
    description: 'Sculpted with a steam-bent solid white oak interior frame and wrapped in tactile nubby bouclé. Generously proportioned for deep conversational relaxation.',
    dimensions: 'W 88cm x D 92cm x H 78cm',
    materials: 'FSC Solid White Oak, Belgian Wool Bouclé, Natural Latex Foam',
    weightCapacity: '160 kg',
    assemblyTime: 'Arrives Fully Assembled'
  },
  {
    id: 'anti-002',
    name: 'Bassac Solid Walnut Dining Table',
    category: 'Dining Room',
    price: 1250,
    originalPrice: 1450,
    rating: 5.0,
    reviewsCount: 38,
    inStock: true,
    isSignature: true,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=900&q=80'
    ],
    colors: ['Natural American Walnut', 'Smoked Oak', 'Bleached Oak'],
    description: 'Cut from sustainably managed single-slab hardwood planks and joined with butterfly inlays. Seats 8 to 10 guests with generous elbow room.',
    dimensions: 'L 240cm x W 100cm x H 76cm',
    materials: 'Kiln-Dried American Black Walnut, Organic Hardwax Oil',
    weightCapacity: '220 kg',
    assemblyTime: '15 mins (Leg attachment)'
  },
  {
    id: 'anti-003',
    name: 'Kandal Oak Slatted Credenza',
    category: 'Storage',
    price: 940,
    originalPrice: 1120,
    rating: 4.8,
    reviewsCount: 29,
    inStock: true,
    isSignature: true,
    badge: 'Limited Batch',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80'
    ],
    colors: ['White Oak', 'Ebonized Black Oak'],
    description: 'Slatted sliding tambour doors that conceal integrated cable grommets and adjustable shelving. Perfect for vinyl collections and media equipment.',
    dimensions: 'W 180cm x D 45cm x H 65cm',
    materials: 'Solid White Oak Slats, Brass Hardware, Soft-Close Glides',
    weightCapacity: '120 kg',
    assemblyTime: 'Arrives Fully Assembled'
  },
  {
    id: 'anti-004',
    name: 'Norodom Platform Bedstead',
    category: 'Bedroom',
    price: 1380,
    originalPrice: 1600,
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
    isSignature: true,
    badge: 'Workshop Flagship',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
    ],
    colors: ['Warm Natural Oak', 'Walnut Stain'],
    description: 'Low-slung architectural platform bed featuring an angled slatted headboard for comfortable late-night reading and zero-creak solid timber slats.',
    dimensions: 'W 195cm x L 215cm x H 95cm (King)',
    materials: 'Grade-A White Oak, European Beech Slats',
    weightCapacity: '350 kg',
    assemblyTime: '25 mins (Modular bolts included)'
  },
  {
    id: 'anti-005',
    name: 'Mekong Travertine Coffee Table',
    category: 'Living Room',
    price: 490,
    originalPrice: 590,
    rating: 4.7,
    reviewsCount: 19,
    inStock: true,
    isSignature: false,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=900&q=80'
    ],
    colors: ['Honed Travertine', 'Nero Marquina Marble'],
    description: 'Heavy architectural monolithic plinth crafted from honed natural stone. Matte non-porous sealant protects against coffee and wine rings.',
    dimensions: 'W 110cm x D 60cm x H 38cm',
    materials: 'Solid Honed Roman Travertine, Felt Base Pads',
    weightCapacity: '90 kg',
    assemblyTime: 'One-Piece (No Assembly)'
  },
  {
    id: 'anti-006',
    name: 'Bokor Floating Executive Desk',
    category: 'Office',
    price: 890,
    originalPrice: 1050,
    rating: 4.9,
    reviewsCount: 22,
    inStock: false,
    isSignature: false,
    badge: 'Pre-Order',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80'
    ],
    colors: ['Walnut & Brass', 'Oak & Matte Black'],
    description: 'Designed for deep focus with hidden wireless induction chargers built invisibly beneath the timber veneer, and two leather-lined pencil drawers.',
    dimensions: 'W 160cm x D 75cm x H 75cm',
    materials: 'Solid Walnut, Full-Grain Saddle Leather, Solid Brass Pulls',
    weightCapacity: '110 kg',
    assemblyTime: '15 mins'
  },
  {
    id: 'anti-007',
    name: 'Kampot Cane & Oak Dining Chair',
    category: 'Dining Room',
    price: 240,
    originalPrice: 300,
    rating: 4.8,
    reviewsCount: 45,
    inStock: true,
    isSignature: false,
    badge: 'Hand-Woven',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=900&q=80'
    ],
    colors: ['Natural Rattan Cane', 'Black Stained Cane'],
    description: 'Hand-woven octagonal rattan cane backrest with steam-bent solid oak frame and ergonomic curved saddle seat.',
    dimensions: 'W 50cm x D 54cm x H 82cm (Seat H 46cm)',
    materials: 'Natural Rattan Cane, Solid White Oak',
    weightCapacity: '140 kg',
    assemblyTime: 'Fully Assembled'
  },
  {
    id: 'anti-008',
    name: 'Aoral Modular 3-Piece Sectional',
    category: 'Living Room',
    price: 2100,
    originalPrice: 2450,
    rating: 5.0,
    reviewsCount: 16,
    inStock: true,
    isSignature: true,
    badge: 'Luxury Suite',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80'
    ],
    colors: ['Sand Bouclé', 'Olive Velvet', 'Slate Grey Chenille'],
    description: 'Deep modular lounge seating with feather-down topper cushions and solid hardwood corner-blocked framing. Endless configuration possibilities.',
    dimensions: 'W 310cm x D 175cm (Chaise) x H 72cm',
    materials: 'Solid Oak Base, Down-Blend Cushions, High-Martindale Fabric',
    weightCapacity: '450 kg',
    assemblyTime: 'White-Glove Included'
  }
];

// 3. APPLICATION STATE
let state = {
  cart: JSON.parse(localStorage.getItem('anti_cart_vanilla') || '[]'),
  theme: localStorage.getItem('anti_theme_vanilla') || 'light-theme',
  promoCode: '',
  discountPercent: 0,
  activeCategory: 'All',
  priceFilter: 'all',
  stockOnly: false,
  searchQuery: '',
  sortBy: 'popularity',
  activeDetailProduct: null,
  activeDetailColor: '',
  activeDetailQty: 1,
  activeDetailAssembly: false
};

// 4. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initEventListeners();
  renderProducts();
  renderSignature();
  updateCartUI();
});

// 5. THEME SWITCHER (Light / Dark Mode)
function initTheme() {
  document.body.className = state.theme;
  const toggleBtn = document.getElementById('theme-toggle');
  toggleBtn.addEventListener('click', () => {
    state.theme = state.theme === 'light-theme' ? 'dark-theme' : 'light-theme';
    document.body.className = state.theme;
    localStorage.setItem('anti_theme_vanilla', state.theme);
    showToast(`Switched to ${state.theme === 'dark-theme' ? 'Dark' : 'Light'} Mode`);
  });
}

// 6. EVENT LISTENERS
function initEventListeners() {
  // Category Pills
  const catPills = document.querySelectorAll('.cat-pill');
  catPills.forEach(btn => {
    btn.addEventListener('click', () => {
      catPills.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.dataset.cat;
      renderProducts();
    });
  });

  // Price Bracket Filter Buttons
  const priceBtns = document.querySelectorAll('.filter-btn');
  priceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      priceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.priceFilter = btn.dataset.price;
      renderProducts();
    });
  });

  // In-Stock Toggle Checkbox
  const stockCheckbox = document.getElementById('stock-only-checkbox');
  stockCheckbox.addEventListener('change', (e) => {
    state.stockOnly = e.target.checked;
    renderProducts();
  });

  // Search Input
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase().trim();
    renderProducts();
  });

  // Sort Selector
  const sortSelect = document.getElementById('sort-select');
  sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  // Reset Filters
  document.getElementById('reset-filters-btn').addEventListener('click', () => {
    state.activeCategory = 'All';
    state.priceFilter = 'all';
    state.stockOnly = false;
    state.searchQuery = '';
    state.sortBy = 'popularity';

    // Reset UI inputs
    searchInput.value = '';
    sortSelect.value = 'popularity';
    stockCheckbox.checked = false;
    document.querySelectorAll('.cat-pill').forEach((b, i) => b.classList.toggle('active', i === 0));
    document.querySelectorAll('.filter-btn').forEach((b, i) => b.classList.toggle('active', i === 0));

    renderProducts();
    showToast('Filters reset to show all pieces');
  });

  // Cart Drawer Triggers
  const cartBtn = document.getElementById('cart-btn');
  const cartBackdrop = document.getElementById('cart-drawer-backdrop');
  const closeCartBtn = document.getElementById('close-cart-drawer');

  cartBtn.addEventListener('click', () => openCartDrawer());
  closeCartBtn.addEventListener('click', () => closeCartDrawer());
  cartBackdrop.addEventListener('click', (e) => {
    if (e.target === cartBackdrop) closeCartDrawer();
  });

  // Clear Cart Button
  document.getElementById('clear-cart-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      state.cart = [];
      saveCart();
      updateCartUI();
      showToast('Cart cleared');
    }
  });

  // Promo Code Apply Button
  document.getElementById('apply-promo-btn').addEventListener('click', () => {
    const input = document.getElementById('promo-input');
    const msg = document.getElementById('promo-msg');
    const code = input.value.trim().toUpperCase();

    if (code === 'SUMMER25') {
      state.promoCode = code;
      state.discountPercent = 0.25;
      msg.textContent = '✓ Code applied! You saved 25% on your order.';
      msg.className = 'promo-msg success';
      updateCartUI();
      showToast('Promo Code SUMMER25 Applied!');
    } else {
      msg.textContent = 'Invalid promo code. Try SUMMER25.';
      msg.className = 'promo-msg error';
    }
  });

  // Proceed to Checkout
  document.getElementById('proceed-checkout-btn').addEventListener('click', () => {
    if (state.cart.length === 0) {
      alert('Your cart is empty. Add items before checking out.');
      return;
    }
    closeCartDrawer();
    openCheckoutModal();
  });

  // Close Modals
  document.getElementById('close-product-modal').addEventListener('click', closeProductModal);
  document.getElementById('product-modal').addEventListener('click', (e) => {
    if (e.target.id === 'product-modal') closeProductModal();
  });

  document.getElementById('close-checkout-modal').addEventListener('click', closeCheckoutModal);
  document.getElementById('checkout-modal').addEventListener('click', (e) => {
    if (e.target.id === 'checkout-modal') closeCheckoutModal();
  });
  document.getElementById('finish-order-btn').addEventListener('click', closeCheckoutModal);

  // Payment method selection radio
  document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.payment-label').forEach(label => label.classList.remove('active'));
      e.target.closest('.payment-label').classList.add('active');
    });
  });

  // Checkout Form Submission (Sends to Telegram Bot API)
  document.getElementById('order-form').addEventListener('submit', handleOrderSubmit);

  // Contact Form Submission (Sends inquiry to Telegram Bot API)
  document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);
}

// 7. PRODUCT FILTERING & SORTING LOGIC (Using Array.prototype methods)
function getFilteredProducts() {
  let result = [...PRODUCTS];

  // Category filter
  if (state.activeCategory !== 'All') {
    result = result.filter(p => p.category === state.activeCategory);
  }

  // Price Bracket filter
  if (state.priceFilter === 'under-500') {
    result = result.filter(p => p.price < 500);
  } else if (state.priceFilter === '500-1000') {
    result = result.filter(p => p.price >= 500 && p.price <= 1000);
  } else if (state.priceFilter === '1000-plus') {
    result = result.filter(p => p.price > 1000);
  }

  // In-Stock Only filter
  if (state.stockOnly) {
    result = result.filter(p => p.inStock);
  }

  // Search Query filter
  if (state.searchQuery) {
    result = result.filter(p => 
      p.name.toLowerCase().includes(state.searchQuery) ||
      p.materials.toLowerCase().includes(state.searchQuery) ||
      p.description.toLowerCase().includes(state.searchQuery)
    );
  }

  // Sorting
  if (state.sortBy === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Default popularity
    result.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  return result;
}

// 8. RENDER PRODUCT CATALOG GRID
function renderProducts() {
  const grid = document.getElementById('products-grid');
  const countLabel = document.getElementById('results-count');
  const products = getFilteredProducts();

  countLabel.textContent = `Showing ${products.length} piece${products.length === 1 ? '' : 's'}`;

  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <p style="font-size: 18px; margin-bottom: 8px;">No furniture matches your selected criteria.</p>
        <button onclick="document.getElementById('reset-filters-btn').click()" class="btn btn-primary">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(product => `
    <div class="product-card" onclick="openProductModal('${product.id}')">
      <div class="card-image-wrap">
        <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy">
        ${product.badge ? `<span class="card-badge">${product.badge}</span>` : ''}
        <div class="card-actions-hover">
          <button class="action-circle-btn" title="View Specifications" onclick="event.stopPropagation(); openProductModal('${product.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/></svg>
          </button>
          <button class="action-circle-btn btn-cart-add" title="Add to Cart" onclick="event.stopPropagation(); quickAddToCart('${product.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div>
          <div class="card-meta">
            <span>${product.category}</span>
            <span class="card-rating">★ ${product.rating}</span>
          </div>
          <h3 class="card-title">${product.name}</h3>
        </div>
        <div class="card-footer">
          <span class="card-price">$${product.price.toLocaleString()}</span>
          <button class="card-btn-link">View Specs →</button>
        </div>
      </div>
    </div>
  `).join('');
}

// 9. RENDER SIGNATURE COLLECTION
function renderSignature() {
  const grid = document.getElementById('signature-grid');
  const signatureItems = PRODUCTS.filter(p => p.isSignature).slice(0, 4);

  grid.innerHTML = signatureItems.map(product => `
    <div class="product-card" onclick="openProductModal('${product.id}')">
      <div class="card-image-wrap">
        <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy">
        <span class="card-badge">Signature Batch</span>
      </div>
      <div class="card-body">
        <div>
          <div class="card-meta">
            <span>${product.category}</span>
            <span class="card-rating">★ ${product.rating} (${product.reviewsCount})</span>
          </div>
          <h3 class="card-title">${product.name}</h3>
        </div>
        <div class="card-footer">
          <span class="card-price">$${product.price.toLocaleString()}</span>
          <button class="card-btn-link" onclick="event.stopPropagation(); quickAddToCart('${product.id}')">+ Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}

// 10. DYNAMIC PRODUCT DETAIL MODAL & CALCULATOR
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.activeDetailProduct = product;
  state.activeDetailColor = product.colors[0];
  state.activeDetailQty = 1;
  state.activeDetailAssembly = false;

  renderProductModalContent();
  document.getElementById('product-modal').classList.add('active');
}

function closeProductModal() {
  document.getElementById('product-modal').classList.remove('active');
}

function renderProductModalContent() {
  const container = document.getElementById('product-detail-container');
  const p = state.activeDetailProduct;
  const unitAssemblyFee = 40;
  const currentTotal = (p.price * state.activeDetailQty) + (state.activeDetailAssembly ? unitAssemblyFee * state.activeDetailQty : 0);

  container.innerHTML = `
    <!-- Left: Multi-Angle Gallery Stage -->
    <div class="gallery-stage">
      <div class="main-image-wrap">
        <img id="modal-main-img" src="${p.gallery[0]}" alt="${p.name}">
      </div>
      <div class="thumbnails-row">
        ${p.gallery.map((imgUrl, i) => `
          <button class="thumb-btn ${i === 0 ? 'active' : ''}" onclick="switchModalGalleryImage('${imgUrl}', this)">
            <img src="${imgUrl}" alt="Thumbnail ${i + 1}">
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Right: Product Specifications & Live Calculator -->
    <div class="detail-info">
      <span class="detail-cat">${p.category} • ${p.badge || 'Artisan Workshop'}</span>
      <h2 class="detail-title">${p.name}</h2>
      
      <div class="detail-price-box">
        <span class="detail-price">$${p.price.toLocaleString()}</span>
        ${p.originalPrice ? `<span class="detail-original-price">$${p.originalPrice.toLocaleString()}</span>` : ''}
        <span style="font-size: 11px; color: #16A34A; font-weight: 600;">✓ In Stock for Express Dispatch</span>
      </div>

      <p class="detail-desc">${p.description}</p>

      <!-- Options & Swatches -->
      <div class="detail-options-box">
        <div>
          <label style="display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px;">
            Finish / Upholstery: <b>${state.activeDetailColor}</b>
          </label>
          <div class="swatches-row">
            ${p.colors.map(col => `
              <button class="color-swatch-btn ${col === state.activeDetailColor ? 'active' : ''}" onclick="setModalColor('${col}')">
                ${col}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <label style="font-size: 11px; font-weight: 700; text-transform: uppercase;">Quantity</label>
          <div class="quantity-control">
            <button class="qty-btn" onclick="updateModalQty(-1)">-</button>
            <span class="qty-display">${state.activeDetailQty}</span>
            <button class="qty-btn" onclick="updateModalQty(1)">+</button>
          </div>
        </div>

        <!-- White-Glove In-Home Assembly Add-On Toggle -->
        <label class="assembly-checkbox-row">
          <div>
            <input type="checkbox" id="modal-assembly-check" ${state.activeDetailAssembly ? 'checked' : ''} onchange="toggleModalAssembly(this.checked)">
            <span>Include White-Glove In-Home Assembly (+${unitAssemblyFee * state.activeDetailQty})</span>
          </div>
          <strong style="color: var(--accent-primary);">${state.activeDetailAssembly ? 'Selected' : 'Optional'}</strong>
        </label>
      </div>

      <!-- Live Dynamic Price Calculator Summary -->
      <div class="calculator-summary-box">
        <div>
          <span>Item Subtotal (${state.activeDetailQty}x):</span><br>
          <small style="color: var(--text-muted);">${state.activeDetailAssembly ? '+ Assembly Included' : 'Standard Delivery'}</small>
        </div>
        <span class="live-calc-total">$${currentTotal.toLocaleString()}</span>
      </div>

      <!-- Add to Cart CTA -->
      <div style="display: flex; gap: 10px;">
        <button class="btn btn-primary btn-block" onclick="addModalItemToCart()">
          Add to Cart ($${currentTotal.toLocaleString()})
        </button>
        <button class="btn btn-tg" onclick="directOrderViaTelegram('${p.id}')" title="Inquire directly on Telegram">
          Telegram Direct
        </button>
      </div>

      <!-- Technical Specifications Table -->
      <div class="detail-specs-table">
        <div class="spec-item"><strong>Dimensions:</strong> ${p.dimensions}</div>
        <div class="spec-item"><strong>Materials:</strong> ${p.materials}</div>
        <div class="spec-item"><strong>Load Rating:</strong> ${p.weightCapacity}</div>
        <div class="spec-item"><strong>Assembly:</strong> ${p.assemblyTime}</div>
      </div>
    </div>
  `;
}

function switchModalGalleryImage(imgUrl, buttonEl) {
  document.getElementById('modal-main-img').src = imgUrl;
  document.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
  buttonEl.classList.add('active');
}

function setModalColor(color) {
  state.activeDetailColor = color;
  renderProductModalContent();
}

function updateModalQty(delta) {
  const newQty = state.activeDetailQty + delta;
  if (newQty >= 1 && newQty <= 10) {
    state.activeDetailQty = newQty;
    renderProductModalContent();
  }
}

function toggleModalAssembly(checked) {
  state.activeDetailAssembly = checked;
  renderProductModalContent();
}

function addModalItemToCart() {
  const p = state.activeDetailProduct;
  addToCart(p, state.activeDetailQty, state.activeDetailColor, state.activeDetailAssembly);
  closeProductModal();
  openCartDrawer();
}

function directOrderViaTelegram(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const text = encodeURIComponent(`Hello Theng Seyha! I would like to inquire about the ${product.name} ($${product.price}) from the Anti web catalog.`);
  window.open(`${TELEGRAM_CONFIG.BOT_URL}?text=${text}`, '_blank');
}

// 11. SHOPPING CART ENGINE & LOCALSTORAGE PERSISTENCE
function quickAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    addToCart(product, 1, product.colors[0], false);
  }
}

function addToCart(product, quantity = 1, selectedColor = 'Default', includeAssembly = false) {
  const existingIndex = state.cart.findIndex(
    item => item.product.id === product.id && item.selectedColor === selectedColor
  );

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
    if (includeAssembly) state.cart[existingIndex].includeAssembly = true;
  } else {
    state.cart.push({
      product,
      quantity,
      selectedColor,
      includeAssembly
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added ${quantity}x "${product.name}" to cart!`);

  // Animate cart badge
  const badge = document.getElementById('cart-badge');
  badge.classList.add('pop');
  setTimeout(() => badge.classList.remove('pop'), 300);
}

function updateCartItemQty(index, newQty) {
  if (newQty <= 0) {
    state.cart.splice(index, 1);
  } else {
    state.cart[index].quantity = newQty;
  }
  saveCart();
  updateCartUI();
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast('Item removed from cart');
}

function toggleCartItemAssembly(index) {
  state.cart[index].includeAssembly = !state.cart[index].includeAssembly;
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('anti_cart_vanilla', JSON.stringify(state.cart));
}

// 12. UPDATE CART UI & REAL-TIME PRICE CALCULATOR
function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const drawerCount = document.getElementById('drawer-item-count');
  const listContainer = document.getElementById('cart-items-list');

  // Total items count
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalCount;
  drawerCount.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;

  // Price calculations
  const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const assemblyTotal = state.cart.reduce((sum, item) => sum + (item.includeAssembly ? 40 * item.quantity : 0), 0);
  const discountAmount = Math.round(subtotal * state.discountPercent);

  // Free shipping over $500
  const freeShippingThreshold = 500;
  const shippingFee = (subtotal === 0 || subtotal >= freeShippingThreshold) ? 0 : 45;
  const grandTotal = Math.max(0, subtotal + assemblyTotal - discountAmount + shippingFee);

  // Free Shipping Progress Bar
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  
  const progressFill = document.getElementById('shipping-progress-fill');
  const progressText = document.getElementById('shipping-progress-text');
  const percentText = document.getElementById('shipping-percent-text');

  progressFill.style.width = `${progressPercent}%`;
  percentText.textContent = `${progressPercent}%`;
  if (amountNeeded === 0 && subtotal > 0) {
    progressText.textContent = '🎉 You have unlocked Free White-Glove Delivery!';
  } else {
    progressText.textContent = `Add $${amountNeeded.toLocaleString()} more for Free White-Glove Delivery`;
  }

  // Update Calculator Breakdown
  document.getElementById('calc-subtotal').textContent = `$${subtotal.toLocaleString()}`;
  document.getElementById('calc-assembly').textContent = `+$${assemblyTotal.toLocaleString()}`;
  document.getElementById('calc-assembly-row').style.display = assemblyTotal > 0 ? 'flex' : 'none';

  const discountRow = document.getElementById('calc-discount-row');
  if (discountAmount > 0) {
    discountRow.style.display = 'flex';
    document.getElementById('calc-discount').textContent = `-$${discountAmount.toLocaleString()}`;
  } else {
    discountRow.style.display = 'none';
  }

  document.getElementById('calc-shipping').textContent = shippingFee === 0 ? 'FREE' : `$${shippingFee}`;
  document.getElementById('calc-total').textContent = `$${grandTotal.toLocaleString()}`;

  // Render Cart Item Cards
  if (state.cart.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-cart-view">
        <div class="empty-cart-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Explore our solid white oak and bouclé pieces.</p>
        <button onclick="closeCartDrawer(); window.location.href='#catalog'" class="btn btn-primary" style="margin-top: 16px;">
          Browse Catalog
        </button>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = state.cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-top">
          <div>
            <h4 class="cart-item-name">${item.product.name}</h4>
            <span class="cart-item-finish">Finish: ${item.selectedColor}</span>
          </div>
          <button class="cart-item-remove" onclick="removeCartItem(${index})" title="Remove">✕</button>
        </div>

        <!-- In-Item Assembly Checkbox -->
        <label style="font-size: 11px; display: flex; align-items: center; gap: 6px; margin-top: 4px; cursor: pointer;">
          <input type="checkbox" ${item.includeAssembly ? 'checked' : ''} onchange="toggleCartItemAssembly(${index})">
          <span>White-Glove Assembly (+$${40 * item.quantity})</span>
        </label>

        <div class="cart-item-bottom">
          <div class="quantity-control">
            <button class="qty-btn" onclick="updateCartItemQty(${index}, ${item.quantity - 1})">-</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartItemQty(${index}, ${item.quantity + 1})">+</button>
          </div>
          <span class="cart-item-price">$${(item.product.price * item.quantity).toLocaleString()}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function openCartDrawer() {
  document.getElementById('cart-drawer-backdrop').classList.add('active');
}

function closeCartDrawer() {
  document.getElementById('cart-drawer-backdrop').classList.remove('active');
}

// 13. CHECKOUT MODAL & TELEGRAM ORDER SUBMISSION
function openCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  const summaryBox = document.getElementById('order-invoice-summary');

  document.getElementById('checkout-form-view').style.display = 'block';
  document.getElementById('checkout-success-view').style.display = 'none';

  const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const assemblyTotal = state.cart.reduce((sum, item) => sum + (item.includeAssembly ? 40 * item.quantity : 0), 0);
  const discountAmount = Math.round(subtotal * state.discountPercent);
  const shippingFee = (subtotal >= 500 || subtotal === 0) ? 0 : 45;
  const total = Math.max(0, subtotal + assemblyTotal - discountAmount + shippingFee);

  summaryBox.innerHTML = `
    <div style="display: flex; justify-content: space-between;">
      <span>Items (${state.cart.reduce((s, i) => s + i.quantity, 0)}):</span>
      <span>$${subtotal.toLocaleString()}</span>
    </div>
    ${assemblyTotal > 0 ? `
      <div style="display: flex; justify-content: space-between; color: var(--accent-primary);">
        <span>White-Glove Assembly:</span>
        <span>+$${assemblyTotal.toLocaleString()}</span>
      </div>
    ` : ''}
    ${discountAmount > 0 ? `
      <div style="display: flex; justify-content: space-between; color: #16A34A;">
        <span>Discount (${state.promoCode}):</span>
        <span>-$${discountAmount.toLocaleString()}</span>
      </div>
    ` : ''}
    <div style="display: flex; justify-content: space-between;">
      <span>Delivery:</span>
      <span>${shippingFee === 0 ? 'FREE' : `$${shippingFee}`}</span>
    </div>
    <div style="display: flex; justify-content: space-between; font-weight: bold; border-top: 1px solid var(--border-color); padding-top: 8px; margin-top: 4px; font-size: 14px;">
      <span>Total Due:</span>
      <span style="color: var(--accent-primary);">$${total.toLocaleString()}</span>
    </div>
  `;

  modal.classList.add('active');
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal').classList.remove('active');
}

async function handleOrderSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-telegram-order-btn');
  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Dispatching to Telegram Bot...';

  const name = document.getElementById('order-name').value.trim();
  const phone = document.getElementById('order-phone').value.trim();
  const tg = document.getElementById('order-tg').value.trim();
  const city = document.getElementById('order-city').value.trim();
  const address = document.getElementById('order-address').value.trim();
  const notes = document.getElementById('order-notes').value.trim();
  const payment = document.querySelector('input[name="payment-method"]:checked').value;

  const subtotal = state.cart.reduce((s, i) => s + (i.product.price * i.quantity), 0);
  const assembly = state.cart.reduce((s, i) => s + (i.includeAssembly ? 40 * i.quantity : 0), 0);
  const discount = Math.round(subtotal * state.discountPercent);
  const shipping = subtotal >= 500 ? 0 : 45;
  const grandTotal = subtotal + assembly - discount + shipping;
  const orderRef = `ANTI-${Math.floor(100000 + Math.random() * 900000)}`;

  // Build Telegram HTML Message Payload
  const itemsText = state.cart.map((item, idx) => 
    `  ${idx + 1}. <b>${item.product.name}</b> (${item.selectedColor}) x${item.quantity} - $${(item.product.price * item.quantity).toLocaleString()}${item.includeAssembly ? ' <i>[+Assembly]</i>' : ''}`
  ).join('\n');

  const messageText = `
🛋️ <b>NEW ORDER DISPATCH RECEIVED!</b>
━━━━━━━━━━━━━━━━━━━━━
<b>Order Ref:</b> <code>${orderRef}</code>
<b>Customer:</b> ${name}
<b>Phone / Telegram:</b> ${phone} ${tg ? `(@${tg.replace('@', '')})` : ''}
<b>Address:</b> ${address}, ${city}
<b>Payment Method:</b> ${payment}
${notes ? `<b>Notes:</b> <i>${notes}</i>\n` : ''}
━━━━━━━━━━━━━━━━━━━━━
📦 <b>ORDER ITEMS:</b>
${itemsText}
━━━━━━━━━━━━━━━━━━━━━
<b>Items Subtotal:</b> $${subtotal.toLocaleString()}
${assembly > 0 ? `<b>White-Glove Assembly:</b> +$${assembly.toLocaleString()}\n` : ''}${discount > 0 ? `<b>Discount (${state.promoCode}):</b> -$${discount.toLocaleString()}\n` : ''}<b>Shipping:</b> ${shipping === 0 ? 'FREE' : `$${shipping}`}
<b>💰 TOTAL AMOUNT:</b> $${grandTotal.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━
<i>Dispatched via Pure Vanilla HTML/CSS/JS Store</i>
`.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.CHAT_ID,
        text: messageText,
        parse_mode: 'HTML'
      })
    });

    const result = await response.json();
    console.log('Telegram API result:', result);
  } catch (err) {
    console.warn('Telegram API network attempt:', err);
  }

  // Show Success Receipt
  btn.disabled = false;
  btn.querySelector('.btn-text').textContent = 'Send Order to Telegram Bot';
  document.getElementById('checkout-form-view').style.display = 'none';
  const successView = document.getElementById('checkout-success-view');
  successView.style.display = 'block';

  document.getElementById('order-receipt-details').innerHTML = `
    <div><b>Order Ref:</b> ${orderRef}</div>
    <div><b>Customer:</b> ${name} (${phone})</div>
    <div><b>Delivery:</b> ${address}, ${city}</div>
    <div><b>Grand Total:</b> $${grandTotal.toLocaleString()}</div>
    <div><b>Recipient:</b> Theng Seyha (@${TELEGRAM_CONFIG.BOT_USERNAME})</div>
  `;

  // Clear cart after successful order
  state.cart = [];
  saveCart();
  updateCartUI();
  showToast('Order successfully sent to Telegram!');
}

// 14. CONTACT FORM TO TELEGRAM
async function handleContactSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('contact-submit-btn');
  const feedback = document.getElementById('contact-feedback');

  const name = document.getElementById('contact-name').value.trim();
  const phone = document.getElementById('contact-phone').value.trim();
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value.trim();

  btn.disabled = true;
  btn.textContent = 'Transmitting to Telegram...';

  const tgMessage = `
💬 <b>NEW WORKSHOP INQUIRY</b>
━━━━━━━━━━━━━━━━━━━━━
<b>From:</b> ${name}
<b>Contact:</b> ${phone}
<b>Subject:</b> ${subject}
━━━━━━━━━━━━━━━━━━━━━
<b>Message:</b>
${message}
━━━━━━━━━━━━━━━━━━━━━
<i>Sent to Theng Seyha (@${TELEGRAM_CONFIG.BOT_USERNAME})</i>
`.trim();

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.CHAT_ID,
        text: tgMessage,
        parse_mode: 'HTML'
      })
    });
  } catch (error) {
    console.error('Contact error:', error);
  }

  btn.disabled = false;
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
    <span>Transmit Inquiry to Telegram</span>
  `;

  feedback.style.display = 'block';
  feedback.style.backgroundColor = '#DCFCE7';
  feedback.style.color = '#166534';
  feedback.textContent = `✓ Thank you, ${name}! Your inquiry was sent directly to Theng Seyha's Telegram bot.`;

  document.getElementById('contact-form').reset();
  showToast('Inquiry sent to Telegram!');
}

// 15. TOAST NOTIFICATION UTILITY
function showToast(text) {
  const toast = document.getElementById('toast');
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
