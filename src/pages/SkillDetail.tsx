import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import { 
  ChevronRight,
  Star,
  Users,
  Clock,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  FileText,
  BookOpen,
  Github,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Code2,
  Layers,
  Terminal,
  Map as MapIcon,
  Library,
  Lock,
  Package
} from 'lucide-react';

const SKILL_DATA = {
  id: 'saas-builder',
  slug: 'saas-builder',
  name: 'SaaS Builder Skill',
  tagline: 'Full-stack SaaS with auth, billing, and dashboards — built by AI',
  description: 'The SaaS Builder Skill is a SKILL.md file — a set of battle-tested instructions that turns Claude Code, Cursor, or any AI coding agent into a full-stack SaaS developer.\n\nInstead of your AI agent guessing how to structure your project, it follows a proven pattern used across 50+ shipped products: auth, billing, dashboards, API routes, and more.\n\nDrop it into your project folder. Point your agent at it. Watch it build the right thing, the right way, the first time.',
  category: 'Building',
  price: 9,
  badge: 'Most Popular',
  rating: 4.9,
  reviewCount: 48,
  foundersUsing: 142,
  shipsInDays: '3–5',
  lastUpdated: 'Jan 2026',
  features: [
    'User auth (email + OAuth)',
    'Subscription billing (Stripe)',
    'Protected routes + RBAC',
    'Dashboard layout + sidebar',
    'User settings & profile page',
    'Onboarding flow',
    'REST API structure',
    'Database schema patterns',
    'Error handling conventions',
    'Environment variable setup',
    'Deployment-ready config',
    'Mobile responsive by default'
  ],
  compatibleWith: ['Claude Code', 'Cursor', 'Lovable', 'Replit', 'Antigravity'],
  techStack: [
    { label: 'Frontend', items: ['React + Vite', 'TypeScript', 'Tailwind CSS'] },
    { label: 'Backend', items: ['Node.js', 'Express', 'Hono'] },
    { label: 'Database', items: ['PostgreSQL', 'MongoDB', 'Supabase'] },
    { label: 'Auth', items: ['Clerk', 'Supabase Auth', 'NextAuth'] },
    { label: 'Billing', items: ['Stripe', 'LemonSqueezy', '—'] }
  ],
};

const RELATED_SKILLS = [
  { slug: 'shadcn-dashboard', name: 'shadcn Dashboard', price: 9, icon: <BarChart size={20} /> },
  { slug: 'seo-optimizer', name: 'SEO Optimizer', price: 9, icon: <MapIcon size={20} /> },
  { slug: 'landing-page-builder', name: 'Landing Page Builder', price: 9, icon: <Library size={20} /> },
];

function BarChart({ size }: { size: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>; }

function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm text-[#64748B] mb-8 font-medium">
      <Link to="/" className="hover:text-[#0F172A] transition-colors">Home</Link>
      <ChevronRight size={14} />
      <Link to="/skills" className="hover:text-[#0F172A] transition-colors">Skills</Link>
      <ChevronRight size={14} />
      <span className="text-[#94A3B8]">{SKILL_DATA.name}</span>
    </div>
  );
}

function SkillHeader() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-1.5 bg-[#8B5CF6]/10 text-[#8B5CF6] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#8B5CF6]/20">
          🏷️ {SKILL_DATA.category}
        </div>
        {SKILL_DATA.badge && (
          <div className="inline-flex items-center gap-1.5 bg-[#F59E0B] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md shadow-[#F59E0B]/20">
            🔥 {SKILL_DATA.badge}
          </div>
        )}
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 leading-tight tracking-tight">
        {SKILL_DATA.name}
      </h1>
      <p className="text-xl text-[#64748B] font-medium leading-relaxed mb-8">
        {SKILL_DATA.tagline}
      </p>

      {/* Meta Row */}
      <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[#334155] mb-8 bg-white border border-[#E2E8F0] px-6 py-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-1.5">
          <Star size={16} className="text-[#F59E0B] fill-[#F59E0B]" />
          <span className="text-[#0F172A]">{SKILL_DATA.rating} / 5</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
        <div className="flex items-center gap-1.5 text-[#64748B]">
          <Users size={16} /> {SKILL_DATA.foundersUsing} founders using this
        </div>
        <div className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
        <div className="flex items-center gap-1.5 text-[#64748B]">
          <Clock size={16} /> Ships in {SKILL_DATA.shipsInDays} days
        </div>
        <div className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
        <div className="flex items-center gap-1.5 text-[#64748B]">
          <RefreshCcw size={16} /> Updated: {SKILL_DATA.lastUpdated}
        </div>
      </div>

      {/* Compatible Pills */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-bold text-[#64748B] mr-2 py-1">Compatible with:</span>
        {SKILL_DATA.compatibleWith.map(tool => (
          <span key={tool} className="bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillPreview() {
  return (
    <div className="mb-16">
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-200">
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="flex-1 text-center">
            <span className="bg-white text-slate-500 border border-slate-200 font-mono text-xs px-3 py-1 rounded-md">
              SKILL.md
            </span>
          </div>
        </div>
        <div className="p-6 md:p-8 overflow-x-auto bg-slate-50/50">
          <pre className="text-sm text-slate-700 font-mono leading-relaxed">
<span className="text-[#8B5CF6] font-bold"># SaaS Builder Instructions</span>

<span className="text-emerald-600 font-bold">## Role</span>
You are an expert full-stack developer specializing in building production-ready 
SaaS applications. You write clean, modular, and extremely maintainable code.

<span className="text-emerald-600 font-bold">## Architecture Rules</span>
- Auth: Supabase Auth configured with RLS
- Database: PostgreSQL with Prisma ORM
- Styling: Tailwind CSS + shadcn/ui
- Routing: Next.js App Router

<span className="text-emerald-600 font-bold">## Implementation Steps</span>
1. Scaffold the core directory structure
2. Implement the authentication flow (middleware.ts)
3. Build the authenticated dashboard layout
...
          </pre>
        </div>
      </div>
      <p className="text-center text-sm text-[#64748B] font-medium mt-4">
        What your AI agent sees when you use this skill
      </p>
    </div>
  );
}

function WhatItDoes() {
  return (
    <div className="mb-16 prose prose-lg prose-headings:text-[#0F172A] prose-p:text-[#334155] max-w-none">
      <h2 className="text-2xl font-bold mb-6 border-l-4 border-[#8B5CF6] pl-4">What is the SaaS Builder Skill?</h2>
      {SKILL_DATA.description.split('\n\n').map((paragraph, idx) => (
        <p key={idx} className="leading-relaxed mb-4">{paragraph}</p>
      ))}
    </div>
  );
}

function WhatYouGet() {
  const items = [
    { icon: <FileText size={24} />, title: 'SKILL.md', desc: 'Full AI agent instructions — the core of the skill.' },
    { icon: <BookOpen size={24} />, title: 'README.md', desc: 'Setup guide, how to use, common prompts to run.' },
    { icon: <Github size={24} />, title: 'Example Project (GitHub)', desc: 'A real working SaaS built with this skill. Clone it. Study it. Use it as your starting point.' },
    { icon: <ShieldCheck size={24} />, title: 'Security Checklist', desc: 'Common vulnerabilities to check before launch.' },
    { icon: <RefreshCcw size={24} />, title: 'Lifetime Updates', desc: 'Every improvement pushed to your email. Free. Forever.' },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6 border-l-4 border-[#8B5CF6] pl-4">What's inside</h2>
      <div className="bg-slate-50 rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="space-y-6 text-slate-800">
          {items.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="text-[#8B5CF6] shrink-0 mt-1">{item.icon}</div>
              <div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureChecklist() {
  const mid = Math.ceil(SKILL_DATA.features.length / 2);
  const leftCol = SKILL_DATA.features.slice(0, mid);
  const rightCol = SKILL_DATA.features.slice(mid);

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6 border-l-4 border-[#8B5CF6] pl-4">What it covers</h2>
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-sm">
        <ul className="space-y-4">
          {leftCol.map((feat, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-[#10B981] shrink-0 mt-0.5" />
              <span className="text-[#334155] font-medium">{feat}</span>
            </li>
          ))}
        </ul>
        <ul className="space-y-4">
          {rightCol.map((feat, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-[#10B981] shrink-0 mt-0.5" />
              <span className="text-[#334155] font-medium">{feat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TechStackGrid() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6 border-l-4 border-[#8B5CF6] pl-4">Tech stack this skill supports</h2>
      <div className="overflow-x-auto bg-white border border-[#E2E8F0] rounded-3xl shadow-sm p-2">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-[#F8FAFC]">
              {SKILL_DATA.techStack.map(stack => (
                <th key={stack.label} className="p-4 font-bold text-[#64748B] text-xs uppercase tracking-wider">{stack.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2].map(rowIdx => (
              <tr key={rowIdx} className="border-t border-[#E2E8F0]">
                {SKILL_DATA.techStack.map(stack => (
                  <td key={stack.label} className="p-4 text-[#0F172A] font-semibold text-sm">
                    {stack.items[rowIdx] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HowToUse() {
  const steps = [
    { num: '01', title: 'Buy the skill', desc: 'Get instant access to SKILL.md + README + example project' },
    { num: '02', title: 'Drop it in your project', desc: 'Copy SKILL.md into your project root directory' },
    { num: '03', title: 'Point your AI agent at it', desc: 'In Claude Code: claude --skill SKILL.md "Build my SaaS"\nIn Cursor: reference it in your .cursorrules or prompt\nIn Lovable: paste into your system instructions' },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6 border-l-4 border-[#8B5CF6] pl-4">How to use this skill</h2>
      <div className="space-y-6">
        {steps.map((step, i) => (
          <div key={i} className="bg-white border border-[#E2E8F0] p-6 rounded-2xl flex items-start gap-6 shadow-sm">
            <div className="text-3xl font-bold text-[#E2E8F0] font-mono leading-none">{step.num}</div>
            <div>
              <h4 className="font-bold text-lg text-[#0F172A] mb-2">{step.title}</h4>
              <p className="text-[#64748B] text-sm whitespace-pre-line leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhoIsItFor() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6 border-l-4 border-[#8B5CF6] pl-4">This skill is for you if...</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        
        {/* Perfect For */}
        <div className="bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-sm">
          <div className="flex items-center gap-2 font-bold text-[#0F172A] mb-6 text-lg">
            <CheckCircle2 size={24} className="text-[#10B981]" /> Perfect for:
          </div>
          <ul className="space-y-4">
            <li className="text-[#64748B] flex items-start gap-2"><span className="text-[#10B981] mt-1">•</span> Solo founders building their first SaaS</li>
            <li className="text-[#64748B] flex items-start gap-2"><span className="text-[#10B981] mt-1">•</span> Developers who want AI to follow a proven pattern</li>
            <li className="text-[#64748B] flex items-start gap-2"><span className="text-[#10B981] mt-1">•</span> Non-technical founders using Lovable or Cursor</li>
            <li className="text-[#64748B] flex items-start gap-2"><span className="text-[#10B981] mt-1">•</span> Anyone who's wasted time on boilerplate before</li>
          </ul>
        </div>

        {/* Not For */}
        <div className="bg-[#FAF9F6] border border-[#E2E8F0] p-8 rounded-3xl shadow-sm">
          <div className="flex items-center gap-2 font-bold text-[#0F172A] mb-6 text-lg">
            <XCircle size={24} className="text-[#EF4444]" /> Not for:
          </div>
          <ul className="space-y-4">
            <li className="text-[#64748B] flex items-start gap-2"><span className="text-[#EF4444] mt-1">•</span> Teams with a dedicated engineering team already</li>
            <li className="text-[#64748B] flex items-start gap-2"><span className="text-[#EF4444] mt-1">•</span> Projects with very custom non-standard architecture</li>
            <li className="text-[#64748B] flex items-start gap-2"><span className="text-[#EF4444] mt-1">•</span> Developers who prefer to write everything from scratch</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6 border-l-4 border-[#8B5CF6] pl-4">What founders say about this skill</h2>
      <div className="space-y-6">
        <div className="bg-white border-l-4 border-[#8B5CF6] border-y border-r border-slate-200 p-8 rounded-3xl shadow-md relative overflow-hidden">
          <div className="absolute top-4 right-6 text-5xl text-slate-100 font-serif pointer-events-none">"</div>
          <div className="flex gap-1 mb-4 text-[#F59E0B]">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
          </div>
          <p className="text-slate-800 text-lg leading-relaxed mb-6 font-medium">
            "Built my entire SaaS backend in 2 days. Auth, billing, dashboard — everything worked first try. Saved me from weeks of reading Stripe docs."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200" />
            <div>
              <div className="text-slate-900 font-bold text-sm">David Kim</div>
              <div className="text-slate-500 text-xs">Founder, DataFlow API</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = [
    { q: 'Does this work with Next.js?', a: 'Yes. The skill has instructions for both Next.js (App Router) and React + Vite + Express setups.' },
    { q: 'Do I need to know how to code?', a: 'Basic understanding helps, but founders using Lovable or Cursor have shipped with zero coding background.' },
    { q: 'What if the skill doesn\'t work for my setup?', a: '7-day refund — no questions asked. Email us and we\'ll process it same day.' },
    { q: 'Can I use this for multiple projects?', a: 'Yes. Buy once, use on unlimited projects forever.' },
    { q: 'How do I get updates?', a: 'We email you when the skill is updated with a new download link. Always free.' },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6 border-l-4 border-[#8B5CF6] pl-4">Common questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-[#E2E8F0] rounded-2xl overflow-hidden bg-white shadow-sm">
            <button 
              className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <span className="font-bold text-[#0F172A] pr-8">{faq.q}</span>
              <ChevronDown size={20} className={`text-[#64748B] transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
            </button>
            {openIdx === i && (
              <div className="px-6 pb-5 pt-1 text-[#475569] leading-relaxed text-sm">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedSkills() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6 border-l-4 border-[#8B5CF6] pl-4">Often used together</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {RELATED_SKILLS.map(skill => (
          <Link key={skill.slug} to={`/skills/${skill.slug}`} className="bg-white border border-[#E2E8F0] p-5 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md hover:border-[#8B5CF6]/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#8B5CF6] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              {skill.icon}
            </div>
            <h4 className="font-bold text-[#0F172A] text-sm mb-1">{skill.name}</h4>
            <div className="text-[#64748B] text-sm font-medium">${skill.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PurchaseSidebar() {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-24">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 leading-tight">{SKILL_DATA.name}</h2>
      
      <div className="flex items-end gap-3 mb-8">
        <div className="text-5xl font-bold text-slate-900">${SKILL_DATA.price}</div>
        <div className="text-lg text-slate-400 font-medium pb-1 line-through decoration-slate-300 decoration-2">$29</div>
        <div className="text-sm font-bold text-[#10B981] pb-2">Early bird 🔥</div>
      </div>

      <button className="w-full bg-[#8B5CF6] text-white font-bold py-4 rounded-xl hover:bg-[#7C3AED] transition-colors shadow-lg shadow-[#8B5CF6]/20 mb-8 flex justify-center items-center gap-2 text-lg">
        Get This Skill <ArrowRight size={20} />
      </button>

      <ul className="space-y-4 mb-8">
        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><CheckCircle2 size={18} className="text-[#10B981]" /> Instant access</li>
        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><CheckCircle2 size={18} className="text-[#10B981]" /> Lifetime updates</li>
        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><CheckCircle2 size={18} className="text-[#10B981]" /> 7-day refund</li>
        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><CheckCircle2 size={18} className="text-[#10B981]" /> Works with Cursor</li>
        <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><CheckCircle2 size={18} className="text-[#10B981]" /> Works with Claude</li>
      </ul>

      <div className="w-full h-px bg-slate-100 mb-8" />

      {/* Upsell */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#8B5CF6]/5 rounded-full blur-xl" />
        <div className="text-2xl mb-3 relative z-10">📦</div>
        <h4 className="font-bold text-slate-800 mb-2 relative z-10">Or get the bundle</h4>
        <p className="text-slate-500 text-sm mb-4 relative z-10">3 skills for $29. Save $8 vs buying separately.</p>
        <Link to="/pricing" className="block w-full bg-white border border-slate-200 text-slate-700 font-bold py-2.5 rounded-lg hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-colors text-sm relative z-10 shadow-sm">
          View Builder Bundle
        </Link>
      </div>

      <div className="w-full h-px bg-slate-100 mb-8" />

      <div className="flex flex-col items-center justify-center text-slate-400 text-sm font-medium gap-1">
        <div className="flex items-center gap-1.5"><Lock size={14} /> Secure checkout via Stripe</div>
        <div className="flex items-center gap-1 mt-2 text-[#F59E0B]">
          <Star size={14} fill="currentColor" /> <span className="text-slate-600 ml-1">4.9/5</span> <span className="text-slate-300 mx-1">•</span> <span className="text-slate-400">48 reviews</span>
        </div>
      </div>
    </div>
  );
}

function BottomCTA() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6] border-y border-[#E2E8F0] text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Ready to ship faster?</h2>
        <p className="text-xl text-[#64748B] mb-10">One skill. One-time price. Ship your product this week.</p>
        
        <button className="bg-[#8B5CF6] text-white font-bold px-10 py-5 rounded-full hover:bg-[#7C3AED] transition-colors shadow-lg shadow-[#8B5CF6]/30 inline-flex justify-center items-center gap-3 text-lg mb-8">
          Get SaaS Builder Skill — $9 <ArrowRight size={20} />
        </button>
        
        <div className="flex justify-center items-center gap-2 text-sm text-[#64748B] font-medium">
          7-day refund <span className="text-[#CBD5E1]">•</span> Instant access <span className="text-[#CBD5E1]">•</span> Lifetime updates
        </div>
      </div>
    </section>
  );
}

export function SkillDetail() {
  const { slug } = useParams();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <Navbar />
      
      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <Breadcrumb />
          
          <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-24 relative items-start">
            
            {/* Left Column - Content (65%) */}
            <div className="w-full lg:w-[65%] shrink-0">
              <SkillHeader />
              <SkillPreview />
              <WhatItDoes />
              <WhatYouGet />
              <FeatureChecklist />
              <TechStackGrid />
              <HowToUse />
              <WhoIsItFor />
              <Testimonials />
              <FAQAccordion />
              <RelatedSkills />
            </div>
            
            {/* Right Column - Sidebar (35%) */}
            <div className="w-full lg:w-[35%]">
              <PurchaseSidebar />
            </div>

          </div>
        </div>
        
        <BottomCTA />
      </main>
      
      <Footer />
    </div>
  );
}
