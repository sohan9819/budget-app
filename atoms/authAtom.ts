'use client';

import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';

import { fetchSession, SessionResponse } from '@/queries/auth/auth.queries';

import type { Session, User } from 'better-auth';

/**
 * Jotai atom integrated with React Query
 * This atom automatically manages fetching, caching, and refetching through React Query
 */
export const sessionQueryAtom = atomWithQuery(() => ({
  queryKey: ['session'],
  queryFn: fetchSession,
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: 1,
  refetchOnWindowFocus: true,
  refetchOnMount: true,
}));

/**
 * Derived atoms for easy access to session data
 */
export const sessionDataAtom = atom<SessionResponse | undefined>((get) => {
  const query = get(sessionQueryAtom);
  return query.data;
});

export const authSessionAtom = atom<Session | null>((get) => {
  const data = get(sessionDataAtom);
  return data?.session ?? null;
});

export const authUserAtom = atom<User | null>((get) => {
  const data = get(sessionDataAtom);
  return data?.user ?? null;
});

/**
 * Derived atom to check if user is authenticated
 */
export const sessionStatusAtom = atom<boolean>((get) => {
  const session = get(authSessionAtom);
  return session !== null;
});

/**
 * Derived atom to check if session is loading
 */
export const sessionLoadingAtom = atom<boolean>((get) => {
  const query = get(sessionQueryAtom);
  return query.isPending;
});

/**
 * Derived atom to get session error
 */
export const sessionErrorAtom = atom<Error | null>((get) => {
  const query = get(sessionQueryAtom);
  return query.error;
});
