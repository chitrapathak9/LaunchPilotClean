import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';
import { supabase } from '../lib/supabase';
import type { CaseStudy } from '../types/database';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { ActionCTA } from '../components/ui/ActionCTA';

export function CaseStudyDetail() {
  const { id } = useParams();
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchStudy = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('slug', id)
        .single();
      
      if (data) setStudy(data as CaseStudy);
      setLoading(false);
    };

    fetchStudy();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
        </main>
        <LaunchFooter />
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-24 text-center">
          <h1 className="heading-lg text-ink-900 mb-4">Case Study Not Found</h1>
          <p className="body-lg text-ink-500 mb-8">The case study you're looking for doesn't exist or has been removed.</p>
          <a href="/case-studies" className="btn-primary">View All Case Studies</a>
        </main>
        <LaunchFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-ink-900 selection:bg-cobalt-100 selection:text-cobalt-900">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        
        {/* Header Section */}
        <div className="container-editorial mb-16">
          <a href="/case-studies" className="inline-flex items-center gap-2 text-[0.875rem] font-bold text-indigo-600 hover:text-indigo-700 mb-10 transition-colors">
            <ArrowLeft size={16} /> Back to Case Studies
          </a>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="badge-cobalt">{study.industry}</span>
                <span className="text-[0.875rem] font-bold text-ink-900">{study.client_name}</span>
              </div>
              <h1 className="heading-hero text-ink-900 mb-6 text-balance">
                {study.title}
              </h1>
            </div>
            
            <div className="lg:col-span-5 bg-white rounded-[2rem] p-10 border border-gray-200 shadow-xl">
              <h3 className="text-[0.875rem] font-extrabold text-ink-400 uppercase tracking-widest mb-8">The Results</h3>
              <div className="space-y-8">
                {(study.metrics || []).map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-end border-b border-gray-100 pb-4">
                    <span className="text-[1.125rem] font-medium text-ink-500">{stat.label}</span>
                    <span className="text-[2.5rem] font-black text-indigo-600 leading-none tracking-tighter">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        {study.cover_image_url && (
          <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 mb-24">
            <img 
              src={study.cover_image_url} 
              alt={study.title} 
              className="w-full aspect-[21/9] object-cover rounded-[2.5rem] shadow-sm border border-gray-200"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="container-narrow mb-24">
          
          {/* Challenge */}
          <div className="mb-16">
            <h2 className="heading-lg text-ink-900 mb-6">The Challenge</h2>
            <p className="body-lg text-ink-600 leading-relaxed">
              {study.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="mb-16">
            <h2 className="heading-lg text-ink-900 mb-6">The Solution</h2>
            <p className="body-lg text-ink-600 leading-relaxed bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm">
              {study.solution}
            </p>
          </div>



        </div>

        {/* Custom CTA */}
        <ActionCTA 
          pillText="Ready to scale?"
          pillIcon={<CheckCircle2 size={14} />}
          title={<>Want similar results for <span className="text-indigo-600">your company?</span></>}
          description="Let's analyze your current architecture and map out a growth plan."
          buttonText="Schedule a Consultation"
        />

      </main>

      <LaunchFooter />
    </div>
  );
}
