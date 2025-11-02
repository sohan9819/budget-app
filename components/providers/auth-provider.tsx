'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAtomValue } from 'jotai';
import { toast } from 'sonner';

import {
  authSessionAtom,
  sessionErrorAtom,
  sessionLoadingAtom,
  sessionStatusAtom,
} from '@/atoms/authAtom';

import type { Session, User } from 'better-auth';

interface AuthProviderProps {
  children: React.ReactNode;
  session: Session | null;
  user: User | null;
}

/**
 * AuthProvider that integrates Jotai atoms with React Query
 * This provider:
 * - Session is already prefetched via HydrationBoundary in the layout
 * - Uses React Query for automatic refetching and caching
 * - Handles authentication state changes throughout the app
 */
export function AuthProvider({ children, session, user }: AuthProviderProps) {
  const router = useRouter();

  // Read atoms to trigger React Query subscription
  // Session data is already prefetched, so isLoading should be false on mount
  const isAuthenticated = useAtomValue(sessionStatusAtom);
  const isLoading = useAtomValue(sessionLoadingAtom);
  const error = useAtomValue(sessionErrorAtom);
  const clientSession = useAtomValue(authSessionAtom);

  // Handle logout / invalid session
  useEffect(() => {
    if (!isLoading && !session && !clientSession && !isAuthenticated) {
      console.log('Session cleared - redirecting to sign in');
      toast.error('You have been logged out.', {
        description: 'Please sign in to continue.',
      });
      router.push('/sign-in');
    }
  }, [isLoading, session, clientSession, isAuthenticated, router]);

  // Handle session errors gracefully
  useEffect(() => {
    if (error) {
      console.error('Session error:', error);
      toast.error('Session error', {
        description:
          error.message || 'An error occurred while fetching your session.',
      });
    }
  }, [error]);

  return <>{children}</>;
}
