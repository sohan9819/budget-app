'use client';

import React from 'react';

import { useHydrateAtoms } from 'jotai/utils';

import { authAtom, AuthState } from '@/feature/auth/atoms';

interface AuthProviderProps {
  authState: AuthState;
  children: React.ReactNode;
}

/**
 * AuthProvider that integrates Jotai atoms with React Query
 * This provider:
 * - Session is already prefetched via HydrationBoundary in the layout
 * - Uses React Query for automatic refetching and caching
 * - Handles authentication state changes throughout the app
 */
export function AuthProvider({ children, authState }: AuthProviderProps) {
  useHydrateAtoms([[authAtom, authState]]);

  return children;
}
