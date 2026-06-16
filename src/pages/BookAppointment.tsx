import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import {
  Calendar,
  Clock,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  User,
  Mail,
  FileText,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface BookedDay {
  formatted: string;
  raw: string;
  dayName: string;
  dayNum: number;
}

export function BookAppointment() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const planParam = params.get('plan') || '';
  const priceParam = params.get('price') || '';

  // Parse plan display names
  let planDisplayName = 'Startup Consultation';
  let planPriceText = '';

  if (planParam) {
    const cleanPlan = planParam.toLowerCase().replace('-bundle', '').replace('bundle', '');
    if (cleanPlan === 'starter') {
      planDisplayName = 'Starter Plan';
      planPriceText = priceParam ? `$${priceParam}` : '$4,999';
    } else if (cleanPlan === 'builder') {
      planDisplayName = 'Builder Bundle';
      planPriceText = priceParam ? `$${priceParam}` : '$9,999';
    } else if (cleanPlan === 'fullstack' || cleanPlan === 'full' || cleanPlan === 'full-arsenal') {
      planDisplayName = 'Full Arsenal / Full Product';
      planPriceText = priceParam ? `$${priceParam}` : '$9,999';
    } else {
      // Capitalize first letter
      planDisplayName = planParam.charAt(0).toUpperCase() + planParam.slice(1) + ' Plan';
      planPriceText = priceParam ? `$${priceParam}` : '';
    }
  }

  // State management
  const [selectedDate, setSelectedDate] = useState<BookedDay | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [concept, setConcept] = useState('');
  const [requireNda, setRequireNda] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [availableDays, setAvailableDays] = useState<BookedDay[]>([]);

  // Generate next 12 days (excluding Sundays) starting tomorrow
  useEffect(() => {
    const days: BookedDay[] = [];
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const today = new Date();

    let addedCount = 0;
    let dayOffset = 1;

    while (addedCount < 12) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + dayOffset);

      // Skip Sundays (0)
      if (nextDate.getDay() !== 0) {
        days.push({
          formatted: nextDate.toLocaleDateString('en-US', options),
          raw: nextDate.toISOString().split('T')[0],
          dayName: nextDate.toLocaleDateString('en-US', { weekday: 'long' }),
          dayNum: nextDate.getDate()
        });
        addedCount++;
      }
      dayOffset++;
    }

    setAvailableDays(days);
    // Auto-select first day
    if (days.length > 0) {
      setSelectedDate(days[0]);
    }
  }, []);

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      alert('Please select a date and time slot.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call for scheduling
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6] antialiased">
      <Navbar />

      <main className="pt-28 pb-24 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Back to Home Link */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#8B5CF6] transition-colors group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to home
            </Link>
          </div>

          {!isSuccess ? (
            <div className="grid lg:grid-cols-12 gap-8 items-start">

              {/* Left Column: Info & Summary (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">

                {/* Hero Summary Card */}
                <div className="bg-gradient-to-br from-[#8B5CF6]/90 to-[#7C3AED]/90 text-white rounded-3xl p-8 shadow-xl shadow-[#8B5CF6]/20 relative overflow-hidden">
                  <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                  <span className="text-[10px] bg-white/20 text-white px-3 py-1 rounded-full uppercase tracking-wider font-bold mb-4 inline-block">
                    Onboarding Session
                  </span>

                  <h1 className="text-2xl font-bold tracking-tight mb-2">Book Startup Clarity Call</h1>
                  <p className="text-white/80 text-xs leading-relaxed font-semibold mb-6">
                    A private 30-minute alignment session to review your MVP scope, de-risk feature set, and outline your 21-day timeline.
                  </p>

                  <div className="h-px bg-white/20 my-6" />

                  {planParam && (
                    <div className="space-y-4">
                      <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Selected Plan</div>
                      <div className="flex justify-between items-center bg-white/10 border border-white/15 rounded-2xl p-4">
                        <div className="space-y-1 text-left">
                          <p className="text-sm font-bold text-white leading-normal">{planDisplayName}</p>
                          <p className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">Fixed Pricing Setup</p>
                        </div>
                        {planPriceText && (
                          <div className="text-right shrink-0">
                            <span className="text-lg font-extrabold text-white">{planPriceText}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {!planParam && (
                    <div className="space-y-2 text-left">
                      <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider mb-2">Fixed-Price Alignment</div>
                      <p className="text-xs font-semibold text-white/90">
                        Interested in multiple skills? We will customize a bundle package or fixed-price MVP roadmap on the call.
                      </p>
                    </div>
                  )}
                </div>

                {/* Trust Badges Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-3">
                    <ShieldCheck className="text-[#8B5CF6]" size={16} /> Strategy Meeting Standards
                  </h4>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <CheckCircle2 size={16} className="text-[#8B5CF6] shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">Mutual NDA Standard</h5>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-normal">
                          We execute standard non-disclosure prior to speaking if requested. Your IP is 100% secure.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle2 size={16} className="text-[#8B5CF6] shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">1-on-1 with Developer</h5>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-normal">
                          No sales representatives or pressure tactics. Talk directly to a senior product developer.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle2 size={16} className="text-[#8B5CF6] shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">Actionable Roadmap Drafted</h5>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-normal">
                          Leave with a defined feature checklist and structured timeline for your MVP launch.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Date, Time & Form (7 Cols) */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Step 1: Select Date */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 text-left">
                    <div className="flex justify-between items-center">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        1. Select Meeting Date
                      </span>
                      {selectedDate && (
                        <span className="text-xs font-bold text-[#8B5CF6] bg-[#8B5CF6]/5 px-3 py-1 rounded-full">
                          {selectedDate.dayName}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                      {availableDays.map((day) => {
                        const isSelected = selectedDate?.raw === day.raw;
                        return (
                          <button
                            key={day.raw}
                            type="button"
                            onClick={() => setSelectedDate(day)}
                            className={`p-3 rounded-xl border text-center transition-all ${isSelected
                              ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#8B5CF6] shadow-sm font-bold'
                              : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-350 hover:bg-slate-100 hover:text-slate-900 font-semibold'
                              }`}
                          >
                            <div className="text-[10px] uppercase opacity-70 tracking-wider mb-0.5">{day.formatted.split(',')[0]}</div>
                            <div className="text-lg font-bold leading-tight">{day.dayNum}</div>
                            <div className="text-[9px] opacity-75">{day.formatted.split(' ')[1]}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Select Time Slot */}
                  {selectedDate && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 text-left animate-in fade-in duration-200">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        2. Select Preferred Time Slot (IST)
                      </span>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {timeSlots.map((slot) => {
                          const isSelected = selectedSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`p-3.5 rounded-xl border text-center text-xs transition-all flex items-center justify-center gap-2 ${isSelected
                                ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#8B5CF6] shadow-sm font-bold'
                                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-350 hover:bg-slate-100 hover:text-slate-900 font-semibold'
                                }`}
                            >
                              <Clock size={13} className={isSelected ? 'text-[#8B5CF6]' : 'text-slate-450'} />
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Your Info */}
                  {selectedDate && selectedSlot && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 text-left animate-in fade-in duration-200">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        3. Fill Consultation Details
                      </span>

                      <div className="space-y-4">

                        {/* Name */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                            <User size={12} className="text-slate-400" /> Full Name <span className="text-[#8B5CF6]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder=""
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all focus:ring-4 focus:ring-[#8B5CF6]/10"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Mail size={12} className="text-slate-400" /> Email Address <span className="text-[#8B5CF6]">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all focus:ring-4 focus:ring-[#8B5CF6]/10"
                          />
                        </div>

                        {/* Startup Concept */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                            <FileText size={12} className="text-slate-400" /> Startup Concept / Project Scope <span className="text-[#8B5CF6]">*</span>
                          </label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Briefly describe what services or features you plan to build (e.g. AI SaaS for legal automation, Shopify synchronizer mobile app)..."
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white transition-all focus:ring-4 focus:ring-[#8B5CF6]/10 resize-none"
                          />
                        </div>

                        {/* NDA Checkbox */}
                        <div className="pt-2">
                          <label className="flex items-start gap-3 cursor-pointer group bg-slate-50 border border-slate-200 p-4 rounded-2xl hover:border-[#8B5CF6]/40 transition-colors">
                            <input
                              type="checkbox"
                              checked={requireNda}
                              onChange={(e) => setRequireNda(e.target.checked)}
                              className="w-4 h-4 rounded border-slate-350 text-[#8B5CF6] focus:ring-[#8B5CF6]/20 bg-white mt-0.5 shrink-0 transition-colors cursor-pointer"
                            />
                            <div>
                              <span className="block text-[11px] font-bold text-slate-800 group-hover:text-[#8B5CF6] transition-colors flex items-center gap-1.5">
                                <ShieldCheck size={14} className="text-slate-500" /> Mutual NDA Protection
                              </span>
                              <span className="block text-[9px] text-slate-450 font-medium leading-normal mt-0.5">
                                Check this to receive a signed, legally-binding non-disclosure agreement to your inbox prior to our session.
                              </span>
                            </div>
                          </label>
                        </div>

                      </div>

                      {/* Submit Trigger */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold py-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all mt-4 border border-[#8B5CF6]/20 shadow-md shadow-[#8B5CF6]/15 disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Scheduling Clarity Session...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles size={14} />
                            Confirm & Schedule Onboarding Session
                          </>
                        )}
                      </button>
                    </div>
                  )}

                </form>
              </div>

            </div>
          ) : (

            /* Step 4: Success State */
            <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 text-center max-w-xl mx-auto shadow-xl space-y-8 animate-in zoom-in-95 duration-200">

              <div className="w-20 h-20 bg-emerald-100/80 border border-emerald-250 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} />
              </div>

              <div className="space-y-3">
                <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-wider font-bold inline-block">
                  Booking Confirmed!
                </span>
                <h2 className="text-2xl font-bold text-slate-900">Your Session is Scheduled!</h2>
                <p className="text-slate-500 text-xs font-semibold max-w-sm mx-auto leading-relaxed">
                  We have reserved your consultation for **{selectedDate?.formatted}** at **{selectedSlot}**. An invite with Google Meet credentials has been sent to **{email}**.
                </p>
              </div>

              {/* Details Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-3">
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 pb-2">Booking Summary</div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-semibold">Consultant</span>
                  <span className="text-slate-900 font-bold"></span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-semibold">Plan of Interest</span>
                  <span className="text-slate-900 font-bold">{planDisplayName}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-semibold">Date & Time</span>
                  <span className="text-slate-900 font-bold">{selectedDate?.formatted} · {selectedSlot}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-semibold">NDA Agreement status</span>
                  <span className={`font-bold ${requireNda ? 'text-emerald-600' : 'text-slate-500'}`}>
                    {requireNda ? '✓ NDA Generated' : 'Not Required'}
                  </span>
                </div>
              </div>

              {/* Next Steps List */}
              <div className="text-left space-y-3.5">
                <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Next Steps</span>
                <div className="space-y-2.5">
                  <div className="flex gap-2.5 items-start text-xs font-semibold text-slate-550 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-[#8B5CF6] text-[10px] font-bold">1</span>
                    <span>Check your email for the calendar invite and save it.</span>
                  </div>
                  {requireNda && (
                    <div className="flex gap-2.5 items-start text-xs font-semibold text-slate-550 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-[#8B5CF6] text-[10px] font-bold">2</span>
                      <span>Open the HelloSign email containing the mutual NDA and sign it.</span>
                    </div>
                  )}
                  <div className="flex gap-2.5 items-start text-xs font-semibold text-slate-550 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-[#8B5CF6] text-[10px] font-bold">{requireNda ? '3' : '2'}</span>
                    <span>Prepare any wireframes, links, or concept details to share on Google Meet.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://calendar.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#8B5CF6]/15 border border-[#8B5CF6]/20"
                >
                  Add to Google Calendar <ExternalLink size={12} />
                </a>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setSelectedDate(availableDays[0] || null);
                    setSelectedSlot(null);
                    setName('');
                    setEmail('');
                    setConcept('');
                    setRequireNda(false);
                  }}
                  className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-xs transition-colors"
                >
                  Schedule Another Session
                </button>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
