import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Rocket, BarChart2, Map, Zap, ChevronRight, ArrowRight,
  TrendingUp, Users, Target, Lightbulb, Check, Star, Globe,
  Twitter, Linkedin, Mail, Shield, Menu, X, Search,
  Activity, PieChart, Layers, ChevronUp, ChevronDown,
  ExternalLink, Play, Sparkles, MoveRight, User,
} from 'lucide-react';
import { supabase } from './lib/supabase';
import { analyzeIdea, GeminiError } from './lib/gemini';
import type { AnalysisResult } from './lib/gemini';

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

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['Features', 'Demo', 'Pricing'];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0F1A]/80 backdrop-blur-2xl border-b border-white/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-[7px] bg-[#0EA5E9] flex items-center justify-center shadow-[0_0_12px_rgba(14,165,233,0.4)] transition-shadow group-hover:shadow-[0_0_18px_rgba(14,165,233,0.55)]">
            <Rocket size={13} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[#E2E8F0] font-semibold text-[15px] tracking-[-0.02em]">
            LaunchPilot
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="px-3.5 py-1.5 text-sm text-[#94A3B8] hover:text-[#E2E8F0] font-medium rounded-md hover:bg-white/[0.03] transition-all duration-150"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#waitlist"
            className="text-sm text-[#94A3B8] hover:text-[#E2E8F0] font-medium transition-colors px-2 py-1"
          >
            Sign in
          </a>
          <a href="#waitlist" className="btn-primary gap-1.5">
            Get Early Access
            <ArrowRight size={13} strokeWidth={2.5} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobile(!mobile)}
          className="md:hidden w-8 h-8 flex items-center justify-center text-[#94A3B8] hover:text-[#E2E8F0]"
        >
          {mobile ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobile && (
        <div className="md:hidden bg-[#0A0F1A]/95 backdrop-blur-2xl border-b border-white/[0.04] px-6 pb-5 pt-2 space-y-1">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMobile(false)}
              className="block px-3 py-2.5 text-sm text-[#94A3B8] hover:text-[#E2E8F0] font-medium rounded-md hover:bg-white/[0.03] transition-all"
            >
              {l}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#waitlist"
              onClick={() => setMobile(false)}
              className="btn-primary w-full justify-center gap-1.5"
            >
              Get Early Access <ArrowRight size={13} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Dashboard Mockup ─────────────────────────────────────────────────────────
function DashboardMockup() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Analysis', 'Market', 'Roadmap'];

  return (
    <div className="relative animate-float">
      {/* Ambient glow */}
      <div className="absolute -inset-8 bg-[#0EA5E9]/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/5 to-transparent rounded-2xl pointer-events-none" />

      <div
        className="glass-card rounded-2xl overflow-hidden glow-blue relative w-full"
        style={{ maxWidth: 520 }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.05]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <div className="flex-1 mx-3">
            <div className="bg-[#1E2D3F] rounded-[5px] px-3 py-1 flex items-center gap-2 max-w-48">
              <Search size={9} className="text-[#475569]" />
              <span className="text-[#64748B] text-[11px] font-mono">app.launchpilot.ai</span>
            </div>
          </div>
          <div className="badge !py-0.5 !px-2 !text-[10px]">
            <span className="w-1 h-1 rounded-full bg-[#38BDF8] inline-block" />
            Live
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/[0.04] px-4 gap-1">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-2.5 text-[11px] font-medium transition-all duration-150 border-b-2 ${
                activeTab === i
                  ? 'text-[#38BDF8] border-[#38BDF8]'
                  : 'text-[#64748B] border-transparent hover:text-[#94A3B8]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="p-4 space-y-3">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Market Score', value: '94', delta: '+12%', up: true },
              { label: 'Viability',    value: '87', delta: '+8%',  up: true },
              { label: 'Competition',  value: '62', delta: 'Medium', up: false },
            ].map((k) => (
              <div key={k.label} className="surface-raised rounded-xl p-3">
                <div className="text-[#64748B] text-[10px] font-medium mb-1.5">{k.label}</div>
                <div className="text-[#F1F5F9] text-xl font-semibold leading-none">{k.value}</div>
                <div className={`mt-1.5 flex items-center gap-0.5 text-[10px] font-medium ${k.up ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {k.up ? <ChevronUp size={10} /> : <span className="text-[10px]">—</span>}
                  {k.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="surface-raised rounded-xl p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#94A3B8] text-[11px] font-medium">Market Size</span>
              <span className="text-[#38BDF8] text-[11px] font-semibold">$4.2B TAM</span>
            </div>
            <div className="flex items-end gap-1 h-14">
              {[55, 63, 49, 72, 91, 78, 84].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background:
                      i === 4
                        ? 'linear-gradient(to top, #0EA5E9, #38BDF8)'
                        : i === 5 || i === 6
                        ? 'rgba(56,189,248,0.35)'
                        : 'rgba(56,189,248,0.18)',
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[#64748B] text-[9px]">2019</span>
              <span className="text-[#38BDF8] text-[9px] font-medium">2025 proj.</span>
            </div>
          </div>

          {/* Competitors */}
          <div className="surface-raised rounded-xl p-3">
            <div className="text-[#94A3B8] text-[11px] font-medium mb-2.5">Competitive Landscape</div>
            <div className="space-y-2">
              {[
                { name: 'Competitor A', score: 76, color: '#F87171' },
                { name: 'Competitor B', score: 58, color: '#FCD34D' },
                { name: 'LaunchPilot',  score: 94, color: '#38BDF8' },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-2.5">
                  <span className="text-[#94A3B8] text-[10px] w-20 truncate leading-none">{c.name}</span>
                  <div className="flex-1 bg-[#1E2D3F] rounded-full h-1">
                    <div
                      className="h-1 rounded-full bar-fill"
                      style={{ width: `${c.score}%`, background: c.color }}
                    />
                  </div>
                  <span className="text-[10px] font-medium w-5 text-right" style={{ color: c.color }}>
                    {c.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="surface-raised rounded-xl p-3">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[#94A3B8] text-[11px] font-medium">MVP Roadmap</span>
              <span className="badge !py-0 !px-1.5 !text-[9px] gap-1">
                <Zap size={8} className="text-[#38BDF8]" /> AI
              </span>
            </div>
            <div className="space-y-1.5">
              {[
                { label: 'Core Auth & Onboarding', done: true },
                { label: 'AI Analysis Engine',     done: true },
                { label: 'Dashboard & Reporting',  done: false },
                { label: 'Growth Loops',            done: false },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${r.done ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-[#1E2D3F] border border-[#2D4060]'}`}>
                    {r.done && <Check size={8} className="text-emerald-400" strokeWidth={3} />}
                  </div>
                  <span className={`text-[10px] leading-none ${r.done ? 'text-[#64748B] line-through' : 'text-[#94A3B8]'}`}>{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating chip — top right */}
      <div className="absolute -top-3 right-4 glass-card rounded-lg px-3 py-1.5 border border-white/[0.06] flex items-center gap-2 glow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block" style={{ boxShadow: '0 0 6px #10B981' }} />
        <span className="text-[#94A3B8] text-[10px] font-medium">Analyzing market fit</span>
      </div>

      {/* Floating chip — bottom left */}
      <div className="absolute -bottom-3 left-4 glass-card rounded-lg px-3 py-1.5 border border-white/[0.06] flex items-center gap-2">
        <Star size={10} className="text-amber-400 fill-amber-400" />
        <span className="text-[#94A3B8] text-[10px] font-medium">94 viability score</span>
      </div>
    </div>
  );
}

// ─── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({
  icon: Icon,
  eyebrow,
  title,
  desc,
  delay = 0,
}: {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  desc: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, delay);

  return (
    <div
      ref={ref}
      className="reveal card-hover surface rounded-2xl p-6 group"
    >
      <div className="w-9 h-9 rounded-xl surface-raised border border-[#263347] flex items-center justify-center mb-5 transition-all duration-200 group-hover:border-[#0EA5E9]/30 group-hover:bg-[#0EA5E9]/5">
        <Icon size={17} className="text-[#38BDF8]" strokeWidth={1.75} />
      </div>
      <div className="label mb-2">{eyebrow}</div>
      <h3 className="heading-lg text-[1.0625rem] mb-2">{title}</h3>
      <p className="body-base text-[0.875rem]">{desc}</p>
    </div>
  );
}

// ─── Interactive Demo ─────────────────────────────────────────────────────────
const DEMO_STEPS = [
  'Parsing startup concept',
  'Running market sizing models',
  'Scanning competitive landscape',
  'Generating product roadmap',
  'Synthesizing launch strategy',
];

const THREAT_COLOR: Record<string, string> = {
  High: '#F87171', Medium: '#FCD34D', Low: '#6EE7B7',
};
const RISK_COLOR: Record<string, string> = {
  High: '#F87171', Medium: '#FCD34D', Low: '#6EE7B7',
};
const PRIORITY_COLOR: Record<string, string> = {
  'Must Have': '#38BDF8', 'Should Have': '#34D399', 'Nice to Have': '#94A3B8',
};

function BulletPoint({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 w-3.5 h-3.5 rounded-full border border-[#38BDF8]/50 bg-[#38BDF8]/10 flex items-center justify-center flex-shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
      </div>
      <p className="text-[#CBD5E1] text-xs leading-relaxed">{text}</p>
    </div>
  );
}

function ResultTabs({ result }: { result: AnalysisResult }) {
  const [tab, setTab] = useState(0);

  const tabs = [
    { label: 'Market', icon: Activity },
    { label: 'Audience', icon: Users },
    { label: 'Competitors', icon: PieChart },
    { label: 'Risks', icon: Shield },
    { label: 'MVP', icon: Zap },
    { label: 'Launch', icon: Rocket },
  ];

  return (
    <div className="surface rounded-2xl overflow-hidden">
      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b border-[#1F2D3D] bg-[#0D1525]">
        {tabs.map((t, i) => {
          const Icon = t.icon;
          return (
            <button
              key={t.label}
              onClick={() => setTab(i)}
              className={`flex items-center gap-1.5 px-3 py-3 text-xs font-medium whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0 ${
                tab === i
                  ? 'border-[#0EA5E9] text-[#38BDF8]'
                  : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
              }`}
            >
              <Icon size={11} strokeWidth={2} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="p-5">
        {/* Market Opportunity */}
        {tab === 0 && (
          <div className="space-y-4">
            <p className="text-[#94A3B8] text-xs leading-relaxed">{result.marketOpportunity.summary}</p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Total Addressable', val: result.marketOpportunity.tam },
                { label: 'Serviceable',        val: result.marketOpportunity.sam },
                { label: 'Obtainable',          val: result.marketOpportunity.som },
                { label: 'Growth Rate',         val: result.marketOpportunity.cagr },
              ].map((m) => (
                <div key={m.label} className="surface-raised rounded-xl px-3 py-2.5">
                  <div className="text-[#94A3B8] text-[10px] font-medium uppercase tracking-wide">{m.label}</div>
                  <div className="text-[#38BDF8] text-base font-bold leading-tight mt-0.5">{m.val}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-[#64748B] text-[10px] font-semibold uppercase tracking-widest mb-2">Key Trends</div>
              <div className="space-y-1.5">
                {result.marketOpportunity.keyTrends.map((t, i) => <BulletPoint key={i} text={t} />)}
              </div>
            </div>
          </div>
        )}

        {/* Target Audience */}
        {tab === 1 && (
          <div className="space-y-4">
            <div className="surface-raised rounded-xl p-3.5">
              <div className="text-[#64748B] text-[10px] font-semibold uppercase tracking-widest mb-1.5">Primary Segment</div>
              <p className="text-[#CBD5E1] text-xs leading-relaxed">{result.targetAudience.primary}</p>
            </div>
            <div className="surface-raised rounded-xl p-3.5">
              <div className="text-[#64748B] text-[10px] font-semibold uppercase tracking-widest mb-1.5">Secondary Segment</div>
              <p className="text-[#CBD5E1] text-xs leading-relaxed">{result.targetAudience.secondary}</p>
            </div>
            <div className="surface-raised rounded-xl p-3.5">
              <div className="text-[#64748B] text-[10px] font-semibold uppercase tracking-widest mb-1.5">Demographics</div>
              <p className="text-[#94A3B8] text-xs leading-relaxed">{result.targetAudience.demographics}</p>
            </div>
            <div>
              <div className="text-[#64748B] text-[10px] font-semibold uppercase tracking-widest mb-2">Pain Points</div>
              <div className="space-y-1.5">
                {result.targetAudience.painPoints.map((p, i) => <BulletPoint key={i} text={p} />)}
              </div>
            </div>
          </div>
        )}

        {/* Competitors */}
        {tab === 2 && (
          <div className="space-y-3">
            {result.competitorAnalysis.map((c) => {
              const col = THREAT_COLOR[c.threat] ?? '#94A3B8';
              return (
                <div key={c.name} className="surface-raised rounded-xl p-3.5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#CBD5E1] text-sm font-semibold flex-1">{c.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border" style={{ color: col, borderColor: `${col}40`, background: `${col}12` }}>
                      {c.threat}
                    </span>
                  </div>
                  <div className="flex-1 bg-[#1E2D3F] rounded-full h-1.5 mb-2">
                    <div className="h-1.5 rounded-full bar-fill" style={{ width: `${c.pct}%`, background: col }} />
                  </div>
                  <p className="text-[#64748B] text-[11px] leading-relaxed">Weakness: {c.weakness}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Risks */}
        {tab === 3 && (
          <div className="space-y-3">
            {result.risks.map((r, i) => {
              const col = RISK_COLOR[r.level] ?? '#94A3B8';
              return (
                <div key={i} className="surface-raised rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border" style={{ color: col, borderColor: `${col}40`, background: `${col}12` }}>
                      {r.level}
                    </span>
                    <span className="text-[#CBD5E1] text-xs font-semibold">{r.title}</span>
                  </div>
                  <p className="text-[#64748B] text-[11px] leading-relaxed">Mitigation: {r.mitigation}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* MVP Features */}
        {tab === 4 && (
          <div className="space-y-2">
            {result.mvpFeatures.map((f, i) => {
              const col = PRIORITY_COLOR[f.priority] ?? '#94A3B8';
              return (
                <div key={i} className="flex items-center gap-3 surface-raised rounded-xl px-3.5 py-2.5">
                  <div className="flex-1">
                    <span className="text-[#CBD5E1] text-xs font-medium">{f.feature}</span>
                  </div>
                  <span className="text-[10px] font-medium whitespace-nowrap" style={{ color: col }}>{f.priority}</span>
                  <span className="text-[10px] text-[#64748B] whitespace-nowrap">{f.effort}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Launch Strategy */}
        {tab === 5 && (
          <div className="space-y-4">
            {[result.launchStrategy.phase1, result.launchStrategy.phase2, result.launchStrategy.phase3].map((phase, i) => (
              <div key={i} className="surface-raised rounded-xl p-3.5">
                <div className="text-[#38BDF8] text-[10px] font-semibold uppercase tracking-widest mb-2">{phase.name}</div>
                <div className="space-y-1.5">
                  {phase.actions.map((a, j) => <BulletPoint key={j} text={a} />)}
                </div>
              </div>
            ))}
            <div>
              <div className="text-[#64748B] text-[10px] font-semibold uppercase tracking-widest mb-2">Top Channels</div>
              <div className="space-y-2">
                {result.launchStrategy.channels.map((ch, i) => (
                  <div key={i} className="surface-raised rounded-xl p-3">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[#CBD5E1] text-xs font-medium flex-1">{ch.channel}</span>
                      <span className="text-[#38BDF8] text-xs font-bold">{ch.score}</span>
                    </div>
                    <div className="bg-[#1E2D3F] rounded-full h-1 mb-1.5">
                      <div className="h-1 rounded-full bar-fill bg-[#0EA5E9]" style={{ width: `${ch.score}%` }} />
                    </div>
                    <p className="text-[#64748B] text-[11px] leading-relaxed">{ch.rationale}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InteractiveDemo() {
  const [input, setInput]     = useState('AI-powered legal document automation for SMBs');
  const [step, setStep]       = useState(-1);
  const [done, setDone]       = useState(false);
  const [result, setResult]   = useState<AnalysisResult | null>(null);
  const [error, setError]     = useState('');
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const run = useCallback(async () => {
    if (step >= 0 && !done) return;
    setDone(false);
    setResult(null);
    setError('');
    setStep(0);

    // Animate pipeline steps while fetch happens
    let s = 0;
    timer.current = setInterval(() => {
      s += 1;
      if (s < DEMO_STEPS.length - 1) setStep(s);
    }, 800);

    abortRef.current = new AbortController();
    try {
      const analysis = await analyzeIdea(input, abortRef.current.signal);
      clearInterval(timer.current!);
      setStep(DEMO_STEPS.length);
      setDone(true);
      setResult(analysis);
    } catch (err: unknown) {
      clearInterval(timer.current!);
      setStep(-1);
      setDone(false);
      if (err instanceof GeminiError || err instanceof Error) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong. Please try again.');
        }
      }
    }
  }, [step, done, input]);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
    abortRef.current?.abort();
  }, []);

  const running = step >= 0 && !done;

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {/* ── Left panel ── */}
      <div className="space-y-4">
        {/* Input */}
        <div className="surface rounded-2xl p-5">
          <div className="label mb-3">Startup Concept</div>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setDone(false); setStep(-1); setResult(null); setError(''); }}
            rows={3}
            className="w-full bg-[#1E2D3F] border border-[#263347] rounded-xl px-3.5 py-2.5 text-[#CBD5E1] text-sm font-medium resize-none focus:outline-none focus:border-[#0EA5E9]/40 transition-colors placeholder-[#3D5470]"
            placeholder="Describe your startup idea…"
          />
          <button
            onClick={run}
            disabled={running}
            className="mt-3 btn-primary w-full justify-center gap-2 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {running ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full spin" />
                Analyzing…
              </>
            ) : (
              <>
                <Sparkles size={14} strokeWidth={2} />
                {done ? 'Re-analyze Idea' : 'Run AI Analysis'}
              </>
            )}
          </button>
          {error && (
            <p className="mt-2.5 text-red-400 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
              {error}
            </p>
          )}
        </div>

        {/* Pipeline */}
        <div className="surface rounded-2xl p-5">
          <div className="label mb-4">Analysis Pipeline</div>
          <div className="space-y-2.5">
            {DEMO_STEPS.map((s, i) => {
              const isDone   = done || i < step;
              const isActive = !done && i === step;
              return (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isDone    ? 'bg-emerald-500/15 border border-emerald-500/40'
                    : isActive ? 'bg-[#0EA5E9]/15 border border-[#0EA5E9]/50'
                    : 'bg-[#1A2535]/60 border border-[#2D4060]'
                  }`}>
                    {isDone   ? <Check size={10} className="text-emerald-400" strokeWidth={3} />
                    : isActive ? <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] block animate-pulse" />
                    : <span className="text-[#64748B] text-[9px] font-medium">{i + 1}</span>}
                  </div>
                  <span className={`text-sm transition-colors duration-200 ${
                    isDone   ? 'text-[#64748B]'
                    : isActive ? 'text-[#E2E8F0] font-medium'
                    : 'text-[#94A3B8]'
                  }`}>
                    {s}
                    {isActive && <span className="cursor" />}
                  </span>
                </div>
              );
            })}
          </div>
          {done && (
            <div className="mt-4 flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 rounded-xl px-3 py-2">
              <Check size={12} className="text-emerald-400" strokeWidth={2.5} />
              <span className="text-emerald-400 text-xs font-medium">Analysis complete — results ready</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="space-y-4">
        {result ? (
          <ResultTabs result={result} />
        ) : (
          <>
            {/* Placeholder cards shown before first run */}
            <div className={`surface rounded-2xl p-5 transition-all duration-700 ${running ? 'opacity-60' : 'opacity-30 pointer-events-none'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#CBD5E1] text-sm font-semibold flex items-center gap-2">
                  <Activity size={13} className="text-[#38BDF8]" />
                  Market Analysis
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {['Total Addressable', 'Serviceable', 'Obtainable', 'Growth Rate'].map((l) => (
                  <div key={l} className="surface-raised rounded-xl px-3 py-2.5">
                    <div className="text-[#94A3B8] text-[10px] font-medium uppercase tracking-wide">{l}</div>
                    <div className="h-5 w-16 bg-[#1E2D3F] rounded mt-1.5 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
            <div className={`surface rounded-2xl p-5 transition-all duration-700 delay-150 ${running ? 'opacity-60' : 'opacity-30 pointer-events-none'}`}>
              <div className="text-[#CBD5E1] text-sm font-semibold flex items-center gap-2 mb-4">
                <PieChart size={13} className="text-[#38BDF8]" />
                Competitor Threat Matrix
              </div>
              <div className="space-y-3">
                {['Competitor A', 'Competitor B', 'Competitor C'].map((n) => (
                  <div key={n} className="flex items-center gap-3">
                    <span className="text-[#94A3B8] text-xs w-24">{n}</span>
                    <div className="flex-1 bg-[#1E2D3F] rounded-full h-1.5">
                      <div className="h-1.5 w-0 rounded-full bg-[#38BDF8]/30" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`surface rounded-2xl p-5 transition-all duration-700 delay-300 ${running ? 'opacity-60' : 'opacity-30 pointer-events-none'}`}>
              <div className="text-[#CBD5E1] text-sm font-semibold flex items-center gap-2 mb-3">
                <Layers size={13} className="text-[#38BDF8]" />
                AI Insights
              </div>
              <div className="space-y-2.5">
                {[80, 65, 50, 40].map((w, i) => (
                  <div key={i} className="h-3 rounded bg-[#1E2D3F] animate-pulse" style={{ width: `${w}%`, animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Growth channels ──────────────────────────────────────────────────────────
function GrowthChannels() {
  const channels = [
    { name: 'Product Hunt',   score: 92, desc: 'Top 5 launch strategy with 48hr campaign',  icon: Target,       col: '#F59E0B' },
    { name: 'Twitter / X',    score: 87, desc: 'Founder-led content, daily build-in-public', icon: Twitter,      col: '#38BDF8' },
    { name: 'Organic Search', score: 78, desc: '34 high-intent keywords, content roadmap',   icon: Globe,        col: '#34D399' },
    { name: 'Cold Outreach',  score: 71, desc: 'ICP targeting, sequence templates',          icon: Mail,         col: '#94A3B8' },
  ];

  return (
    <div className="surface rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[#E2E8F0] text-sm font-semibold flex items-center gap-2">
          <TrendingUp size={14} className="text-[#38BDF8]" />
          Launch Channel Strategy
        </span>
        <span className="badge">AI Generated</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {channels.map((ch) => (
          <div
            key={ch.name}
            className="surface-raised rounded-xl p-4 card-hover cursor-default group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${ch.col}12`, border: `1px solid ${ch.col}22` }}
                >
                  <ch.icon size={13} style={{ color: ch.col }} />
                </div>
                <span className="text-[#CBD5E1] text-sm font-medium">{ch.name}</span>
              </div>
              <span className="text-xs font-bold tabular-nums" style={{ color: ch.col }}>{ch.score}</span>
            </div>
            <p className="text-[#94A3B8] text-xs leading-relaxed">{ch.desc}</p>
            <div className="mt-3 bg-[#1E2D3F] rounded-full h-0.5">
              <div
                className="h-0.5 rounded-full"
                style={{ width: `${ch.score}%`, background: ch.col, opacity: 0.6 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Stats row ────────────────────────────────────────────────────────────────
function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const stats = [
    { val: '2,400+', label: 'Founders on waitlist' },
    { val: '94%',    label: 'Idea accuracy score' },
    { val: '3×',     label: 'Faster to first customer' },
    { val: '$0',     label: 'Until you ship' },
  ];
  return (
    <div ref={ref} className="reveal">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#263347] rounded-2xl overflow-hidden border border-[#263347]">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#111827] px-6 py-7 text-center">
            <div className="gradient-text text-2xl md:text-3xl font-bold tracking-tight mb-1.5">{s.val}</div>
            <div className="text-[#94A3B8] text-xs font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "LaunchPilot compressed weeks of market research into a 15-minute session. The competitor matrix alone saved me from a positioning mistake that would've cost months.",
    name: 'Marcus Chen',
    role: 'Founder, TalentFlow',
    cohort: 'YC W25',
    col: '#0EA5E9',
  },
  {
    quote: "The MVP roadmap output was specific enough to hand directly to contractors. Every phase was prioritized and justified — not just a generic feature list.",
    name: 'Sarah Okafor',
    role: 'CEO, Vendi AI',
    cohort: 'Techstars',
    col: '#34D399',
  },
  {
    quote: "Used the launch strategy for our Product Hunt debut. Hit #2 product of the day. The sequencing advice around timing and community activation was spot-on.",
    name: 'James Park',
    role: 'Founder, Notiv',
    cohort: 'Solo founder',
    col: '#F59E0B',
  },
];

function TestimonialCard({ t, delay = 0 }: { t: typeof TESTIMONIALS[0]; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, delay);
  return (
    <div ref={ref} className="reveal card-hover surface rounded-2xl p-6">
      <div className="flex gap-0.5 mb-4">
        {Array(5).fill(0).map((_, i) => (
          <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-[#94A3B8] text-sm leading-relaxed mb-5">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: t.col, opacity: 0.9 }}
          >
            {t.name[0]}
          </div>
          <div>
            <p className="text-[#CBD5E1] text-sm font-medium leading-none mb-0.5">{t.name}</p>
            <p className="text-[#94A3B8] text-xs">{t.role}</p>
          </div>
        </div>
        <span className="text-[#94A3B8] text-[10px] font-medium border border-[#2D3F56] rounded-md px-2 py-0.5">{t.cohort}</span>
      </div>
    </div>
  );
}

// ─── CTA / Waitlist ───────────────────────────────────────────────────────────
function WaitlistSection() {
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');
  const [idea,  setIdea]  = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase
      .from('waitlist')
      .insert({ name: name.trim(), email: email.trim().toLowerCase(), startup_idea: idea.trim() });
    if (!error) {
      setStatus('success');
    } else if (error.code === '23505') {
      setStatus('duplicate');
    } else {
      setStatus('error');
    }
  };

  const perks = [
    'Free during beta — no credit card',
    'Priority access to all AI features',
    'Direct line to the founding team',
  ];

  return (
    <div ref={ref} id="waitlist" className="reveal max-w-5xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <div className="badge mb-5 mx-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] inline-block animate-pulse" />
          Early Access — Limited Spots
        </div>
        <h2 className="heading-xl mb-4">
          Ready to build smarter?<br />
          <span className="gradient-text">Join the waitlist.</span>
        </h2>
        <p className="body-lg max-w-md mx-auto">
          Tell us about your idea. We'll reach out when your spot opens.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 items-start">
        {/* ── Left: perks + social proof ── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Stats */}
          <div className="surface rounded-2xl p-6 space-y-4">
            <p className="text-[#E2E8F0] font-semibold text-sm">Why join early?</p>
            <ul className="space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center flex-shrink-0">
                    <Check size={9} className="text-emerald-400" strokeWidth={3} />
                  </div>
                  <span className="text-[#CBD5E1] text-sm leading-snug">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Counter */}
          <div className="surface rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2 flex-shrink-0">
                {['#0EA5E9', '#34D399', '#F59E0B', '#F472B6'].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#111827] flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: c }}
                  >
                    {['A', 'S', 'J', 'M'][i]}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[#E2E8F0] font-semibold text-sm leading-none mb-0.5">2,400+ founders</p>
                <p className="text-[#64748B] text-xs">already on the waitlist</p>
              </div>
            </div>
          </div>

          {/* Backed by */}
          <div className="surface rounded-2xl p-6">
            <p className="text-[#64748B] text-[10px] font-semibold uppercase tracking-widest mb-4">Founders backed by</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {['Y Combinator', 'Techstars', 'a16z', 'First Round'].map((o) => (
                <span key={o} className="text-[#94A3B8] text-xs font-semibold">{o}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="lg:col-span-3">
          <div className="surface rounded-2xl p-8">
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mx-auto mb-5">
                  <Check size={24} className="text-emerald-400" strokeWidth={2} />
                </div>
                <h3 className="text-[#E2E8F0] text-xl font-semibold mb-2">You're on the list!</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs mx-auto">
                  We'll reach out personally when your spot opens. Keep building.
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 badge border border-emerald-500/25 bg-emerald-500/8 rounded-xl py-2 px-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block" />
                  <span className="text-emerald-400 text-xs font-medium">Submission received</span>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-[#94A3B8] text-xs font-semibold uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3D5470] pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Alex Chen"
                      className="waitlist-input pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#94A3B8] text-xs font-semibold uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3D5470] pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="alex@startup.com"
                      className="waitlist-input pl-9"
                    />
                  </div>
                  {status === 'duplicate' && (
                    <p className="text-amber-400 text-xs mt-1.5 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      This email is already on the waitlist.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#94A3B8] text-xs font-semibold uppercase tracking-wider mb-2">
                    Your Startup Idea
                  </label>
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    required
                    rows={3}
                    placeholder="Briefly describe what you're building and who it's for…"
                    className="waitlist-input resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-xs flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center gap-2 py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} strokeWidth={2} />
                      Join Waitlist
                      <MoveRight size={14} strokeWidth={2.5} />
                    </>
                  )}
                </button>

                <p className="text-[#475569] text-xs text-center pt-1">
                  No credit card required · Free during beta · Cancel anytime
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Social proof logos ───────────────────────────────────────────────────────
function TrustBar() {
  const orgs = ['Y Combinator', 'Techstars', 'a16z', '500 Global', 'First Round', 'Sequoia'];
  return (
    <div className="py-10">
      <div className="divider mb-8" />
      <p className="label text-center mb-6">Trusted by founders backed by</p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {orgs.map((o) => (
          <span
            key={o}
            className="text-[#94A3B8] text-sm font-semibold tracking-wide hover:text-[#CBD5E1] transition-colors"
          >
            {o}
          </span>
        ))}
      </div>
      <div className="divider mt-8" />
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: 'Product', links: ['Features', 'Demo', 'Pricing', 'Changelog'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Legal',   links: ['Privacy Policy', 'Terms', 'Security'] },
  ];

  return (
    <footer className="border-t border-[#0D1219] mt-20">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[7px] bg-[#0EA5E9] flex items-center justify-center">
                <Rocket size={13} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[#E2E8F0] font-semibold text-[15px] tracking-[-0.02em]">LaunchPilot</span>
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed max-w-xs">
              Your AI cofounder for validating ideas, generating roadmaps, and launching startups faster.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { Icon: Twitter,      href: '#', title: 'Twitter' },
                { Icon: Linkedin,     href: '#', title: 'LinkedIn' },
                { Icon: ExternalLink, href: '#', title: 'Product Hunt' },
                { Icon: Mail,         href: '#', title: 'Contact' },
              ].map(({ Icon, href, title }) => (
                <a
                  key={title}
                  href={href}
                  title={title}
                  className="w-8 h-8 rounded-lg surface-raised border border-[#243347] flex items-center justify-center text-[#64748B] hover:text-[#CBD5E1] hover:border-[#38BDF8]/30 transition-all"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <p className="label mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[#64748B] text-sm hover:text-[#94A3B8] transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#64748B] text-xs">© 2026 LaunchPilot, Inc. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-[#64748B] text-xs">
            <Shield size={11} />
            <span>SOC 2 Type II · GDPR · CCPA compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  // Global reveal observer
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  useReveal(heroRef);

  return (
    <div className="min-h-screen bg-[#0A0F1A] dot-grid">
      <Navbar />

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center px-6 pt-24 pb-16">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <div ref={heroRef} className="reveal">
            <div className="badge mb-7">
              <Sparkles size={10} className="text-[#38BDF8]" />
              AI-powered startup launch platform
            </div>

            <h1 className="heading-display mb-5">
              Your AI Cofounder
              <br />
              <span className="gradient-text">for Building Startups</span>
            </h1>

            <p className="body-lg max-w-md mb-8">
              Validate startup ideas, generate MVP roadmaps, and launch faster with
              AI-powered guidance built for serious founders.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#waitlist" className="btn-primary gap-2 px-5 py-2.5">
                Join Waitlist
                <ChevronRight size={15} strokeWidth={2.5} />
              </a>
              <button className="btn-ghost gap-2.5 px-5 py-2.5">
                <div className="w-5 h-5 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 flex items-center justify-center">
                  <Play size={8} className="text-[#38BDF8] translate-x-px" fill="#38BDF8" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['#0EA5E9', '#34D399', '#F59E0B', '#F472B6'].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#0A0F1A] flex items-center justify-center text-white text-[9px] font-bold"
                    style={{ background: c }}
                  >
                    {['A','S','J','M'][i]}
                  </div>
                ))}
              </div>
              <p className="text-[#94A3B8] text-xs">
                <span className="text-[#E2E8F0] font-medium">2,400+ founders</span> on the waitlist
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <TrustBar />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <StatsRow />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="max-w-xl mb-14">
            <div
              className="reveal label mb-3"
              ref={(el) => { if (el) { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 }); obs.observe(el); } }}
            >
              Platform
            </div>
            <h2
              className="reveal heading-xl mb-4"
              ref={(el) => { if (el) { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 }); obs.observe(el); } }}
            >
              Everything you need <br />
              to <span className="gradient-text">go from idea to launch</span>
            </h2>
            <p
              className="reveal body-lg"
              ref={(el) => { if (el) { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 }); obs.observe(el); } }}
            >
              LaunchPilot consolidates the research, planning, and strategy work that used to take a founding team weeks — and compresses it to minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <FeatureCard icon={Lightbulb}   eyebrow="01 — Validation"  title="AI Idea Validation"       desc="Instantly score your startup idea against market opportunity, competitive density, execution risk, and timing. Get a detailed breakdown, not just a number."  delay={0}   />
            <FeatureCard icon={Map}          eyebrow="02 — Roadmap"     title="MVP Roadmap Generator"    desc="Generate a phased product roadmap with feature prioritization, technical dependencies, and timeline estimates tailored to your specific idea and resources." delay={80}  />
            <FeatureCard icon={TrendingUp}   eyebrow="03 — Go-to-Market" title="Launch Strategy Engine"  desc="Build a complete GTM plan covering channel strategy, launch sequencing, content calendars, and community playbooks — ready to execute on day one."           delay={160} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard icon={BarChart2}    eyebrow="04 — Intelligence" title="Market Intelligence"      desc="Real-time TAM/SAM/SOM estimates, CAGR projections, and segment breakdowns grounded in current data, not outdated reports."                                delay={240} />
            <FeatureCard icon={Users}        eyebrow="05 — Customers"    title="ICP Builder"              desc="Define and segment your ideal customer profiles with AI-generated personas, pain point mapping, and channel fit scoring."                                 delay={320} />
            <FeatureCard icon={Star}         eyebrow="06 — Fundraising"  title="Investor Pitch Builder"   desc="Generate compelling investor narratives, key metric frameworks, and narrative arcs aligned to what top-tier VCs look for at pre-seed and seed."          delay={400} />
          </div>
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-14">
            <div
              className="reveal label mb-3"
              ref={(el) => { if (el) { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 }); obs.observe(el); } }}
            >
              Live Demo
            </div>
            <h2
              className="reveal heading-xl mb-4"
              ref={(el) => { if (el) { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 }); obs.observe(el); } }}
            >
              See the AI work <br />
              <span className="gradient-text">in real time</span>
            </h2>
            <p
              className="reveal body-lg"
              ref={(el) => { if (el) { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 }); obs.observe(el); } }}
            >
              Type any startup idea below. Watch LaunchPilot run a full analysis pipeline — market sizing, competitive mapping, roadmap generation, and growth strategy — in under 60 seconds.
            </p>
          </div>

          <div
            className="reveal"
            ref={(el) => { if (el) { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.05 }); obs.observe(el); } }}
          >
            <InteractiveDemo />
          </div>

          <div
            className="mt-5 reveal"
            ref={(el) => { if (el) { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.05 }); obs.observe(el); } }}
          >
            <GrowthChannels />
          </div>

          {/* Inline CTA */}
          <div
            className="mt-5 reveal surface rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            ref={(el) => { if (el) { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 }); obs.observe(el); } }}
          >
            <div>
              <p className="text-[#CBD5E1] font-semibold text-sm">Ready to run your own analysis?</p>
              <p className="text-[#64748B] text-xs mt-0.5">Full access during beta. No credit card.</p>
            </div>
            <a href="#waitlist" className="btn-primary gap-2 whitespace-nowrap">
              Get Early Access
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="reveal label text-center mb-12"
            ref={(el) => { if (el) { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 }); obs.observe(el); } }}
          >
            What founders are saying
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} t={t} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="surface rounded-3xl px-8 py-16 md:px-16 relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#0EA5E9]/40 to-transparent" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#0EA5E9]/[0.04] rounded-full blur-3xl pointer-events-none" />
            <WaitlistSection />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
