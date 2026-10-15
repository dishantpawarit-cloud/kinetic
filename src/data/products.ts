import { Product } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'nike-air-force-1-07',
    name: "Nike Air Force 1 '07",
    slug: 'nike-air-force-1-07',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'unisex',
    price: 8995,
    originalPrice: 8995,
    description: "The radiance lives on in the Nike Air Force 1 '07, the b-ball icon that puts a fresh spin on what you know best: crisp leather, bold colors and the perfect amount of flash to make you shine.",
    highlights: [
      'Stitched leather overlays on the upper add heritage style, durability and support',
      'Originally designed for performance hoops, Nike Air cushioning adds lightweight, all-day comfort',
      'Low-cut silhouette adds a clean, streamlined look',
      'Padded collar feels soft and comfortable'
    ],
    specs: {
      'Style Code': 'CW2288-111',
      'Upper Material': 'Genuine & Synthetic Leather',
      'Sole Material': 'Rubber cupsole with pivot circle',
      'Origin': 'Vietnam'
    },
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Triple White', hex: '#FFFFFF', imageIndex: 0 },
      { name: 'Triple Black', hex: '#111111', imageIndex: 1 },
      { name: 'White / University Blue', hex: '#3B82F6', imageIndex: 2 }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    stock: 24,
    rating: 4.9,
    reviewCount: 1420,
    tags: ['Iconic', 'Streetwear', 'Leather', 'Low-Top'],
    isFeatured: true,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Marcus Vance',
        rating: 5,
        date: '2026-03-12',
        title: 'The undisputed classic',
        content: 'Cleanest shoe in my rotation. Goes with absolutely everything from sweatpants to chinos.',
        verifiedPurchase: true
      },
      {
        id: 'rev-2',
        author: 'Elena R.',
        rating: 5,
        date: '2026-02-28',
        title: 'Timeless comfort',
        content: 'True to size and very comfortable for daily walking around the city.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'nike-air-max-90',
    name: 'Nike Air Max 90',
    slug: 'nike-air-max-90',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'men',
    price: 10795,
    originalPrice: 10795,
    description: "Nothing as fly, nothing as proven. The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU accents.",
    highlights: [
      'Visible Max Air cushioning originally designed for performance running',
      'Stitched overlays and TPU accents add durability and retro 90s aesthetics',
      'Padded low-top collar looks sleek and feels plush',
      'Rubber Waffle outsole delivers heritage traction'
    ],
    specs: {
      'Style Code': 'CN8490-100',
      'Upper Material': 'Mesh & Leather Overlays',
      'Midsole': 'Polyurethane with Max Air unit',
      'Origin': 'Indonesia'
    },
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Infrared / White', hex: '#EF4444', imageIndex: 0 },
      { name: 'Iron Grey / Black', hex: '#4B5563', imageIndex: 1 },
      { name: 'Pure Platinum', hex: '#E5E7EB', imageIndex: 2 }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    stock: 18,
    rating: 4.8,
    reviewCount: 890,
    tags: ['Retro', 'Visible Air', 'Heritage'],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'nike-pegasus-41',
    name: 'Nike Pegasus 41',
    slug: 'nike-pegasus-41',
    brand: 'Nike',
    category: 'running',
    gender: 'men',
    price: 11895,
    originalPrice: 11895,
    description: "Responsive cushioning in the Pegasus provides an energized ride for everyday road running. Experience lighter-weight energy return with dual Air Zoom units and a ReactX foam midsole.",
    highlights: [
      'Upgraded breathable engineered mesh upper',
      'ReactX foam midsole surrounds forefoot and heel Air Zoom units for an energized ride',
      'Signature waffle-inspired rubber outsole provides flexibility and traction',
      'Plush collar, tongue and sockliner for a secure, comfortable fit'
    ],
    specs: {
      'Style Code': 'FD2722-100',
      'Weight': '297g (Men\'s US 10)',
      'Heel-To-Toe Drop': '10mm',
      'Cushioning': 'ReactX Foam + Dual Air Zoom'
    },
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Volt / Summit White', hex: '#84CC16', imageIndex: 0 },
      { name: 'Black / Metallic Silver', hex: '#18181B', imageIndex: 1 }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13],
    stock: 35,
    rating: 4.9,
    reviewCount: 654,
    tags: ['Daily Trainer', 'ReactX', 'Marathon', 'Road Running'],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: 'nike-dunk-low-retro',
    name: 'Nike Dunk Low Retro',
    slug: 'nike-dunk-low-retro',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'unisex',
    price: 8695,
    originalPrice: 8695,
    description: "Created for the hardwood but taken to the streets, the '80s b-ball icon returns with perfectly shined overlays and classic team colors. With its iconic hoops design, the Nike Dunk Low channels vintage style.",
    highlights: [
      'Crisp leather upper ages to soft perfection and features durable overlays',
      'Foam midsole offers lightweight, responsive cushioning',
      'Padded, low-cut collar adds a sleek look that feels comfortable',
      'Rubber outsole with classic hoops pivot circle adds durability and traction'
    ],
    specs: {
      'Style Code': 'DD1391-100',
      'Upper': '100% Genuine Bovine Leather',
      'Outsole': 'Non-marking Solid Rubber',
      'Origin': 'Vietnam'
    },
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Black / White (Panda)', hex: '#000000', imageIndex: 0 },
      { name: 'University Red / White', hex: '#DC2626', imageIndex: 1 }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    stock: 12,
    rating: 4.7,
    reviewCount: 2130,
    tags: ['Dunk', 'Panda', 'Court', 'Streetwear'],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'nike-vomero-5',
    name: 'Nike Zoom Vomero 5',
    slug: 'nike-zoom-vomero-5',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'unisex',
    price: 14995,
    originalPrice: 16995,
    discountPercent: 12,
    description: "Carve a new lane for yourself in the Zoom Vomero 5—your go-to for complexity, depth and easy styling. The richly layered design includes textiles, synthetic suede and plastic accents for one of the coolest sneakers of the season.",
    highlights: [
      'Synthetic leather and mesh upper provides durability and breathability',
      'Zoom Air cushioning with responsive foam offers a snappy, smooth ride',
      'Plastic caging on the side adds supportive structure',
      'Ventilation ports on the heel keep it airy and comfortable'
    ],
    specs: {
      'Style Code': 'BV1358-001',
      'Midsole': 'Cushlon Foam with Zoom Air',
      'Outsole': 'Duralon Rubber',
      'Origin': 'China'
    },
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Oatmeal / Pale Ivory', hex: '#D6C7A1', imageIndex: 0 },
      { name: 'Anthracite / Black', hex: '#27272A', imageIndex: 1 }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    stock: 15,
    rating: 4.8,
    reviewCount: 420,
    tags: ['Y2K', 'Zoom Air', 'Mesh Runner', 'Comfort'],
    isFeatured: true,
    isSale: true
  },
  {
    id: 'nike-air-jordan-1-retro-high-og',
    name: 'Air Jordan 1 Retro High OG',
    slug: 'air-jordan-1-retro-high-og',
    brand: 'Nike',
    category: 'basketball',
    gender: 'men',
    price: 16995,
    originalPrice: 16995,
    description: "Familiar yet always fresh, the iconic Air Jordan 1 is remastered for today's sneakerhead culture. Premium leather materials, comfortable Air cushioning and understated design details honor the legend.",
    highlights: [
      'Genuine leather provides structured durability with a premium finish',
      'Encapsulated Nike Air-Sole unit in the heel cushions every step',
      'Solid rubber outsole provides high-traction on court and street',
      'Perforations over the toe for breathability'
    ],
    specs: {
      'Style Code': 'DZ5485-612',
      'Silhouette': 'High-Top',
      'Closure': 'Lace-Up with Wings logo badge',
      'Origin': 'Vietnam'
    },
    images: [
      'https://images.unsplash.com/photo-1586525198428-225f6f12cff5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Chicago (Varsity Red)', hex: '#B91C1C', imageIndex: 0 },
      { name: 'Shadow (Grey / Black)', hex: '#374151', imageIndex: 1 }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    stock: 8,
    rating: 5.0,
    reviewCount: 3120,
    tags: ['Jordan', 'Chicago', 'Grail', 'High Top'],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'nike-alphafly-3',
    name: 'Nike Air Zoom Alphafly 3',
    slug: 'nike-air-zoom-alphafly-3',
    brand: 'Nike',
    category: 'running',
    gender: 'unisex',
    price: 22795,
    originalPrice: 22795,
    description: "Fine-tuned for marathon speed, the Alphafly 3 helps push you beyond what you thought possible. Three innovative technologies power your run: a double dose of Air Zoom units, a full-length carbon fiber Flyplate and heel-to-toe ZoomX foam.",
    highlights: [
      'Dual forefoot Air Zoom units store and return maximum kinetic energy',
      'Full-length carbon fiber Flyplate delivers a stiff, propulsive sensation',
      'ZoomX foam is Nike\'s most resilient, lightweight foam',
      'Atomknit 3.0 upper offers lightweight multidirectional containment'
    ],
    specs: {
      'Style Code': 'FD8311-700',
      'Weight': '218g (Men\'s US 10)',
      'Plate': 'Full-length Carbon Fiber Flyplate',
      'Stack Height': '40mm (World Athletics legal maximum)'
    },
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Proto White / Total Orange', hex: '#EA580C', imageIndex: 0 },
      { name: 'Electric Green', hex: '#22C55E', imageIndex: 1 }
    ],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    stock: 6,
    rating: 4.9,
    reviewCount: 310,
    tags: ['Elite Marathon', 'Carbon Plate', 'ZoomX', 'Race Day'],
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'nike-invincible-3',
    name: 'Nike Invincible 3',
    slug: 'nike-invincible-3',
    brand: 'Nike',
    category: 'running',
    gender: 'men',
    price: 15995,
    originalPrice: 16995,
    discountPercent: 6,
    description: "With maximum cushioning to support every mile, the Invincible 3 gives you our highest level of comfort underfoot to help you stay on your feet today, tomorrow and beyond. Rocking an ultra-bouncy ZoomX foam base.",
    highlights: [
      'Maximum stack of ZoomX foam absorbs impact and returns explosive energy',
      'Evolved Flyknit upper puts zones of breathability where foot heats up',
      'Wider midsole geometry creates reliable stability through stride',
      'Waffle outsole created using runner-informed data'
    ],
    specs: {
      'Style Code': 'DR2615-001',
      'Midsole': '100% ZoomX Foam',
      'Drop': '9mm',
      'Purpose': 'Max-Cushion Recovery & Long Run'
    },
    images: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Phantom / Cobalt Bliss', hex: '#60A5FA', imageIndex: 0 },
      { name: 'Black / White', hex: '#111111', imageIndex: 1 }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    stock: 19,
    rating: 4.8,
    reviewCount: 540,
    tags: ['Max Cushion', 'ZoomX', 'Recovery', 'High Mileage'],
    isSale: true
  },
  {
    id: 'nike-metcon-9',
    name: 'Nike Metcon 9',
    slug: 'nike-metcon-9',
    brand: 'Nike',
    category: 'training',
    gender: 'men',
    price: 12795,
    originalPrice: 12795,
    description: "Whatever your 'why' is for working out, the Metcon 9 makes it all worth it. We improved on the 8 with a larger Hyperlift plate and added rubber rope wrap. Sworn to by some of the greatest athletes in the world.",
    highlights: [
      'Larger Hyperlift plate in the heel gives stability for tough workouts like split squats and deadlifts',
      'Lace lock system attaches to shoe tongue so you don\'t worry about untied laces',
      'Extended rubber wrap on the side adds durability for rope climbs',
      'Dual-density foam midsole provides firm heel with responsive forefoot'
    ],
    specs: {
      'Style Code': 'DZ2537-001',
      'Plate': 'Hyperlift TPU Plate',
      'Upper': 'Engineered Mesh with Rubberized Haptic Print',
      'Origin': 'Vietnam'
    },
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Smoke Grey / White', hex: '#6B7280', imageIndex: 0 },
      { name: 'Black / Gum Light Brown', hex: '#92400E', imageIndex: 1 }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    stock: 22,
    rating: 4.9,
    reviewCount: 780,
    tags: ['CrossFit', 'Hyperlift', 'Lifting', 'HIIT'],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'nike-mercurial-superfly-9-elite',
    name: 'Nike Mercurial Superfly 9 Elite FG',
    slug: 'nike-mercurial-superfly-9-elite-fg',
    brand: 'Nike',
    category: 'football',
    gender: 'unisex',
    price: 24995,
    originalPrice: 24995,
    description: "Instantly tilt the pitch in the bold design of the Superfly 9 Elite FG. We added a soccer-specific 3/4 Zoom Air unit for an extra springy feel that helps you move faster when it matters most.",
    highlights: [
      'Soccer-specific 3/4 Zoom Air unit sits in the plate for explosive propulsive feel',
      'Vaporposite+ upper combines grippy mesh with premium lining for optimal ball control at high speeds',
      'Flyknit collar wraps ankle in soft, stretchy fabric for locked-in feel',
      'Tri-star studs provide multidirectional traction with every step'
    ],
    specs: {
      'Style Code': 'DJ4977-605',
      'Surface': 'Firm Ground (FG)',
      'Upper': 'Vaporposite+ Grid Mesh',
      'Origin': 'Bosnia'
    },
    images: [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sunset Pulse / Black', hex: '#EC4899', imageIndex: 0 },
      { name: 'Metallic Silver / Volt', hex: '#E2E8F0', imageIndex: 1 }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    stock: 14,
    rating: 4.9,
    reviewCount: 460,
    tags: ['Cleats', 'Zoom Air', 'Speed', 'Firm Ground'],
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'nike-lebron-xxi',
    name: 'Nike LeBron XXI',
    slug: 'nike-lebron-xxi',
    brand: 'Nike',
    category: 'basketball',
    gender: 'men',
    price: 18495,
    originalPrice: 19995,
    discountPercent: 8,
    description: "Last time around, LeBron flipped the script on his shoe game as only the King can. The encore is even better. The LeBron XXI features a cabling system that works with Air Zoom cushioning and a light, low-to-the-ground design.",
    highlights: [
      '360-degree zonal cabling system reinforces lightweight mesh for lockdown',
      'Zoom Air unit in the heel and forefoot supports landings and launches',
      'Dimension-stitched dimensional upper resembles oyster shell layers',
      'Carbon-fiber midfoot shank for lateral stability'
    ],
    specs: {
      'Style Code': 'HF5451-001',
      'Signature Athlete': 'LeBron James',
      'Cushioning': 'Zoom Turbo Forefoot + 13mm Bottom-Loaded Zoom Heel',
      'Weight': '395g'
    },
    images: [
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586525198428-225f6f12cff5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Tahitian Pearl / Black', hex: '#1E293B', imageIndex: 0 },
      { name: 'Dragon Pearl / Melon Tint', hex: '#FDBA74', imageIndex: 1 }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14],
    stock: 11,
    rating: 4.8,
    reviewCount: 390,
    tags: ['LeBron', 'Signature Hoops', 'Zoom Turbo', 'Cabling'],
    isSale: true
  },
  {
    id: 'nike-blazer-mid-77-vintage',
    name: "Nike Blazer Mid '77 Vintage",
    slug: 'nike-blazer-mid-77-vintage',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'unisex',
    price: 7995,
    originalPrice: 7995,
    description: "In the '70s, Nike was the new shoe on the block. So much so that we were still breaking into the basketball scene and testing prototypes on the feet of our local team. The vintage finish on the midsole gives you a retro look.",
    highlights: [
      'Solid leather and synthetic upper looks crisp and easy to style',
      'Vintage treatment on the midsole provides an old-school finish',
      'Autoclave construction fuses the outsole to the midsole for a streamlined look',
      'Exposed foam on the tongue provides a throwback aesthetic'
    ],
    specs: {
      'Style Code': 'BQ6806-100',
      'Upper': 'Leather and Suede overlays',
      'Outsole': 'Herringbone Rubber',
      'Origin': 'Indonesia'
    },
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'White / Black Swoosh', hex: '#000000', imageIndex: 0 },
      { name: 'White / Lucid Green', hex: '#15803D', imageIndex: 1 }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    stock: 25,
    rating: 4.7,
    reviewCount: 1650,
    tags: ['Blazer', 'Mid Top', 'Vintage', 'Skate & Street'],
    isBestSeller: true
  },
  {
    id: 'nike-cortez-textile',
    name: 'Nike Cortez Textile',
    slug: 'nike-cortez-textile',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'women',
    price: 6995,
    originalPrice: 6995,
    description: "You spoke. We listened. Based on your feedback, we revamped the original Cortez while keeping the retro appeal you know and love. Re-engineered leather and textile upper resists warping, creasing and scuffing.",
    highlights: [
      'Re-engineered upper is extra durable to prevent creasing and scuffs',
      'Wider toe box provides a more comfortable fit for all-day wear',
      'Iconic foam midsole with wedge insert delivers lightweight comfort',
      'Herringbone outsole pattern gives durable traction and classic style'
    ],
    specs: {
      'Style Code': 'DZ2795-100',
      'Upper': 'Reinforced Textile & Suede',
      'Midsole': 'Dual-density EVA foam',
      'Origin': 'Indonesia'
    },
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'White / Varsity Royal / Red', hex: '#1D4ED8', imageIndex: 0 },
      { name: 'Black / Sail', hex: '#18181B', imageIndex: 1 }
    ],
    sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
    stock: 28,
    rating: 4.8,
    reviewCount: 920,
    tags: ['Cortez', 'Heritage 1972', 'Low Profile', 'Classic'],
    isBestSeller: true
  },
  {
    id: 'nike-air-max-plus',
    name: 'Nike Air Max Plus (Tn)',
    slug: 'nike-air-max-plus-tn',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'men',
    price: 15995,
    originalPrice: 15995,
    description: "Make some waves with the Nike Air Max Plus. Tuned Air experience provides premium stability and unbelievable cushioning. Featuring original wavy design lines inspired by palm trees and ocean sunsets.",
    highlights: [
      'Prominent arch drawing inspiration from a whale\'s tail brings beach life to the city',
      'Iconic TPU fingers nod to palm trees and ocean waves',
      'Nike Max Air units in heel and forefoot provide lightweight, durable cushioning',
      'Synthetic upper with airy mesh for lightweight durability'
    ],
    specs: {
      'Style Code': '604133-050',
      'Technology': 'Tuned Air (Tn)',
      'Sole': 'Rubber Outsole with Tuned Air Pods',
      'Origin': 'Vietnam'
    },
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Hyper Blue / Sky / Black', hex: '#2563EB', imageIndex: 0 },
      { name: 'Sunset Orange / Red', hex: '#EA580C', imageIndex: 1 }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    stock: 14,
    rating: 4.8,
    reviewCount: 1110,
    tags: ['Tuned Air', 'Tn', 'Gradient', 'Aggressive'],
    isFeatured: true
  },
  {
    id: 'nike-kobe-8-protro',
    name: 'Nike Kobe 8 Protro',
    slug: 'nike-kobe-8-protro',
    brand: 'Nike',
    category: 'basketball',
    gender: 'unisex',
    price: 16995,
    originalPrice: 16995,
    description: "The Kobe 8 Protro returns with the same low-profile speed and razor-sharp court feel that elevated the Black Mamba's legendary offensive repertoire. Updated with Nike React foam for enhanced responsiveness.",
    highlights: [
      'Engineered mesh upper conforms to your foot for lightweight breathability and lockdown',
      'Upgraded Nike React foam replaces Lunarlon for better energy return and durability',
      'Herringbone traction pattern provides instantaneous stop-and-go responsiveness',
      'Embroidered Swoosh and Mamba sheath logos celebrate Kobe\'s legacy'
    ],
    specs: {
      'Style Code': 'FQ3549-100',
      'Signature Athlete': 'Kobe Bryant',
      'Drop-In Midsole': 'Full React Foam Drop-in',
      'Weight': '330g'
    },
    images: [
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586525198428-225f6f12cff5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Halo White', hex: '#F8FAFC', imageIndex: 0 },
      { name: 'Court Purple', hex: '#7C3AED', imageIndex: 1 }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    stock: 5,
    rating: 5.0,
    reviewCount: 2840,
    tags: ['Kobe', 'Mamba', 'Protro', 'Low-Top Elite'],
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'nike-phantom-gx-2-elite',
    name: 'Nike Phantom GX 2 Elite FG',
    slug: 'nike-phantom-gx-2-elite-fg',
    brand: 'Nike',
    category: 'football',
    gender: 'unisex',
    price: 23995,
    originalPrice: 24995,
    discountPercent: 4,
    description: "Obsessed with perfecting your craft? Designed for the game's biggest artists, the Phantom GX 2 Elite allows you to command the match with revolutionary Nike Gripknit technology for superior strike precision.",
    highlights: [
      'Nike Gripknit material provides better touch to the ball in wet or dry conditions',
      'Cyclone 360 traction pattern helps you make quick, confident cuts in the tightest spaces',
      'Asymmetric lacing offers larger touch surface when dribbling, passing and scoring',
      'Soft Flyknit material around the ankle gives snug comfort'
    ],
    specs: {
      'Style Code': 'FJ2559-001',
      'Traction Plate': 'Cyclone 360 rotational agility',
      'Upper': 'Gripknit sticky yarn technology',
      'Origin': 'Italy'
    },
    images: [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Black / Deep Royal / Chrome', hex: '#1E3A8A', imageIndex: 0 },
      { name: 'White / Black / Gold', hex: '#EAB308', imageIndex: 1 }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
    stock: 10,
    rating: 4.9,
    reviewCount: 310,
    tags: ['Football', 'Gripknit', 'Playmaker', 'Cleats'],
    isSale: true
  },
  {
    id: 'nike-sabrina-2-mirrored',
    name: 'Nike Sabrina 2',
    slug: 'nike-sabrina-2-court',
    brand: 'Nike',
    category: 'basketball',
    gender: 'unisex',
    price: 11495,
    originalPrice: 11495,
    description: "Sabrina Ionescu's game is versatile, electric and impossible to defend against. Her second signature shoe brings forefoot Zoom Air cushioning and cloud-like Cushlon foam to keep you quick on your feet for 4 quarters.",
    highlights: [
      'Forefoot Zoom Air unit provides responsive energy return for quick cuts and pull-ups',
      'Full-length Cushlon foam offers plush underfoot comfort without adding excess weight',
      'Modified herringbone traction pattern gives elite multi-directional grip',
      'Dynamic midfoot band locks down your arch during explosive shifts'
    ],
    specs: {
      'Style Code': 'FQ7376-001',
      'Signature Athlete': 'Sabrina Ionescu',
      'Weight': '320g',
      'Surface': 'Indoor / Outdoor Court'
    },
    images: [
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586525198428-225f6f12cff5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Mirrored Black / Silver', hex: '#94A3B8', imageIndex: 0 },
      { name: 'Conductor Lilac', hex: '#C084FC', imageIndex: 1 }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    stock: 17,
    rating: 4.9,
    reviewCount: 520,
    tags: ['Sabrina', 'Guard Shoe', 'Low Profile', 'Precision'],
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'nike-react-infinity-run-4',
    name: 'Nike InfinityRN 4',
    slug: 'nike-infinity-run-4',
    brand: 'Nike',
    category: 'running',
    gender: 'women',
    price: 13995,
    originalPrice: 13995,
    description: "With supportive cushioning built for a smooth run, the Nike InfinityRN 4 helps you take off. Made with all-new Nike ReactX foam, which gives you 13% more energy return compared to React foam, to help you stay fresh and bouncy.",
    highlights: [
      'All-new ReactX foam reduces carbon footprint of midsole by at least 43%',
      'Water-repellent liner in the toe helps keep you dry when the weather turns',
      'Flyknit upper creates a breathable, flexible and secure containment',
      'Curved rocker outsole helps your foot rock smoothly through each stride'
    ],
    specs: {
      'Style Code': 'DR2665-100',
      'Cushioning': 'ReactX High Energy Foam',
      'Drop': '9mm',
      'Eco': 'Made with recycled materials'
    },
    images: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Guava Ice / Ember Glow', hex: '#FECDD3', imageIndex: 0 },
      { name: 'Black / White', hex: '#18181B', imageIndex: 1 }
    ],
    sizes: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10],
    stock: 20,
    rating: 4.7,
    reviewCount: 680,
    tags: ['ReactX', 'Support', 'Injury Prevention', 'Smooth Ride'],
    isBestSeller: true
  },
  {
    id: 'nike-air-max-270',
    name: 'Nike Air Max 270',
    slug: 'nike-air-max-270',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'men',
    price: 13995,
    originalPrice: 13995,
    description: "Nike's first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270. The design draws inspiration from Air Max icons, showcasing Nike's greatest innovation with its large window and dramatic color range.",
    highlights: [
      'Max Air 270 unit delivers unrivaled, all-day comfort',
      'Woven and synthetic fabric on the upper provides a lightweight fit and airy feel',
      'Stretchy inner sleeve creates a personalized, sock-like fit',
      'Rubber on the outsole adds traction and durability'
    ],
    specs: {
      'Style Code': 'AH8050-002',
      'Air Unit': '270-degree visible heel bubble (32mm tall)',
      'Upper': 'Breathable Engineered Knit',
      'Origin': 'Vietnam'
    },
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Triple Black', hex: '#18181B', imageIndex: 0 },
      { name: 'White / Black / University Red', hex: '#DC2626', imageIndex: 1 }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    stock: 26,
    rating: 4.8,
    reviewCount: 1940,
    tags: ['Air Max 270', 'Lifestyle', 'Visible Bubble', 'Comfort'],
    isBestSeller: true
  },
  {
    id: 'nike-tiempo-legend-10-elite',
    name: 'Nike Tiempo Legend 10 Elite FG',
    slug: 'nike-tiempo-legend-10-elite',
    brand: 'Nike',
    category: 'football',
    gender: 'unisex',
    price: 20995,
    originalPrice: 20995,
    description: "Even Legends find ways to evolve. Made for those serious about their game, the latest iteration of this Elite cleat has all-new FlyTouch Plus engineered leather that molds to your foot and doesn't overstretch.",
    highlights: [
      'FlyTouch Plus engineered leather is softer than natural leather and doesn\'t absorb excess water',
      'Microdots on upper amplify touch zones for shooting, dribbling and passing',
      'Plate blends conical studs in the heel for optimal traction and stability when braking',
      'Flat-knit collar provides snug, stretchy fit around ankle'
    ],
    specs: {
      'Style Code': 'DV4328-100',
      'Upper': 'FlyTouch Plus Synthetic Microfiber',
      'Soleplate': 'Dual-density conical chassis',
      'Origin': 'Vietnam'
    },
    images: [
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'White / Black / Bright Crimson', hex: '#EF4444', imageIndex: 0 },
      { name: 'Emerald / White', hex: '#10B981', imageIndex: 1 }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    stock: 12,
    rating: 4.8,
    reviewCount: 340,
    tags: ['Tiempo', 'Touch Master', 'Leather Feel', 'Cleats']
  },
  {
    id: 'nike-free-metcon-5',
    name: 'Nike Free Metcon 5',
    slug: 'nike-free-metcon-5',
    brand: 'Nike',
    category: 'training',
    gender: 'women',
    price: 10295,
    originalPrice: 10295,
    description: "When your workouts step into the weeds, the Nike Free Metcon 5 can take you into the deep, help you find that final ounce of force and come out on the other side on a high. It pairs style with substance.",
    highlights: [
      'Nike Free technology in the forefoot creates flexibility for agility moves like burpees and sprints',
      'Wide heel creates stable base for lifting heavy weights',
      '7/8-length internal sleeve makes for easy on and off with custom fit',
      'Plush foam core cushions your foot while firmer outer carrier is durable and stable'
    ],
    specs: {
      'Style Code': 'DV3950-100',
      'Forefoot Tech': 'Nike Free laser-siped sipes',
      'Heel Base': 'Dual-density flat stability platform',
      'Weight': '278g'
    },
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'White / Desert Sand', hex: '#E2E8F0', imageIndex: 0 },
      { name: 'Black / Rose Gold', hex: '#FB7185', imageIndex: 1 }
    ],
    sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5],
    stock: 21,
    rating: 4.9,
    reviewCount: 890,
    tags: ['Free Metcon', 'Cardio + Lift', 'Flexibility', 'Training'],
    isBestSeller: true
  },
  {
    id: 'nike-air-max-97',
    name: 'Nike Air Max 97',
    slug: 'nike-air-max-97',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'unisex',
    price: 15995,
    originalPrice: 16995,
    discountPercent: 6,
    description: "Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full speed ahead. Taking the revolutionary full-length Nike Air unit that shook up the running world.",
    highlights: [
      'Full-length Max Air unit provides soft, lasting comfort underfoot',
      'Synthetic and fabric materials on upper maintain fluid look of the original',
      'Hidden lacing system was a first of its kind for a streamlined look',
      'Foam sockliner feels soft and comfortable all day long'
    ],
    specs: {
      'Style Code': '921826-001',
      'Sole': 'Full-length Max Air Window',
      'Aesthetic': 'Silver Bullet Inspired Lines',
      'Origin': 'Vietnam'
    },
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Silver Bullet / Red', hex: '#CBD5E1', imageIndex: 0 },
      { name: 'Triple White', hex: '#FFFFFF', imageIndex: 1 }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    stock: 16,
    rating: 4.7,
    reviewCount: 970,
    tags: ['Air Max 97', 'Silver Bullet', 'Full Air', 'Retro Futurist'],
    isSale: true
  },
  {
    id: 'nike-gt-cut-3',
    name: 'Nike G.T. Cut 3',
    slug: 'nike-gt-cut-3',
    brand: 'Nike',
    category: 'basketball',
    gender: 'men',
    price: 16995,
    originalPrice: 16995,
    description: "How quick can you stop on a dime? The G.T. Cut 3 helps you create separation with our newest ultra-responsive ZoomX foam. Designed to help you create space on step-backs and backdoor cuts.",
    highlights: [
      'Full-length ZoomX foam gives incredible bounce and energy return on court',
      'Modified herringbone traction pattern gives elite stop-and-go responsiveness',
      'Flywire cables integrate with laces to lock down forefoot',
      'Subtle TPU lateral wrap keeps foot contained over footbed on hard drives'
    ],
    specs: {
      'Style Code': 'DV2918-100',
      'Foam': 'Full-length ZoomX compound',
      'Weight': '350g',
      'Target Position': 'Guards & Shifty Wings'
    },
    images: [
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586525198428-225f6f12cff5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Summit White / Picante Red', hex: '#F43F5E', imageIndex: 0 },
      { name: 'Ashen Slate / Football Grey', hex: '#64748B', imageIndex: 1 }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    stock: 9,
    rating: 4.9,
    reviewCount: 290,
    tags: ['GT Cut', 'ZoomX Basketball', 'Fast Cuts', 'Elite Hoops'],
    isNewArrival: true
  },
  {
    id: 'nike-air-force-1-kids',
    name: "Nike Air Force 1 '07 LV8 Kids",
    slug: 'nike-air-force-1-kids',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'kids',
    price: 6495,
    originalPrice: 6495,
    description: "Give young stars legendary style with the Nike Air Force 1. Durable leather and soft foam cushioning keep little feet feeling great from morning recess to after-school adventures.",
    highlights: [
      'Real and synthetic leather give classic AF1 durability',
      'Hidden Air unit provides timeless underfoot cushioning',
      'Padded collar cushions the ankle',
      'Non-marking rubber sole with circular tread'
    ],
    specs: {
      'Style Code': 'FB1374-100',
      'Audience': 'Grade School (Kids)',
      'Upper': 'Genuine and Synthetic Leather',
      'Origin': 'Indonesia'
    },
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'White / Black', hex: '#000000', imageIndex: 0 },
      { name: 'Triple White', hex: '#FFFFFF', imageIndex: 1 }
    ],
    sizes: [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
    stock: 20,
    rating: 4.9,
    reviewCount: 430,
    tags: ['Kids', 'AF1', 'Grade School', 'Durable'],
    isBestSeller: true
  },
  {
    id: 'nike-pegasus-40-kids',
    name: 'Nike Pegasus 40 Kids',
    slug: 'nike-pegasus-40-kids',
    brand: 'Nike',
    category: 'running',
    gender: 'kids',
    price: 7495,
    originalPrice: 8495,
    discountPercent: 12,
    description: "The winged workhorse is ready to fly with young athletes. Breathable mesh keeps feet cool, while soft foam gives every jump, sprint and stride plenty of spring.",
    highlights: [
      'Lightweight engineered mesh upper promotes active airflow',
      'Soft foam provides plush, durable cushioning under foot',
      'Waffle rubber outsole grips the track, blacktop and playground',
      'Extra skin layer across toe tip gives durability for toe draggers'
    ],
    specs: {
      'Style Code': 'DX5054-001',
      'Audience': 'Big Kids / Youth',
      'Midsole': 'Cushlon Foam',
      'Origin': 'Vietnam'
    },
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Black / White / Racer Blue', hex: '#2563EB', imageIndex: 0 },
      { name: 'Volt / Black', hex: '#84CC16', imageIndex: 1 }
    ],
    sizes: [3.5, 4, 4.5, 5, 5.5, 6, 6.5],
    stock: 15,
    rating: 4.8,
    reviewCount: 220,
    tags: ['Kids Running', 'Youth Track', 'Pegasus', 'Comfort'],
    isSale: true
  },
  {
    id: 'nike-killshot-2-leather',
    name: 'Nike Killshot 2 Leather',
    slug: 'nike-killshot-2-leather',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'men',
    price: 7495,
    originalPrice: 7495,
    description: "Inspired by the low-profile tennis shoe of the late '70s, the Killshot 2 updates the upper with various textured leathers to create a fresh look. From soft suedes to smooth leather with the perfect sheen.",
    highlights: [
      'Leather upper with suede accents softens and gains vintage character with wear',
      'Rubber gum sole adds a retro court look and durable traction',
      'Low-profile collar looks sleek around the ankle',
      'Clean contrast Swoosh gives authentic collegiate style'
    ],
    specs: {
      'Style Code': '432997-107',
      'Upper': 'Full Grain Leather & Suede',
      'Outsole': 'Classic Natural Gum Rubber',
      'Origin': 'Indonesia'
    },
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sail / Midnight Navy / Gum', hex: '#1E3A8A', imageIndex: 0 },
      { name: 'Sail / Lucid Green / Gum', hex: '#16A34A', imageIndex: 1 }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    stock: 30,
    rating: 4.9,
    reviewCount: 1540,
    tags: ['Killshot', 'Gum Sole', 'Tennis Heritage', 'Smart Casual'],
    isBestSeller: true
  },
  {
    id: 'nike-calm-slide',
    name: 'Nike Calm Slide',
    slug: 'nike-calm-slide',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'unisex',
    price: 3995,
    originalPrice: 3995,
    description: "Enjoy a calm, comfortable experience wherever your day takes you. Made from soft yet responsive foam, these lightweight slides are easy to style and easy to pack. Water-friendly design makes them ideal for pool days and recovery.",
    highlights: [
      'Contoured design is crafted from a single piece of foam for a smooth, seamless feel',
      'Subtle texture pattern on the footbed adds grip even when wet',
      'Outer shell is made from water-friendly foam that\'s easy to clean',
      'Full-length rubber outsole gives reliable traction'
    ],
    specs: {
      'Style Code': 'FD4116-001',
      'Material': 'Single Mold Dual-Density EVA Foam',
      'Water Resistant': 'Yes',
      'Origin': 'Indonesia'
    },
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Black', hex: '#111111', imageIndex: 0 },
      { name: 'Sail / Sesame', hex: '#E5E0D8', imageIndex: 1 },
      { name: 'Geode Teal', hex: '#0D9488', imageIndex: 2 }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12, 13],
    stock: 45,
    rating: 4.8,
    reviewCount: 880,
    tags: ['Calm Slide', 'Recovery', 'Water Friendly', 'Minimalist'],
    isBestSeller: true
  },
  {
    id: 'nike-ja-1-scratch',
    name: 'Nike Ja 1',
    slug: 'nike-ja-1-scratch',
    brand: 'Nike',
    category: 'basketball',
    gender: 'men',
    price: 10495,
    originalPrice: 10495,
    description: "Ja Morant became the superstar he is today by repeatedly sinking jumpers on crooked rims, jumping on tractor tires and dribbling through traffic cones in sweltering South Carolina summers. The Ja 1 is a testament to his rise.",
    highlights: [
      'Forefoot Air Zoom unit provides increased responsiveness and vertical acceleration',
      'Raised foam collar adds support for high-flying landings',
      'Containment system and forefoot strap help keep your heel and ankle steady',
      'Signature Ja handwritten logos and graphics'
    ],
    specs: {
      'Style Code': 'DR8785-100',
      'Signature Athlete': 'Ja Morant',
      'Cushioning': 'Forefoot Air Zoom + Phylon Midsole',
      'Weight': '360g'
    },
    images: [
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586525198428-225f6f12cff5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Scratch Turquoise / White', hex: '#06B6D4', imageIndex: 0 },
      { name: 'Zombie Lime / Smoke', hex: '#84CC16', imageIndex: 1 }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    stock: 14,
    rating: 4.8,
    reviewCount: 460,
    tags: ['Ja Morant', 'Bounce', 'Grizzlies', 'High Flying']
  },
  {
    id: 'nike-p-6000-metallic',
    name: 'Nike P-6000',
    slug: 'nike-p-6000-metallic',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'unisex',
    price: 8995,
    originalPrice: 8995,
    description: "Drawing on the 2006 Nike Air Pegasus, the Nike P-6000 brings you a mash-up of iconic running style that's breathable, comfortable and evocative of early-2000s tech aesthetics.",
    highlights: [
      'Breathable mesh has real and synthetic leather overlays for 2000s running style',
      'Foam midsole adds lightweight cushioning for all-day comfort',
      'Full rubber outsole delivers durable traction',
      'Molded synthetic leather Swoosh design'
    ],
    specs: {
      'Style Code': 'CD6404-006',
      'Inspiration': 'Pegasus 2006 Runner',
      'Upper': 'Multi-layer Metallic Mesh and Overlays',
      'Origin': 'Vietnam'
    },
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Metallic Silver / White', hex: '#94A3B8', imageIndex: 0 },
      { name: 'Flat Pewter / Light Bone', hex: '#D1D5DB', imageIndex: 1 }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    stock: 18,
    rating: 4.7,
    reviewCount: 390,
    tags: ['P-6000', 'Y2K Silver', 'Mesh Runner', 'Street Style'],
    isNewArrival: true
  },
  {
    id: 'nike-pegasus-trail-4-gore-tex',
    name: 'Nike Pegasus Trail 4 GORE-TEX',
    slug: 'nike-pegasus-trail-4-gtx',
    brand: 'Nike',
    category: 'running',
    gender: 'men',
    price: 14495,
    originalPrice: 15995,
    discountPercent: 9,
    description: "The Nike Pegasus Trail 4 GORE-TEX is your running companion for those days when the weather turns. Its waterproof GORE-TEX layer helps keep your feet dry, and less rubber in the outsole creates a smooth transition from road to trail.",
    highlights: [
      'GORE-TEX layer along the upper keeps water out without sacrificing comfortable feel',
      'Nike React technology is a lightweight, durable foam that delivers smooth, responsive ride',
      'Less rubber along the outsole creates an easy transition from road to trail',
      'Generative traction pattern combined with rubber lugs provides grip uphill or downhill'
    ],
    specs: {
      'Style Code': 'DJ7926-001',
      'Waterproofing': 'GORE-TEX Invisible Fit membrane',
      'Midsole': 'Full React Foam',
      'Drop': '9.5mm'
    },
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Black / Wolf Grey / Reflective', hex: '#1E293B', imageIndex: 0 },
      { name: 'Cargo Khaki / Olive Flak', hex: '#4D7C0F', imageIndex: 1 }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    stock: 13,
    rating: 4.9,
    reviewCount: 510,
    tags: ['GORE-TEX', 'Trail Running', 'Waterproof', 'React'],
    isSale: true
  },
  {
    id: 'nike-tc-7900-sail',
    name: 'Nike TC 7900',
    slug: 'nike-tc-7900-sail',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'women',
    price: 9995,
    originalPrice: 9995,
    description: "Built for everyday wear and ready for whatever your day brings, the Nike TC 7900 combines rugged materials with soft cushioning. Heavy-duty webbing and rubber lugs give it a utilitarian look that's easy to style.",
    highlights: [
      'Layers of synthetic materials on the upper optimize durability and comfort',
      'Thick foam cushioning adds unbelievable comfort while rubber accents on the sole add durability',
      'Pull tabs on the tongue and heel make these easy to slip on and off',
      'Padded low-cut collar looks sleek and feels comfortable'
    ],
    specs: {
      'Style Code': 'DD9682-100',
      'Upper': 'Durable Synthetic Webbing and Panels',
      'Midsole': 'Chunky Sculpted EVA Foam',
      'Origin': 'Vietnam'
    },
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sail / Black', hex: '#FAF5EE', imageIndex: 0 },
      { name: 'Summit White / Ghost', hex: '#F1F5F9', imageIndex: 1 }
    ],
    sizes: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5],
    stock: 22,
    rating: 4.8,
    reviewCount: 710,
    tags: ['Chunky', 'Sail', 'Utility', 'Women Sneaker'],
    isBestSeller: true
  },
  {
    id: 'nike-structure-25',
    name: 'Nike Structure 25',
    slug: 'nike-structure-25',
    brand: 'Nike',
    category: 'running',
    gender: 'men',
    price: 11995,
    originalPrice: 11995,
    description: "With stability where you need it, cushion where you want it, the Structure 25 supports you for long miles, short training runs and even an out-and-back before the day ends. It's the stability you seek.",
    highlights: [
      'Midfoot system provides elevated arch support for runners needing stability',
      'Zoom Air unit in forefoot offers responsive cushioning on push-off',
      'Updated foam midsole provides soft, supportive landings',
      'Engineered mesh upper with strategic ventilation'
    ],
    specs: {
      'Style Code': 'DJ7883-001',
      'Support Type': 'Stability / Overpronation Control',
      'Heel Drop': '10mm',
      'Origin': 'Vietnam'
    },
    images: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pure Platinum / Thunder Blue', hex: '#1E40AF', imageIndex: 0 },
      { name: 'Black / Metallic Silver', hex: '#111111', imageIndex: 1 }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    stock: 17,
    rating: 4.7,
    reviewCount: 310,
    tags: ['Stability', 'Overpronation', 'Structured Run', 'Zoom Air']
  },
  {
    id: 'nike-air-presto',
    name: 'Nike Air Presto',
    slug: 'nike-air-presto',
    brand: 'Nike',
    category: 'lifestyle',
    gender: 'unisex',
    price: 11495,
    originalPrice: 11495,
    description: "With a sleek design that's more comfortable than your favorite T-shirt, the Nike Air Presto is made to feel good and look fast. Its stretchy sleeve creates a cozy, sock-like fit while super-soft foam adds spring to your step.",
    highlights: [
      'Stretchy spacer mesh in the upper creates a sock-like fit that\'s breathable',
      'Iconic midfoot TPU cage adds support and contrasts with stretchy upper',
      'Nike Air cushioning adds lasting comfort underfoot',
      '5 dots on midsole reference the innovation-focused Nike Alpha Project'
    ],
    specs: {
      'Style Code': 'CT3550-001',
      'Sizing': 'T-Shirt Sizing Philosophy',
      'Cage': 'Midfoot TPU Molded Support Cage',
      'Origin': 'Vietnam'
    },
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Triple Black', hex: '#18181B', imageIndex: 0 },
      { name: 'Zen Grey / University Red', hex: '#991B1B', imageIndex: 1 }
    ],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    stock: 19,
    rating: 4.8,
    reviewCount: 890,
    tags: ['T-Shirt for Foot', 'Presto', 'Slip-On Feel', 'Air Cushion']
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Shoes', path: '/shop' },
  { id: 'running', name: 'Running', path: '/running' },
  { id: 'basketball', name: 'Basketball', path: '/basketball' },
  { id: 'lifestyle', name: 'Lifestyle', path: '/lifestyle' },
  { id: 'football', name: 'Football', path: '/football' },
  { id: 'training', name: 'Training', path: '/training' }
];

export const DEMO_COUPONS: Record<string, number> = {
  SHOE10: 10,
  KINETIC15: 15,
  NIKE20: 20,
  ELFBAR: 100
};
