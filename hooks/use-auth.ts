'use client';

import { useAtomValue } from 'jotai';

import {
  authSessionAtom,
  authUserAtom,
  sessionStatusAtom,
  sessionLoadingAtom,
  sessionErrorAtom,
} from '@/atoms/authAtom';

/**
 * Custom hook to easily access authentication state throughout the app
 * This hook provides:
 * - session: The current session object
 * - user: The current user object
 * - isAuthenticated: Boolean indicating if user is logged in
 * - isLoading: Boolean indicating if session is being fetched
 * - error: Error object if session fetch failed
 *
 * @example
 * ```tsx
 * const { user, isAuthenticated, isLoading } = useAuth();
 *
 * if (isLoading) return <Spinner />;
 * if (!isAuthenticated) return <SignIn />;
 * return <Dashboard user={user} />;
 * ```
 */
export function useAuth() {
  const session = useAtomValue(authSessionAtom);
  const user = useAtomValue(authUserAtom);
  const isAuthenticated = useAtomValue(sessionStatusAtom);
  const isLoading = useAtomValue(sessionLoadingAtom);
  const error = useAtomValue(sessionErrorAtom);

  return {
    session,
    user,
    isAuthenticated,
    isLoading,
    error,
  };
}

