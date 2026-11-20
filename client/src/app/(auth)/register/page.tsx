'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  evaluatePassword,
  validateField,
  validateRegistrationForm,
  type Language,
  type RegistrationErrors,
  type RegistrationField,
  type RegistrationFormValues,
} from '@/lib/validation';
import {
  extractAuthError,
  registerMerchant,
  saveAuthSession,
} from '@/lib/auth';

type LegalModalType = 'terms' | 'privacy' | null;

const COPY = {
  EN: {
    brandSubtitle: 'AI Logistics Dispatch',
    support: 'Support',
    backHome: 'Back to Home',
    badge: 'Fast Setup • 100 Free Extractions',
    title: 'Create your Merchant Account',
    subtitle: 'Automate address extraction and Steadfast bookings seamlessly.',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'Tanvir Ahmed',
    shopNameLabel: 'Business Name',
    shopNamePlaceholder: 'e.g. Dhaka Trends',
    emailLabel: 'Work Email',
    emailPlaceholder: 'merchant@brand.com',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••••••',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Re-enter your password',
    passwordHint: 'Min. 8 characters',
    strength: {
      idle: 'Min. 8 characters',
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong',
    },
    requirements: {
      minLength: '8+ characters',
      hasUpper: 'Uppercase (A-Z)',
      hasLower: 'Lowercase (a-z)',
      hasNumber: 'Number (0-9)',
      hasSpecial: 'Special (@#$!%)',
    },
    termsPrefix: 'I agree to the',
    termsLink: 'Terms of Service',
    termsAnd: 'and',
    privacyLink: 'Privacy Policy',
    ctaIdle: 'Create Account',
    ctaSubmitting: 'Setting up Workspace...',
    ctaSuccess: 'Account Created! Redirecting...',
    alreadyHaveAccount: 'Already have an account?',
    signIn: 'Sign In',
    encrypted: 'Encrypted',
    steadfastReady: 'Steadfast API Ready',
    copyright: '© 2026 ParcelPilot Technologies Ltd. Built for BD F-Commerce.',
    courierIntegrations: 'Courier Integrations',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    passwordsMatch: 'Passwords match',
    closeModal: 'Close',
  },
  BN: {
    brandSubtitle: 'এআই লজিস্টিকস ডিসপ্যাচ',
    support: 'সাপোর্ট',
    backHome: 'হোমে ফিরুন',
    badge: 'দ্রুত সেটআপ • ১০০ ফ্রি এক্সট্র্যাকশন',
    title: 'মার্চেন্ট অ্যাকাউন্ট তৈরি করুন',
    subtitle: 'স্বয়ংক্রিয় ঠিকানা এক্সট্র্যাকশন এবং স্টেডফাস্ট বুকিং শুরু করুন সহজেই।',
    fullNameLabel: 'পূর্ণ নাম',
    fullNamePlaceholder: 'তানভীর আহমেদ',
    shopNameLabel: 'ব্যবসার নাম',
    shopNamePlaceholder: 'যেমন: ঢাকা ট্রেন্ডস',
    emailLabel: 'কাজের ইমেইল',
    emailPlaceholder: 'merchant@brand.com',
    passwordLabel: 'পাসওয়ার্ড',
    passwordPlaceholder: '••••••••••••',
    confirmPasswordLabel: 'পাসওয়ার্ড নিশ্চিত করুন',
    confirmPasswordPlaceholder: 'পাসওয়ার্ডটি আবার লিখুন',
    passwordHint: 'কমপক্ষে ৮ অক্ষর',
    strength: {
      idle: 'কমপক্ষে ৮ অক্ষর',
      weak: 'দুর্বল',
      fair: 'মোটামুটি',
      good: 'ভালো',
      strong: 'শক্তিশালী',
    },
    requirements: {
      minLength: '৮+ অক্ষর',
      hasUpper: 'বড় হাতের (A-Z)',
      hasLower: 'ছোট হাতের (a-z)',
      hasNumber: 'সংখ্যা (0-9)',
      hasSpecial: 'বিশেষ চিহ্ন (@#$!%)',
    },
    termsPrefix: 'আমি সম্মত আছি',
    termsLink: 'সেবার শর্তাবলী',
    termsAnd: 'এবং',
    privacyLink: 'গোপনীয়তা নীতি',
    ctaIdle: 'অ্যাকাউন্ট তৈরি করুন',
    ctaSubmitting: 'ওয়ার্কস্পেস তৈরি হচ্ছে...',
    ctaSuccess: 'অ্যাকাউন্ট তৈরি হয়েছে! ড্যাশবোর্ডে যাচ্ছে...',
    alreadyHaveAccount: 'ইতিমধ্যেই অ্যাকাউন্ট আছে?',
    signIn: 'সাইন ইন',
    encrypted: 'এনক্রিপ্টেড',
    steadfastReady: 'স্টেডফাস্ট API রেডি',
    copyright: '© ২০২৬ ParcelPilot Technologies Ltd. বাংলাদেশের F-Commerce-এর জন্য নির্মিত।',
    courierIntegrations: 'কুরিয়ার ইন্টিগ্রেশন',
    showPassword: 'পাসওয়ার্ড দেখুন',
    hidePassword: 'পাসওয়ার্ড লুকান',
    passwordsMatch: 'পাসওয়ার্ড মিলেছে',
    closeModal: 'বন্ধ করুন',
  },
} as const;

export default function RegisterPage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>('EN');
  const t = COPY[lang];

  const [values, setValues] = useState<RegistrationFormValues>({
    fullName: '',
    shopName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [touched, setTouched] = useState<Partial<Record<RegistrationField, boolean>>>({});
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);

  const passwordEval = useMemo(
    () => evaluatePassword(values.password),
    [values.password],
  );

  const handleFieldChange = (
    field: RegistrationField,
    value: string | boolean,
  ) => {
    const nextValues = { ...values, [field]: value } as RegistrationFormValues;
    setValues(nextValues);
    setServerError(null);

    if (touched[field]) {
      const nextError = validateField(field, nextValues, lang);
      setErrors((prev) => ({ ...prev, [field]: nextError }));
    }

    if (field === 'password' && touched.confirmPassword) {
      const confirmError = validateField('confirmPassword', nextValues, lang);
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleBlur = (field: RegistrationField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, values, lang);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleLanguageChange = (nextLang: Language) => {
    setLang(nextLang);
    // Re-translate any currently visible validation errors
    const nextErrors: RegistrationErrors = {};
    (Object.keys(touched) as RegistrationField[]).forEach((field) => {
      if (touched[field]) {
        const err = validateField(field, values, nextLang);
        if (err) nextErrors[field] = err;
      }
    });
    setErrors(nextErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== 'idle') return;

    const allTouched: Record<RegistrationField, boolean> = {
      fullName: true,
      shopName: true,
      email: true,
      password: true,
      confirmPassword: true,
      termsAccepted: true,
    };
    setTouched(allTouched);

    const validationErrors = validateRegistrationForm(values, lang);
    setErrors(validationErrors);
    setServerError(null);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');
    try {
      const response = await registerMerchant({
        fullName: values.fullName.trim(),
        shopName: values.shopName.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
        termsAccepted: values.termsAccepted,
      });

      saveAuthSession(response.token, response.user);
      setStatus('success');

      window.setTimeout(() => {
        router.push('/dashboard');
      }, 850);
    } catch (error) {
      setStatus('idle');
      setServerError(extractAuthError(error, lang));
    }
  };

  const strengthBarClass =
    passwordEval.level === 'weak'
      ? 'bg-[#ba1a1a]'
      : passwordEval.level === 'fair'
        ? 'bg-amber-500'
        : passwordEval.level === 'good'
          ? 'bg-[#0059bb]'
          : passwordEval.level === 'strong'
            ? 'bg-[#00d166]'
            : 'bg-[#6c7b6c]';

  const strengthLabelClass =
    passwordEval.level === 'weak'
      ? 'text-[#ba1a1a] font-semibold'
      : passwordEval.level === 'fair'
        ? 'text-amber-600 font-semibold'
        : passwordEval.level === 'good'
          ? 'text-[#0059bb] font-semibold'
          : passwordEval.level === 'strong'
            ? 'text-[#006d32] font-bold'
            : 'text-[#3c4a3d] font-medium';

  const inputBaseClass =
    'w-full h-11 rounded-lg bg-[#eff4ff] border text-[#0b1c30] placeholder:text-[#6c7b6c] text-[14px] leading-5 focus:bg-white focus:outline-none focus:ring-2 transition-all';

  const getInputStateClass = (field: RegistrationField) =>
    errors[field]
      ? 'border-[#ba1a1a] bg-[#fff8f7] focus:border-[#ba1a1a] focus:ring-[#ba1a1a]/20'
      : 'border-[#dce9ff]/70 focus:border-[#0059bb] focus:ring-[#0059bb]/20';

  const showPasswordChecklist = passwordFocused || values.password.length > 0;
  const confirmMatches =
    values.confirmPassword.length > 0 &&
    values.confirmPassword === values.password;

  return (
    <div
      className={`min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col justify-between selection:bg-[#00d166]/30 selection:text-[#00210b] ${
        lang === 'BN' ? 'font-bangla' : ''
      }`}
    >
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#f8f9ff]/85 backdrop-blur-xl border-b border-[#bbcbb9]/25 shadow-[0_1px_8px_rgba(11,28,48,0.04)]">
        <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-[#006d32] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">
                local_shipping
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[18px] font-bold text-[#0b1c30] leading-none tracking-tight">
                ParcelPilot
              </span>
              <span className="text-[12px] font-medium text-[#3c4a3d] leading-none mt-1">
                {t.brandSubtitle}
              </span>
            </div>
          </Link>

          {/* Header Controls */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Language Switcher */}
            <div
              className="inline-flex items-center bg-[#eff4ff] p-1 rounded-full border border-[#dce9ff] shrink-0"
              role="group"
              aria-label="Language switcher"
            >
              <button
                type="button"
                onClick={() => handleLanguageChange('EN')}
                className={`px-2.5 py-0.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  lang === 'EN'
                    ? 'bg-white text-[#0b1c30] shadow-xs'
                    : 'text-[#3c4a3d] hover:text-[#0b1c30]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('BN')}
                className={`px-2.5 py-0.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  lang === 'BN'
                    ? 'bg-white text-[#0b1c30] shadow-xs'
                    : 'text-[#3c4a3d] hover:text-[#0b1c30]'
                }`}
              >
                বাংলা
              </button>
            </div>

            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center gap-1 text-[13px] font-semibold text-[#3c4a3d] hover:text-[#006d32] whitespace-nowrap transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">help</span>
              <span>{t.support}</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0059bb] hover:text-[#0b1c30] whitespace-nowrap transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              <span className="hidden xs:inline sm:inline">{t.backHome}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1 flex flex-col items-center justify-center pt-24 pb-10 px-4 sm:px-6">
        <div className="w-full max-w-[440px] mx-auto flex flex-col items-center">
          {/* Hero Heading */}
          <div className="text-center mb-6 flex flex-col items-center gap-1.5">
            <div className="inline-flex items-center gap-2 bg-[#eff4ff] border border-[#dce9ff] px-3 py-1 rounded-full shadow-2xs mb-1">
              <span className="w-2 h-2 rounded-full bg-[#00d166] animate-pulse" />
              <span className="text-[12px] font-semibold tracking-[0.02em] text-[#3c4a3d]">
                {t.badge}
              </span>
            </div>
            <h1 className="text-[28px] sm:text-[32px] leading-[1.2] tracking-[-0.02em] font-bold text-[#0b1c30]">
              {t.title}
            </h1>
            <p className="text-[14px] leading-5 text-[#3c4a3d] max-w-sm mt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Registration Card */}
          <div className="w-full bg-white rounded-2xl shadow-[0_12px_36px_-10px_rgba(11,28,48,0.10)] border border-[#bbcbb9]/35 p-6 sm:p-8 flex flex-col">
            {serverError && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-2.5 rounded-xl bg-[#ffdad6]/70 border border-[#ba1a1a]/30 px-3.5 py-3 text-[13px] text-[#93000a]"
              >
                <span className="material-symbols-outlined text-[18px] text-[#ba1a1a] shrink-0 mt-0.5">
                  error
                </span>
                <span className="leading-snug font-medium">{serverError}</span>
              </div>
            )}

            <form
              id="merchant-registration-form"
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4"
            >
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="merchant-name"
                  className="text-[13px] font-semibold text-[#0b1c30]"
                >
                  {t.fullNameLabel}
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined text-[18px] text-[#6c7b6c] absolute left-3.5 pointer-events-none">
                    person
                  </span>
                  <input
                    id="merchant-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    value={values.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    placeholder={t.fullNamePlaceholder}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'merchant-name-error' : undefined}
                    disabled={status !== 'idle'}
                    className={`${inputBaseClass} pl-10 pr-3.5 ${getInputStateClass('fullName')}`}
                  />
                </div>
                {errors.fullName && (
                  <p
                    id="merchant-name-error"
                    className="text-[12px] font-medium text-[#ba1a1a] flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Business Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="shop-name"
                  className="text-[13px] font-semibold text-[#0b1c30]"
                >
                  {t.shopNameLabel}
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined text-[18px] text-[#6c7b6c] absolute left-3.5 pointer-events-none">
                    storefront
                  </span>
                  <input
                    id="shop-name"
                    name="shopName"
                    type="text"
                    autoComplete="organization"
                    maxLength={100}
                    value={values.shopName}
                    onChange={(e) => handleFieldChange('shopName', e.target.value)}
                    onBlur={() => handleBlur('shopName')}
                    placeholder={t.shopNamePlaceholder}
                    aria-invalid={Boolean(errors.shopName)}
                    aria-describedby={errors.shopName ? 'shop-name-error' : undefined}
                    disabled={status !== 'idle'}
                    className={`${inputBaseClass} pl-10 pr-3.5 ${getInputStateClass('shopName')}`}
                  />
                </div>
                {errors.shopName && (
                  <p
                    id="shop-name-error"
                    className="text-[12px] font-medium text-[#ba1a1a] flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    <span>{errors.shopName}</span>
                  </p>
                )}
              </div>

              {/* Work Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="merchant-email"
                  className="text-[13px] font-semibold text-[#0b1c30]"
                >
                  {t.emailLabel}
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined text-[18px] text-[#6c7b6c] absolute left-3.5 pointer-events-none">
                    mail
                  </span>
                  <input
                    id="merchant-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={254}
                    value={values.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder={t.emailPlaceholder}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'merchant-email-error' : undefined}
                    disabled={status !== 'idle'}
                    className={`${inputBaseClass} pl-10 pr-3.5 ${getInputStateClass('email')}`}
                  />
                </div>
                {errors.email && (
                  <p
                    id="merchant-email-error"
                    className="text-[12px] font-medium text-[#ba1a1a] flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="merchant-password"
                    className="text-[13px] font-semibold text-[#0b1c30]"
                  >
                    {t.passwordLabel}
                  </label>
                  <span
                    id="password-strength-label"
                    className={`text-[12px] transition-colors ${strengthLabelClass}`}
                  >
                    {t.strength[passwordEval.level]}
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined text-[18px] text-[#6c7b6c] absolute left-3.5 pointer-events-none">
                    lock
                  </span>
                  <input
                    id="merchant-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    maxLength={128}
                    value={values.password}
                    onChange={(e) => handleFieldChange('password', e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => {
                      setPasswordFocused(false);
                      handleBlur('password');
                    }}
                    placeholder={t.passwordPlaceholder}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby="password-strength-label password-requirements"
                    disabled={status !== 'idle'}
                    className={`${inputBaseClass} pl-10 pr-11 ${getInputStateClass('password')}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? t.hidePassword : t.showPassword}
                    className="absolute right-3 p-1 text-[#6c7b6c] hover:text-[#0b1c30] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                {/* Strength Progress Bar */}
                <div className="w-full h-1.5 bg-[#e5eeff] rounded-full mt-0.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${strengthBarClass}`}
                    style={{ width: `${passwordEval.percent}%` }}
                  />
                </div>

                {/* Live Password Requirements Checklist */}
                {showPasswordChecklist && (
                  <ul
                    id="password-requirements"
                    className="grid grid-cols-2 gap-x-3 gap-y-1 pt-1 text-[11.5px]"
                  >
                    {(
                      [
                        ['minLength', t.requirements.minLength],
                        ['hasUpper', t.requirements.hasUpper],
                        ['hasLower', t.requirements.hasLower],
                        ['hasNumber', t.requirements.hasNumber],
                        ['hasSpecial', t.requirements.hasSpecial],
                      ] as const
                    ).map(([key, label]) => {
                      const met = passwordEval.checks[key];
                      return (
                        <li
                          key={key}
                          className={`flex items-center gap-1 transition-colors ${
                            met ? 'text-[#006d32] font-medium' : 'text-[#6c7b6c]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {met ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span>{label}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {errors.password && (
                  <p className="text-[12px] font-medium text-[#ba1a1a] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="confirm-password"
                    className="text-[13px] font-semibold text-[#0b1c30]"
                  >
                    {t.confirmPasswordLabel}
                  </label>
                  {confirmMatches && !errors.confirmPassword && (
                    <span className="text-[12px] font-medium text-[#006d32] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px]">
                        check_circle
                      </span>
                      <span>{t.passwordsMatch}</span>
                    </span>
                  )}
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined text-[18px] text-[#6c7b6c] absolute left-3.5 pointer-events-none">
                    verified_user
                  </span>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    maxLength={128}
                    value={values.confirmPassword}
                    onChange={(e) =>
                      handleFieldChange('confirmPassword', e.target.value)
                    }
                    onBlur={() => handleBlur('confirmPassword')}
                    placeholder={t.confirmPasswordPlaceholder}
                    aria-invalid={Boolean(errors.confirmPassword)}
                    aria-describedby={
                      errors.confirmPassword ? 'confirm-password-error' : undefined
                    }
                    disabled={status !== 'idle'}
                    className={`${inputBaseClass} pl-10 pr-11 ${getInputStateClass('confirmPassword')}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword ? t.hidePassword : t.showPassword
                    }
                    className="absolute right-3 p-1 text-[#6c7b6c] hover:text-[#0b1c30] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showConfirmPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p
                    id="confirm-password-error"
                    className="text-[12px] font-medium text-[#ba1a1a] flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    <span>{errors.confirmPassword}</span>
                  </p>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="flex flex-col gap-1 pt-0.5">
                <div className="flex items-start gap-2.5">
                  <input
                    id="terms-agree"
                    name="termsAccepted"
                    type="checkbox"
                    checked={values.termsAccepted}
                    onChange={(e) => {
                      setTouched((prev) => ({ ...prev, termsAccepted: true }));
                      handleFieldChange('termsAccepted', e.target.checked);
                    }}
                    aria-invalid={Boolean(errors.termsAccepted)}
                    disabled={status !== 'idle'}
                    className="mt-0.5 w-4 h-4 rounded border-[#bbcbb9] text-[#006d32] accent-[#006d32] focus:ring-[#006d32] cursor-pointer shrink-0"
                  />
                  <label
                    htmlFor="terms-agree"
                    className="text-[12.5px] leading-snug text-[#3c4a3d] cursor-pointer select-none"
                  >
                    {t.termsPrefix}{' '}
                    <button
                      type="button"
                      onClick={() => setLegalModal('terms')}
                      className="text-[#0059bb] font-semibold hover:underline cursor-pointer"
                    >
                      {t.termsLink}
                    </button>{' '}
                    {t.termsAnd}{' '}
                    <button
                      type="button"
                      onClick={() => setLegalModal('privacy')}
                      className="text-[#0059bb] font-semibold hover:underline cursor-pointer"
                    >
                      {t.privacyLink}
                    </button>
                    .
                  </label>
                </div>
                {errors.termsAccepted && (
                  <p className="text-[12px] font-medium text-[#ba1a1a] flex items-center gap-1 pl-6">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    <span>{errors.termsAccepted}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                id="create-account-btn"
                type="submit"
                disabled={status !== 'idle'}
                className={`w-full h-11 rounded-lg text-[15px] font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-md mt-1 cursor-pointer disabled:cursor-not-allowed ${
                  status === 'success'
                    ? 'bg-[#006d32] text-white shadow-[#006d32]/25'
                    : 'bg-[#00d166] hover:bg-[#00be5c] text-[#00210b] shadow-[#00d166]/25 disabled:opacity-75'
                }`}
              >
                {status === 'submitting' && (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">
                      sync
                    </span>
                    <span>{t.ctaSubmitting}</span>
                  </>
                )}
                {status === 'success' && (
                  <>
                    <span className="material-symbols-outlined text-[20px]">
                      check_circle
                    </span>
                    <span>{t.ctaSuccess}</span>
                  </>
                )}
                {status === 'idle' && (
                  <>
                    <span>{t.ctaIdle}</span>
                    <span className="material-symbols-outlined text-[20px]">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Sign In */}
          <div className="mt-5 text-center flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 text-[14px]">
              <span className="text-[#3c4a3d]">{t.alreadyHaveAccount}</span>
              <Link
                href="/login"
                className="text-[#0059bb] hover:text-[#0b1c30] font-bold hover:underline transition-colors"
              >
                {t.signIn}
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Terms / Privacy Info Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1c30]/45 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white border border-[#bbcbb9]/40 shadow-2xl p-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h2
                id="legal-modal-title"
                className="text-[18px] font-bold text-[#0b1c30]"
              >
                {legalModal === 'terms' ? t.termsLink : t.privacyLink}
              </h2>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                aria-label={t.closeModal}
                className="p-1 rounded-lg text-[#3c4a3d] hover:bg-[#eff4ff] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-3 text-[13.5px] leading-relaxed text-[#3c4a3d] max-h-[60vh] overflow-y-auto pr-1">
              {legalModal === 'terms' ? (
                <>
                  <p>
                    By creating a ParcelPilot merchant account, you agree to use
                    the platform solely for legitimate order processing, AI
                    address structuring, and courier booking automation.
                  </p>
                  <p>
                    You are responsible for keeping your account password and
                    third-party courier API credentials confidential. Free tier
                    accounts include 100 monthly AI address extractions.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    ParcelPilot encrypts merchant passwords using industry-standard
                    bcrypt hashing and never stores plain-text credentials.
                  </p>
                  <p>
                    Customer delivery addresses pasted into ParcelPilot are
                    processed exclusively to structure parcel orders and sync
                    with your chosen courier provider (such as Steadfast
                    Courier).
                  </p>
                </>
              )}
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 rounded-lg bg-[#006d32] hover:bg-[#005324] text-white text-[13px] font-semibold transition-colors cursor-pointer"
              >
                {t.closeModal}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
