import type {
  PasswordStrengthIndicatorParams,
  PasswordStrengthLevel,
} from '@/features/auth/components/password-strength-indicator';

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
