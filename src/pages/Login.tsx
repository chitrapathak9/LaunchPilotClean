import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoIcon } from '../App';
import { ArrowRight, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

/* ── Shared Auth Components ── */

export function AuthBrandPanel({ headline }: { headline: React.ReactNode }) {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#8B5CF6] relative flex-col justify-between p-12 overflow-hidden">
      {/* Dot grid bg */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/[0.08] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <Link to="/" className="flex items-center gap-2.5 group mb-16">
          <LogoIcon className="w-8 h-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
          <span className="text-white font-bold text-lg tracking-[-0.02em]">
            Launch<span className="text-white">Pilot</span>
          </span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-10">
          {headline}
        </h1>

        <div className="space-y-4">
          {[
            'Instant access to your skills after purchase',
            'Track all your projects in one dashboard',
            'Get skill updates delivered to your account',
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-emerald-300 mt-0.5">✅</span>
              <span className="text-white/90 text-sm leading-relaxed">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Social proof */}
      <div className="relative z-10 mt-auto pt-12">
        <div className="flex items-center gap-3 mb-3">
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {['JR', 'KM', 'AL', 'DP'].map((initials, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-[#8B5CF6] flex items-center justify-center text-[10px] font-bold text-white">
                {initials}
              </div>
            ))}
          </div>
          <span className="text-white/90 text-sm font-medium">500+ founders already building</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-amber-300">⭐</span>
          <span className="text-white font-semibold">4.9 / 5</span>
          <span className="text-white/80">from early customers</span>
        </div>
      </div>
    </div>
  );
}

export function OAuthButton({ provider, icon }: { provider: string; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-3 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3.5 text-[#0F172A] text-sm font-bold hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all shadow-sm"
    >
      {icon}
      Continue with {provider}
    </button>
  );
}

export function OrDivider() {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-[#E2E8F0]" />
      <span className="text-[#94A3B8] text-xs font-bold uppercase tracking-wider">or</span>
      <div className="flex-1 h-px bg-[#E2E8F0]" />
    </div>
  );
}

export function AuthInput({
  label, type = 'text', placeholder, value, onChange, error, id,
}: {
  label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; error?: string; id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-[#0F172A] mb-1.5">{label} <span className="text-[#ef4444]">*</span></label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white border rounded-xl px-4 py-3 text-[#0F172A] text-sm placeholder-[#94A3B8] focus:outline-none transition-all shadow-sm font-medium ${
          error ? 'border-[#ef4444] focus:border-[#ef4444] focus:ring-4 focus:ring-[#ef4444]/20' : 'border-[#CBD5E1] focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/20'
        }`}
      />
      {error && <p className="mt-1.5 text-[#ef4444] text-xs flex items-center gap-1 font-medium"><AlertCircle size={12} />{error}</p>}
    </div>
  );
}

export function PasswordInput({
  label, placeholder, value, onChange, error, id,
}: {
  label: string; placeholder: string;
  value: string; onChange: (v: string) => void; error?: string; id: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-[#0F172A] mb-1.5">{label} <span className="text-[#ef4444]">*</span></label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-white border rounded-xl px-4 py-3 pr-12 text-[#0F172A] text-sm placeholder-[#94A3B8] focus:outline-none transition-all shadow-sm font-medium ${
            error ? 'border-[#ef4444] focus:border-[#ef4444] focus:ring-4 focus:ring-[#ef4444]/20' : 'border-[#CBD5E1] focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/20'
          }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] transition-colors"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-[#ef4444] text-xs flex items-center gap-1 font-medium"><AlertCircle size={12} />{error}</p>}
    </div>
  );
}

/* ── Google & GitHub SVG icons ── */
export const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0F172A">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

/* ── Login Page ── */
export function Login() {
  const navigate = useNavigate();
  const { login: authenticate } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setAuthError('');
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      await authenticate(email);
      navigate('/dashboard');
    } catch (err) {
      setAuthError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAF9F6]">
      <AuthBrandPanel
        headline={<>Good to have<br /><span className="text-white">you back.</span></>}
      />

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[480px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-10">
            <LogoIcon className="w-8 h-8 drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]" />
            <span className="text-[#0F172A] font-bold text-lg">Launch<span className="text-[#8B5CF6]">Pilot</span></span>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-[#0F172A] text-center mb-8">Welcome back</h2>

            {/* OAuth */}
            <div className="space-y-3">
              <OAuthButton provider="Google" icon={<GoogleIcon />} />
              <OAuthButton provider="GitHub" icon={<GitHubIcon />} />
            </div>

            <OrDivider />

            {/* Auth error */}
            {authError && (
              <div className="bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-xl px-4 py-3 mb-5 flex items-center gap-2">
                <AlertCircle size={16} className="text-[#ef4444] shrink-0" />
                <span className="text-[#ef4444] text-sm font-medium">{authError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <AuthInput id="login-email" label="Email" type="email" placeholder="your@email.com" value={email} onChange={setEmail} error={errors.email} />
              <PasswordInput id="login-password" label="Password" placeholder="••••••••••••" value={password} onChange={setPassword} error={errors.password} />

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-[#8B5CF6] text-sm font-bold hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8B5CF6] text-white font-bold py-3.5 rounded-xl hover:bg-[#7C3AED] transition-all shadow-lg shadow-[#8B5CF6]/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in…</> : <>Log In <ArrowRight size={16} /></>}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#E2E8F0] text-center">
              <span className="text-[#64748B] text-sm font-medium">Don't have an account? </span>
              <Link to="/signup" className="text-[#8B5CF6] text-sm font-bold hover:underline">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
