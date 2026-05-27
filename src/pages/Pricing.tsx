import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import { useAuth } from '../contexts/AuthContext';
import { 
  CheckCircle2, 
  X,
  Zap,
  ArrowRight,
  ChevronDown,
  RefreshCcw,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  Star,
  Users,
  BarChart,
  Rocket,
  Map,
  Library,
  Loader2
} from 'lucide-react';

function PageHero() {
  return (
    <section className="pt-32 pb-12 px-6 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Early Bird Banner */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-md shadow-[#F59E0B]/20 whitespace-nowrap">
          🔥 Early Bird Pricing — Limited Time
        </div>
        
        <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 text-[#8B5CF6] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
          💸 Simple Pricing
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
          One-time price. <br className="hidden md:block" />
          <span className="text-[#8B5CF6]">Use it forever.</span>
        </h1>
        <p className="text-xl text-[#334155] leading-relaxed max-w-2xl mx-auto font-medium">
          No subscriptions. No hidden fees. Buy a skill once and use it with any AI agent, forever.
        </p>
      </div>
    </section>
  );
}

function TrustBadgeStrip() {
  const badges = [
    { icon: <RefreshCcw size={18} />, text: 'Lifetime updates included' },
    { icon: <ShieldCheck size={18} />, text: '7-day money-back guarantee' },
    { icon: <Cpu size={18} />, text: 'Works with Claude Code, Cursor, Lovable & more' },
  ];
  return (
    <div className="bg-[#FAF9F6] pb-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center gap-6 md:gap-12">
        {badges.map((b, i) => (
          <div key={i} className="flex items-center justify-center gap-2 text-sm font-semibold text-[#64748B]">
            <span className="text-[#8B5CF6]">{b.icon}</span>
            {b.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingCards({ selectedPlan, setSelectedPlan }: { selectedPlan: string, setSelectedPlan: (plan: 'starter' | 'builder' | 'fullstack') => void }) {

  const getCardClasses = (id: string) => {
    const base = "rounded-3xl p-8 flex flex-col h-full mt-4 md:mt-8 transition-all duration-300 cursor-pointer border-2 relative ";
    if (selectedPlan === id) {
      return base + "bg-gradient-to-b from-[#8B5CF6]/[0.08] to-white border-[#8B5CF6] shadow-xl shadow-[#8B5CF6]/10 z-10 md:-translate-y-4";
    }
    return base + "bg-white border-[#E2E8F0] shadow-sm hover:border-[#8B5CF6]/50";
  };

  const getButtonClasses = (id: string) => {
    const base = "w-full py-4 rounded-full font-bold transition-colors ";
    if (selectedPlan === id) {
      return base + "bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-lg shadow-[#8B5CF6]/30";
    }
    return base + "border-2 border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]";
  };

  return (
    <section className="pb-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start">
        
        {/* Starter Plan */}
        <div 
          className={getCardClasses('starter')}
          onClick={() => setSelectedPlan('starter')}
        >
          <h3 className="text-2xl font-bold mb-1 text-[#0F172A]">Starter</h3>
          <p className="text-[#64748B] text-sm mb-6 h-10">Perfect for testing your first AI skill</p>
          <div className="text-5xl font-bold mb-8 text-[#0F172A]">$9<span className="text-lg text-[#64748B] font-normal"> one-time</span></div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">1 skill file (SKILL.md)</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">Works with Claude, Cursor, Lovable</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">Basic setup guide (README)</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">Lifetime updates for that skill</span></li>
            <li className="flex items-start gap-3"><X className="text-[#CBD5E1] shrink-0" size={20} /> <span className="text-[#94A3B8] line-through">No GitHub example project</span></li>
            <li className="flex items-start gap-3"><X className="text-[#CBD5E1] shrink-0" size={20} /> <span className="text-[#94A3B8] line-through">No support</span></li>
          </ul>
          
          <Link to="/book-appointment?plan=starter&price=9" className={getButtonClasses('starter') + " block text-center"}>
            Book Starter Consultation
          </Link>
          <div className="text-center text-[11px] text-[#94A3B8] mt-4">
            By purchasing, you agree to our <Link to="/terms" className="underline hover:text-[#334155]">Terms of Service</Link>
          </div>
        </div>

        {/* Builder Plan (Popular) */}
        <div 
          className={getCardClasses('builder')}
          onClick={() => setSelectedPlan('builder')}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8B5CF6] text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#8B5CF6]/30 flex items-center gap-1.5 whitespace-nowrap">
            🔥 Most Popular
          </div>
          
          <h3 className="text-2xl font-bold mb-1 text-[#0F172A]">Builder</h3>
          <p className="text-[#64748B] text-sm mb-6 h-10">Everything to ship your first MVP</p>
          <div className="text-5xl font-bold mb-8 text-[#0F172A]">$29<span className="text-lg text-[#64748B] font-normal"> one-time</span></div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#0F172A] font-medium">3 skill files of your choice</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">Works with all AI agents</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">GitHub example project</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">Setup guide + quick-start checklist</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">Lifetime updates for all 3 skills</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">Email support (48hr response)</span></li>
            <li className="flex items-start gap-3"><X className="text-[#CBD5E1] shrink-0" size={20} /> <span className="text-[#94A3B8] line-through">No 1-on-1 call</span></li>
          </ul>
          
          <Link to="/book-appointment?plan=builder&price=29" className={getButtonClasses('builder') + " block text-center"}>
            Book Builder Consultation
          </Link>
          <div className="text-center text-[11px] text-[#64748B] mt-4">
            By purchasing, you agree to our <Link to="/terms" className="underline hover:text-[#64748B]">Terms of Service</Link>
          </div>
        </div>

        {/* Full Stack Plan */}
        <div 
          className={getCardClasses('fullstack')}
          onClick={() => setSelectedPlan('fullstack')}
        >
          <h3 className="text-2xl font-bold mb-1 text-[#0F172A]">Full Stack</h3>
          <p className="text-[#64748B] text-sm mb-6 h-10">All skills. Ship anything.</p>
          <div className="text-5xl font-bold mb-8 text-[#0F172A]">$59<span className="text-lg text-[#64748B] font-normal"> one-time</span></div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#0F172A] font-bold">All current skills (5+)</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#0F172A] font-bold">Every future skill automatically</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">All GitHub example projects</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">Replit / Lovable deploy template</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">Lifetime updates forever</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">Priority email support (24hr)</span></li>
            <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">30-min onboarding call with founder</span></li>
          </ul>
          
          <Link to="/book-appointment?plan=fullstack&price=59" className={getButtonClasses('fullstack') + " block text-center"}>
            Book Full Stack Session
          </Link>
          <div className="text-center text-[11px] text-[#94A3B8] mt-4">
            By purchasing, you agree to our <Link to="/terms" className="underline hover:text-[#334155]">Terms of Service</Link>
          </div>
        </div>

      </div>
    </section>
  );
}

function WhatIsInsideCard() {
  return (
    <section className="py-16 px-6 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-8">What exactly do you get?</h2>
        
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-md text-left font-mono text-sm md:text-base leading-relaxed text-slate-500">
          <div className="flex gap-4"><span className="text-slate-900 w-40 font-semibold">📄 SKILL.md</span> <span className="text-slate-600">— Full AI agent instructions</span></div>
          <div className="flex gap-4 mt-3"><span className="text-slate-900 w-40 font-semibold">📘 README.md</span> <span className="text-slate-600">— Setup guide, how to use</span></div>
          <div className="flex gap-4 mt-3"><span className="text-slate-900 w-40 font-semibold">💻 Example project</span> <span className="text-slate-600">— Real working code on GitHub</span></div>
          <div className="flex gap-4 mt-3"><span className="text-[#8B5CF6] w-40 font-semibold">🔄 Updates</span> <span className="text-slate-600">— Lifetime, pushed to your email</span></div>
          <div className="flex gap-4 mt-3"><span className="text-[#10B981] w-40 font-semibold">🔒 Checklist</span> <span className="text-slate-600">— Security + best practices</span></div>
        </div>
        
        <p className="text-[#64748B] mt-6 font-medium">Plain markdown files. No apps to install. No accounts to create.</p>
      </div>
    </section>
  );
}

function SkillPickerGrid() {
  const [selected, setSelected] = useState<number[]>([]);
  
  const toggleSkill = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else {
      if (selected.length < 3) setSelected([...selected, id]);
    }
  };

  const skills = [
    { id: 1, icon: <Layers />, title: 'SaaS Builder', desc: 'Full-stack SaaS with auth + billing' },
    { id: 2, icon: <Terminal />, title: 'iOS Builder', desc: 'SwiftUI apps with backend' },
    { id: 3, icon: <Star />, title: 'Taste & Design', desc: 'Pixel-perfect UI systems' },
    { id: 4, icon: <Users />, title: 'Humanizer', desc: 'AI copy that reads human' },
    { id: 5, icon: <BarChart />, title: 'shadcn Dashboard', desc: 'Admin panels with shadcn/ui' },
    { id: 6, icon: <Rocket />, title: 'Guerrilla Marketing', desc: 'Viral growth + launch strategy' },
    { id: 7, icon: <Map />, title: 'SEO Optimizer', desc: 'Technical SEO + structured data' },
    { id: 8, icon: <Library />, title: 'Landing Page Builder', desc: 'High-converting landing pages' }
  ];

  return (
    <section className="py-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">On the Builder plan? Pick your 3 skills.</h2>
          <p className="text-[#64748B]">
            Selected: <span className="font-bold text-[#8B5CF6]">{selected.length}/3</span> 
            <span className="mx-2 text-[#CBD5E1]">|</span>
            Not sure which 3? <a href="#" className="text-[#8B5CF6] font-medium hover:underline">Take the Skill Finder quiz &rarr;</a>
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map(s => {
            const isSelected = selected.includes(s.id);
            return (
              <div 
                key={s.id} 
                onClick={() => toggleSkill(s.id)}
                className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-[#8B5CF6] bg-[#8B5CF6]/5' 
                    : 'border-[#E2E8F0] bg-white hover:border-[#8B5CF6]/50'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 text-[#8B5CF6]">
                    <CheckCircle2 size={20} fill="currentColor" className="text-white" />
                  </div>
                )}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  isSelected ? 'bg-[#8B5CF6] text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                }`}>
                  {React.cloneElement(s.icon, { size: 20 })}
                </div>
                <h3 className={`font-bold mb-1 ${isSelected ? 'text-[#0F172A]' : 'text-[#334155]'}`}>{s.title}</h3>
                <p className="text-xs text-[#64748B]">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  
  const faqs = [
    { q: 'Do I need to pay again for updates?', a: 'No. Once you buy, updates are free forever. You\'ll get an email when a skill is updated.' },
    { q: 'Which AI tools do the skills work with?', a: 'Claude Code, Cursor, Antigravity, Lovable, Replit, Bolt, v0, Windsurf — anything that can read a markdown file.' },
    { q: 'What if I already use Replit or Lovable?', a: 'Skills work perfectly. Just drop the SKILL.md into your project folder and point your agent at it.' },
    { q: 'Can I switch my 3 skills after purchase?', a: 'Yes, within 7 days of purchase. Email us and we\'ll swap them.' },
    { q: 'Is there a refund policy?', a: '7-day no-questions-asked refund. If the skills don\'t work for your setup, we\'ll refund you.' },
    { q: 'Can I use the skills on multiple projects?', a: 'Yes. Buy once, use on as many projects as you want.' },
    { q: 'Will you add more skills?', a: 'Yes, new skills drop regularly. Full Stack plan gets every new skill automatically.' }
  ];

  return (
    <section className="py-24 px-6 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-10 text-center">Common questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-[#E2E8F0] rounded-2xl overflow-hidden">
              <button 
                className="w-full text-left px-6 py-5 flex items-center justify-between bg-white hover:bg-[#F8FAFC] transition-colors"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-bold text-[#0F172A] pr-8">{faq.q}</span>
                <ChevronDown size={20} className={`text-[#64748B] transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === i && (
                <div className="px-6 pb-5 pt-1 text-[#475569] leading-relaxed bg-white">
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

function ComparisonTable() {
  const rows = [
    { name: 'Skill files', starter: '1', builder: '3 (your pick)', full: 'All (5+)' },
    { name: 'Future skills', starter: false, builder: false, full: '✅ Auto' },
    { name: 'GitHub project', starter: false, builder: true, full: true },
    { name: 'Deploy template', starter: false, builder: false, full: true },
    { name: 'Email support', starter: false, builder: '✅ 48hr', full: '✅ 24hr' },
    { name: 'Onboarding call', starter: false, builder: false, full: '✅ 30 min' },
    { name: 'Lifetime updates', starter: true, builder: true, full: true },
    { name: 'Money-back', starter: '7 days', builder: '7 days', full: '7 days' },
  ];

  return (
    <section className="py-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center">Compare plans</h2>
        <div className="overflow-x-auto pb-6">
          <div className="min-w-[700px] bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-sm">
            <div className="grid grid-cols-4 p-6 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="font-bold text-[#64748B] uppercase text-xs tracking-wider flex items-center">Feature</div>
              <div className="font-bold text-[#0F172A] text-center">Starter $9</div>
              <div className="font-bold text-[#8B5CF6] text-center">Builder $29</div>
              <div className="font-bold text-[#0F172A] text-center">Full Stack $59</div>
            </div>
            {rows.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 p-5 border-b border-[#E2E8F0] last:border-b-0 items-center ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAF9F6]'}`}>
                <div className="font-semibold text-[#334155]">{row.name}</div>
                <div className="text-center text-[#64748B]">
                  {row.starter === true ? <CheckCircle2 size={18} className="mx-auto text-[#10B981]" /> : row.starter === false ? <X size={18} className="mx-auto text-[#CBD5E1]" /> : row.starter}
                </div>
                <div className="text-center font-medium text-[#0F172A]">
                  {row.builder === true ? <CheckCircle2 size={18} className="mx-auto text-[#8B5CF6]" /> : row.builder === false ? <X size={18} className="mx-auto text-[#CBD5E1]" /> : row.builder}
                </div>
                <div className="text-center font-bold text-[#0F172A]">
                  {row.full === true ? <CheckCircle2 size={18} className="mx-auto text-[#10B981]" /> : row.full === false ? <X size={18} className="mx-auto text-[#CBD5E1]" /> : row.full}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection({ selectedPlan }: { selectedPlan: string }) {
  const price = selectedPlan === 'starter' ? 9 : selectedPlan === 'builder' ? 29 : 59;
  return (
    <section className="py-24 px-6 bg-[#FAF9F6] text-center border-t border-[#E2E8F0]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Start building today</h2>
        <p className="text-xl text-[#64748B] mb-10">First 10 customers get a free bonus skill. No code needed to get started.</p>
        
        <Link 
          to={`/book-appointment?plan=${selectedPlan}&price=${price}`}
          className="inline-flex items-center gap-3 bg-[#8B5CF6] text-white font-bold px-12 py-5 rounded-full hover:bg-[#7C3AED] transition-all shadow-xl shadow-[#8B5CF6]/20 text-lg mb-8"
        >
          Book {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1).replace('stack', ' Stack')} Session <ArrowRight size={20} />
        </Link>
        
        <div className="flex justify-center items-center gap-2 text-sm text-[#64748B] font-medium">
          7-day refund <span className="text-[#CBD5E1]">•</span> Instant access <span className="text-[#CBD5E1]">•</span> No subscription
        </div>
        <div className="text-center text-xs text-[#94A3B8] mt-4">
          By purchasing, you agree to our <Link to="/terms" className="underline hover:text-[#64748B]">Terms of Service</Link>
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'builder' | 'fullstack'>('builder');
  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <Navbar />
      <main>
        <PageHero />
        <TrustBadgeStrip />
        <PricingCards selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
        <WhatIsInsideCard />
        <SkillPickerGrid />
        <FAQAccordion />
        <ComparisonTable />
        <CTASection selectedPlan={selectedPlan} />
      </main>
      <Footer />
    </div>
  );
}
