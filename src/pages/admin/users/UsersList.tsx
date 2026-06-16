import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../AdminLayout';
import { supabase } from '../../../lib/supabase';
import type { Profile } from '../../../types/database';
import {
  Search, Shield, ShieldOff, UserX, UserCheck, ChevronLeft, ChevronRight,
  Loader2, AlertCircle, Mail, Calendar
} from 'lucide-react';
import { format } from 'date-fns';

const PAGE_SIZE = 20;

export function UsersList() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [page, setPage] = useState(0);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (roleFilter !== 'all') query = query.eq('role', roleFilter);
      if (search) query = query.ilike('full_name', `%${search}%`);

      const { data, count, error: err } = await query;
      if (err) throw err;
      setProfiles(data ?? []);
      setTotal(count ?? 0);
    } catch (e) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [page, roleFilter, search]);

  const toggleRole = async (user: Profile) => {
    setActionLoading(user.id);
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', user.id);
    if (!error) {
      setProfiles(prev => prev.map(p => p.id === user.id ? { ...p, role: newRole } : p));
    }
    setActionLoading(null);
  };

  const toggleActive = async (user: Profile) => {
    setActionLoading(user.id + '-active');
    const { error } = await supabase.from('profiles').update({ is_active: !user.is_active }).eq('id', user.id);
    if (!error) {
      setProfiles(prev => prev.map(p => p.id === user.id ? { ...p, is_active: !p.is_active } : p));
    }
    setActionLoading(null);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <AdminLayout
      title="Users"
      breadcrumbs={[{ label: 'Users' }]}
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 bg-white"
          />
        </div>
        <select
          value={roleFilter}
          onChange={e => { setRoleFilter(e.target.value as any); setPage(0); }}
          className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#8B5CF6] text-slate-700 font-medium"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admins</option>
          <option value="user">Users</option>
        </select>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-700">{total} users total</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="text-[#8B5CF6] animate-spin" size={24} />
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-6 py-3">User</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Role</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Plan</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Joined</th>
                  <th className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {profiles.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} className="w-9 h-9 rounded-full object-cover border border-slate-200" alt="" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center font-bold text-[#8B5CF6] text-xs shrink-0">
                            {user.full_name.charAt(0).toUpperCase() || 'U'}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{user.full_name || '—'}</p>
                          <p className="text-xs text-slate-400 font-mono">{user.id.substring(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                        user.role === 'admin' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Shield size={11} /> {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full capitalize">
                        {user.plan.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                      }`}>
                        {user.is_active ? 'Active' : 'Deactivated'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar size={12} />
                        {format(new Date(user.created_at), 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleRole(user)}
                          disabled={actionLoading === user.id}
                          title={user.role === 'admin' ? 'Remove admin' : 'Make admin'}
                          className={`p-1.5 rounded-lg transition-colors text-sm ${
                            user.role === 'admin'
                              ? 'text-[#8B5CF6] hover:bg-[#8B5CF6]/10'
                              : 'text-slate-400 hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10'
                          } disabled:opacity-40`}
                        >
                          {actionLoading === user.id ? <Loader2 size={14} className="animate-spin" /> : user.role === 'admin' ? <ShieldOff size={14} /> : <Shield size={14} />}
                        </button>
                        <button
                          onClick={() => toggleActive(user)}
                          disabled={actionLoading === user.id + '-active'}
                          title={user.is_active ? 'Deactivate' : 'Activate'}
                          className={`p-1.5 rounded-lg transition-colors ${
                            user.is_active
                              ? 'text-slate-400 hover:text-red-500 hover:bg-red-50'
                              : 'text-slate-400 hover:text-green-600 hover:bg-green-50'
                          } disabled:opacity-40`}
                        >
                          {actionLoading === user.id + '-active' ? <Loader2 size={14} className="animate-spin" /> : user.is_active ? <UserX size={14} /> : <UserCheck size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => p - 1)}
                disabled={page === 0}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-sm font-semibold text-slate-700">{page + 1} / {totalPages}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page >= totalPages - 1}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
