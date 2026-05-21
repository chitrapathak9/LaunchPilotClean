import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import { 
  ArrowRight,
  Clock,
  Calendar,
  PenTool
} from 'lucide-react';

const BLOG_POSTS = [
  {
    slug: 'validate-startup-idea',
    title: 'How to validate a startup idea in 24 hours',
    excerpt: 'Stop building things nobody wants. Here is the exact framework to score market demand, competition, and feasibility before writing any code.',
    category: 'MVP Building',
    author: 'Alex Rivera',
    publishedAt: '2026-05-20',
    readTime: 6,
    featured: true
  },
  {
    slug: 'best-ai-coding-tools',
    title: 'Best AI coding tools for solo founders in 2026',
    excerpt: 'A complete breakdown of Claude Code, Cursor, Lovable, and Bolt. Which one should you use for your specific tech stack?',
    category: 'AI Tools',
    author: 'Sarah Jenkins',
    publishedAt: '2026-05-18',
    readTime: 8,
    featured: false
  },
  {
    slug: 'build-saas-mvp-week',
    title: 'How to build a SaaS MVP in a week with Claude Code',
    excerpt: 'Step-by-step tutorial on prompting Claude to build a full-stack Next.js SaaS app complete with Auth and Stripe billing.',
    category: 'SaaS',
    author: 'Alex Rivera',
    publishedAt: '2026-05-12',
    readTime: 12,
    featured: false
  },
  {
    slug: 'what-is-skill-md',
    title: 'What is a SKILL.md file and why every AI builder needs one',
    excerpt: 'Agent context is everything. Learn why dropping a plain markdown file with your rules changes the way AI writes your code.',
    category: 'AI Tools',
    author: 'Marcus Chen',
    publishedAt: '2026-05-05',
    readTime: 5,
    featured: false
  },
  {
    slug: 'product-hunt-launch-no-audience',
    title: 'How to launch on Product Hunt with no audience',
    excerpt: 'You don\'t need 10k Twitter followers to get Product of the Day. Use this guerrilla marketing playbook to drive upvotes.',
    category: 'Launch Strategy',
    author: 'Sarah Jenkins',
    publishedAt: '2026-04-28',
    readTime: 7,
    featured: false
  },
  {
    slug: 'claude-code-vs-cursor',
    title: 'Claude Code vs Cursor — which is better for building MVPs?',
    excerpt: 'We built the same application twice. One in Cursor, one with Claude Code. Here is the unfiltered comparison of speed and quality.',
    category: 'AI Tools',
    author: 'Alex Rivera',
    publishedAt: '2026-04-20',
    readTime: 9,
    featured: false
  }
];

const CATEGORIES = ['All', 'MVP Building', 'AI Tools', 'SaaS', 'Launch Strategy', 'iOS', 'SEO', 'Marketing'];

function PageHero() {
  return (
    <section className="pt-32 pb-12 px-6 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 text-[#8B5CF6] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
          📝 Blog
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
          Founder playbooks. <br className="hidden md:block" />
          <span className="text-[#8B5CF6]">Shipped fast.</span>
        </h1>
        <p className="text-xl text-[#334155] leading-relaxed max-w-2xl mx-auto font-medium">
          Practical guides on building MVPs, using AI tools, and launching products — written by builders, for builders.
        </p>
      </div>
    </section>
  );
}

function CategoryFilterBar({ active, setActive }: { active: string, setActive: (c: string) => void }) {
  return (
    <div className="bg-[#FAF9F6] border-b border-[#E2E8F0] sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex space-x-2 overflow-x-auto hide-scrollbar">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              active === c 
                ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/20' 
                : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function FeaturedPostCard({ post }: { post: typeof BLOG_POSTS[0] }) {
  return (
    <section className="py-12 px-6 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto">
        <Link to={`/blog/${post.slug}`} className="group block">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#8B5CF6]/30 transition-all flex flex-col md:flex-row h-full md:h-[420px]">
            {/* Visual Cover */}
            <div className="md:w-1/2 bg-slate-50 relative overflow-hidden h-64 md:h-full flex items-center justify-center p-8 border-r border-slate-200">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent opacity-80" />
              <div className="absolute top-4 left-4 bg-[#8B5CF6] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                📌 Featured
              </div>
              <h3 className="text-3xl font-bold text-slate-800 text-center relative z-10 leading-tight">
                {post.title}
              </h3>
            </div>
            
            {/* Content */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-4">
                {post.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 leading-tight group-hover:text-[#8B5CF6] transition-colors">
                {post.title}
              </h2>
              <p className="text-lg text-[#64748B] mb-8 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E2E8F0] flex items-center justify-center text-[#94A3B8]">
                    <PenTool size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-[#0F172A] text-sm">{post.author}</div>
                    <div className="flex items-center gap-3 text-xs text-[#64748B] font-medium mt-0.5">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} min read</span>
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

function BlogPostCard({ post }: { post: typeof BLOG_POSTS[0] }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group h-full flex">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#8B5CF6]/30 transition-all flex flex-col w-full">
        {/* Cover */}
        <div className="h-48 bg-slate-50 relative flex items-center justify-center p-6 border-b border-[#E2E8F0]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent opacity-80" />
          <h4 className="text-xl font-bold text-slate-800 text-center relative z-10 leading-snug line-clamp-3">
            {post.title}
          </h4>
        </div>
        
        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-3">
            {post.category}
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-3 leading-tight group-hover:text-[#8B5CF6] transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-[#64748B] mb-6 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="mt-auto pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] font-medium">
            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function PostGrid({ posts }: { posts: typeof BLOG_POSTS }) {
  if (posts.length === 0) {
    return (
      <section className="py-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto text-center bg-white border border-[#E2E8F0] rounded-3xl p-16 shadow-sm">
          <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center text-[#8B5CF6] mx-auto mb-6">
            <PenTool size={24} />
          </div>
          <h3 className="text-2xl font-bold text-[#0F172A] mb-2">First articles dropping soon</h3>
          <p className="text-[#64748B]">Subscribe to our newsletter to get notified when we publish.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
      
      {/* Pagination / Load More */}
      <div className="mt-16 flex justify-center">
        <button className="border-2 border-[#E2E8F0] text-[#0F172A] font-bold px-8 py-3 rounded-full hover:bg-white transition-colors shadow-sm">
          Load more articles
        </button>
      </div>
    </section>
  );
}

function NewsletterBanner() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 relative">
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Get founder playbooks in your inbox</h2>
              <p className="text-lg text-slate-500 max-w-lg">Weekly. No fluff. Just what's working for builders right now.</p>
            </div>
            
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <input 
                  type="email" 
                  placeholder="founder@startup.com" 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-5 py-3.5 text-slate-900 focus:outline-none focus:border-[#8B5CF6] placeholder:text-slate-400 w-full"
                  required
                />
                <button type="submit" className="bg-[#8B5CF6] text-white font-bold rounded-lg px-8 py-3.5 hover:bg-[#7C3AED] transition-colors whitespace-nowrap shadow-lg shadow-[#8B5CF6]/20">
                  Subscribe
                </button>
              </form>
              <p className="text-slate-500 text-xs mt-3 font-medium text-center md:text-left">
                No spam. Unsubscribe anytime. Join 500+ founders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BlogListing() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const featuredPost = BLOG_POSTS.find(p => p.featured);
  
  // Filter posts based on category, exclude the featured one from the grid if we are on 'All'
  const gridPosts = BLOG_POSTS.filter(p => {
    if (activeCategory === 'All') return !p.featured;
    return p.category === activeCategory;
  });

  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <Navbar />
      <main>
        <PageHero />
        <CategoryFilterBar active={activeCategory} setActive={setActiveCategory} />
        
        {/* Only show featured post if viewing 'All' */}
        {activeCategory === 'All' && featuredPost && (
          <FeaturedPostCard post={featuredPost} />
        )}
        
        <PostGrid posts={gridPosts} />
        
        <NewsletterBanner />
      </main>
      <Footer />
    </div>
  );
}
