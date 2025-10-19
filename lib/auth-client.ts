import { createAuthClient } from 'better-auth/react';
export const {
  signIn,
  signUp,
  useSession,
  signOut,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
  deleteUser,
} = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
});

export const googleSignIn = async () => {
  return await signIn.social({
    provider: 'google',
  });
};

export const githubSignIn = async () => {
  return await signIn.social({
    provider: 'github',
  });
};
