import React from 'react';
import { 
  CheckCircle, FileText, ArrowRight, Printer, Download, 
  MapPin, Clock, ShieldCheck, Sprout, ShoppingCart, Truck
} from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessViewProps {
  order: Order | null;
  setView: (view: string) => void;
}

export default function OrderSuccessView({ order, setView }: OrderSuccessViewProps) {
  if (!order) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center my-8">
        <h3 className="font-display text-lg font-bold">No Active Order Details</h3>
        <button onClick={() => setView('home')} className="mt-4 rounded-full bg-brand-green-600 text-white px-6 py-2.5 text-xs font-bold">
          Go Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      
      {/* 1. CELEBRATION BOX */}
      <div className="text-center space-y-3.5 mb-10 animate-fade-in">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
          <CheckCircle className="h-10 w-10 animate-bounce" />
        </div>
        <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Harvest Order Placed!
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto dark:text-slate-400">
          Thank you for choosing Ashshuruk Ventures. Your fresh farm products are being curated from our fields. We have dispatched a confirmation SMS & Email.
        </p>

        {/* Action Button */}
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => setView('track')}
            className="rounded-full bg-brand-green-600 hover:bg-brand-green-700 px-6 py-2.5 text-xs font-bold text-white transition flex items-center space-x-1 shadow-md shadow-brand-green-600/10"
          >
            <span>Track Order Logistics</span>
            <Truck className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView('shop')}
            className="rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 text-xs font-bold transition dark:bg-slate-900 dark:text-slate-300"
          >
            Continue Harvesting
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC DIGITAL INVOICE RECEIPT */}
      <div className="rounded-3xl border border-gray-100 bg-white shadow-xl overflow-hidden dark:border-slate-850 dark:bg-slate-900 print:shadow-none print:border-none">
        
        {/* Invoice Header */}
        <div className="bg-slate-50/50 p-6 sm:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 dark:bg-slate-950 dark:border-slate-850">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-600 dark:bg-brand-green-800 dark:text-white">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold tracking-tight text-brand-charcoal dark:text-white">
                Ashshuruk Ventures Ltd.
              </h1>
              <p className="font-mono text-[9px] uppercase tracking-widest text-brand-gold font-bold">
                ABUJA HQ INVOICE RECEIPT
              </p>
            </div>
          </div>

          <div className="text-right sm:text-right">
            <span className="inline-block bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[9px] font-bold dark:bg-emerald-950/20 dark:text-emerald-400">
              PAYMENT {order.paymentMethod === 'COD' ? 'DUE ON ARRIVAL' : 'SUCCESSFUL'}
            </span>
            <p className="text-[10px] text-slate-400 mt-1">Invoice ID: <span className="font-mono font-bold text-slate-700 dark:text-slate-200">#INV-{order.id.slice(0,8).toUpperCase()}</span></p>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-600 dark:text-slate-300">
          
          {/* Metadata Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-1">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Delivered To:</h4>
              <p className="font-bold text-slate-800 dark:text-slate-100">{order.customerInfo.name}</p>
              <p className="text-slate-500">{order.customerInfo.address}</p>
              <p className="text-slate-500">Phone: {order.customerInfo.phone}</p>
              <p className="text-slate-500">Email: {order.customerInfo.email}</p>
            </div>

            <div className="sm:text-right space-y-1">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Logistics Detail:</h4>
              <p>Tracking Number: <span className="font-mono font-bold text-brand-green-600">{order.trackingNumber}</span></p>
              <p>Order Date: <span className="font-bold">{order.date}</span></p>
              <p>Payment Channel: <span className="font-bold uppercase">{order.paymentMethod}</span></p>
              <p>Est. Transit: <span className="font-bold">Same-Day / Next-Day Logistics</span></p>
            </div>
          </div>

          {/* Table Items */}
          <div className="border border-gray-150 rounded-xl overflow-hidden dark:border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-950">
                <tr className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-2.5">Produce Description</th>
                  <th className="px-4 py-2.5 text-center">Qty Unit</th>
                  <th className="px-4 py-2.5 text-right">Unit cost</th>
                  <th className="px-4 py-2.5 text-right">Row Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-850">
                {order.items.map((item) => {
                  const price = item.product.discountPrice || item.product.price;
                  return (
                    <tr key={item.product.id}>
                      <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">{item.product.name}</td>
                      <td className="px-4 py-3 text-center">{item.quantity} x {item.product.unit}</td>
                      <td className="px-4 py-3 text-right">₦{price.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-850 dark:text-slate-100">₦{(price * item.quantity).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals list */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-4 border-t border-gray-150 dark:border-slate-800">
            <div className="max-w-xs space-y-1">
              <h5 className="font-bold text-slate-850 dark:text-white flex items-center">
                <ShieldCheck className="h-4 w-4 mr-1 text-brand-green-500" /> Bio-Sanitary Declaration:
              </h5>
              <p className="text-[10px] text-slate-400 leading-normal">
                This agricultural invoice certifies that all poultry birds and fresh produce itemized above have undergone vet-controlled disease screening before dispatch and transport.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">₦{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Vat Tax (7.5%):</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">₦{order.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Logistics/Shipping:</span>
                {order.shippingFee === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE DELIVERY</span>
                ) : (
                  <span className="font-bold text-slate-800 dark:text-slate-100">₦{order.shippingFee.toLocaleString()}</span>
                )}
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-gray-150 pt-2 dark:text-white dark:border-slate-800">
                <span>Grand Total:</span>
                <span className="text-brand-green-600 dark:text-brand-green-400">₦{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Footer Actions */}
        <div className="bg-slate-50/50 p-4 border-t border-gray-100 flex justify-end gap-3.5 text-xs dark:bg-slate-950 dark:border-slate-850 print:hidden">
          <button
            onClick={handlePrint}
            className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 font-bold text-slate-600 transition flex items-center space-x-1.5 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            <Printer className="h-4 w-4" />
            <span>Print Invoice</span>
          </button>
          
          <button
            onClick={() => alert('PDF receipt download simulated! Generated file has been saved to your downloads folder.')}
            className="rounded-lg bg-slate-800 hover:bg-slate-900 px-4 py-2 font-bold text-white transition flex items-center space-x-1.5"
          >
            <Download className="h-4 w-4" />
            <span>Download Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
}
