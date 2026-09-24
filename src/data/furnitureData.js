/**
 * The Anti Studio - Curated Furniture & Workshop Data
 * Handcrafted by Theng Seyha (ថេង សីហា)
 */

export const CATEGORIES = [
  {
    "id": "living",
    "name": "Living Room",
    "itemCount": 8,
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    "description": "Deep lounge seats, sculpted walnut coffee tables, and tactile linen couches."
  },
  {
    "id": "dining",
    "name": "Dining Room",
    "itemCount": 6,
    "image": "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80",
    "description": "Solid white oak communal tables and ergonomic curved-back spindle chairs."
  },
  {
    "id": "bedroom",
    "name": "Bedroom",
    "itemCount": 5,
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    "description": "Low-profile platform timber beds and quiet bedside floating ledges."
  },
  {
    "id": "office",
    "name": "Office",
    "itemCount": 4,
    "image": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80",
    "description": "Focus-forward writing bureaus with hidden cable raceways and solid joinery."
  },
  {
    "id": "storage",
    "name": "Storage",
    "itemCount": 5,
    "image": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
    "description": "Hand-fluted tambour credenzas, slatted sideboards, and modular shelving units."
  },
  {
    "id": "lighting",
    "name": "Lighting",
    "itemCount": 4,
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    "description": "Spun brass floor lamps, paper lanterns, and warm dimmable illumination."
  }
];

export const ALL_PRODUCTS = [
  {
    "id": "anti-kanso-sofa",
    "name": "Kanso Modular Three-Seater",
    "category": "Living Room",
    "itemType": "sofa",
    "price": 890,
    "originalPrice": 1050,
    "rating": 4.9,
    "reviewCount": 48,
    "badge": "Best Seller",
    "material": "FSC Kiln-Dried Solid Oak & High-Density Belgian Bouclé",
    "dimensions": "W 224cm × D 92cm × H 74cm (Seat Height 42cm)",
    "finish": "Natural Matte Plant-Based Hardwax",
    "leadTime": "24–48 Hours in Phnom Penh",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "Oatmeal Bouclé",
        "hex": "#E6E0D4",
        "inStock": true
      },
      {
        "name": "Warm Charcoal",
        "hex": "#2C2A29",
        "inStock": true
      },
      {
        "name": "Forest Moss",
        "hex": "#3B443B",
        "inStock": true
      }
    ],
    "description": "Engineered around deliberate low horizontal lines, the Kanso Sofa anchors open-plan rooms. Deep feather-down alternative cushions rest on an exposed solid white oak plinth with mortise-and-tenon joints.",
    "features": [
      "Removable, machine-washable commercial-grade bouclé slipcovers",
      "Solid kiln-dried Appalachian white oak perimeter foundation",
      "Reinforced high-resilience foam core with hypoallergenic cloud topper",
      "Anti-sag European steel serpentine suspension springs"
    ]
  },
  {
    "id": "anti-nordic-armchair",
    "name": "Soren Low Armchair",
    "category": "Living Room",
    "itemType": "chair",
    "price": 340,
    "originalPrice": 395,
    "rating": 4.8,
    "reviewCount": 34,
    "badge": "Studio Favorite",
    "material": "Solid American Walnut & Top-Grain Aniline Leather",
    "dimensions": "W 76cm × D 82cm × H 78cm",
    "finish": "Hand-Rubbed Organic Linseed Oil",
    "leadTime": "In Stock (Immediate Dispatch)",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "Cognac Saddle",
        "hex": "#8B4513",
        "inStock": true
      },
      {
        "name": "Pitch Black",
        "hex": "#1C1917",
        "inStock": true
      },
      {
        "name": "Sand Taupe",
        "hex": "#D7C4B7",
        "inStock": false
      }
    ],
    "description": "An ergonomic study in sculpted timber. Continuous steam-bent armrests flow seamlessly into tapered rear legs, supporting a cantilevered seat pan tuned for hours of comfortable reading.",
    "features": [
      "Hand-carved ergonomic paddle armrests for wrist rest",
      "Vegetable-tanned full-grain leather that patinas gracefully",
      "Brass hardware accents hidden inside structural jointing",
      "Tested to withstand over 180kg static load"
    ]
  },
  {
    "id": "anti-dining-table",
    "name": "Torii 8-Seater Dining Table",
    "category": "Dining Room",
    "itemType": "table",
    "price": 760,
    "originalPrice": 890,
    "rating": 5,
    "reviewCount": 29,
    "badge": "Craftsman Specimen",
    "material": "Solid European White Oak (Full Planks)",
    "dimensions": "L 210cm × W 95cm × H 75cm",
    "finish": "Zero-VOC Water-Based Polyx Shield",
    "leadTime": "3–5 Days Handcrafted Batch",
    "image": "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "Natural White Oak",
        "hex": "#D8C3A5",
        "inStock": true
      },
      {
        "name": "Smoked Walnut Finish",
        "hex": "#5C4033",
        "inStock": true
      }
    ],
    "description": "Inspired by traditional Japanese temple entry gates. The Torii Table showcases 40mm thick uninterrupted solid oak staves with butterfly key inserts stabilizing natural timber grain patterns.",
    "features": [
      "40mm heavy slab edge profile with soft bullnose radius",
      "Undermount steel stabilization channels preventing seasonal warping",
      "Recessed trestle legs allowing seating on all 4 sides without knee bumping",
      "Food-safe heat and water resistant matte clear coating"
    ]
  },
  {
    "id": "anti-tambour-credenza",
    "name": "Mori Tambour Credenza",
    "category": "Storage",
    "itemType": "storage",
    "price": 680,
    "originalPrice": 790,
    "rating": 4.9,
    "reviewCount": 22,
    "badge": "Signature",
    "material": "Solid Walnut Framing with Flexible Wood Slat Doors",
    "dimensions": "W 180cm × D 45cm × H 68cm",
    "finish": "Satin Hand-Rubbed Wax",
    "leadTime": "In Stock in Daun Penh Showroom",
    "image": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "American Walnut",
        "hex": "#4A3728",
        "inStock": true
      },
      {
        "name": "Light Ash",
        "hex": "#D6CFC7",
        "inStock": true
      }
    ],
    "description": "Two fluid tambour doors slide gracefully along hidden CNC-milled tracks into concealed wall cavities, revealing dual storage chambers with height-adjustable shelving and cable grommets.",
    "features": [
      "Whisper-quiet sliding tambour slat action",
      "Internal cable pass-throughs for TV, audio receiver, or gaming gear",
      "Solid wood drawer boxes with traditional dovetail joinery",
      "Brass leg caps with built-in height levelling feet"
    ]
  },
  {
    "id": "anti-zenith-bed",
    "name": "Nami Low Platform Bed Frame",
    "category": "Bedroom",
    "itemType": "bed",
    "price": 620,
    "originalPrice": 720,
    "rating": 4.9,
    "reviewCount": 41,
    "badge": "Popular",
    "material": "Solid Kiln-Dried Ash Wood with Woven Paper Cord Headboard",
    "dimensions": "Queen (L 215cm × W 168cm × H 88cm) / King Available",
    "finish": "Bleached Ash Protective Oil",
    "leadTime": "24–48 Hours Dispatch",
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "Natural Ash",
        "hex": "#DDD2C3",
        "inStock": true
      },
      {
        "name": "Ebony Stained",
        "hex": "#1E1E1E",
        "inStock": true
      }
    ],
    "description": "Designed to foster serene bedroom atmospheres. The floating cantilevered frame makes cleaning underneath effortless while the hand-woven Danish cord headboard provides gentle, breathable back support.",
    "features": [
      "Integrated solid pine flexible slat base (no box spring required)",
      "Hand-woven resilient 3-ply paper cord lattice backrest",
      "Rounded corner joints designed to protect shins from sharp knocks",
      "Zero-squeak interlocking steel center beam structure"
    ]
  },
  {
    "id": "anti-studio-desk",
    "name": "Atelier Solid Oak Writing Desk",
    "category": "Office",
    "itemType": "desk",
    "price": 450,
    "originalPrice": 520,
    "rating": 4.7,
    "reviewCount": 19,
    "badge": "New Release",
    "material": "Selected Quarter-Sawn Oak & Anodized Gunmetal Steel",
    "dimensions": "W 140cm × D 65cm × H 75cm",
    "finish": "Matte Polyurethane Commercial Grade",
    "leadTime": "In Stock",
    "image": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "Raw Honey Oak",
        "hex": "#CDB188",
        "inStock": true
      },
      {
        "name": "Dark Roast Walnut",
        "hex": "#4B3621",
        "inStock": true
      }
    ],
    "description": "A dedicated workspace tailored for modern laptop setups and deep focus. Features a recessed rear brass cable channel with magnetic lid and a velvet-lined concealed stationery drawer.",
    "features": [
      "Full-width magnetic rear cable trough fits multi-socket power strips",
      "Concealed soft-close pencil drawer with partitioned timber trays",
      "Double bevelled ergonomic edge reduces forearm pressure during typing",
      "Sturdy architectural trestle supports tested for zero monitor wobble"
    ]
  },
  {
    "id": "anti-lunar-lamp",
    "name": "Wabi Lunar Paper Floor Lamp",
    "category": "Lighting",
    "itemType": "lighting",
    "price": 180,
    "originalPrice": 220,
    "rating": 4.9,
    "reviewCount": 37,
    "badge": "Handmade Shade",
    "material": "Handmade Mulberry Washi Paper & Solid Walnut Tripod",
    "dimensions": "Diameter 45cm × H 145cm",
    "finish": "Untreated Japanese Mulberry Paper",
    "leadTime": "In Stock",
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "Natural Parchment",
        "hex": "#F4EFE6",
        "inStock": true
      }
    ],
    "description": "Emits a serene, diffused amber glow that softens harsh room angles. The mulberry washi shade is folded by hand over bamboo ribbing and hoisted on three turned walnut legs.",
    "features": [
      "Includes 2700K warm ambient dimmable LED filament bulb",
      "Solid brass foot pedal dimmer switch along fabric braided cord",
      "Authentic mulberry washi paper with delicate natural fiber texture",
      "Folds flat for compact transit and simple assembly"
    ]
  },
  {
    "id": "anti-kyoto-stool",
    "name": "Kyoto Curved Bench & Stool",
    "category": "Dining Room",
    "itemType": "chair",
    "price": 210,
    "originalPrice": 260,
    "rating": 4.8,
    "reviewCount": 26,
    "badge": "Compact Living",
    "material": "Solid White Oak with Saddle Dish Carve",
    "dimensions": "W 110cm × D 38cm × H 45cm",
    "finish": "Organic Linseed Oil & Beeswax",
    "leadTime": "In Stock",
    "image": "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "Natural Oak",
        "hex": "#D2B48C",
        "inStock": true
      },
      {
        "name": "Soot Black",
        "hex": "#1C1A18",
        "inStock": true
      }
    ],
    "description": "Multi-functional bench ideal for entryway shoe changes, dining table seating, or as a bedroom footboard bench. Features hand-planed concave seating contour for ergonomic comfort.",
    "features": [
      "Saddle-carved seat pan dispels pressure points",
      "Wedge-tenoned leg joints visible as artisan signature on bench top",
      "Compact footprint slides completely underneath Torii Dining Table",
      "Felt glider floor protectors pre-installed on every leg"
    ]
  }
];

export const SIGNATURE_PRODUCTS = [
  {
    "id": "anti-kanso-sofa",
    "name": "Kanso Modular Three-Seater",
    "category": "Living Room",
    "itemType": "sofa",
    "price": 890,
    "originalPrice": 1050,
    "rating": 4.9,
    "reviewCount": 48,
    "badge": "Best Seller",
    "material": "FSC Kiln-Dried Solid Oak & High-Density Belgian Bouclé",
    "dimensions": "W 224cm × D 92cm × H 74cm (Seat Height 42cm)",
    "finish": "Natural Matte Plant-Based Hardwax",
    "leadTime": "24–48 Hours in Phnom Penh",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "Oatmeal Bouclé",
        "hex": "#E6E0D4",
        "inStock": true
      },
      {
        "name": "Warm Charcoal",
        "hex": "#2C2A29",
        "inStock": true
      },
      {
        "name": "Forest Moss",
        "hex": "#3B443B",
        "inStock": true
      }
    ],
    "description": "Engineered around deliberate low horizontal lines, the Kanso Sofa anchors open-plan rooms. Deep feather-down alternative cushions rest on an exposed solid white oak plinth with mortise-and-tenon joints.",
    "features": [
      "Removable, machine-washable commercial-grade bouclé slipcovers",
      "Solid kiln-dried Appalachian white oak perimeter foundation",
      "Reinforced high-resilience foam core with hypoallergenic cloud topper",
      "Anti-sag European steel serpentine suspension springs"
    ]
  },
  {
    "id": "anti-nordic-armchair",
    "name": "Soren Low Armchair",
    "category": "Living Room",
    "itemType": "chair",
    "price": 340,
    "originalPrice": 395,
    "rating": 4.8,
    "reviewCount": 34,
    "badge": "Studio Favorite",
    "material": "Solid American Walnut & Top-Grain Aniline Leather",
    "dimensions": "W 76cm × D 82cm × H 78cm",
    "finish": "Hand-Rubbed Organic Linseed Oil",
    "leadTime": "In Stock (Immediate Dispatch)",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "Cognac Saddle",
        "hex": "#8B4513",
        "inStock": true
      },
      {
        "name": "Pitch Black",
        "hex": "#1C1917",
        "inStock": true
      },
      {
        "name": "Sand Taupe",
        "hex": "#D7C4B7",
        "inStock": false
      }
    ],
    "description": "An ergonomic study in sculpted timber. Continuous steam-bent armrests flow seamlessly into tapered rear legs, supporting a cantilevered seat pan tuned for hours of comfortable reading.",
    "features": [
      "Hand-carved ergonomic paddle armrests for wrist rest",
      "Vegetable-tanned full-grain leather that patinas gracefully",
      "Brass hardware accents hidden inside structural jointing",
      "Tested to withstand over 180kg static load"
    ]
  },
  {
    "id": "anti-dining-table",
    "name": "Torii 8-Seater Dining Table",
    "category": "Dining Room",
    "itemType": "table",
    "price": 760,
    "originalPrice": 890,
    "rating": 5,
    "reviewCount": 29,
    "badge": "Craftsman Specimen",
    "material": "Solid European White Oak (Full Planks)",
    "dimensions": "L 210cm × W 95cm × H 75cm",
    "finish": "Zero-VOC Water-Based Polyx Shield",
    "leadTime": "3–5 Days Handcrafted Batch",
    "image": "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "Natural White Oak",
        "hex": "#D8C3A5",
        "inStock": true
      },
      {
        "name": "Smoked Walnut Finish",
        "hex": "#5C4033",
        "inStock": true
      }
    ],
    "description": "Inspired by traditional Japanese temple entry gates. The Torii Table showcases 40mm thick uninterrupted solid oak staves with butterfly key inserts stabilizing natural timber grain patterns.",
    "features": [
      "40mm heavy slab edge profile with soft bullnose radius",
      "Undermount steel stabilization channels preventing seasonal warping",
      "Recessed trestle legs allowing seating on all 4 sides without knee bumping",
      "Food-safe heat and water resistant matte clear coating"
    ]
  },
  {
    "id": "anti-tambour-credenza",
    "name": "Mori Tambour Credenza",
    "category": "Storage",
    "itemType": "storage",
    "price": 680,
    "originalPrice": 790,
    "rating": 4.9,
    "reviewCount": 22,
    "badge": "Signature",
    "material": "Solid Walnut Framing with Flexible Wood Slat Doors",
    "dimensions": "W 180cm × D 45cm × H 68cm",
    "finish": "Satin Hand-Rubbed Wax",
    "leadTime": "In Stock in Daun Penh Showroom",
    "image": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "American Walnut",
        "hex": "#4A3728",
        "inStock": true
      },
      {
        "name": "Light Ash",
        "hex": "#D6CFC7",
        "inStock": true
      }
    ],
    "description": "Two fluid tambour doors slide gracefully along hidden CNC-milled tracks into concealed wall cavities, revealing dual storage chambers with height-adjustable shelving and cable grommets.",
    "features": [
      "Whisper-quiet sliding tambour slat action",
      "Internal cable pass-throughs for TV, audio receiver, or gaming gear",
      "Solid wood drawer boxes with traditional dovetail joinery",
      "Brass leg caps with built-in height levelling feet"
    ]
  }
];

export const FEATURED_PRODUCTS = [
  {
    "id": "anti-kanso-sofa",
    "name": "Kanso Modular Three-Seater",
    "category": "Living Room",
    "itemType": "sofa",
    "price": 890,
    "originalPrice": 1050,
    "rating": 4.9,
    "reviewCount": 48,
    "badge": "Best Seller",
    "material": "FSC Kiln-Dried Solid Oak & High-Density Belgian Bouclé",
    "dimensions": "W 224cm × D 92cm × H 74cm (Seat Height 42cm)",
    "finish": "Natural Matte Plant-Based Hardwax",
    "leadTime": "24–48 Hours in Phnom Penh",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "Oatmeal Bouclé",
        "hex": "#E6E0D4",
        "inStock": true
      },
      {
        "name": "Warm Charcoal",
        "hex": "#2C2A29",
        "inStock": true
      },
      {
        "name": "Forest Moss",
        "hex": "#3B443B",
        "inStock": true
      }
    ],
    "description": "Engineered around deliberate low horizontal lines, the Kanso Sofa anchors open-plan rooms. Deep feather-down alternative cushions rest on an exposed solid white oak plinth with mortise-and-tenon joints.",
    "features": [
      "Removable, machine-washable commercial-grade bouclé slipcovers",
      "Solid kiln-dried Appalachian white oak perimeter foundation",
      "Reinforced high-resilience foam core with hypoallergenic cloud topper",
      "Anti-sag European steel serpentine suspension springs"
    ]
  },
  {
    "id": "anti-nordic-armchair",
    "name": "Soren Low Armchair",
    "category": "Living Room",
    "itemType": "chair",
    "price": 340,
    "originalPrice": 395,
    "rating": 4.8,
    "reviewCount": 34,
    "badge": "Studio Favorite",
    "material": "Solid American Walnut & Top-Grain Aniline Leather",
    "dimensions": "W 76cm × D 82cm × H 78cm",
    "finish": "Hand-Rubbed Organic Linseed Oil",
    "leadTime": "In Stock (Immediate Dispatch)",
    "image": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "Cognac Saddle",
        "hex": "#8B4513",
        "inStock": true
      },
      {
        "name": "Pitch Black",
        "hex": "#1C1917",
        "inStock": true
      },
      {
        "name": "Sand Taupe",
        "hex": "#D7C4B7",
        "inStock": false
      }
    ],
    "description": "An ergonomic study in sculpted timber. Continuous steam-bent armrests flow seamlessly into tapered rear legs, supporting a cantilevered seat pan tuned for hours of comfortable reading.",
    "features": [
      "Hand-carved ergonomic paddle armrests for wrist rest",
      "Vegetable-tanned full-grain leather that patinas gracefully",
      "Brass hardware accents hidden inside structural jointing",
      "Tested to withstand over 180kg static load"
    ]
  },
  {
    "id": "anti-dining-table",
    "name": "Torii 8-Seater Dining Table",
    "category": "Dining Room",
    "itemType": "table",
    "price": 760,
    "originalPrice": 890,
    "rating": 5,
    "reviewCount": 29,
    "badge": "Craftsman Specimen",
    "material": "Solid European White Oak (Full Planks)",
    "dimensions": "L 210cm × W 95cm × H 75cm",
    "finish": "Zero-VOC Water-Based Polyx Shield",
    "leadTime": "3–5 Days Handcrafted Batch",
    "image": "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "Natural White Oak",
        "hex": "#D8C3A5",
        "inStock": true
      },
      {
        "name": "Smoked Walnut Finish",
        "hex": "#5C4033",
        "inStock": true
      }
    ],
    "description": "Inspired by traditional Japanese temple entry gates. The Torii Table showcases 40mm thick uninterrupted solid oak staves with butterfly key inserts stabilizing natural timber grain patterns.",
    "features": [
      "40mm heavy slab edge profile with soft bullnose radius",
      "Undermount steel stabilization channels preventing seasonal warping",
      "Recessed trestle legs allowing seating on all 4 sides without knee bumping",
      "Food-safe heat and water resistant matte clear coating"
    ]
  },
  {
    "id": "anti-tambour-credenza",
    "name": "Mori Tambour Credenza",
    "category": "Storage",
    "itemType": "storage",
    "price": 680,
    "originalPrice": 790,
    "rating": 4.9,
    "reviewCount": 22,
    "badge": "Signature",
    "material": "Solid Walnut Framing with Flexible Wood Slat Doors",
    "dimensions": "W 180cm × D 45cm × H 68cm",
    "finish": "Satin Hand-Rubbed Wax",
    "leadTime": "In Stock in Daun Penh Showroom",
    "image": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80"
    ],
    "colors": [
      {
        "name": "American Walnut",
        "hex": "#4A3728",
        "inStock": true
      },
      {
        "name": "Light Ash",
        "hex": "#D6CFC7",
        "inStock": true
      }
    ],
    "description": "Two fluid tambour doors slide gracefully along hidden CNC-milled tracks into concealed wall cavities, revealing dual storage chambers with height-adjustable shelving and cable grommets.",
    "features": [
      "Whisper-quiet sliding tambour slat action",
      "Internal cable pass-throughs for TV, audio receiver, or gaming gear",
      "Solid wood drawer boxes with traditional dovetail joinery",
      "Brass leg caps with built-in height levelling feet"
    ]
  }
];

export const TESTIMONIALS = [
  {
    "id": 1,
    "quote": "The Kanso sofa transformed our BKK1 apartment. The solid oak foundation feels indestructible, while the bouclé fabric has held up wonderfully against everyday spills and our two cats.",
    "author": "Sophea & Jean-Marc",
    "role": "Architects, Phnom Penh",
    "rating": 5
  },
  {
    "id": 2,
    "quote": "Theng Seyha personally coordinated white-glove delivery to our Siem Reap gallery residence. Watching the team assemble the Torii dining table with traditional joinery was pure delight.",
    "author": "Vireak Chan",
    "role": "Art Director, Siem Reap",
    "rating": 5
  },
  {
    "id": 3,
    "quote": "Anti proves that you don't have to import flat-pack veneer junk to have timeless Scandinavian-Japanese aesthetics in Cambodia. The solid walnut credenza is a true heirloom piece.",
    "author": "Elena Rostova",
    "role": "Interior Stylist",
    "rating": 5
  }
];

export const BLOG_POSTS = [
  {
    "id": 1,
    "title": "Why We Choose Appalachian White Oak Over Engineered MDF",
    "date": "March 14, 2025",
    "readTime": "4 min read",
    "author": "Theng Seyha",
    "image": "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=800&q=80",
    "content": [
      "Modern furniture has become overwhelmingly disposable. Engineered particle boards off-gas volatile formaldehyde and degrade at the first hint of tropical humidity.",
      "At Anti, every timber plank is kiln-dried to an exact 8–10% equilibrium moisture content before being dimensioned by hand. White oak naturally contains high levels of tannic acid, rendering it resilient against pests and fungal decay without artificial synthetic chemical coatings.",
      "When you touch our furniture, you feel the authentic warmth and grain pores of real living timber—a material that gains character, warmth, and depth as it ages with your household."
    ]
  },
  {
    "id": 2,
    "title": "Designing for Compact City Apartments: The Rule of Low Horizons",
    "date": "February 28, 2025",
    "readTime": "5 min read",
    "author": "Studio Design Team",
    "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    "content": [
      "Urban living spaces in growing Southeast Asian metropolises often feature ceiling heights between 2.6m and 2.9m. Filling these volumes with high-backed, bulky furniture fragments natural window light and creates visual claustrophobia.",
      "By dropping sofa and bed heights by even 8–10 centimeters, sightlines across rooms remain unobstructed. Natural daylight bounces deeper into floorplans, and rooms feel expansive and calm.",
      "Our Kanso and Nami collections are designed specifically with this low horizontal geometry in mind."
    ]
  },
  {
    "id": 3,
    "title": "The Ritual of Natural Plant Wax: Caring for Solid Wood Furniture",
    "date": "January 18, 2025",
    "readTime": "3 min read",
    "author": "Master Carver Khem",
    "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    "content": [
      "Unlike synthetic polyurethane plastic coatings that seal wood under an impenetrable, un-repairable layer of clear resin, our plant-based hardwax penetrates into the wood pores while allowing the timber to breathe.",
      "A minor scratch or cup ring does not require stripping the entire table down to raw timber. A drop of organic linseed wax buffed with a soft linen cloth cures the surface in minutes.",
      "We include an artisan care tin with every major piece ordered through our showroom or Telegram concierge."
    ]
  }
];
