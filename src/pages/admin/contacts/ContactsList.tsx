import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminLayout } from '../AdminLayout';
import { supabase } from '../../../lib/supabase';
import type { Contact } from '../../../types/database';
import {
  Search, Eye, Trash2, ChevronLeft, ChevronRight, Loader2, AlertCircle,
  Mail, Calendar, CheckCheck, MessageSquare, RefreshCw
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

const PAGE_SIZE = 20;

const STATUS_CONFIG = {
  new: { label: 'New', classes: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
  read: { label: 'Read', classes: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  replied: { label: 'Replied', classes: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
};

export function ContactsList() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [page, setPage] = useState(0);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [counts, setCounts] = useState({ new: 0, read: 0, replied: 0 });

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      let query = supabase
        .from('contacts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (statusFilter !== 'all') query = query.eq('status', statusFilter);
      if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);

      const [listResult, countResult] = await Promise.all([
        query,
        supabase.from('contacts').select('status'),
      ]);

      if (listResult.error) throw listResult.error;
      setContacts(listResult.data ?? []);
      setTotal(listResult.count ?? 0);

      const all = countResult.data ?? [];
      setCounts({
        new: all.filter(c => c.status === 'new').length,
        read: all.filter(c => c.status === 'read').length,
        replied: all.filter(c => c.status === 'replied').length,
      });
    } catch (e) {
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [page, statusFilter, search]);

  const handleDelete = async (contact: Contact) => {
    if (!window.confirm(`Delete contact from ${contact.name}? This cannot be undone.`)) return;
    setDeleting(contact.id);
    await supabase.from('contacts').delete().eq('id', contact.id);
    setContacts(prev => prev.filter(c => c.id !== contact.id));
    setTotal(prev => prev - 1);
    setDeleting(null);
  };

  const markAs = async (id: string, status: Contact['status']) => {
    await supabase.from('contacts').update({ status }).eq('id', id);
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <AdminLayout
      title="Contacts"
      breadcrumbs={[{ label: 'Contacts' }]}
      actions={
        <button onClick={load} className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl px-3 py-2 bg-white hover:bg-slate-50 transition-colors">
          <RefreshCw size={13} /> Refresh
        </button>
      }
    >
      {/* Status Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {(Object.entries(STATUS_CONFIG) as Array<[keyof typeof STATUS_CONFIG, typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG]]>).map(([key, config]) => (
          <button
            key={key}
            onClick={() => { setStatusFilter(statusFilter === key ? 'all' : key); setPage(0); }}
            className={`bg-white rounded-2xl border p-4 text-left transition-all hover:shadow-sm ${statusFilter === key ? 'border-[#8B5CF6] ring-2 ring-[#8B5CF6]/20' : 'border-slate-200'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${config.classes}`}>{config.label}</span>
              <div className={`w-2 h-2 rounded-full ${config.dot}`} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{counts[key]}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 bg-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value as any); setPage(0); }}
          className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#8B5CF6] text-slate-700 font-medium"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <span className="text-sm font-semibold text-slate-600">{total} submissions</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="text-[#8B5CF6] animate-spin" size={24} />
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="mx-auto text-slate-300 mb-3" size={32} />
            <p className="text-slate-400 text-sm">No contacts found</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {contacts.map(contact => {
              const statusCfg = STATUS_CONFIG[contact.status];
              return (
                <div key={contact.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center font-bold text-[#8B5CF6] text-sm shrink-0">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-slate-800 truncate">{contact.name}</p>
                      {contact.status === 'new' && <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 animate-pulse" />}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1 truncate"><Mail size={11} /> {contact.email}</span>
                      <span className="hidden sm:block text-slate-200">·</span>
                      <span className="hidden sm:block truncate">{contact.topic}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 hidden sm:inline-flex items-center gap-1 ${statusCfg.classes}`}>
                    {statusCfg.label}
                  </span>

                  {/* Time */}
                  <span className="text-xs text-slate-400 shrink-0 hidden md:block">
                    {formatDistanceToNow(new Date(contact.created_at), { addSuffix: true })}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Link to={`/admin/contacts/${contact.id}`} title="View" className="p-1.5 rounded-lg text-slate-400 hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-colors">
                      <Eye size={14} />
                    </Link>
                    {contact.status !== 'replied' && (
                      <button onClick={() => markAs(contact.id, 'replied')} title="Mark as replied" className="p-1.5 rounded-lg text-slate-400 hover:text-green-600 hover:bg-green-50 transition-colors">
                        <CheckCheck size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(contact)}
                      disabled={deleting === contact.id}
                      title="Delete"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                    >
                      {deleting === contact.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total}
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => p - 1)} disabled={page === 0} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors">
                <ChevronLeft size={14} />
              </button>
              <span className="text-sm font-semibold text-slate-700">{page + 1} / {totalPages}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
