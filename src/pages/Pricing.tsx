import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import { LaunchPricing } from '../components/LaunchPricing';
import { 
  CheckCircle2, 
  X,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Cpu,
  Star
} from 'lucide-react';

function PageHero() {
  return (
    <section className="pt-32 pb-6 px-6 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 text-[#8B5CF6] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6 font-semibold">
          💸 Fixed Price MVP
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight tracking-tight">
          One fixed price. <br className="hidden md:block" />
          <span className="text-[#8B5CF6]">Delivered in 21 days.</span>
        </h1>
        <p className="text-xl text-[#334155] leading-relaxed max-w-2xl mx-auto font-medium">
          No hourly billing. No endless retainers. Get your fully functional, investor-ready MVP live in 3 weeks.
        </p>
      </div>
    </section>
  );
}

function TrustBadgeStrip() {
  const badges = [
    { icon: <ShieldCheck size={18} />, text: 'NDA signed before first call' },
    { icon: <Cpu size={18} />, text: '21-day timeline guarantee' },
    { icon: <Star size={18} />, text: '100% full source code ownership' },
  ];
  return (
    <div className="bg-[#FAF9F6] pb-12 px-6">
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

function ComparisonTable() {
  const rows = [
    { name: 'Core features count', starter: 'Up to 5', growth: 'Up to 10', premium: 'Unlimited / Custom' },
    { name: 'Delivery timeline', starter: '21 days', growth: '21 days', premium: 'Priority 21 days' },
    { name: 'Code ownership', starter: '100%', growth: '100%', premium: '100%' },
    { name: 'Supported platforms', starter: '1 (web or mobile)', growth: '1 (web or mobile)', premium: 'Web + Mobile + Admin' },
    { name: 'Post-launch support', starter: '30 days', growth: '60 days', premium: '90 days' },
    { name: 'AI/ML API Integration', starter: 'Standard', growth: 'Advanced', premium: 'Custom / Fine-tune' },
    { name: 'Fundraising materials', starter: false, growth: true, premium: true },
    { name: 'Dedicated Slack Channel', starter: false, growth: true, premium: true },
    { name: 'Investor Demo Environment', starter: false, growth: false, premium: true },
    { name: 'Investor Pitch Deck', starter: false, growth: false, premium: true },
  ];

  return (
    <section className="py-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12 text-center tracking-tight">Compare MVP Plans</h2>
        <div className="overflow-x-auto pb-6">
          <div className="min-w-[700px] bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-sm">
            <div className="grid grid-cols-4 p-6 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="font-bold text-[#64748B] uppercase text-xs tracking-wider flex items-center">Feature</div>
              <div className="font-bold text-[#0F172A] text-center">Starter $1,199</div>
              <div className="font-bold text-[#8B5CF6] text-center">Growth $2,599</div>
              <div className="font-bold text-[#0F172A] text-center">Premium $4,999</div>
            </div>
            {rows.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 p-5 border-b border-[#E2E8F0] last:border-b-0 items-center ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAF9F6]'}`}>
                <div className="font-semibold text-[#334155]">{row.name}</div>
                <div className="text-center text-[#64748B]">
                  {row.starter === true ? <CheckCircle2 size={18} className="mx-auto text-[#10B981]" /> : row.starter === false ? <X size={18} className="mx-auto text-[#CBD5E1]" /> : row.starter}
                </div>
                <div className="text-center font-medium text-[#8B5CF6]">
                  {row.growth === true ? <CheckCircle2 size={18} className="mx-auto text-[#8B5CF6]" /> : row.growth === false ? <X size={18} className="mx-auto text-[#CBD5E1]" /> : row.growth}
                </div>
                <div className="text-center font-bold text-[#0F172A]">
                  {row.premium === true ? <CheckCircle2 size={18} className="mx-auto text-[#10B981]" /> : row.premium === false ? <X size={18} className="mx-auto text-[#CBD5E1]" /> : row.premium}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  
  const faqs = [
    { q: 'What happens if you can\'t deliver in 21 days?', a: 'We keep building until it\'s live at no extra cost to you. Our 21-day guarantee means we absorb any overruns. In practice, we plan for this during the Blueprint stage so it rarely happens.' },
    { q: 'Do you actually sign the NDA before seeing my idea?', a: 'Yes. Absolutely before the first call and before you share any details with us. We will send you our standard NDA, or we can sign yours before we discuss anything.' },
    { q: 'Who owns the code after the project?', a: 'You do. 100% full source code ownership is yours from day one. At the end of the project, all repository permissions, server credentials, and assets are completely transferred to you.' },
    { q: 'How is this different from hiring a freelancer?', a: 'A freelancer is one person with limited accountability and varying skill sets. We are a dedicated team with a project manager, designer, developer, and QA engineer — all backed by a written 21-day delivery guarantee.' },
    { q: 'What is the payment structure?', a: 'We operate on a 50/50 model: 50% paid at the start once the scope is finalized in the Blueprint, and 50% only when the fully functional, working product is live in your hands.' },
    { q: 'What tech stack do you build on?', a: 'We build standard high-performance applications using modern, industry-standard stacks like React/Vite, TailwindCSS, Node.js, Express, Postgres/Supabase, and Vercel/AWS. This ensures your app is fully scalable and easy for any future developer to pick up.' }
  ];

  return (
    <section className="py-24 px-6 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-10 text-center tracking-tight">Frequently Asked Questions</h2>
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
                <div className="px-6 pb-5 pt-1 text-[#475569] leading-relaxed bg-white font-medium">
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

function CTASection() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6] text-center border-t border-[#E2E8F0]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-[#0F172A] mb-4 tracking-tight">Let's build your MVP in 21 days</h2>
        <p className="text-xl text-[#64748B] mb-10 font-semibold">Schedule a free clarity call. NDA signed automatically before we discuss your product.</p>
        
        <Link 
          to="/book-appointment"
          className="inline-flex items-center gap-3 bg-[#8B5CF6] text-white font-bold px-12 py-5 rounded-full hover:bg-[#7C3AED] transition-all shadow-xl shadow-[#8B5CF6]/20 text-lg mb-8"
        >
          Book a Free Clarity Call <ArrowRight size={20} />
        </Link>
        
        <div className="flex justify-center items-center gap-2 text-sm text-[#64748B] font-bold">
          50/50 Payment Model <span className="text-[#CBD5E1] font-normal">•</span> NDA Signed First <span className="text-[#CBD5E1] font-normal">•</span> 21-Day Guarantee
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <Navbar />
      <main>
        <PageHero />
        <TrustBadgeStrip />
        <LaunchPricing />
        <ComparisonTable />
        <FAQAccordion />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
