import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import {
  Mail,
  Twitter,
  Linkedin,
  Clock,
  MessageSquare,
  HelpCircle,
  CreditCard,
  Settings,
  Bot,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

function PageHero() {
  return (
    <section className="pt-32 pb-12 px-6 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 text-[#8B5CF6] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
          📬 Get in Touch
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
          Let's talk.
        </h1>
        <p className="text-xl text-[#334155] leading-relaxed max-w-2xl mx-auto font-medium">
          Whether it's a question about skills, a custom build request, or just saying hi — drop a message and I'll get back within 24 hours.
        </p>
      </div>
    </section>
  );
}

function ContactForm({ initialTopic = '' }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [topic, setTopic] = useState(initialTopic);
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      topic,
      message: formData.get('message') as string,
      company: formData.get('company') as string || undefined,
    };

    try {
      const edgeFunctionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;
      const response = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to send message. Please try again.');
      }

      setStatus('success');
      formRef.current?.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white border border-emerald-200 rounded-3xl p-10 md:p-12 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center text-center h-full min-h-[500px]">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-bold text-slate-900 mb-4">Message sent!</h3>
        <p className="text-slate-500 text-lg mb-8 max-w-sm">
          Thanks for reaching out. I've received your message and will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="border-2 border-slate-200 text-slate-700 font-bold px-8 py-3 rounded-xl hover:bg-slate-50 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

        {/* Honeypot */}
        <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

        {status === 'error' && errorMsg && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
            <AlertCircle size={16} className="shrink-0" /> {errorMsg}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 block">Name <span className="text-[#8B5CF6]">*</span></label>
          <input
            type="text"
            name="name"
            required
            minLength={2}
            placeholder="Your full name"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/20 placeholder:text-slate-400 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 block">Email <span className="text-[#8B5CF6]">*</span></label>
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/20 placeholder:text-slate-400 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 block">What's this about? <span className="text-[#8B5CF6]">*</span></label>
          <div className="relative">
            <select
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/20 appearance-none transition-all cursor-pointer"
            >
              <option value="" disabled className="text-slate-400">Select a topic</option>
              <option value="General question">General question</option>
              <option value="Skill not working">Skill not working</option>
              <option value="Custom skill request">Custom skill request</option>
              <option value="Refund request">Refund request</option>
              <option value="Partnership / collab">Partnership / collab</option>
              <option value="Just saying hi">Just saying hi 👋</option>
            </select>
            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400">
              ▼
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 block">Message <span className="text-[#8B5CF6]">*</span></label>
          <textarea
            name="message"
            required
            minLength={20}
            rows={5}
            placeholder="Tell me what's on your mind..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/20 placeholder:text-slate-400 transition-all resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-[#8B5CF6] text-white font-bold py-4 rounded-xl hover:bg-[#7C3AED] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#8B5CF6]/30 disabled:opacity-70"
        >
          {status === 'submitting' ? 'Sending...' : (
            <>Send Message <ArrowRight size={18} /></>
          )}
        </button>
      </form>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="space-y-6">

      {/* Response Time Card */}
      <div className="bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3 text-lg font-bold text-[#0F172A] mb-4">
          <Clock className="text-[#8B5CF6]" /> Response Time
        </div>
        <p className="text-[#334155] font-medium mb-2">Within 24 hours (Mon – Fri)</p>
        <p className="text-[#64748B] text-sm leading-relaxed">
          For urgent issues, please mention "URGENT" at the beginning of your message.
        </p>
      </div>

      {/* Direct Channels Card */}
      <div className="bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3 text-lg font-bold text-[#0F172A] mb-6">
          <MessageSquare className="text-[#8B5CF6]" /> Reach Me Directly
        </div>
        <div className="space-y-5">
          <div>
            <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-2"><Mail size={14} /> Email</div>
            <a href="mailto:launchpilotai41@gmail.com" className="text-[#0F172A] font-semibold hover:text-[#8B5CF6] transition-colors">launchpilotai41@gmail.com</a>
          </div>
          <div>
            <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-2"><Twitter size={14} /> Twitter / X</div>
            <a href="#" className="text-[#0F172A] font-semibold hover:text-[#8B5CF6] transition-colors"></a>
          </div>
          <div>
            <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-2"><Linkedin size={14} /> LinkedIn</div>
            <a href="#" className="text-[#0F172A] font-semibold hover:text-[#8B5CF6] transition-colors"></a>
          </div>
        </div>
      </div>

      {/* Quick Answers Card */}
      <div className="bg-[#FAF9F6] border border-[#E2E8F0] p-8 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3 text-lg font-bold text-[#0F172A] mb-4">
          <HelpCircle className="text-[#8B5CF6]" /> Quick Answers
        </div>
        <p className="text-[#64748B] text-sm mb-4">
          Before you message, check if your question is already answered:
        </p>
        <div className="space-y-3">
          <Link to="/pricing#faq" className="flex items-center justify-between text-[#334155] font-medium hover:text-[#8B5CF6] transition-colors group">
            FAQ Page <ArrowRight size={16} className="text-[#CBD5E1] group-hover:text-[#8B5CF6] transition-colors" />
          </Link>
          <Link to="/pricing" className="flex items-center justify-between text-[#334155] font-medium hover:text-[#8B5CF6] transition-colors group">
            Refund Policy <ArrowRight size={16} className="text-[#CBD5E1] group-hover:text-[#8B5CF6] transition-colors" />
          </Link>
          <Link to="/features" className="flex items-center justify-between text-[#334155] font-medium hover:text-[#8B5CF6] transition-colors group">
            How skills work <ArrowRight size={16} className="text-[#CBD5E1] group-hover:text-[#8B5CF6] transition-colors" />
          </Link>
        </div>
      </div>

    </div>
  );
}

function FAQShortcutStrip() {
  const links = [
    { icon: <CreditCard size={24} />, label: 'Billing & Refunds', link: '/pricing' },
    { icon: <Settings size={24} />, label: 'How Skills Work', link: '/features' },
    { icon: <Bot size={24} />, label: 'AI Tool Compatibility', link: '/features' },
  ];

  return (
    <section className="py-24 px-6 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">Most questions are already answered here</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {links.map((item, idx) => (
            <Link key={idx} to={item.link} className="bg-slate-50 p-6 rounded-2xl flex items-center justify-between group hover:bg-white transition-all border border-slate-200 shadow-sm hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="text-[#8B5CF6]">
                  {item.icon}
                </div>
                <span className="font-bold text-slate-800">{item.label}</span>
              </div>
              <ArrowRight size={20} className="text-slate-400 group-hover:text-[#8B5CF6] group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomSkillCTA({ onRequestClick }: { onRequestClick: () => void }) {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-10 md:p-16 border border-slate-200 shadow-xl shadow-slate-200/40 text-center md:text-left relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex-1 relative z-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Need something custom?</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-2">
              If our skill catalog doesn't cover your exact use case, I can build a custom skill tailored perfectly for your workflow.
            </p>
            <p className="text-[#8B5CF6] font-bold">Starts at $149 for a scoped custom skill.</p>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <button
              onClick={onRequestClick}
              className="w-full md:w-auto bg-[#8B5CF6] text-white font-bold px-8 py-4 rounded-full hover:bg-[#7C3AED] transition-colors shadow-lg shadow-[#8B5CF6]/30 whitespace-nowrap"
            >
              Tell me what you need &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialTopicFromUrl = params.get('topic');

  // Map URL parameter to dropdown value
  let initialTopic = '';
  if (initialTopicFromUrl === 'custom-skill') initialTopic = 'Custom skill request';

  // Smooth scroll handler for the custom skill CTA
  const handleCustomRequest = () => {
    // We would normally pass state up, but since it's just a UI demo, 
    // scrolling to top works for UX feeling
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Note: To fully sync this in React we'd lift the topic state or use a ref, 
    // but a scroll to top is good enough to direct attention to the form.
  };

  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <Navbar />
      <main>
        <PageHero />

        <section className="pb-24 px-6 bg-[#FAF9F6]">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* Left Column - Form (60%) */}
            <div className="w-full lg:w-[60%]">
              <ContactForm initialTopic={initialTopic} />
            </div>

            {/* Right Column - Info (40%) */}
            <div className="w-full lg:w-[40%]">
              <ContactInfo />
            </div>

          </div>
        </section>

        <FAQShortcutStrip />
        <CustomSkillCTA onRequestClick={handleCustomRequest} />
      </main>
      <Footer />
    </div>
  );
}
