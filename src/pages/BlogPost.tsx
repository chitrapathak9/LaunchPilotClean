import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import { 
  ChevronRight,
  Clock,
  Calendar,
  PenTool,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  AlertTriangle,
  Code2
} from 'lucide-react';

// Dummy data matching the BlogListing
const POST = {
  slug: 'validate-startup-idea',
  title: 'How to validate a startup idea in 24 hours',
  excerpt: 'Most founders waste months building the wrong thing. Here\'s how to know if people actually want your product in just 24 hours.',
  category: 'MVP Building',
  tags: ['validate', 'startup', 'idea', 'founder'],
  author: 'Alex Rivera',
  authorBio: 'Alex is a serial founder who has launched 12 products in the last two years. He specializes in rapid MVP development and AI tools.',
  publishedAt: '2026-05-20',
  readTime: 6,
  coverImage: 'Idea Scoring Matrix'
};

const RELATED_POSTS = [
  {
    slug: 'build-saas-mvp-week',
    title: 'How to build a SaaS MVP in a week with Claude Code',
    category: 'SaaS',
    excerpt: 'Step-by-step tutorial on prompting Claude to build a full-stack Next.js SaaS app complete with Auth and Stripe billing.',
    publishedAt: '2026-05-12',
    readTime: 12,
  },
  {
    slug: 'claude-code-vs-cursor',
    title: 'Claude Code vs Cursor — which is better for building MVPs?',
    category: 'AI Tools',
    excerpt: 'We built the same application twice. One in Cursor, one with Claude Code. Here is the unfiltered comparison.',
    publishedAt: '2026-04-20',
    readTime: 9,
  },
  {
    slug: 'product-hunt-launch-no-audience',
    title: 'How to launch on Product Hunt with no audience',
    category: 'Launch Strategy',
    excerpt: 'You don\'t need 10k Twitter followers to get Product of the Day. Use this guerrilla marketing playbook to drive upvotes.',
    publishedAt: '2026-04-28',
    readTime: 7,
  }
];

function ReadingProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setWidth((scrollPx / winHeightPx) * 100);
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 bg-[#8B5CF6] z-[999] transition-all duration-150" style={{ width: `${width}%` }} />
  );
}

function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm text-[#64748B] mb-8 font-medium">
      <Link to="/" className="hover:text-[#0F172A] transition-colors">Home</Link>
      <ChevronRight size={14} />
      <Link to="/blog" className="hover:text-[#0F172A] transition-colors">Blog</Link>
      <ChevronRight size={14} />
      <Link to="/blog" className="text-[#8B5CF6] hover:underline">{POST.category}</Link>
      <ChevronRight size={14} />
      <span className="text-[#94A3B8] truncate max-w-[200px]">{POST.title}</span>
    </div>
  );
}

function ArticleHeader() {
  return (
    <header className="mb-12">
      <div className="inline-flex items-center gap-1.5 bg-[#8B5CF6]/10 text-[#8B5CF6] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-[#8B5CF6]/20">
        🏷️ {POST.category}
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6 leading-tight tracking-tight">
        {POST.title}
      </h1>
      <p className="text-xl text-[#334155] leading-relaxed mb-8 max-w-3xl">
        {POST.excerpt}
      </p>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#E2E8F0] flex items-center justify-center text-[#94A3B8]">
          <PenTool size={20} />
        </div>
        <div>
          <div className="font-bold text-[#0F172A]">{POST.author}</div>
          <div className="flex items-center gap-3 text-sm text-[#64748B] font-medium mt-0.5">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(POST.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {POST.readTime} min read</span>
          </div>
        </div>
      </div>
      
      {/* Cover Image Placeholder */}
      <div className="w-full h-64 md:h-96 bg-white border border-slate-200 mt-12 rounded-3xl relative overflow-hidden flex items-center justify-center shadow-xl shadow-slate-200/50">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent opacity-80" />
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 relative z-10 opacity-50 font-mono tracking-tighter">
          {POST.coverImage}
        </h2>
      </div>
    </header>
  );
}

function TipBox({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="my-8 bg-[#8B5CF6]/5 border-l-4 border-[#8B5CF6] rounded-r-xl p-6">
      <div className="flex items-center gap-2 font-bold text-[#8B5CF6] mb-2">
        <Lightbulb size={20} /> {title}
      </div>
      <div className="text-[#334155] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function WarningBox({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="my-8 bg-amber-500/5 border-l-4 border-amber-500 rounded-r-xl p-6">
      <div className="flex items-center gap-2 font-bold text-amber-600 mb-2">
        <AlertTriangle size={20} /> {title}
      </div>
      <div className="text-[#334155] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function InlineSkillCTA() {
  return (
    <div className="my-10 bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] shrink-0 mt-1">
          <Code2 size={24} />
        </div>
        <div>
          <div className="text-sm font-bold text-[#8B5CF6] uppercase tracking-wider mb-1">🛠️ Related Skill</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">SaaS Builder Skill</h3>
          <p className="text-slate-500">Build a full-stack SaaS with AI in record time using our pre-optimized instructions.</p>
        </div>
      </div>
      <Link to="/skills/saas-builder" className="w-full md:w-auto bg-[#8B5CF6] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#7C3AED] transition-colors whitespace-nowrap text-center shadow-lg shadow-[#8B5CF6]/20">
        Get this skill — $9 &rarr;
      </Link>
    </div>
  );
}

function ArticleBody() {
  return (
    <article className="prose prose-lg max-w-[680px] prose-headings:text-[#0F172A] prose-p:text-[#334155] prose-p:leading-[1.8] prose-a:text-[#8B5CF6] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0F172A] prose-li:text-[#334155]">
      <h2 id="introduction" className="text-3xl font-bold mt-12 mb-6 border-l-4 border-[#8B5CF6] pl-4">Introduction</h2>
      <p>
        Most founders waste months building the wrong thing. You lock yourself in a room, write code for 6 months, and finally launch to... crickets. The problem wasn't your code, it was your market assumption.
      </p>
      <p>
        In this guide, you will learn the exact framework to score market demand, competition, and feasibility <strong>before writing any code</strong>.
      </p>
      
      <h2 id="section-1" className="text-3xl font-bold mt-12 mb-6 border-l-4 border-[#8B5CF6] pl-4">1. The Fake Door Test</h2>
      <p>
        The absolute fastest way to validate demand is to pretend the product already exists. Set up a simple landing page that explains the value proposition and asks for an email (or better, a small payment).
      </p>
      
      <TipBox title="Pro Tip">
        Don't just ask for emails. Ask people to pre-order for a massive discount (e.g. $49 instead of $149). If they won't put down a credit card, they don't have a burning pain.
      </TipBox>
      
      <p>
        If you are using AI to build your landing page, you can generate a high-converting page in about 15 minutes. We use the Landing Page Builder skill for this.
      </p>
      
      <h3 id="subsection-1-1" className="text-2xl font-bold mt-8 mb-4">Tracking metrics</h3>
      <p>
        Drive 100 targeted visitors to the page via Reddit, Twitter, or $50 in ads. If you can't get at least a 5% conversion rate on emails, the messaging or the idea needs tweaking.
      </p>
      
      <WarningBox title="Watch Out">
        Don't post in communities asking "Would you use this?". People will lie to be nice. The only validation is a submitted email or a processed payment.
      </WarningBox>
      
      <h2 id="section-2" className="text-3xl font-bold mt-12 mb-6 border-l-4 border-[#8B5CF6] pl-4">2. Building the MVP</h2>
      <p>
        Once validated, you need to ship the MVP fast. This is where AI completely changes the game. Using <code className="bg-[#E2E8F0] text-[#8B5CF6] px-1.5 py-0.5 rounded-md font-mono text-sm">Claude Code</code> or Cursor, you can build a SaaS in days.
      </p>
      
      <div className="bg-white rounded-xl overflow-hidden my-8 border border-slate-200 shadow-md">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
          <span className="text-xs text-slate-500 font-mono">terminal</span>
          <button className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium">Copy</button>
        </div>
        <pre className="p-4 overflow-x-auto text-sm text-slate-700 font-mono leading-relaxed bg-slate-50/50">
{`# Create the Next.js app
npx create-next-app@latest my-mvp --typescript --tailwind

# Drop the SaaS Builder skill into your project
cp SKILL.md my-mvp/

# Let the AI agent do the rest
claude-code "Read SKILL.md and build the auth flow"`}
        </pre>
      </div>
      
      <InlineSkillCTA />
      
      <h2 id="key-takeaways" className="text-3xl font-bold mt-12 mb-6 border-l-4 border-[#8B5CF6] pl-4">Key Takeaways</h2>
      <ul>
        <li>Never write code before validating demand with a landing page.</li>
        <li>Ask for payments or pre-orders, not just opinions.</li>
        <li>Use AI skills to compress your MVP build time from months to days.</li>
      </ul>
      
      <h2 id="conclusion" className="text-3xl font-bold mt-12 mb-6 border-l-4 border-[#8B5CF6] pl-4">Conclusion</h2>
      <p>
        Validation used to take weeks of user interviews. Now it takes a weekend. Stop guessing and start validating. If you're ready to build, grab our <a href="#">MVP Builder Bundle</a> and ship your product this week.
      </p>
    </article>
  );
}

function Sidebar() {
  return (
    <aside className="space-y-8 sticky top-24">
      
      {/* Author Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-[#E2E8F0] flex items-center justify-center text-[#94A3B8]">
            <PenTool size={24} />
          </div>
          <div>
            <div className="font-bold text-[#0F172A] text-lg">{POST.author}</div>
            <div className="flex gap-2 mt-1">
              <a href="#" className="text-[#94A3B8] hover:text-[#8B5CF6] transition-colors"><Twitter size={16} /></a>
              <a href="#" className="text-[#94A3B8] hover:text-[#8B5CF6] transition-colors"><Linkedin size={16} /></a>
            </div>
          </div>
        </div>
        <p className="text-sm text-[#64748B] leading-relaxed">
          {POST.authorBio}
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm">
        <div className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
          📋 Table of Contents
        </div>
        <nav className="flex flex-col space-y-2.5 text-sm font-medium">
          <a href="#introduction" className="text-[#8B5CF6]">Introduction</a>
          <a href="#section-1" className="text-[#64748B] hover:text-[#0F172A] transition-colors">1. The Fake Door Test</a>
          <a href="#section-2" className="text-[#64748B] hover:text-[#0F172A] transition-colors">2. Building the MVP</a>
          <a href="#key-takeaways" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Key Takeaways</a>
          <a href="#conclusion" className="text-[#64748B] hover:text-[#0F172A] transition-colors">Conclusion</a>
        </nav>
      </div>

      {/* Related Skills */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="font-bold mb-4 flex items-center gap-2 text-[#8B5CF6]">
          🛠️ Skills used here
        </div>
        <ul className="space-y-3 text-sm text-slate-600 mb-6">
          <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" /> SaaS Builder</li>
          <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" /> Landing Page Builder</li>
        </ul>
        <Link to="/skills" className="block text-center w-full bg-white text-slate-700 font-bold py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm border border-slate-200 shadow-sm">
          Browse Skills &rarr;
        </Link>
      </div>

      {/* Newsletter */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm text-center">
        <div className="font-bold text-[#0F172A] mb-2 text-lg">
          📬 Weekly drops
        </div>
        <p className="text-sm text-[#64748B] mb-4">
          Get new playbooks every week.
        </p>
        <input type="email" placeholder="Email address" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#8B5CF6] mb-2" />
        <button className="w-full bg-[#8B5CF6] text-white font-bold py-2.5 rounded-lg hover:bg-[#7C3AED] transition-colors text-sm">
          Subscribe
        </button>
      </div>
      
    </aside>
  );
}

function ArticleFooter() {
  return (
    <div className="mt-16">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {POST.tags.map(tag => (
          <Link key={tag} to={`/blog?tag=${tag}`} className="bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-colors px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            #{tag}
          </Link>
        ))}
      </div>
      
      {/* Share */}
      <div className="flex items-center gap-4 py-6 border-y border-[#E2E8F0]">
        <span className="font-bold text-[#0F172A] text-sm mr-2">Share this post:</span>
        <button className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] transition-all">
          <Twitter size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] transition-all">
          <Linkedin size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] transition-all">
          <LinkIcon size={18} />
        </button>
      </div>
      
      {/* Author Bio (Large) */}
      <div className="bg-white rounded-3xl p-8 md:p-10 my-16 flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-slate-200/50 border border-slate-200">
        <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border-4 border-slate-200">
          <PenTool size={32} />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Written by {POST.author}</h3>
          <p className="text-slate-500 leading-relaxed mb-6 max-w-xl">
            {POST.authorBio} I share everything I learn about building fast, leveraging AI, and finding product-market fit.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2 border border-slate-200">
              <Twitter size={16} className="text-[#38BDF8]" /> Follow on X
            </a>
            <a href="#" className="bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2 border border-slate-200">
              <Linkedin size={16} className="text-[#0A66C2]" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function RelatedPosts() {
  return (
    <section className="py-24 px-6 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0F172A] mb-12">You might also like</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {RELATED_POSTS.map((post, idx) => (
            <Link key={idx} to={`/blog/${post.slug}`} className="group h-full flex">
              <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#8B5CF6]/30 transition-all flex flex-col w-full">
                <div className="h-40 bg-slate-50 relative flex items-center justify-center p-6 border-b border-[#E2E8F0]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent opacity-80" />
                  <h4 className="text-lg font-bold text-slate-800 text-center relative z-10 leading-snug line-clamp-3">
                    {post.title}
                  </h4>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-3">
                    {post.category}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-3 leading-tight group-hover:text-[#8B5CF6] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] font-medium">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleCTASection() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6] text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-[#0F172A] mb-4">Ready to build faster?</h2>
        <p className="text-xl text-[#64748B] mb-10">Get the AI skills mentioned in this article.</p>
        
        <Link to="/skills" className="bg-[#8B5CF6] text-white font-bold px-10 py-4 rounded-full hover:bg-[#7C3AED] transition-colors shadow-lg shadow-[#8B5CF6]/30 inline-flex justify-center items-center gap-3 text-lg mb-8">
          Browse Skills <ArrowRight size={20} />
        </Link>
        
        <div className="flex justify-center items-center gap-2 text-sm text-[#64748B] font-medium">
          7-day refund <span className="text-[#CBD5E1]">•</span> One-time price <span className="text-[#CBD5E1]">•</span> Works with Cursor & Claude
        </div>
      </div>
    </section>
  );
}

export function BlogPost() {
  const { slug } = useParams();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <ReadingProgressBar />
      <Navbar />
      
      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb />
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
            {/* Left Column - Article Content (65%) */}
            <div className="w-full lg:w-[65%] shrink-0">
              <ArticleHeader />
              <ArticleBody />
              <ArticleFooter />
            </div>
            
            {/* Right Column - Sidebar (35%) */}
            <div className="w-full lg:w-[35%]">
              <Sidebar />
            </div>
          </div>
        </div>
        
        <RelatedPosts />
        <ArticleCTASection />
      </main>
      
      <Footer />
    </div>
  );
}
