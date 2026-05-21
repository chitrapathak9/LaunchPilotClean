import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Download, X, Github, BookOpen, List, Plus, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

/* ── Types ── */
type ChangelogEntry = {
  version: string;
  date: string;
  changes: string[];
  isLatest: boolean;
};

type OwnedSkill = {
  skillId: string;
  name: string;
  slug: string;
  icon: string;
  tagline: string;
  version: string;
  latestVersion: string;
  hasUpdate: boolean;
  purchasedAt: string;
  lastUpdatedAt: string;
  downloadUrl: string;
  githubUrl: string;
  changelog: ChangelogEntry[];
  readmeContent: string;
  skillContent: string;
};

/* ── Mock Data ── */
const MOCK_SKILLS: OwnedSkill[] = [
  {
    skillId: 'saas-builder',
    name: 'SaaS Builder Skill',
    slug: 'saas-builder',
    icon: '🏗️',
    tagline: 'Full-stack SaaS with auth and billing',
    version: 'v1.2',
    latestVersion: 'v1.2',
    hasUpdate: false,
    purchasedAt: 'Jan 15, 2025',
    lastUpdatedAt: 'Jan 20, 2025',
    downloadUrl: '#',
    githubUrl: 'https://github.com/example/saas-builder',
    changelog: [
      { version: 'v1.2', date: 'Jan 20, 2025', changes: ['Added Stripe webhooks', 'Fixed auth redirects'], isLatest: true },
      { version: 'v1.0', date: 'Jan 1, 2025', changes: ['Initial release'], isLatest: false },
    ],
    readmeContent: '# SaaS Builder\n\nBuild SaaS faster.\n\n## Setup\n1. Run `npm install`\n2. Configure `.env`',
    skillContent: '# SKILL.md\n\nPrompt engineering guidelines for SaaS Builder...',
  },
  {
    skillId: 'seo-optimizer',
    name: 'SEO Optimizer Skill',
    slug: 'seo-optimizer',
    icon: '🔍',
    tagline: 'Technical SEO + structured data',
    version: 'v1.0',
    latestVersion: 'v1.2',
    hasUpdate: true,
    purchasedAt: 'Jan 15, 2025',
    lastUpdatedAt: 'Jan 20, 2025',
    downloadUrl: '#',
    githubUrl: 'https://github.com/example/seo-optimizer',
    changelog: [
      { version: 'v1.2', date: 'Jan 20, 2025', changes: ['Structured data improvements', '3 new content prompts', 'Fixed meta tag conflicts'], isLatest: true },
      { version: 'v1.1', date: 'Jan 10, 2025', changes: ['Added Open Graph tag instructions', 'Better handling of dynamic routes'], isLatest: false },
      { version: 'v1.0', date: 'Jan 1, 2025', changes: ['First release'], isLatest: false },
    ],
    readmeContent: '# SEO Optimizer\n\nRank higher on Google.\n\n## Features\n- Metadata generation\n- Structured data',
    skillContent: '# SKILL.md\n\nInstructions for the AI to act as an SEO expert...',
  },
  {
    skillId: 'landing-page',
    name: 'Landing Page Builder',
    slug: 'landing-page',
    icon: '🛬',
    tagline: 'High-converting landing pages',
    version: 'v1.1',
    latestVersion: 'v1.1',
    hasUpdate: false,
    purchasedAt: 'Jan 17, 2025',
    lastUpdatedAt: 'Jan 17, 2025',
    downloadUrl: '#',
    githubUrl: 'https://github.com/example/landing-page',
    changelog: [
      { version: 'v1.1', date: 'Jan 17, 2025', changes: ['Added 3 new templates'], isLatest: true },
    ],
    readmeContent: '# Landing Page Builder\n\nCreate beautiful landing pages.',
    skillContent: '# SKILL.md\n\nPrompt guidelines for UI generation...',
  },
];

/* ── Components ── */

export function DashboardSkills() {
  const { user } = useAuth();
  const [skills] = useState<OwnedSkill[]>(MOCK_SKILLS);
  const [activeTab, setActiveTab] = useState<'All' | 'Up to date' | 'Updates'>('All');
  const [sortBy, setSortBy] = useState<'Newest' | 'Oldest' | 'A-Z' | 'Recently updated'>('Newest');

  const [drawerSkill, setDrawerSkill] = useState<OwnedSkill | null>(null);
  const [drawerTab, setDrawerTab] = useState<'SKILL.md' | 'README' | 'Changelog'>('SKILL.md');

  const [changelogSkill, setChangelogSkill] = useState<OwnedSkill | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const [downloading, setDownloading] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Derived state
  const updatesCount = skills.filter(s => s.hasUpdate).length;
  const upToDateCount = skills.filter(s => !s.hasUpdate).length;

  const filteredSkills = useMemo(() => {
    let res = skills;
    if (activeTab === 'Up to date') res = res.filter(s => !s.hasUpdate);
    if (activeTab === 'Updates') res = res.filter(s => s.hasUpdate);

    // Sort
    return res.sort((a, b) => {
      if (sortBy === 'A-Z') return a.name.localeCompare(b.name);
      if (sortBy === 'Newest') return new Date(b.purchasedAt).getTime() - new Date(a.purchasedAt).getTime();
      if (sortBy === 'Oldest') return new Date(a.purchasedAt).getTime() - new Date(b.purchasedAt).getTime();
      if (sortBy === 'Recently updated') return new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime();
      return 0;
    });
  }, [skills, activeTab, sortBy]);

  const handleDownload = async (skillId: string, version: string) => {
    if (downloading) return;
    setDownloading(skillId);

    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const skill = skills.find(s => s.skillId === skillId);
    if (skill) {
      // Create a dummy blob download
      const blob = new Blob([skill.skillContent], { type: 'text/markdown' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${skill.slug}-${version}-SKILL.md`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }

    setDownloading(null);
  };

  const getUpdatesBanner = () => {
    if (bannerDismissed || updatesCount === 0) return null;
    const isSingle = updatesCount === 1;
    const exampleUpdate = skills.find(s => s.hasUpdate);

    return (
      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 mb-8 relative border-t-4 border-t-[#8B5CF6]">
        <button onClick={() => setBannerDismissed(true)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X size={18} />
        </button>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-xl">🔄</div>
          <div>
            <h3 className="text-slate-900 font-bold text-[15px] mb-1.5">
              {updatesCount} skill{isSingle ? '' : 's'} {isSingle ? 'has an' : 'have'} update{isSingle ? '' : 's'} available
            </h3>
            {isSingle && exampleUpdate && (
              <p className="text-slate-500 text-sm mb-4 max-w-2xl">
                <strong className="text-slate-900 font-medium">{exampleUpdate.name}</strong> was updated to {exampleUpdate.latestVersion} — includes{' '}
                {exampleUpdate.changelog[0]?.changes[0]?.toLowerCase()} and more.
              </p>
            )}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => {
                  if (exampleUpdate) handleDownload(exampleUpdate.skillId, exampleUpdate.latestVersion);
                }}
                className="bg-[#8B5CF6] text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-[#7C3AED] transition-colors"
              >
                Download Update{isSingle ? '' : 's'}
              </button>
              {isSingle && exampleUpdate && (
                <button
                  onClick={() => setChangelogSkill(exampleUpdate)}
                  className="bg-transparent border border-[#8B5CF6]/30 text-[#8B5CF6] font-semibold px-4 py-2 rounded-lg text-sm hover:bg-[#8B5CF6]/10 transition-colors"
                >
                  View changelog
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (skills.length === 0) {
    return (
      <DashboardLayout>
        <main className="flex-1 p-6 flex flex-col items-center justify-center min-h-[80vh] bg-[#FAF9F6]">
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-10 max-w-md w-full text-center">
            <div className="text-6xl mb-6">🛠️</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">No skills yet</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              You haven't purchased any skills yet. Browse the catalog to find the right skill for what you're building.
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/skills" className="bg-[#8B5CF6] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#7C3AED] transition-colors flex items-center justify-center gap-2">
                Browse Skills <ArrowRight size={16} />
              </Link>
              <Link to="/skill-finder" className="bg-transparent border border-slate-300 text-slate-700 font-medium px-5 py-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                Take the Quiz <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </main>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <main className="flex-1 p-6 md:p-10 max-w-[1200px] w-full mx-auto bg-[#FAF9F6] min-h-screen">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1.5">My Skills</h1>
            <p className="text-slate-500">{skills.length} skills in your library</p>
          </div>
          <Link to="/skills" className="border border-[#8B5CF6] text-[#8B5CF6] font-semibold px-4 py-2 rounded-xl text-sm hover:bg-[#8B5CF6]/10 transition-colors flex items-center gap-2">
            <Plus size={16} /> Get More Skills
          </Link>
        </div>

        {getUpdatesBanner()}

        {/* Filter / Sort Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex bg-white border border-slate-200 p-1 rounded-lg overflow-x-auto w-full sm:w-auto shadow-sm">
            {(['All', 'Up to date', 'Updates'] as const).map(tab => {
              const count = tab === 'All' ? skills.length : tab === 'Up to date' ? upToDateCount : updatesCount;
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors flex-shrink-0 flex items-center gap-2 ${active ? 'bg-[#8B5CF6] text-white' : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  {tab} <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-slate-500 text-sm">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'Newest' | 'Oldest' | 'A-Z' | 'Recently updated')}
              className="bg-white border border-slate-200 text-slate-900 text-sm font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#8B5CF6] shadow-sm"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="A-Z">A-Z</option>
              <option value="Recently updated">Recently updated</option>
            </select>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {filteredSkills.map(skill => {
            const isSelected = selectedSkill === skill.skillId;
            return (
              <div
                key={skill.skillId}
                onClick={() => setSelectedSkill(skill.skillId)}
                className={`rounded-2xl p-6 relative flex flex-col transition-all bg-white border cursor-pointer ${isSelected
                    ? 'border-[#8B5CF6] shadow-xl shadow-[#8B5CF6]/10 transform scale-[1.02] z-10'
                    : skill.hasUpdate
                      ? 'border-[#8B5CF6]/50 shadow-sm shadow-[#8B5CF6]/10'
                      : 'border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="text-3xl">{skill.icon}</div>
                  {skill.hasUpdate ? (
                    <span className="bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-pulse" /> Update avail.
                    </span>
                  ) : (
                    <span className="bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" /> Up to date
                    </span>
                  )}
                </div>

                <h3 className="text-slate-900 font-bold text-lg mb-1">{skill.name}</h3>
                <p className="text-slate-500 text-sm mb-5 leading-relaxed">{skill.tagline}</p>

                {/* Meta */}
                <div className="space-y-2 mb-5 flex-1">
                  {skill.hasUpdate ? (
                    <>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Your version:</span>
                        <span className="text-slate-900 font-mono">{skill.version}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">New version:</span>
                        <span className="text-[#8B5CF6] font-mono font-bold">{skill.latestVersion}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Version:</span>
                      <span className="text-slate-900 font-mono">{skill.version}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Purchased:</span>
                    <span className="text-slate-900">{skill.purchasedAt}</span>
                  </div>
                  {!skill.hasUpdate && (
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Last updated:</span>
                      <span className="text-slate-900">{skill.lastUpdatedAt}</span>
                    </div>
                  )}
                </div>

                {/* Update notes inside card */}
                {skill.hasUpdate && (
                  <div className="bg-slate-50 rounded-lg p-3 mb-5 border border-slate-200">
                    <div className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider mb-2">What's new in {skill.latestVersion}:</div>
                    <ul className="text-xs text-slate-500 space-y-1.5">
                      {skill.changelog[0].changes.slice(0, 3).map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#8B5CF6] mt-0.5">•</span> <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <hr className="border-slate-100 mb-5" />

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleDownload(skill.skillId, skill.hasUpdate ? skill.latestVersion : skill.version)}
                    disabled={downloading === skill.skillId}
                    className={`w-full py-2.5 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition-all ${skill.hasUpdate || isSelected
                        ? 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED]'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                  >
                    {downloading === skill.skillId ? (
                      <span className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${skill.hasUpdate || isSelected ? 'border-white' : 'border-slate-500'}`} />
                    ) : (
                      <Download size={16} />
                    )}
                    {downloading === skill.skillId
                      ? 'Downloading...'
                      : skill.hasUpdate ? `Download ${skill.latestVersion}` : 'Download SKILL.md'}
                  </button>

                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {skill.hasUpdate ? (
                      <button
                        onClick={() => setChangelogSkill(skill)}
                        className="bg-transparent text-slate-500 hover:text-slate-900 text-xs font-semibold py-2 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 border border-transparent hover:border-slate-200"
                      >
                        <List size={14} /> Full changelog
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setDrawerSkill(skill);
                          setDrawerTab('README');
                        }}
                        className="bg-transparent text-slate-500 hover:text-slate-900 text-xs font-semibold py-2 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 border border-transparent hover:border-slate-200"
                      >
                        <BookOpen size={14} /> View README
                      </button>
                    )}
                    <a
                      href={skill.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-transparent text-slate-500 hover:text-slate-900 text-xs font-semibold py-2 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 border border-transparent hover:border-slate-200"
                    >
                      <Github size={14} /> Example
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Get More Skills Strip */}
        {user?.plan !== 'full-arsenal' && (
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 border-l-4 border-l-[#8B5CF6] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-1"><span className="text-2xl">🛍️</span> Want more skills?</div>
              <p className="text-slate-500 text-sm">
                You have {skills.length} skills. Add more from the catalog or upgrade to Full Arsenal to get everything.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link to="/skills" className="bg-white border border-slate-300 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">
                Browse Skills
              </Link>
              <Link to="/bundles" className="bg-[#8B5CF6] text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-[#7C3AED] transition-colors">
                Upgrade to Full Arsenal
              </Link>
            </div>
          </div>
        )}

      </main>

      {/* Skill Detail Drawer */}
      {drawerSkill && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setDrawerSkill(null)}
          />
          <div className="relative w-full md:w-[480px] bg-white border-l border-slate-200 shadow-2xl h-full flex flex-col transform transition-transform duration-300 translate-x-0">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-slate-900 font-bold text-xl flex items-center gap-2">
                <span className="text-2xl">{drawerSkill.icon}</span> {drawerSkill.name}
              </h2>
              <button onClick={() => setDrawerSkill(null)} className="text-slate-400 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-2">
              {(['SKILL.md', 'README', 'Changelog'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setDrawerTab(tab)}
                  className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${drawerTab === tab
                      ? 'border-[#8B5CF6] text-[#8B5CF6]'
                      : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              {drawerTab === 'Changelog' ? (
                <div className="space-y-6">
                  {drawerSkill.changelog.map((entry, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-slate-200">
                      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300" />
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-slate-900 font-bold text-lg font-mono">{entry.version}</span>
                        <span className="text-slate-500 text-sm">{entry.date}</span>
                        {entry.isLatest && <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">Latest</span>}
                      </div>
                      <ul className="space-y-2 mt-3">
                        {entry.changes.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="text-slate-400 mt-0.5">•</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="prose max-w-none">
                  <ReactMarkdown>
                    {drawerTab === 'SKILL.md' ? drawerSkill.skillContent : drawerSkill.readmeContent}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="p-5 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => handleDownload(drawerSkill.skillId, drawerSkill.latestVersion)}
                disabled={downloading === drawerSkill.skillId}
                className="w-full bg-[#8B5CF6] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#7C3AED] transition-colors"
              >
                {downloading === drawerSkill.skillId ? (
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Download size={18} />
                )}
                {downloading === drawerSkill.skillId ? 'Downloading...' : `Download ${drawerTab === 'SKILL.md' ? 'SKILL.md' : 'Latest Version'}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Changelog Modal */}
      {changelogSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setChangelogSkill(null)} />
          <div className="relative bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[80vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
              <h2 className="text-slate-900 font-bold text-lg">{changelogSkill.name} — Changelog</h2>
              <button onClick={() => setChangelogSkill(null)} className="text-slate-400 hover:text-slate-900">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {changelogSkill.changelog.map((entry, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-slate-900 font-bold text-lg font-mono">{entry.version}</span>
                    <span className="text-slate-500 text-sm">— {entry.date}</span>
                    {entry.isLatest && <span className="bg-[#8B5CF6]/10 text-[#8B5CF6] text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">Latest</span>}
                  </div>
                  <ul className="space-y-2">
                    {entry.changes.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-[#8B5CF6] mt-0.5">•</span> <span className="text-slate-600">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
              <button
                onClick={() => handleDownload(changelogSkill.skillId, changelogSkill.latestVersion)}
                disabled={downloading === changelogSkill.skillId}
                className="w-full bg-[#8B5CF6] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#7C3AED] transition-colors"
              >
                {downloading === changelogSkill.skillId ? (
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Download size={18} />
                )}
                {downloading === changelogSkill.skillId ? 'Downloading...' : `Download Latest (${changelogSkill.latestVersion})`}
              </button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
