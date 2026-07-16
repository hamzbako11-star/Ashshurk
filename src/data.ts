import { Product, BlogPost, Testimonial, FAQItem } from './types';

export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '🛍️' },
  { id: 'live-chicken', name: '🐔 Live Chicken', icon: '🐔' },
  { id: 'processed-chicken', name: '🍗 Processed Chicken', icon: '🍗' },
  { id: 'fresh-eggs', name: '🥚 Fresh Eggs', icon: '🥚' },
  { id: 'fresh-fish', name: '🐟 Fresh Fish', icon: '🐟' },
  { id: 'fresh-milk', name: '🥛 Fresh Milk', icon: '🥛' },
  { id: 'vegetables', name: '🥬 Vegetables', icon: '🥬' },
  { id: 'tomatoes', name: '🍅 Tomatoes', icon: '🍅' },
  { id: 'carrots', name: '🥕 Carrots', icon: '🥕' },
  { id: 'maize', name: '🌽 Maize', icon: '🌽' },
  { id: 'fruits', name: '🍉 Fruits', icon: '🍉' },
  { id: 'grains', name: '🌾 Grains', icon: '🌾' },
  { id: 'pepper', name: '🌶 Pepper', icon: '🌶' },
  { id: 'onions', name: '🧅 Onions', icon: '🧅' },
  { id: 'animal-feed', name: '🐔 Animal Feed', icon: '🌾' },
  { id: 'farm-inputs', name: '🚜 Farm Inputs', icon: '🚜' },
  { id: 'frozen-foods', name: '❄️ Frozen Foods', icon: '❄️' },
  { id: 'others', name: '✨ Others', icon: '✨' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'lc-01',
    name: 'Premium Broiler Chicken (Live)',
    category: 'live-chicken',
    price: 4500,
    discountPrice: 3950,
    rating: 4.8,
    reviewsCount: 128,
    image: '/src/assets/images/poultry_farm_broilers_1784235109103.jpg',
    images: [
      '/src/assets/images/poultry_farm_broilers_1784235109103.jpg',
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Our live broiler chickens are raised under standard hygienic conditions, fed with premium organic feed. Weighing between 2.2kg to 2.6kg, they are extremely healthy, fleshy, and perfect for household consumption, parties, and wholesale retail.',
    specifications: {
      'Average Weight': '2.4 kg',
      'Breed': 'Cobb 500 Broiler',
      'Feed': '100% Organic Grains',
      'Age': '7-8 Weeks',
      'Farming Method': 'Deep Litter System'
    },
    stockStatus: 'in_stock',
    unit: '1 Bird',
    organic: true
  },
  {
    id: 'lc-02',
    name: 'Organic Cockerel Chicken (Live)',
    category: 'live-chicken',
    price: 5200,
    rating: 4.6,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1604848698030-c434ba08ece1?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1604848698030-c434ba08ece1?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Extremely resilient and slow-grown Cockerels, raised naturally on open fields. They have dense meat fibers, giving a rich traditional flavor when cooked.',
    specifications: {
      'Average Weight': '1.8 kg - 2.2 kg',
      'Breed': 'Local Cross Cockerel',
      'Feed': 'Free-range + Mash',
      'Age': '18 Weeks',
      'Farming Method': 'Semi-intensive'
    },
    stockStatus: 'in_stock',
    unit: '1 Bird'
  },
  {
    id: 'pc-01',
    name: 'Gourmet Processed Whole Chicken',
    category: 'processed-chicken',
    price: 4800,
    discountPrice: 4200,
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Freshly slaughtered, meticulously defeathered, and pre-cleaned whole chicken. Packaged under strict health guidelines, frozen immediately to preserve natural nutrients and juices.',
    specifications: {
      'Net Weight': '1.5 kg',
      'State': 'Frozen / Freshly Chilled',
      'Halal': 'Yes',
      'Hygienically Cleaned': 'Yes, ready to cook',
      'Preservatives': 'None (100% Natural)'
    },
    stockStatus: 'in_stock',
    unit: '1 Pack',
    organic: true
  },
  {
    id: 'pc-02',
    name: 'Tender Chicken Breast Fillets',
    category: 'processed-chicken',
    price: 3200,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1602662642142-71f0a4db2011?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1602662642142-71f0a4db2011?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Boneless, skinless, high-protein chicken breast cut into perfect fillets. Ideal for fitness enthusiasts, quick stir-fries, and premium restaurants.',
    specifications: {
      'Net Weight': '1.0 kg',
      'State': 'Frozen',
      'Cut Type': 'Boneless, Skinless',
      'Packaging': 'Vacuum sealed pack'
    },
    stockStatus: 'in_stock',
    unit: '1 kg Pack'
  },
  {
    id: 'fe-01',
    name: 'Fresh Farm Golden Eggs',
    category: 'fresh-eggs',
    price: 3800,
    discountPrice: 3400,
    rating: 4.9,
    reviewsCount: 312,
    image: '/src/assets/images/organic_farm_eggs_1784235096371.jpg',
    images: [
      '/src/assets/images/organic_farm_eggs_1784235096371.jpg',
      'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Freshly gathered brown-shell table eggs from healthy layers fed on vitamin-rich feed. Features deep golden-yellow yolks, firm albumens, and sturdy shells that reduce breakage.',
    specifications: {
      'Quantity': '30 Eggs (1 Crate)',
      'Size': 'Large (60g - 65g per egg)',
      'Shell Color': 'Brown / Golden',
      'Yolk Profile': 'Deep Yellow (High Lutein)',
      'Shelf Life': '4 Weeks (Refrigerated)'
    },
    stockStatus: 'in_stock',
    unit: '1 Crate',
    organic: true
  },
  {
    id: 'fe-02',
    name: 'Premium Double-Yolk Eggs',
    category: 'fresh-eggs',
    price: 4900,
    rating: 5.0,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1582722418935-8b0bc040dc13?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1582722418935-8b0bc040dc13?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Rare, jumbo-sized double yolk eggs. Hand-selected via candling for double-yolk assurance. Extra rich, creamy, and wonderful for spectacular baking and luxurious breakfasts.',
    specifications: {
      'Quantity': '30 Eggs (1 Crate)',
      'Size': 'Jumbo Plus (75g+ per egg)',
      'Assurance Rate': '>90% Double Yolk'
    },
    stockStatus: 'low_stock',
    unit: '1 Crate'
  },
  {
    id: 'ff-01',
    name: 'Freshly Harvested Live Catfish',
    category: 'fresh-fish',
    price: 3000,
    rating: 4.7,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Live African Catfish harvested directly from our pure spring-fed concrete aquaculture ponds. They are active, healthy, have no muddy taste, and can be cleaned and cut on demand.',
    specifications: {
      'Average Weight': '1.0 kg - 1.5 kg',
      'Harvest Location': 'Concrete Ponds',
      'Taste Profile': 'Sweet, Non-muddy',
      'Freshness': '100% Live Delivery'
    },
    stockStatus: 'in_stock',
    unit: '1 kg'
  },
  {
    id: 'ff-02',
    name: 'Smoked Catfish (Premium Pack)',
    category: 'fresh-fish',
    price: 4500,
    discountPrice: 4000,
    rating: 4.8,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Traditional hardwood-smoked catfish. Dried thoroughly to guarantee long shelf-life. Intensely aromatic, adds authentic flavor to traditional soups and stews.',
    specifications: {
      'Pack Contents': '4-5 Large Dried Fishes',
      'Smoking Method': 'Hardwood Smoking',
      'Preservatives': 'None (Salt & Smoke only)',
      'Shelf Life': '6 Months'
    },
    stockStatus: 'in_stock',
    unit: 'Pack of 4'
  },
  {
    id: 'fm-01',
    name: 'Pasteurized Fresh Farm Milk',
    category: 'fresh-milk',
    price: 1800,
    rating: 4.8,
    reviewsCount: 56,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Pure, fresh cow milk pasteurized gently to preserve the creamy flavor and complete nutritional values. No dilution, zero artificial additives.',
    specifications: {
      'Volume': '1.0 Litre',
      'Fat Content': 'Full Cream (3.5%)',
      'Treatment': 'HTST Pasteurized',
      'Storage': 'Keep Refrigerated (0-4°C)'
    },
    stockStatus: 'in_stock',
    unit: 'Bottle',
    organic: true
  },
  {
    id: 'v-01',
    name: 'Fresh Organic Spinach (Efo Shoko)',
    category: 'vegetables',
    price: 800,
    rating: 4.5,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Crisp, vibrant green spinach harvested early in the morning of your delivery day. Grown strictly with organic compost, rich in iron and dietary fiber.',
    specifications: {
      'Weight': 'Approx. 500g bunch',
      'Harvesting Frequency': 'Daily',
      'Fertilizer': 'Organic Poultry Compost'
    },
    stockStatus: 'in_stock',
    unit: '1 Bunch',
    organic: true
  },
  {
    id: 't-01',
    name: 'Premium Roma Tomatoes (Basket)',
    category: 'tomatoes',
    price: 8500,
    discountPrice: 7500,
    rating: 4.7,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Vibrant red, firm Roma tomatoes harvested from our controlled greenhouse structures. Low water content and thick skins make them sweet and slow to spoil.',
    specifications: {
      'Quantity': '1 Medium Basket (Approx. 7.5kg)',
      'Variety': 'Roma',
      'Ripeness': 'Firm Medium-Ripe (Perfect for transit)'
    },
    stockStatus: 'in_stock',
    unit: '1 Basket'
  },
  {
    id: 'c-01',
    name: 'Vibrant Sweet Carrots (Bag)',
    category: 'carrots',
    price: 1500,
    rating: 4.6,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Sweet, crisp carrots freshly pulled from sandy soil. Rich in beta-carotene, ideal for fresh juices, salads, fried rice, and snacks.',
    specifications: {
      'Weight': '1.0 kg pack',
      'Farming Location': 'Plateau Region Farms',
      'Pesticides': 'Zero Residue Certified'
    },
    stockStatus: 'in_stock',
    unit: '1 kg Pack',
    organic: true
  },
  {
    id: 'm-01',
    name: 'Fresh Sweet Corn Cob (Yellow)',
    category: 'maize',
    price: 1200,
    rating: 4.4,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d20f6?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1551754655-cd27e38d20f6?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Naturally sweet yellow corn. Juicy, plump kernels perfect for boiling, roasting, or incorporating into delicious homemade salads.',
    specifications: {
      'Quantity': '5 Large Cobs',
      'Variety': 'Super Sweet Yellow',
      'Harvest State': 'Freshly harvested in husk'
    },
    stockStatus: 'in_stock',
    unit: '5 Cobs'
  },
  {
    id: 'fr-01',
    name: 'Juicy Sweet Watermelon',
    category: 'fruits',
    price: 2500,
    rating: 4.8,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Large, vine-ripened striped sweet watermelons. Exceptionally juicy with crisp crimson flesh, loaded with hydrating electrolytes and vitamins.',
    specifications: {
      'Weight': 'Approx. 5.5 kg - 7.0 kg',
      'Sugar Content (Brix)': '11-12 (Very Sweet)',
      'Seed Level': 'Standard Seeded'
    },
    stockStatus: 'in_stock',
    unit: '1 Large Fruit'
  },
  {
    id: 'g-01',
    name: 'Local Stone-Free Brown Rice',
    category: 'grains',
    price: 6500,
    discountPrice: 5800,
    rating: 4.7,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Premium parboiled local brown rice. Completely destoned and polished with advanced optical sorters. Extremely healthy, high-fiber, and delicious.',
    specifications: {
      'Weight': '5.0 kg bag',
      'Grain Type': 'Long-grain',
      'Stone Presence': '0.00% Guaranteed',
      'Fiber Profile': 'High Bran Layer Retention'
    },
    stockStatus: 'in_stock',
    unit: '5 kg Bag'
  },
  {
    id: 'p-01',
    name: 'Vibrant Habanero Pepper (Ata Rodo)',
    category: 'pepper',
    price: 2000,
    rating: 4.8,
    reviewsCount: 55,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Fiery hot, aromatic red habanero peppers. Adds unmistakable heat and depth of flavor to stews, pepper soup, and marinades.',
    specifications: {
      'Quantity': 'Approx. 1.2 kg bag',
      'Scoville Heat Units': '100,000 - 350,000 SHU',
      'Color': 'Deep Red / Orange'
    },
    stockStatus: 'in_stock',
    unit: '1 Bag'
  },
  {
    id: 'o-01',
    name: 'Fresh Crisp Red Onions',
    category: 'onions',
    price: 3200,
    rating: 4.6,
    reviewsCount: 47,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83766ae?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83766ae?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Fresh, firm red onions sourced directly from the plains of northern farms. Strong, spicy fragrance and sweet aftertaste when sautéed.',
    specifications: {
      'Weight': '3.0 kg bag',
      'Onion Size': 'Medium (60mm - 80mm)',
      'Water Content': 'Medium (Excellent shelf stability)'
    },
    stockStatus: 'in_stock',
    unit: '3 kg Bag'
  },
  {
    id: 'af-01',
    name: 'High Protein Layers Mash (Feed)',
    category: 'animal-feed',
    price: 18500,
    discountPrice: 17200,
    rating: 4.9,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Scientifically formulated layers feed containing 17.5% crude protein, high calcium, and amino acids. Boosts laying consistency, shell strength, and yolk color.',
    specifications: {
      'Weight': '25 kg Bag',
      'Crude Protein': '17.5% Min',
      'Calcium': '3.8% Min',
      'Form': 'Coarse Mash'
    },
    stockStatus: 'in_stock',
    unit: '25 kg Bag'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Abiola Johnson',
    role: 'Owner, J-Foods Restaurant Chain',
    rating: 5,
    comment: 'Ashshuruk Ventures has completely transformed our supply chain. Getting processed whole chicken and stone-free rice delivered on schedule has saved us hours. The eggs always arrive with robust golden yolks, which is perfect for our bakery!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    verified: true
  },
  {
    id: 't2',
    name: 'Dr. Fatima Umar',
    role: 'Nutritionist & Mother of Three',
    rating: 5,
    comment: 'With three young children, food quality is my absolute priority. I buy all our vegetables, fresh eggs, and fresh milk here. The customer support is fantastic, and knowing I can pay securely or choose Cash on Delivery gives me absolute peace of mind.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    verified: true
  },
  {
    id: 't3',
    name: 'Emeka Okafor',
    role: 'Manager, City Supermarket',
    rating: 5,
    comment: 'As a supermarket, we need zero defects in packaging. Ashshuruk provides flawless processed chickens and custom crates of fresh eggs. Their supplier portal is intuitive, making wholesale restocking an absolute breeze!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    verified: true
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'How do I place an order on Ashshuruk Ventures?',
    answer: 'You can easily browse our products by category or use the AI-powered search bar. Add items to your cart, click checkout, fill in your delivery details, choose a convenient payment method (Card, Bank Transfer, USSD, or Cash on Delivery), and submit. You will receive an immediate order tracking number.',
    category: 'Ordering'
  },
  {
    id: 'f2',
    question: 'Can I choose Cash on Delivery (Pay on Delivery)?',
    answer: 'Yes! We support Cash on Delivery (COD) for most delivery addresses. You can pay with cash or via mobile bank transfer directly to our dispatch rider when they deliver your items.',
    category: 'Payment'
  },
  {
    id: 'f3',
    question: 'How fresh are your farm products?',
    answer: 'We operate on a direct farm-to-table model. Our vegetables are harvested early in the morning of your scheduled delivery. Fresh eggs are collected daily, and our poultry products are kept in temperature-controlled cold chains to guarantee peak freshness.',
    category: 'Quality'
  },
  {
    id: 'f4',
    question: 'Do you offer same-day or scheduled delivery?',
    answer: 'Yes, we offer Same-Day Delivery for orders placed before 10:00 AM. We also support Next-Day Delivery, Scheduled Deliveries on selected days, and convenient farm pickup.',
    category: 'Delivery'
  },
  {
    id: 'f5',
    question: 'How do I register as a supplier/partner farm?',
    answer: 'Simply click "Become a Supplier" in the main menu or hero section. Fill out the farm verification form with your details, and our agriculture relations team will review and approve your portal access within 24-48 hours.',
    category: 'Partners'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Ultimate Guide to Storing Farm Fresh Eggs',
    category: 'Storage Tips',
    excerpt: 'Should eggs be stored on the fridge door or in their carton? Read about the science of egg shelf-life.',
    content: 'Storing farm fresh eggs properly is vital for preserving their nutritional value and deep golden yolk flavor. Contrary to popular belief, storing eggs on the refrigerator door makes them susceptible to temperature fluctuations every time the fridge is opened. The best place to keep your eggs is on the middle shelf, inside their original cardboard crate. The cardboard protects the porous eggshells from absorbing odors from other refrigerator items, like onions or fish. Additionally, keeping the pointy end of the egg facing down ensures the air pocket remains at the rounded top, keeping the yolk centered and fresher for up to four weeks.',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80',
    date: 'July 14, 2026',
    author: 'Chief Farmer Ashshuruk',
    readTime: '4 min read'
  },
  {
    id: 'b2',
    title: 'Understanding the Farm-to-Table Advantage',
    category: 'Nutrition',
    excerpt: 'Why local fresh farm produce is significantly richer in micronutrients than grocery store products.',
    content: 'When farm produce is shipped across continents, it loses a staggering percentage of its vitamin C, folate, and carotenoids due to oxidation during long-transit shipping. The farm-to-table approach eliminates this latency. Produce harvested at natural peak ripeness is delivered straight to your doorstep, ensuring you receive maximum antioxidant and nutritional density. Furthermore, buying locally harvested vegetables reduces transit emissions, making your diet both exceptionally healthy and environmentally friendly.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    date: 'July 10, 2026',
    author: 'Adama Bello (Agro Analyst)',
    readTime: '6 min read'
  },
  {
    id: 'b3',
    title: 'Poultry Farming 101: Keeping Chickens Healthy in Wet Seasons',
    category: 'Poultry Tips',
    excerpt: 'Critical feed formulations and sanitation schedules required to keep broiler flocks active during rains.',
    content: 'The wet season brings humidity, which can lead to respiratory infections and mouldy feed inside poultry structures. To safeguard flock health, keep litter bedding completely dry by changing wood shavings regularly. Adding extra organic vitamins to fresh water boosts immunity. Ensure feed is stored in airtight containers off the ground to avoid moisture absorption, which breeds toxic aflatoxins.',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80',
    date: 'July 05, 2026',
    author: 'Musa Ibrahim (Head Poultry Vet)',
    readTime: '5 min read'
  }
];
