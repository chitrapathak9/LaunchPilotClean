import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, X, Download, Plus, BookOpen, Zap, Wrench
} from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

/* ── Mock Data ── */
const MOCK_STATS = { skillsOwned: 3, projectsActive: 2, updatesWaiting: 1, totalSpent: 29 };

const MOCK_SKILLS = [
  { skillId: 'saas-builder', name: 'SaaS Builder', icon: '🏗️', version: '1.2', latestVersion: '1.2', hasUpdate: false, downloadUrl: '#', purchasedAt: '2025-01-15' },
  { skillId: 'seo-optimizer', name: 'SEO Optimizer', icon: '🔍', version: '1.0', latestVersion: '1.1', hasUpdate: true, downloadUrl: '#', purchasedAt: '2025-01-16' },
  { skillId: 'landing-page', name: 'Landing Page Builder', icon: '🛬', version: '1.1', latestVersion: '1.1', hasUpdate: false, downloadUrl: '#', purchasedAt: '2025-01-17' },
];

const MOCK_PROJECTS = [
  { id: 'p1', name: 'My SaaS App', skillsUsed: ['SaaS Builder', 'SEO'], progress: 80, lastUpdatedAt: '2025-01-18T14:00:00Z', status: 'active' as const },
  { id: 'p2', name: 'Portfolio Site', skillsUsed: ['Landing Page Builder'], progress: 45, lastUpdatedAt: '2025-01-17T09:30:00Z', status: 'active' as const },
];

const MOCK_ACTIVITY = [
  { id: 'a1', type: 'skill_updated' as const, description: 'SaaS Builder Skill updated to v1.2', timestamp: '2025-01-20T09:41:00Z' },
  { id: 'a2', type: 'skill_downloaded' as const, description: 'Landing Page Builder Skill downloaded', timestamp: '2025-01-19T15:12:00Z' },
  { id: 'a3', type: 'purchase' as const, description: 'Builder Bundle purchased — $29', timestamp: '2025-01-15T11:04:00Z' },
  { id: 'a4', type: 'signup' as const, description: 'Account created', timestamp: '2025-01-15T10:58:00Z' },
];

/* ── Helpers ── */
function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const ACTIVITY_ICONS: Record<string, { emoji: string; color: string }> = {
  skill_updated: { emoji: '🔄', color: '#8B5CF6' },
  skill_downloaded: { emoji: '✅', color: '#10B981' },
  purchase: { emoji: '💳', color: '#3b82f6' },
  signup: { emoji: '🎉', color: '#a855f7' },
  project_created: { emoji: '📁', color: '#8B5CF6' },
};

/* ── Section: Welcome Banner ── */
function WelcomeBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed || MOCK_STATS.skillsOwned > 0) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 relative border-t-4 border-t-[#8B5CF6] shadow-sm">
      <button onClick={() => setDismissed(true)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={16} /></button>
      <div className="text-lg font-bold text-slate-900 mb-2">🚀 Welcome! Let's get you set up.</div>
      <p className="text-slate-500 text-sm mb-5">You don't have any skills yet. Browse the catalog and pick your first skill to get started.</p>
      <div className="flex gap-3 flex-wrap">
        <Link to="/skills" className="bg-[#8B5CF6] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[#7C3AED] transition-all inline-flex items-center gap-2">Browse Skills <ArrowRight size={14} /></Link>
        <Link to="/skill-finder" className="border border-slate-300 text-slate-700 font-medium px-5 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-all inline-flex items-center gap-2">Take the Quiz <ArrowRight size={14} /></Link>
      </div>
    </div>
  );
}

/* ── Section: Stats Strip ── */
function StatStrip() {
  const stats = [
    { value: MOCK_STATS.skillsOwned, label: 'Skills owned', accent: false },
    { value: MOCK_STATS.projectsActive, label: 'Projects active', accent: false },
    { value: MOCK_STATS.updatesWaiting, label: 'Update waiting', accent: MOCK_STATS.updatesWaiting > 0 },
    { value: `$${MOCK_STATS.totalSpent}`, label: 'Spent total', accent: false },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className={`bg-white border shadow-sm rounded-xl p-5 ${s.accent ? 'border-[#8B5CF6]/50 shadow-[#8B5CF6]/10' : 'border-slate-200'}`}>
          <div className={`text-3xl font-bold mb-1 ${s.accent ? 'text-[#8B5CF6]' : 'text-slate-900'}`}>{s.value}</div>
          <div className="text-slate-500 text-sm">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Section Header ── */
function SectionHeader({ title, count, viewAllPath }: { title: string; count?: number; viewAllPath: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-slate-900 font-bold text-lg">
        {title} {count !== undefined && <span className="text-slate-400 font-normal">({count})</span>}
      </h2>
      <Link to={viewAllPath} className="text-[#8B5CF6] text-sm font-semibold hover:underline flex items-center gap-1">View all <ArrowRight size={14} /></Link>
    </div>
  );
}

/* ── Section: My Skills Preview ── */
function SkillsPreview() {
  return (
    <div>
      <SectionHeader title="My Skills" count={MOCK_SKILLS.length} viewAllPath="/dashboard/skills" />
      <div className="flex gap-4 overflow-x-auto pb-2">
        {MOCK_SKILLS.map(s => (
          <div key={s.skillId} className="min-w-[220px] bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:border-[#8B5CF6]/50 transition-all flex-shrink-0">
            <div className="text-2xl mb-3">{s.icon}</div>
            <h3 className="text-slate-900 font-bold text-sm mb-2">{s.name}</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-slate-500 text-xs">v{s.version}</span>
              {s.hasUpdate ? (
                <span className="bg-[#8B5CF6]/15 text-[#8B5CF6] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#8B5CF6]/20">🔄 Update</span>
              ) : (
                <span className="bg-[#10B981]/15 text-[#10B981] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#10B981]/20">✅ Latest</span>
              )}
            </div>
            <a href={s.downloadUrl} className="flex items-center justify-center gap-2 w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold py-2 rounded-lg hover:bg-slate-100 transition-all">
              <Download size={12} /> Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section: Projects Preview ── */
function ProjectsPreview() {
  return (
    <div>
      <SectionHeader title="My Projects" count={MOCK_PROJECTS.length} viewAllPath="/dashboard/projects" />
      <div className="grid md:grid-cols-2 gap-4">
        {MOCK_PROJECTS.map(p => (
          <div key={p.id} className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:border-[#8B5CF6]/50 transition-all">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-slate-900 font-bold">📁 {p.name}</h3>
              <span className="bg-[#10B981]/15 text-[#10B981] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#10B981]/20 capitalize">{p.status}</span>
            </div>
            <p className="text-slate-500 text-xs mb-1">Skills used: {p.skillsUsed.join(', ')}</p>
            <p className="text-slate-400 text-xs mb-4">Last updated: {relativeTime(p.lastUpdatedAt)}</p>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-slate-500 text-xs">Progress</span>
                <span className="text-slate-900 text-xs font-bold">{p.progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#8B5CF6] rounded-full transition-all" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
            <Link to={`/dashboard/projects/${p.id}`} className="text-[#8B5CF6] text-xs font-semibold flex items-center gap-1 hover:underline">
              Open Project <ArrowRight size={12} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section: Quick Actions ── */
function QuickActions() {
  const actions = [
    { icon: Plus, title: 'New Project', desc: 'Start tracking a new build', path: '/dashboard/projects' },
    { icon: Wrench, title: 'Browse Skills', desc: 'Add a new skill to your library', path: '/skills' },
    { icon: BookOpen, title: 'Read Docs', desc: 'How to use your skills', path: '#' },
  ];
  return (
    <div>
      <h2 className="text-slate-900 font-bold text-lg mb-4">Quick Actions</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {actions.map(a => (
          <Link key={a.title} to={a.path}
            className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:border-[#8B5CF6]/50 hover:-translate-y-0.5 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mb-3 group-hover:bg-[#8B5CF6]/15 transition-all">
              {/* @ts-expect-error type discrepancy */}
              <a.icon size={18} className="text-[#8B5CF6]" />
            </div>
            <h3 className="text-slate-900 font-bold text-sm mb-1">{a.title}</h3>
            <p className="text-slate-500 text-xs">{a.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Section: Activity Feed ── */
function ActivityFeed() {
  return (
    <div>
      <h2 className="text-slate-900 font-bold text-lg mb-4">Recent Activity</h2>
      <div className="bg-white border border-slate-200 shadow-sm rounded-xl divide-y divide-slate-100">
        {MOCK_ACTIVITY.map(a => {
          const meta = ACTIVITY_ICONS[a.type] || { emoji: '📌', color: '#64748B' };
          return (
            <div key={a.id} className="flex items-start gap-3 px-5 py-4 hover:bg-slate-50 transition-all">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5"
                style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}30` }}>
                {meta.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-900 text-sm font-medium">{a.description}</p>
                <p className="text-slate-500 text-xs mt-0.5">{relativeTime(a.timestamp)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Link to="/dashboard/activity" className="text-[#8B5CF6] text-sm font-semibold flex items-center gap-1 mt-3 hover:underline">
        View all activity <ArrowRight size={14} />
      </Link>
    </div>
  );
}

/* ── Section: Upgrade CTA ── */
function UpgradeCTA() {
  const [dismissed, setDismissed] = useState(() => {
    const ts = localStorage.getItem('upgrade-cta-dismissed');
    if (!ts) return false;
    return Date.now() - Number(ts) < 7 * 24 * 60 * 60 * 1000;
  });
  const { user } = useAuth();

  if (dismissed || user?.plan === 'full-arsenal') return null;

  const handleDismiss = () => {
    localStorage.setItem('upgrade-cta-dismissed', String(Date.now()));
    setDismissed(true);
  };

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 relative border-l-4 border-l-[#8B5CF6]">
      <button onClick={handleDismiss} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={16} /></button>
      <div className="flex items-center gap-2 text-slate-900 font-bold mb-2"><Zap size={16} className="text-[#8B5CF6]" /> Unlock all 9+ skills</div>
      <p className="text-slate-600 text-sm mb-4">
        You're on the <span className="text-slate-900 font-bold capitalize">{user?.plan || 'free'}</span> plan. Upgrade to Full Arsenal and get every skill — including future drops — for just $59.
      </p>
      <Link to="/bundles" className="bg-[#8B5CF6] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[#7C3AED] transition-all inline-flex items-center gap-2">
        Upgrade to Full Arsenal <ArrowRight size={14} />
      </Link>
    </div>
  );
}

/* ── Dashboard Page ── */
export function Dashboard() {
  const { user } = useAuth();
  
  return (
    <DashboardLayout>
      <main className="flex-1 p-6 space-y-8 max-w-[1100px] w-full mx-auto bg-[#FAF9F6] min-h-screen">
        <WelcomeBanner />
        <StatStrip />
        <SkillsPreview />
        <ProjectsPreview />
        <QuickActions />
        <ActivityFeed />
        <UpgradeCTA />
      </main>
    </DashboardLayout>
  );
}
