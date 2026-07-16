import React from 'react';
import { Sprout, ShieldCheck, Heart, Award, ArrowRight, Star, Leaf } from 'lucide-react';

interface AboutViewProps {
  setView: (view: string) => void;
}

export default function AboutView({ setView }: AboutViewProps) {
  const agriculturalTimeline = [
    {
      step: '01',
      title: 'Veterinary Breeding Check',
      desc: 'All chicks and livestock are selected under rigid sanitary health certifications, utilizing zero hormones or aggressive synthetic stimulants.'
    },
    {
      step: '02',
      title: 'Organic Feed Formulation',
      desc: 'Formulated in-house using rich soybeans, mineral-fortified grains, and fresh clean mountain well-water, guaranteeing high protein egg yields.'
    },
    {
      step: '03',
      title: 'Hygienic Clean Processing',
      desc: 'Fully inspected slaughter processes executed in stainless steel vacuum hubs under rigid temperature metrics to eliminate viral infection lines.'
    },
    {
      step: '04',
      title: 'Cold-Chain Delivery Logistics',
      desc: 'Packed inside ice-insulated coolers and dispatched in refrigerated motorbikes, guaranteeing fresh milk, fish, and eggs do not bake under heat.'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-16">
      
      {/* 1. HERO/INTRO */}
      <section className="relative overflow-hidden rounded-3xl bg-brand-charcoal text-white p-8 md:p-16">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-cover bg-center opacity-15" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d15943747f?auto=format&fit=crop&w=800&q=80')` }} />
        
        <div className="relative max-w-2xl space-y-4 animate-fade-in">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-brand-green-500/20 px-3.5 py-1 text-xs font-bold text-emerald-400 border border-brand-green-500/20">
            <Leaf className="h-3.5 w-3.5 text-brand-gold" />
            <span>NURTURING PREMIUM AGRICULTURE SINCE 2020</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none">
            Welcome to Ashshuruk Ventures
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            We are Nigeria's premium farm-to-table digital e-commerce hub, bridging the divide between top-tier agricultural cooperatives and modern urban kitchens. From live poultry birds and freshly processed breast fillets to organic golden eggs, premium fish, and fresh vegetables, we guarantee sanitary superiority and speed.
          </p>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setView('shop')}
              className="rounded-full bg-brand-green-600 hover:bg-brand-green-700 px-6 py-2.5 text-xs font-bold text-white transition flex items-center space-x-1"
            >
              <span>Browse Marketplace Catalog</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView('contact')}
              className="rounded-full bg-transparent hover:bg-white/5 border border-white/20 px-6 py-2.5 text-xs font-bold text-slate-200 hover:text-white transition"
            >
              Contact Our Ag-Offices
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE PHILOSOPHY TIMELINE */}
      <section className="space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green-600 font-bold">The Lifecycle Process</span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1 dark:text-white">Our Complete Ag-Fulfillment Lifecycle</h3>
          <p className="text-xs text-slate-500 mt-1.5">
            Discover the strict sanitary guidelines followed from rearing to live dispatching, maintaining organic nutrition across Abuja.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {agriculturalTimeline.map((item, idx) => (
            <div 
              key={idx}
              className="relative p-6 rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4"
            >
              <span className="absolute right-6 top-4 font-mono text-3xl font-extrabold text-slate-100 dark:text-slate-800">
                {item.step}
              </span>
              <div className="h-10 w-10 rounded-lg bg-brand-green-100 text-brand-green-600 dark:bg-brand-green-950 dark:text-brand-green-400 flex items-center justify-center text-lg font-bold">
                🌾
              </div>
              <h4 className="font-display text-sm font-semibold text-slate-800 dark:text-white mt-2">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE BENEFITS */}
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div className="space-y-4 max-w-lg">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold">Biological Rigor</span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Strict Food Safety Metrics</h3>
          <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
            Ashshuruk Ventures does not source from open-air unregulated live markets prone to avian influenza and soil-contamination lines. All poultry coops and greenhouse vegetable gardens operate under high bio-containment metrics.
          </p>

          <div className="space-y-3.5 text-xs pt-2">
            <div className="flex items-start space-x-2.5">
              <ShieldCheck className="h-5 w-5 text-brand-green-600 shrink-0" />
              <div>
                <h5 className="font-bold text-slate-800 dark:text-slate-200">Weekly Microbiological Testing</h5>
                <p className="text-[11px] text-slate-400">Routine laboratory testing of water buffers and bird feeds.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <Award className="h-5 w-5 text-brand-green-600 shrink-0" />
              <div>
                <h5 className="font-bold text-slate-800 dark:text-slate-200">100% Soil Traceability</h5>
                <p className="text-[11px] text-slate-400">Track vegetable gardens back to organic soil nitrogen formulas.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg h-72">
          <img 
            src="https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=600&q=80" 
            className="h-full w-full object-cover" 
            referrerPolicy="no-referrer"
          />
        </div>
      </section>
    </div>
  );
}
