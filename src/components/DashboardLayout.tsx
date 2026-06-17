import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { LogoIcon } from '../App';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  TrendingUp,
  CreditCard,
  Calendar,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  User,
  Menu,
  X,
  BookOpen,
  FolderClosed,
  Heart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [searchParams] = useSearchParams();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = searchParams.get('tab') || 'dashboard';

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard?tab=dashboard', 
      active: location.pathname === '/dashboard' && activeTab === 'dashboard' 
    },
    { 
      icon: FileText, 
      label: 'My Reports', 
      path: '/dashboard?tab=reports', 
      active: location.pathname === '/dashboard' && activeTab === 'reports' 
    },
    { 
      icon: Sparkles, 
      label: 'New Validation', 
      path: '/dashboard?tab=new-validation', 
      active: location.pathname === '/dashboard' && activeTab === 'new-validation' 
    },
    { 
      icon: BookOpen, 
      label: 'My Skills', 
      path: '/dashboard/skills', 
      active: location.pathname === '/dashboard/skills' 
    },
    { 
      icon: FolderClosed, 
      label: 'My Projects', 
      path: '/dashboard/projects', 
      active: location.pathname === '/dashboard/projects' 
    },
    { 
      icon: Heart, 
      label: 'My Wishlist', 
      path: '/dashboard?tab=wishlist', 
      active: location.pathname === '/dashboard' && activeTab === 'wishlist' 
    },
    { 
      icon: TrendingUp, 
      label: 'Usage & Credits', 
      path: '/dashboard?tab=usage', 
      active: location.pathname === '/dashboard' && activeTab === 'usage' 
    },
    { 
      icon: CreditCard, 
      label: 'Billing', 
      path: '/dashboard?tab=billing', 
      active: location.pathname === '/dashboard' && activeTab === 'billing' 
    },
    { 
      icon: Calendar, 
      label: 'Book Strategy Call', 
      path: '/dashboard?tab=strategy-call', 
      active: location.pathname === '/dashboard' && activeTab === 'strategy-call' 
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/dashboard?tab=settings', 
      active: location.pathname === '/dashboard' && activeTab === 'settings' 
    },
  ];

  if (user?.email === 'launchpilotai41@gmail.com') {
    menuItems.push({ 
      icon: FileText, 
      label: 'Admin Leads', 
      path: '/dashboard?tab=leads', 
      active: location.pathname === '/dashboard' && activeTab === 'leads' 
    });
  }


  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-600 font-sans selection:bg-[#8B5CF6]/20 antialiased flex flex-col md:flex-row">
      
      {/* SIDEBAR NAVIGATION (Desktop - Creamy White Theme) */}
      <aside className="hidden md:flex flex-col w-[260px] bg-white border-r border-slate-200/60 shrink-0 sticky top-0 h-screen z-40 shadow-sm">
        
        {/* Header Logo */}
        <div className="h-16 px-6 flex items-center border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2.5">
            <LogoIcon className="w-6 h-6 text-[#8B5CF6]" />
            <span className="text-slate-900 font-bold text-sm tracking-tight">Launch<span className="text-[#8B5CF6]">Pilot</span></span>
          </Link>
        </div>

        {/* Navigation Menus */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 text-left">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3 select-none">
            Founder AI Workspace
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = item.active;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                  active
                    ? 'bg-[#8B5CF6]/5 text-[#8B5CF6] border border-[#8B5CF6]/15 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <Icon size={16} className={active ? 'text-[#8B5CF6]' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User profile footer */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3 border border-slate-200/50">
            <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center font-bold text-[#8B5CF6] border border-[#8B5CF6]/20 text-xs shrink-0 select-none">
              {user?.name.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-bold text-slate-800 truncate leading-tight">{user?.name || 'User'}</p>
              <p className="text-[9px] font-bold text-[#8B5CF6] uppercase tracking-wider mt-0.5">{user?.plan === 'full-arsenal' ? 'Full Pro' : 'Builder Bundle'}</p>
            </div>
            <button 
              onClick={logout} 
              className="text-slate-400 hover:text-red-500 transition-colors shrink-0 p-1 rounded hover:bg-slate-100 border border-transparent hover:border-slate-200"
              title="Log out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>

      </aside>

      {/* MOBILE HEADER BAR */}
      <header className="md:hidden h-16 bg-white border-b border-slate-200/60 flex items-center justify-between px-6 shrink-0 sticky top-0 z-30 select-none shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileDrawerOpen(true)}
            className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
            aria-label="Open navigation drawer"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <LogoIcon className="w-5 h-5 text-[#8B5CF6]" />
            <span className="text-slate-900 font-bold text-xs tracking-tight">Launch<span className="text-[#8B5CF6]">Pilot</span></span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <button className="relative w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/50 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-200 transition-all">
            <Bell size={13} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-ping" />
          </button>
          
          <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center font-bold text-[#8B5CF6] border border-[#8B5CF6]/20 text-xs">
            {user?.name.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE-OUT DRAWER */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileDrawerOpen(false)}
          />
          
          {/* Drawer content body */}
          <div className="relative flex flex-col w-72 max-w-[80vw] h-full bg-white border-r border-slate-200 p-6 z-10 animate-in slide-in-from-left duration-300">
            {/* Close trigger button */}
            <button 
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute top-4 right-4 p-2 bg-slate-50 border border-slate-250 rounded-xl text-slate-400 hover:text-slate-800 transition-all"
            >
              <X size={15} />
            </button>

            {/* Logo */}
            <div className="mb-8 pt-2 text-left">
              <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileDrawerOpen(false)}>
                <LogoIcon className="w-6 h-6 text-[#8B5CF6]" />
                <span className="text-slate-900 font-bold text-sm tracking-tight">Launch<span className="text-[#8B5CF6]">Pilot</span></span>
              </Link>
            </div>

            {/* Navigation options list */}
            <nav className="flex-1 space-y-1.5 overflow-y-auto">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3 select-none text-left">
                Founder AI Workspace
              </div>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = item.active;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileDrawerOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 text-left ${
                      active
                        ? 'bg-[#8B5CF6]/5 text-[#8B5CF6] border border-[#8B5CF6]/15 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <Icon size={16} className={active ? 'text-[#8B5CF6]' : 'text-slate-400'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Profile drawer footer */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3 border border-slate-200/50">
                <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center font-bold text-[#8B5CF6] border border-[#8B5CF6]/20 text-xs shrink-0 select-none">
                  {user?.name.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-bold text-slate-800 truncate leading-tight">{user?.name || 'User'}</p>
                  <p className="text-[9px] font-bold text-[#8B5CF6] uppercase tracking-wider mt-0.5">{user?.plan === 'full-arsenal' ? 'Full Pro' : 'Builder Bundle'}</p>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setMobileDrawerOpen(false);
                  }} 
                  className="text-slate-400 hover:text-red-500 transition-colors shrink-0 p-1 rounded hover:bg-slate-100 border border-transparent hover:border-slate-200"
                  title="Log out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200/80 z-50 flex pb-safe select-none shadow-sm">
        {[
          { icon: LayoutDashboard, label: 'Home', path: '/dashboard?tab=dashboard', active: location.pathname === '/dashboard' && activeTab === 'dashboard' },
          { icon: FileText, label: 'Reports', path: '/dashboard?tab=reports', active: location.pathname === '/dashboard' && activeTab === 'reports' },
          { icon: Sparkles, label: 'New', path: '/dashboard?tab=new-validation', active: location.pathname === '/dashboard' && activeTab === 'new-validation' },
          { icon: TrendingUp, label: 'Usage', path: '/dashboard?tab=usage', active: location.pathname === '/dashboard' && activeTab === 'usage' },
          { icon: Settings, label: 'Settings', path: '/dashboard?tab=settings', active: location.pathname === '/dashboard' && activeTab === 'settings' },
        ].map(t => {
          const active = t.active;
          return (
            <button 
              key={t.path} 
              onClick={() => navigate(t.path)} 
              className="flex-1 flex flex-col items-center gap-1 py-2"
            >
              <t.icon size={18} className={active ? 'text-[#8B5CF6]' : 'text-slate-400'} />
              <span className={`text-[9px] font-bold tracking-wide uppercase ${active ? 'text-slate-900' : 'text-slate-400'}`}>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN SCREEN CANVAS */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-20 md:pb-0 bg-[#FAF9F6]">
        
        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex h-16 border-b border-slate-200/60 items-center justify-between px-8 bg-white sticky top-0 z-30 select-none shadow-sm">
          <div className="text-slate-800 text-xs font-bold uppercase tracking-wider">
            Workspace Command Center
          </div>
          <div className="flex items-center gap-4">
            
            {/* Upgrade Badge for Non-pro users */}
            {user?.plan !== 'full-arsenal' && (
              <button 
                onClick={() => navigate('/dashboard?tab=billing')}
                className="bg-[#8B5CF6] hover:bg-[#7c4ee4] text-white rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-[#8B5CF6]/10 transition-all border border-[#8B5CF6]/20"
              >
                Upgrade to Pro
              </button>
            )}

            {/* Notification bell */}
            <button className="relative w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/50 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-200 transition-all">
              <Bell size={14} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-ping" />
            </button>
            
            {/* User details */}
            <div className="flex items-center gap-3 border-l border-slate-100 pl-4">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-800 leading-tight">{user?.name || 'User'}</p>
                <p className="text-[9px] font-bold text-[#8B5CF6] uppercase tracking-wider mt-0.5">{user?.plan === 'full-arsenal' ? 'Full Pro' : 'Builder Bundle'}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center font-bold text-[#8B5CF6] border border-[#8B5CF6]/20 text-xs">
                {user?.name.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>

          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 bg-[#FAF9F6] p-6 md:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
