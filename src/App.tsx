import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import OrderSuccessView from './components/OrderSuccessView';
import TrackOrderView from './components/TrackOrderView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import BlogView from './components/BlogView';
import FAQView from './components/FAQView';
import ContactView from './components/ContactView';
import DashboardView from './components/DashboardView';
import PolicyViews from './components/PolicyViews';

import { Product, CartItem, Order, CustomerInfo } from './types';
import { PRODUCTS } from './data';

export default function App() {
  const [view, setView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0] || null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<string>('en');
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'EUR'>('NGN');
  const [userRole, setUserRole] = useState<'customer' | 'supplier' | 'admin' | null>('customer');

  // Load cart & wishlist from localStorage on mount
  useEffect(() => {
    const cachedCart = localStorage.getItem('ashshuruk_cart');
    const cachedWish = localStorage.getItem('ashshuruk_wishlist');
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (e) {
        console.error('Error loading cart cache:', e);
      }
    }
    if (cachedWish) {
      try {
        setWishlist(JSON.parse(cachedWish));
      } catch (e) {
        console.error('Error loading wishlist cache:', e);
      }
    }
  }, []);

  // Save cart changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('ashshuruk_cart', JSON.stringify(newCart));
  };

  // Save wishlist changes
  const saveWishlist = (newWish: Product[]) => {
    setWishlist(newWish);
    localStorage.setItem('ashshuruk_wishlist', JSON.stringify(newWish));
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      saveCart([...cart, { product, quantity }]);
    }
  };

  const updateQuantity = (productId: string, qty: number) => {
    const updated = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    saveCart(updated);
  };

  const removeFromCart = (productId: string) => {
    const updated = cart.filter((item) => item.product.id !== productId);
    saveCart(updated);
  };

  // Wishlist toggler
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      saveWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      saveWishlist([...wishlist, product]);
    }
  };

  // Place order
  const handlePlaceOrder = (
    customerInfo: CustomerInfo, 
    paymentMethod: string, 
    deliveryMethod: 'same_day' | 'next_day' | 'scheduled' | 'pickup'
  ) => {
    const subtotal = cart.reduce((sum, item) => {
      const p = item.product.discountPrice || item.product.price;
      return sum + (p * item.quantity);
    }, 0);

    const discountAmount = subtotal * (couponDiscount / 100);
    const taxableAmount = subtotal - discountAmount;
    const shippingFee = subtotal === 0 ? 0 : (subtotal > 30000 ? 0 : 1500);
    const tax = taxableAmount * 0.075;
    const grandTotal = taxableAmount + shippingFee + tax;

    // Create custom dynamic order
    const randId = Math.random().toString(36).substring(2, 10);
    const orderDetails: Order = {
      id: `ash-${randId}`,
      items: [...cart],
      customerInfo,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'pending' : 'paid',
      deliveryMethod,
      deliveryStatus: 'shipped',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      subtotal,
      tax,
      shippingFee,
      total: grandTotal,
      trackingNumber: `ASH-${Math.floor(10000 + Math.random() * 90000)}-NGA`
    };

    setActiveOrder(orderDetails);
    saveCart([]); // clear cart
    setCouponDiscount(0); // clear coupon
    setView('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Change view and scroll to top
  const handleSetView = (newView: string) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchTrigger = (query: string) => {
    setSearchQuery(query);
    setCategory('all');
    handleSetView('shop');
  };

  // Dark/Light Theme toggler
  const handleToggleTheme = (selectedTheme: 'light' | 'dark') => {
    setTheme(selectedTheme);
    if (selectedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 ${theme}`}>
      {/* GLOBAL HEADER */}
      <Navbar 
        currentView={view}
        setView={handleSetView}
        cart={cart}
        wishlist={wishlist}
        theme={theme}
        setTheme={handleToggleTheme}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        onSearch={handleSearchTrigger}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* DYNAMIC CONTENT STAGE */}
      <div className="flex-1 w-full animate-fade-in py-2">
        {view === 'home' && (
          <HomeView 
            setView={handleSetView}
            setSelectedProduct={setSelectedProduct}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            setCategory={setCategory}
          />
        )}

        {view === 'shop' && (
          <ShopView 
            setView={handleSetView}
            setSelectedProduct={setSelectedProduct}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            category={category}
            setCategory={setCategory}
            initialSearchQuery={searchQuery}
          />
        )}

        {view === 'details' && selectedProduct && (
          <ProductDetailView 
            product={selectedProduct}
            setView={handleSetView}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            setSelectedProduct={setSelectedProduct}
          />
        )}

        {view === 'cart' && (
          <CartView 
            cart={cart}
            setView={handleSetView}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            couponDiscount={couponDiscount}
            setCouponDiscount={setCouponDiscount}
          />
        )}

        {view === 'checkout' && (
          <CheckoutView 
            cart={cart}
            setView={handleSetView}
            onSubmitOrder={handlePlaceOrder}
            couponDiscount={couponDiscount}
          />
        )}

        {view === 'success' && (
          <OrderSuccessView 
            order={activeOrder}
            setView={handleSetView}
          />
        )}

        {view === 'track' && (
          <TrackOrderView 
            order={activeOrder}
            setView={handleSetView}
          />
        )}

        {view === 'about' && (
          <AboutView 
            setView={handleSetView}
          />
        )}

        {view === 'services' && (
          <ServicesView />
        )}

        {view === 'blog' && (
          <BlogView />
        )}

        {view === 'faq' && (
          <FAQView />
        )}

        {view === 'contact' && (
          <ContactView />
        )}

        {view === 'dashboard' && (
          <DashboardView 
            wishlist={wishlist}
            setView={handleSetView}
          />
        )}

        {view === 'policy' && (
          <PolicyViews />
        )}
      </div>

      {/* FLOATING GEMINI CHATBOT HELPER */}
      <Chatbot />

      {/* GLOBAL FOOTER */}
      <Footer setView={handleSetView} setCategory={setCategory} />
    </div>
  );
}
