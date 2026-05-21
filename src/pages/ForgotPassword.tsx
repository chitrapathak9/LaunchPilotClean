import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from '../App';
import { ArrowRight, ArrowLeft, Loader2, AlertCircle, Mail } from 'lucide-react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setError('');
    if (!email) { setError('Email is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email'); return; }
    setLoading(true);
    // Simulate API call — replace with real Supabase / Clerk call
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6 py-12">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#8B5CF6]/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[440px] relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <LogoIcon className="w-8 h-8 drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]" />
          <span className="text-slate-900 font-bold text-lg tracking-[-0.02em]">
            Launch<span className="text-[#8B5CF6]">Pilot</span>
          </span>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 md:p-10">
          {sent ? (
            /* ── Success state ── */
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-6">
                <Mail size={28} className="text-[#8B5CF6]" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">📬 Check your inbox</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-2">
                We sent a reset link to
              </p>
              <p className="text-slate-900 font-semibold text-sm mb-6">{email}</p>
              <p className="text-slate-400 text-xs mb-8">If you don't see it, check spam.</p>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-[#8B5CF6] font-semibold text-sm hover:underline"
              >
                <ArrowLeft size={14} /> Back to login
              </Link>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              <h2 className="text-2xl font-bold text-slate-900 text-center mb-3">Reset your password</h2>
              <p className="text-slate-500 text-sm text-center leading-relaxed mb-8">
                Enter your email and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-medium text-slate-900 mb-1.5">
                    Email <span className="text-[#ef4444]">*</span>
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 focus:outline-none transition-all ${
                      error ? 'border-[#ef4444] focus:border-[#ef4444]' : 'border-slate-200 focus:border-[#8B5CF6] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]'
                    }`}
                  />
                  {error && (
                    <p className="mt-1.5 text-[#ef4444] text-xs flex items-center gap-1">
                      <AlertCircle size={12} />{error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#8B5CF6] text-white font-bold py-3.5 rounded-xl hover:bg-[#7C3AED] transition-all shadow-lg shadow-[#8B5CF6]/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending…</>
                  ) : (
                    <>Send Reset Link <ArrowRight size={16} /></>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                <span className="text-slate-500 text-sm">Remember your password? </span>
                <Link to="/login" className="text-[#8B5CF6] text-sm font-semibold hover:underline">Log in →</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
