import React from 'react';
import { ArrowRight, Mail, MapPin } from 'lucide-react';

export function HomeContact() {
  return (
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-blue-600"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Contact Us</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-6">
              Ready to architect <br />
              <span className="text-slate-400 font-medium">your unfair advantage?</span>
            </h2>
            <p className="text-lg text-slate-500 mb-10 max-w-md">
              Let's bypass the hype and discuss how specialized AI infrastructure can drive measurable impact for your specific use-case.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-600">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                  <a href="mailto:hello@launchaipilot.com" className="font-medium text-slate-900 hover:text-blue-600 transition-colors">hello@launchaipilot.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-600">
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                  <p className="font-medium text-slate-900">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-bl-[100px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-110 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Book a Clarity Call</h3>
              <p className="text-slate-500 mb-8">No commitment required. Strictly confidential.</p>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                    <input type="text" className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                    <input type="text" className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Work Email</label>
                  <input type="email" className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">How can we help?</label>
                  <textarea className="w-full h-32 bg-white border border-slate-200 rounded-xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none" placeholder="Tell us about your operational bottlenecks..."></textarea>
                </div>
                <button type="button" className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1 shadow-lg shadow-slate-900/20 mt-4">
                  Request Consultation <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
