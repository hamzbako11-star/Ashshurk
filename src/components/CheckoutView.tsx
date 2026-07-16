import React, { useState } from 'react';
import { 
  CreditCard, ShieldCheck, ArrowLeft, Truck, Landmark, 
  Phone, User, Mail, MapPin, List, CheckCircle2, AlertTriangle, FileText
} from 'lucide-react';
import { CartItem, CustomerInfo } from '../types';

interface CheckoutViewProps {
  cart: CartItem[];
  setView: (view: string) => void;
  onSubmitOrder: (customerInfo: CustomerInfo, paymentMethod: string, deliveryMethod: any) => void;
  couponDiscount: number;
}

export default function CheckoutView({
  cart,
  setView,
  onSubmitOrder,
  couponDiscount
}: CheckoutViewProps) {
  // Customer info state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Selections
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'ussd' | 'cod'>('cod');
  const [deliveryMethod, setDeliveryMethod] = useState<'same_day' | 'next_day' | 'pickup'>('next_day');

  // Form validations
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg('Please complete all billing fields with valid agricultural delivery addresses.');
      return;
    }

    // Call submit order handler
    onSubmitOrder(
      {
        name,
        email,
        phone,
        address,
        deliveryInstructions: instructions
      },
      paymentMethod.toUpperCase(),
      deliveryMethod
    );
  };

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const discountAmount = subtotal * (couponDiscount / 100);
  const taxableAmount = subtotal - discountAmount;
  const shippingFee = subtotal === 0 ? 0 : (subtotal > 30000 ? 0 : 1500);
  const tax = taxableAmount * 0.075;
  const grandTotal = taxableAmount + shippingFee + tax;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center my-8">
        <h3 className="font-display text-lg font-bold">No Items to Check Out</h3>
        <button onClick={() => setView('shop')} className="mt-4 rounded-full bg-brand-green-600 text-white px-6 py-2.5 text-xs font-bold">
          Go To Shop
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      {/* Back to Cart */}
      <button 
        onClick={() => setView('cart')}
        className="mb-6 flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-brand-green-600 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Shopping Cart</span>
      </button>

      <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
        Secure Checkout
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
        
        {/* 1. BILLING & OPTIONS FORM */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing / Delivery Info */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-display text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center">
              <User className="h-4.5 w-4.5 mr-2 text-brand-green-600" /> Delivery & Customer Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-600 dark:text-slate-300">Contact Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-600 dark:text-slate-300">Email Address *</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="e.g. contact@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-600 dark:text-slate-300">Active Phone Number *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +234 812 345 6789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-600 dark:text-slate-300">Delivery Schedule</label>
                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value as any)}
                  className="w-full rounded-xl border border-gray-200 py-2.5 px-3 bg-white outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                >
                  <option value="next_day">Standard Next-Day Delivery (₦1,500 / Free above N30k)</option>
                  <option value="same_day">Same-Day Express Delivery (+₦2,500)</option>
                  <option value="pickup">Farm Store Pickup ( Abuja HQ - Free )</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-bold text-slate-600 dark:text-slate-300">Full Delivery Street Address *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Street No, Apartment, Estate, Landmark ( Abuja Delivery )"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-bold text-slate-600 dark:text-slate-300">Special Delivery Instructions (Optional)</label>
                <textarea
                  placeholder="e.g. Call before arrival, drop with estate gate, slaughter live bird immediately..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white h-20 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-display text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center">
              <CreditCard className="h-4.5 w-4.5 mr-2 text-brand-green-600" /> Choose Secure Payment Channel
            </h3>

            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              {/* Cash on Delivery */}
              <label className={`flex items-start space-x-3 rounded-xl border p-4 cursor-pointer transition ${paymentMethod === 'cod' ? 'border-brand-green-500 bg-brand-green-50/20 dark:border-brand-green-600' : 'border-gray-100 hover:border-gray-200 dark:border-slate-850'}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="text-brand-green-600 focus:ring-brand-green-500 mt-1"
                />
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white flex items-center">
                    <span>Cash on Delivery (COD)</span>
                    <span className="ml-2 rounded-full bg-emerald-100 text-emerald-800 px-1.5 py-0.5 text-[8px] uppercase">POPULAR</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1">Pay standard cash or execute mobile bank transfer to rider upon inspection.</p>
                </div>
              </label>

              {/* Debit/Credit Card */}
              <label className={`flex items-start space-x-3 rounded-xl border p-4 cursor-pointer transition ${paymentMethod === 'card' ? 'border-brand-green-500 bg-brand-green-50/20 dark:border-brand-green-600' : 'border-gray-100 hover:border-gray-200 dark:border-slate-850'}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="text-brand-green-600 focus:ring-brand-green-500 mt-1"
                />
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">Debit or Credit Card</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Pay instantly and securely using integrated Mastercard, Visa, or Verve.</p>
                </div>
              </label>

              {/* Bank Transfer */}
              <label className={`flex items-start space-x-3 rounded-xl border p-4 cursor-pointer transition ${paymentMethod === 'transfer' ? 'border-brand-green-500 bg-brand-green-50/20 dark:border-brand-green-600' : 'border-gray-100 hover:border-gray-200 dark:border-slate-850'}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'transfer'}
                  onChange={() => setPaymentMethod('transfer')}
                  className="text-brand-green-600 focus:ring-brand-green-500 mt-1"
                />
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">Direct Bank Transfer</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Transfer directly to our main corporate bank account with instant verification.</p>
                </div>
              </label>

              {/* USSD code */}
              <label className={`flex items-start space-x-3 rounded-xl border p-4 cursor-pointer transition ${paymentMethod === 'ussd' ? 'border-brand-green-500 bg-brand-green-50/20 dark:border-brand-green-600' : 'border-gray-100 hover:border-gray-200 dark:border-slate-850'}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'ussd'}
                  onChange={() => setPaymentMethod('ussd')}
                  className="text-brand-green-600 focus:ring-brand-green-500 mt-1"
                />
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">USSD Quick Dial</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Generate a quick banking dial string code to pay right from your dialer.</p>
                </div>
              </label>
            </div>

            {/* Dynamic payment instructions */}
            {paymentMethod === 'transfer' && (
              <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/40 p-4 text-xs space-y-1 text-blue-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                <p className="font-bold flex items-center">
                  <Landmark className="h-4 w-4 mr-1 text-blue-600" /> corporate Bank Details:
                </p>
                <p className="pl-5">Bank Name: <strong>Ashshuruk Agricultural Bank</strong></p>
                <p className="pl-5">Account Number: <strong>1020304050</strong></p>
                <p className="pl-5">Account Name: <strong>Ashshuruk Ventures Limited</strong></p>
                <p className="pl-5 text-[10px] text-blue-500 italic">Please include your phone number or name in the bank reference field.</p>
              </div>
            )}

            {paymentMethod === 'ussd' && (
              <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50/40 p-4 text-xs space-y-1 text-amber-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                <p className="font-bold flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-amber-600" /> USSD Quick Dial:
                </p>
                <p className="pl-5">USSD Dial String: <strong className="bg-amber-100 dark:bg-amber-950/40 px-2 py-0.5 rounded font-mono">*737*1*2#</strong></p>
                <p className="pl-5 text-[10px] text-amber-500">Wait for the secure prompt on your mobile screen to complete payment.</p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs dark:bg-slate-950 dark:border-slate-800">
                <p className="font-bold flex items-center text-slate-700 dark:text-white">
                  <ShieldCheck className="h-4 w-4 mr-1 text-brand-green-600" /> Secured with 256-Bit SSL Encryption
                </p>
                <p className="text-[10px] text-slate-400 pl-5 mt-1">We redirect to certified secure processors. No card logs are ever kept on our farm nodes.</p>
              </div>
            )}
          </div>
        </div>

        {/* 2. SUMMARY SIDEBAR */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="font-display text-sm font-bold text-slate-800 dark:text-white border-b border-gray-50 pb-2 dark:border-slate-850 flex items-center">
              <FileText className="h-4.5 w-4.5 mr-1.5 text-brand-green-600" /> Order Summary Breakdown
            </h3>

            {/* List items being bought */}
            <div className="divide-y divide-gray-50 dark:divide-slate-850/50 max-h-48 overflow-y-auto pr-1">
              {cart.map((item) => {
                const itemPrice = item.product.discountPrice || item.product.price;
                return (
                  <div key={item.product.id} className="flex justify-between items-center py-2 text-xs first:pt-0">
                    <div className="truncate max-w-[140px]">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{item.product.name}</span>
                      <span className="text-[10px] text-slate-400 block">Qty: {item.quantity} x ₦{itemPrice.toLocaleString()}</span>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">
                      ₦{(itemPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Price lines */}
            <div className="space-y-2 border-t border-gray-100 pt-3 text-xs dark:border-slate-850">
              <div className="flex justify-between text-slate-500">
                <span>Produce Subtotal:</span>
                <span className="font-bold text-slate-850 dark:text-slate-100">₦{subtotal.toLocaleString()}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount:</span>
                  <span>-₦{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500">
                <span>Delivery Logistics Fee:</span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-bold uppercase text-[10px]">Free Delivery</span>
                ) : (
                  <span className="font-bold text-slate-850 dark:text-slate-100">₦{shippingFee.toLocaleString()}</span>
                )}
              </div>

              <div className="flex justify-between text-slate-500">
                <span>VAT (7.5%):</span>
                <span className="font-bold text-slate-850 dark:text-slate-100">₦{tax.toLocaleString()}</span>
              </div>

              <div className="border-t border-slate-100 pt-3 flex justify-between text-sm font-extrabold text-slate-900 dark:border-slate-850 dark:text-white">
                <span>Total Due:</span>
                <span className="text-brand-green-600 dark:text-brand-green-400">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {errorMsg && (
              <div className="rounded-xl bg-red-50 p-2.5 text-[10px] text-red-600 font-semibold flex items-center border border-red-100">
                <AlertTriangle className="h-4 w-4 shrink-0 mr-1.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Confirm order button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-brand-green-600 hover:bg-brand-green-700 text-white py-3.5 text-xs font-bold transition duration-200 flex items-center justify-center space-x-1 shadow-md shadow-brand-green-600/10"
            >
              <span>Place Order (N{grandTotal.toLocaleString()})</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
