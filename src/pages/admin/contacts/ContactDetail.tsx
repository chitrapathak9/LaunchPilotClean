import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '../AdminLayout';
import { supabase } from '../../../lib/supabase';
import type { Contact } from '../../../types/database';
import {
  Mail, Calendar, MessageSquare, CheckCheck, Clock, ArrowLeft,
  Loader2, AlertCircle, Trash2, User, Tag, StickyNote, Save
} from 'lucide-react';
import { format } from 'date-fns';

const STATUS_CONFIG = {
  new: { label: 'New', classes: 'bg-red-100 text-red-700 border-red-200' },
  read: { label: 'Read', classes: 'bg-amber-100 text-amber-700 border-amber-200' },
  replied: { label: 'Replied', classes: 'bg-green-100 text-green-700 border-green-200' },
};

export function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase.from('contacts').select('*').eq('id', id).single().then(({ data, error: err }) => {
      if (err || !data) { setError('Contact not found'); setLoading(false); return; }
      setContact(data as Contact);
      setNotes(data.admin_notes ?? '');
      // Auto-mark as read
      if (data.status === 'new') {
        supabase.from('contacts').update({ status: 'read' }).eq('id', id).then();
        setContact(prev => prev ? { ...prev, status: 'read' } : null);
      }
      setLoading(false);
    });
  }, [id]);

  const changeStatus = async (status: Contact['status']) => {
    if (!contact) return;
    setUpdatingStatus(true);
    await supabase.from('contacts').update({ status }).eq('id', contact.id);
    setContact(prev => prev ? { ...prev, status } : null);
    setUpdatingStatus(false);
  };

  const saveNotes = async () => {
    if (!contact) return;
    setSavingNotes(true);
    await supabase.from('contacts').update({ admin_notes: notes }).eq('id', contact.id);
    setSavingNotes(false);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const handleDelete = async () => {
    if (!contact || !window.confirm('Delete this contact? This cannot be undone.')) return;
    await supabase.from('contacts').delete().eq('id', contact.id);
    navigate('/admin/contacts');
  };

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center py-24">
        <Loader2 className="text-[#8B5CF6] animate-spin" size={24} />
      </div>
    </AdminLayout>
  );

  if (error || !contact) return (
    <AdminLayout>
      <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
        <AlertCircle size={16} /> {error || 'Contact not found'}
      </div>
    </AdminLayout>
  );

  const statusCfg = STATUS_CONFIG[contact.status];

  return (
    <AdminLayout
      breadcrumbs={[{ label: 'Contacts', href: '/admin/contacts' }, { label: contact.name }]}
      actions={
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.topic)}&body=Hi ${encodeURIComponent(contact.name)},%0D%0A%0D%0A`}
            onClick={() => changeStatus('replied')}
            className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#8B5CF6] rounded-xl px-4 py-2 hover:bg-[#7C3AED] transition-colors shadow-sm"
          >
            <Mail size={14} /> Reply via Email
          </a>
          <button onClick={handleDelete} className="flex items-center gap-1.5 text-sm font-semibold text-red-600 border border-red-200 rounded-xl px-3 py-2 bg-white hover:bg-red-50 transition-colors">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      }
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Message */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">{contact.topic}</h2>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><User size={13} /> {contact.name}</span>
                  <span className="flex items-center gap-1.5"><Mail size={13} /> <a href={`mailto:${contact.email}`} className="text-[#8B5CF6] hover:underline">{contact.email}</a></span>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${statusCfg.classes}`}>
                {statusCfg.label}
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                <MessageSquare size={13} /> Message
              </div>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-sm">{contact.message}</p>
            </div>

            {contact.company && (
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <Tag size={14} className="text-slate-400" /> Company: <strong>{contact.company}</strong>
              </div>
            )}
          </div>

          {/* Admin Notes */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <StickyNote size={14} /> Internal Notes
              </h3>
              <button
                onClick={saveNotes}
                disabled={savingNotes}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  notesSaved ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700 hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]'
                } disabled:opacity-50`}
              >
                {savingNotes ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                {notesSaved ? 'Saved!' : 'Save Notes'}
              </button>
            </div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={6}
              placeholder="Add internal notes about this contact (not visible to the user)..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 resize-none"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Name</p>
                <p className="text-sm font-semibold text-slate-800">{contact.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Email</p>
                <a href={`mailto:${contact.email}`} className="text-sm font-semibold text-[#8B5CF6] hover:underline">{contact.email}</a>
              </div>
              {contact.phone && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">Phone</p>
                  <p className="text-sm font-semibold text-slate-800">{contact.phone}</p>
                </div>
              )}
              {contact.company && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">Company</p>
                  <p className="text-sm font-semibold text-slate-800">{contact.company}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-slate-400 mb-1">Submitted</p>
                <div className="flex items-center gap-1.5 text-sm text-slate-700">
                  <Calendar size={13} className="text-slate-400" />
                  {format(new Date(contact.created_at), 'MMM d, yyyy, h:mm a')}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Update Status</h3>
            <div className="space-y-2">
              {(['new', 'read', 'replied'] as const).map(s => {
                const cfg = STATUS_CONFIG[s];
                return (
                  <button
                    key={s}
                    onClick={() => changeStatus(s)}
                    disabled={contact.status === s || updatingStatus}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      contact.status === s
                        ? `${cfg.classes} border opacity-100`
                        : 'bg-slate-50 text-slate-500 border border-slate-100 hover:border-slate-200'
                    } disabled:cursor-not-allowed`}
                  >
                    {updatingStatus ? <Loader2 size={12} className="animate-spin mx-auto" /> : cfg.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
