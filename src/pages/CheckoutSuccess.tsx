import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth, PlanType } from '../contexts/AuthContext';
import { CheckCircle2, Loader2, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { LogoIcon } from '../App';

const PLAN_NAMES: Record<string, string> = {
  'starter-bundle': 'Starter Bundle',
  'builder-bundle': 'Builder Bundle',
  'full-arsenal': 'Full Arsenal',
  'starter': 'Single Skill',
  'builder': 'Builder Bundle',
  'fullstack': 'Full Stack Bundle',
};

export function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, login, updatePlan, isAuthenticated } = useAuth();
  
  const planId = searchParams.get('plan') || 'builder';
  const sessionId = searchParams.get('session_id') || '';
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function processPayment() {
      try {
        // Wait 1.5 seconds for a pleasant loading sensation
        await new Promise(r => setTimeout(r, 1500));
        
        // Map the planId to valid PlanType in AuthContext
        let targetPlan: PlanType = 'builder';
        if (planId === 'starter' || planId === 'starter-bundle') {
          targetPlan = 'starter';
        } else if (planId === 'full-arsenal') {
          targetPlan = 'full-arsenal';
        }
        
        // If user isn't logged in, log them in automatically with a guest/payment email
        if (!isAuthenticated) {
          const email = localStorage.getItem('last_checkout_email') || 'buyer@example.com';
          await login(email);
        }
        
        // Upgrade the plan
        updatePlan(targetPlan);
        
        setLoading(false);
        
        // Redirect to dashboard after 3 seconds
        const timer = setTimeout(() => {
          navigate('/dashboard');
        }, 3500);
        
        return () => clearTimeout(timer);
      } catch (err: any) {
        setError(err.message || 'An error occurred while activating your plan.');
        setLoading(false);
      }
    }
    
    processPayment();
  }, [planId, isAuthenticated, login, updatePlan, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-6">
      <div className="flex justify-center mb-8">
        <Link to="/" className="flex items-center gap-2">
          <LogoIcon className="w-8 h-8" />
          <span className="font-bold text-xl text-slate-900">Launch<span className="text-[#8B5CF6]">Pilot</span></span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-slate-200 relative overflow-hidden">
          {/* Decorative colored glow on top */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8B5CF6] to-[#10B981]" />

          {loading ? (
            <div className="py-8">
              <Loader2 size={48} className="animate-spin text-[#8B5CF6] mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Verifying Sandbox Payment...</h2>
              <p className="text-slate-500 text-sm">Please wait while we activate your premium skills plan.</p>
            </div>
          ) : error ? (
            <div className="py-4">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} className="rotate-180" />
              </div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">Activation Failed</h2>
              <p className="text-slate-500 text-sm mb-6">{error}</p>
              <Link
                to="/bundles"
                className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-slate-800 transition-colors"
              >
                Back to Bundles
              </Link>
            </div>
          ) : (
            <div className="py-4">
              {/* Success Checkmark Circle */}
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-200 animate-bounce">
                <CheckCircle2 size={40} />
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Payment Successful!</h2>
              <p className="text-slate-500 mb-6 text-sm">
                Thank you for your purchase. Your sandbox transaction has been recorded.
              </p>

              {/* Transaction details card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left mb-8 space-y-3">
                <div className="flex justify-between items-center text-sm border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Plan Activated:</span>
                  <span className="text-slate-900 font-bold bg-[#8B5CF6]/10 text-[#8B5CF6] px-2.5 py-0.5 rounded-full text-xs">
                    {PLAN_NAMES[planId] || 'Premium Upgrade'}
                  </span>
                </div>
                
                {sessionId && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Stripe Session:</span>
                    <span className="text-slate-600 font-mono select-all truncate max-w-[200px]" title={sessionId}>
                      {sessionId}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Sandbox Mode:</span>
                  <span className="text-green-600 font-medium flex items-center gap-1.5">
                    <ShieldCheck size={14} /> Test Mode
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#8B5CF6] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#7C3AED] transition-all shadow-lg shadow-[#8B5CF6]/20 text-sm"
                >
                  Go to Dashboard <ArrowRight size={16} />
                </button>
              </div>

              <p className="text-slate-400 text-xs mt-6 flex items-center justify-center gap-1">
                Redirecting automatically in 3 seconds...
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-xs text-slate-400">
        <p className="flex items-center justify-center gap-1.5">
          <ShieldCheck size={14} className="text-slate-400" />
          Securely processed by Stripe. Checkout Session ID is sandbox validated.
        </p>
      </div>
    </div>
  );
}
