import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';
import { supabase } from '../lib/supabase';
import {
  Mail,
  Clock,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    topic: 'General Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const { error } = await (supabase as any)
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          topic: formData.topic,
          message: formData.message,
          status: 'new'
        }]);

      if (error) throw error;
      
      setStatus('success');
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (status === 'success') {
    return (
      <div className="bg-white border border-gray-200 rounded-[2rem] p-10 md:p-14 shadow-xl flex flex-col items-center justify-center text-center min-h-[500px]">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="heading-lg text-ink-900 mb-4">Message Sent!</h3>
        <p className="body-lg text-ink-500 mb-8 max-w-sm">
          Congratulations, your message was successfully submitted! We've received your inquiry and will connect with you shortly.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setFormData({ name: '', email: '', company: '', topic: 'General Inquiry', message: '' });
          }}
          className="btn-primary bg-ink-900 hover:bg-ink-800 px-8"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-[2rem] p-8 md:p-12 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot */}
        <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

        {status === 'error' && errorMsg && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-[0.875rem] font-medium">
            <AlertCircle size={16} className="shrink-0" /> {errorMsg}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[0.6875rem] font-bold text-ink-400 uppercase tracking-widest">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              required
              minLength={2}
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-[0.9375rem]"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[0.6875rem] font-bold text-ink-400 uppercase tracking-widest">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@company.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-[0.9375rem]"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[0.6875rem] font-bold text-ink-400 uppercase tracking-widest">Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Acme Corp"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-[0.9375rem]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[0.6875rem] font-bold text-ink-400 uppercase tracking-widest">Topic <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                name="topic"
                required
                value={formData.topic}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-ink-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 appearance-none transition-all cursor-pointer font-medium text-[0.9375rem]"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Project Estimate">Project Estimate</option>
                <option value="Partnership">Partnership / Collab</option>
                <option value="Career">Career Opportunity</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-ink-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[0.6875rem] font-bold text-ink-400 uppercase tracking-widest">Message <span className="text-red-500">*</span></label>
          <textarea
            name="message"
            required
            minLength={10}
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project, timeline, and goals..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all resize-none font-medium text-[0.9375rem]"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full btn-primary py-4 rounded-xl disabled:opacity-70 flex items-center justify-center gap-2 text-[0.9375rem]"
        >
          {status === 'submitting' ? (
            <><Loader2 size={18} className="animate-spin" /> Sending...</>
          ) : (
            <>Submit Message <ArrowRight size={18} /></>
          )}
        </button>
      </form>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 p-8 rounded-[2rem] shadow-sm">
        <div className="flex items-center gap-3 text-lg font-bold text-ink-900 mb-4">
          <Clock className="text-indigo-600" /> Response Time
        </div>
        <p className="text-ink-600 font-medium mb-2">Within 24 hours (Mon – Fri)</p>
        <p className="text-ink-500 text-sm leading-relaxed">
          For urgent project inquiries or critical support, please make sure to mark your topic appropriately.
        </p>
      </div>

      <div className="bg-white border border-gray-200 p-8 rounded-[2rem] shadow-sm">
        <div className="flex items-center gap-3 text-lg font-bold text-ink-900 mb-6">
          <MessageSquare className="text-indigo-600" /> Direct Channels
        </div>
        <div className="space-y-5">
          <div>
            <div className="text-[0.6875rem] font-bold text-ink-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
              <Mail size={14} /> Email Us
            </div>
            <a href="mailto:launchpilotai41@gmail.com" className="text-ink-900 font-semibold hover:text-indigo-600 transition-colors">
              launchpilotai41@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        {/* Header Section */}
        <div className="container-editorial mb-16 text-center">
          <div className="inline-flex items-center justify-center">
            <span className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-100/50 to-cobalt-100/50 animate-pulse-slow"></span>
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse relative z-10"></span>
              <span className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-indigo-600 relative z-10">
                Get in Touch
              </span>
            </span>
          </div>
          <h1 className="heading-hero text-ink-900 mb-6 text-balance">
            Let's Talk About Your Project
          </h1>
          <p className="body-lg text-ink-500 max-w-2xl mx-auto">
            Ready to build an unfair advantage? Drop us a message below and our team will get back to you within 24 hours to discuss how we can help.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
          </div>
        </div>
      </main>

      <LaunchFooter />
    </div>
  );
}
