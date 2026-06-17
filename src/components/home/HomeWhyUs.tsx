import React from 'react';
import { Shield, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';

const guarantees = [
  {
    icon: <Shield size={22} />,
    iconColor: 'text-cobalt-600 bg-cobalt-50 border-cobalt-100',
    accentBar: 'bg-cobalt-600',
    title: 'Zero-Risk Intellectual Property',
    subtitle: 'Before a single line of code.',
    description:
      "We don't hold your codebase hostage. We sign strict NDAs before the first discovery call. You retain 100% ownership of all custom code, prompt templates, and infrastructure from Day 1.",
    checks: ['Day-0 Corporate NDA', 'Full source code transfer', 'No proprietary platform lock-in'],
  },
  {
    icon: <Zap size={22} />,
    iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    accentBar: 'bg-emerald-500',
    title: 'Rapid Production Deployment',
    subtitle: 'No endless discovery retainers.',
    description:
      "Because we specialize exclusively in AI architectures, we don't need months to figure out how to build your product. We architect a precise flow and deploy production-grade systems rapidly.",
    checks: ['Dedicated Systems Architect', 'Clear milestone deliverables', 'Weekly transparent syncs'],
  },
  {
    icon: <TrendingUp size={22} />,
    iconColor: 'text-amber-600 bg-amber-50 border-amber-100',
    accentBar: 'bg-amber-500',
    title: 'Built to Scale, Not to Demo',
    subtitle: "We don't disappear at launch.",
    description:
      "We don't build fragile prototypes. Every system is engineered to handle enterprise loads. We stay involved post-launch to fine-tune prompts, monitor API usage, and ensure your ROI is realized.",
    checks: ['Post-launch optimization', 'Scalable cloud architecture', 'Included launch support'],
  },
];

export function HomeWhyUs() {
  return (
    <section className="section-xl bg-canvas-warm relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cobalt-50/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-content relative z-10">

        {/* Header */}
        <div className="max-w-[640px] mb-16 lg:mb-20">
          <div className="section-overline">The Launch AI Standard</div>
          <h2 className="heading-display mt-1">
            We don't ask for trust. <br />
            <span className="text-ink-400 font-medium">We provide verification.</span>
          </h2>
          <p className="body-xl text-ink-500 mt-5">
            Three non-negotiable guarantees that protect your investment from day one.
          </p>
        </div>

        {/* 3-column cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guarantees.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white border border-ink-100 rounded-3xl p-8 shadow-card hover:shadow-card-lg hover:-translate-y-1.5 transition-all duration-400 flex flex-col relative overflow-hidden"
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${item.accentBar} rounded-t-3xl`} />

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 mt-2 transition-transform duration-300 group-hover:scale-110 ${item.iconColor}`}>
                {item.icon}
              </div>

              {/* Text */}
              <p className="label-xs text-ink-400 mb-2">{item.subtitle}</p>
              <h3 className="heading-md text-ink-900 mb-4">{item.title}</h3>
              <p className="body-base text-ink-500 leading-relaxed mb-8 flex-1">{item.description}</p>

              {/* Checks */}
              <div className="border-t border-ink-100 pt-6">
                <p className="label-xs text-ink-400 mb-4">The Verification</p>
                <ul className="space-y-3">
                  {item.checks.map((check, cIdx) => (
                    <li key={cIdx} className="flex items-center gap-3 text-[0.875rem] font-semibold text-ink-700">
                      <CheckCircle2 size={16} className="text-cobalt-500 shrink-0" />
                      {check}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
