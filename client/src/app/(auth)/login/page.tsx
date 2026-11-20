'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginMerchant, saveAuthSession, AuthUser } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // UI & Network State
  const [lang, setLang] = useState<'EN' | 'BN'>('EN');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverOffline, setServerOffline] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Pre-load remembered email if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('parcelpilot_remember_email');
      if (savedEmail) {
        setEmail(savedEmail);
      }
    }
  }, []);

  // Translations dictionary for bilingual experience
  const t = {
    EN: {
      brandTitle: 'ParcelPilot',
      brandSubtitle: 'AI Logistics Dispatch',
      support: 'Support',
      backHome: 'Back to Home',
      welcomeTitle: 'Welcome back',
      welcomeSubtitle: 'Sign in to access your dispatch dashboard',
      emailLabel: 'Work Email',
      emailPlaceholder: 'name@company.com',
      passwordLabel: 'Password',
      forgotPassword: 'Forgot password?',
      passwordPlaceholder: '••••••••••••',
      rememberMe: 'Remember this device',
      sessionDuration: '30-day session',
      signInButton: 'Sign In to Dashboard',
      authenticating: 'Authenticating Consignment Node...',
      authenticated: 'Authenticated! Entering Hub...',
      orDivider: 'Or continue with',
      googleButton: 'Continue with Google',
      connectingGoogle: 'Connecting to Google...',
      newMerchant: 'New to ParcelPilot?',
      createAccount: 'Create an account',
      copyright: '© 2025 ParcelPilot Technologies Ltd. Built for BD F-Commerce.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      couriers: 'Courier Integrations',
      demoLoginPrompt: 'Server is currently offline. You can test using the instant demo session:',
      demoLoginBtn: 'Login with Demo Account',
    },
    BN: {
      brandTitle: 'পার্সেলপাইলট',
      brandSubtitle: 'এআই লজিস্টিকস ডিসপ্যাচ',
      support: 'সহায়তা',
      backHome: 'হোমে ফিরুন',
      welcomeTitle: 'স্বাগতম',
      welcomeSubtitle: 'আপনার ডিসপ্যাচ ড্যাশবোর্ডে প্রবেশ করতে সাইন ইন করুন',
      emailLabel: 'অফিসিয়াল ইমেইল',
      emailPlaceholder: 'name@company.com',
      passwordLabel: 'পাসওয়ার্ড',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      passwordPlaceholder: '••••••••••••',
      rememberMe: 'এই ডিভাইসটি মনে রাখুন',
      sessionDuration: '৩০ দিনের নিরাপদ সেশন',
      signInButton: 'ড্যাশবোর্ডে প্রবেশ করুন',
      authenticating: 'কনসাইনমেন্ট নোড যাচাই হচ্ছে...',
      authenticated: 'যাচাই সম্পন্ন! প্রবেশ করা হচ্ছে...',
      orDivider: 'অথবা লগইন করুন',
      googleButton: 'গুগল দিয়ে চালিয়ে যান',
      connectingGoogle: 'গুগলে সংযুক্ত করা হচ্ছে...',
      newMerchant: 'পার্সেলপাইলটে নতুন?',
      createAccount: 'অ্যাকাউন্ট তৈরি করুন',
      copyright: '© ২০২৫ পার্সেলপাইলট টেকনোলজিস লিমিটেড। বাংলাদেশি এফ-কমার্সের জন্য নির্মিত।',
      privacy: 'গোপনীয়তা নীতি',
      terms: 'সেবার শর্তাবলী',
      couriers: 'কুরিয়ার ইন্টিগ্রেশন',
      demoLoginPrompt: 'ব্যাকএন্ড অফলাইনে রয়েছে। আপনি ডেমো অ্যাকাউন্টে প্রবেশ করতে পারেন:',
      demoLoginBtn: 'ডেমো অ্যাকাউন্টে লগইন করুন',
    },
  }[lang];

  // Primary Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setServerOffline(false);

    if (!email || !password) {
      setErrorMessage(lang === 'EN' ? 'Please provide both email and password.' : 'ইমেইল ও পাসওয়ার্ড প্রদান করুন।');
      return;
    }

    setIsLoading(true);

    try {
      // Send authentication request to NestJS backend
      const res = await loginMerchant({
        email: email.trim().toLowerCase(),
        password,
      });

      const { token, user } = res;
      saveAuthSession(token, user, rememberMe);
      setSuccessMessage(t.authenticated);

      setTimeout(() => {
        router.push('/dashboard');
      }, 700);
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.response?.data?.message) {
        // Backend specific error message
        const msg = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(', ')
          : err.response.data.message;
        setErrorMessage(msg);
      } else if (err.code === 'ERR_NETWORK' || !err.response) {
        // Backend server is not running
        setServerOffline(true);
        setErrorMessage(
          lang === 'EN'
            ? 'Cannot reach the backend server (http://localhost:5000). You can still continue using Demo Mode below.'
            : 'ব্যাকএন্ড সার্ভারে সংযোগ স্থাপন করা সম্ভব হয়নি। নিচে ডেমো মোড ব্যবহার করতে পারেন।'
        );
      } else {
        setErrorMessage(
          lang === 'EN' ? 'Authentication failed. Please verify your credentials.' : 'লগইন ব্যর্থ হয়েছে। তথ্য যাচাই করুন।'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Instant Demo Mode Login Handler
  const handleDemoLogin = (customEmail?: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(t.authenticated);

    const demoUser: AuthUser = {
      id: '101',
      fullName: 'Sifat Hossain',
      email: customEmail || (email.trim() ? email.trim() : 'merchant@dhakafashions.com'),
      shopName: 'Dhaka Trends BD',
    };

    saveAuthSession('demo_jwt_token_parcelpilot_2026', demoUser, rememberMe);

    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  // Simulated Google Auth Handler
  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      const googleUser: AuthUser = {
        id: '202',
        fullName: 'Google Merchant',
        email: 'google.merchant@gmail.com',
        shopName: 'Green Logistics Store',
      };
      saveAuthSession('google_oauth_token_2026', googleUser, rememberMe);
      setSuccessMessage(t.authenticated);
      setTimeout(() => {
        router.push('/dashboard');
      }, 600);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col justify-between selection:bg-[#00d166] selection:text-[#00210b] font-sans relative overflow-x-hidden">
      {/* =========================================================================
          FIXED TOP NAVIGATION HEADER
          ========================================================================= */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#f8f9ff]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-slate-100">
        <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Tagline */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-[#006d32] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-[22px]">local_shipping</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[18px] font-bold text-[#0b1c30] leading-none tracking-tight">
                {t.brandTitle}
              </span>
              <span className="text-[12px] font-medium text-[#3c4a3d] leading-none mt-1">
                {t.brandSubtitle}
              </span>
            </div>
          </Link>

          {/* Right Navigation & Language Switcher */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Bilingual Switcher Pill */}
            <div className="flex items-center bg-[#eff4ff] px-1 py-1 rounded-full border border-slate-200/50">
              <button
                type="button"
                onClick={() => setLang('EN')}
                className={`px-3 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  lang === 'EN'
                    ? 'bg-white text-[#0b1c30] shadow-xs font-bold'
                    : 'text-[#3c4a3d] hover:text-[#0b1c30]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('BN')}
                className={`px-3 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all font-bangla ${
                  lang === 'BN'
                    ? 'bg-white text-[#0b1c30] shadow-xs font-bold'
                    : 'text-[#3c4a3d] hover:text-[#0b1c30]'
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* Support Link */}
            <button
              type="button"
              onClick={() => alert(lang === 'EN' ? 'Need help? Contact support at support@parcelpilot.bd or call +880 9612-000000' : 'সহায়তার জন্য ইমেইল করুন: support@parcelpilot.bd অথবা কল করুন: +৮৮০ ৯৬১২-০০০০০০')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#3c4a3d] hover:text-[#006d32] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">help</span>
              <span>{t.support}</span>
            </button>

            {/* Back to Home Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0059bb] hover:text-[#0b1c30] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>{t.backHome}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN AUTHENTICATION SECTION
          ========================================================================= */}
      <main className="w-full flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 relative bg-[#f8f9ff]">
        {/* Ambient Logistics Glow Backdrops */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-gradient-to-b from-[#64ff92]/20 via-[#dce9ff]/40 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />
        <div className="absolute -bottom-24 right-10 w-96 h-96 bg-[#d8e2ff]/30 blur-3xl pointer-events-none rounded-full -z-10" />

        <div className="w-full max-w-[480px] mx-auto flex flex-col items-center">
          {/* Main Authentication Glass-Card */}
          <div className="w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-10 flex flex-col relative border border-slate-100">
            {/* Brand Icon Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#eff4ff] flex items-center justify-center text-[#006d32] mb-3 shadow-xs relative group">
                <span
                  className="material-symbols-outlined text-[32px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_shipping
                </span>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00d166] rounded-full flex items-center justify-center text-[#00210b] text-[10px] font-bold shadow-xs">
                  <span className="material-symbols-outlined text-[11px] font-bold">bolt</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-[26px] font-bold text-[#0b1c30] tracking-tight">
                {t.welcomeTitle}
              </h1>
              <p className="text-sm text-[#475569] mt-1.5 max-w-sm">
                {t.welcomeSubtitle}
              </p>
            </div>

            {/* Error Notification Banner */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0 mt-0.5">
                  error
                </span>
                <div className="flex-1 leading-relaxed">{errorMessage}</div>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}

            {/* Server Offline / Demo Access Helper */}
            {serverOffline && (
              <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex flex-col gap-2">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-900">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span>{t.demoLoginPrompt}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDemoLogin()}
                  className="w-full py-2 px-3 rounded-lg bg-[#00d166] hover:bg-[#00b858] text-[#00210b] font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>{t.demoLoginBtn}</span>
                  <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                </button>
              </div>
            )}

            {/* Success Notification Banner */}
            {successMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0">
                  task_alt
                </span>
                <span className="font-semibold">{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              {/* Work Email / Identifier Input */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="identifier" className="text-xs font-semibold text-[#0b1c30]">
                  {t.emailLabel}
                </label>
                <div className="relative flex items-center rounded-xl bg-[#eff4ff] border border-transparent focus-within:border-[#00d166] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00d166]/30 focus-within:shadow-sm transition-all">
                  <div className="pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <input
                    id="identifier"
                    type="email"
                    required
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full h-11 bg-transparent px-3 pr-4 text-[#0b1c30] text-sm placeholder:text-[#94a3b8] focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label htmlFor="passwordField" className="text-xs font-semibold text-[#0b1c30]">
                    {t.passwordLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs text-[#0059bb] font-medium hover:underline transition-colors"
                  >
                    {t.forgotPassword}
                  </button>
                </div>
                <div className="relative flex items-center rounded-xl bg-[#eff4ff] border border-transparent focus-within:border-[#00d166] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00d166]/30 focus-within:shadow-sm transition-all">
                  <div className="pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    id="passwordField"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="w-full h-11 bg-transparent px-3 text-[#0b1c30] text-sm placeholder:text-[#94a3b8] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    className="pr-3.5 pl-2 h-full flex items-center text-[#64748b] hover:text-[#0b1c30] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Auxiliary Row: Remember & Session Security */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#eff4ff] accent-[#006d32] cursor-pointer"
                  />
                  <span className="text-xs text-[#0b1c30] font-medium">{t.rememberMe}</span>
                </label>
                <span className="text-xs text-[#64748b] flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[15px] text-[#006d32]">shield</span>
                  {t.sessionDuration}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 h-11 rounded-xl bg-[#00d166] hover:bg-[#00b858] active:scale-[0.99] text-[#00210b] font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">
                      progress_activity
                    </span>
                    <span>{t.authenticating}</span>
                  </>
                ) : (
                  <>
                    <span>{t.signInButton}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Fast Auth Section Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="w-full h-[1px] bg-[#e2e8f0]" />
              <span className="absolute px-3 bg-white text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">
                {t.orDivider}
              </span>
            </div>

            {/* Google Social Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full h-11 px-4 rounded-xl bg-[#eff4ff] hover:bg-[#e2e8f0]/60 text-[#0b1c30] font-semibold text-xs flex items-center justify-center gap-3 transition-colors cursor-pointer group shadow-xs border border-transparent hover:border-slate-200"
            >
              <svg className="w-5 h-5 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                <path
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  fill="#4285F4"
                />
                <path
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  fill="#34A853"
                />
                <path
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  fill="#EA4335"
                />
              </svg>
              <span>
                {isGoogleLoading ? t.connectingGoogle : t.googleButton}
              </span>
            </button>

            {/* Merchant Register Link */}
            <div className="mt-6 text-center pt-1">
              <p className="text-sm text-[#475569]">
                {t.newMerchant}{' '}
                <Link
                  href="/register"
                  className="font-semibold text-[#006d32] hover:text-[#0b1c30] underline underline-offset-4 decoration-[#00d166] transition-colors ml-1"
                >
                  {t.createAccount}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="w-full py-5 bg-[#f8f9ff] border-t border-slate-100 text-center">
        <div className="w-full max-w-7xl mx-auto px-4 text-center flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-xs text-[#64748b]">
          <span>{t.copyright}</span>
          <div className="flex items-center gap-4 font-medium">
            <a href="#" className="hover:text-[#0b1c30] transition-colors">
              {t.privacy}
            </a>
            <a href="#" className="hover:text-[#0b1c30] transition-colors">
              {t.terms}
            </a>
            <a href="#" className="hover:text-[#0b1c30] transition-colors">
              {t.couriers}
            </a>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          FORGOT PASSWORD MODAL
          ========================================================================= */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#006d32]">
                <span className="material-symbols-outlined text-[24px]">lock_reset</span>
                <h3 className="font-bold text-base text-[#0b1c30]">
                  {lang === 'EN' ? 'Reset Password' : 'পাসওয়ার্ড রিসেট'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              {lang === 'EN'
                ? 'Enter your registered work email. We will dispatch a secure 6-digit verification code to reset your account password.'
                : 'আপনার নিবন্ধিত কাজের ইমেইল প্রদান করুন। পাসওয়ার্ড রিসেট করার জন্য একটি ৬-সংখ্যার কোড পাঠানো হবে।'}
            </p>
            <input
              type="email"
              placeholder="name@company.com"
              defaultValue={email}
              className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-sm text-[#0b1c30] focus:outline-none border border-transparent focus:border-[#00d166]"
            />
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {lang === 'EN' ? 'Cancel' : 'বাতিল'}
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(lang === 'EN' ? 'Password reset instructions sent to your email.' : 'পাসওয়ার্ড রিসেট নির্দেশাবলী আপনার ইমেইলে পাঠানো হয়েছে।');
                  setShowForgotModal(false);
                }}
                className="px-4 py-2 text-xs font-bold text-[#00210b] bg-[#00d166] hover:bg-[#00b858] rounded-lg transition-colors shadow-xs"
              >
                {lang === 'EN' ? 'Send Reset Link' : 'রিসেট লিঙ্ক পাঠান'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
