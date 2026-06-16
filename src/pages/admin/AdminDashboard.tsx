import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { supabase } from '../../lib/supabase';
import {
  FileText, MessageSquare, Briefcase, Users, PlusCircle,
  TrendingUp, AlertCircle, Clock, Eye
} from 'lucide-react';
import { format } from 'date-fns';
import type { Contact } from '../../types/database';

interface Stats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalContacts: number;
  newContacts: number;
  totalCaseStudies: number;
  publishedCaseStudies: number;
  totalUsers: number;
}

function StatCard({ icon: Icon, label, value, sub, color, href }: {
  icon: React.ElementType; label: string; value: number | string; sub?: string;
  color: string; href?: string;
}) {
  const card = (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow ${href ? 'cursor-pointer' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
        {href && <TrendingUp size={14} className="text-slate-300" />}
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm font-semibold text-slate-500">{label}</div>
      {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
    </div>
  );
  return href ? <Link to={href}>{card}</Link> : card;
}

function RecentContactRow({ contact }: { contact: Contact }) {
  return (
    <Link to={`/admin/contacts/${contact.id}`} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors group">
      <div className="w-9 h-9 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center font-bold text-[#8B5CF6] text-xs shrink-0">
        {contact.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">{contact.name}</p>
        <p className="text-xs text-slate-400 truncate">{contact.topic}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          contact.status === 'new' ? 'bg-red-100 text-red-600' :
          contact.status === 'read' ? 'bg-amber-100 text-amber-600' :
          'bg-green-100 text-green-600'
        }`}>
          {contact.status}
        </span>
        <span className="text-xs text-slate-400 hidden sm:block">
          {format(new Date(contact.created_at), 'MMM d')}
        </span>
        <Eye size={14} className="text-slate-300 group-hover:text-[#8B5CF6] transition-colors" />
      </div>
    </Link>
  );
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalBlogs: 0, publishedBlogs: 0, draftBlogs: 0,
    totalContacts: 0, newContacts: 0,
    totalCaseStudies: 0, publishedCaseStudies: 0,
    totalUsers: 0,
  });
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [blogsRes, contactsRes, csRes, usersRes, recentRes] = await Promise.all([
          supabase.from('blogs').select('status'),
          supabase.from('contacts').select('status'),
          supabase.from('case_studies').select('status'),
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(5),
        ]);

        const blogs = blogsRes.data ?? [];
        const contacts = contactsRes.data ?? [];
        const cs = csRes.data ?? [];

        setStats({
          totalBlogs: blogs.length,
          publishedBlogs: blogs.filter(b => b.status === 'published').length,
          draftBlogs: blogs.filter(b => b.status === 'draft').length,
          totalContacts: contacts.length,
          newContacts: contacts.filter(c => c.status === 'new').length,
          totalCaseStudies: cs.length,
          publishedCaseStudies: cs.filter(c => c.status === 'published').length,
          totalUsers: usersRes.count ?? 0,
        });

        setRecentContacts((recentRes.data ?? []) as Contact[]);
      } catch (e) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <AdminLayout title="Dashboard" breadcrumbs={[{ label: 'Dashboard' }]}>
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 h-36 animate-pulse">
              <div className="w-10 h-10 bg-slate-100 rounded-xl mb-4" />
              <div className="w-16 h-8 bg-slate-100 rounded mb-2" />
              <div className="w-24 h-4 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={FileText} label="Total Blogs" value={stats.totalBlogs} sub={`${stats.publishedBlogs} published · ${stats.draftBlogs} drafts`} color="bg-blue-50 text-blue-600" href="/admin/blogs" />
          <StatCard icon={MessageSquare} label="Contacts" value={stats.totalContacts} sub={`${stats.newContacts} unread`} color="bg-red-50 text-red-500" href="/admin/contacts" />
          <StatCard icon={Briefcase} label="Case Studies" value={stats.totalCaseStudies} sub={`${stats.publishedCaseStudies} published`} color="bg-purple-50 text-purple-600" href="/admin/case-studies" />
          <StatCard icon={Users} label="Users" value={stats.totalUsers} color="bg-emerald-50 text-emerald-600" href="/admin/users" />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Contacts */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare size={16} className="text-[#8B5CF6]" /> Recent Contacts
              {stats.newContacts > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{stats.newContacts}</span>
              )}
            </h2>
            <Link to="/admin/contacts" className="text-xs font-semibold text-[#8B5CF6] hover:underline">View all</Link>
          </div>
          <div className="p-2">
            {recentContacts.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">No contacts yet</div>
            ) : (
              recentContacts.map(c => <RecentContactRow key={c.id} contact={c} />)
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="space-y-2.5">
              <Link to="/admin/blogs/new" className="flex items-center gap-3 w-full bg-[#8B5CF6] text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-[#7C3AED] transition-colors shadow-sm shadow-[#8B5CF6]/20">
                <PlusCircle size={16} /> New Blog Post
              </Link>
              <Link to="/admin/case-studies/new" className="flex items-center gap-3 w-full bg-slate-800 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-slate-900 transition-colors">
                <PlusCircle size={16} /> New Case Study
              </Link>
              <Link to="/admin/contacts" className="flex items-center gap-3 w-full bg-slate-50 text-slate-700 border border-slate-200 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors">
                <Clock size={16} /> Review Contacts
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] rounded-2xl p-6 text-white">
            <h3 className="font-bold mb-1">📊 Performance</h3>
            <p className="text-sm text-purple-200 mb-4">Check your published content is performing well.</p>
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5">
              View site <TrendingUp size={12} />
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
