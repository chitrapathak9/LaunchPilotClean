import React from 'react';
import { MapPin } from 'lucide-react';

export function DeliveryHubs() {
  const hubs = [
    {
      region: 'North America',
      role: 'Account & Project Management',
      desc: 'Our leaders are close to your timezone to handle strategy, project planning, and making sure we meet your business goals.'
    },
    {
      region: 'India (Ahmedabad)',
      role: 'Core Development Team',
      desc: 'Our main office where our skilled developers, designers, and engineers build your product day in and day out.'
    },
    {
      region: 'Europe / UK',
      role: 'Support & Operations',
      desc: 'Helping us bridge the time zones so your project keeps moving 24/7 without delays or interruptions.'
    }
  ];

  return (
    <section className="section-xl bg-white border-b border-gray-100">
      <div className="container-editorial">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="section-overline justify-center inline-flex">Where We Are Located</div>
          <h2 className="heading-display mt-4 mb-6 text-ink-900">
            A global team built for <span className="text-blue-600">your success.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {hubs.map((hub, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-[2rem] p-10 flex flex-col">
              <div className="inline-flex items-center gap-2 text-blue-600 font-bold mb-6">
                <MapPin size={20} />
                <span className="text-[1.125rem]">{hub.region}</span>
              </div>
              
              <h3 className="text-[1.0625rem] font-extrabold text-ink-900 uppercase tracking-widest mb-4">
                {hub.role}
              </h3>
              
              <p className="text-[0.9375rem] text-ink-500 leading-relaxed mb-0 mt-auto">
                {hub.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
