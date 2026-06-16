import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogoIcon } from '../../App';
import {
  LayoutDashboard, FileText, Users, MessageSquare, Briefcase,
  LogOut, ChevronRight, Menu, X, Bell, ExternalLink,
  ChevronDown, Settings
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: FileText, label: 'Blogs', href: '/admin/blogs' },
  { icon: MessageSquare, label: 'Contacts', href: '/admin/contacts' },
  { icon: Briefcase, label: 'Case Studies', href: '/admin/case-studies' },
];

function SidebarLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
        isActive
          ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20'
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={16} className="shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.badge != null && item.badge > 0 && (
        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-red-500 text-white'}`}>
          {item.badge > 99 ? '99+' : item.badge}
        </span>
      )}
    </Link>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
}

export function AdminLayout({ children, title, breadcrumbs, actions }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const Sidebar = () => (
    <aside className="flex flex-col w-64 bg-[#0F0A1E] border-r border-white/10 h-screen sticky top-0">
      {/* Logo */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
        <Link to="/admin" className="flex items-center gap-2.5">
          <LogoIcon className="w-6 h-6 text-[#8B5CF6]" />
          <span className="text-white font-bold text-sm tracking-tight">Launch<span className="text-[#8B5CF6]">Pilot</span></span>
        </Link>
        <span className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-widest bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full">Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 mb-3">Management</p>
        {NAV_ITEMS.map(item => (
          <SidebarLink
            key={item.href}
            item={item}
            isActive={location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href))}
          />
        ))}

        <div className="pt-4 mt-4 border-t border-white/10">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 mb-3">Quick Links</p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ExternalLink size={16} />
            View Live Site
          </a>
        </div>
      </nav>

      {/* User footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-white/10">
          <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/30 flex items-center justify-center font-bold text-[#8B5CF6] text-xs shrink-0">
            {profile?.full_name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{profile?.full_name || 'Admin'}</p>
            <p className="text-[10px] text-slate-500 truncate">{profile?.role === 'admin' ? 'Administrator' : 'Staff'}</p>
          </div>
          <button onClick={handleLogout} title="Sign out" className="text-slate-600 hover:text-red-400 transition-colors p-1 rounded hover:bg-white/5">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 w-64">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-all"
            >
              <X size={16} />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
            >
              <Menu size={18} />
            </button>

            {/* Breadcrumbs */}
            {breadcrumbs && (
              <nav className="flex items-center gap-1.5 text-sm">
                <Link to="/admin" className="text-slate-400 hover:text-slate-700 transition-colors">Admin</Link>
                {breadcrumbs.map((crumb, i) => (
                  <React.Fragment key={i}>
                    <ChevronRight size={12} className="text-slate-300" />
                    {crumb.href ? (
                      <Link to={crumb.href} className="text-slate-400 hover:text-slate-700 transition-colors">{crumb.label}</Link>
                    ) : (
                      <span className="text-slate-800 font-semibold">{crumb.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            {actions}
            {/* Notification */}
            <button className="relative w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all">
              <Bell size={15} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">
          {title && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
