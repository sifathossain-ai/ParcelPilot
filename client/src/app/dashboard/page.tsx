'use client';

import React, { useState } from 'react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'extract'>('orders');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Header */}
      <header className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">ParcelPilot Dashboard</h1>
          <p className="text-xs text-gray-500">AI Address Structuring & Courier Automation</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-sm rounded-md ${
              activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Orders / Leads
          </button>
          <button
            onClick={() => setActiveTab('extract')}
            className={`px-4 py-2 text-sm rounded-md ${
              activeTab === 'extract' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            + Paste Raw Message (AI)
          </button>
        </div>
      </header>

      {/* Main Content Area Prepared for Modules */}
      <main className="bg-white p-6 rounded-lg shadow-sm">
        {activeTab === 'orders' ? (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Orders Ready to Book</h2>
            <div className="border border-dashed border-gray-300 rounded p-8 text-center text-gray-500">
              Orders module container (Ready for OrderTable component)
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">AI Chat-to-Address Parser</h2>
            <div className="border border-dashed border-gray-300 rounded p-8 text-center text-gray-500">
              Paste Box container (Ready for AI extraction module)
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
