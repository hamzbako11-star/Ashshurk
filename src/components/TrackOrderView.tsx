import React, { useState } from 'react';
import { 
  Truck, Search, ClipboardList, CheckCircle2, Package, MapPin, 
  Sparkles, Calendar, User, Clock, AlertTriangle, HelpCircle
} from 'lucide-react';
import { Order } from '../types';

interface TrackOrderViewProps {
  order: Order | null;
  setView: (view: string) => void;
}

export default function TrackOrderView({ order, setView }: TrackOrderViewProps) {
  const defaultTrackId = order?.trackingNumber || 'ASH-48291-NGA';
  const [trackId, setTrackId] = useState(defaultTrackId);
  const [searchedId, setSearchedId] = useState(defaultTrackId);
  const [loading, setLoading] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      setSearchedId(trackId.trim().toUpperCase());
      setLoading(false);
    }, 800);
  };

  const steps = [
    {
      title: 'Order Received & Verified',
      desc: 'Our agricultural desks have verified your payment option and assigned items to coops.',
      time: '11:15 AM',
      status: 'completed',
      icon: '📝'
    },
    {
      title: 'Slaughtering & Bio-Sanitizing',
      desc: 'Live broilers slaughtered, meticulously defeathered, and vegetables bio-rinsed with purified water.',
      time: '12:30 PM',
      status: 'completed',
      icon: '🧼'
    },
    {
      title: 'Insulated Cold-Chain Packaging',
      desc: 'Processed items packed into ice-lined, vacuum-sealed thermal coolers to shield from sun heat.',
      time: '01:10 PM',
      status: 'completed',
      icon: '❄️'
    },
    {
      title: 'Out for Dispatch Delivery',
      desc: 'Our logistics dispatch rider (Rider: Ibrahim Musa, +234 809 112 3345) has loaded your cargo.',
      time: '02:00 PM',
      status: 'active',
      icon: '🏍️'
    },
    {
      title: 'Completed & Inspected',
      desc: 'Rider completes delivery. Customer inspects and accepts fresh quality crops.',
      time: 'Estimated 04:30 PM',
      status: 'future',
      icon: '🎁'
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      {/* Search Header */}
      <div className="rounded-3xl bg-brand-green-700 p-8 text-white shadow-xl mb-8">
        <div className="max-w-xl space-y-3">
          <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold bg-black/20 px-2 py-0.5 rounded-full font-bold">
            REAL-TIME LOGISTICS TRACKING
          </span>
          <h2 className="font-display text-2xl font-bold tracking-tight">Track Your Farm Fresh Delivery</h2>
          <p className="text-xs text-brand-green-100">
            Enter your 12-digit tracking number below to audit our sanitary preparation, cooling states, and live motorcycle coordinates.
          </p>

          <form onSubmit={handleTrackSubmit} className="flex gap-2 pt-2">
            <input
              type="text"
              required
              placeholder="e.g. ASH-48291-NGA"
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm placeholder-white/60 outline-none border border-white/20 focus:border-white focus:bg-white/20 transition text-white font-mono"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-white px-6 py-3 text-xs font-bold text-brand-green-700 hover:bg-brand-gold-light hover:text-brand-gold transition duration-200"
            >
              {loading ? 'Polling...' : 'Track Cargo'}
            </button>
          </form>
        </div>
      </div>

      {/* Tracking Results Card */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xl dark:border-slate-850 dark:bg-slate-900">
        
        {/* Quick summary line */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-8 dark:border-slate-800">
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-bold">Cargo ID reference</span>
            <h3 className="font-mono text-sm font-bold text-slate-800 dark:text-white mt-1">
              {searchedId}
            </h3>
          </div>
          
          <div className="flex items-center space-x-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              CARGO IN TRANSIT
            </span>
          </div>
        </div>

        {/* Milestone Vertical Timeline */}
        <div className="space-y-8 relative before:absolute before:left-5 before:top-2 before:h-[92%] before:w-0.5 before:bg-gray-100 dark:before:bg-slate-850">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className={`flex items-start gap-4 relative animate-fade-in ${
                step.status === 'future' ? 'opacity-50' : 'opacity-100'
              }`}
            >
              {/* Timeline bubble */}
              <div className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-base shadow-sm ${
                step.status === 'completed' 
                  ? 'bg-brand-green-50 border-brand-green-200 text-brand-green-700 dark:bg-brand-green-950 dark:border-brand-green-800'
                  : step.status === 'active'
                  ? 'bg-brand-gold-light border-brand-gold text-brand-gold animate-pulse'
                  : 'bg-white border-gray-200 text-slate-400 dark:bg-slate-900 dark:border-slate-800'
              }`}>
                {step.status === 'completed' ? <CheckCircle2 className="h-5 w-5 text-brand-green-600" /> : <span>{step.icon}</span>}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h4 className={`text-xs font-bold ${step.status === 'active' ? 'text-brand-gold' : 'text-slate-800 dark:text-white'}`}>
                    {step.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold">{step.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed dark:text-slate-450">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Courier details banner */}
        <div className="mt-10 rounded-2xl bg-slate-50/50 p-4 border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 dark:bg-slate-950 dark:border-slate-850">
          <div className="flex items-center space-x-3 text-xs">
            <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" 
                className="h-full w-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-white">Ibrahim Musa</p>
              <p className="text-[10px] text-slate-400">Logistics dispatch Rider • Abuja HQ</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+2348091123345"
              className="rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-600 transition dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              📞 Call Rider
            </a>
            
            <a
              href="https://wa.me/2348123456789"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 text-xs font-bold transition flex items-center"
            >
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
