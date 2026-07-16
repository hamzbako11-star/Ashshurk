import React, { useState } from 'react';
import { 
  Trash2, Plus, Minus, ArrowRight, ShoppingBag, 
  Tag, AlertCircle, CheckCircle2, RotateCcw
} from 'lucide-react';
import { CartItem } from '../types';

interface CartViewProps {
  cart: CartItem[];
  setView: (view: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  couponDiscount: number; // percentage
  setCouponDiscount: (discount: number) => void;
}

export default function CartView({
  cart,
  setView,
  updateQuantity,
  removeFromCart,
  couponDiscount,
  setCouponDiscount
}: CartViewProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  // Free shipping above N30,000, otherwise N1,500
  const shippingFee = subtotal === 0 ? 0 : (subtotal > 30000 ? 0 : 1500);
  
  // Apply coupon discount (on subtotal)
  const discountAmount = subtotal * (couponDiscount / 100);
  const taxableAmount = subtotal - discountAmount;
  
  // 7.5% VAT
  const tax = taxableAmount * 0.075;
  const grandTotal = taxableAmount + shippingFee + tax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const trimmed = promoCode.trim().toUpperCase();

    if (trimmed === 'ASHSHURUK10') {
      setCouponDiscount(10);
      setPromoSuccess('Promo ASHSHURUK10 applied! 10% discount deducted from subtotal.');
    } else if (trimmed === 'FRESHHARVEST') {
      setCouponDiscount(15);
      setPromoSuccess('Promo FRESHHARVEST applied! 15% discount deducted from subtotal.');
    } else {
      setPromoError('Invalid promo code. Try ASHSHURUK10 or FRESHHARVEST for premium discounts!');
    }
  };

  const handleClearPromo = () => {
    setCouponDiscount(0);
    setPromoCode('');
    setPromoSuccess('');
    setPromoError('');
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 text-center bg-white border border-gray-100 rounded-3xl dark:bg-slate-900 dark:border-slate-800 my-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mx-auto mb-5 dark:bg-slate-950">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">Your Cart is Currently Empty</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1.5 dark:text-slate-400">
          You haven't harvested any items yet! Visit our poultry cages, fish ponds, or fresh produce slots to begin ordering.
        </p>
        <button
          onClick={() => setView('shop')}
          className="mt-6 rounded-full bg-brand-green-600 hover:bg-brand-green-700 px-8 py-3 text-xs font-bold text-white transition duration-200 inline-block"
        >
          Browse Marketplace Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
        Your Shopping Cart
      </h2>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* 1. LISTING COL */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="divide-y divide-gray-100 dark:divide-slate-850">
              {cart.map((item) => {
                const itemPrice = item.product.discountPrice || item.product.price;
                return (
                  <div key={item.product.id} className="flex items-center py-4 first:pt-0 last:pb-0 gap-4">
                    {/* Image */}
                    <div className="h-16 w-16 rounded-xl overflow-hidden bg-slate-50 border shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="h-full w-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 capitalize">{item.product.category.replace('-', ' ')}</p>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-1">
                        ₦{itemPrice.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">/ {item.product.unit}</span>
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-1 border border-gray-200 rounded-lg bg-gray-50 p-0.5 dark:border-slate-800 dark:bg-slate-950 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="rounded-md p-1 hover:bg-white dark:hover:bg-slate-900 transition"
                      >
                        <Minus className="h-3.5 w-3.5 text-slate-500" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-slate-800 dark:text-slate-200">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="rounded-md p-1 hover:bg-white dark:hover:bg-slate-900 transition"
                      >
                        <Plus className="h-3.5 w-3.5 text-slate-500" />
                      </button>
                    </div>

                    {/* Total item cost */}
                    <div className="text-right shrink-0 min-w-[70px]">
                      <span className="text-xs font-bold text-brand-green-700 dark:text-brand-green-400 block">
                        ₦{(itemPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition shrink-0"
                      aria-label="Delete item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Continue shopping button */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setView('shop')}
              className="text-xs font-bold text-slate-500 hover:text-brand-green-600 transition flex items-center space-x-1.5"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* 2. SUMMARY & COUPON COL */}
        <div className="space-y-6">
          {/* Coupon Code Panel */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center">
              <Tag className="h-4 w-4 mr-1 text-brand-green-600" /> Promo / Discount Vouchers
            </h4>
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Voucher (e.g. ASHSHURUK10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 py-2 px-3 text-xs outline-none focus:border-brand-green-500 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
              <button
                type="submit"
                className="rounded-xl bg-slate-800 text-white hover:bg-slate-900 px-4 py-2 text-xs font-bold transition"
              >
                Apply
              </button>
            </form>

            {promoError && (
              <div className="flex items-center space-x-1.5 mt-2.5 text-[10px] text-red-500 font-semibold">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{promoError}</span>
              </div>
            )}

            {promoSuccess && (
              <div className="space-y-1.5 mt-2.5">
                <div className="flex items-center space-x-1.5 text-[10px] text-emerald-600 font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>{promoSuccess}</span>
                </div>
                <button 
                  onClick={handleClearPromo}
                  className="text-[9px] font-bold text-red-500 underline"
                >
                  Remove Coupon Code
                </button>
              </div>
            )}
          </div>

          {/* Checkout calculations summary */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-gray-50 pb-2 dark:border-slate-850">
              Order Calculations
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Produce Subtotal:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">₦{subtotal.toLocaleString()}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Voucher Discount ({couponDiscount}%):</span>
                  <span>-₦{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500">
                <span>Standard Delivery Fee:</span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-bold uppercase">Free Shipping</span>
                ) : (
                  <span className="font-bold text-slate-800 dark:text-slate-100">₦{shippingFee.toLocaleString()}</span>
                )}
              </div>

              <div className="flex justify-between text-slate-500">
                <span>Value Added Tax (VAT 7.5%):</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">₦{tax.toLocaleString()}</span>
              </div>

              {subtotal < 30000 && (
                <div className="bg-amber-50 text-amber-800 p-2.5 rounded-lg text-[10px] font-medium border border-amber-100/30">
                  💡 Add <strong>₦{(30000 - subtotal).toLocaleString()}</strong> more worth of items to unlock <strong>FREE DELIVERY</strong>!
                </div>
              )}

              <div className="border-t border-slate-100 pt-3 flex justify-between text-sm font-extrabold text-slate-900 dark:border-slate-850 dark:text-white">
                <span>Grand Total:</span>
                <span className="text-brand-green-600 dark:text-brand-green-400">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Check out button */}
            <button
              onClick={() => setView('checkout')}
              className="w-full rounded-xl bg-brand-green-600 hover:bg-brand-green-700 text-white py-3.5 text-xs font-bold transition duration-200 flex items-center justify-center space-x-1"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
