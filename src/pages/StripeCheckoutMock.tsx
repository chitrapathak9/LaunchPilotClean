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
};

export function StripeCheckoutMock() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'builder';
  const priceParam = searchParams.get('price');
  
  const basePlanInfo = PLAN_DETAILS[plan] || PLAN_DETAILS.builder;
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

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network latency for payment processing
    await new Promise(r => setTimeout(r, 2000));
    
    setSuccess(true);
    
    // Auto login / update plan
    if (!isAuthenticated) {
      await login(email);
    }
    updatePlan(plan as PlanType);

    // Redirect to dashboard after showing success
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
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
          <p className="text-slate-500 font-semibold mb-2 uppercase text-xs tracking-wider">Subscribe to</p>
          <h1 className="text-3xl font-bold text-slate-900 mb-8">{planInfo.name}</h1>
          
          <div className="flex justify-between items-center text-xl font-medium text-slate-900 mb-6">
            <span>Total</span>
            <span className="font-bold">${planInfo.price}.00</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3 mt-12">
            <ShieldCheck size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Secure Checkout</strong><br/>
              This is a simulated checkout page for LaunchPilot. No real money will be charged.
            </p>
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
                  <input type="text" className="w-full outline-none" value="4242 4242 4242 4242" readOnly />
                  <div className="flex gap-1">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white flex items-center justify-center text-[8px] font-bold italic">VISA</div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="w-1/2 border-r border-slate-200">
                  <label className="sr-only">Expiration date</label>
                  <input type="text" className="w-full px-4 py-3 outline-none" value="12 / 28" readOnly />
                </div>
                <div className="w-1/2 relative">
                  <label className="sr-only">CVC</label>
                  <input type="text" className="w-full px-4 py-3 outline-none" value="123" readOnly />
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
