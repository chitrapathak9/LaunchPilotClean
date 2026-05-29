import React from 'react';
import { FadeUp } from './FadeUp';
import { 
  IconChartArrows, 
  IconCreditCard, 
  IconDeviceHeartMonitor, 
  IconLayoutDashboard, 
  IconToolsKitchen2,
  IconRocket
} from '@tabler/icons-react';

export function Showcase() {
  const projects = [
    {
      type: 'Lead Automation',
      name: 'High-Throughput Lead Pipeline',
      description: 'Real-time automated marketing lead routing and qualification engine handling high volume.',
      metrics: [
        { label: 'Delivered', value: '18 days' },
        { label: 'Throughput', value: '3,000 leads/min' }
      ],
      stack: ['Python', 'RabbitMQ', 'Redis', 'OpenAI API'],
      icon: <IconChartArrows className="text-zinc-400" size={56} />
    },
    {
      type: 'Fintech Systems',
      name: 'Automated Billing & Stripe Sync',
      description: 'Multi-actor payment ledger automation with instant KYC validation, wallets, and automated IVR.',
      metrics: [
        { label: 'Delivered', value: '21 days' },
        { label: 'Hours Saved', value: '120 hrs/mo' }
      ],
      stack: ['Node.js', 'PostgreSQL', 'Stripe API', 'Twilio'],
      icon: <IconCreditCard className="text-zinc-450" size={56} />
    },
    {
      type: 'Healthcare AI',
      name: 'HIPAA-Compliant Patient Intake Bot',
      description: 'Intelligent patient pre-qualification, appointment scheduling, and secure medical record EHR sync.',
      metrics: [
        { label: 'Delivered', value: '19 days' },
        { label: 'Support Load', value: '-65% decrease' }
      ],
      stack: ['React', 'Node.js', 'Supabase', 'EHR API'],
      icon: <IconDeviceHeartMonitor className="text-zinc-455" size={56} />
    },
    {
      type: 'Enterprise Workflows',
      name: 'Real-time CRM & Analytics Orchestrator',
      description: 'Multi-tenant workflow synchronization linking CRM platforms, internal databases, and reporting portals.',
      metrics: [
        { label: 'Delivered', value: '14 days' },
        { label: 'Data Lag', value: '0 seconds' }
      ],
      stack: ['Next.js', 'Supabase', 'Redis', 'Zapier & Make'],
      icon: <IconLayoutDashboard className="text-zinc-455" size={56} />
    },
    {
      type: 'Service Automation',
      name: 'AI-Driven Customer Booking System',
      description: 'Automated booking assistant, conversational SMS chatbot, and structured kitchen routing for hospitality.',
      metrics: [
        { label: 'Delivered', value: '21 days' },
        { label: 'Bookings Sync', value: '+40% increase' }
      ],
      stack: ['WhatsApp API', 'Node.js', 'MongoDB', 'Firebase'],
      icon: <IconToolsKitchen2 className="text-zinc-455" size={56} />
    }
  ];

  return (
    <section id="work" className="py-24 bg-cream border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeUp delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 inline-block">
              Case studies
            </span>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-6 tracking-tight">
              Bespoke systems. Production reliability.
            </h2>
          </FadeUp>
          
          <FadeUp delay={0.3}>
            <p className="text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto mt-4 font-semibold">
              Not mockups. Not templates. Live, high-performance automation systems and AI agents built for real businesses in 21 days or less.
            </p>
          </FadeUp>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, index) => (
            <FadeUp key={index} delay={0.1 * index}>
              <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-400 transition-all duration-200 flex flex-col justify-between h-full group relative shadow-sm">
                
                {/* Image Placeholder area */}
                <div className="bg-zinc-50 h-48 flex items-center justify-center relative border-b border-zinc-200">
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 rounded-full text-[10px] font-bold tracking-wider uppercase px-3 py-1 bg-violet-50 text-violet-600 border border-violet-200/50">
                    {p.type}
                  </span>
                  <div className="group-hover:scale-105 transition-transform duration-300">
                    {p.icon}
                  </div>
                </div>

                {/* Details area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-zinc-900 font-bold text-base">
                      {p.name}
                    </h3>
                    <p className="text-zinc-500 text-sm mt-1.5 leading-relaxed font-semibold">
                      {p.description}
                    </p>
                    
                    {/* Metrics */}
                    <div className="flex gap-6 mt-4 pt-4 border-t border-zinc-200/60">
                      {p.metrics.map((m, idx) => (
                        <div key={idx}>
                          <div className="text-zinc-450 text-[10px] uppercase tracking-wider font-bold">
                            {m.label}
                          </div>
                          <div className="text-zinc-800 text-sm font-bold mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {p.stack.map((tag) => (
                      <span 
                        key={tag}
                        className="bg-zinc-50 text-zinc-555 text-[10px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full border border-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </FadeUp>
          ))}

          {/* Project Card 6 - Your Project */}
          <FadeUp delay={0.6}>
            <div className="bg-white border-2 border-dashed border-zinc-200 rounded-2xl overflow-hidden hover:border-violet-600 transition-all duration-200 flex flex-col justify-between h-full group p-5 relative shadow-sm">
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10 px-4">
                <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center border border-violet-200 text-violet-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconRocket size={32} />
                </div>
                <h3 className="text-zinc-900 font-bold text-base mb-2">
                  Your Custom Automation
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-semibold max-w-xs">
                  This spot is for the custom AI agent or workflow pipeline in your head right now. Built in 21 days with 100% custom system ownership.
                </p>
              </div>

              <div className="w-full mt-auto">
                <a 
                  href="#contact" 
                  className="block w-full bg-violet-600 hover:bg-violet-500 text-white rounded-xl py-3.5 text-center text-sm font-bold transition-all duration-200 tracking-wide"
                >
                  Start your project →
                </a>
              </div>
            </div>
          </FadeUp>

        </div>

      </div>
    </section>
  );
}
