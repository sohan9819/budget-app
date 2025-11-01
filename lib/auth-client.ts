import { createAuthClient } from 'better-auth/react';

import { Redirects } from '@/lib/redirects';

const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // baseURL: process.env.BETTER_AUTH_URL,
});

export const {
  signIn,
  signUp,
  useSession,
  signOut,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
  deleteUser,
} = authClient;

export const googleSignIn = async () => {
  return await signIn.social({
    provider: 'google',
    newUserCallbackURL: Redirects.onboarding,
  });
};

export const githubSignIn = async () => {
  return await signIn.social({
    provider: 'github',
    newUserCallbackURL: Redirects.onboarding,
  });
};
