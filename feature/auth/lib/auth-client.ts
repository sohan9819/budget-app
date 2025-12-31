import { createAuthClient } from 'better-auth/react';

import { Redirects } from '@/lib/redirects';

const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // ! Comment the below line to use relative URLs in better-auth and test authentication across devices in the same network
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.BETTER_AUTH_URL
      : undefined,
});

export const {
  signIn,
  signUp,
  useSession,
  getSession,
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
