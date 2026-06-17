import React from 'react';
import { Lock, FileCheck, ServerCrash, ShieldAlert } from 'lucide-react';

export function DeliverySecurity() {
  const protocols = [
    {
      title: 'You Own the Code',
      desc: 'You get full ownership of everything we build. We sign strict NDAs before we start, and we never reuse your code for other clients.',
      icon: <FileCheck size={24} className="text-emerald-500" />
    },
    {
      title: 'Secure Workspaces',
      desc: 'Our developers use secure, restricted networks to build your product. We carefully manage who has access to your live data and servers.',
      icon: <ServerCrash size={24} className="text-emerald-500" />
    },
    {
      title: 'Built for Compliance',
      desc: 'Whether you need to meet healthcare (HIPAA) or enterprise (SOC2) standards, our team follows strict security rules from day one.',
      icon: <ShieldAlert size={24} className="text-emerald-500" />
    }
  ];

  return (
    <section className="section-xl bg-gray-50 border-b border-gray-100">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Context */}
          <div className="lg:col-span-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8">
              <Lock size={32} strokeWidth={1.5} />
            </div>
            <h2 className="heading-display mb-6 text-ink-900">
              Your code and data are <span className="text-emerald-600">safe with us.</span>
            </h2>
            <p className="body-lg text-ink-500 mb-0">
              We know that security is a top concern when working with global teams. We treat your data and code as carefully as if we were sitting in your own office.
            </p>
          </div>

          {/* Right Column: Protocols */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {protocols.map((protocol, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    {protocol.icon}
                  </div>
                  <div>
                    <h3 className="text-[1.125rem] font-bold text-ink-900 mb-2">{protocol.title}</h3>
                    <p className="text-[0.9375rem] text-ink-500 leading-relaxed mb-0">{protocol.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
