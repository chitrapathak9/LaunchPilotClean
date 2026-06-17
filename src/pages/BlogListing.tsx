import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import { supabase } from '../lib/supabase';
import { useSEO } from '../hooks/useSEO';
import type { Blog } from '../types/database';
import {
  ArrowRight, Clock, Calendar, PenTool, Loader2, AlertCircle
} from 'lucide-react';

const CATEGORIES = ['All', 'MVP Building', 'AI Tools', 'SaaS', 'Launch Strategy', 'iOS', 'SEO', 'Marketing', 'General'];
const PAGE_SIZE = 9;

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm animate-pulse">
      <div className="h-48 bg-slate-100" />
      <div className="p-6 space-y-3">
        <div className="w-16 h-4 bg-slate-100 rounded" />
        <div className="w-3/4 h-6 bg-slate-100 rounded" />
        <div className="w-full h-4 bg-slate-100 rounded" />
        <div className="w-2/3 h-4 bg-slate-100 rounded" />
      </div>
    </div>
  );
}

function FeaturedPostCard({ post }: { post: Blog }) {
  return (
    <section className="py-12 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Link to={`/blog/${post.slug}`} className="group block">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#8B5CF6]/30 transition-all flex flex-col md:flex-row h-full md:h-[420px]">
            <div className="md:w-1/2 bg-slate-50 relative overflow-hidden h-64 md:h-full flex items-center justify-center p-8 border-r border-slate-200">
              {post.cover_image_url ? (
                <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover absolute inset-0" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent opacity-80" />
                  <h3 className="text-3xl font-bold text-slate-800 text-center relative z-10 leading-tight">{post.title}</h3>
                </>
              )}
              <div className="absolute top-4 left-4 bg-[#8B5CF6] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md z-10">
                📌 Featured
              </div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-4">{post.category}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 leading-tight group-hover:text-[#8B5CF6] transition-colors">{post.title}</h2>
              <p className="text-lg text-[#64748B] mb-8 leading-relaxed line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E2E8F0] flex items-center justify-center text-[#94A3B8]">
                    <PenTool size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-[#0F172A] text-sm">Author</div>
                    <div className="flex items-center gap-3 text-xs text-[#64748B] font-medium mt-0.5">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.read_time_minutes} min read</span>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex text-[#8B5CF6] font-bold items-center gap-1 group-hover:gap-2 transition-all">
                  Read article <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: Blog }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group h-full flex">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#8B5CF6]/30 transition-all flex flex-col w-full">
        <div className="h-48 bg-slate-50 relative flex items-center justify-center p-6 border-b border-[#E2E8F0] overflow-hidden">
          {post.cover_image_url ? (
            <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover absolute inset-0" />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent opacity-80" />
              <h4 className="text-xl font-bold text-slate-800 text-center relative z-10 leading-snug line-clamp-3">{post.title}</h4>
            </>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-3">{post.category}</div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-3 leading-tight group-hover:text-[#8B5CF6] transition-colors line-clamp-2">{post.title}</h3>
          <p className="text-sm text-[#64748B] mb-6 line-clamp-2 leading-relaxed">{post.excerpt}</p>
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[10px] font-bold text-[#8B5CF6]/70 bg-[#8B5CF6]/8 px-2 py-0.5 rounded-full uppercase tracking-wider">#{tag}</span>
              ))}
            </div>
          )}
          <div className="mt-auto pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] font-medium">
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.read_time_minutes} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BlogListing() {
  useSEO({
    title: 'Blog — Founder Playbooks & AI Tools',
    description: 'Practical guides on building MVPs, using AI tools, and launching products — written by builders, for builders.',
    canonicalUrl: 'https://launchaipilot.com/blog',
    ogType: 'website',
  });

  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError('');

    let query = supabase
      .from('blogs')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (activeCategory !== 'All') query = query.eq('category', activeCategory);

    query.then(({ data, count, error: err }) => {
      if (err) { setError('Failed to load posts'); }
      else { setPosts(data ?? []); setTotal(count ?? 0); }
      setLoading(false);
    });
  }, [activeCategory, page]);

  const featuredPost = page === 0 && activeCategory === 'All' ? posts.find(p => p.tags?.includes('featured')) || posts[0] : null;
  const gridPosts = featuredPost ? posts.slice(1) : posts;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 px-6 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 text-[#8B5CF6] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
              📝 Blog
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
              Founder playbooks. <br className="hidden md:block" />
              <span className="text-[#8B5CF6]">Shipped fast.</span>
            </h1>
            <p className="max-w-7xl mx-auto px-6 lg:px-8">
              Practical guides on building MVPs, using AI tools, and launching products — written by builders, for builders.
            </p>
          </div>
        </section>

        {/* Category filter */}
        <div className="bg-[#FAF9F6] border-b border-[#E2E8F0] sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => { setActiveCategory(c); setPage(0); }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === c
                    ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/20'
                    : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                }`}
              >
                {c}
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

        {loading ? (
          <section className="py-12 px-6">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </section>
        ) : (
          <>
            {featuredPost && activeCategory === 'All' && page === 0 && (
              <FeaturedPostCard post={featuredPost} />
            )}

            {gridPosts.length === 0 && !featuredPost ? (
              <section className="py-24 px-6 bg-[#FAF9F6]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <PenTool className="mx-auto text-slate-300 mb-4" size={32} />
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">No posts in this category yet</h3>
                  <p className="text-[#64748B]">Check back soon or browse all posts.</p>
                </div>
              </section>
            ) : (
              <section className="py-12 px-6 bg-[#FAF9F6]">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  {gridPosts.map(post => <BlogCard key={post.id} post={post} />)}
                </div>

                {totalPages > 1 && (
                  <div className="mt-16 flex justify-center gap-3">
                    {page > 0 && (
                      <button onClick={() => setPage(p => p - 1)} className="border-2 border-[#E2E8F0] text-[#0F172A] font-bold px-6 py-3 rounded-full hover:bg-white transition-colors shadow-sm">
                        ← Previous
                      </button>
                    )}
                    <span className="flex items-center text-sm text-slate-500 px-4">
                      Page {page + 1} of {totalPages}
                    </span>
                    {page < totalPages - 1 && (
                      <button onClick={() => setPage(p => p + 1)} className="border-2 border-[#E2E8F0] text-[#0F172A] font-bold px-6 py-3 rounded-full hover:bg-white transition-colors shadow-sm">
                        Load more →
                      </button>
                    )}
                  </div>
                )}
              </section>
            )}
          </>
        )}

        {/* Newsletter */}
        <section className="py-24 px-6 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 relative">
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Get founder playbooks in your inbox</h2>
                  <p className="text-lg text-slate-500 max-w-lg">Weekly. No fluff. Just what's working for builders right now.</p>
                </div>
                <div className="w-full md:w-auto">
                  <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                    <input type="email" placeholder="founder@startup.com" className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-5 py-3.5 text-slate-900 focus:outline-none focus:border-[#8B5CF6] placeholder:text-slate-400 w-full" required />
                    <button type="submit" className="bg-[#8B5CF6] text-white font-bold rounded-lg px-8 py-3.5 hover:bg-[#7C3AED] transition-colors whitespace-nowrap shadow-lg shadow-[#8B5CF6]/20">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
