import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BrainCircuit, 
  Map, 
  Rocket, 
  Library, 
  BarChart, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Star,
  Quote
} from 'lucide-react';

export function LogoStrip() {
  const companies = ['Acme Corp', 'GlobalTech', 'Nexus', 'Stark Ind.', 'Wayne Ent.', 'Cyberdyne'];
  return (
    <div className="overflow-hidden w-full bg-white">
      <div className="mb-6">
        <p className="text-center text-sm font-semibold text-[#64748B] uppercase tracking-wider">Trusted by teams at</p>
      </div>
      <div className="flex space-x-12 animate-[scroll_30s_linear_infinite] whitespace-nowrap opacity-40">
        {[...companies, ...companies, ...companies].map((company, i) => (
          <span key={i} className="text-2xl font-bold text-[#334155]">{company}</span>
        ))}
      </div>
    </div>
  );
}

export function FeatureGrid() {
  const features = [
    { icon: <BrainCircuit size={24} />, title: "Idea Validator", desc: "AI scores your startup idea across 6 dimensions." },
    { icon: <Map size={24} />, title: "MVP Roadmap Generator", desc: "Get a week-by-week build plan tailored to your idea." },
    { icon: <Rocket size={24} />, title: "Launch Planner", desc: "Step-by-step launch checklist with AI content." },
    { icon: <Library size={24} />, title: "Skill Catalog", desc: "Pre-built AI skills for SaaS, iOS, SEO, Marketing." },
    { icon: <BarChart size={24} />, title: "Progress Tracker", desc: "Track your build milestones in one dashboard." },
    { icon: <Users size={24} />, title: "Founder Community", desc: "Private Slack with 500+ builders." }
  ];

  return (
    <div className="w-full">
      <div className="mb-16">
        <span className="text-[#8B5CF6] font-bold tracking-wider text-sm uppercase mb-3 block">What's Inside</span>
        <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] max-w-2xl leading-tight">
          Everything you need to go from idea to launched
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-[#E2E8F0] hover:shadow-lg hover:border-[#8B5CF6]/30 transition-all group">
            <div className="w-12 h-12 bg-[#F8FAFC] rounded-xl flex items-center justify-center text-[#8B5CF6] mb-6 group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
            <p className="text-[#64748B] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    { num: "01", title: "Pick your skills", desc: "Browse the catalog, pick what fits your build." },
    { num: "02", title: "Point your AI agent", desc: "Drop skill files into Cursor, Claude Code, or Lovable." },
    { num: "03", title: "Ship your product", desc: "Production-ready code in days, not months." }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <span className="text-[#8B5CF6] font-bold tracking-wider text-sm uppercase mb-3 block">How It Works</span>
        <h2 className="text-4xl font-bold text-[#0F172A]">From idea to shipped in 3 steps</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-12 relative">
        {/* Connecting line for desktop */}
        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-[#E2E8F0] z-0" style={{ width: '66%', left: '17%' }} />
        
        {steps.map((step, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-white border-4 border-[#F8FAFC] shadow-xl rounded-full flex items-center justify-center text-3xl font-bold text-[#8B5CF6] mb-6">
              {step.num}
            </div>
            <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
            <p className="text-[#64748B]">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductGallery() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6] overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12">
        <span className="text-[#8B5CF6] font-bold tracking-wider text-sm uppercase mb-3 block">Built with our skills</span>
        <h2 className="text-4xl font-bold text-[#0F172A]">14 products shipped. All started with a skill.</h2>
      </div>
      <div className="flex space-x-6 overflow-x-auto pb-8 px-6 max-w-[1400px] mx-auto snap-x hide-scrollbar">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="min-w-[320px] md:min-w-[400px] bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden snap-center flex-shrink-0">
            <div className="h-48 bg-[#F1F5F9] flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <Rocket className="text-[#cbd5e1]" size={32} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-1">AI Copywriter App {i}</h3>
              <p className="text-sm text-[#64748B] mb-4">Shipped in 4 days • SaaS Builder Skill</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SkillPreview() {
  const skills = [
    { icon: <Layers />, name: "SaaS Builder" },
    { icon: <Terminal />, name: "iOS Builder" },
    { icon: <Star />, name: "Taste & Design" },
    { icon: <Users />, name: "Humanizer" },
    { icon: <BarChart />, name: "shadcn Dashboard" },
    { icon: <Rocket />, name: "Guerrilla Marketing" },
    { icon: <Map />, name: "SEO Optimizer" },
    { icon: <Library />, name: "Landing Page Builder" },
    { icon: <BrainCircuit />, name: "MVP Mega Bundle" }
  ];

  return (
    <section className="py-24 px-6 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#8B5CF6] font-bold tracking-wider text-sm uppercase mb-3 block">Skill Catalog</span>
          <h2 className="text-4xl font-bold text-[#0F172A]">One skill for every part of your product</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] hover:border-[#8B5CF6] hover:bg-[#F8FAFC] transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-lg bg-[#F1F5F9] text-[#64748B] flex items-center justify-center group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                {React.cloneElement(skill.icon, { size: 20 })}
              </div>
              <span className="font-semibold text-[#334155] group-hover:text-[#0F172A]">{skill.name}</span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/skills" className="inline-flex items-center justify-center gap-2 bg-[#F1F5F9] text-[#0F172A] font-semibold py-3 px-8 rounded-full hover:bg-[#E2E8F0] transition-colors">
            View all skills <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FounderStory() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-200 flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-gradient-to-br from-[#8B5CF6]/10 to-[#0EA5E9]/10 relative min-h-[300px] border-r border-slate-100">
            {/* Placeholder for Founder Photo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Users size={64} className="text-[#8B5CF6]/40" />
            </div>
          </div>
          <div className="md:w-3/5 p-10 md:p-16 flex flex-col justify-center relative">
            <Quote className="absolute top-8 left-8 text-slate-100 w-24 h-24 pointer-events-none" />
            <p className="text-2xl md:text-3xl font-medium text-slate-800 leading-snug relative z-10">
              "Building a startup shouldn't require an expensive agency or months of planning. You just need the right AI tools and a clear roadmap."
            </p>
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                <Users size={20} className="text-slate-400" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Founder</div>
                <div className="text-sm text-slate-500">LaunchPilot</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#8B5CF6] font-bold tracking-wider text-sm uppercase mb-3 block">What Builders Say</span>
          <h2 className="text-4xl font-bold text-[#0F172A]">Real results from real founders</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-8 rounded-2xl border border-[#E2E8F0] bg-[#FAF9F6]">
              <div className="flex text-[#F59E0B] mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
              </div>
              <p className="text-[#334155] mb-6 line-clamp-4">
                "LaunchPilot's MVP roadmap generator saved us literally weeks of planning. The skills catalog feels like having a senior engineer sitting next to you."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E2E8F0]" />
                <div>
                  <div className="font-bold text-sm">Sarah Jenkins</div>
                  <div className="text-xs text-[#64748B]">Founder, TechNova</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="#" className="text-[#8B5CF6] font-bold hover:underline inline-flex items-center gap-1">
            Write your review <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function PricingPreview() {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'builder' | 'full-arsenal'>('builder');
  return (
    <section className="py-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#8B5CF6] font-bold tracking-wider text-sm uppercase mb-3 block">Pricing</span>
          <h2 className="text-4xl font-bold text-[#0F172A]">Pick your skill pack</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Single */}
          <div 
            onClick={() => setSelectedPlan('starter')}
            className={`rounded-3xl p-8 transition-all duration-300 cursor-pointer flex flex-col relative ${
              selectedPlan === 'starter' 
                ? 'bg-gradient-to-b from-[#8B5CF6]/[0.08] to-white border-2 border-[#8B5CF6] shadow-xl shadow-[#8B5CF6]/10 transform md:-translate-y-4 z-10' 
                : 'bg-white border-2 border-[#E2E8F0] shadow-sm hover:border-[#8B5CF6]/50'
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">Single Skill</h3>
            <div className="text-4xl font-bold mb-6">$29<span className="text-lg text-[#64748B] font-normal"> one-time</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">Any 1 Premium Skill</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">Lifetime updates</span></li>
            </ul>
            <Link to="/checkout?plan=starter&price=29" className={`block text-center w-full py-3 rounded-full font-bold transition-colors ${selectedPlan === 'starter' ? 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-lg shadow-[#8B5CF6]/30 border-2 border-[#8B5CF6]' : 'border-2 border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]'}`}>Choose Single</Link>
          </div>

          {/* Builder */}
          <div 
            onClick={() => setSelectedPlan('builder')}
            className={`rounded-3xl p-8 transition-all duration-300 cursor-pointer flex flex-col relative ${
              selectedPlan === 'builder' 
                ? 'bg-gradient-to-b from-[#8B5CF6]/[0.08] to-white border-2 border-[#8B5CF6] shadow-xl shadow-[#8B5CF6]/10 transform md:-translate-y-4 z-10' 
                : 'bg-white border-2 border-[#E2E8F0] shadow-sm hover:border-[#8B5CF6]/50'
            }`}
          >
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8B5CF6] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-opacity ${selectedPlan === 'builder' ? 'opacity-100' : 'opacity-0'}`}>
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2 text-[#0F172A]">Builder Bundle</h3>
            <div className="text-4xl font-bold mb-6 text-[#0F172A]">$149<span className="text-lg text-[#64748B] font-normal"> one-time</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155] font-medium">Any 5 Premium Skills</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155] font-medium">MVP Roadmap Generator</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155] font-medium">Priority Support</span></li>
            </ul>
            <Link to="/checkout?plan=builder&price=149" className={`block text-center w-full py-3 rounded-full font-bold transition-colors ${selectedPlan === 'builder' ? 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-lg shadow-[#8B5CF6]/30 border-2 border-[#8B5CF6]' : 'border-2 border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]'}`}>Get the Bundle</Link>
          </div>

          {/* Arsenal */}
          <div 
            onClick={() => setSelectedPlan('full-arsenal')}
            className={`rounded-3xl p-8 transition-all duration-300 cursor-pointer flex flex-col relative ${
              selectedPlan === 'full-arsenal' 
                ? 'bg-gradient-to-b from-[#8B5CF6]/[0.08] to-white border-2 border-[#8B5CF6] shadow-xl shadow-[#8B5CF6]/10 transform md:-translate-y-4 z-10' 
                : 'bg-white border-2 border-[#E2E8F0] shadow-sm hover:border-[#8B5CF6]/50'
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">Full Arsenal</h3>
            <div className="text-4xl font-bold mb-6">$299<span className="text-lg text-[#64748B] font-normal"> one-time</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">All Current Skills</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">All Future Skills</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={20} /> <span className="text-[#334155]">Private Slack Community</span></li>
            </ul>
            <Link to="/checkout?plan=full-arsenal&price=299" className={`block text-center w-full py-3 rounded-full font-bold transition-colors ${selectedPlan === 'full-arsenal' ? 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-lg shadow-[#8B5CF6]/30 border-2 border-[#8B5CF6]' : 'border-2 border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]'}`}>Unlock Everything</Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-[#64748B] font-medium">
          <div className="flex items-center gap-2"><CheckCircle2 size={16} /> 14-day money back</div>
          <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Lifetime updates</div>
          <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Works with any AI agent</div>
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-10 md:p-16 text-center relative overflow-hidden shadow-xl shadow-slate-200/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
        
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 relative z-10">Ship faster with AI skills</h2>
        <p className="text-[#64748B] mb-8 relative z-10 text-lg">Weekly skill drops. Free resources to build your startup.</p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
          <input 
            type="email" 
            placeholder="founder@startup.com" 
            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-6 py-3 text-slate-900 focus:outline-none focus:border-[#8B5CF6] placeholder:text-[#94A3B8]"
          />
          <button type="submit" className="bg-[#8B5CF6] text-white font-bold rounded-full px-8 py-3 hover:bg-[#7C3AED] transition-colors whitespace-nowrap shadow-md shadow-[#8B5CF6]/20">
            Get free skills
          </button>
        </form>
        <p className="text-[#64748B] text-xs mt-4 relative z-10">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
