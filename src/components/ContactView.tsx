import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Send, MessageSquare, Clock, 
  CheckCircle2, Sparkles, Navigation, ShieldCheck
} from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('customer-support');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-16">
      
      {/* Title */}
      <section className="text-center max-w-xl mx-auto">
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green-600 font-bold">
          CONCIERGE HELP DESK
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1 dark:text-white">
          Get in Touch With Our Farms
        </h2>
        <p className="text-xs text-slate-500 mt-1.5">
          Have an inquiry about live broiler transport weights or custom organic vegetable contracts? Contact our administrative desk.
        </p>
      </section>

      {/* Main Grid */}
      <section className="grid gap-10 lg:grid-cols-12 items-start">
        
        {/* 1. CONTACT INFO COL (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-5">
            <h3 className="font-display text-sm font-bold text-slate-850 dark:text-white">Contact Information</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-600 dark:bg-brand-green-950 dark:text-brand-green-400 shrink-0">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">Abuja Head Office Hub</h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">Plot 482, Ag-Logistics Zone, Garki, Abuja, FCT, Nigeria.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-600 dark:bg-brand-green-950 dark:text-brand-green-400 shrink-0">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">Agricultural Helpline</h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">+234 812 345 6789</p>
                  <p className="text-[10px] text-slate-400">Available 8 AM - 6 PM Daily</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-600 dark:bg-brand-green-950 dark:text-brand-green-400 shrink-0">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">Email Inquiries</h4>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">support@ashshurukventures.com</p>
                  <p className="text-slate-500 dark:text-slate-400">corporate@ashshurukventures.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* SIMULATED GOOGLE MAP */}
          <div className="rounded-2xl border border-gray-150 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center">
              <Navigation className="h-4 w-4 mr-1 text-brand-green-600" /> Map Coordinates (Abuja Logistics Zone)
            </h4>
            
            {/* Visual Vector Map representation */}
            <div className="relative h-44 rounded-xl bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200/60 flex items-center justify-center text-center p-4">
              {/* background grids simulation */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />
              <div className="absolute top-1/2 left-1/3 h-2 w-12 bg-emerald-100 dark:bg-emerald-950/40 rounded-full blur-sm" />
              <div className="absolute top-1/4 right-1/4 h-2 w-12 bg-amber-100 dark:bg-amber-950/40 rounded-full blur-sm" />

              <div className="z-10 space-y-1.5">
                <span className="text-2xl animate-bounce block">📍</span>
                <p className="text-[10px] font-bold text-slate-800 dark:text-white">Ashshuruk Cold-Storage Warehouses</p>
                <p className="text-[9px] text-slate-400">9.0578° N, 7.4951° E • Garki, Abuja</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. FORM COL (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-gray-150 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-display text-sm font-bold text-slate-850 dark:text-white mb-4 flex items-center">
            <MessageSquare className="h-4.5 w-4.5 mr-1.5 text-brand-green-600" /> Send an Administrative Message
          </h3>

          <form onSubmit={handleMessageSubmit} className="space-y-4 text-xs">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-600 dark:text-slate-300">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sandra James"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600 dark:text-slate-300">Your Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sandra@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-600 dark:text-slate-300">Inquiry Subject Category</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 bg-white outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              >
                <option value="customer-support">Customer Care & Active Deliveries</option>
                <option value="farmer-onboarding">Farmer Cooperative Supplier Sign-Up</option>
                <option value="corporate-sales">Corporate B2B Contract Procurement</option>
                <option value="quality-assurance">Veterinary Checkups & Bio-Sanitation</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-600 dark:text-slate-300">Detailed Message *</label>
              <textarea
                required
                rows={5}
                placeholder="Write your agricultural or wholesale supply inquiries..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white text-xs h-28"
              />
            </div>

            {success && (
              <div className="rounded-lg bg-emerald-50 text-emerald-700 p-3 font-bold border border-emerald-100 flex items-center space-x-1.5 animate-fade-in">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>Message Dispatched! Thank you sandra. We will return a support token to your email within 6 Hours.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-green-600 hover:bg-brand-green-700 text-white py-3 text-xs font-bold transition flex items-center justify-center space-x-1 shadow-md shadow-brand-green-600/10"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Secure Message</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
