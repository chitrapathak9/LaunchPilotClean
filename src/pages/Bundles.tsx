import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar, Footer } from '../App';
import {
  CheckCircle2, X, ChevronDown, ArrowRight,
  Layers, Terminal, Star, Users, BarChart,
  Rocket, Map as MapIcon, Library, Zap, Package,
  Flame, Gift, Shield, Clock, MessageSquare, Loader2
} from 'lucide-react';

/* ── Bundle Data ── */
const bundles = [
  {
    id: 'starter-bundle', name: 'Starter Bundle',
    tagline: 'Your first two skills. Ship your first product.',
    price: 19, originalValue: 18, savings: 0, skillCount: 2,
    userPicksSkills: false, isPopular: false,
    includedSkills: [
      { icon: '🏗️', name: 'SaaS Builder Skill', desc: 'Full-stack SaaS with auth + billing', price: 9 },
      { icon: '🛬', name: 'Landing Page Builder Skill', desc: 'High-converting landing pages', price: 9 },
    ],
    features: ['2 skill files (SKILL.md)', '2 GitHub example projects', 'Setup guides for both', 'Lifetime updates on both', 'Email support (48hr)'],
    stripeLink: '#',
  },
  {
    id: 'builder-bundle', name: 'Builder Bundle',
    tagline: 'Everything to go from idea to shipped MVP.',
    price: 29, originalValue: 27, savings: 8, skillCount: 3,
    userPicksSkills: true, isPopular: true, badge: '🔥 Most Popular',
    includedSkills: [],
    popularPicks: [
      { icon: '🏗️', name: 'SaaS Builder' },
      { icon: '📊', name: 'shadcn Dashboard' },
      { icon: '🔍', name: 'SEO Optimizer' },
    ],
    features: ['3 skill files of your choice', 'All GitHub example projects', 'Setup guides for all 3', 'Lifetime updates on all 3', 'Email support (48hr)', '30-min setup call with founder'],
    stripeLink: '#',
  },
  {
    id: 'full-arsenal', name: 'Full Arsenal',
    tagline: 'All skills. Ship everything. Forever.',
    price: 59, originalValue: 81, savings: 22, skillCount: 9,
    userPicksSkills: false, isPopular: false,
    includedSkills: [
      { icon: '🏗️', name: 'SaaS Builder' },
      { icon: '📱', name: 'iOS Mobile Builder' },
      { icon: '🎨', name: 'Taste & Design' },
      { icon: '✍️', name: 'Humanizer' },
      { icon: '📊', name: 'shadcn Dashboard' },
      { icon: '📣', name: 'Guerrilla Marketing' },
      { icon: '🔍', name: 'SEO Optimizer' },
      { icon: '🛬', name: 'Landing Page Builder' },
    ],
    features: ['All current skills (9+)', 'Every future skill automatically', 'All GitHub example projects', 'Replit / Lovable deploy template', 'Lifetime updates forever', 'Priority email support (24hr)', '1-on-1 onboarding session (30 min)', 'Private Slack channel access', '1 custom skill request'],
    stripeLink: '#',
  },
];

const individualSkills = [
  { name: 'SaaS Builder', icon: '🏗️', price: 9, slug: 'saas-builder' },
  { name: 'iOS Mobile Builder', icon: '📱', price: 9, slug: 'ios-builder' },
  { name: 'Taste & Design', icon: '🎨', price: 9, slug: 'taste-design' },
  { name: 'Humanizer', icon: '✍️', price: 9, slug: 'humanizer' },
  { name: 'shadcn Dashboard', icon: '📊', price: 9, slug: 'shadcn-dashboard' },
  { name: 'Guerrilla Marketing', icon: '📣', price: 9, slug: 'guerrilla-marketing' },
  { name: 'SEO Optimizer', icon: '🔍', price: 9, slug: 'seo-optimizer' },
  { name: 'Landing Page Builder', icon: '🛬', price: 9, slug: 'landing-page-builder' },
];

const comparisonRows = [
  { name: 'Skills included', starter: '2', builder: '3 (your pick)', full: 'All 9+' },
  { name: 'Future skills', starter: false, builder: false, full: '✅ Auto' },
  { name: 'GitHub projects', starter: true, builder: true, full: true },
  { name: 'Deploy template', starter: false, builder: false, full: true },
  { name: 'Email support', starter: '✅ 48hr', builder: '✅ 48hr', full: '✅ 24hr' },
  { name: 'Setup call', starter: false, builder: '✅ 30 min', full: '✅ 30 min' },
  { name: 'Slack channel', starter: false, builder: false, full: '✅ Private' },
  { name: 'Custom skill', starter: false, builder: false, full: '✅ 1 request' },
  { name: 'Lifetime updates', starter: true, builder: true, full: true },
  { name: 'Money-back', starter: '7 days', builder: '7 days', full: '7 days' },
];

const faqs = [
  { q: 'How do I pick my skills on the Builder plan?', a: 'After checkout, reply to your receipt email with your 3 skill choices. We send the files within 2 hours.' },
  { q: 'Can I change my skill picks later?', a: 'Yes, within 7 days of purchase. Email us and we\'ll swap them at no cost.' },
  { q: 'What happens when new skills are added?', a: 'Starter and Builder plans don\'t include future skills automatically. Full Arsenal does — you get every new skill the moment it drops.' },
  { q: 'Do I get updates for all skills in my bundle?', a: 'Yes. Lifetime updates on every skill in your bundle. Free forever.' },
  { q: 'Can I upgrade from Builder to Full Arsenal?', a: 'Yes. Email us and we\'ll charge you the difference ($30) and upgrade your access.' },
  { q: 'Is there a refund if the bundle doesn\'t work for me?', a: '7-day no-questions-asked refund on all bundles.' },
];

/* ── Section Components ── */

function BundleHero() {
  return (
    <section className="pt-32 pb-16 px-6 bg-[#FAF9F6] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 text-[#8B5CF6] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6 border border-[#8B5CF6]/20">
          ⚡ Bundle Deals
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          More skills.<br />
          <span className="text-[#8B5CF6]">Less money.</span>
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-8">
          Buy skills together and save. Every bundle includes lifetime updates, GitHub examples, and priority support.
        </p>
        <div className="inline-flex items-center gap-2 bg-[#10B981]/10 text-[#10B981] px-5 py-2.5 rounded-full text-sm font-bold border border-[#10B981]/20">
          💰 Save up to $22 vs buying individually
        </div>
      </div>
    </section>
  );
}

function ValueStrip() {
  const stats = [
    { value: '3', label: 'Skills in Builder Bundle' },
    { value: '$8', label: 'Average savings vs individual' },
    { value: '∞', label: 'Lifetime updates on all skills' },
  ];
  return (
    <section className="py-12 px-6 bg-[#FAF9F6] border-y border-slate-200">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm">
            <div className="text-3xl font-bold text-[#8B5CF6] mb-2">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BundleCards({ selectedBundle, setSelectedBundle }: { selectedBundle: string, setSelectedBundle: (id: string) => void }) {
  return (
    <section className="py-20 px-6 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-14">Pick your bundle</h2>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {bundles.map((b) => {
            const isFeatured = b.id === selectedBundle;
            return (
              <div
                key={b.id}
                onClick={() => setSelectedBundle(b.id)}
                className={`rounded-3xl p-8 flex flex-col h-full relative transition-all duration-300 cursor-pointer ${isFeatured
                  ? 'bg-gradient-to-b from-[#8B5CF6]/[0.08] to-white border-2 border-[#8B5CF6] shadow-[0_0_40px_rgba(139,92,246,0.15)] md:-translate-y-4 z-10'
                  : 'bg-white border-2 border-slate-200 shadow-sm hover:border-[#8B5CF6]/50'
                  }`}
              >
                {/* Popular badge */}
                {b.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8B5CF6] text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#8B5CF6]/30 flex items-center gap-1.5 whitespace-nowrap">
                    🔥 Most Popular
                  </div>
                )}

                {/* Name & tagline */}
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{b.name}</h3>
                <p className="text-slate-500 text-sm mb-6 h-10">{b.tagline}</p>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-5xl font-bold text-slate-900">${b.price}</span>
                  <span className="text-slate-500 text-sm">one-time</span>
                </div>
                {b.savings > 0 && (
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-slate-400 text-sm line-through">${b.originalValue} individually</span>
                    <span className="bg-[#10B981]/15 text-[#10B981] text-xs font-bold px-2.5 py-1 rounded-full border border-[#10B981]/20">
                      Save ${b.savings}
                    </span>
                  </div>
                )}
                {b.savings === 0 && <div className="mb-6" />}

                {/* Included skills */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mb-6">
                  {b.userPicksSkills ? (
                    <>
                      <div className="text-slate-900 text-sm font-semibold mb-3">✅ Pick any 3 skills from catalog</div>
                      <div className="text-slate-500 text-xs mb-2">Popular picks:</div>
                      {(b as any).popularPicks?.map((s: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-slate-600 text-sm py-1">
                          <span>{s.icon}</span> {s.name}
                        </div>
                      ))}
                    </>
                  ) : b.id === 'full-arsenal' ? (
                    <>
                      {b.includedSkills.map((s: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-slate-600 text-sm py-1">
                          <span>{s.icon}</span> {s.name}
                        </div>
                      ))}
                      <div className="flex items-center gap-2 text-[#8B5CF6] text-sm py-1 font-semibold mt-1">
                        + every future skill (auto)
                      </div>
                    </>
                  ) : (
                    b.includedSkills.map((s: any, i: number) => (
                      <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-200 last:border-0">
                        <div className="flex items-center gap-2 text-slate-600">
                          <span>{s.icon}</span> {s.name}
                        </div>
                        <span className="text-slate-500 text-xs">${s.price} each</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {b.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                {/* CTA */}

                <Link
                  to={`/checkout?plan=${b.id}&price=${b.price}`}
                  className={`w-full py-4 rounded-full font-bold text-center transition-all flex items-center justify-center gap-2 ${isFeatured
                    ? 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-lg shadow-[#8B5CF6]/30'
                    : 'border-2 border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-[#8B5CF6]/50'
                    }`}
                >
                  Get {b.name} — ${b.price}
                  <ArrowRight size={16} />
                </Link>
                <div className="text-center text-[11px] text-slate-400 mt-4">
                  By purchasing, you agree to our <Link to="/terms" className="underline hover:text-slate-500">Terms of Service</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const renderCell = (val: boolean | string) => {
    if (val === true) return <CheckCircle2 size={18} className="mx-auto text-[#10B981]" />;
    if (val === false) return <X size={18} className="mx-auto text-slate-300" />;
    return <span>{val}</span>;
  };
  return (
    <section className="py-20 px-6 bg-white border-y border-slate-200">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">What's included in each bundle</h2>
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[700px] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="grid grid-cols-4 p-5 border-b border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-500 uppercase text-xs tracking-wider">Feature</div>
              <div className="font-bold text-slate-900 text-center text-sm">Starter $19</div>
              <div className="font-bold text-[#8B5CF6] text-center text-sm">Builder $29</div>
              <div className="font-bold text-slate-900 text-center text-sm">Full Arsenal $59</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 p-4 border-b border-slate-100 last:border-0 items-center ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                <div className="font-medium text-slate-600 text-sm">{row.name}</div>
                <div className="text-center text-slate-600 text-sm">{renderCell(row.starter)}</div>
                <div className="text-center text-slate-900 text-sm font-medium">{renderCell(row.builder)}</div>
                <div className="text-center text-slate-900 text-sm font-bold">{renderCell(row.full)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: '01', title: 'Choose your bundle', desc: 'Pick Starter, Builder, or Full Arsenal' },
    { num: '02', title: 'Complete checkout', desc: 'Secure payment via Stripe — instant access' },
    { num: '03', title: 'Pick your skills (Builder plan)', desc: 'Email us your 3 skill choices after purchase. We send the files within 2 hours.' },
  ];
  return (
    <section className="py-20 px-6 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-[#8B5CF6] font-bold text-lg">{s.num}</span>
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center text-sm text-slate-600">
          <span className="bg-white shadow-sm px-4 py-2 rounded-lg border border-slate-200">🚀 Full Arsenal — all skills delivered instantly.</span>
          <span className="bg-white shadow-sm px-4 py-2 rounded-lg border border-slate-200">⚡ Starter — 2 skills delivered instantly.</span>
        </div>
      </div>
    </section>
  );
}

function IndividualSkillsStrip() {
  return (
    <section className="py-20 px-6 bg-white border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Prefer to buy just one skill?</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {individualSkills.map((s) => (
            <Link
              key={s.slug}
              to={`/skills/${s.slug}`}
              className="min-w-[200px] bg-slate-50 rounded-xl border border-slate-200 p-5 hover:border-[#8B5CF6]/40 hover:bg-white transition-all group flex-shrink-0"
            >
              <div className="text-2xl mb-3">{s.icon}</div>
              <h3 className="text-slate-900 font-bold text-sm mb-1">{s.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-slate-900 font-bold">${s.price}</span>
                <span className="text-[#8B5CF6] text-xs font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Learn more <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/skills" className="text-[#8B5CF6] font-bold hover:underline inline-flex items-center gap-2">
            Browse all skills <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialQuote() {
  return (
    <section className="py-20 px-6 bg-[#FAF9F6]">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8 md:p-10 border-l-4 border-[#8B5CF6] relative shadow-sm border border-slate-200 border-l-[#8B5CF6]">
          <div className="absolute -top-3 -left-1 text-[#8B5CF6] text-5xl font-serif leading-none">"</div>
          <blockquote className="text-slate-800 text-lg md:text-xl font-medium leading-relaxed mb-6 pl-4">
            The Builder Bundle was the best $29 I spent this year. Shipped my SaaS in 4 days. It would've cost me $8,000 and 3 months with an agency.
          </blockquote>
          <div className="flex items-center gap-3 pl-4">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] font-bold text-sm">JR</div>
            <div>
              <div className="text-slate-900 font-semibold text-sm">Jake Rivera</div>
              <div className="text-slate-500 text-xs">Solo Founder, ShipFast</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BundleFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="py-20 px-6 bg-white border-y border-slate-200">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Bundle questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-bold text-slate-900 pr-8 text-sm">{faq.q}</span>
                <ChevronDown size={18} className={`text-slate-400 transition-transform shrink-0 ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === i && (
                <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCTA({ bundle }: { bundle: any }) {
  return (
    <section className="py-20 px-6 bg-[#FAF9F6]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Start with the {bundle.name}</h2>
        <p className="text-lg text-slate-500 mb-10">{bundle.tagline}</p>
        <Link
          to={`/checkout?plan=${bundle.id.replace('-bundle', '')}&price=${bundle.price}`}
          className="bg-[#8B5CF6] text-white font-bold px-10 py-5 rounded-full hover:bg-[#7C3AED] transition-all shadow-xl shadow-[#8B5CF6]/20 inline-flex items-center gap-3 text-lg mb-6"
        >
          Get {bundle.name} — ${bundle.price} <ArrowRight size={20} />
        </Link>
        <div className="flex justify-center items-center gap-3 text-sm text-slate-500 font-medium flex-wrap">
          <span>7-day refund</span>
          <span className="text-slate-300">·</span>
          <span>Instant access</span>
          <span className="text-slate-300">·</span>
          <span>Lifetime updates</span>
        </div>
        <div className="text-center text-xs text-slate-400 mt-4">
          By purchasing, you agree to our <Link to="/terms" className="underline hover:text-slate-600">Terms of Service</Link>
        </div>
      </div>
    </section>
  );
}

/* ── Main Page ── */
export function Bundles() {
  const [selectedBundle, setSelectedBundle] = useState('builder-bundle');
  const selectedBundleData = bundles.find(b => b.id === selectedBundle) || bundles[1];

  return (
    <div className="min-h-screen font-sans selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <Navbar />
      <main>
        <BundleHero />
        <ValueStrip />
        <BundleCards selectedBundle={selectedBundle} setSelectedBundle={setSelectedBundle} />
        <ComparisonTable />
        <HowItWorks />
        <IndividualSkillsStrip />
        <TestimonialQuote />
        <BundleFAQ />
        <BottomCTA bundle={selectedBundleData} />
      </main>
      <Footer />
    </div>
  );
}
