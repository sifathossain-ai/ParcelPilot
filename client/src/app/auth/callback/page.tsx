'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { saveAuthSession, AuthUser } from '@/lib/auth';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');
    const fullName = searchParams.get('fullName');
    const shopName = searchParams.get('shopName');

    if (error) {
      setStatus('error');
      setErrorMessage(decodeURIComponent(error));
      return;
    }

    if (token) {
      const user: AuthUser = {
        id: userId || 'google_user',
        email: email || '',
        fullName: fullName || 'Merchant',
        shopName: shopName || 'My Shop',
      };

      saveAuthSession(token, user, true);
      setStatus('success');

      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setStatus('error');
      setErrorMessage('No authentication token received.');
    }
  }, [router, searchParams]);

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 text-center">
      {status === 'processing' && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#00d166]/30 border-t-[#006d32] animate-spin" />
          <h2 className="text-xl font-bold text-[#0b1c30]">Signing in with Google</h2>
          <p className="text-sm text-slate-500">
            Connecting your account and preparing your dashboard...
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#e8f5e9] text-[#006d32] flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">check_circle</span>
          </div>
          <h2 className="text-xl font-bold text-[#0b1c30]">Connected Successfully!</h2>
          <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#fde8e8] text-[#ba1a1a] flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">error</span>
          </div>
          <h2 className="text-xl font-bold text-[#ba1a1a]">Authentication Failed</h2>
          <p className="text-sm text-slate-600">{errorMessage}</p>
          <Link
            href="/login"
            className="mt-3 px-6 py-2.5 rounded-xl bg-[#006d32] text-white text-sm font-semibold hover:bg-[#005224] transition-colors"
          >
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow text-center">
            <div className="w-12 h-12 rounded-full border-4 border-[#00d166]/30 border-t-[#006d32] animate-spin mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-[#0b1c30]">Loading...</h2>
          </div>
        }
      >
        <AuthCallbackContent />
      </Suspense>
    </div>
  );
}
