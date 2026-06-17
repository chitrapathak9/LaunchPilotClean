import React from 'react';
import { TerminalSquare, Eye, Zap, Layers } from 'lucide-react';

export function AboutPhilosophy() {
  const philosophies = [
    {
      icon: <TerminalSquare size={24} />,
      title: 'Zero Technical Debt',
      desc: 'We refuse to build fragile code just to hit a deadline. We architect systems designed for the next decade of your company\'s growth, not just the next sprint.'
    },
    {
      icon: <Eye size={24} />,
      title: 'Total Transparency',
      desc: 'No black boxes. You get direct access to our engineers, real-time Jira boards, and complete visibility into the architectural decisions we make.'
    },
    {
      icon: <Zap size={24} />,
      title: 'AI-Native Execution',
      desc: 'We leverage advanced AI tooling internally to write boilerplate, run QA matrices, and execute infrastructure, allowing our senior engineers to focus purely on complex business logic.'
    },
    {
      icon: <Layers size={24} />,
      title: 'Domain Supremacy',
      desc: 'We do not learn on your dime. We only accept projects in domains where we already possess deep architectural expertise, ensuring we add value from day one.'
    }
  ];

  return (
    <section className="section-xl bg-gray-50 border-b border-gray-100">
      <div className="container-editorial">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-5">
            <div className="section-overline mb-4">Our Philosophy</div>
            <h2 className="heading-display mb-6">
              Engineering standards <span className="text-indigo-600">without compromise.</span>
            </h2>
            <p className="body-lg text-ink-500 mb-8">
              We operate like a specialized tactical unit. No junior developers. No bloated account management layers. When you partner with us, you are instantly deploying top 1% engineering talent directly into your organization's core.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl">
                10+
              </div>
              <div>
                <div className="font-bold text-ink-900">Complex Systems Shipped</div>
                <div className="text-sm text-ink-500">Across 5+ countries globally</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {philosophies.map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-indigo-600 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-[1.25rem] font-bold text-ink-900 mb-3">{item.title}</h3>
                  <p className="text-[0.9375rem] text-ink-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
