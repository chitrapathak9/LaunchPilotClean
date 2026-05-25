import React from 'react';
import { FadeUp } from './FadeUp';
import { 
   IconLayoutDashboard, 
   IconDeviceHeartMonitor, 
   IconChartArrows, 
   IconCreditCard, 
   IconToolsKitchen2 
} from '@tabler/icons-react';

export function Industries() {
  const cards = [
    {
      icon: <IconLayoutDashboard className="text-violet-600" size={24} />,
      title: 'SaaS Platform',
      body: 'Multi-tenant apps with auth, billing, dashboards, and role-based access. Built on MERN or Next.js + Supabase.',
      tags: ['Auth', 'Billing', 'Dashboard', 'Multi-tenant']
    },
    {
      icon: <IconDeviceHeartMonitor className="text-violet-600" size={24} />,
      title: 'Medical & HealthTech',
      body: 'Patient management, telehealth, EMR integrations, and HIPAA-aware architecture. Built for compliance from day one.',
      tags: ['HIPAA-aware', 'EMR', 'Patient Portal', 'Telemedicine']
    },
    {
      icon: <IconChartArrows className="text-violet-600" size={24} />,
      title: 'AdTech Platform',
      body: 'Bidding engines, DSP/SSP platforms, real-time event pipelines handling 3,000+ req/sec. Go + RabbitMQ + Redis + Node.js.',
      tags: ['DSP/SSP', 'Real-time', 'Bidding', 'High throughput']
    },
    {
      icon: <IconCreditCard className="text-violet-600" size={24} />,
      title: 'Fintech & Payments',
      body: 'Wallets, KYC, multi-rail payments (Stripe, crypto, local), IVR flows, and fraud detection. 50+ API endpoints, battle-tested.',
      tags: ['KYC', 'Wallets', 'Multi-rail', 'Stripe']
    },
    {
      icon: <IconToolsKitchen2 className="text-violet-600" size={24} />,
      title: 'Food & QSR Tech',
      body: 'Order management, kitchen displays, loyalty programs, and POS integrations. Mobile-first with Flutter + Node backend.',
      tags: ['POS', 'Flutter', 'Loyalty', 'Kitchen Display']
    }
  ];

  return (
    <section id="industries" className="py-24 bg-cream border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeUp delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 inline-block">
              Industries
            </span>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-6 tracking-tight">
              One team. Every vertical.
            </h2>
          </FadeUp>
          
          <FadeUp delay={0.3}>
            <p className="text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto mt-4 font-semibold">
              We've built in regulated, complex, and fast-moving industries. 
              We don't learn on your dime — we've shipped it before.
            </p>
          </FadeUp>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {cards.map((card, index) => (
            <FadeUp key={index} delay={0.1 * index} className="h-full">
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 hover:border-violet-600 transition-all duration-300 flex flex-col justify-between h-full group shadow-sm">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 border border-zinc-200">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-zinc-550 leading-relaxed font-semibold">
                    {card.body}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {card.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-zinc-50 text-zinc-650 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}
