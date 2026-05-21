import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Footer } from '../App';
import { 
  Search,
  CheckCircle2,
  ArrowRight,
  Filter,
  X,
  Layers,
  Terminal,
  Star,
  Users,
  BarChart,
  Rocket,
  Map as MapIcon,
  Library,
  Package
} from 'lucide-react';

// --- DATA ---
type Skill = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: 'building' | 'design' | 'marketing' | 'bundle';
  price: number;
  badge?: 'popular' | 'new' | 'bundle';
  icon: React.ReactNode;
  features: string[];
  compatibleWith: string[];
};

const SKILLS_DB: Skill[] = [
  {
    id: 'saas-builder', slug: 'saas-builder', name: 'SaaS Builder',
    tagline: 'Full-stack SaaS with auth & billing',
    description: 'The complete context required to build a Next.js SaaS app from zero to production.',
    category: 'building', price: 9, badge: 'popular', icon: <Layers size={28} />,
    features: ['Next.js App Router setup', 'Stripe Subscriptions', 'Supabase Auth & DB'],
    compatibleWith: ['Claude Code', 'Cursor', 'Lovable', 'Bolt']
  },
  {
    id: 'ios-builder', slug: 'ios-builder', name: 'iOS Mobile Builder',
    tagline: 'SwiftUI apps with backend',
    description: 'Native iOS app architecture with clean MVVM patterns and API integrations.',
    category: 'building', price: 9, icon: <Terminal size={28} />,
    features: ['SwiftUI best practices', 'API data fetching', 'State management'],
    compatibleWith: ['Cursor', 'Claude Code']
  },
  {
    id: 'shadcn-dashboard', slug: 'shadcn-dashboard', name: 'shadcn Dashboard',
    tagline: 'Admin panels with shadcn/ui',
    description: 'Pre-configured charts, tables, and data grids using Tailwind and shadcn.',
    category: 'building', price: 9, badge: 'new', icon: <BarChart size={28} />,
    features: ['Responsive layouts', 'Data visualization', 'Dark mode support'],
    compatibleWith: ['Claude Code', 'Cursor', 'v0']
  },
  {
    id: 'taste-design', slug: 'taste-design', name: 'Taste & Design',
    tagline: 'Pixel-perfect UI systems',
    description: 'Forces your AI to write beautiful, accessible Tailwind CSS instead of generic bootstrap.',
    category: 'design', price: 9, icon: <Star size={28} />,
    features: ['Premium color palettes', 'Micro-interactions', 'Spacing systems'],
    compatibleWith: ['Cursor', 'Claude Code', 'Lovable', 'v0']
  },
  {
    id: 'landing-page-builder', slug: 'landing-page-builder', name: 'Landing Page Builder',
    tagline: 'High-converting marketing pages',
    description: 'Structured sections optimized for conversion, trust, and clear messaging.',
    category: 'design', price: 9, icon: <Library size={28} />,
    features: ['Hero section templates', 'Pricing tables', 'Testimonial grids'],
    compatibleWith: ['Claude Code', 'Cursor', 'v0', 'Lovable']
  },
  {
    id: 'humanizer', slug: 'humanizer', name: 'Humanizer',
    tagline: 'AI copy that reads human',
    description: 'Removes "delve", "testament to", and robotic tone from AI-generated copy.',
    category: 'marketing', price: 9, icon: <Users size={28} />,
    features: ['Conversational tone', 'Short paragraphs', 'Direct messaging'],
    compatibleWith: ['Claude Code', 'Cursor']
  },
  {
    id: 'seo-optimizer', slug: 'seo-optimizer', name: 'SEO Optimizer',
    tagline: 'Technical SEO + structured data',
    description: 'Ensures your Next.js app has perfect meta tags, sitemaps, and JSON-LD schemas.',
    category: 'marketing', price: 9, icon: <MapIcon size={28} />,
    features: ['Dynamic OpenGraph', 'JSON-LD injection', 'Canonical URLs'],
    compatibleWith: ['Claude Code', 'Cursor']
  },
  {
    id: 'guerrilla-marketing', slug: 'guerrilla-marketing', name: 'Guerrilla Marketing',
    tagline: 'Viral growth + launch strategy',
    description: 'Launch checklists and cold-email templates generated specifically for your product.',
    category: 'marketing', price: 9, icon: <Rocket size={28} />,
    features: ['Product Hunt strategy', 'Cold outreach templates', 'Reddit distribution'],
    compatibleWith: ['Claude Code']
  },
  {
    id: 'builder-bundle', slug: 'builder-bundle', name: 'MVP Mega Bundle',
    tagline: 'All skills + deploy templates',
    description: 'Get every skill in the catalog plus our exclusive rapid-deployment GitHub templates.',
    category: 'bundle', price: 29, badge: 'bundle', icon: <Package size={28} />,
    features: ['All 8 AI skills included', 'GitHub starter repos', 'Priority support'],
    compatibleWith: ['Claude Code', 'Cursor', 'Lovable', 'Bolt', 'v0']
  }
];

// --- COMPONENTS ---

function PageHero() {
  return (
    <section className="pt-32 pb-12 px-6 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 text-[#8B5CF6] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-6">
          🛠️ Skill Catalog
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] mb-6 leading-tight">
          One skill for every <br className="hidden md:block" />
          <span className="text-[#8B5CF6]">part of your product</span>
        </h1>
        <p className="text-xl text-[#334155] leading-relaxed max-w-2xl mx-auto font-medium mb-8">
          Battle-tested AI instructions that turn Claude, Cursor, or Lovable into a specialist. Mix and match to build anything.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[#64748B] font-bold text-sm uppercase tracking-wider">
          <span>9+ Skills</span>
          <span className="text-[#CBD5E1]">•</span>
          <span>500+ Founders</span>
          <span className="text-[#CBD5E1]">•</span>
          <span>From $9</span>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#8B5CF6]/50 transition-all flex flex-col group h-full overflow-hidden relative">
      
      {/* Badges */}
      <div className="absolute top-5 right-5 flex gap-2 z-10">
        {skill.badge === 'popular' && <span className="bg-[#F59E0B] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">🔥 Popular</span>}
        {skill.badge === 'new' && <span className="bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">✨ New</span>}
        {skill.badge === 'bundle' && <span className="bg-[#8B5CF6] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">⚡ Bundle</span>}
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-4">
          🏷️ {skill.category}
        </div>
        
        <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#8B5CF6] mb-6 group-hover:scale-110 transition-transform">
          {skill.icon}
        </div>
        
        <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{skill.name}</h3>
        <p className="text-[#64748B] text-sm leading-relaxed mb-6 h-10 line-clamp-2">{skill.description}</p>
        
        <div className="w-full h-px bg-[#E2E8F0] mb-6" />
        
        <ul className="space-y-3 mb-6 flex-1">
          {skill.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-[#334155] font-medium">
              <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" /> {feat}
            </li>
          ))}
        </ul>
        
        <div className="w-full h-px bg-[#E2E8F0] mb-6" />
        
        <div className="mb-6">
          <div className="text-xs text-[#94A3B8] font-semibold uppercase tracking-wider mb-2">Compatible with:</div>
          <div className="flex flex-wrap gap-1.5">
            {skill.compatibleWith.slice(0, 3).map(tool => (
              <span key={tool} className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                {tool}
              </span>
            ))}
            {skill.compatibleWith.length > 3 && (
              <span className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#94A3B8] text-[10px] font-bold px-2 py-1 rounded-md">
                +{skill.compatibleWith.length - 3}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="text-2xl font-bold text-[#0F172A]">${skill.price}</div>
          <Link to={`/skills/${skill.slug}`} className="flex items-center gap-1 text-[#8B5CF6] font-bold group-hover:gap-2 transition-all">
            View detail <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function BundlePromoBanner() {
  return (
    <section className="py-12">
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Want everything? Get the Builder Bundle.</h2>
          <p className="text-slate-600 text-lg">3 skills of your choice for $29. Save $8 vs buying separately.</p>
        </div>
        
        <div className="relative z-10 w-full md:w-auto shrink-0">
          <Link to="/pricing" className="block w-full text-center bg-[#8B5CF6] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#7C3AED] transition-colors shadow-lg shadow-[#8B5CF6]/20">
            View Bundle &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SkillsCatalog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'all';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState('all');
  const [aiTool, setAiTool] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredSkills = useMemo(() => {
    return SKILLS_DB.filter(s => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'all' && s.category !== category) return false;
      if (priceRange === 'under-20' && s.price >= 20) return false;
      if (priceRange === '20-50' && (s.price < 20 || s.price > 50)) return false;
      if (priceRange === '50+' && s.price <= 50) return false;
      if (aiTool !== 'all' && !s.compatibleWith.includes(aiTool)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return a.badge === 'new' ? -1 : 1;
      // Default: Popular (put bundles and popular badges first)
      if (a.badge === 'popular' || a.badge === 'bundle') return -1;
      if (b.badge === 'popular' || b.badge === 'bundle') return 1;
      return 0;
    });
  }, [search, category, priceRange, aiTool, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setPriceRange('all');
    setAiTool('all');
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen font-sans text-[#0F172A] selection:bg-[#8B5CF6]/20 bg-[#FAF9F6]">
      <Navbar />
      <main>
        <PageHero />
        
        <section className="pb-24 px-6 bg-[#FAF9F6]">
          <div className="max-w-7xl mx-auto">
            
            {/* Top Search Bar */}
            <div className="relative mb-8 z-20">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-[#64748B]">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search skills... (e.g. 'SaaS', 'iOS', 'SEO')" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-[#E2E8F0] rounded-2xl pl-12 pr-6 py-5 text-[#0F172A] font-medium text-lg focus:outline-none focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/20 shadow-sm transition-all placeholder:text-[#94A3B8]"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start relative">
              
              {/* Mobile Filter Toggle */}
              <button 
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden w-full bg-white border border-[#E2E8F0] text-[#0F172A] font-bold px-6 py-4 rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <Filter size={18} /> Filters & Sorting
              </button>

              {/* Sidebar Filters */}
              <div className={`w-full lg:w-[25%] lg:sticky lg:top-24 shrink-0 bg-white lg:bg-transparent rounded-2xl border lg:border-none border-[#E2E8F0] p-6 lg:p-0 z-30 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                
                <div className="space-y-8">
                  {/* Category */}
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4">Category</h3>
                    <div className="flex flex-col space-y-2">
                      {['all', 'building', 'design', 'marketing', 'bundle'].map(c => (
                        <label key={c} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${category === c ? 'bg-[#8B5CF6] border-[#8B5CF6]' : 'bg-white border-[#CBD5E1] group-hover:border-[#8B5CF6]'}`}>
                            {category === c && <CheckCircle2 size={14} className="text-white" />}
                          </div>
                          <input type="radio" name="category" value={c} checked={category === c} onChange={() => setCategory(c)} className="hidden" />
                          <span className={`font-medium capitalize ${category === c ? 'text-[#0F172A]' : 'text-[#64748B] group-hover:text-[#0F172A]'}`}>
                            {c === 'all' ? 'All Skills' : c}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* AI Tool */}
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4">AI Tool</h3>
                    <div className="flex flex-col space-y-2">
                      {['all', 'Claude Code', 'Cursor', 'Lovable', 'Replit'].map(c => (
                        <label key={c} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${aiTool === c ? 'bg-[#8B5CF6] border-[#8B5CF6]' : 'bg-white border-[#CBD5E1] group-hover:border-[#8B5CF6]'}`}>
                            {aiTool === c && <CheckCircle2 size={14} className="text-white" />}
                          </div>
                          <input type="radio" name="aitool" value={c} checked={aiTool === c} onChange={() => setAiTool(c)} className="hidden" />
                          <span className={`font-medium ${aiTool === c ? 'text-[#0F172A]' : 'text-[#64748B] group-hover:text-[#0F172A]'}`}>
                            {c === 'all' ? 'All Tools' : c}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4">Price</h3>
                    <div className="flex flex-col space-y-2">
                      {['all', 'under-20', '20-50', '50+'].map(c => (
                        <label key={c} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${priceRange === c ? 'bg-[#8B5CF6] border-[#8B5CF6]' : 'bg-white border-[#CBD5E1] group-hover:border-[#8B5CF6]'}`}>
                            {priceRange === c && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <input type="radio" name="price" value={c} checked={priceRange === c} onChange={() => setPriceRange(c)} className="hidden" />
                          <span className={`font-medium ${priceRange === c ? 'text-[#0F172A]' : 'text-[#64748B] group-hover:text-[#0F172A]'}`}>
                            {c === 'all' ? 'All Prices' : c === 'under-20' ? 'Under $20' : c === '20-50' ? '$20 - $50' : '$50+'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4">Sort By</h3>
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-white border border-[#CBD5E1] rounded-lg px-4 py-3 text-[#334155] font-medium focus:outline-none focus:border-[#8B5CF6] appearance-none"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="newest">Newest First</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>

                  <button 
                    onClick={clearFilters}
                    className="text-[#8B5CF6] font-bold text-sm hover:underline"
                  >
                    Clear all filters
                  </button>

                </div>
              </div>

              {/* Grid Area */}
              <div className="w-full lg:w-[75%]">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-[#64748B] font-bold">
                    Showing <span className="text-[#0F172A]">{filteredSkills.length}</span> skills
                  </div>
                </div>

                {filteredSkills.length > 0 ? (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredSkills.map(skill => (
                      <SkillCard key={skill.id} skill={skill} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-[#E2E8F0] rounded-3xl p-16 text-center shadow-sm">
                    <div className="w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center text-[#94A3B8] mx-auto mb-4 border border-[#E2E8F0]">
                      <Search size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">No skills found</h3>
                    <p className="text-[#64748B] mb-6">Try adjusting your filters or search a different term.</p>
                    <button onClick={clearFilters} className="bg-slate-100 text-slate-700 px-6 py-2 rounded-lg font-bold hover:bg-slate-200 border border-slate-200 transition-colors">
                      Clear filters
                    </button>
                  </div>
                )}
                
                <BundlePromoBanner />

                <div className="text-center py-12">
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Not sure which skill you need?</h3>
                  <p className="text-[#64748B] mb-6">Take the 2-minute quiz and get a personalized recommendation.</p>
                  <Link to="/skill-finder" className="border-2 border-[#E2E8F0] text-[#0F172A] font-bold px-8 py-3 rounded-full hover:bg-white transition-colors inline-block shadow-sm">
                    Take the Quiz &rarr;
                  </Link>
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
