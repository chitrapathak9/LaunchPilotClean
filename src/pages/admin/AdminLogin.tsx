import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogoIcon } from '../../App';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Shield, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden font-sans text-ink-900">
      {/* Background styling matching the main site's hero sections */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cobalt-50/50 via-white to-white pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

      <div className="relative w-full max-w-md z-10">
        {/* Premium Light Card */}
        <div className="bg-white border border-gray-200 rounded-[2rem] p-8 md:p-12 shadow-xl">
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2.5 mb-6">
              <LogoIcon className="w-8 h-8 text-indigo-600" />
              <span className="text-ink-900 font-bold text-2xl tracking-tight">Launch<span className="text-indigo-600">Pilot</span></span>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
              <Shield size={14} className="text-indigo-600" />
              <span className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-indigo-600">
                Admin Portal
              </span>
            </div>
            
            <h1 className="font-display font-bold text-ink-900 mb-2 leading-tight text-3xl">Sign in to Admin</h1>
            <p className="text-ink-500 text-sm">Restricted access — authorized personnel only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[0.6875rem] font-bold text-ink-400 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@launchpilot.ai"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[0.6875rem] font-bold text-ink-400 uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-12 py-3.5 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-sm"
                />
                <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-indigo-600 transition-colors">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-sm font-medium">
                <AlertCircle size={16} className="shrink-0" />
                {error.includes('Invalid') ? 'Invalid credentials. Please try again.' : error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary py-4 rounded-xl disabled:opacity-60 flex items-center justify-center gap-2 text-[0.9375rem] mt-2 shadow-lg shadow-indigo-600/20"
            >
              {submitting ? (
                <><Loader2 size={18} className="animate-spin" /> Signing in...</>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-8">
            <p className="text-sm font-medium text-ink-500">
              Not an admin? <a href="/" className="text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">Return to site</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
