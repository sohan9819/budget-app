import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type {
  PasswordStrengthIndicatorParams,
  PasswordStrengthLevel,
} from '@/components/password-strength-indicator';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }

  return message;
};

/**
 * Returns a password strength score between 0 and 4
 * 0 = Empty
 * 1 = Very Weak
 * 2 = Weak
 * 3 = Good
 * 4 = Strong
 */

export const getPasswordStrength = (
  password: string | null,
): PasswordStrengthIndicatorParams => {
  if (!password)
    return {
      strength: 0,
      hasLength: false,
      hasLowerAndUpper: false,
      hasNumber: false,
      hasSpecial: false,
    };

  let score = 0;

  // Length check
  if (password.length >= 12) score++;

  // Character diversity
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);

  if (hasLower && hasUpper) {
    score++;
  }

  const hasNumber = /\d/.test(password);
  const hasSpecial = /[`~<>?,./!@#$%^&*()\-_=+"'|{}[\];:\\]/.test(password);

  if (hasNumber) score++;
  if (hasSpecial) score++;

  // FOR DEBUGGING
  // console.log('###--------- Passowrd Strength ---------###');
  // console.table({
  //   password,
  //   score,
  //   length: password.length,
  //   hasLowerAndUpper: hasLower && hasUpper,
  //   hasNumber,
  //   hasSpecial,
  // });

  return {
    strength: score as PasswordStrengthLevel,
    hasLength: password.length >= 12,
    hasLowerAndUpper: hasLower && hasUpper,
    hasNumber,
    hasSpecial,
  };
};
