'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getStoredUser, clearAuthSession, AuthUser } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'orders' | 'extract'>('orders');
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentUser = getStoredUser();
      if (currentUser) {
        setUser(currentUser);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] p-4 sm:p-6 text-[#0b1c30]">
      {/* Top Header */}
      <header className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#006d32] flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[24px]">local_shipping</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#0b1c30]">ParcelPilot Dashboard</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00d166]/20 text-[#006d32] border border-[#00d166]/40">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-[#64748b]">
              {user ? (
                <span>Logged in as <strong className="text-[#0b1c30]">{user.shopName || user.email}</strong> ({user.email})</span>
              ) : (
                'AI Address Structuring & Courier Automation Hub'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-end sm:self-auto">
          <div className="flex gap-1.5 bg-[#eff4ff] p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'orders'
                  ? 'bg-white text-[#0b1c30] shadow-xs'
                  : 'text-[#64748b] hover:text-[#0b1c30]'
              }`}
            >
              Orders / Leads
            </button>
            <button
              onClick={() => setActiveTab('extract')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'extract'
                  ? 'bg-white text-[#0b1c30] shadow-xs'
                  : 'text-[#64748b] hover:text-[#0b1c30]'
              }`}
            >
              + Parse Raw Chat (AI)
            </button>
          </div>

          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-semibold text-[#64748b] hover:text-[#0b1c30] hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Home</span>
          </Link>

          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 inline-flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        {activeTab === 'orders' ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#0b1c30]">Consignments Ready to Book</h2>
                <p className="text-xs text-[#64748b]">Structured leads ready for 1-click Steadfast booking</p>
              </div>
              <button
                onClick={() => setActiveTab('extract')}
                className="px-4 py-2 bg-[#00d166] hover:bg-[#00b858] text-[#00210b] font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>New AI Consignment</span>
              </button>
            </div>

            <div className="border border-dashed border-slate-200 bg-[#eff4ff]/30 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#006d32]">
                <span className="material-symbols-outlined text-[28px]">local_shipping</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0b1c30]">No consignments queued yet</p>
                <p className="text-xs text-[#64748b] mt-0.5 max-w-sm">
                  Paste raw customer chat messages from Facebook Messenger or WhatsApp to extract addresses automatically.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('extract')}
                className="mt-2 px-4 py-2 bg-white border border-slate-200 text-xs font-bold text-[#0b1c30] hover:bg-slate-50 rounded-xl shadow-2xs"
              >
                Try AI Parser Now
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#0b1c30]">AI Chat-to-Address Parser</h2>
              <p className="text-xs text-[#64748b]">Paste unstructured Bangladeshi customer chats to extract Name, Phone, and Thana</p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-[#eff4ff]/20 flex flex-col gap-3">
              <label className="text-xs font-semibold text-[#0b1c30]">Raw Customer Message</label>
              <textarea
                rows={4}
                placeholder="e.g. ভাইয়া আমার নাম সাকিব। মিরপুর ১০, ব্লক সি, রোড ৪, বাসা ১২। ফোন 01712345678। ২ টা টিশার্ট পাঠায়েন।"
                className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm text-[#0b1c30] focus:outline-none focus:border-[#00d166]"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => alert('AI Engine ready! Connect server API to run live OpenAI/Gemini extraction.')}
                  className="px-5 py-2.5 bg-[#00d166] hover:bg-[#00b858] text-[#00210b] font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                  <span>Extract Address</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
