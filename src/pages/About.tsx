import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import {
  Zap,
  Unlock,
  DollarSign,
  BrainCircuit,
  Users,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  Twitter,
  Linkedin,
  Mail,
  Calendar
} from 'lucide-react';

function PageHero() {
  return (
    <section className="pt-32 pb-16 px-6 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] mb-8 leading-tight tracking-tight">
          I got tired of watching founders <br className="hidden md:block" />
          <span className="text-[#8B5CF6]">waste money on agencies.</span>
        </h1>
        <p className="text-xl text-[#334155] leading-relaxed max-w-2xl mx-auto font-medium">
          So I packaged 6 years of building into AI skills that any founder can use today.
          No agency. No bloated retainer. Just ship.
        </p>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="py-24 px-6 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        {/* Founder Photo */}
        <div className="md:w-2/5 w-full">
          <div className="bg-white w-full aspect-[4/5] rounded-3xl relative overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-200">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 to-transparent opacity-80" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
              <Users size={64} className="mb-4 opacity-50" />
              <div className="font-mono text-sm uppercase tracking-widest opacity-50">Founder Photo</div>
            </div>
          </div>
          <div className="flex gap-4 mt-6 justify-center md:justify-start">
            <a href="#" className="flex items-center gap-2 text-[#64748B] hover:text-[#0A66C2] font-semibold transition-colors">
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-2 text-[#64748B] hover:text-[#38BDF8] font-semibold transition-colors">
              <Twitter size={20} /> Twitter
            </a>
          </div>
        </div>

        {/* Story */}
        <div className="md:w-3/5 text-lg text-[#334155] leading-[1.8] space-y-6">
          <p className="text-2xl font-bold text-[#0F172A] mb-8"></p>

          <p>
            I've been building products for 6 years. Started as a developer. Became a founder.
            Ran an agency. Shipped 30+ products.
          </p>

          <p>
            I watched hundreds of founders do the same thing: hire expensive agencies, wait 3 months,
            get something that didn't fit, then run out of money.
          </p>

          <p>
            Then AI coding tools changed everything. Cursor. Claude Code. Lovable. Suddenly one person
            could build what used to take a team of 5.
          </p>

          <p>
            But there was still a missing piece — no one was giving AI agents the right instructions
            for building production-ready products.
          </p>

          <p className="font-bold text-[#0F172A] text-xl pt-4">
            That's why I built this.
          </p>

          <p>
            Pre-built AI skills. Battle-tested instructions. So any founder can ship a real product in days.
          </p>

          <p className="font-bold text-[#8B5CF6] text-xl">
            Not months. Not $50,000. Days. $29.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatStrip() {
  const stats = [
    { num: '6+', label: 'Years building products' },
    { num: '30+', label: 'Products shipped' },
    { num: '500+', label: 'Founders helped' },
    { num: '$29', label: 'Starting price' },
  ];
  return (
    <div className="bg-white border-y border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100/0 md:divide-slate-200">
          {stats.map((s, i) => (
            <div key={i} className={`text-center px-4 ${i % 2 !== 0 ? 'border-l border-slate-200 md:border-l-0' : ''}`}>
              <div className="text-5xl font-bold text-[#8B5CF6] mb-2">{s.num}</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhyIBuiltThis() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#8B5CF6] font-bold tracking-wider text-sm uppercase mb-3 block">Why this exists</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Agencies charge $50,000. The right AI skill costs $29.</h2>
        </div>

        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">

          {/* Old Way */}
          <div className="md:w-1/2 p-10 md:p-16 bg-[#F8FAFC]">
            <h3 className="text-xl font-bold text-[#0F172A] mb-8 text-center uppercase tracking-wide">The Old Way (Agency)</h3>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-lg text-[#64748B]"><XCircle className="text-[#CBD5E1] shrink-0" size={24} /> $5,000–$50,000 upfront</li>
              <li className="flex items-center gap-4 text-lg text-[#64748B]"><XCircle className="text-[#CBD5E1] shrink-0" size={24} /> 3–6 months to deliver</li>
              <li className="flex items-center gap-4 text-lg text-[#64748B]"><XCircle className="text-[#CBD5E1] shrink-0" size={24} /> You don't own the process</li>
              <li className="flex items-center gap-4 text-lg text-[#64748B]"><XCircle className="text-[#CBD5E1] shrink-0" size={24} /> Every change costs extra</li>
              <li className="flex items-center gap-4 text-lg text-[#64748B]"><XCircle className="text-[#CBD5E1] shrink-0" size={24} /> They leave when money runs out</li>
            </ul>
          </div>

          {/* New Way */}
          <div className="md:w-1/2 p-10 md:p-16 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#8B5CF6]" />
            <h3 className="text-xl font-bold text-[#8B5CF6] mb-8 text-center uppercase tracking-wide">The New Way (Our Skills)</h3>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-lg text-[#0F172A] font-medium"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={24} /> $9–$59 one-time</li>
              <li className="flex items-center gap-4 text-lg text-[#0F172A] font-medium"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={24} /> Ship in days, not months</li>
              <li className="flex items-center gap-4 text-lg text-[#0F172A] font-medium"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={24} /> You own everything</li>
              <li className="flex items-center gap-4 text-lg text-[#0F172A] font-medium"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={24} /> Lifetime updates free</li>
              <li className="flex items-center gap-4 text-lg text-[#0F172A] font-medium"><CheckCircle2 className="text-[#8B5CF6] shrink-0" size={24} /> Works forever with any AI tool</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

function MissionStatement() {
  return (
    <section className="py-24 px-6 bg-white border-y border-slate-200 text-center relative overflow-hidden shadow-sm">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
          "Every founder deserves access to the same tools and knowledge that elite engineering teams use. <br className="hidden md:block" />
          <span className="text-[#8B5CF6]">We're making that happen — one skill at a time.</span>"
        </h2>
      </div>
    </section>
  );
}

function ValuesGrid() {
  const values = [
    { icon: <Zap />, title: "Ship fast", desc: "An imperfect product shipped beats a perfect product planned. Always." },
    { icon: <Unlock />, title: "No lock-in", desc: "You own your code. Your agent. Your product. We just give you better instructions." },
    { icon: <DollarSign />, title: "Fair pricing", desc: "Skills should be accessible to every founder — not just funded startups." },
    { icon: <BrainCircuit />, title: "Practical over theory", desc: "Every skill is battle-tested on real products. No fluff." },
    { icon: <Users />, title: "Builder first", desc: "We build alongside founders. Not above them." },
    { icon: <RefreshCcw />, title: "Always improving", desc: "Every skill gets updated as AI tools evolve. You get updates forever." }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#8B5CF6] font-bold tracking-wider text-sm uppercase mb-3 block">What we stand for</span>
          <h2 className="text-4xl font-bold text-[#0F172A]">Built on these principles</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-[#FAF9F6] p-8 rounded-2xl border border-[#E2E8F0]">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#8B5CF6] mb-6 shadow-sm border border-[#E2E8F0]">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#0F172A]">{v.title}</h3>
              <p className="text-[#64748B] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolStack() {
  const tools = [
    'Claude Code', 'Cursor', 'Lovable', 'Replit', 'Supabase',
    'Vite', 'React', 'TypeScript', 'Tailwind', 'Node.js',
    'MongoDB', 'PostgreSQL', 'BullMQ', 'Redis', 'Stripe'
  ];

  return (
    <section className="py-24 px-6 bg-[#FAF9F6] border-y border-[#E2E8F0]">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-[#8B5CF6] font-bold tracking-wider text-sm uppercase mb-3 block">The tools I trust</span>
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">Built with what actually works</h2>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tools.map(tool => (
            <div key={tool} className="bg-white border border-[#E2E8F0] text-[#0F172A] px-5 py-2.5 rounded-full font-bold text-sm shadow-sm hover:border-[#8B5CF6] transition-colors">
              {tool}
            </div>
          ))}
        </div>
        <p className="text-[#64748B] max-w-2xl mx-auto font-medium">
          Every skill is built and tested with these tools — nothing recommended that I don't use myself.
        </p>
      </div>
    </section>
  );
}

function Timeline() {
  const events = [
    { year: '2019', title: 'Started as a fullstack developer', desc: 'Built first SaaS product from scratch' },
    { year: '2021', title: 'Joined agency world', desc: 'Shipped 20+ client products' },
    { year: '2023', title: 'Discovered AI-assisted development', desc: 'Cut build time by 70%' },
    { year: '2024', title: 'Built first AI skill file', desc: 'Shipped product in 3 days instead of 3 months' },
    { year: '2025', title: 'Launched this platform', desc: 'Helping 500+ founders ship faster' },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#8B5CF6] font-bold tracking-wider text-sm uppercase mb-3 block">The Journey</span>
          <h2 className="text-4xl font-bold text-[#0F172A]">How we got here</h2>
        </div>

        <div className="relative pl-8 md:pl-0">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#E2E8F0] md:-translate-x-1/2" />

          <div className="space-y-12">
            {events.map((e, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[#8B5CF6] border-4 border-white shadow-sm transform -translate-x-[7px] md:-translate-x-1/2 mt-1.5 md:mt-0 z-10" />

                {/* Content */}
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'} pl-8 md:pl-0`}>
                  <div className="text-[#8B5CF6] font-bold text-xl mb-1 flex items-center gap-2 justify-start md:justify-end">
                    {i % 2 !== 0 && <Calendar size={18} className="hidden md:block" />}
                    {e.year}
                    {i % 2 === 0 && <Calendar size={18} className="hidden md:block" />}
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">{e.title}</h3>
                  <p className="text-[#64748B]">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PullQuote() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6] border-y border-[#E2E8F0]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-10 md:p-16 border border-slate-200 shadow-xl shadow-slate-200/40 text-center md:text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight mb-8 relative z-10">
            "I've worked with agencies that charged me $15,000 for what this $29 skill helped me build in a weekend."
          </h2>
          <div className="font-bold text-slate-500 relative z-10 uppercase tracking-wider text-sm">
            — Marcus Chen, Early Beta Tester
          </div>
        </div>
      </div>
    </section>
  );
}

function CollaborationCTA() {
  return (
    <section className="py-24 px-6 bg-white text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-[#0F172A] mb-6">Want to work together?</h2>
        <p className="text-lg text-[#64748B] mb-10 leading-relaxed">
          I take on a limited number of custom skill builds and consulting projects for founders who need something specific. Let's talk.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-[#8B5CF6] text-white font-bold px-8 py-4 rounded-full hover:bg-[#7C3AED] transition-colors shadow-lg shadow-[#8B5CF6]/20">
            Book a call
          </button>
          <button className="border-2 border-[#E2E8F0] text-[#0F172A] font-bold px-8 py-4 rounded-full hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-2">
            <Mail size={18} /> Send an email
          </button>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <Navbar />
      <main>
        <PageHero />
        <FounderSection />
        <StatStrip />
        <WhyIBuiltThis />
        <MissionStatement />
        <ValuesGrid />
        <ToolStack />
        <Timeline />
        <PullQuote />
        <CollaborationCTA />
      </main>
      <Footer />
    </div>
  );
}
