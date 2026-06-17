import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import { supabase } from '../lib/supabase';
import { useSEO, buildCaseStudyStructuredData } from '../hooks/useSEO';
import type { CaseStudy, CaseStudyMetric } from '../types/database';
import {
  ChevronRight, Clock, Users, TrendingUp, ArrowRight, Loader2, AlertCircle,
  CheckCircle, Lightbulb, Target
} from 'lucide-react';

function AnimatedMetric({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-6 border border-[#E2E8F0] text-center shadow-sm transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className={`text-4xl font-bold text-[#8B5CF6] mb-2 transition-all duration-700 ${visible ? 'scale-100' : 'scale-90'}`}>
        {value}
      </div>
      <div className="text-sm text-[#64748B] font-semibold">{label}</div>
    </div>
  );
}

export function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [cs, setCs] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
      .then(({ data, error }) => {
        if (error || !data) { setNotFound(true); }
        else setCs(data as CaseStudy);
        setLoading(false);
      });
  }, [slug]);

  useSEO(cs ? {
    title: cs.seo_title || cs.title,
    description: cs.seo_description || cs.challenge,
    canonicalUrl: `https://launchaipilot.com/case-studies/${cs.slug}`,
    ogImage: cs.og_image_url || cs.cover_image_url || undefined,
    ogType: 'article',
    publishedAt: cs.published_at || undefined,
    structuredData: buildCaseStudyStructuredData({
      title: cs.title,
      excerpt: cs.challenge,
      slug: cs.slug,
      client: cs.client_name,
      publishedAt: cs.published_at,
      coverImage: cs.cover_image_url,
    }),
  } : {});

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] font-sans">
        <Navbar />
        <div className="flex items-center justify-center py-24">
          <Loader2 className="text-[#8B5CF6] animate-spin" size={32} />
        </div>
      </div>
    );
  }

  if (notFound || !cs) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] font-sans">
        <Navbar />
        <div className="text-center py-24 px-6">
          <div className="text-6xl mb-6">😕</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Case study not found</h1>
          <Link to="/case-studies" className="bg-[#8B5CF6] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#7C3AED] transition-colors inline-flex items-center gap-2">
            Browse all case studies <ArrowRight size={16} />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const metrics = cs.metrics as CaseStudyMetric[];

  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className={`pt-32 pb-16 px-6 ${cs.cover_image_url ? '' : 'bg-gradient-to-br from-[#8B5CF6]/5 to-transparent'}`}>
          {cs.cover_image_url && (
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <img src={cs.cover_image_url} alt={cs.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-[#64748B] mb-8 font-medium">
              <Link to="/" className="hover:text-[#0F172A] transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link to="/case-studies" className="hover:text-[#0F172A] transition-colors">Case Studies</Link>
              <ChevronRight size={14} />
              <span className="text-[#94A3B8] truncate">{cs.title}</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold text-[#8B5CF6] bg-[#8B5CF6]/10 px-3 py-1.5 rounded-full border border-[#8B5CF6]/20">{cs.industry}</span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Users size={12} /> {cs.client_name}
                {cs.timeline && <><span className="text-slate-200 mx-1">·</span><Clock size={12} /> {cs.timeline}</>}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6 leading-tight">{cs.title}</h1>
          </div>
        </section>

        {/* Metrics */}
        {metrics.length > 0 && (
          <section className="py-16 px-6 bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-center text-sm font-bold uppercase tracking-wider text-[#8B5CF6] mb-8">Key Results</h2>
              <div className={`grid gap-6 ${metrics.length <= 2 ? 'sm:grid-cols-2' : metrics.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
                {metrics.map((m, i) => (
                  <AnimatedMetric key={i} value={m.value} label={m.label} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Challenge / Solution / Results */}
        {(cs.challenge || cs.solution || cs.results) && (
          <section className="py-16 px-6 bg-white border-y border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              {cs.challenge && (
                <div>
                  <div className="flex items-center gap-2 font-bold text-lg text-slate-800 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center"><AlertCircle className="text-red-500" size={16} /></div>
                    The Challenge
                  </div>
                  <p className="text-[#64748B] leading-relaxed text-sm">{cs.challenge}</p>
                </div>
              )}
              {cs.solution && (
                <div>
                  <div className="flex items-center gap-2 font-bold text-lg text-slate-800 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center"><Lightbulb className="text-[#8B5CF6]" size={16} /></div>
                    Our Solution
                  </div>
                  <p className="text-[#64748B] leading-relaxed text-sm">{cs.solution}</p>
                </div>
              )}
              {cs.results && (
                <div>
                  <div className="flex items-center gap-2 font-bold text-lg text-slate-800 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center"><CheckCircle className="text-green-500" size={16} /></div>
                    The Results
                  </div>
                  <p className="text-[#64748B] leading-relaxed text-sm">{cs.results}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Full content */}
        {cs.content && (
          <section className="py-16 px-6 bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div
                className="prose prose-lg prose-slate max-w-none prose-headings:text-[#0F172A] prose-p:text-[#334155] prose-p:leading-[1.8] prose-a:text-[#8B5CF6] hover:prose-a:underline prose-strong:text-[#0F172A] prose-pre:bg-slate-900 prose-code:text-[#8B5CF6] prose-code:bg-[#8B5CF6]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none"
                dangerouslySetInnerHTML={{ __html: cs.content }}
              />
            </div>
          </section>
        )}

        {/* Gallery */}
        {cs.gallery_images?.length > 0 && (
          <section className="py-16 px-6 bg-white border-t border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-8">Gallery</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cs.gallery_images.map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden aspect-video bg-slate-100">
                    <img src={img} alt={`${cs.title} gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-24 px-6 bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-4">Want results like {cs.client_name}?</h2>
            <p className="text-xl text-purple-200 mb-10">Let's talk about how LaunchPilot can help your business grow.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#8B5CF6] font-bold px-10 py-4 rounded-full hover:bg-purple-50 transition-colors shadow-xl text-lg">
              Get in touch <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
