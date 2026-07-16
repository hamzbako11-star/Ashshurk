import React, { useState, useMemo } from 'react';
import { 
  Search, Star, Heart, Flame, SlidersHorizontal, ArrowUpDown, 
  Sparkles, Grid, List, CheckCircle, RefreshCw, X
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../data';

interface ShopViewProps {
  setView: (view: string) => void;
  setSelectedProduct: (p: Product) => void;
  addToCart: (p: Product, qty: number) => void;
  toggleWishlist: (p: Product) => void;
  wishlist: Product[];
  category: string;
  setCategory: (cat: string) => void;
  initialSearchQuery?: string;
}

export default function ShopView({
  setView,
  setSelectedProduct,
  addToCart,
  toggleWishlist,
  wishlist,
  category,
  setCategory,
  initialSearchQuery = ''
}: ShopViewProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'popularity'>('popularity');
  const [priceRange, setPriceRange] = useState<number>(20000); // Max budget limit NGN 20,000
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const isProductInWishlist = (p: Product) => wishlist.some(item => item.id === p.id);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('details');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategory('all');
    setOrganicOnly(false);
    setInStockOnly(false);
    setPriceRange(20000);
  };

  // Filtered & Sorted products computation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (category !== 'all' && p.category !== category) return false;
      
      // Search text filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // Organic filter
      if (organicOnly && !p.organic) return false;

      // In Stock filter
      if (inStockOnly && p.stockStatus !== 'in_stock') return false;

      // Price limit filter
      const currentPrice = p.discountPrice || p.price;
      if (currentPrice > priceRange) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // default popularity
    });
  }, [category, searchQuery, organicOnly, inStockOnly, sortBy, priceRange]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      {/* Title & Stats */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5 dark:border-slate-800">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Marketplace Catalog
          </h2>
          <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">
            Showing <span className="font-bold text-brand-green-600">{filteredProducts.length}</span> premium farm products
          </p>
        </div>

        {/* Toolbar controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Sort selector */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-semibold flex items-center">
              <ArrowUpDown className="h-3.5 w-3.5 mr-1" /> Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 font-semibold text-slate-700 focus:border-brand-green-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            >
              <option value="popularity">Most Popular 🔥</option>
              <option value="rating">Top Rated ⭐</option>
              <option value="price-asc">Price: Low to High ₦</option>
              <option value="price-desc">Price: High to Low ₦</option>
            </select>
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center space-x-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition lg:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <SlidersHorizontal className="h-4 w-4 text-brand-green-500" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* 1. FILTER SIDEBAR (DESKTOP) */}
        <aside className="hidden lg:block space-y-6">
          {/* Search field */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Search Produce</h4>
            <div className="relative">
              <input
                type="text"
                placeholder="Type keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-3.5 pr-10 text-xs focus:border-brand-green-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Categories select */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Filter by Category</h4>
            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex w-full items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition text-left ${
                    category === cat.id
                      ? 'bg-brand-green-50 text-brand-green-700 dark:bg-brand-green-950/20 dark:text-brand-green-400'
                      : 'hover:bg-slate-50 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-850'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  {category === cat.id && <CheckCircle className="h-3.5 w-3.5 text-brand-green-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Specifications (Organic / Stock) */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Farming Standard</h4>
              <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={organicOnly}
                  onChange={(e) => setOrganicOnly(e.target.checked)}
                  className="rounded text-brand-green-600 focus:ring-brand-green-500 h-4 w-4"
                />
                <span>🥬 Organic Only</span>
              </label>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Availability</h4>
              <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-brand-green-600 focus:ring-brand-green-500 h-4 w-4"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Max Budget</h4>
              <span className="text-xs font-bold text-brand-green-700 dark:text-brand-green-400">₦{priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="20000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-brand-green-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold">
              <span>₦500</span>
              <span>₦20,000+</span>
            </div>
          </div>

          {/* Reset Filters button */}
          <button
            onClick={handleResetFilters}
            className="flex w-full items-center justify-center space-x-1.5 rounded-xl border border-slate-200/60 bg-slate-50 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </button>
        </aside>

        {/* 2. MOBILE FILTER DRAWER */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-40 flex lg:hidden bg-black/50 backdrop-blur-sm p-4 items-end">
            <div className="w-full rounded-t-3xl bg-white p-6 space-y-5 dark:bg-slate-950 animate-slide-up max-h-[90%] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-slate-800">
                <h3 className="font-display text-sm font-bold">Filter Produce</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              {/* Search */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400">Search</h4>
                <input
                  type="text"
                  placeholder="Produce name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 px-3 text-xs dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400">Category</h4>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 px-3 text-xs dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Toggles */}
              <div className="flex justify-between gap-4">
                <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={organicOnly}
                    onChange={(e) => setOrganicOnly(e.target.checked)}
                    className="rounded text-brand-green-600 focus:ring-brand-green-500 h-4 w-4"
                  />
                  <span>🥬 Organic</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-brand-green-600 focus:ring-brand-green-500 h-4 w-4"
                  />
                  <span>In Stock</span>
                </label>
              </div>

              {/* Budget */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-400">Max Budget</span>
                  <span className="font-bold text-brand-green-600">₦{priceRange.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-brand-green-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleResetFilters}
                  className="rounded-xl border border-gray-100 py-2.5 text-center text-xs font-bold text-slate-500 dark:border-slate-850"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="rounded-xl bg-brand-green-600 py-2.5 text-center text-xs font-bold text-white"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. PRODUCT GRID */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 rounded-2xl bg-white border border-gray-100 p-8 dark:bg-slate-900 dark:border-slate-800">
              <span className="text-4xl block mb-4">🌾</span>
              <h3 className="font-display text-base font-bold text-slate-800 dark:text-white">
                No Produce Matches Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                We couldn't locate any products with your current filters. Try relaxing your budget slider or switching categories.
              </p>
              <button
                onClick={handleResetFilters}
                className="rounded-full bg-brand-green-600 hover:bg-brand-green-700 px-6 py-2 text-xs font-bold text-white transition mt-4 inline-block"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {filteredProducts.map((p) => (
                <div 
                  key={p.id}
                  className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:border-brand-green-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 overflow-hidden"
                >
                  {/* Wishlist Button overlay */}
                  <button
                    onClick={() => toggleWishlist(p)}
                    className={`absolute right-3 top-3 z-10 rounded-full p-2 shadow-sm transition hover:scale-110 ${isProductInWishlist(p) ? 'bg-red-50 text-red-500 dark:bg-red-950/30' : 'bg-white/80 text-slate-500 hover:bg-white'}`}
                  >
                    <Heart className={`h-4.5 w-4.5 ${isProductInWishlist(p) ? 'fill-current' : ''}`} />
                  </button>

                  {/* Thumbnail */}
                  <div 
                    onClick={() => handleProductClick(p)}
                    className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 cursor-pointer overflow-hidden"
                  >
                    <img 
                      src={p.image} 
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {p.discountPrice && (
                      <span className="absolute left-3 top-3 rounded-full bg-brand-gold px-2 py-0.5 text-[9px] font-bold text-white tracking-wider flex items-center space-x-0.5">
                        <Flame className="h-2.5 w-2.5" />
                        <span>SAVE ₦{(p.price - p.discountPrice).toLocaleString()}</span>
                      </span>
                    )}
                    {p.organic && (
                      <span className="absolute left-3 bottom-3 rounded-md bg-brand-green-600/90 px-2 py-0.5 text-[9px] font-bold text-white tracking-wider">
                        🥬 ORGANIC
                      </span>
                    )}
                    {p.stockStatus === 'low_stock' && (
                      <span className="absolute right-3 bottom-3 rounded-md bg-amber-500 px-2 py-0.5 text-[9px] font-bold text-white tracking-wider">
                        ⚠️ FEW BIRDS/ITEMS LEFT
                      </span>
                    )}
                    {p.stockStatus === 'out_of_stock' && (
                      <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                        <span className="rounded-lg bg-red-600 px-3 py-1 text-xs font-bold text-white tracking-wider">
                          SOLD OUT
                        </span>
                      </div>
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
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{p.rating}</span>
                        <span className="text-[10px] text-slate-400">({p.reviewsCount})</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800/60">
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
                        disabled={p.stockStatus === 'out_of_stock'}
                        className="rounded-lg bg-brand-green-100 hover:bg-brand-green-600 text-brand-green-700 hover:text-white px-3 py-1.5 text-xs font-bold transition duration-200 disabled:opacity-30 disabled:hover:bg-brand-green-100 disabled:hover:text-brand-green-700 flex items-center space-x-1"
                      >
                        <span>Add +</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
