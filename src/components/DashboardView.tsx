import React, { useState } from 'react';
import { 
  User, ShieldCheck, ClipboardList, TrendingUp, DollarSign, Sprout, 
  CheckCircle, AlertTriangle, Plus, Users, Landmark, FileCheck, 
  BarChart3, RefreshCw, Layers, Award, Clock
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface DashboardViewProps {
  wishlist: Product[];
  setView: (view: string) => void;
}

export default function DashboardView({ wishlist, setView }: DashboardViewProps) {
  const [activeRole, setActiveRole] = useState<'customer' | 'supplier' | 'admin'>('customer');
  
  // Supplier State
  const [supplyName, setSupplyName] = useState('');
  const [supplyCat, setSupplyCat] = useState('poultry');
  const [supplyQty, setSupplyQty] = useState('');
  const [supplyPrice, setSupplyPrice] = useState('');
  const [vetApproved, setVetApproved] = useState(false);
  const [supplierSubmitMsg, setSupplierSubmitMsg] = useState('');

  // Farmer stock list (mock)
  const [farmerStocks, setFarmerStocks] = useState([
    { id: 1, name: 'Live Broiler Birds (2.5kg)', category: 'Poultry', qty: '120 Units', price: '₦10,500', status: 'Approved' },
    { id: 2, name: 'Golden Yolk Eggs Crate', category: 'Eggs', qty: '80 Crates', price: '₦3,400', status: 'Pending Review' }
  ]);

  const handleSupplierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplyName || !supplyQty || !supplyPrice) {
      alert('Please fill out all harvest stock values.');
      return;
    }

    const newStock = {
      id: farmerStocks.length + 1,
      name: supplyName,
      category: supplyCat.charAt(0).toUpperCase() + supplyCat.slice(1),
      qty: supplyQty + ' Units',
      price: '₦' + Number(supplyPrice).toLocaleString(),
      status: vetApproved ? 'Approved' : 'Pending Vet Audit'
    };

    setFarmerStocks([newStock, ...farmerStocks]);
    setSupplierSubmitMsg('Harvest catalog uploaded successfully! Assigned to our Garki Vet desks for physical inspection.');
    
    // Reset
    setSupplyName('');
    setSupplyQty('');
    setSupplyPrice('');
    setVetApproved(false);

    setTimeout(() => setSupplierSubmitMsg(''), 5000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      
      {/* 1. ROLE SWITCHER BAR */}
      <div className="mb-8 rounded-2xl bg-white border border-gray-100 p-3 shadow-sm flex flex-wrap gap-2 justify-between items-center dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Portal Role Router:</span>
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={() => setActiveRole('customer')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center space-x-1.5 ${
              activeRole === 'customer'
                ? 'bg-brand-green-600 text-white shadow'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-350'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Shopper Portal</span>
          </button>

          <button
            onClick={() => setActiveRole('supplier')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center space-x-1.5 ${
              activeRole === 'supplier'
                ? 'bg-brand-green-600 text-white shadow'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-350'
            }`}
          >
            <Sprout className="h-4 w-4" />
            <span>Farmer / Supplier</span>
          </button>

          <button
            onClick={() => setActiveRole('admin')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center space-x-1.5 ${
              activeRole === 'admin'
                ? 'bg-brand-green-600 text-white shadow'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-350'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>System Admin</span>
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC VIEW SWITCHING */}
      <main className="animate-fade-in text-xs">
        
        {/* =======================================================
            CUSTOMER DASHBOARD VIEW
           ======================================================= */}
        {activeRole === 'customer' && (
          <div className="space-y-8">
            
            {/* Shopper Loyalty & stats */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Profile card */}
              <div className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-brand-green-100 text-brand-green-600 dark:bg-brand-green-950 dark:text-brand-green-400 flex items-center justify-center font-bold text-lg">
                    🧑‍🌾
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-850 dark:text-white">Sandra James</h3>
                    <p className="text-[10px] text-slate-400">Shopper Account • Verified</p>
                  </div>
                </div>

                <div className="rounded-xl bg-brand-green-50/50 p-3.5 border border-brand-green-100/50 dark:bg-slate-950 dark:border-slate-850 space-y-1">
                  <p className="font-bold text-[11px] text-slate-700 dark:text-slate-200 flex items-center">
                    <Award className="h-4 w-4 mr-1 text-brand-gold fill-brand-gold" /> Golden Crop Loyalty Club
                  </p>
                  <p className="text-[10px] text-slate-500">Tier: <strong>Bronze Farmer</strong> • 450 pts</p>
                  <p className="text-[9px] text-slate-400">Add 50 more points to unlock a 5% automatic checkout rebate!</p>
                </div>
              </div>

              {/* Saved logistics address */}
              <div className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Saved Delivery Addresses</h4>
                  <p className="font-bold text-slate-800 dark:text-white mt-1.5">Primary Residence:</p>
                  <p className="text-slate-500 dark:text-slate-400 leading-normal mt-0.5">Plot 12, Garki II Extension, Near Zenith Bank Hub, Abuja.</p>
                </div>
                <button
                  onClick={() => alert('Saved address updates simulated!')}
                  className="text-brand-green-600 dark:text-brand-green-400 font-bold hover:underline self-start"
                >
                  Manage Address Profiles →
                </button>
              </div>

              {/* Saved Wishlist shortcut stats */}
              <div className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Wishlist Catalog</h4>
                  <p className="text-slate-500 mt-1.5 leading-relaxed">
                    You have saved <strong>{wishlist.length}</strong> fresh products to your persistent cache. Settle orders before daily sales clear out!
                  </p>
                </div>
                <button
                  onClick={() => setView('shop')}
                  className="text-brand-green-600 dark:text-brand-green-400 font-bold hover:underline self-start"
                >
                  View Saved Wishlist →
                </button>
              </div>
            </div>

            {/* Shopper Transaction Logs */}
            <div className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
              <h4 className="font-display text-sm font-bold text-slate-850 dark:text-white mb-4">Historical Orders & Invoices</h4>
              
              <div className="border border-gray-100 rounded-xl overflow-hidden dark:border-slate-850">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-950">
                    <tr className="text-[10px] font-bold uppercase text-slate-400">
                      <th className="px-4 py-2.5">Order ID</th>
                      <th className="px-4 py-2.5">Date</th>
                      <th className="px-4 py-2.5">Total due</th>
                      <th className="px-4 py-2.5">Payment Option</th>
                      <th className="px-4 py-2.5 text-center">Logistics Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-850 text-[11px]">
                    <tr>
                      <td className="px-4 py-3 font-mono font-bold text-brand-green-600">#ASH-48291-NGA</td>
                      <td className="px-4 py-3">July 16, 2026</td>
                      <td className="px-4 py-3 font-bold">₦14,800</td>
                      <td className="px-4 py-3 uppercase">COD</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">In-Transit Dispatch</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-bold text-slate-400">#ASH-31012-NGA</td>
                      <td className="px-4 py-3">June 22, 2026</td>
                      <td className="px-4 py-3 font-bold">₦28,500</td>
                      <td className="px-4 py-3 uppercase">CARD</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">Delivered & Closed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}


        {/* =======================================================
            SUPPLIER DASHBOARD VIEW
           ======================================================= */}
        {activeRole === 'supplier' && (
          <div className="grid gap-8 lg:grid-cols-3 items-start">
            
            {/* 1. UPLOAD HARVEST CATALOG FORM (left 2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-9 w-9 rounded-lg bg-brand-green-50 text-brand-green-600 dark:bg-brand-green-950 dark:text-brand-green-400 flex items-center justify-center">
                    ➕
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-850 dark:text-white">Declare Raw Farm Harvests</h3>
                    <p className="text-[10px] text-slate-400">Post crops, broilers, or dairy parameters directly onto our market lists.</p>
                  </div>
                </div>

                <form onSubmit={handleSupplierSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 dark:text-slate-300">Produce / Livestock Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Broiler Chicken (Fully Grown, 3.2kg)"
                      value={supplyName}
                      onChange={(e) => setSupplyName(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-slate-50/50 py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 dark:text-slate-300">Category</label>
                      <select
                        value={supplyCat}
                        onChange={(e) => setSupplyCat(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      >
                        <option value="poultry">Poultry</option>
                        <option value="eggs">Eggs</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="dairy">Dairy</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 dark:text-slate-300">Volume (Qty Unit)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 50"
                        value={supplyQty}
                        onChange={(e) => setSupplyQty(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-slate-50/50 py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-600 dark:text-slate-300">Price Per Unit (NGN)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 3500"
                        value={supplyPrice}
                        onChange={(e) => setSupplyPrice(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-slate-50/50 py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-brand-green-50/40 rounded-xl border border-brand-green-100/50 dark:bg-slate-950 dark:border-slate-850">
                    <label className="flex items-start space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={vetApproved}
                        onChange={(e) => setVetApproved(e.target.checked)}
                        className="rounded text-brand-green-600 focus:ring-brand-green-500 h-4 w-4 mt-0.5"
                      />
                      <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300 block">Biological Safety Pledge</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">I certify that these animal batches have been nourished with organic grains and weekly vetted by veterinary health experts.</span>
                      </div>
                    </label>
                  </div>

                  {supplierSubmitMsg && (
                    <div className="rounded-lg bg-emerald-50 text-emerald-700 p-3 font-bold border border-emerald-100 flex items-center space-x-1.5">
                      <FileCheck className="h-5 w-5 shrink-0" />
                      <span>{supplierSubmitMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-brand-green-600 hover:bg-brand-green-700 text-white py-3 text-xs font-bold transition flex items-center justify-center space-x-1"
                  >
                    <span>Upload Harvest Stock</span>
                  </button>
                </form>
              </div>

              {/* Uploaded History logs */}
              <div className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                <h4 className="font-bold text-slate-850 dark:text-white mb-3">Your Declared Stock Catalog</h4>
                <div className="border border-gray-100 rounded-xl overflow-hidden dark:border-slate-850">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-950">
                      <tr className="text-[10px] font-bold text-slate-400">
                        <th className="px-4 py-2">Item</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Qty</th>
                        <th className="px-4 py-2">Price Unit</th>
                        <th className="px-4 py-2 text-right">Approval</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-850 text-[11px]">
                      {farmerStocks.map((stock) => (
                        <tr key={stock.id}>
                          <td className="px-4 py-2.5 font-bold">{stock.name}</td>
                          <td className="px-4 py-2.5 text-slate-400">{stock.category}</td>
                          <td className="px-4 py-2.5">{stock.qty}</td>
                          <td className="px-4 py-2.5 font-semibold text-brand-green-600">{stock.price}</td>
                          <td className="px-4 py-2.5 text-right">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              stock.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-850'
                            }`}>{stock.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* 2. SUPPLIER METRICS SUMMARY (right 1 col) */}
            <div className="space-y-6">
              {/* Wallet payout statistics */}
              <div className="rounded-2xl border border-gray-150 bg-white p-5 shadow-sm dark:bg-slate-900 dark:border-slate-800 space-y-4">
                <h4 className="text-[10px] uppercase text-slate-400 font-bold">Ledger Payables Balance</h4>
                
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 flex items-center justify-center rounded-xl">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-xl font-extrabold text-slate-850 dark:text-white">₦380,450.00</span>
                    <span className="text-[10px] text-slate-400">Total Cleared Sales</span>
                  </div>
                </div>

                <div className="border-t border-gray-50/80 pt-3 dark:border-slate-850/60 text-[10px] space-y-1.5">
                  <p className="flex justify-between">
                    <span className="text-slate-400">Awaiting dispatch verify:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">₦45,000</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Disbursed account bank:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">GTBank ****4821</span>
                  </p>
                </div>
              </div>

              {/* Veterinary compliance scorecard */}
              <div className="rounded-2xl border border-gray-150 bg-white p-5 shadow-sm dark:bg-slate-900 dark:border-slate-800 space-y-3">
                <h4 className="text-[10px] uppercase text-slate-400 font-bold">Bio-Compliance score</h4>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-brand-green-600 dark:text-brand-green-400">98%</span>
                  <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">A-GRADE</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Excellent feed protein calibration. No traces of heavy antibiotics found in recent laboratory yolk shell bio-audits. Keep it up!
                </p>
              </div>
            </div>

          </div>
        )}


        {/* =======================================================
            SYSTEM ADMIN DASHBOARD VIEW
           ======================================================= */}
        {activeRole === 'admin' && (
          <div className="space-y-8">
            
            {/* Global platform analytics row */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-gray-150 bg-white p-5 shadow-sm dark:bg-slate-900 dark:border-slate-800 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase text-slate-400 font-bold">Daily Gross Revenue</span>
                  <span className="block text-lg font-extrabold text-slate-850 dark:text-white">₦1,420,500</span>
                  <span className="text-[9px] text-emerald-600 font-bold">▲ +12.4% vs yesterday</span>
                </div>
                <div className="h-10 w-10 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 flex items-center justify-center rounded-xl shrink-0">
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>

              <div className="rounded-2xl border border-gray-150 bg-white p-5 shadow-sm dark:bg-slate-900 dark:border-slate-800 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase text-slate-400 font-bold">Active Cooperatives</span>
                  <span className="block text-lg font-extrabold text-slate-850 dark:text-white">42 Farmers</span>
                  <span className="text-[9px] text-emerald-600 font-bold">● 100% inspected audits</span>
                </div>
                <div className="h-10 w-10 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 flex items-center justify-center rounded-xl shrink-0">
                  <Users className="h-5 w-5" />
                </div>
              </div>

              <div className="rounded-2xl border border-gray-150 bg-white p-5 shadow-sm dark:bg-slate-900 dark:border-slate-800 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase text-slate-400 font-bold">Logistics Dispatches</span>
                  <span className="block text-lg font-extrabold text-slate-850 dark:text-white">18 Shipments</span>
                  <span className="text-[9px] text-emerald-600 font-bold">● 15 deliveries completed</span>
                </div>
                <div className="h-10 w-10 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 flex items-center justify-center rounded-xl shrink-0">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>

              <div className="rounded-2xl border border-gray-150 bg-white p-5 shadow-sm dark:bg-slate-900 dark:border-slate-800 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase text-slate-400 font-bold">Bio-Safety Alerts</span>
                  <span className="block text-lg font-extrabold text-emerald-600">ZERO</span>
                  <span className="text-[9px] text-emerald-600 font-bold">✓ All water buffers sterile</span>
                </div>
                <div className="h-10 w-10 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 flex items-center justify-center rounded-xl shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Custom Visual Revenue Chart Representation */}
            <div className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 space-y-4">
              <h4 className="font-bold text-slate-850 dark:text-white">Abuja Farm-Produce Monthly Trade Volume</h4>
              
              {/* The chart columns representation */}
              <div className="h-44 flex items-end justify-between gap-2 pt-6 border-b border-gray-100 dark:border-slate-800">
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-slate-200 hover:bg-brand-green-500 rounded-t transition" style={{ height: '35%' }} />
                  <span className="text-[9px] text-slate-400 mt-2">Jan</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-slate-200 hover:bg-brand-green-500 rounded-t transition" style={{ height: '45%' }} />
                  <span className="text-[9px] text-slate-400 mt-2">Feb</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-slate-200 hover:bg-brand-green-500 rounded-t transition" style={{ height: '65%' }} />
                  <span className="text-[9px] text-slate-400 mt-2">Mar</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-slate-200 hover:bg-brand-green-500 rounded-t transition" style={{ height: '55%' }} />
                  <span className="text-[9px] text-slate-400 mt-2">Apr</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-slate-200 hover:bg-brand-green-500 rounded-t transition" style={{ height: '80%' }} />
                  <span className="text-[9px] text-slate-400 mt-2">May</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-brand-green-600 rounded-t" style={{ height: '95%' }} />
                  <span className="text-[9px] text-slate-800 font-bold dark:text-white mt-2">Jun</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
