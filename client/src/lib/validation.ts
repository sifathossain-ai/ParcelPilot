export type Language = 'EN' | 'BN';

export interface PasswordChecks {
  minLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export type PasswordStrengthLevel = 'idle' | 'weak' | 'fair' | 'good' | 'strong';

export interface PasswordEvaluation {
  checks: PasswordChecks;
  passedCount: number;
  percent: number;
  level: PasswordStrengthLevel;
  isValid: boolean;
}

export interface RegistrationFormValues {
  fullName: string;
  shopName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export type RegistrationField = keyof RegistrationFormValues;
export type RegistrationErrors = Partial<Record<RegistrationField, string>>;

const FULL_NAME_REGEX = /^[\p{L}\p{M}\s.'-]+$/u;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function evaluatePassword(password: string): PasswordEvaluation {
  const checks: PasswordChecks = {
    minLength: password.length >= 8 && password.length <= 128,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };

  if (password.length === 0) {
    return {
      checks,
      passedCount: 0,
      percent: 0,
      level: 'idle',
      isValid: false,
    };
  }

  const passedCount = Object.values(checks).filter(Boolean).length;
  const isValid = passedCount === 5;

  let level: PasswordStrengthLevel;
  let percent: number;

  if (!checks.minLength || passedCount <= 2) {
    level = 'weak';
    percent = 25;
  } else if (passedCount === 3) {
    level = 'fair';
    percent = 50;
  } else if (passedCount === 4) {
    level = 'good';
    percent = 75;
  } else {
    level = 'strong';
    percent = 100;
  }

  return { checks, passedCount, percent, level, isValid };
}

export function validateField(
  field: RegistrationField,
  values: RegistrationFormValues,
  lang: Language = 'EN',
): string | undefined {
  const isBn = lang === 'BN';

  switch (field) {
    case 'fullName': {
      const trimmed = values.fullName.trim();
      if (!trimmed) {
        return isBn ? 'পূর্ণ নাম লিখুন।' : 'Full name is required.';
      }
      if (trimmed.length < 2) {
        return isBn
          ? 'পূর্ণ নাম কমপক্ষে ২ অক্ষরের হতে হবে।'
          : 'Full name must be at least 2 characters.';
      }
      if (trimmed.length > 100) {
        return isBn
          ? 'পূর্ণ নাম ১০০ অক্ষরের বেশি হতে পারবে না।'
          : 'Full name must not exceed 100 characters.';
      }
      if (!FULL_NAME_REGEX.test(trimmed)) {
        return isBn
          ? 'নামে শুধুমাত্র অক্ষর, স্পেস, ডট বা হাইফেন ব্যবহার করুন।'
          : 'Use only letters, spaces, dots, apostrophes, or hyphens.';
      }
      return undefined;
    }

    case 'shopName': {
      const trimmed = values.shopName.trim();
      if (!trimmed) {
        return isBn ? 'ব্যবসার নাম লিখুন।' : 'Business name is required.';
      }
      if (trimmed.length < 2) {
        return isBn
          ? 'ব্যবসার নাম কমপক্ষে ২ অক্ষরের হতে হবে।'
          : 'Business name must be at least 2 characters.';
      }
      if (trimmed.length > 100) {
        return isBn
          ? 'ব্যবসার নাম ১০০ অক্ষরের বেশি হতে পারবে না।'
          : 'Business name must not exceed 100 characters.';
      }
      return undefined;
    }

    case 'email': {
      const trimmed = values.email.trim();
      if (!trimmed) {
        return isBn ? 'ইমেইল ঠিকানা লিখুন।' : 'Work email is required.';
      }
      if (trimmed.length > 254 || !EMAIL_REGEX.test(trimmed)) {
        return isBn
          ? 'একটি সঠিক ইমেইল ঠিকানা লিখুন।'
          : 'Please enter a valid work email address.';
      }
      return undefined;
    }

    case 'password': {
      if (!values.password) {
        return isBn ? 'পাসওয়ার্ড লিখুন।' : 'Password is required.';
      }
      if (values.password.length > 128) {
        return isBn
          ? 'পাসওয়ার্ড ১২৮ অক্ষরের বেশি হতে পারবে না।'
          : 'Password must not exceed 128 characters.';
      }
      const evaluation = evaluatePassword(values.password);
      if (!evaluation.isValid) {
        return isBn
          ? 'কমপক্ষে ৮ অক্ষর, বড় হাতের অক্ষর, ছোট হাতের অক্ষর, সংখ্যা ও বিশেষ চিহ্ন ব্যবহার করুন।'
          : 'Use 8+ characters with uppercase, lowercase, a number, and a special character.';
      }
      return undefined;
    }

    case 'confirmPassword': {
      if (!values.confirmPassword) {
        return isBn ? 'পাসওয়ার্ডটি পুনরায় লিখুন।' : 'Please confirm your password.';
      }
      if (values.confirmPassword !== values.password) {
        return isBn ? 'পাসওয়ার্ড দুটি মিলছে না।' : 'Passwords do not match.';
      }
      return undefined;
    }

    case 'termsAccepted': {
      if (!values.termsAccepted) {
        return isBn
          ? 'এগিয়ে যেতে শর্তাবলী ও গোপনীয়তা নীতিতে সম্মত হোন।'
          : 'You must agree to the Terms of Service and Privacy Policy.';
      }
      return undefined;
    }

    default:
      return undefined;
  }
}

export function validateRegistrationForm(
  values: RegistrationFormValues,
  lang: Language = 'EN',
): RegistrationErrors {
  const fields: RegistrationField[] = [
    'fullName',
    'shopName',
    'email',
    'password',
    'confirmPassword',
    'termsAccepted',
  ];

  const errors: RegistrationErrors = {};
  for (const field of fields) {
    const error = validateField(field, values, lang);
    if (error) {
      errors[field] = error;
    }
  }
  return errors;
}
