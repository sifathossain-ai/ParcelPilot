'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'BN'>('EN');

  return (
    <div className="bg-brand-bg text-brand-dark min-h-screen flex flex-col font-sans">
      {/* =========================================================================
          NAVIGATION HEADER
          ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-brand-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-green text-brand-dark flex items-center justify-center shadow-md shadow-brand-green/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl font-bold">local_shipping</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-brand-dark leading-none">
                Parcel<span className="text-brand-green">Pilot</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-brand-muted uppercase mt-0.5">
                Logistics AI BD
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-brand-muted hover:text-brand-dark transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-brand-muted hover:text-brand-dark transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium text-brand-muted hover:text-brand-dark transition-colors flex items-center gap-1.5">
              Pricing
              <span className="bg-blue-50 text-brand-blue text-[11px] font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                Free Tier
              </span>
            </a>
            <a href="#integration" className="text-sm font-medium text-brand-muted hover:text-brand-dark transition-colors flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
              Steadfast API
            </a>
            <a href="#contact" className="text-sm font-medium text-brand-muted hover:text-brand-dark transition-colors">
              Contact
            </a>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-1 text-xs font-semibold text-slate-600 border border-slate-200">
              <button
                onClick={() => setLang('EN')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  lang === 'EN' ? 'bg-white text-brand-dark shadow-xs font-bold' : 'hover:text-brand-dark'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('BN')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  lang === 'BN' ? 'bg-white text-brand-dark shadow-xs font-bold' : 'hover:text-brand-dark'
                }`}
              >
                বাংলা
              </button>
            </div>

            <Link
              href="/login"
              className="hidden lg:inline-flex px-4 py-2 text-sm font-semibold text-brand-dark hover:text-brand-blue transition-colors"
            >
              Log In
            </Link>

            <Link
              href="/register"
              className="bg-brand-green hover:bg-brand-green-hover text-brand-dark font-bold text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-md shadow-brand-green/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 sm:gap-2"
            >
              <span>Get Started Free</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-brand-border px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in duration-200">
            <nav className="flex flex-col space-y-2.5">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-brand-dark py-1.5 border-b border-slate-100"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-brand-dark py-1.5 border-b border-slate-100"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-brand-dark py-1.5 border-b border-slate-100 flex items-center justify-between"
              >
                <span>Pricing</span>
                <span className="bg-blue-50 text-brand-blue text-[11px] font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                  Free Tier
                </span>
              </a>
              <a
                href="#integration"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-brand-dark py-1.5 border-b border-slate-100 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                Steadfast API
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-brand-dark py-1.5"
              >
                Contact
              </a>
            </nav>
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center bg-slate-100 rounded-lg p-1 text-xs font-semibold text-slate-600 border border-slate-200">
                <button
                  onClick={() => setLang('EN')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    lang === 'EN' ? 'bg-white text-brand-dark shadow-xs font-bold' : ''
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('BN')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    lang === 'BN' ? 'bg-white text-brand-dark shadow-xs font-bold' : ''
                  }`}
                >
                  বাংলা
                </button>
              </div>
              <Link
                href="/login"
                className="text-sm font-semibold text-brand-dark hover:text-brand-blue"
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-white to-brand-bg border-b border-brand-border">
        {/* Ambient Backdrop Blobs */}
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Copy & Value Proposition (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Bangla NLP & Steadfast API Automation
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-[52px] leading-[1.15] text-brand-dark font-extrabold tracking-tight">
                  Paste the chat.<br />
                  <span className="text-brand-green">Ship the parcel.</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 font-medium font-bangla">
                  অগোছালো ইনবক্স মেসেজ থেকে এক ক্লিকেই স্ট্যাডফাস্ট পার্সেল বুকিং।
                </p>
              </div>

              <p className="text-sm sm:text-base text-brand-muted max-w-lg leading-relaxed">
                Transform raw Messenger & WhatsApp inbox conversations into accurate courier bookings in seconds. Zero manual typing, zero Thana errors.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-1">
                <Link
                  href="/register"
                  className="bg-brand-green hover:bg-brand-green-hover text-brand-dark font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-brand-green/20 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">bolt</span>
                  <span>Start Free Trial</span>
                </Link>
                <a
                  href="#how-it-works"
                  className="bg-white hover:bg-slate-50 text-brand-dark border border-brand-border font-semibold text-sm px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <span className="material-symbols-outlined text-brand-blue text-lg">play_circle</span>
                  <span>Watch 1-Min Demo</span>
                </a>
              </div>

              <div className="pt-4 flex items-center gap-3 border-t border-brand-border w-full">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                    SK
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand-green text-brand-dark flex items-center justify-center text-xs font-bold ring-2 ring-white">
                    FZ
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                    RH
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                    +2k
                  </div>
                </div>
                <p className="text-xs text-brand-muted">
                  <span className="text-brand-dark font-semibold">2,400+ BD Merchants</span> shipped{' '}
                  <span className="text-brand-dark font-semibold">৳4.8Cr+</span> safely.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Visual Card Mockup (5 cols) */}
            <div className="lg:col-span-5 relative w-full">
              <div className="relative bg-white rounded-2xl p-5 shadow-xl border border-brand-border space-y-3.5">
                {/* Header with dots and badge */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-medium text-slate-500 ml-1.5">Parser Engine v3.2</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Live Ready
                  </span>
                </div>

                {/* Raw customer chat box */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-brand-blue">chat</span>Customer Chat
                    </span>
                    <span className="text-[11px] text-slate-500">Messenger</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg text-xs text-slate-700 border-l-2 border-amber-400 shadow-xs leading-relaxed font-bangla">
                    “ভাইয়া মিরপুর ১০ গোলচক্করের পেছনে রহিম বিল্ডিং ৩য় তলা ফ্ল্যাট বি-২। ফোন ০১৭৮৮৯৯১২৩৪, ক্যাশ অন ডেলিভারি ১২৫০ টাকা।”
                  </div>
                </div>

                {/* Parsing indicator pill */}
                <div className="flex items-center justify-center -my-1.5 relative z-10">
                  <div className="bg-slate-900 text-white px-3 py-0.5 rounded-full shadow-sm text-[11px] font-medium flex items-center gap-1.5 border border-slate-700">
                    <span className="material-symbols-outlined text-xs text-brand-green">sync</span>
                    <span>NLP Parsed in 0.18s</span>
                  </div>
                </div>

                {/* Verified consignment card */}
                <div className="bg-emerald-50/60 rounded-xl p-3.5 border border-emerald-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-emerald-600">verified</span>Verified Consignment
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-700 text-[11px] font-semibold">
                      98% Confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase">Recipient</span>
                      <span className="text-brand-dark font-semibold truncate block">রহিম উদ্দিন (Rahim)</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase">Phone</span>
                      <span className="text-emerald-700 font-semibold block">+880 1788-991234</span>
                    </div>
                    <div className="col-span-2 bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase">Delivery Address</span>
                      <span className="text-slate-700 block truncate">Flat B-2, 3rd Floor, Rahim Building, Mirpur 10, Dhaka</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200">
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase">Thana & City</span>
                      <span className="text-brand-dark font-semibold block">Mirpur 10 • Dhaka</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-semibold uppercase">COD Amount</span>
                        <span className="text-brand-dark font-bold block">৳1,250</span>
                      </div>
                      <span className="bg-blue-50 text-brand-blue text-[10px] font-semibold px-1.5 py-0.5 rounded">
                        Inside Dhaka
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-brand-green hover:bg-brand-green-hover text-brand-dark font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-sm">local_shipping</span>
                    <span>Dispatch to Steadfast</span>
                    <span className="material-symbols-outlined text-xs ml-auto">north_east</span>
                  </button>
                </div>
              </div>

              {/* Floating badge */}
              <div className="hidden sm:flex items-center gap-2.5 bg-white py-2 px-3 rounded-xl shadow-lg border border-brand-border absolute -bottom-4 -left-4 z-20">
                <div className="w-7 h-7 rounded-lg bg-brand-green text-brand-dark flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-base">receipt_long</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-brand-dark">Consignment #SF-891024</span>
                  <span className="text-[10px] text-emerald-600 font-medium">Barcode Sticker Generated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LIVE METRIC STRIP
          ========================================================================= */}
      <section className="border-b border-brand-border bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-x-0 md:divide-x divide-slate-200">
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl font-black text-brand-green">99.4%</span>
              <span className="text-xs sm:text-sm font-semibold text-brand-muted mt-1">Extraction Accuracy</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl font-black text-brand-dark">15 Sec</span>
              <span className="text-xs sm:text-sm font-semibold text-brand-muted mt-1">Average Consignment Time</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl font-black text-brand-blue">0 Typos</span>
              <span className="text-xs sm:text-sm font-semibold text-brand-muted mt-1">On Steadfast Bookings</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl font-black text-slate-800">৳0 Free</span>
              <span className="text-xs sm:text-sm font-semibold text-brand-muted mt-1">Zero Setup or Monthly Card</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PROBLEM SECTION
          ========================================================================= */}
      <section className="py-20 lg:py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              The Cost of Manual Logistics
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl text-brand-dark font-extrabold tracking-tight">
              Why Bangladeshi F-Commerce Sellers Lose Hours Every Night
            </h2>
            <p className="text-base sm:text-lg text-brand-muted">
              Manual data entry from Facebook inbox chats to courier dashboards is quietly eating your operational profit and causing costly return penalties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Problem Card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                </div>
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">Manual Overhead</span>
                <h3 className="text-lg font-bold text-brand-dark">4–5 Mins Lost Per Order</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Copying names, numbers, and sub-districts from Facebook chats into courier portals causes late-night delays and fatigue.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Daily Drain: ~2.5 hrs</span>
                <span className="text-rose-600 font-bold">-৳28,000 / mo</span>
              </div>
            </div>

            {/* Problem Card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">sync_problem</span>
                </div>
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">Failed Delivery</span>
                <h3 className="text-lg font-bold text-brand-dark">18% Unnecessary Returns</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Misspelled Thanas and wrong digit phone numbers result in failed deliveries and costly double courier return charges.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Avg Return Penalty: ৳120</span>
                <span className="text-rose-600 font-bold">18% Return rate</span>
              </div>
            </div>

            {/* Problem Card 3 */}
            <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">table_chart_view</span>
                </div>
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">Reconciliation</span>
                <h3 className="text-lg font-bold text-brand-dark">Lost COD & Disjointed Sheets</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Dispersed spreadsheets lead to missed courier payout reconciliations, unaccounted orders, and lost profit margins.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Manual Excel tracking</span>
                <span className="text-rose-600 font-bold">Untracked COD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS SECTION (3 STEPS)
          ========================================================================= */}
      <section className="py-20 lg:py-24 bg-white border-y border-brand-border" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-green bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Effortless Automation
            </span>
            <h2 className="text-3xl sm:text-4xl text-brand-dark font-extrabold tracking-tight">
              How ParcelPilot Works in 3 Steps
            </h2>
            <p className="text-base text-brand-muted">
              From unformatted inbox chats to Steadfast dispatch tracking sticker in under 20 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-brand-bg p-5 rounded-2xl border border-brand-border flex flex-col justify-between h-full hover:border-slate-300 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-white border border-brand-border text-brand-dark text-sm font-bold flex items-center justify-center shadow-xs">
                    1
                  </span>
                  <span className="material-symbols-outlined text-brand-blue text-xl">content_paste</span>
                </div>
                <h4 className="text-base font-bold text-brand-dark">Paste Raw Chat</h4>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Paste unformatted customer messages directly from Messenger or WhatsApp without retyping.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-slate-200 text-xs font-medium text-brand-blue">
                Instant text capture
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-brand-bg p-5 rounded-2xl border border-brand-border flex flex-col justify-between h-full hover:border-slate-300 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-brand-green text-brand-dark text-sm font-bold flex items-center justify-center shadow-xs">
                    2
                  </span>
                  <span className="material-symbols-outlined text-emerald-700 text-xl">psychology</span>
                </div>
                <h4 className="text-base font-bold text-brand-dark">AI Structures Data</h4>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Local NLP isolates BD phone numbers, delivery Thana, landmarks, recipient names, and COD sum.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-slate-200 text-xs font-semibold text-emerald-700">
                99.4% Parsing precision
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-brand-bg p-5 rounded-2xl border border-brand-border flex flex-col justify-between h-full hover:border-slate-300 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-brand-green text-brand-dark text-sm font-bold flex items-center justify-center shadow-xs">
                    3
                  </span>
                  <span className="material-symbols-outlined text-emerald-700 text-xl">local_shipping</span>
                </div>
                <h4 className="text-base font-bold text-brand-dark">1-Click Steadfast Dispatch</h4>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Generate Steadfast consignment IDs and print ready thermal labels with a single click.
                </p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-slate-200 text-xs font-semibold text-emerald-700">
                Instant API webhook
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURES GRID (6 CARDS)
          ========================================================================= */}
      <section className="py-20 lg:py-24 bg-brand-bg" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Engineered For Bangladesh Commerce
            </span>
            <h2 className="text-3xl sm:text-4xl text-brand-dark font-extrabold tracking-tight">
              Everything You Need to Dispatch 500+ Parcels a Day
            </h2>
            <p className="text-base sm:text-lg text-brand-muted">
              A high-velocity operational cockpit built for the distinct nuances of the Bangladeshi delivery ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs hover:border-brand-green hover:shadow-md transition-all flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">translate</span>
                </div>
                <h3 className="text-lg font-bold text-brand-dark">Bangla & Banglish NLP</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Understands colloquial phrasing, regional landmarks, and Banglish spelling without requiring rigid input.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs hover:border-brand-green hover:shadow-md transition-all flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">verified_user</span>
                </div>
                <h3 className="text-lg font-bold text-brand-dark">Confidence Scoring</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Flags missing Thanas, vague village locations, or incomplete digits before consignment dispatch.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs hover:border-brand-green hover:shadow-md transition-all flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">receipt_long</span>
                </div>
                <h3 className="text-lg font-bold text-brand-dark">Bulk Manifest Generation</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Generate batch shipping manifests and print 4x6 thermal barcode stickers instantly for courier pickup.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs hover:border-brand-green hover:shadow-md transition-all flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">sync_alt</span>
                </div>
                <h3 className="text-lg font-bold text-brand-dark">Direct Steadfast Sync</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Push batch consignments directly through Steadfast official APIs with instant tracking ID generation.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs hover:border-brand-green hover:shadow-md transition-all flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">query_stats</span>
                </div>
                <h3 className="text-lg font-bold text-brand-dark">COD & Return Analytics</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Track pending disbursements, district-wise delivery success rates, and real-time return expenses.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-xs hover:border-brand-green hover:shadow-md transition-all flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">lock</span>
                </div>
                <h3 className="text-lg font-bold text-brand-dark">Enterprise Security</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Buyer delivery records and contact details protected with AES-256 encryption compliant with BD ICT norms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STEADFAST INTEGRATION HIGHLIGHT BANNER
          ========================================================================= */}
      <section className="py-16 bg-white border-y border-brand-border" id="integration">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-2xl space-y-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
                Get Started in Under 2 Minutes
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Ready to streamline your courier dispatch?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Eliminate manual typing errors and lower return fees today. Join thousands of Bangladeshi F-commerce sellers shipping faster.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/register"
                  className="bg-brand-green hover:bg-brand-green-hover text-brand-dark font-bold text-sm px-7 py-3.5 rounded-xl shadow-md shadow-brand-green/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Start Shipping Free</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <span className="text-xs text-slate-400 sm:ml-2">
                  100 free orders/mo • No credit card required
                </span>
              </div>
            </div>

            {/* Fast Stats Badge */}
            <div className="w-full lg:w-auto bg-white/10 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-white/15 text-center min-w-[280px] relative z-10 space-y-3">
              <span className="text-xs font-semibold text-emerald-400 block uppercase tracking-wider">
                Official API Partner
              </span>
              <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                <span className="material-symbols-outlined text-brand-green">bolt</span>
                <span>Steadfast API</span>
              </div>
              <p className="text-xs text-slate-300">
                Direct booking connection with 0ms delay.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Server Status: 100% Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRICING TIERS
          ========================================================================= */}
      <section className="py-20 lg:py-24 bg-brand-bg" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-green bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Transparent Bangladeshi Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl text-brand-dark font-extrabold tracking-tight">
              Start for Free. Upgrade as You Scale.
            </h2>
            <p className="text-base text-brand-muted">
              No credit card required. Pay via bKash, Nagad, or cards when you are ready to expand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Free Tier */}
            <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-brand-dark">Starter Merchant</span>
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                    Free Forever
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-brand-dark">৳0</span>
                  <span className="text-sm font-semibold text-brand-muted">/month</span>
                </div>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  Ideal for boutique Facebook shops processing under 100 orders monthly.
                </p>
                <ul className="pt-5 space-y-3 text-xs sm:text-sm text-slate-700 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-green text-base">check</span>
                    <span><strong>100 Free</strong> AI extractions / month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-green text-base">check</span>
                    <span>Direct Steadfast API booking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-green text-base">check</span>
                    <span>Basic ambiguity error alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-green text-base">check</span>
                    <span>Printable label generator</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/register"
                className="mt-8 w-full bg-slate-100 hover:bg-slate-200 text-brand-dark font-bold text-sm py-3 rounded-xl transition-colors text-center block"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Tier (Popular) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-brand-green shadow-xl flex flex-col justify-between relative transform md:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-green text-brand-dark text-xs uppercase px-4 py-1 rounded-full font-black tracking-wide shadow-sm">
                Most Popular For F-Commerce
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-brand-dark">Growth Seller</span>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                    Fast Scaling
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-brand-dark">৳799</span>
                  <span className="text-sm font-semibold text-brand-muted">/month</span>
                </div>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  For active stores processing 15–50 parcels every single day.
                </p>
                <ul className="pt-5 space-y-3 text-xs sm:text-sm text-slate-700 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-green text-base">check</span>
                    <span><strong>1,500 AI extractions</strong> / month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-green text-base">check</span>
                    <span>Bulk paste (up to 30 chats at once)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-green text-base">check</span>
                    <span>Batch barcode & sticker printing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-green text-base">check</span>
                    <span>Automated COD reconciliation dashboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-green text-base">check</span>
                    <span>Priority WhatsApp live support</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/register"
                className="mt-8 w-full bg-brand-green hover:bg-brand-green-hover text-brand-dark font-extrabold text-sm py-3 rounded-xl shadow-md shadow-brand-green/25 transition-all text-center block"
              >
                Start 14-Day Pro Trial
              </Link>
            </div>

            {/* Scale Tier */}
            <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-brand-dark">Power Merchant</span>
                  <span className="bg-blue-50 text-brand-blue text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                    High Volume
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-brand-dark">৳1,999</span>
                  <span className="text-sm font-semibold text-brand-muted">/month</span>
                </div>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  For enterprise stores shipping 100+ daily orders across Bangladesh.
                </p>
                <ul className="pt-5 space-y-3 text-xs sm:text-sm text-slate-700 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-green text-base">check</span>
                    <span><strong>Unlimited</strong> AI address extractions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-green text-base">check</span>
                    <span>Multi-seat team accounts (5 operators)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-green text-base">check</span>
                    <span>Pathao & RedX additional integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-brand-green text-base">check</span>
                    <span>Custom webhook & Google Sheets export</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="mt-8 w-full bg-slate-100 hover:bg-slate-200 text-brand-dark font-bold text-sm py-3 rounded-xl transition-colors text-center block"
              >
                Contact Enterprise Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL CTA BANNER
          ========================================================================= */}
      <section className="py-16 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-brand-dark text-white rounded-3xl p-8 sm:p-14 overflow-hidden shadow-2xl">
            {/* Ambient decorative blobs */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-green/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-brand-green">
                Zero Risk • Set Up in 120 Seconds
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Ready to automate your parcel delivery workflow?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Stop losing hours to manual typing and return penalties. Join thousands of smart Bangladeshi sellers dispatching parcels effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/register"
                  className="bg-brand-green hover:bg-brand-green-hover text-brand-dark font-black text-base px-8 py-4 rounded-xl shadow-lg shadow-brand-green/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Start Shipping Smarter Now</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
              <p className="text-xs text-slate-400">
                ✨ Free 100 AI Address Extractions every month • bKash and Nagad verified
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMPREHENSIVE FOOTER
          ========================================================================= */}
      <footer className="bg-brand-bg py-16" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-brand-border">
            {/* Brand Info */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center text-brand-dark font-bold">
                  <span className="material-symbols-outlined text-xl">local_shipping</span>
                </div>
                <span className="text-xl font-extrabold text-brand-dark tracking-tight">
                  Parcel<span className="text-brand-green">Pilot</span>
                </span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                AI-powered conversational address structuring and seamless courier fulfillment designed specifically for Bangladeshi digital commerce.
              </p>
              <div className="flex items-center gap-3 pt-1 text-slate-500">
                <a
                  href="mailto:support@parcelpilot.bd"
                  className="w-8 h-8 rounded-lg bg-white border border-brand-border flex items-center justify-center hover:text-brand-green transition-colors"
                  aria-label="Email support"
                >
                  <span className="material-symbols-outlined text-base">mail</span>
                </a>
                <a
                  href="tel:+8801700000000"
                  className="w-8 h-8 rounded-lg bg-white border border-brand-border flex items-center justify-center hover:text-brand-green transition-colors"
                  aria-label="Phone hotline"
                >
                  <span className="material-symbols-outlined text-base">call</span>
                </a>
                <a
                  href="#contact"
                  className="w-8 h-8 rounded-lg bg-white border border-brand-border flex items-center justify-center hover:text-brand-green transition-colors"
                  aria-label="Live chat"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                </a>
              </div>
            </div>

            {/* Links: Product */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-4">Product</h5>
              <ul className="space-y-2.5 text-xs font-medium text-brand-muted">
                <li><a href="#features" className="hover:text-brand-dark transition-colors">Bangla NLP Parser</a></li>
                <li><a href="#integration" className="hover:text-brand-dark transition-colors">Steadfast Courier Sync</a></li>
                <li><a href="#features" className="hover:text-brand-dark transition-colors">Confidence Scoring</a></li>
                <li><a href="#pricing" className="hover:text-brand-dark transition-colors">Pricing & Quotas</a></li>
                <li><a href="#features" className="hover:text-brand-dark transition-colors">Bulk Thermal Printing</a></li>
              </ul>
            </div>

            {/* Links: BD Ecosystem */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-4">Integrations</h5>
              <ul className="space-y-2.5 text-xs font-medium text-brand-muted">
                <li>
                  <a href="#integration" className="hover:text-brand-dark transition-colors flex items-center gap-1.5">
                    Steadfast Courier
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                      Live
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#integration" className="hover:text-brand-dark transition-colors flex items-center gap-1.5">
                    Pathao Logistics
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.2 rounded">
                      Beta
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#integration" className="hover:text-brand-dark transition-colors flex items-center gap-1.5">
                    RedX Express
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.2 rounded">
                      Beta
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#integration" className="hover:text-brand-dark transition-colors">Paperfly API</a>
                </li>
              </ul>
            </div>

            {/* Project & Institutional Credits */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-2">
                Institutional Credit
              </h5>
              <p className="text-xs text-brand-muted leading-relaxed">
                Daffodil International University (DIU) Capstone Engineering Research Project. Developed under Department of Software Engineering.
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Dhaka, Bangladesh • 2026
                </span>
              </div>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-brand-muted gap-4">
            <div>
              © 2026 ParcelPilot Bangladesh. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-brand-dark transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-dark transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brand-dark transition-colors">Steadfast API Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
