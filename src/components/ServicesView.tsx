import React, { useState } from 'react';
import { 
  Building2, Utensils, HelpCircle, ArrowRight, Truck, ShieldCheck, 
  CheckCircle2, Sparkles, FileSpreadsheet, Send, FileCheck
} from 'lucide-react';

export default function ServicesView() {
  const [coCompany, setCoCompany] = useState('');
  const [coContact, setCoContact] = useState('');
  const [coPhone, setCoPhone] = useState('');
  const [coNeeds, setCoNeeds] = useState('poultry-wholesale');
  const [coVolume, setCoVolume] = useState('weekly-500kg');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setCoCompany('');
      setCoContact('');
      setCoPhone('');
    }, 4000);
  };

  const corporateServices = [
    {
      title: 'HORECA Supply (Hotels, Restaurants & Cafes)',
      desc: 'Consistent supply of weight-calibrated whole chickens, skinless chicken breasts, farm eggs, and fresh vegetables cut to kitchen specs daily.',
      icon: '🏨'
    },
    {
      title: 'Supermarket Shelf Deliveries',
      desc: 'Vacuum-sealed, pre-labeled, barcoded organic poultry fillets, clean packaged eggs, and fresh veggies optimized for cold-storage shelves.',
      icon: '🏪'
    },
    {
      title: 'Contract Cooperative Farming',
      desc: 'Form contract agreements with certified arable farms to raise specialized non-hybrid grains, vegetables, or poultry flocks according to customized timelines.',
      icon: '🌾'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-16">
      
      {/* 1. SERVICES TITLE HEADER */}
      <section className="text-center max-w-xl mx-auto">
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green-600 font-bold">
          B2B Agricultural Enterprise
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1 dark:text-white">
          Wholesale Supplies & Contract Farming
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          Providing high-volume, vetted agricultural supplies for hotels, modern grocery supermarkets, caterers, and school kitchens across Nigeria.
        </p>
      </section>

      {/* 2. SPECIFIC SERVICES CARD GRID */}
      <section className="grid gap-6 md:grid-cols-3">
        {corporateServices.map((service, idx) => (
          <div 
            key={idx}
            className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4"
          >
            <div className="h-12 w-12 rounded-xl bg-brand-green-50 text-brand-green-700 flex items-center justify-center text-2xl dark:bg-brand-green-950/20 dark:text-brand-green-400 shrink-0">
              {service.icon}
            </div>
            <h3 className="font-display text-sm font-semibold text-slate-800 dark:text-white">
              {service.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </section>

      {/* 3. WHOLESALE CONTRACT ENQUIRY FORM */}
      <section className="grid gap-10 lg:grid-cols-2 items-start bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-850">
        <div className="space-y-4 max-w-lg">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold">
            Apply for Contract Accounts
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Request Bulk Wholesale Catalog & Contract Pricing
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Submit your trade volumes and crop categories below. Our agricultural sales desk will compile a customized bid contract proposal within 12 Hours of audit.
          </p>

          <div className="space-y-3.5 text-xs pt-2">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="h-4.5 w-4.5 text-brand-green-600" />
              <span className="text-slate-700 dark:text-slate-300">Customized credit-line limits (Subject to verification)</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="h-4.5 w-4.5 text-brand-green-600" />
              <span className="text-slate-700 dark:text-slate-300">Dedicated logistics temperature-regulated delivery trucks</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="h-4.5 w-4.5 text-brand-green-600" />
              <span className="text-slate-700 dark:text-slate-300">Certified microbiological batch lab analysis reports</span>
            </div>
          </div>
        </div>

        {/* The Form */}
        <div className="rounded-2xl bg-white border border-gray-150 p-6 dark:bg-slate-900 dark:border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-600 dark:text-slate-300">Corporate Entity / Business Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Hilton Hotel, Abuja"
                value={coCompany}
                onChange={(e) => setCoCompany(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-600 dark:text-slate-300">Procurement Rep Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sandra James"
                  value={coContact}
                  onChange={(e) => setCoContact(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 dark:text-slate-300">Business Phone Line *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +234 812 345 6789"
                  value={coPhone}
                  onChange={(e) => setCoPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-600 dark:text-slate-300">Desired Produce Category</label>
                <select
                  value={coNeeds}
                  onChange={(e) => setCoNeeds(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 bg-white outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                >
                  <option value="poultry-wholesale">Processed Poultry (Broiler Whole Birds/Fillets)</option>
                  <option value="eggs-wholesale">Eggs Bulk Supplies (Golden Yolks)</option>
                  <option value="veggies-wholesale">Organic Vegetables & Greenhouse Crops</option>
                  <option value="multi-crop">General Integrated Hotel Catering Feedstock</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 dark:text-slate-300">Estimated Weekly Volume</label>
                <select
                  value={coVolume}
                  onChange={(e) => setCoVolume(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 bg-white outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                >
                  <option value="weekly-500kg">Under 500kg weekly</option>
                  <option value="weekly-1ton">500kg - 1 Ton weekly</option>
                  <option value="weekly-5ton">1 Ton - 5 Tons weekly</option>
                  <option value="weekly-heavy">Over 5 Tons weekly logistics</option>
                </select>
              </div>
            </div>

            {success && (
              <div className="rounded-lg bg-emerald-50 text-emerald-700 p-3 font-bold border border-emerald-100 flex items-center space-x-1.5 animate-fade-in">
                <FileCheck className="h-5 w-5 shrink-0" />
                <span>Wholesale Inquiry Received! Our agricultural contract specialists will phone you shortly.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-green-600 hover:bg-brand-green-700 text-white py-3 text-xs font-bold transition flex items-center justify-center space-x-1 shadow-md shadow-brand-green-600/10"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Submit Wholesale request</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
