import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';
import { supabase } from '../lib/supabase';
import type { CaseStudy } from '../types/database';
import { Loader2 } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

export function CaseStudiesList() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchStudies = async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      
      if (data) {
        setStudies(data as CaseStudy[]);
      }
      setLoading(false);
    };

    fetchStudies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
      <Navbar />

      <main className="flex-grow">
        
        {/* Mini Hero Section */}
        <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-white overflow-hidden border-b border-gray-100">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cobalt-50/50 via-white to-white pointer-events-none" />
          <div className="absolute top-0 right-0 w-full h-[600px] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          
          <div className="container-editorial relative z-10">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
              
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-ink-100 shadow-sm mb-8 animate-fade-down">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse shrink-0 shadow-[0_0_8px_rgba(79,70,229,0.6)]" />
                <span className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-ink-600">
                  Client Success
                </span>
              </div>

              <h1 className="font-display font-bold text-ink-900 mb-6 leading-[1.1] tracking-tight animate-fade-up" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}>
                Real Results.
              </h1>

              <p className="body-xl text-ink-500 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
                We don't build software just to ship code. We build platforms that scale revenue, reduce operational friction, and support millions of users. Look at what we've engineered.
              </p>

            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50/100 to-transparent pointer-events-none" />
        </section>

        {/* Content Section */}
        <section className="py-24 bg-gray-50">
          <div className="container-editorial">

          {/* Grid of Case Studies */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="animate-spin text-indigo-600" size={32} />
            </div>
          ) : studies.length === 0 ? (
            <div className="text-center py-24 text-ink-500">
              No case studies found. Check back later!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {studies.map((study) => (
                <a href={`/case-studies/${study.slug}`} key={study.id} className="group flex flex-col bg-white rounded-[1rem] border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden h-full">
                  
                  {/* Image */}
                  <div className="h-56 overflow-hidden relative">
                    {study.cover_image_url ? (
                      <img 
                        src={study.cover_image_url} 
                        alt={study.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-indigo-50 flex items-center justify-center">
                        <span className="text-indigo-200 font-bold text-2xl">{study.client_name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="bg-white/90 backdrop-blur-sm text-ink-900 text-[0.75rem] font-bold px-3 py-1 rounded-full">
                        {study.industry}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="text-[0.875rem] font-bold text-indigo-600 mb-3 uppercase tracking-widest">
                      {study.client_name}
                    </div>
                    
                    <h2 className="text-[1.375rem] font-bold text-ink-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                      {study.title}
                    </h2>
                    
                    <p className="text-[0.9375rem] text-ink-500 mb-8 line-clamp-2">
                      {study.challenge}
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-gray-100">
                      {(study.metrics || []).slice(0, 2).map((stat, statIdx) => (
                        <div key={statIdx}>
                          <div className="text-[1.5rem] font-black text-ink-900 mb-1 leading-none tracking-tighter">
                            {stat.value}
                          </div>
                          <div className="text-[0.6875rem] font-bold text-ink-400 uppercase tracking-widest">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </a>
              ))}
            </div>
          )}

          </div>
        </section>
      </main>

      <LaunchFooter />
    </div>
  );
}
