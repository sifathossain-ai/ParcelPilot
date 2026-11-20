import axios from 'axios';
import { api } from './api';
import type { Language } from './validation';

export interface RegisterPayload {
  fullName: string;
  shopName: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  shopName: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: AuthUser;
}

const TOKEN_STORAGE_KEY = 'parcelpilot_token';
const USER_STORAGE_KEY = 'parcelpilot_user';
const REMEMBER_EMAIL_KEY = 'parcelpilot_remember_email';

export async function loginMerchant(
  payload: LoginPayload,
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);
  return data;
}

export async function registerMerchant(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/register', payload);
  return data;
}

export function saveAuthSession(
  token: string,
  user: AuthUser,
  remember = true,
): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      shopName: user.shopName,
    }),
  );
  if (remember) {
    localStorage.setItem(REMEMBER_EMAIL_KEY, user.email);
  } else {
    localStorage.removeItem(REMEMBER_EMAIL_KEY);
  }
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
}

export function extractAuthError(error: unknown, lang: Language = 'EN'): string {
  const isBn = lang === 'BN';

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return isBn
        ? 'সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি। ব্যাকএন্ড সার্ভার চালু আছে কিনা নিশ্চিত করুন।'
        : 'Unable to reach the ParcelPilot server. Please check that the backend service is running and try again.';
    }

    const status = error.response.status;
    const responseData = error.response.data as
      | { message?: string | string[] }
      | undefined;

    if (status === 409) {
      return isBn
        ? 'এই ইমেইল ঠিকানা দিয়ে ইতিমধ্যেই একটি অ্যাকাউন্ট রয়েছে।'
        : 'An account with this work email already exists. Try signing in instead.';
    }

    if (responseData?.message) {
      if (Array.isArray(responseData.message)) {
        return responseData.message[0] || (isBn ? 'তথ্য যাচাই ব্যর্থ হয়েছে।' : 'Please check your input and try again.');
      }
      if (typeof responseData.message === 'string') {
        return responseData.message;
      }
    }
  }

  return isBn
    ? 'অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
    : 'Something went wrong while creating your account. Please try again.';
}
