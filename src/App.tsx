import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Sparkles, Rocket, Activity, PieChart, Layers,
  Target, Twitter, Globe, Mail, Check, TrendingUp, ArrowRight,
  MoveRight, User
} from 'lucide-react';
import { supabase } from './lib/supabase';
import { analyzeIdea } from './lib/gemini';
import type { AnalysisResult } from './lib/gemini';

import {
  LogoStrip,
  FeatureGrid,
  HowItWorks,
  ProductGallery,
  SkillPreview,
  FounderStory,
  Testimonials,
  PricingPreview,
  NewsletterSection
} from './components/LandingSections';

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useReveal(ref: React.RefObject<HTMLElement | null>, delay = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (delay) el.style.transitionDelay = `${delay}ms`;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, delay]);
}

// ─── Logo ──────────────────────────────────────────────────────────────────────
export function LogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3.5 3.5" opacity="0.8" />
      <polygon points="16,7 9,18 23,18" fill="#A855F7" />
      <polygon points="9,17 16,11 23,17 20,25 16,21 12,25" fill="#6D28D9" />
      <circle cx="16" cy="16" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Skills', path: '/skills' },
    { name: 'Bundles', path: '/bundles' },
    { name: 'Demo', path: '/demo' },
    { name: 'Pricing', path: '/pricing' }
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#FAF9F6]/90 backdrop-blur-md border-b border-slate-200 shadow-sm' : 'bg-transparent border-b border-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <LogoIcon className="w-8 h-8 drop-shadow-[0_0_8px_rgba(139,92,246,0.3)] transition-transform group-hover:scale-105" />
          <span className="text-slate-900 font-bold text-[17px] tracking-[-0.02em]">
            Launch<span className="text-[#8B5CF6]">Pilot</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.name}
              to={l.path}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-all duration-150 ${
                location.pathname === l.path
                  ? 'text-[#8B5CF6] bg-[#8B5CF6]/10'
                  : 'text-[#64748B] hover:text-[#1E293B] hover:bg-black/[0.03]'
              }`}
            >
              {l.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm text-[#64748B] hover:text-[#1E293B] font-medium transition-colors px-2 py-1">
            Sign in
          </Link>
          <a href="#waitlist" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full px-5 py-2 text-sm font-bold transition-all shadow-md shadow-[#8B5CF6]/20">
            Get Early Access
          </a>
        </div>

        <button onClick={() => setMobile(!mobile)} className="md:hidden w-8 h-8 flex items-center justify-center text-[#64748B] hover:text-[#1E293B]">
          {mobile ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {mobile && (
        <div className="md:hidden bg-[#FAF9F6]/95 backdrop-blur-2xl border-b border-slate-900/[0.04] px-6 pb-5 pt-2 space-y-1 shadow-lg">
          {navLinks.map((l) => (
            <Link
              key={l.name}
              to={l.path}
              onClick={() => setMobile(false)}
              className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-all ${
                location.pathname === l.path
                  ? 'text-[#8B5CF6] bg-[#8B5CF6]/10'
                  : 'text-[#64748B] hover:text-[#1E293B] hover:bg-[#E2E8F0]'
              }`}
            >
              {l.name}
            </Link>
          ))}
          <div className="pt-2">
            <a
              href="#waitlist"
              onClick={() => setMobile(false)}
              className="flex justify-center w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full px-5 py-2.5 text-sm font-bold transition-all shadow-md"
            >
              Get Early Access
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export function Footer() {
  const cols = [
    { title: 'Product', links: ['Features', 'Demo', 'Pricing', 'Changelog'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Legal', links: ['Privacy Policy', 'Terms', 'Security'] },
  ];

  return (
    <footer className="border-t border-slate-200 mt-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <LogoIcon className="w-8 h-8" />
              <span className="text-slate-900 font-bold text-[17px] tracking-[-0.02em]">LaunchPilot</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Your AI cofounder for validating ideas, generating roadmaps, and launching startups faster.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold text-slate-900 mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-slate-500 text-sm hover:text-slate-900 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-100">
          <p className="text-slate-400 text-xs">© 2026 LaunchPilot, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── InteractiveDemo moved to /pages/Demo.tsx ───────────────────────────────

// ─── Waitlist ─────────────────────────────────────────────────────────────────
function WaitlistSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('waitlist').insert({ name, email, startup_idea: idea });
      if (error && error.code === '23505') setStatus('duplicate');
      else if (error) setStatus('error');
      else setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div id="waitlist" className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9]" />

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Join the Early Access Waitlist</h2>
        <p className="text-slate-500">Secure your spot to get hands-on with LaunchPilot before public release.</p>
      </div>

      {status === 'success' ? (
        <div className="text-center py-10 bg-emerald-50 rounded-2xl border border-emerald-100">
          <Check size={48} className="text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-emerald-800 mb-2">You're on the list!</h3>
          <p className="text-emerald-600">We'll reach out when your spot opens up.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="max-w-md mx-auto space-y-4">
          <input type="text" required placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B5CF6] transition-all" />
          <input type="email" required placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B5CF6] transition-all" />
          {status === 'duplicate' && <p className="text-amber-500 text-xs">Email already registered.</p>}
          <textarea required placeholder="Your Startup Idea" rows={3} value={idea} onChange={e => setIdea(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B5CF6] transition-all resize-none" />
          {status === 'error' && <p className="text-red-500 text-xs">An error occurred. Please try again.</p>}
          <button type="submit" disabled={status === 'loading'}
            className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold py-3.5 rounded-xl shadow-md transition-all disabled:opacity-70 flex justify-center items-center gap-2">
            {status === 'loading' ? 'Submitting...' : 'Join Waitlist'}
          </button>
        </form>
      )}
    </div>
  );
}

// ─── Splash Screen ────────────────────────────────────────────────────────────
function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1000);
    const t2 = setTimeout(() => onFinish(), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); }
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#FAF9F6] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <LogoIcon className="w-16 h-16 drop-shadow-md" />
        <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Launch<span className="text-[#8B5CF6]">Pilot</span>
        </span>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [showHeroWaitlist, setShowHeroWaitlist] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-[#8B5CF6]/20 text-slate-800">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center mb-10 mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[13px] font-medium text-[#8B5CF6] mb-8 border border-slate-200 shadow-sm">
            <Sparkles size={14} className="text-[#8B5CF6]" />
            AI-powered startup launch platform
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-[1.1]">
            Your AI Cofounder <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9]">
              for Building Startups
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            Validate startup ideas, generate MVP roadmaps, and launch faster with
            AI-powered guidance built for serious founders.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!showHeroWaitlist && (
              <button 
                onClick={() => setShowHeroWaitlist(true)} 
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full py-3.5 px-8 text-[15px] font-bold shadow-md shadow-[#8B5CF6]/20 transition-all flex items-center gap-2"
              >
                Join the Waitlist <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>

        {showHeroWaitlist && (
          <div className="relative z-20 max-w-5xl w-full mx-auto animate-in fade-in slide-in-from-bottom-4">
            <WaitlistSection />
          </div>
        )}
      </section>

      {/* ── LOGO STRIP ── */}
      <section className="py-10 border-b border-slate-200 relative z-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <LogoStrip />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-6 relative z-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <HowItWorks />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16 px-6 bg-white relative z-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <FeatureGrid />
        </div>
      </section>

      {/* ── WAITLIST ── */}
      {!showHeroWaitlist && (
        <section className="py-16 px-6 relative z-20 border-b border-slate-200 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto">
            <WaitlistSection />
          </div>
        </section>
      )}

      {/* ── SKILLS PREVIEW ── */}
      <div className="relative z-20">
        <SkillPreview />
      </div>

      {/* ── FOUNDER STORY ── */}
      <div className="relative z-20">
        <FounderStory />
      </div>

      {/* ── PRICING ── */}
      <div className="relative z-20">
        <PricingPreview />
      </div>

      {/* ── NEWSLETTER ── */}
      <div className="relative z-20">
        <NewsletterSection />
      </div>      <Footer />
    </div>
  );
}
