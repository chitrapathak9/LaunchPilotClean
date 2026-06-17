import React from 'react';
import { DollarSign, UserMinus, HardHat, SearchX, Clock, TrendingUp, ShieldAlert, Users, Rocket } from 'lucide-react';
import { LogoIcon } from '../LogoIcon';

export function WhyProblems() {
  const gridItems = [
    {
      type: 'problem',
      icon: <DollarSign size={24} />,
      title: 'Local Hiring Burns Funding',
      desc: 'Hiring locally drains your runway fast. By the time you build a full team, half your budget is gone.'
    },
    {
      type: 'problem',
      icon: <UserMinus size={24} />,
      title: 'The Hiring & Firing Headache',
      desc: 'Recruiting, interviewing, and managing HR takes months away from actually growing your business.'
    },
    {
      type: 'problem',
      icon: <HardHat size={24} />,
      title: 'Hidden Costs of Bad Code',
      desc: 'A cheap tech partner looks good until your app crashes and you have to pay someone else to rewrite it.'
    },
    {
      type: 'problem',
      icon: <SearchX size={24} />,
      title: 'Endless Discovery Phases',
      desc: 'Traditional agencies charge you for months of "planning" before they even write a single line of code.'
    },
    {
      type: 'solution',
      // Center Block
    },
    {
      type: 'problem',
      icon: <Clock size={24} />,
      title: 'Timezone Disconnects',
      desc: 'Offshore teams often mean waiting 24 hours just to get a simple question answered or a bug fixed.'
    },
    {
      type: 'problem',
      icon: <TrendingUp size={24} />,
      title: 'Missing Deadlines',
      desc: 'Projects taking three times longer than quoted because of poor management and scope creep.'
    },
    {
      type: 'problem',
      icon: <ShieldAlert size={24} />,
      title: 'Security & IP Risks',
      desc: 'Worrying about data leaks or wondering if your "custom" code is being resold to your competitors.'
    },
    {
      type: 'problem',
      icon: <Users size={24} />,
      title: 'The Bait-and-Switch',
      desc: 'Senior partners pitch you the project, but junior developers are the ones actually building it.'
    }
  ];

  return (
    <section className="section-xl bg-gray-50 border-b border-gray-100">
      <div className="container-editorial">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="section-overline justify-center inline-flex">The Real Problems</div>
          <h2 className="heading-display mt-4 mb-6 text-ink-900">
            Why traditional hiring <span className="text-amber-600">fails you.</span>
          </h2>
          <p className="body-xl text-ink-500">
            Building software is hard enough. You shouldn't have to deal with these common traps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-7xl mx-auto">
          {gridItems.map((item, idx) => {
            if (item.type === 'solution') {
              return (
                <div key={idx} className="bg-ink-900 border border-ink-800 rounded-[2rem] p-8 lg:p-10 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                  <div className="absolute inset-0 dot-grid-dark opacity-30 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-6 backdrop-blur-md text-amber-400">
                    <LogoIcon className="w-10 h-10" />
                  </div>
                  <h3 className="relative z-10 text-[1.5rem] font-bold text-white mb-3 leading-tight">
                    We are here to <span className="text-amber-400">solve this.</span>
                  </h3>
                  <p className="relative z-10 text-[0.9375rem] text-ink-300 leading-relaxed m-0">
                    Launch AI Pilot engineers out the friction, risk, and bloat of software development.
                  </p>
                </div>
              );
            }

            return (
              <div key={idx} className="bg-white border border-gray-200 rounded-[2rem] p-8 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 text-ink-600 flex items-center justify-center mb-6 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-[1.125rem] font-bold text-ink-900 mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[0.9375rem] text-ink-500 leading-relaxed mb-0">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
