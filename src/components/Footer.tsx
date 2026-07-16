import React, { useState } from 'react';
import { 
  Sprout, Phone, Mail, MapPin, Clock, Facebook, 
  Twitter, Instagram, ArrowRight, ShieldCheck, CreditCard
} from 'lucide-react';

interface FooterProps {
  setView: (view: string) => void;
  setCategory: (cat: string) => void;
}

export default function Footer({ setView, setCategory }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleCategoryClick = (catId: string) => {
    setCategory(catId);
    setView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewClick = (viewId: string) => {
    setView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 pt-16 pb-8 text-slate-300 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Newsletter banner section */}
        <div className="mb-16 grid gap-8 rounded-3xl bg-brand-green-700 p-8 md:p-12 lg:grid-cols-2 items-center text-white shadow-xl">
          <div>
            <h3 className="font-display text-2xl font-bold md:text-3xl">Join the Ashshuruk Harvest</h3>
            <p className="mt-2 text-sm text-brand-green-100 max-w-md">
              Subscribe to our newsletter for exclusive discounts, organic farming insights, recipes, and weekly fresh arrival reports.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm placeholder-white/60 outline-none border border-white/20 focus:border-white focus:bg-white/20 transition text-white"
            />
            <button
              type="submit"
              className="rounded-xl bg-white px-6 py-3 text-xs font-bold text-brand-green-700 hover:bg-brand-gold-light hover:text-brand-gold transition duration-200 flex items-center justify-center space-x-1"
            >
              <span>{subscribed ? 'Subscribed! 🎉' : 'Subscribe Now'}</span>
              {!subscribed && <ArrowRight className="h-3.5 w-3.5" />}
            </button>
          </form>
        </div>

        {/* Main Links Grid */}
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green-600 text-white">
                <Sprout className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold text-white tracking-tight">
                Ashshuruk<span className="text-brand-green-500">.</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Ashshuruk Ventures is a premier agriculture marketplace connecting verified eco-conscious farms and suppliers directly to businesses and households. We guarantee 100% organic, sanitary, and pristine fresh deliveries.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-brand-green-500 shrink-0" />
                <span>Plot 24, Agro-Industrial Estate, Abuja, Nigeria</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brand-green-500 shrink-0" />
                <span>+234 (0) 812 345 6789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brand-green-500 shrink-0" />
                <span>support@ashshuruk.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-brand-green-500 shrink-0" />
                <span>Mon - Sat: 07:00 AM - 07:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Categories Col */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Premium Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleCategoryClick('live-chicken')} className="hover:text-brand-green-500 transition">
                  🐔 Live Chicken
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('processed-chicken')} className="hover:text-brand-green-500 transition">
                  🍗 Processed Chicken
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('fresh-eggs')} className="hover:text-brand-green-500 transition">
                  🥚 Fresh Eggs
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('fresh-fish')} className="hover:text-brand-green-500 transition">
                  🐟 Fresh Fish
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('vegetables')} className="hover:text-brand-green-500 transition">
                  🥬 Vegetables & Tomatoes
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('animal-feed')} className="hover:text-brand-green-500 transition">
                  🌾 Grains & Animal Feed
                </button>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Explore More
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleViewClick('home')} className="hover:text-brand-green-500 transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('shop')} className="hover:text-brand-green-500 transition">
                  Shop Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('about')} className="hover:text-brand-green-500 transition">
                  About Our Farms
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('services')} className="hover:text-brand-green-500 transition">
                  Services & Bulk Supply
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('blog')} className="hover:text-brand-green-500 transition">
                  Agricultural Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('faq')} className="hover:text-brand-green-500 transition">
                  FAQ Help Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Policies */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Customer Policies
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleViewClick('privacy')} className="hover:text-brand-green-500 transition">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('terms')} className="hover:text-brand-green-500 transition">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('refund')} className="hover:text-brand-green-500 transition">
                  Refund & Return Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('shipping')} className="hover:text-brand-green-500 transition">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => handleViewClick('contact')} className="hover:text-brand-green-500 transition">
                  Customer Support Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and safety checks */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-xs text-slate-500 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="h-4 w-4 text-brand-green-500" />
            <span>© 2026 Ashshuruk Ventures. All Rights Reserved. Abuja Agricultural Council Registered.</span>
          </div>
          
          {/* Payment Badges */}
          <div className="flex items-center space-x-4">
            <span className="text-[10px] uppercase font-bold tracking-wider">Supported secure channels:</span>
            <div className="flex items-center space-x-2 text-slate-400">
              <CreditCard className="h-4 w-4" />
              <span className="font-mono text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">CARDS</span>
              <span className="font-mono text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">BANK TRANSFER</span>
              <span className="font-mono text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">COD</span>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-3.5">
              <a href="#" className="hover:text-brand-green-500"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="hover:text-brand-green-500"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="hover:text-brand-green-500"><Twitter className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
