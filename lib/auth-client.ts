import { createAuthClient } from 'better-auth/react';
export const { signIn, signUp, useSession, signOut, sendVerificationEmail } =
  createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: 'http://localhost:3000',
  });

export const googleSignIn = async () => {
  const data = await signIn.social({
    provider: 'google',
  });
};

export const githubSignIn = async () => {
  const data = await signIn.social({
    provider: 'github',
  });
};
