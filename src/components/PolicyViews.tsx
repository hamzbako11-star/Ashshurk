import React, { useState } from 'react';
import { Shield, RefreshCw, Truck, FileText, ArrowLeft, Leaf } from 'lucide-react';

export default function PolicyViews() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'refund' | 'shipping' | 'terms'>('shipping');

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      
      {/* Tab Selectors */}
      <div className="flex flex-wrap border-b border-gray-150 mb-8 dark:border-slate-800 text-xs">
        <button
          onClick={() => setActiveTab('shipping')}
          className={`px-5 py-3 font-bold transition flex items-center space-x-1.5 border-b-2 ${
            activeTab === 'shipping'
              ? 'border-brand-green-500 text-brand-green-600 dark:text-brand-green-400'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Truck className="h-4 w-4" />
          <span>Cold-Chain Shipping Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('refund')}
          className={`px-5 py-3 font-bold transition flex items-center space-x-1.5 border-b-2 ${
            activeTab === 'refund'
              ? 'border-brand-green-500 text-brand-green-600 dark:text-brand-green-400'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <RefreshCw className="h-4 w-4" />
          <span>Perishable Refund & Replacement</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-5 py-3 font-bold transition flex items-center space-x-1.5 border-b-2 ${
            activeTab === 'privacy'
              ? 'border-brand-green-500 text-brand-green-600 dark:text-brand-green-400'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Shield className="h-4 w-4" />
          <span>Privacy & Data Protection</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`px-5 py-3 font-bold transition flex items-center space-x-1.5 border-b-2 ${
            activeTab === 'terms'
              ? 'border-brand-green-500 text-brand-green-600 dark:text-brand-green-400'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Corporate Terms of Service</span>
        </button>
      </div>

      {/* Content Panels */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-850 dark:bg-slate-900 text-xs text-slate-650 dark:text-slate-300 leading-relaxed font-sans space-y-4">
        
        {activeTab === 'shipping' && (
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-slate-850 dark:text-white">Cold-Chain Shipping & Delivery Logistics</h3>
            <p>
              To ensure that fresh livestock, broiler meats, and organic eggs reach households without any thermal degradation, Ashshuruk Ventures enforces a strict cold-chain routing model.
            </p>
            <h4 className="font-bold text-slate-800 dark:text-white">Key logistics protocols:</h4>
            <ul className="list-disc pl-5 space-y-2 text-slate-500">
              <li><strong>Abuja Delivery radius:</strong> All dispatches are consolidated inside our Garki warehouse. Same-Day dispatches require orders to be completed before 10 AM.</li>
              <li><strong>Thermal insulation:</strong> Sliced poultry cuts and fresh raw cow milk are loaded directly into micro-coolers packed with medical-grade non-toxic dry ice gel packs.</li>
              <li><strong>Inspection upon arrival:</strong> Customers are encouraged to physically audit and inspect the crop color, weight certifications, and egg shells before validating the COD rider's receipt.</li>
            </ul>
          </div>
        )}

        {activeTab === 'refund' && (
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-slate-850 dark:text-white">Perishable Crop Refund & Replacement Rules</h3>
            <p>
              Due to the highly perishable nature of organic agriculture (including processed broiler birds, fresh fish, and farm eggs), we manage a specialized replacement paradigm to protect our buyers.
            </p>
            <h4 className="font-bold text-slate-800 dark:text-white">Refund terms:</h4>
            <ul className="list-disc pl-5 space-y-2 text-slate-500">
              <li><strong>Reporting Window:</strong> Damaged egg crates, bruised tomatoes, or stale meat cuts must be reported to our helpline (+234 812 345 6789) or our AI Chatbot with image uploads within <strong>2 Hours</strong> of rider dispatch hand-off.</li>
              <li><strong>Instant Replacement:</strong> Verified complaints will trigger an automatic, immediate same-day re-delivery of fresh crop equivalents at zero additional logistics costs to the customer.</li>
              <li><strong>Refund Method:</strong> If replacement stock is exhausted, refunds are disbursed to the buyer's nominated Nigerian bank account within 24 Hours.</li>
            </ul>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-slate-850 dark:text-white">Privacy & Personal Data Security</h3>
            <p>
              Your personal data, including delivery coordinates, telephone lines, and payment reference numbers, is protected using certified server-side encryptions.
            </p>
            <p className="text-slate-500">
              We never sell or distribute buyer addresses to secondary third-party marketing brokers. Telephone numbers are strictly exposed only to assigned logistics dispatch riders during delivery transits, ensuring complete peace of mind.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-slate-850 dark:text-white">Corporate Terms of Service</h3>
            <p>
              By purchasing or supplying farm produce on Ashshuruk Ventures, you agree to comply with our veterinary sanitation codes and agricultural trade policies.
            </p>
            <p className="text-slate-500">
              All live weights are calibrated at our Garki scale hubs before dispatch. Crop prices may vary slightly based on seasonal market yields. However, finalized checkouts secure the locked-in price against any subsequent market fluctuations.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
