import React from 'react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

export function HomeContact() {
  return (
    <section id="contact" className="section-xl bg-white border-t border-ink-100">
      <div className="container-content">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — Text */}
          <div>
            <div className="section-overline">Contact Us</div>
            <h2 className="heading-display mt-2 mb-5">
              Ready to architect <br />
              <span className="text-ink-400 font-medium">your unfair advantage?</span>
            </h2>
            <p className="body-xl text-ink-500 mb-10 max-w-[400px]">
              Let's bypass the hype and discuss how specialized AI infrastructure can drive measurable impact for your specific use-case.
            </p>

            {/* Contact details */}
            <div className="space-y-5 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cobalt-50 border border-cobalt-100 flex items-center justify-center text-cobalt-600 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="label-xs text-ink-400 mb-0.5">Email</p>
                  <a
                    href="mailto:launchpilotai41@gmail.com"
                    className="text-[0.9375rem] font-semibold text-ink-900 hover:text-cobalt-600 transition-colors"
                  >
                    launchpilotai41@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cobalt-50 border border-cobalt-100 flex items-center justify-center text-cobalt-600 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="label-xs text-ink-400 mb-0.5">Location</p>
                  <p className="text-[0.9375rem] font-semibold text-ink-900">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Trust note */}
            <div className="p-5 bg-ink-50 border border-ink-100 rounded-2xl">
              <p className="text-[0.8125rem] font-semibold text-ink-500 leading-relaxed">
                💬 <strong className="text-ink-700 font-bold">No spam, no hard pitch.</strong> We start every engagement with a 30-minute clarity call — understanding your problem before recommending any solution. Strictly confidential.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-canvas-warm border border-ink-100 rounded-4xl p-8 lg:p-10 shadow-card-md relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cobalt-100/40 rounded-bl-[80px] -mr-8 -mt-8 pointer-events-none" />

            <div className="relative z-10">
              <h3 className="heading-lg text-ink-900 mb-1">Book a Clarity Call</h3>
              <p className="body-base text-ink-400 mb-8">No commitment required. Strictly confidential.</p>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block label-xs text-ink-500 mb-2">First Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block label-xs text-ink-500 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block label-xs text-ink-500 mb-2">Work Email</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="john@company.com"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block label-xs text-ink-500 mb-2">Company (optional)</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Acme Corp"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block label-xs text-ink-500 mb-2">How can we help?</label>
                  <textarea
                    className="input-field resize-none"
                    rows={4}
                    placeholder="Tell us about your operational bottlenecks and what you're looking to achieve..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-[0.9375rem] rounded-2xl mt-2 shadow-[0_4px_20px_rgba(0,0,0,0.14)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.2)] group"
                >
                  Request Consultation
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>

                <p className="text-center text-[0.75rem] text-ink-400 font-medium">
                  We respond within 24 hours · Day-0 NDA available
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
