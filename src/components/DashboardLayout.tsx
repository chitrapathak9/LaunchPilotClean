import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoIcon } from '../App';
import {
  Home, Wrench, FolderOpen, BarChart3, Settings, CreditCard,
  HelpCircle, LogOut, Bell, ChevronDown, User,
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';

export const MOCK_STATS_LAYOUT = { updatesWaiting: 1 };

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/* ── Sidebar ── */
const NAV_MAIN = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Wrench, label: 'My Skills', path: '/dashboard/skills' },
  { icon: FolderOpen, label: 'My Projects', path: '/dashboard/projects' },
  { icon: BarChart3, label: 'Activity', path: '/dashboard/activity' },
];
const NAV_ACCOUNT = [
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  { icon: CreditCard, label: 'Billing', path: '/dashboard/billing' },
  { icon: HelpCircle, label: 'Support', path: '/dashboard/support' },
];

function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { user, logout } = useAuth();

  return (
    <aside className="hidden md:flex fixed top-0 left-0 bottom-0 w-[240px] bg-white border-r border-[#E2E8F0] flex-col z-40">
      {/* Logo */}
      <div className="px-5 h-16 flex items-center gap-2.5 border-b border-[#E2E8F0]">
        <Link to="/" className="flex items-center gap-2.5">
          <LogoIcon className="w-7 h-7" />
          <span className="text-[#0F172A] font-bold text-[15px]">Launch<span className="text-[#8B5CF6]">Pilot</span></span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest px-3 mb-2">Main</div>
        {NAV_MAIN.map(n => (
          <Link
            key={n.path} to={n.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-all ${isActive(n.path)
              ? 'bg-[#8B5CF6]/[0.08] text-[#8B5CF6] border-l-[3px] border-[#8B5CF6] -ml-px'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
              }`}
          >
            <n.icon size={18} /> {n.label}
          </Link>
        ))}

        <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest px-3 mt-6 mb-2">Account</div>
        {NAV_ACCOUNT.map(n => (
          <Link
            key={n.path} to={n.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-all ${isActive(n.path)
              ? 'bg-[#8B5CF6]/[0.08] text-[#8B5CF6] border-l-[3px] border-[#8B5CF6] -ml-px'
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
              }`}
          >
            <n.icon size={18} /> {n.label}
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0]">
          <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center font-bold text-[#8B5CF6]">
            {user?.name.charAt(0) || 'U'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-[#0F172A] truncate">{user?.name || 'User'}</p>
            <p className="text-[10px] font-semibold text-[#8B5CF6] uppercase tracking-wider">{user?.plan || 'Free'}</p>
          </div>
          <button onClick={logout} className="text-[#64748B] hover:text-[#EF4444] transition-colors" title="Log out">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ── Mobile Bottom Tab Bar ── */
function BottomTabBar() {
  const location = useLocation();
  const tabs = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Wrench, label: 'Skills', path: '/dashboard/skills' },
    { icon: FolderOpen, label: 'Proj.', path: '/dashboard/projects' },
    { icon: Settings, label: 'Sett.', path: '/dashboard/settings' },
    { icon: User, label: 'Acct.', path: '/dashboard/billing' },
  ];
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[#E2E8F0] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 flex pb-safe">
      {tabs.map(t => {
        const active = location.pathname === t.path;
        return (
          <Link key={t.path} to={t.path} className="flex-1 flex flex-col items-center gap-1 py-2.5">
            <t.icon size={20} className={active ? 'text-[#8B5CF6]' : 'text-[#94A3B8]'} />
            <span className={`text-[10px] font-semibold ${active ? 'text-[#8B5CF6]' : 'text-[#64748B]'}`}>{t.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

/* ── Top Bar ── */
function TopBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  
  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
      <div className="text-[#0F172A] text-lg font-semibold">
        {getGreeting()}, {user?.name} <span className="inline-block ml-1">👋</span>
      </div>
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] transition-all">
          <Bell size={16} />
          {MOCK_STATS_LAYOUT.updatesWaiting > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] rounded-full text-[9px] font-bold text-white flex items-center justify-center shadow-md">
              {MOCK_STATS_LAYOUT.updatesWaiting}
            </span>
          )}
        </button>
        {/* Avatar dropdown */}
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-[#F8FAFC] transition-all">
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-[#0F172A] leading-tight">{user?.name || 'User'}</p>
              <p className="text-[10px] font-semibold text-[#8B5CF6] uppercase tracking-wider">{user?.plan || 'Free'}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center font-bold text-[#8B5CF6]">
              {user?.name.charAt(0) || 'U'}
            </div>
            <ChevronDown size={14} className="text-[#94A3B8]" />
          </button>
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 top-12 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-xl py-2 z-50">
                {[
                  { label: 'Profile', path: '/dashboard/settings' },
                  { label: 'Settings', path: '/dashboard/settings' },
                  { label: 'Billing', path: '/dashboard/billing' },
                ].map(item => (
                  <Link key={item.label} to={item.path} onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-[#64748B] font-medium hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-all">
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-[#E2E8F0] my-1" />
                <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm text-[#EF4444] font-medium hover:bg-[#FEF2F2] transition-all">
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans selection:bg-[#8B5CF6]/20">
      <Sidebar />
      <BottomTabBar />
      <div className="md:ml-[240px] pb-24 md:pb-8 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
