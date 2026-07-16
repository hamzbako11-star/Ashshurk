import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Truck, Award, ShoppingBag, 
  Clock, Sprout, Star, Heart, Flame, Sparkles, UserCheck, Play, ArrowLeft, RefreshCw
} from 'lucide-react';
import { Product, Testimonial } from '../types';
import { PRODUCTS, TESTIMONIALS, CATEGORIES } from '../data';

interface HomeViewProps {
  setView: (view: string) => void;
  setSelectedProduct: (p: Product) => void;
  addToCart: (p: Product, qty: number) => void;
  toggleWishlist: (p: Product) => void;
  wishlist: Product[];
  setCategory: (cat: string) => void;
}

export default function HomeView({
  setView,
  setSelectedProduct,
  addToCart,
  toggleWishlist,
  wishlist,
  setCategory
}: HomeViewProps) {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const heroSlides = [
    {
      image: '/src/assets/images/hero_agricultural_produce_1784235084447.jpg',
      title: 'Premium Quality Poultry & Fresh Farm Produce',
      subtitle: 'Delivered directly to your doorstep. Healthy broiler birds, farm golden eggs, fresh cow milk, and crisp vegetables harvested daily under strict sanitary guidelines.',
      badge: '🐔 100% ORGANIC & SANITARY'
    },
    {
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
      title: 'Fresh Vegetables & Sweet Fruits Harvested Daily',
      subtitle: 'Plateau sweet carrots, red habaneros, greenhouse-grown Roma tomatoes, and hydrating striped watermelon. Taste real agricultural freshness.',
      badge: '🥬 GREENHOUSE CERTIFIED'
    },
    {
      image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=1200&q=80',
      title: 'Healthy Aquaculture & Hardwood-Smoked Seafood',
      subtitle: 'Harvested live African catfish, Concrete pond farmed with zero muddy taste. Available live or pre-cleaned & smoked with authentic hardwood timber.',
      badge: '🐟 SPRING-FED AQUACULTURE'
    }
  ];

  const featuredProducts = PRODUCTS.slice(0, 4);
  const bestSellers = PRODUCTS.filter(p => p.rating >= 4.8).slice(0, 4);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('details');
  };

  const handleCategoryClick = (catId: string) => {
    setCategory(catId);
    setView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isProductInWishlist = (p: Product) => wishlist.some(item => item.id === p.id);

  return (
    <div className="w-full">
      {/* 1. HERO BANNER SECTION */}
      <section className="relative w-full h-[580px] overflow-hidden bg-slate-900 text-white">
        {/* Slide background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out opacity-40 scale-105"
          style={{ backgroundImage: `url(${heroSlides[activeHeroIndex].image})` }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl h-full px-4 sm:px-8 flex flex-col justify-center">
          <div className="max-w-2xl space-y-5 animate-fade-in">
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-brand-green-600/30 px-3.5 py-1 text-xs font-bold text-emerald-400 border border-brand-green-500/20">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
              <span>{heroSlides[activeHeroIndex].badge}</span>
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-none text-white">
              {heroSlides[activeHeroIndex].title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {heroSlides[activeHeroIndex].subtitle}
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={() => handleCategoryClick('all')}
                className="rounded-full bg-brand-green-600 hover:bg-brand-green-700 px-7 py-3 text-xs font-bold text-white shadow-lg shadow-brand-green-600/20 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center space-x-1"
              >
                <span>Shop Fresh Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleCategoryClick('live-chicken')}
                className="rounded-full bg-slate-800/80 hover:bg-slate-800 px-6 py-3 text-xs font-bold text-slate-100 border border-slate-700 hover:text-white transition"
              >
                Browse Live Birds
              </button>
              <button 
                onClick={() => setView('dashboard')}
                className="rounded-full bg-transparent hover:bg-white/5 px-6 py-3 text-xs font-bold text-brand-gold hover:text-white transition border border-brand-gold/30"
              >
                Become a Partner Supplier
              </button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-4 sm:left-8 flex space-x-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveHeroIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeHeroIndex === idx ? 'w-8 bg-brand-green-500' : 'w-2.5 bg-white/40'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC BENTO CATEGORIES GRID */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green-600 font-bold">
            Organic Abundance
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-slate-900 dark:text-white">
            Explore Popular Farm Categories
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
            Select an agricultural category below to browse premium-grade harvests supplied by certified local partner farms.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.slice(1, 13).map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-brand-green-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 text-center cursor-pointer overflow-hidden"
            >
              {/* background zoom blur effect */}
              <div className="absolute inset-0 bg-brand-green-50 opacity-0 group-hover:opacity-100 transition duration-300 dark:bg-brand-green-950/10" />
              
              <div className="relative text-3xl mb-3 transform group-hover:scale-110 transition duration-300">
                {cat.icon}
              </div>
              <h4 className="relative text-xs font-bold text-slate-800 group-hover:text-brand-green-700 dark:text-slate-200 dark:group-hover:text-brand-green-400 transition">
                {cat.name.replace(/^[^\s]+\s/, '')}
              </h4>
              <p className="relative text-[10px] text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition duration-300">
                Browse Items →
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 3. CORE VALUE PROPOSITION */}
      <section className="bg-brand-green-50/50 dark:bg-slate-950 py-16 border-y border-gray-100 dark:border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex space-x-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/40 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-600 dark:bg-brand-green-800 dark:text-white shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-slate-800 dark:text-white">100% Fresh Products</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Direct farm-to-table delivery within hours of early morning harvest.</p>
            </div>
          </div>
          
          <div className="flex space-x-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/40 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-600 dark:bg-brand-green-800 dark:text-white shrink-0">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-slate-800 dark:text-white">Same-Day Dispatch</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Place orders before 10 AM to secure same-day temperature-regulated logistics.</p>
            </div>
          </div>

          <div className="flex space-x-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/40 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-600 dark:bg-brand-green-800 dark:text-white shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-slate-800 dark:text-white">Cash on Delivery</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Supported Cash/Transfer-on-Delivery options upon visual crop satisfaction.</p>
            </div>
          </div>

          <div className="flex space-x-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/40 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-600 dark:bg-brand-green-800 dark:text-white shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-slate-800 dark:text-white">Trusted Farmers</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Strict health audits for all partner coops and organic soil suppliers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (GRID) */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold">
              🔥 Hot Arrivals
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-slate-900 dark:text-white">
              Featured Farm Harvests
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Top-rated fresh items selected directly from our main poultry pens and vegetable greenhouses today.
            </p>
          </div>
          <button 
            onClick={() => handleCategoryClick('all')}
            className="mt-4 md:mt-0 text-xs font-bold text-brand-green-600 hover:text-brand-green-700 flex items-center space-x-1 group dark:text-brand-green-400"
          >
            <span>View Full Marketplace</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition duration-200" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((p) => (
            <div 
              key={p.id}
              className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:border-brand-green-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 overflow-hidden"
            >
              {/* Wishlist overlay button */}
              <button
                onClick={() => toggleWishlist(p)}
                className={`absolute right-3.5 top-3.5 z-10 rounded-full p-2 shadow-sm transition hover:scale-110 ${isProductInWishlist(p) ? 'bg-red-50 text-red-500 dark:bg-red-950/30' : 'bg-white/80 text-slate-500 hover:bg-white'}`}
                aria-label="Add to wishlist"
              >
                <Heart className={`h-4.5 w-4.5 ${isProductInWishlist(p) ? 'fill-current' : ''}`} />
              </button>

              {/* Product Image */}
              <div 
                onClick={() => handleProductClick(p)}
                className="relative h-48 w-full overflow-hidden bg-slate-50 dark:bg-slate-800 cursor-pointer"
              >
                <img 
                  src={p.image} 
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.discountPrice && (
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-brand-gold px-2.5 py-0.5 text-[9px] font-bold text-white tracking-wider flex items-center space-x-0.5">
                    <Flame className="h-3 w-3" />
                    <span>SAVE ₦{(p.price - p.discountPrice).toLocaleString()}</span>
                  </span>
                )}
                {p.organic && (
                  <span className="absolute left-3.5 bottom-3.5 rounded-md bg-brand-green-600/90 px-2 py-0.5 text-[9px] font-bold text-white tracking-wider">
                    🥬 ORGANIC
                  </span>
                )}
              </div>

              {/* Info body */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div onClick={() => handleProductClick(p)} className="cursor-pointer">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {p.category.replace('-', ' ')}
                  </span>
                  <h4 className="font-display text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-brand-green-600 transition truncate mt-1">
                    {p.name}
                  </h4>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mt-1.5">
                    <Star className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{p.rating}</span>
                    <span className="text-[10px] text-slate-400">({p.reviewsCount} reviews)</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    {p.discountPrice ? (
                      <div className="flex items-baseline space-x-1">
                        <span className="text-sm font-bold text-brand-green-600 dark:text-brand-green-400">
                          ₦{p.discountPrice.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through">
                          ₦{p.price.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        ₦{p.price.toLocaleString()}
                      </span>
                    )}
                    <p className="text-[9px] text-slate-400">per {p.unit}</p>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(p, 1);
                    }}
                    className="rounded-lg bg-brand-green-100 hover:bg-brand-green-600 text-brand-green-700 hover:text-white px-3 py-1.5 text-xs font-bold transition duration-200 flex items-center space-x-1"
                  >
                    <span>Add +</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FLASH DEALS BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-brand-charcoal text-white p-8 md:p-12 shadow-xl border border-slate-800">
          {/* background design elements */}
          <div className="absolute right-0 top-0 h-full w-1/3 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80')` }} />
          <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-brand-green-600/10 blur-3xl" />

          <div className="relative max-w-lg space-y-4">
            <span className="inline-flex items-center space-x-1 rounded-full bg-brand-gold/20 px-3 py-0.5 text-xs font-bold text-amber-400 border border-brand-gold/30">
              <Flame className="h-3.5 w-3.5 animate-pulse" />
              <span>LIMITED QUANTITY DEALS</span>
            </span>
            <h3 className="font-display text-3xl font-bold tracking-tight">Today's Hot Farm Specials</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Order our freshly parboiled Local Stone-Free Brown Rice (5kg Bag) and get premium, giant Double-Yolk Eggs at absolute clearance prices. Only while stocks last!
            </p>
            <div className="flex items-center space-x-6 pt-2">
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest">Tomatoes Basket</span>
                <span className="text-xl font-bold text-brand-gold">₦7,500 <span className="text-xs line-through text-slate-400">₦8,500</span></span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest">Golden Eggs Crate</span>
                <span className="text-xl font-bold text-brand-gold">₦3,400 <span className="text-xs line-through text-slate-400">₦3,800</span></span>
              </div>
            </div>
            <button 
              onClick={() => handleCategoryClick('all')}
              className="rounded-xl bg-brand-green-600 hover:bg-brand-green-700 px-6 py-2.5 text-xs font-bold text-white transition duration-200 mt-2 flex items-center space-x-1"
            >
              <span>Explore Active Deals</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US (Bento / Feature section) */}
      <section className="bg-white dark:bg-slate-900 py-16 border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green-600 font-bold">
              The Ashshuruk Standard
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-slate-900 dark:text-white">
              Why Chefs & Households Trust Us
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Connecting you directly to vetted agriculture cooperatives ensuring complete veterinary control, certified sanitization, and speedy delivery.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-white font-bold text-lg">
                🌱
              </div>
              <h4 className="font-display text-sm font-semibold text-slate-800 dark:text-white">100% Organic Feeding</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                All poultry and live animals are nourished strictly with vitamin-fortified natural grains and soy, with zero artificial growth-promoters or hormones.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-white font-bold text-lg">
                🧼
              </div>
              <h4 className="font-display text-sm font-semibold text-slate-800 dark:text-white">Rigorous Sanitary Cleaning</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our processed whole chickens and breast fillets are prepared under certified health inspection protocols, vacuum-sealed immediately to lock in nutrition.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-white font-bold text-lg">
                🚛
              </div>
              <h4 className="font-display text-sm font-semibold text-slate-800 dark:text-white">Cold-Chain Logistical Protection</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                We manage refrigerated delivery containers, ensuring fresh eggs, dairy milk, and fish never suffer heat degradation during transport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green-600 font-bold">
              Verified Reviews
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-slate-900 dark:text-white">
              Loved by Kitchens & Families
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id}
                className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 dark:bg-slate-900 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 text-brand-gold mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>
                <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-50 dark:border-slate-800">
                  <img 
                    src={t.avatar} 
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center">
                      <span>{t.name}</span>
                      {t.verified && (
                        <span className="ml-1 text-[9px] bg-brand-green-50 text-brand-green-600 px-1.5 rounded-full font-normal">
                          Verified Buyer
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PARTNER SHOWCASE SECTION */}
      <section className="py-12 mx-auto max-w-7xl px-4 sm:px-8 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supplying Farms & Cooperatives</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 dark:invert">
          <span className="font-display text-base font-extrabold text-slate-800 tracking-wider">🌾 MAIZE-CO RESILIENT</span>
          <span className="font-display text-base font-extrabold text-slate-800 tracking-wider">🥚 GOLDEN YOLK LTD</span>
          <span className="font-display text-base font-extrabold text-slate-800 tracking-wider">🐟 AGRO-CAT AQUACULTURE</span>
          <span className="font-display text-base font-extrabold text-slate-800 tracking-wider">🥬 URBAN VEG COOP</span>
        </div>
      </section>
    </div>
  );
}
