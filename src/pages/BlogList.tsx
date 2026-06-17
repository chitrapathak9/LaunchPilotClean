import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { LaunchFooter } from '../components/LaunchFooter';
import { supabase } from '../lib/supabase';
import type { BlogWithAuthor } from '../types/database';
import { Clock, ArrowRight, Loader2 } from 'lucide-react';

export function BlogList() {
  const [blogs, setBlogs] = useState<BlogWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*, profiles(full_name, avatar_url)')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      
      if (data) {
        setBlogs(data as unknown as BlogWithAuthor[]);
      }
      setLoading(false);
    };

    fetchBlogs();
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
                  Technical Blog
                </span>
              </div>

              <h1 className="font-display font-bold text-ink-900 mb-6 leading-[1.1] tracking-tight animate-fade-up" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}>
                Engineering Insights
              </h1>

              <p className="body-xl text-ink-500 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
                Thoughts on software architecture, AI engineering, and scaling tech teams from the elite engineers at Launch AI Pilot.
              </p>

            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50/100 to-transparent pointer-events-none" />
        </section>

        {/* Content Section */}
        <section className="py-24 bg-gray-50">
          <div className="container-editorial">

          {/* Grid of posts */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="animate-spin text-indigo-600" size={32} />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-24 text-ink-500">
              No blog posts found. Check back later!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {blogs.map((post) => {
                const authorName = post.profiles?.full_name || 'Launch AI Pilot Team';
                const dateString = post.published_at 
                  ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  : 'Recent';

                return (
                  <a href={`/blog/${post.slug}`} key={post.id} className="group flex flex-col bg-white rounded-[1rem] border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden h-full">
                    <div className="h-56 overflow-hidden relative">
                      {post.cover_image_url ? (
                        <img 
                          src={post.cover_image_url} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-indigo-50 flex items-center justify-center">
                          <span className="text-indigo-200 font-bold text-2xl">{post.title.charAt(0)}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[0.6875rem] font-bold text-indigo-600 uppercase tracking-widest">{post.category || 'Engineering'}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-[0.75rem] font-medium text-ink-400">{post.read_time_minutes || 5} min read</span>
                      </div>
                      <h3 className="text-[1.25rem] font-bold text-ink-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-[0.9375rem] text-ink-500 mb-8 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-gray-100">
                        <span className="text-[0.8125rem] font-bold text-ink-400 uppercase tracking-wider">
                          {dateString}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          </div>
        </section>
      </main>

      <LaunchFooter />
    </div>
  );
}
