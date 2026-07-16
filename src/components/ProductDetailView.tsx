import React, { useState } from 'react';
import { 
  Star, Heart, ShieldCheck, Truck, Plus, Minus, ArrowLeft, 
  Sparkles, CheckCircle2, ChevronRight, HelpCircle, MessageSquare
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ProductDetailViewProps {
  product: Product;
  setView: (view: string) => void;
  addToCart: (p: Product, qty: number) => void;
  toggleWishlist: (p: Product) => void;
  wishlist: Product[];
  setSelectedProduct: (p: Product) => void;
}

export default function ProductDetailView({
  product,
  setView,
  addToCart,
  toggleWishlist,
  wishlist,
  setSelectedProduct
}: ProductDetailViewProps) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryChecked, setDeliveryChecked] = useState(false);

  // Bundle states
  const [bundleChecked1, setBundleChecked1] = useState(true);
  const [bundleChecked2, setBundleChecked2] = useState(true);

  const isProductInWishlist = wishlist.some(item => item.id === product.id);

  // Frequently bought together (find 2 related products from the same category or others)
  const bundleProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 2);
  const bundleProduct1 = bundleProducts[0];
  const bundleProduct2 = bundleProducts[1];

  const currentPrice = product.discountPrice || product.price;

  const totalBundlePrice = currentPrice + 
    (bundleChecked1 ? (bundleProduct1?.discountPrice || bundleProduct1?.price || 0) : 0) + 
    (bundleChecked2 ? (bundleProduct2?.discountPrice || bundleProduct2?.price || 0) : 0);

  const handleAddBundleToCart = () => {
    // Add current
    addToCart(product, quantity);
    // Add bundle items
    if (bundleChecked1 && bundleProduct1) addToCart(bundleProduct1, 1);
    if (bundleChecked2 && bundleProduct2) addToCart(bundleProduct2, 1);
    setView('cart');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setView('checkout');
  };

  const handleRelatedProductClick = (related: Product) => {
    setSelectedProduct(related);
    setActiveImage(related.image);
    setQuantity(1);
    setActiveTab('desc');
    setDeliveryChecked(false);
  };

  // Mock comments
  const mockComments = [
    { name: 'Kinsley Audu', rating: 5, date: 'July 15, 2026', comment: 'Absolutely the best quality. The processed bird was fresh, perfectly defeathered, and smelled exceptionally clean. Highly recommended!' },
    { name: 'Halima Yusuf', rating: 4, date: 'July 10, 2026', comment: 'Excellent and crisp packaging. Delivered in insulated boxes. Will order again!' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      {/* Back Button */}
      <button 
        onClick={() => setView('shop')}
        className="mb-6 flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-brand-green-600 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Shop Marketplace</span>
      </button>

      {/* Main Grid */}
      <div className="grid gap-10 lg:grid-cols-2">
        
        {/* 1. GALLERY COL */}
        <div className="space-y-4">
          <div className="h-[420px] w-full rounded-2xl bg-white border border-gray-100 overflow-hidden dark:border-slate-800 dark:bg-slate-900">
            <img 
              src={activeImage} 
              alt={product.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition"
            />
          </div>

          {/* Thumbnail track */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`h-18 w-20 rounded-xl overflow-hidden border bg-white transition ${activeImage === img ? 'border-brand-green-500 ring-2 ring-brand-green-100 dark:ring-brand-green-950/25' : 'border-gray-200 hover:border-brand-green-300'}`}
                >
                  <img 
                    src={img} 
                    alt="thumbnail" 
                    className="h-full w-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. SPECIFICATION & CONTROL COL */}
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-full bg-brand-green-50 text-brand-green-700 px-3 py-1 text-[10px] font-bold uppercase tracking-wider dark:bg-brand-green-950/20 dark:text-brand-green-400">
                🌱 {product.category.replace('-', ' ')}
              </span>
              {product.organic && (
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  🥬 Certified Organic
                </span>
              )}
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h2>

            {/* Ratings & reviews */}
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'}`} />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{product.rating}</span>
              <span className="text-[10px] text-slate-400">|</span>
              <span className="text-[10px] text-slate-400 font-semibold">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="rounded-2xl bg-brand-green-50/40 p-5 border border-brand-green-100/50 dark:bg-slate-900 dark:border-slate-800/80">
            <div className="flex items-baseline space-x-2">
              {product.discountPrice ? (
                <>
                  <span className="text-3xl font-extrabold text-brand-green-600 dark:text-brand-green-400">
                    ₦{product.discountPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ₦{product.price.toLocaleString()}
                  </span>
                  <span className="rounded-md bg-brand-gold px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                    SAVE ₦{(product.price - product.discountPrice).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
                  ₦{product.price.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-1 dark:text-slate-400">Quantity Unit: 1 {product.unit}</p>

            {/* Stock details */}
            <div className="mt-3 flex items-center space-x-2 text-xs">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${product.stockStatus === 'in_stock' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                {product.stockStatus === 'in_stock' ? 'In Stock (Fresh Daily)' : 'Low Stock (Few birds left)'}
              </span>
            </div>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center space-x-1 border border-gray-200 rounded-xl bg-gray-50 p-1 dark:border-slate-800 dark:bg-slate-950">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="rounded-lg p-2 hover:bg-white dark:hover:bg-slate-900 transition"
              >
                <Minus className="h-4 w-4 text-slate-500" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-slate-800 dark:text-slate-200">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-lg p-2 hover:bg-white dark:hover:bg-slate-900 transition"
              >
                <Plus className="h-4 w-4 text-slate-500" />
              </button>
            </div>

            <button
              onClick={() => { addToCart(product, quantity); setView('cart'); }}
              className="flex-1 min-w-[160px] rounded-xl bg-brand-green-600 hover:bg-brand-green-700 px-6 py-3.5 text-xs font-bold text-white shadow-md shadow-brand-green-600/10 transition duration-200 text-center"
            >
              Add to Shopping Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="rounded-xl bg-brand-gold hover:bg-amber-600 text-white px-6 py-3.5 text-xs font-bold shadow-md shadow-amber-500/10 transition duration-200 text-center"
            >
              Buy Now Express
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`rounded-xl border border-gray-200 p-3.5 hover:bg-gray-50 transition dark:border-slate-800 dark:hover:bg-slate-900 ${isProductInWishlist ? 'text-red-500 bg-red-50/40 border-red-100 dark:bg-red-950/10' : 'text-slate-500'}`}
              aria-label="Wishlist"
            >
              <Heart className={`h-5 w-5 ${isProductInWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Delivery estimate tool */}
          <div className="rounded-xl border border-slate-100 p-4 bg-white dark:border-slate-800 dark:bg-slate-900 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Truck className="h-4 w-4 mr-1 text-brand-green-600" /> Delivery Estimate
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter delivery address (e.g. Garki, Abuja)"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 py-1.5 px-3 text-xs outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
              <button
                onClick={() => setDeliveryChecked(true)}
                className="rounded-lg bg-slate-800 text-white px-3 py-1.5 text-xs font-bold hover:bg-slate-900 transition"
              >
                Check
              </button>
            </div>
            {deliveryChecked && deliveryAddress.trim() && (
              <p className="text-[10px] text-emerald-600 font-bold flex items-center">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                <span>Standard Express Delivery available in 3-5 Hours for {deliveryAddress}!</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 3. TABS DESCRIPTION / SPECS / REVIEWS */}
      <div className="mt-16 border-t border-gray-100 pt-10 dark:border-slate-800">
        <div className="flex space-x-6 border-b border-gray-100 pb-3 dark:border-slate-850">
          <button
            onClick={() => setActiveTab('desc')}
            className={`text-sm font-bold pb-2 transition relative ${activeTab === 'desc' ? 'text-brand-green-600 dark:text-brand-green-400' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Product Description
            {activeTab === 'desc' && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-green-500" />}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`text-sm font-bold pb-2 transition relative ${activeTab === 'specs' ? 'text-brand-green-600 dark:text-brand-green-400' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Farming Specifications
            {activeTab === 'specs' && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-green-500" />}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-sm font-bold pb-2 transition relative ${activeTab === 'reviews' ? 'text-brand-green-600 dark:text-brand-green-400' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Ratings & Feedback ({product.reviewsCount})
            {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-green-500" />}
          </button>
        </div>

        <div className="mt-6 text-xs text-slate-600 leading-relaxed dark:text-slate-300 max-w-4xl">
          {activeTab === 'desc' && (
            <div className="space-y-4">
              <p className="font-sans text-sm">{product.description}</p>
              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-brand-green-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-100">Primal Farm-to-Table</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">Sourced from vetted pastures within hours of slaughter or harvest to retain pristine nutrients.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-brand-green-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-100">Veterinary Approved</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">Weekly biological testing of water and organic fodder to guarantee disease-free stock.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="border border-gray-100 rounded-2xl overflow-hidden dark:border-slate-850">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <tr 
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-900/40' : 'bg-white dark:bg-slate-950'}
                    >
                      <td className="px-4 py-3 font-semibold text-slate-500 dark:text-slate-400 w-1/3 border-b border-gray-50 dark:border-slate-850">{key}</td>
                      <td className="px-4 py-3 text-slate-800 dark:text-slate-100 font-bold border-b border-gray-50 dark:border-slate-850">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {mockComments.map((comment, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-5 dark:border-slate-850 last:border-none">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h5 className="font-bold text-slate-800 dark:text-slate-100">{comment.name}</h5>
                      <span className="text-[10px] text-slate-400">{comment.date}</span>
                    </div>
                    <div className="flex text-brand-gold">
                      {[...Array(comment.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 italic">"{comment.comment}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. FREQUENTLY BOUGHT TOGETHER BUNDLE */}
      {bundleProduct1 && bundleProduct2 && (
        <div className="mt-16 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-display text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center">
            <Sparkles className="h-4 w-4 mr-1.5 text-brand-gold" /> Frequently Bought Together (Bundle Deal)
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Visual Bundle connection */}
            <div className="flex flex-wrap items-center gap-4 text-slate-400">
              {/* Main */}
              <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl dark:bg-slate-950">
                <img 
                  src={product.image} 
                  className="h-12 w-12 rounded-lg object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-[11px] font-bold text-slate-800 dark:text-white truncate max-w-[120px]">{product.name}</h4>
                  <p className="text-[10px] text-brand-green-600 font-bold">₦{currentPrice.toLocaleString()}</p>
                </div>
              </div>

              <span className="font-bold text-lg">+</span>

              {/* Related 1 */}
              <label className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl cursor-pointer dark:bg-slate-950">
                <input
                  type="checkbox"
                  checked={bundleChecked1}
                  onChange={(e) => setBundleChecked1(e.target.checked)}
                  className="rounded text-brand-green-600 focus:ring-brand-green-500 h-4 w-4"
                />
                <img 
                  src={bundleProduct1.image} 
                  className="h-12 w-12 rounded-lg object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-[11px] font-bold text-slate-800 dark:text-white truncate max-w-[120px]">{bundleProduct1.name}</h4>
                  <p className="text-[10px] text-brand-green-600 font-bold">₦{(bundleProduct1.discountPrice || bundleProduct1.price).toLocaleString()}</p>
                </div>
              </label>

              <span className="font-bold text-lg">+</span>

              {/* Related 2 */}
              <label className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl cursor-pointer dark:bg-slate-950">
                <input
                  type="checkbox"
                  checked={bundleChecked2}
                  onChange={(e) => setBundleChecked2(e.target.checked)}
                  className="rounded text-brand-green-600 focus:ring-brand-green-500 h-4 w-4"
                />
                <img 
                  src={bundleProduct2.image} 
                  className="h-12 w-12 rounded-lg object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-[11px] font-bold text-slate-800 dark:text-white truncate max-w-[120px]">{bundleProduct2.name}</h4>
                  <p className="text-[10px] text-brand-green-600 font-bold">₦{(bundleProduct2.discountPrice || bundleProduct2.price).toLocaleString()}</p>
                </div>
              </label>
            </div>

            {/* Price block */}
            <div className="text-center md:text-right space-y-2 shrink-0">
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Bundle Offer Total</span>
              <span className="text-xl font-extrabold text-slate-800 dark:text-white">₦{totalBundlePrice.toLocaleString()}</span>
              <button
                onClick={handleAddBundleToCart}
                className="block w-full md:w-auto rounded-xl bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 text-xs font-bold transition duration-200"
              >
                Add All 3 Items to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. RELATED PRODUCTS GRID */}
      <div className="mt-16">
        <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white mb-6">
          More Fresh Items You May Like
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((rp) => (
            <div 
              key={rp.id}
              onClick={() => handleRelatedProductClick(rp)}
              className="group border border-gray-100 bg-white rounded-xl overflow-hidden p-3 shadow-sm hover:border-brand-green-200 hover:shadow-md transition cursor-pointer dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="h-36 w-full rounded-lg overflow-hidden bg-slate-50">
                <img 
                  src={rp.image} 
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-300" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="font-display text-xs font-bold text-slate-800 mt-3 dark:text-white truncate group-hover:text-brand-green-600 transition">
                {rp.name}
              </h4>
              <p className="text-[10px] font-bold text-brand-green-600 mt-1">₦{(rp.discountPrice || rp.price).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
