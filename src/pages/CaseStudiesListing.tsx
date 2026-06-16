import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import { supabase } from '../lib/supabase';
import { useSEO } from '../hooks/useSEO';
import type { CaseStudy, CaseStudyMetric } from '../types/database';
import { ArrowRight, Loader2, AlertCircle, TrendingUp, Users, Clock } from 'lucide-react';

const INDUSTRIES = ['All', 'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Marketing', 'Manufacturing', 'Real Estate', 'Other'];

function CaseStudyCard({ item }: { item: CaseStudy }) {
  const metrics = (item.metrics as CaseStudyMetric[]).slice(0, 2);
  return (
    <Link to={`/case-studies/${item.slug}`} className="group h-full flex">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#8B5CF6]/30 transition-all duration-300 flex flex-col w-full">
        {/* Cover */}
        <div className="h-52 bg-gradient-to-br from-[#8B5CF6]/10 to-[#6D28D9]/5 relative overflow-hidden">
          {item.cover_image_url ? (
            <img src={item.cover_image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-[#8B5CF6]/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="text-[#8B5CF6]" size={24} />
                </div>
                <p className="text-slate-800 font-bold text-lg">{item.client_name}</p>
              </div>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span className="text-xs font-bold text-[#8B5CF6] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#8B5CF6]/20">
              {item.industry}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
            <Users size={12} /> {item.client_name}
            {item.timeline && <><span className="text-slate-200">·</span><Clock size={12} /> {item.timeline}</>}
          </div>

          <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-tight group-hover:text-[#8B5CF6] transition-colors line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2 mb-4">{item.challenge}</p>

          {/* Metrics */}
          {metrics.length > 0 && (
            <div className="flex gap-4 mt-auto mb-4">
              {metrics.map((m, i) => (
                <div key={i} className="flex-1 bg-[#8B5CF6]/5 rounded-xl px-3 py-2.5 text-center border border-[#8B5CF6]/10">
                  <div className="text-xl font-bold text-[#8B5CF6]">{m.value}</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5 leading-tight">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {item.published_at ? new Date(item.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
            </span>
            <span className="text-xs font-bold text-[#8B5CF6] flex items-center gap-1 group-hover:gap-2 transition-all">
              Read case study <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm animate-pulse">
      <div className="h-52 bg-slate-100" />
      <div className="p-6 space-y-3">
        <div className="w-20 h-3 bg-slate-100 rounded" />
        <div className="w-3/4 h-6 bg-slate-100 rounded" />
        <div className="w-full h-4 bg-slate-100 rounded" />
        <div className="flex gap-3 mt-4">
          <div className="flex-1 h-14 bg-slate-100 rounded-xl" />
          <div className="flex-1 h-14 bg-slate-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function CaseStudiesListing() {
  useSEO({
    title: 'Case Studies — Real Results for Real Clients',
    description: 'See how LaunchPilot has helped businesses increase revenue, save time, and ship faster with AI-powered tools and strategies.',
    canonicalUrl: 'https://launchpilot.ai/case-studies',
  });

  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');

  useEffect(() => {
    setLoading(true);
    let query = supabase
      .from('case_studies')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (industryFilter !== 'All') query = query.eq('industry', industryFilter);

    query.then(({ data, error: err }) => {
      if (err) setError('Failed to load case studies');
      else setItems(data as CaseStudy[] ?? []);
      setLoading(false);
    });
  }, [industryFilter]);

  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 text-[#8B5CF6] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
              📊 Case Studies
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
              Real results.<br className="hidden md:block" />
              <span className="text-[#8B5CF6]">Real clients.</span>
            </h1>
            <p className="max-w-7xl mx-auto px-6 lg:px-8">
              See exactly how we've helped founders and businesses build, launch, and grow using AI-powered tools and strategies.
            </p>
          </div>
        </section>

        {/* Industry Filter */}
        <div className="bg-[#FAF9F6] border-b border-[#E2E8F0] sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {INDUSTRIES.map(ind => (
              <button
                key={ind}
                onClick={() => setIndustryFilter(ind)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  industryFilter === ind
                    ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/20'
                    : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          </div>
        )}

        {/* Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm">
                <TrendingUp className="mx-auto text-slate-300 mb-4" size={40} />
                <h3 className="text-2xl font-bold text-slate-700 mb-2">No case studies yet</h3>
                <p className="text-slate-400">Check back soon for detailed client success stories.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map(item => <CaseStudyCard key={item.id} item={item} />)}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-white border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Want results like these?</h2>
            <p className="text-xl text-[#64748B] mb-10">Let's talk about how LaunchPilot can help you achieve your goals.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[#8B5CF6] text-white font-bold px-10 py-4 rounded-full hover:bg-[#7C3AED] transition-colors shadow-lg shadow-[#8B5CF6]/30 text-lg">
              Get in touch <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
