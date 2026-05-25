import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth, PlanType } from '../contexts/AuthContext';
import { Loader2, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { LogoIcon } from '../App';

const PLAN_DETAILS: Record<string, { name: string, price: number }> = {
  'starter': { name: 'Single Skill', price: 29 },
  'builder': { name: 'Builder Bundle', price: 149 },
  'full-arsenal': { name: 'Full Arsenal', price: 299 },
  'starter-bundle': { name: 'Starter Bundle', price: 19 },
  'builder-bundle': { name: 'Builder Bundle', price: 29 },
  'fullstack': { name: 'Full Stack', price: 59 },
  'starter-mvp': { name: 'Starter MVP', price: 4999 },
  'full-product': { name: 'Full Product', price: 9999 },
};

export function StripeCheckoutMock() {
  const [searchParams, setSearchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'builder';
  const priceParam = searchParams.get('price');

  // Dynamic resolution for high-end MVP pricing and low-end catalog pricing
  let resolvedPlanKey = plan;
  if (plan === 'starter' && priceParam === '4999') {
    resolvedPlanKey = 'starter-mvp';
  } else if (plan === 'builder' && priceParam === '9999') {
    resolvedPlanKey = 'full-product';
  }

  const basePlanInfo = PLAN_DETAILS[resolvedPlanKey] || PLAN_DETAILS.builder;
  const planInfo = {
    ...basePlanInfo,
    price: priceParam ? parseInt(priceParam, 10) : basePlanInfo.price
  };

  const navigate = useNavigate();
  const { login, updatePlan, isAuthenticated } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-fill some fake card details
  const [email, setEmail] = useState('user@example.com');

  useEffect(() => {
    // If logged in, grab their email
    const saved = localStorage.getItem('launchpilot_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u && u.email) setEmail(u.email);
      } catch (e) {}
    }
  }, []);

  const completeCheckoutAndRedirect = async () => {
    setSuccess(true);
    if (!isAuthenticated) {
      await login(email);
    }

    let targetPlan: PlanType = 'builder';
    if (resolvedPlanKey === 'starter-mvp') {
      targetPlan = 'builder';
    } else if (resolvedPlanKey === 'full-product') {
      targetPlan = 'full-arsenal';
    } else if (resolvedPlanKey === 'starter' || resolvedPlanKey === 'starter-bundle') {
      targetPlan = 'starter';
    } else if (resolvedPlanKey === 'full-arsenal' || resolvedPlanKey === 'fullstack') {
      targetPlan = 'full-arsenal';
    }
    updatePlan(targetPlan);

    // Redirect to dashboard after showing success message
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase environment variables are missing.');
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/process-custom-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          planId: resolvedPlanKey,
          price: planInfo.price,
          email: email,
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      await completeCheckoutAndRedirect();
    } catch (err: any) {
      console.warn('[stripe-payment] Sandbox API failed, falling back to successful mock transaction:', err);
      await completeCheckoutAndRedirect();
    }
  };



  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-200">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
          <p className="text-slate-500 mb-8">Your account has been upgraded. Redirecting you to your dashboard...</p>
          <Loader2 size={24} className="animate-spin text-[#8B5CF6] mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Left side: Order Summary */}
      <div className="w-full md:w-1/2 lg:w-2/5 p-8 md:p-12 lg:p-20 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col">
        <div className="flex items-center gap-2 mb-16">
          <LogoIcon className="w-8 h-8" />
          <span className="font-bold text-xl text-slate-900">Launch<span className="text-[#8B5CF6]">Pilot</span></span>
        </div>

        <div className="flex-1">
          <p className="text-slate-500 font-semibold mb-2 uppercase text-xs tracking-wider">Checkout for</p>
          <h1 className="text-3xl font-bold text-slate-900 mb-8">{planInfo.name}</h1>
          
          <div className="flex justify-between items-center text-xl font-medium text-slate-900 mb-6">
            <span>Total due</span>
            <span className="font-bold">${planInfo.price}.00</span>
          </div>

          {/* Interactive Plan Selector for MVP Packages */}
          {(resolvedPlanKey === 'starter-mvp' || resolvedPlanKey === 'full-product') && (
            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Select Package Plan</p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setSearchParams({ plan: 'starter', price: '4999' })}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                    resolvedPlanKey === 'starter-mvp'
                      ? 'border-violet-600 bg-violet-50/50 text-slate-900 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-650 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs text-slate-900">Starter MVP</p>
                    <p className="text-[10px] text-slate-500">21-day rapid build</p>
                  </div>
                  <span className="font-bold text-sm text-slate-900">$4,999</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSearchParams({ plan: 'builder', price: '9999' })}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                    resolvedPlanKey === 'full-product'
                      ? 'border-violet-600 bg-violet-50/50 text-slate-900 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-650 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs text-slate-900">Full Product</p>
                    <p className="text-[10px] text-slate-500">AI integration + support</p>
                  </div>
                  <span className="font-bold text-sm text-slate-900">$9,999</span>
                </button>
              </div>
            </div>
          )}

          {/* Interactive Plan Selector for Catalog/Bundle Tiers */}
          {(resolvedPlanKey === 'starter-bundle' || resolvedPlanKey === 'builder-bundle' || resolvedPlanKey === 'full-arsenal' || resolvedPlanKey === 'fullstack' || plan === 'starter' || plan === 'builder' || plan === 'full-arsenal') && resolvedPlanKey !== 'starter-mvp' && resolvedPlanKey !== 'full-product' && (
            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Select Bundle Plan</p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setSearchParams({ plan: 'starter-bundle', price: '19' })}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                    resolvedPlanKey === 'starter-bundle' || (plan === 'starter' && priceParam === '19')
                      ? 'border-violet-600 bg-violet-50/50 text-slate-900 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-650 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs text-slate-900">Starter Bundle</p>
                    <p className="text-[10px] text-slate-500">2 core skill files</p>
                  </div>
                  <span className="font-bold text-sm text-slate-900">$19</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSearchParams({ plan: 'builder-bundle', price: '29' })}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                    resolvedPlanKey === 'builder-bundle' || (plan === 'builder' && priceParam === '29')
                      ? 'border-violet-600 bg-violet-50/50 text-slate-900 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-650 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs text-slate-900">Builder Bundle</p>
                    <p className="text-[10px] text-slate-500">3 custom pick files</p>
                  </div>
                  <span className="font-bold text-sm text-slate-900">$29</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSearchParams({ plan: 'full-arsenal', price: '59' })}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                    resolvedPlanKey === 'full-arsenal' || resolvedPlanKey === 'fullstack' || priceParam === '59'
                      ? 'border-violet-600 bg-violet-50/50 text-slate-900 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-650 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs text-slate-900">Full Arsenal</p>
                    <p className="text-[10px] text-slate-500">All current & future skills</p>
                  </div>
                  <span className="font-bold text-sm text-slate-900">$59</span>
                </button>
              </div>
            </div>
          )}

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3 mt-8">
            <ShieldCheck size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <strong>Secure Checkout</strong><br/>
              This is a simulated checkout page for LaunchPilot. No real money will be charged.
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Payment form */}
      <div className="w-full md:w-1/2 lg:w-3/5 p-8 md:p-12 lg:p-20 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Payment Details</h2>
            <p className="text-slate-500 text-sm">Complete your purchase using a secure connection.</p>
          </div>

          <form onSubmit={handlePay} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 focus:border-[#8B5CF6] transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div className="bg-white border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#8B5CF6]/50 focus-within:border-[#8B5CF6] transition-all">
              <div className="border-b border-slate-200">
                <label className="sr-only">Card number</label>
                <div className="px-4 py-3 flex items-center gap-2">
                  <input type="text" className="w-full outline-none bg-transparent" value="4242 4242 4242 4242" readOnly />
                  <div className="flex gap-1">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white flex items-center justify-center text-[8px] font-bold italic">VISA</div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 border-r border-slate-200">
                  <label className="sr-only">Expiration date</label>
                  <input type="text" className="w-full px-4 py-3 outline-none bg-transparent" value="12 / 28" readOnly />
                </div>
                <div className="w-1/2 relative">
                  <label className="sr-only">CVC</label>
                  <input type="text" className="w-full px-4 py-3 outline-none bg-transparent" value="123" readOnly />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Name on card</label>
              <input 
                type="text" 
                required 
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 focus:border-[#8B5CF6] transition-all"
                placeholder="Jane Doe"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#8B5CF6] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#7C3AED] transition-all disabled:opacity-70 mt-4"
            >
              {loading ? (
                <>Processing <Loader2 size={18} className="animate-spin ml-2" /></>
              ) : (
                <>Pay ${planInfo.price}.00 <Lock size={16} /></>
              )}
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">Payments are secure and encrypted.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

