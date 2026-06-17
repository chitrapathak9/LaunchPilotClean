import React from 'react';
import { SearchX, Mail } from 'lucide-react';

export function CareersOpenings() {
  return (
    <section className="section-xl bg-white border-b border-gray-100">
      <div className="container-editorial">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="section-overline justify-center inline-flex">Open Positions</div>
          <h2 className="heading-display mt-4 mb-6 text-ink-900">
            Current <span className="text-indigo-600">Opportunities</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-[2.5rem] p-10 lg:p-16 text-center shadow-sm">
            
            <div className="w-20 h-20 bg-white border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-ink-400 shadow-sm">
              <SearchX size={32} />
            </div>
            
            <h3 className="text-[1.5rem] font-bold text-ink-900 mb-4">
              We don't have any open roles right now.
            </h3>
            
            <p className="text-[1.0625rem] text-ink-500 leading-relaxed max-w-xl mx-auto mb-8">
              However, we are always looking for good people. Send us your resume so we can reach out when a spot opens up that fits your skills.
            </p>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-sm max-w-lg mx-auto">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900">Join our talent network</h4>
                  <p className="text-[0.875rem] text-ink-500 m-0">Send us your resume for future roles.</p>
                </div>
              </div>
              <a href="mailto:careers@launchaipilot.com" className="btn-secondary whitespace-nowrap shrink-0">
                Email Resume
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
