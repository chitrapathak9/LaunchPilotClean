import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoIcon } from '../App';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { AuthBrandPanel, OAuthButton, OrDivider, AuthInput, PasswordInput, GoogleIcon, GitHubIcon } from './Login';
import { useAuth } from '../contexts/AuthContext';

/* ── Password Strength ── */
function PasswordStrengthBar({ password }: { password: string }) {
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  if (!password) return null;

  const levels = [
    { label: 'Weak', color: '#ef4444', width: '20%' },
    { label: 'Weak', color: '#ef4444', width: '40%' },
    { label: 'Moderate', color: '#eab308', width: '60%' },
    { label: 'Strong', color: '#10B981', width: '80%' },
    { label: 'Very Strong', color: '#10B981', width: '100%' },
  ];
  const level = levels[Math.min(strength, 4)];

  return (
    <div className="mt-2">
      <div className="h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: level.width, backgroundColor: level.color }}
        />
      </div>
      <p className="text-xs mt-1 font-bold" style={{ color: level.color }}>{level.label}</p>
    </div>
  );
}

/* ── Signup Page ── */
export function Signup() {
  const navigate = useNavigate();
  const { signup: authenticateSignup } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name || name.length < 2) e.name = 'Name must be at least 2 characters';
    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'At least 8 characters';
    else if (!/[A-Z]/.test(password)) e.password = 'Include at least 1 uppercase letter';
    else if (!/[0-9]/.test(password)) e.password = 'Include at least 1 number';
    if (!agreeTerms) e.agreeTerms = 'You must agree to the Terms of Service';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      await authenticateSignup(name, email);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ ...errors, submit: 'Failed to create account. Please try again.' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAF9F6]">
      <AuthBrandPanel
        headline={<>Start shipping<br />faster <span className="text-white">today.</span></>}
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
            <h2 className="text-2xl font-bold text-[#0F172A] text-center mb-8">Create your account</h2>

            {/* OAuth */}
            <div className="space-y-3">
              <OAuthButton provider="Google" icon={<GoogleIcon />} />
              <OAuthButton provider="GitHub" icon={<GitHubIcon />} />
            </div>

            <OrDivider />

            <form onSubmit={handleSubmit} className="space-y-5">
              <AuthInput id="signup-name" label="Full Name" placeholder="Your full name" value={name} onChange={setName} error={errors.name} />
              <AuthInput id="signup-email" label="Email" type="email" placeholder="your@email.com" value={email} onChange={setEmail} error={errors.email} />

              <div>
                <PasswordInput id="signup-password" label="Password" placeholder="Create a strong password" value={password} onChange={setPassword} error={errors.password} />
                <PasswordStrengthBar password={password} />
              </div>

              <div className="flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 bg-white border border-[#CBD5E1] rounded text-[#8B5CF6] focus:ring-[#8B5CF6] focus:ring-offset-0 focus:ring-offset-transparent accent-[#8B5CF6]"
                />
                <label htmlFor="agreeTerms" className="text-[#64748B] text-xs leading-relaxed flex-1 cursor-pointer select-none">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#0F172A] hover:text-[#8B5CF6] font-bold underline">Terms of Service</Link> and{' '}
                  <Link to="#" className="text-[#0F172A] hover:text-[#8B5CF6] font-bold underline">Privacy Policy</Link>
                </label>
              </div>
              {errors.agreeTerms && <p className="mt-1.5 text-[#ef4444] text-xs flex items-center gap-1 font-medium"><AlertCircle size={12} />{errors.agreeTerms}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-5 bg-[#8B5CF6] text-white font-bold py-3.5 rounded-xl hover:bg-[#7C3AED] transition-all shadow-lg shadow-[#8B5CF6]/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <><Loader2 size={18} className="animate-spin" /> Creating account…</> : <>Create Account <ArrowRight size={16} /></>}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#E2E8F0] text-center">
              <span className="text-[#64748B] text-sm font-medium">Already have an account? </span>
              <Link to="/login" className="text-[#8B5CF6] text-sm font-bold hover:underline">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
