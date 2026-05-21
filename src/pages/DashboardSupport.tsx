import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';

export function DashboardSupport() {
  return (
    <DashboardLayout>
      <main className="flex-1 p-6 md:p-10 max-w-[1200px] w-full mx-auto bg-[#FAF9F6] min-h-screen">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Support</h1>
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-10 text-center">
          <div className="text-4xl mb-4">💬</div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Support coming soon</h2>
          <p className="text-slate-500">Contact our team for help with your skills.</p>
        </div>
      </main>
    </DashboardLayout>
  );
}
