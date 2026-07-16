import React, { useState } from 'react';
import { 
  Search, ShoppingCart, Heart, User, Menu, X, Sun, Moon, 
  Globe, ChevronDown, Sprout, ShieldCheck, HelpCircle, 
  Settings, LogOut, ArrowRight, Grid, Briefcase, Phone
} from 'lucide-react';
import { CartItem, Product } from '../types';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  cart: CartItem[];
  wishlist: Product[];
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  language: string;
  setLanguage: (lang: string) => void;
  currency: 'NGN' | 'USD' | 'EUR';
  setCurrency: (curr: 'NGN' | 'USD' | 'EUR') => void;
  onSearch: (query: string) => void;
  userRole: 'customer' | 'supplier' | 'admin' | null;
  setUserRole: (role: 'customer' | 'supplier' | 'admin' | null) => void;
}

export default function Navbar({
  currentView,
  setView,
  cart,
  wishlist,
  theme,
  setTheme,
  language,
  setLanguage,
  currency,
  setCurrency,
  onSearch,
  userRole,
  setUserRole
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showCurrDropdown, setShowCurrDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setView('shop');
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية (Arabic)' },
    { code: 'ha', label: 'Hausa' },
    { code: 'yo', label: 'Yoruba' }
  ];

  const currencies = [
    { code: 'NGN', symbol: '₦', rate: 1 },
    { code: 'USD', symbol: '$', rate: 1600 },
    { code: 'EUR', symbol: '€', rate: 1750 }
  ];

  const formatCurrencyLabel = () => {
    if (currency === 'NGN') return '₦ NGN';
    if (currency === 'USD') return '$ USD';
    return '€ EUR';
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'blog', label: 'Blog' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-950/95 dark:text-white">
      {/* Top bar with quick notification & settings */}
      <div className="flex h-10 w-full items-center justify-between bg-brand-green-700 px-4 text-xs font-medium text-white sm:px-8">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <ShieldCheck className="h-4 w-4 text-brand-gold-light" />
            <span>100% Direct Farm Freshness Guaranteed</span>
          </span>
          <span className="hidden md:inline-block">|</span>
          <span className="hidden md:inline-block">Free Delivery on orders above ₦30,000</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => { setShowLangDropdown(!showLangDropdown); setShowCurrDropdown(false); setShowRoleDropdown(false); }}
              className="flex items-center space-x-1 hover:text-brand-gold-light transition"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="uppercase">{language}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-100 bg-white p-1 text-gray-800 shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:text-white">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setShowLangDropdown(false); }}
                    className={`flex w-full items-center px-3 py-1.5 text-left text-xs rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 ${language === lang.code ? 'font-semibold text-brand-green-600 dark:text-brand-green-500' : ''}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div className="relative">
            <button 
              onClick={() => { setShowCurrDropdown(!showCurrDropdown); setShowLangDropdown(false); setShowRoleDropdown(false); }}
              className="flex items-center space-x-1 hover:text-brand-gold-light transition"
            >
              <span>{formatCurrencyLabel()}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showCurrDropdown && (
              <div className="absolute right-0 mt-2 w-32 rounded-lg border border-gray-100 bg-white p-1 text-gray-800 shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:text-white">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => { setCurrency(curr.code as any); setShowCurrDropdown(false); }}
                    className={`flex w-full items-center px-3 py-1.5 text-left text-xs rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 ${currency === curr.code ? 'font-semibold text-brand-green-600 dark:text-brand-green-500' : ''}`}
                  >
                    {curr.symbol} {curr.code}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Brand Logo */}
        <button 
          onClick={() => setView('home')} 
          className="flex items-center space-x-2 text-left cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-600 shadow-sm transition group-hover:bg-brand-green-200 dark:bg-brand-green-700 dark:text-white">
            <Sprout className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-brand-charcoal dark:text-white sm:text-xl">
              Ashshuruk<span className="text-brand-green-500 font-medium">.</span>
            </h1>
            <p className="font-mono text-[9px] uppercase tracking-widest text-brand-gold">
              VENTURES
            </p>
          </div>
        </button>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setView(link.id)}
              className={`relative py-1.5 transition hover:text-brand-green-500 ${
                currentView === link.id
                  ? 'text-brand-green-600 font-semibold dark:text-brand-green-500'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {link.label}
              {currentView === link.id && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-green-500" />
              )}
            </button>
          ))}
        </nav>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex relative max-w-xs w-full mx-4">
          <input
            type="text"
            placeholder="Search farm fresh produce..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-1.5 pl-4 pr-10 text-xs transition focus:border-brand-green-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:focus:bg-slate-950"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-green-500">
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Actions (Theme, Wishlist, Cart, Dashboard Toggle) */}
        <div className="flex items-center space-x-3.5">
          {/* Theme switcher */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="rounded-full p-2 text-slate-500 hover:bg-gray-100 hover:text-brand-green-500 transition dark:text-slate-400 dark:hover:bg-slate-900"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {/* Wishlist button */}
          <button
            onClick={() => setView('wishlist')}
            className="relative rounded-full p-2 text-slate-500 hover:bg-gray-100 hover:text-brand-green-500 transition dark:text-slate-400 dark:hover:bg-slate-900"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[9px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart button */}
          <button
            onClick={() => setView('cart')}
            className="relative rounded-full p-2 text-slate-500 hover:bg-gray-100 hover:text-brand-green-500 transition dark:text-slate-400 dark:hover:bg-slate-900"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-green-600 text-[9px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Dashboard dropdown */}
          <div className="relative">
            <button
              onClick={() => { setShowRoleDropdown(!showRoleDropdown); setShowLangDropdown(false); setShowCurrDropdown(false); }}
              className={`flex items-center space-x-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-gray-50 transition dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 ${userRole ? 'bg-brand-green-50 border-brand-green-200 text-brand-green-700 dark:bg-brand-green-950/30' : ''}`}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline capitalize">
                {userRole ? `${userRole} Panel` : 'My Account'}
              </span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-100 bg-white p-1.5 text-gray-800 shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:text-white">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-gray-100 dark:border-slate-800 mb-1">
                  Access Portal Role
                </div>
                
                <button
                  onClick={() => { setUserRole('customer'); setView('dashboard'); setShowRoleDropdown(false); }}
                  className={`flex w-full items-center px-3 py-2 text-left text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 ${userRole === 'customer' ? 'bg-brand-green-50 text-brand-green-600 font-semibold dark:bg-brand-green-950/20' : ''}`}
                >
                  <Grid className="mr-2 h-3.5 w-3.5 text-brand-green-500" />
                  Customer Dashboard
                </button>
                
                <button
                  onClick={() => { setUserRole('supplier'); setView('dashboard'); setShowRoleDropdown(false); }}
                  className={`flex w-full items-center px-3 py-2 text-left text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 ${userRole === 'supplier' ? 'bg-brand-green-50 text-brand-green-600 font-semibold dark:bg-brand-green-950/20' : ''}`}
                >
                  <Briefcase className="mr-2 h-3.5 w-3.5 text-brand-green-500" />
                  Supplier Portal
                </button>

                <button
                  onClick={() => { setUserRole('admin'); setView('dashboard'); setShowRoleDropdown(false); }}
                  className={`flex w-full items-center px-3 py-2 text-left text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 ${userRole === 'admin' ? 'bg-brand-green-50 text-brand-green-600 font-semibold dark:bg-brand-green-950/20' : ''}`}
                >
                  <Settings className="mr-2 h-3.5 w-3.5 text-brand-green-500" />
                  Admin Control Panel
                </button>

                {userRole ? (
                  <button
                    onClick={() => { setUserRole(null); setView('home'); setShowRoleDropdown(false); }}
                    className="flex w-full items-center border-t border-gray-100 mt-1.5 pt-1.5 px-3 py-2 text-left text-xs text-red-500 hover:bg-red-50 dark:border-slate-800 dark:hover:bg-red-950/10 rounded-lg"
                  >
                    <LogOut className="mr-2 h-3.5 w-3.5" />
                    Logout Account
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => { setView('login'); setShowRoleDropdown(false); }}
                      className="flex w-full items-center px-3 py-2 text-left text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                      <User className="mr-2 h-3.5 w-3.5 text-brand-green-500" />
                      Sign In
                    </button>
                    <button
                      onClick={() => { setView('register'); setShowRoleDropdown(false); }}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-xs font-semibold text-brand-green-600 dark:text-brand-green-400 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                      <span>Register</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-2 text-slate-500 hover:bg-gray-100 hover:text-brand-green-500 transition lg:hidden dark:text-slate-400 dark:hover:bg-slate-900"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 px-4 py-4 space-y-4 bg-white dark:border-slate-800 dark:bg-slate-950">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search farm fresh produce..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-10 text-xs transition focus:border-brand-green-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Links */}
          <nav className="flex flex-col space-y-3 font-medium text-sm">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setView(link.id); setMobileMenuOpen(false); }}
                className={`text-left py-1.5 hover:text-brand-green-500 transition ${
                  currentView === link.id ? 'text-brand-green-600 font-bold dark:text-brand-green-500' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Action Buttons */}
          <div className="flex flex-col space-y-2 border-t border-gray-100 pt-4 dark:border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Dashboards & Account
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setUserRole('customer'); setView('dashboard'); setMobileMenuOpen(false); }}
                className="rounded-lg border border-gray-100 bg-gray-50 py-2 text-center text-xs font-semibold dark:border-slate-800 dark:bg-slate-900"
              >
                Customer DB
              </button>
              <button
                onClick={() => { setUserRole('supplier'); setView('dashboard'); setMobileMenuOpen(false); }}
                className="rounded-lg border border-gray-100 bg-gray-50 py-2 text-center text-xs font-semibold dark:border-slate-800 dark:bg-slate-900"
              >
                Supplier Portal
              </button>
              <button
                onClick={() => { setUserRole('admin'); setView('dashboard'); setMobileMenuOpen(false); }}
                className="col-span-2 rounded-lg border border-gray-100 bg-gray-50 py-2 text-center text-xs font-semibold dark:border-slate-800 dark:bg-slate-900"
              >
                Admin Control Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
