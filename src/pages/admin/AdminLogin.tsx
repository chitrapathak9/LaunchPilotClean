import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogoIcon } from '../../App';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';

export function AdminLogin() {
  const { login, isAuthenticated, isAdmin, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isLoading && isAuthenticated && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: loginErr } = await login(email, password);
    if (loginErr) {
      setError(loginErr);
      setSubmitting(false);
    }
    // AuthContext will update isAdmin; redirect happens via the check above
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0F0A1E] flex items-center justify-center p-6">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <LogoIcon className="w-8 h-8 text-[#8B5CF6]" />
              <span className="text-white font-bold text-xl tracking-tight">Launch<span className="text-[#8B5CF6]">Pilot</span></span>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/20 text-[#A78BFA] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Shield size={12} /> Admin Portal
            </div>
            <h1 className="text-2xl font-bold text-white">Sign in to Admin</h1>
            <p className="text-slate-400 text-sm mt-2">Restricted access — admins only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all text-sm"
                />
                <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                {error.includes('Invalid') ? 'Invalid credentials. Please try again.' : error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#8B5CF6]/30 disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
            >
              {submitting ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : (
                'Access Admin Panel'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-6">
            Not an admin? <a href="/" className="text-[#8B5CF6] hover:underline">Return to site</a>
          </p>
        </div>
      </div>
    </div>
  );
}
