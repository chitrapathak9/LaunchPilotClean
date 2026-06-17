import React, { useState, useEffect } from 'react';
import { Star, Quote, CheckCircle2, TrendingUp, Users, Globe, Award } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'CTO',
    company: 'MedTech Flow',
    industry: 'Healthcare AI',
    content:
      "Launch AI Pilot didn't just build us a healthcare AI tool — they completely redefined our diagnostic workflows. The speed of execution and depth of their technical understanding is unmatched. We went from chaos to clarity in 6 weeks.",
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    outcome: '60% reduction in manual data entry',
    initials: 'AJ',
  },
  {
    id: 2,
    name: 'Sarah Miller',
    role: 'Founder',
    company: 'AdScale Metrics',
    industry: 'AdTech',
    content:
      "We were stuck with generic LLM wrappers that just didn't perform. They came in, scrapped the bloated architecture, and built a custom predictive engine. User retention jumped 40% in the first quarter after launch.",
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    outcome: '40% increase in user retention',
    initials: 'SM',
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Director of Operations',
    company: 'Innovate Logistics',
    industry: 'Enterprise SaaS',
    content:
      "The 100% code ownership model is a game changer. We didn't just get an app — we got a fully scalable asset that our internal team now maintains and builds on. They are genuinely the top 1% of agency partners we've ever worked with.",
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    outcome: 'Full codebase ownership, no vendor lock-in',
    initials: 'MC',
  },
];

const LEFT_STATS = [
  { icon: <TrendingUp size={18} />, value: '10+', label: 'MVP Shipped' },
  { icon: <Globe size={18} />,     value: '5+', label: 'Countries Served' },
  { icon: <Users size={18} />,     value: '100%', label: 'IP Ownership Given' },
  { icon: <Award size={18} />,     value: '5.0★', label: 'Average Rating' },
];

const TRUST_POINTS = [
  'Day-0 NDA before any discussion',
  'Fixed-scope pricing, no surprises',
  'No ghosting after launch',
  'Production-ready, not MVP fragile',
];

export function HomeTestimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[active];

  return (
    <section className="section-xl bg-white border-t border-gray-100">
      <div className="container-content">

        {/* Section header */}
        <div className="text-center mb-14 lg:mb-18">
          <div className="section-overline justify-center inline-flex">Client Success Stories</div>
          <h2 className="heading-display mt-2 mb-4">
            Don't take our word for it.
          </h2>
          <p className="body-xl text-ink-500 max-w-[500px] mx-auto">
            Real outcomes from real partners — across healthcare, SaaS, logistics, and beyond.
          </p>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT — Rich content panel ── */}
          <div className="flex flex-col gap-8">



            {/* Why clients trust us */}
            <div className="bg-ink-950 rounded-2xl p-6">
              <p className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-white/40 mb-4">
                Why founders choose us
              </p>
              <ul className="space-y-3">
                {TRUST_POINTS.map((pt, i) => (
                  <li key={i} className="flex items-center gap-3 text-[0.9rem] font-semibold text-white/80">
                    <CheckCircle2 size={15} className="text-cobalt-400 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {testimonials.map((t) => (
                    <img key={t.id} src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full border-2 border-ink-950 object-cover" />
                  ))}
                </div>
                <p className="text-[0.8125rem] text-white/50 font-medium">
                  Trusted by founders across 5+ countries
                </p>
              </div>
            </div>

          </div>

          {/* ── RIGHT — Testimonial card ── */}
          <div className="relative">
            {/* Stacked card effect */}
            <div className="absolute inset-0 translate-y-3 translate-x-3 bg-cobalt-50 border border-cobalt-100 rounded-3xl" />
            <div className="absolute inset-0 translate-y-1.5 translate-x-1.5 bg-cobalt-100/60 border border-cobalt-100 rounded-3xl" />

            {/* Main card */}
            <div
              key={current.id}
              className="relative bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.06)] transition-all duration-500"
            >
              {/* Industry badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="badge badge-cobalt text-[0.65rem]">{current.industry}</span>
                <Quote size={28} className="text-cobalt-100" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array(current.rating).fill(0).map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[1.0625rem] text-ink-700 leading-[1.72] font-medium mb-8">
                "{current.content}"
              </p>

              {/* Outcome highlight */}
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 mb-8">
                <TrendingUp size={14} className="text-emerald-600 shrink-0" />
                <span className="text-[0.8125rem] font-bold text-emerald-800">{current.outcome}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-12 h-12 rounded-full border-2 border-gray-100 object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold text-ink-900 text-[0.9375rem]">{current.name}</p>
                  <p className="text-[0.8125rem] text-ink-400 font-medium">{current.role}, {current.company}</p>
                </div>
                <div className="flex gap-1.5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === active ? 'w-6 h-2 bg-cobalt-600' : 'w-2 h-2 bg-gray-200 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
