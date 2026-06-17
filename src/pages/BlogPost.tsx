import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import { supabase } from '../lib/supabase';
import { useSEO, buildBlogStructuredData } from '../hooks/useSEO';
import type { Blog } from '../types/database';
import {
  ChevronRight, Clock, Calendar, PenTool, Twitter, Linkedin,
  Link as LinkIcon, ArrowRight, Loader2, AlertCircle
} from 'lucide-react';

function ReadingProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setWidth(winH > 0 ? (scrollPx / winH) * 100 : 0);
    };
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <div className="fixed top-0 left-0 h-1 bg-[#8B5CF6] z-[999] transition-all duration-150" style={{ width: `${width}%` }} />;
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-[#FAF9F6]">
      <Navbar />
      <div className="text-center py-24 px-6">
        <div className="text-6xl mb-6">😕</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Post not found</h1>
        <p className="text-slate-500 mb-8">This article may have been moved or deleted.</p>
        <Link to="/blog" className="bg-[#8B5CF6] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#7C3AED] transition-colors inline-flex items-center gap-2">
          Browse all posts <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/blog/${slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] transition-all relative" title="Copy link">
      <LinkIcon size={18} />
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Copied!</span>
      )}
    </button>
  );
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Blog | null>(null);
  const [related, setRelated] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        setPost(data as Blog);
        setLoading(false);

        // Load related posts
        supabase
          .from('blogs')
          .select('id, title, slug, category, excerpt, published_at, read_time_minutes')
          .eq('status', 'published')
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(3)
          .then(({ data: rel }) => setRelated(rel as Blog[] ?? []));
      });
  }, [slug]);

  useSEO(post ? {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    canonicalUrl: `https://launchaipilot.com/blog/${post.slug}`,
    ogImage: post.og_image_url || post.cover_image_url || undefined,
    ogType: 'article',
    publishedAt: post.published_at || undefined,
    modifiedAt: post.updated_at,
    structuredData: buildBlogStructuredData({
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      publishedAt: post.published_at,
      updatedAt: post.updated_at,
      coverImage: post.cover_image_url,
    }),
  } : {});

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] font-sans">
        <ReadingProgressBar />
        <Navbar />
        <div className="flex items-center justify-center py-24">
          <Loader2 className="text-[#8B5CF6] animate-spin" size={32} />
        </div>
      </div>
    );
  }

  if (notFound || !post) return <NotFound />;

  const publishDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <ReadingProgressBar />
      <Navbar />

      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#64748B] mb-8 font-medium">
            <Link to="/" className="hover:text-[#0F172A] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/blog" className="hover:text-[#0F172A] transition-colors">Blog</Link>
            <ChevronRight size={14} />
            <Link to="/blog" className="text-[#8B5CF6] hover:underline">{post.category}</Link>
            <ChevronRight size={14} />
            <span className="text-[#94A3B8] truncate max-w-[200px]">{post.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
            {/* Article */}
            <div className="w-full lg:w-[65%] shrink-0">
              {/* Header */}
              <header className="mb-12">
                <div className="inline-flex items-center gap-1.5 bg-[#8B5CF6]/10 text-[#8B5CF6] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-[#8B5CF6]/20">
                  🏷️ {post.category}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6 leading-tight tracking-tight">{post.title}</h1>
                <p className="text-xl text-[#334155] leading-relaxed mb-8 max-w-3xl">{post.excerpt}</p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E2E8F0] flex items-center justify-center text-[#94A3B8]">
                    <PenTool size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-[#0F172A]">LaunchPilot Team</div>
                    <div className="flex items-center gap-3 text-sm text-[#64748B] font-medium mt-0.5">
                      {publishDate && <span className="flex items-center gap-1.5"><Calendar size={14} /> {publishDate}</span>}
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {post.read_time_minutes} min read</span>
                    </div>
                  </div>
                </div>

                {post.cover_image_url && (
                  <div className="w-full h-64 md:h-96 mt-12 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
                    <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}
              </header>

              {/* Body — render HTML from Tiptap */}
              <div
                className="prose prose-lg max-w-[680px] prose-headings:text-[#0F172A] prose-p:text-[#334155] prose-p:leading-[1.8] prose-a:text-[#8B5CF6] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0F172A] prose-li:text-[#334155] prose-pre:bg-slate-900 prose-code:text-[#8B5CF6] prose-code:bg-[#8B5CF6]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Footer */}
              <div className="mt-16">
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-[#8B5CF6]/10 text-[#8B5CF6] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 py-6 border-y border-[#E2E8F0]">
                  <span className="font-bold text-[#0F172A] text-sm mr-2">Share this post:</span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://launchaipilot.com/blog/${post.slug}`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] transition-all"
                  >
                    <Twitter size={18} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://launchaipilot.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] transition-all"
                  >
                    <Linkedin size={18} />
                  </a>
                  <CopyLinkButton slug={post.slug} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-[35%] space-y-8 sticky top-24">
              <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm">
                <div className="font-bold text-[#0F172A] mb-4">📋 Quick Info</div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Category</span>
                    <span className="font-semibold text-[#8B5CF6]">{post.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Read Time</span>
                    <span className="font-semibold text-slate-800">{post.read_time_minutes} min</span>
                  </div>
                  {publishDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Published</span>
                      <span className="font-semibold text-slate-800">{publishDate}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm text-center">
                <div className="font-bold text-[#0F172A] mb-2 text-lg">📬 Weekly drops</div>
                <p className="text-sm text-[#64748B] mb-4">Get new playbooks every week.</p>
                <form className="space-y-2">
                  <input type="email" placeholder="Email address" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#8B5CF6]" />
                  <button className="w-full bg-[#8B5CF6] text-white font-bold py-2.5 rounded-lg hover:bg-[#7C3AED] transition-colors text-sm">Subscribe</button>
                </form>
              </div>
            </aside>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="py-24 px-6 bg-white border-y border-[#E2E8F0] mt-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-12">You might also like</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {related.map(rel => (
                  <Link key={rel.id} to={`/blog/${rel.slug}`} className="group">
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#8B5CF6]/30 transition-all">
                      <div className="h-40 bg-slate-50 relative flex items-center justify-center p-6 border-b border-[#E2E8F0] overflow-hidden">
                        {rel.cover_image_url ? (
                          <img src={rel.cover_image_url} alt={rel.title} className="w-full h-full object-cover absolute inset-0" />
                        ) : (
                          <h4 className="text-lg font-bold text-slate-800 text-center leading-snug line-clamp-3">{rel.title}</h4>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-2">{rel.category}</div>
                        <h3 className="text-lg font-bold text-[#0F172A] mb-3 group-hover:text-[#8B5CF6] transition-colors line-clamp-2">{rel.title}</h3>
                        <div className="flex items-center justify-between text-xs text-[#64748B] font-medium">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {rel.published_at ? new Date(rel.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {rel.read_time_minutes} min</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-24 px-6 bg-[#FAF9F6] text-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Ready to build faster?</h2>
            <p className="text-xl text-[#64748B] mb-10">Get the AI skills mentioned in this article.</p>
            <Link to="/skills" className="bg-[#8B5CF6] text-white font-bold px-10 py-4 rounded-full hover:bg-[#7C3AED] transition-colors shadow-lg shadow-[#8B5CF6]/30 inline-flex items-center gap-3 text-lg">
              Browse Skills <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
