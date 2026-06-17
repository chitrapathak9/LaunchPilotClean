import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';
import { mockCaseStudies } from '../data/dummyData';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ActionCTA } from '../components/ui/ActionCTA';

export function CaseStudyDetail() {
  const { id } = useParams();
  const study = mockCaseStudies.find(s => s.slug === id) || mockCaseStudies[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
                <span className="text-[0.875rem] font-bold text-ink-900">{study.client}</span>
              </div>
              <h1 className="heading-hero text-ink-900 mb-6 text-balance">
                {study.title}
              </h1>
            </div>
            
            <div className="lg:col-span-5 bg-white rounded-[2rem] p-10 border border-gray-200 shadow-xl">
              <h3 className="text-[0.875rem] font-extrabold text-ink-400 uppercase tracking-widest mb-8">The Results</h3>
              <div className="space-y-8">
                {study.stats.map((stat, idx) => (
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
        <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 mb-24">
          <img 
            src={study.image} 
            alt={study.title} 
            className="w-full aspect-[21/9] object-cover rounded-[2.5rem] shadow-sm border border-gray-200"
          />
        </div>

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

          {/* Tech Stack */}
          <div>
            <h2 className="heading-lg text-ink-900 mb-6">The Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {study.techStack.map((tech, idx) => (
                <div key={idx} className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span className="font-bold text-ink-700 text-[0.9375rem]">{tech}</span>
                </div>
              ))}
            </div>
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
