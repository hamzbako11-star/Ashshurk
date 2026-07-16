import React, { useState, useEffect } from 'react';
import { 
  Shield, Lock, Mail, User, CheckCircle, Eye, EyeOff, 
  AlertTriangle, ArrowRight, Sparkles, Sprout, Building2,
  Fingerprint, KeyRound, Check
} from 'lucide-react';

interface AuthViewProps {
  initialMode?: 'login' | 'register';
  setView: (view: string) => void;
  setUserRole: (role: 'customer' | 'supplier' | 'admin' | null) => void;
}

export default function AuthView({ initialMode = 'login', setView, setUserRole }: AuthViewProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'supplier' | 'admin'>('customer');
  const [farmName, setFarmName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password strength checker state
  const [strength, setStrength] = useState({
    score: 0, // 0 to 4
    label: 'Very Weak',
    color: 'bg-red-500'
  });

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setStrength({ score: 0, label: 'None', color: 'bg-gray-200' });
      return;
    }
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let label = 'Very Weak';
    let color = 'bg-red-500';
    if (score === 2) {
      label = 'Weak';
      color = 'bg-orange-400';
    } else if (score === 3) {
      label = 'Medium';
      color = 'bg-amber-400';
    } else if (score === 4) {
      label = 'Strong & Secure';
      color = 'bg-emerald-500';
    }

    setStrength({ score, label, color });
  }, [password]);

  // Seed default demo accounts to localStorage if not exists
  useEffect(() => {
    const existing = localStorage.getItem('ashshuruk_users');
    if (!existing) {
      const demoAccounts = [
        { name: 'Sandra James', email: 'sandra@gmail.com', password: 'sandra123', role: 'customer' },
        { name: 'Ibrahim Musa', email: 'ibrahim@farm.ng', password: 'ibrahim123', role: 'supplier', farmName: 'Abuja Poultry Hub' },
        { name: 'Admin Controller', email: 'admin@ashshuruk.com', password: 'admin123', role: 'admin' }
      ];
      localStorage.setItem('ashshuruk_users', JSON.stringify(demoAccounts));
    }
  }, []);

  // Quick credentials filler
  const handleFillDemo = (demoType: 'customer' | 'supplier' | 'admin') => {
    setMode('login');
    setErrorMsg('');
    if (demoType === 'customer') {
      setEmail('sandra@gmail.com');
      setPassword('sandra123');
    } else if (demoType === 'supplier') {
      setEmail('ibrahim@farm.ng');
      setPassword('ibrahim123');
    } else {
      setEmail('admin@ashshuruk.com');
      setPassword('admin123');
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    // Simulate network delay for premium realistic feel
    setTimeout(() => {
      const usersRaw = localStorage.getItem('ashshuruk_users') || '[]';
      let usersList = [];
      try {
        usersList = JSON.parse(usersRaw);
      } catch (e) {
        usersList = [];
      }

      if (mode === 'register') {
        // Sign Up validation
        if (!name) {
          setErrorMsg('Please write your full name.');
          setIsLoading(false);
          return;
        }

        const emailExists = usersList.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
          setErrorMsg('An account with this email already exists. Please Sign In instead.');
          setIsLoading(false);
          return;
        }

        const newUser = {
          name,
          email: email.toLowerCase(),
          password,
          role,
          farmName: role === 'supplier' ? farmName : undefined
        };

        usersList.push(newUser);
        localStorage.setItem('ashshuruk_users', JSON.stringify(usersList));

        // Authenticate immediately
        setUserRole(role);
        setSuccessMsg(`Welcome aboard, ${name}! Your secure agricultural profile has been registered.`);
        setIsLoading(false);

        setTimeout(() => {
          setView('dashboard');
        }, 1800);

      } else {
        // Sign In validation
        const foundUser = usersList.find(
          (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!foundUser) {
          setErrorMsg('Incorrect email or password credentials. Try our quick-fill demo links below!');
          setIsLoading(false);
          return;
        }

        setUserRole(foundUser.role);
        setSuccessMsg(`Authenticated successfully! Welcome back, ${foundUser.name}.`);
        setIsLoading(false);

        setTimeout(() => {
          setView('dashboard');
        }, 1500);
      }
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      
      <div className="overflow-hidden rounded-3xl border border-white/50 bg-white/45 backdrop-blur-xl shadow-2xl dark:border-slate-900/40 dark:bg-slate-950/45 grid md:grid-cols-12 min-h-[580px] spatial-card hover:shadow-brand-green-500/5">
        
        {/* LEFT PANEL: VISUAL / PROMOTION ILLUSTRATION (5 Cols) */}
        <div className="hidden md:flex md:col-span-5 bg-brand-green-950 relative flex-col justify-between p-8 text-white overflow-hidden select-none">
          {/* Back grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:30px_30px] opacity-10" />
          
          {/* Ambient image background */}
          <div className="absolute inset-0 opacity-40 hover:scale-105 transition duration-1000">
            <img 
              src="/src/assets/images/auth_agricultural_illustration_1784235434887.jpg" 
              alt="Agricultural modern illustration"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Black linear overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green-950 via-brand-green-950/70 to-transparent" />

          {/* Top badge logo */}
          <div className="z-10 flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-md">
              <Sprout className="h-5 w-5 text-brand-gold-light" />
            </div>
            <span className="font-display font-bold tracking-tight text-sm">Ashshuruk Portal</span>
          </div>

          {/* Bottom texts */}
          <div className="z-10 space-y-4">
            <span className="inline-block rounded-full bg-brand-gold/20 border border-brand-gold/40 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-brand-gold-light">
              Biosecurity Vetted
            </span>
            <h2 className="font-display text-lg sm:text-xl font-bold leading-snug">
              Unifying Buyers, Vets & Farmers Across Abuja
            </h2>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Experience Nigeria's most rigorous cold-chain logistics ledger. Direct wholesale broiler contracts, veterinary yolk-shell compliance tracking, and zero middle-men distribution pipelines.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: FORM INPUTS (7 Cols) */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-8">
          
          {/* Tab buttons switcher */}
          <div className="flex border-b border-gray-150 dark:border-slate-800 text-xs">
            <button
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 pb-3 font-bold transition border-b-2 text-center ${
                mode === 'login'
                  ? 'border-brand-green-600 text-brand-green-600 dark:text-brand-green-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              Sign In Account
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 pb-3 font-bold transition border-b-2 text-center ${
                mode === 'register'
                  ? 'border-brand-green-600 text-brand-green-600 dark:text-brand-green-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              Create New Account
            </button>
          </div>

          {/* Core messages */}
          <div className="space-y-1.5 text-xs text-center md:text-left">
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
              {mode === 'login' ? 'Welcome Back to Ashshuruk' : 'Become an Approved Supplier or Buyer'}
            </h3>
            <p className="text-slate-450 text-[11px]">
              {mode === 'login' 
                ? 'Sign in below to verify order tracking logs, cold storage dispatches, or register farm stocks.' 
                : 'Complete the parameters to configure your personalized dashboard role.'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
            
            {/* Full Name for register */}
            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="font-bold text-slate-600 dark:text-slate-300 flex items-center">
                  <User className="h-3.5 w-3.5 mr-1 text-slate-400" /> Full Name / Registered Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sandra James"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-600 dark:text-slate-300 flex items-center">
                <Mail className="h-3.5 w-3.5 mr-1 text-slate-400" /> Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="e.g. buyer@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-600 dark:text-slate-300 flex items-center">
                  <KeyRound className="h-3.5 w-3.5 mr-1 text-slate-400" /> Password *
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('Password recovery simulated! Check support token instructions.')}
                    className="text-[10px] text-brand-green-600 hover:underline font-bold dark:text-brand-green-400"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-2.5 pl-3 pr-10 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-green-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password strength visualizer for Sign Up */}
              {mode === 'register' && password && (
                <div className="pt-2 space-y-1 animate-fade-in">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Password Strength:</span>
                    <span className="font-bold text-slate-600 dark:text-slate-300">{strength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-850">
                    <div 
                      className={`h-full transition-all duration-300 ${strength.color}`} 
                      style={{ width: `${(strength.score / 4) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Role selection & farm/cooperative metadata for signup */}
            {mode === 'register' && (
              <div className="grid gap-3 sm:grid-cols-2 pt-1">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-600 dark:text-slate-300 flex items-center">
                    <Fingerprint className="h-3.5 w-3.5 mr-1 text-slate-400" /> Account Primary Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full rounded-lg border border-gray-200 bg-white py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="customer">Shopper / Bulk Buyer</option>
                    <option value="supplier">Cooperative Supplier / Farmer</option>
                    <option value="admin">Administrative Veterinarian</option>
                  </select>
                </div>

                {role === 'supplier' && (
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="font-bold text-slate-600 dark:text-slate-300 flex items-center">
                      <Building2 className="h-3.5 w-3.5 mr-1 text-slate-400" /> Farm/Cooperative Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Garki Broiler Co."
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-2.5 px-3 outline-none focus:border-brand-green-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Feedback notifications */}
            {errorMsg && (
              <div className="rounded-xl bg-red-50 text-red-700 p-3 font-semibold border border-red-100 flex items-start space-x-2 animate-bounce-short">
                <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="rounded-xl bg-emerald-50 text-emerald-700 p-3 font-semibold border border-emerald-100 flex items-start space-x-2 animate-fade-in">
                <CheckCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 animate-pulse" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-brand-green-600 hover:bg-brand-green-700 text-white py-3 text-xs font-bold transition flex items-center justify-center space-x-2 shadow-md shadow-brand-green-600/10 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Configuring Profile Ledger...</span>
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4" />
                  <span>{mode === 'login' ? 'Authorize Secure Sign In' : 'Register Agricultural Profile'}</span>
                </>
              )}
            </button>
          </form>

          {/* DEMO ACCOUNTS QUICK TEST DESK */}
          <div className="rounded-xl border border-dashed border-gray-200 bg-slate-50/50 p-4 space-y-2.5 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold flex items-center">
                <Sparkles className="h-3 w-3 mr-1 text-brand-gold animate-pulse" /> Sandbox Quick Test desk
              </span>
              <span className="text-[9px] text-slate-400">Skip registration</span>
            </div>
            
            <div className="grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => handleFillDemo('customer')}
                className="flex items-center justify-center space-x-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 py-1.5 text-[10px] font-bold text-slate-750 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-850"
              >
                <span>👤 Customer</span>
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('supplier')}
                className="flex items-center justify-center space-x-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 py-1.5 text-[10px] font-bold text-slate-750 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-850"
              >
                <span>🌾 Supplier</span>
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="flex items-center justify-center space-x-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 py-1.5 text-[10px] font-bold text-slate-750 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-850"
              >
                <span>🔑 Admin</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
