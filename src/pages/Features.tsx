import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import { 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Map,
  Code2,
  Rocket,
  Search,
  Activity,
  Check
} from 'lucide-react';

function PageHero() {
  return (
    <section className="pt-32 pb-16 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 bg-[#8B5CF6] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6 shadow-md shadow-[#8B5CF6]/20">
          <Sparkles size={12} />
          🛠️ Platform Features
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
          Everything your AI agent <br className="hidden md:block" />
          <span className="text-[#8B5CF6]">needs to ship faster</span>
        </h1>
        <p className="max-w-7xl mx-auto px-6 lg:px-8">
          From idea validation to launch — every step covered by battle-tested AI skills and tools.
        </p>
      </div>
    </section>
  );
}

function StatStrip() {
  return (
    <div className="bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[#E2E8F0]/0 md:divide-[#E2E8F0]">
          <div className="text-center px-4">
            <div className="text-4xl font-bold text-[#0F172A] mb-1">9+</div>
            <div className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">Skills Available</div>
          </div>
          <div className="text-center px-4 border-l border-[#E2E8F0] md:border-l-0">
            <div className="text-4xl font-bold text-[#0F172A] mb-1">500+</div>
            <div className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">Founders Using</div>
          </div>
          <div className="text-center px-4 mt-8 md:mt-0">
            <div className="text-4xl font-bold text-[#0F172A] mb-1">100+</div>
            <div className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">Products Shipped</div>
          </div>
          <div className="text-center px-4 mt-8 md:mt-0 border-l border-[#E2E8F0] md:border-l-0">
            <div className="text-4xl font-bold text-[#0F172A] mb-1">12+</div>
            <div className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">Years Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({ 
  label, title, desc, bullets, visualIcon, visualTitle, visualDesc, isReversed, bg 
}: { 
  label: string, title: string, desc: string, bullets: string[], visualIcon: React.ReactNode, visualTitle: string, visualDesc: string, isReversed: boolean, bg: string 
}) {
  return (
    <section className={`py-24 px-6 ${bg}`}>
      <div className={`max-w-7xl mx-auto px-6 lg:px-8`}>
        
        {/* Text Content */}
        <div className="flex-1">
          <div className="inline-block border-l-2 border-[#8B5CF6] pl-3 mb-6">
            <span className="text-[#8B5CF6] font-bold text-sm tracking-widest uppercase">{label}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 leading-tight">{title}</h2>
          <p className="text-lg text-[#334155] mb-8 leading-relaxed">{desc}</p>
          <ul className="space-y-4">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-[#8B5CF6]" strokeWidth={3} />
                </div>
                <span className="text-[#334155] font-medium">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual Mockup */}
        <div className="flex-1 w-full max-w-lg">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="w-3 h-3 rounded-full bg-slate-300" />
              <div className="flex-1 text-center">
                <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-md text-xs font-mono text-slate-500 border border-slate-200">
                  {visualTitle}
                </div>
              </div>
            </div>
            <div className="p-8 flex flex-col items-center justify-center min-h-[320px] text-center bg-slate-50/50">
              <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-2xl flex items-center justify-center text-[#8B5CF6] mb-6">
                {visualIcon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{visualTitle}</h3>
              <p className="text-slate-500 text-sm max-w-xs">{visualDesc}</p>
              
              {/* Dummy UI Elements */}
              <div className="w-full mt-8 space-y-3">
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-[70%] bg-[#8B5CF6]" />
                </div>
                <div className="h-2.5 w-[85%] bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-[#F59E0B]" />
                </div>
                <div className="h-2.5 w-[60%] bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-[90%] bg-[#10B981]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

function CompatibilityGrid() {
  const tools = ['Claude Code', 'Cursor', 'Lovable', 'Replit', 'Antigravity', 'Bolt', 'v0', 'Windsurf'];
  return (
    <section className="py-24 px-6 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Works with every AI coding tool</h2>
        <p className="max-w-7xl mx-auto px-6 lg:px-8">
          Skills are plain Markdown files. If your AI agent can read a file, it works perfectly.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tools.map(tool => (
            <div key={tool} className="bg-slate-100 text-slate-900 px-6 py-3 rounded-full font-semibold text-sm shadow-sm border border-slate-200">
              {tool}
            </div>
          ))}
        </div>
        <div className="inline-flex items-center gap-2 text-[#8B5CF6] font-bold bg-[#8B5CF6]/10 px-5 py-2.5 rounded-full">
          <CheckCircle2 size={18} /> No lock-in. Use any tool, any time.
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { feature: 'Cost', agency: '$5,000–$50,000', skills: 'From $29' },
    { feature: 'Time to start', agency: '2–4 weeks', skills: 'Instant' },
    { feature: 'MVP delivery', agency: '3–6 months', skills: 'Days' },
    { feature: 'Lock-in', agency: 'High', skills: 'None' },
    { feature: 'Updates', agency: 'Extra cost', skills: 'Lifetime included' },
    { feature: 'AI-native', agency: 'Rarely', skills: 'Always' },
  ];

  return (
    <section className="py-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-12 text-center">Skills vs hiring an agency</h2>
        <div className="bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-sm">
          <div className="grid grid-cols-3 p-6 border-b border-[#E2E8F0] bg-[#F8FAFC]">
            <div className="font-bold text-[#64748B] uppercase text-xs tracking-wider">Feature</div>
            <div className="font-bold text-[#0F172A] text-center">❌ Agency</div>
            <div className="font-bold text-[#8B5CF6] text-center">✅ Our Skills</div>
          </div>
          {rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 p-6 border-b border-[#E2E8F0] last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAF9F6]'}`}>
              <div className="font-semibold text-[#334155]">{row.feature}</div>
              <div className="text-center text-[#64748B]">{row.agency}</div>
              <div className="text-center font-bold text-[#0F172A]">{row.skills}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PullQuote() {
  return (
    <section className="py-24 px-6 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border-l-4 border-[#8B5CF6] pl-8 py-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-8">
            "I shipped my SaaS in 4 days using the Builder Bundle. Saved me at least $8,000 in agency fees."
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#E2E8F0]" />
            <div>
              <div className="font-bold text-[#0F172A]">Marcus Chen</div>
              <div className="text-sm text-[#64748B]">Founder, DataFlow API</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6] text-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Ready to build faster?</h2>
        <p className="text-xl text-[#64748B] mb-10">One-time purchase. No subscriptions. Use forever.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Link to="/skills" className="bg-[#8B5CF6] text-white font-bold px-8 py-4 rounded-full hover:bg-[#7C3AED] transition-colors shadow-lg shadow-[#8B5CF6]/20 inline-flex justify-center items-center gap-2">
            Browse Skills <ArrowRight size={18} />
          </Link>
          <button className="border-2 border-[#E2E8F0] text-[#0F172A] font-bold px-8 py-4 rounded-full hover:bg-white transition-colors inline-flex justify-center items-center">
            Take the Quiz
          </button>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#64748B] font-medium">
          <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#8B5CF6]" /> 14-day refund</div>
          <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#8B5CF6]" /> Lifetime updates</div>
          <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#8B5CF6]" /> Works with any agent</div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const coreFeatures = [
    {
      label: 'VALIDATE',
      title: 'Know if your idea is worth building — before you write a line of code',
      desc: 'Our AI scores your startup idea across 6 dimensions: market size, competition, feasibility, monetization, timing, and founder-market fit. Get a clear go/no-go signal in minutes.',
      bullets: ['6-dimension scoring framework', 'Competitor gap analysis', 'Target audience mapping', 'Monetization model suggestions'],
      visualIcon: <BrainCircuit size={32} />,
      visualTitle: 'Idea Scoring Matrix',
      visualDesc: 'Comprehensive feasibility analysis ready in seconds.',
      isReversed: false,
      bg: 'bg-[#FAF9F6]'
    },
    {
      label: 'PLAN',
      title: 'Week-by-week build plan tailored to your idea',
      desc: 'Stop guessing what to build first. Paste your idea and get a structured roadmap — broken down by week, priority, and tech stack — so you ship the right thing in the right order.',
      bullets: ['Week-by-week task breakdown', 'Tech stack recommendations', 'MVP scope definition', 'Risk flags and mitigation tips'],
      visualIcon: <Map size={32} />,
      visualTitle: 'MVP Roadmap Generator',
      visualDesc: 'Structured timeline with critical path dependencies.',
      isReversed: true,
      bg: 'bg-white'
    },
    {
      label: 'BUILD',
      title: 'Pre-built AI skills that turn Claude into a specialist',
      desc: 'Each skill is a SKILL.md file with battle-tested instructions. Drop it into Claude Code, Cursor, or Lovable — and your AI agent instantly knows how to build that part of your product.',
      bullets: ['SaaS Builder, iOS Builder, Dashboard, SEO, Marketing', 'Works with Claude Code, Cursor, Antigravity, Lovable', 'Lifetime updates included', 'Mix and match for any product type'],
      visualIcon: <Code2 size={32} />,
      visualTitle: 'SKILL.md in Editor',
      visualDesc: 'Your agent loads domain-specific context instantly.',
      isReversed: false,
      bg: 'bg-[#FAF9F6]'
    },
    {
      label: 'LAUNCH',
      title: 'Your entire launch strategy — planned and executed by AI',
      desc: 'Go from "I built something" to "people are paying for it." The launch planner gives you a channel-by-channel strategy, content calendar, and AI-generated copy for Product Hunt, Reddit, LinkedIn, and more.',
      bullets: ['Platform-specific launch content', 'Product Hunt launch kit', 'Cold outreach templates', 'Launch day checklist'],
      visualIcon: <Rocket size={32} />,
      visualTitle: 'Launch Playbook',
      visualDesc: 'Multi-channel Go-To-Market execution plan.',
      isReversed: true,
      bg: 'bg-white'
    },
    {
      label: 'DISCOVER',
      title: 'Not sure where to start? Take the quiz.',
      desc: 'Answer 5 questions about what you\'re building and we\'ll recommend the exact skills you need. No guessing, no wasted money.',
      bullets: ['5-question guided flow', 'Personalized skill recommendations', 'Bundle suggestions based on your stack', 'Takes under 2 minutes'],
      visualIcon: <Search size={32} />,
      visualTitle: 'Skill Matcher Flow',
      visualDesc: 'Tailored recommendations for your exact use case.',
      isReversed: false,
      bg: 'bg-[#FAF9F6]'
    },
    {
      label: 'TRACK',
      title: 'All your projects and skills in one place',
      desc: 'See every skill you own, every project you\'re building, and every milestone you\'ve hit — from a single dashboard. No more digging through emails for download links.',
      bullets: ['Skill library with download access', 'Project milestone tracker', 'Changelog for skill updates', 'Billing history and receipts'],
      visualIcon: <Activity size={32} />,
      visualTitle: 'Founder Dashboard',
      visualDesc: 'Centralized command center for your entire startup.',
      isReversed: true,
      bg: 'bg-white'
    }
  ];

  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <Navbar />
      <main>
        <PageHero />
        <StatStrip />
        
        {coreFeatures.map((feat, idx) => (
          <FeatureRow key={idx} {...feat} />
        ))}
        
        <CompatibilityGrid />
        <ComparisonTable />
        <PullQuote />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
