/**
 * Workshop Order Tracking Data & Handcrafted Stages
 * The Fur Studio - Phnom Penh, Cambodia
 */
import {
  ClipboardCheck,
  Trees,
  Hammer,
  Sparkles,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const HANDCRAFTED_STAGES = [
  {
    step: 1,
    id: 'order-received',
    name: 'Order Received',
    shortLabel: 'Received',
    icon: ClipboardCheck,
    duration: 'Day 1',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80',
    headline: 'Dimensional Drafting & Workshop Queue Entry',
    description:
      'The studio team enters your dimensions into the bench log. Lead artisan reviews grain continuity, fabric lot matching, and custom specifications before timber pulling begins.',
    checklist: [
      'Customer specifications verified against architectural scale',
      'Fabric / leather dye-lot compatibility approved',
      'Timber yard requisitions generated for kiln-dried white oak stock',
      'Assigned to bench schedule in Tonle Bassac Studio'
    ],
    standardTimeframe: 'Within 2 hours of payment receipt'
  },
  {
    step: 2,
    id: 'timber-selection',
    name: 'Timber Selection',
    shortLabel: 'Timber',
    icon: Trees,
    duration: 'Day 1–2',
    image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=900&q=80',
    headline: 'FSC Kiln-Dried Hardwood Selection & Moisture Testing',
    description:
      'We hand-select individual Appalachian White Oak and Black Walnut boards. Planks are probed with a digital pin-meter to ensure 8–10% equilibrium moisture content to resist Southeast Asian humidity.',
    checklist: [
      'Digital moisture equilibrium measured between 8% and 10%',
      'Book-matched grain aesthetic inspected for continuous figure',
      'Defects, knots, and sapwood mapped and carefully bypassed',
      'Planks rough-cut and allowed to rest 24 hours on winding sticks'
    ],
    standardTimeframe: '24–36 hours from queue approval'
  },
  {
    step: 3,
    id: 'joinery-crafting',
    name: 'Joinery / Crafting',
    shortLabel: 'Joinery',
    icon: Hammer,
    duration: 'Day 2–4',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80',
    headline: 'Hand Mortise-and-Tenon Interlocking Joinery',
    description:
      'Master joiners cut traditional mortise-and-tenon and wedge joints by hand. No brittle plastic cams or pressed MDF biscuits. The joints lock purely with mechanical timber physics.',
    checklist: [
      'Precision tenon shoulders cut to 0.1mm tolerance',
      'Hand-planed saddle contours for seat and armrest ergonomic ease',
      'European serpentine spring foundation anchored to hardwood frame',
      'Cold-pressed water-resistant non-toxic timber adhesive applied'
    ],
    standardTimeframe: '48–72 hours bench crafting'
  },
  {
    step: 4,
    id: 'finish-application',
    name: 'Finish Application',
    shortLabel: 'Finishing',
    icon: Sparkles,
    duration: 'Day 4–5',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    headline: 'Natural Plant Oil & Organic Beeswax Rub',
    description:
      'Three successive layers of organic linseed oil and plant-based hardwax are hand-buffed into the open timber pores. The wood breathes naturally, repelling liquids while allowing future spot-repairs.',
    checklist: [
      'Progressive dry hand sanding through 120, 180, and 240 grit',
      '1st coat deep-penetrating organic linseed oil infusion',
      '2nd & 3rd coats natural beeswax polish buffed with linen fleece',
      '24-hour air curing under climate-monitored studio airflow'
    ],
    standardTimeframe: '24–36 hours including cure cycle'
  },
  {
    step: 5,
    id: 'quality-inspection',
    name: 'Quality Inspection',
    shortLabel: 'Inspection',
    icon: ShieldCheck,
    duration: 'Day 5–6',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
    headline: '18-Point Acoustic Tap & Stress Calibration',
    description:
      'Before packaging, every item undergoes an 18-point verification: structural planar level check, acoustic tap testing for core density, 150kg static weight test, and tactile silkiness inspection.',
    checklist: [
      'Four-corner planar rock test on precision granite reference table',
      '150kg load stress testing on all weight-bearing surfaces',
      'Acoustic resonance tap test confirming zero hidden internal voids',
      'Artisan lead signature branded onto underside timber plinth'
    ],
    standardTimeframe: '12 hours before packaging clearance'
  },
  {
    step: 6,
    id: 'delivery',
    name: 'Delivery',
    shortLabel: 'Delivery',
    icon: Truck,
    duration: 'Day 6–7',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
    headline: 'White-Glove Blanket-Wrapped Delivery & In-Home Assembly',
    description:
      'Dispatched directly from our Phnom Penh workshop in soft quilted furniture blankets. Our technicians carry the piece inside your home, place it in your desired room, and install felt floor gliders.',
    checklist: [
      'Triple-layer quilted blanket wrapping with reinforced edge guards',
      'Complimentary in-home assembly and packaging removal',
      'Felt glider floor protectors applied to all contacting feet',
      'Artisan timber care tin handed directly to homeowner'
    ],
    standardTimeframe: 'Same-day courier dispatch across Phnom Penh'
  }
];

export const SAMPLE_ORDERS = {
  'FUR-849201': {
    orderId: 'FUR-849201',
    customerName: 'Sophea Kem',
    productName: 'Torii Solid Oak Dining Table (220cm)',
    material: 'Appalachian White Oak & Natural Matte Hardwax',
    destination: 'BKK1, Khan Chamkarmon, Phnom Penh',
    orderDate: 'September 18, 2026',
    estimatedDelivery: 'September 24, 2026',
    currentStage: 4,
    progressPercent: 68,
    artisanLead: 'Master Carver Khem & Finish Artisan Sovann',
    workshopBay: 'Bay 2 (Finishing & Wax Curing)',
    logs: [
      { time: 'Today, 09:30 AM', note: 'Second coat of organic linseed oil buffed with linen wool. Curing under 26°C controlled airflow.' },
      { time: 'Yesterday, 04:15 PM', note: 'First saturation coat absorbed. Surface hand-rubbed with 240-grit grain denibbing.' },
      { time: 'Sep 19, 02:00 PM', note: 'Torii arched leg joinery interlocked and clamped with non-toxic timber resin.' },
      { time: 'Sep 18, 11:00 AM', note: 'Planks moisture tested at 8.6%. Book-matched slab grain continuity verified.' }
    ]
  },
  'FUR-392104': {
    orderId: 'FUR-392104',
    customerName: 'Jean-Marc Dupont',
    productName: 'Kanso Modular Three-Seater (Oatmeal Bouclé)',
    material: 'Solid White Oak Plinth & Belgian Bouclé Fabric',
    destination: 'Toul Kork, Phnom Penh',
    orderDate: 'September 19, 2026',
    estimatedDelivery: 'September 26, 2026',
    currentStage: 3,
    progressPercent: 48,
    artisanLead: 'Master Joiner Vicheka & Upholsterer Sothea',
    workshopBay: 'Bay 1 (Joinery & Framing)',
    logs: [
      { time: 'Today, 11:20 AM', note: 'European serpentine steel suspension springs fastened into solid perimeter oak frame.' },
      { time: 'Yesterday, 03:40 PM', note: 'Tenons trimmed and fitted. High-resilience core cushions dry-fitted.' },
      { time: 'Sep 19, 01:15 PM', note: 'Bouclé fabric bolt inspected for color batch consistency.' }
    ]
  },
  'FUR-712048': {
    orderId: 'FUR-712048',
    customerName: 'Elena Rostova',
    productName: 'Kyoto Curved Bench & Stool (Natural Oak)',
    material: 'Solid White Oak with Saddle Dish Carve',
    destination: 'Wat Bo Village, Siem Reap',
    orderDate: 'September 15, 2026',
    estimatedDelivery: 'Today (Out for Delivery)',
    currentStage: 6,
    progressPercent: 100,
    artisanLead: 'White-Glove Logistics Team',
    workshopBay: 'Transit / Dispatch Vehicle #02',
    logs: [
      { time: 'Today, 08:00 AM', note: 'Loaded in climate-sealed blanket wrap. Out for white-glove delivery in Siem Reap.' },
      { time: 'Yesterday, 05:00 PM', note: '18-point quality inspection passed. Underside branded with artisan hallmark.' },
      { time: 'Sep 19, 10:30 AM', note: 'Natural beeswax buffed to satin sheen. Felt floor gliders fitted.' }
    ]
  },
  'FUR-502931': {
    orderId: 'FUR-502931',
    customerName: 'Rathana Seng',
    productName: 'Atelier Solid Oak Writing Desk (Brass Channel)',
    material: 'Quarter-Sawn Oak & Anodized Gunmetal Steel',
    destination: 'Chbar Ampov, Phnom Penh',
    orderDate: 'September 20, 2026',
    estimatedDelivery: 'September 27, 2026',
    currentStage: 2,
    progressPercent: 28,
    artisanLead: 'Senior Artisan Dara',
    workshopBay: 'Bay 4 (Timber Grading & Planing)',
    logs: [
      { time: 'Today, 10:00 AM', note: 'Quarter-sawn oak selected for medullary ray flecks. Digital moisture test: 8.8%.' },
      { time: 'Sep 20, 04:00 PM', note: 'Dimensions cross-checked with customer laptop workstation dimensions.' }
    ]
  }
};
