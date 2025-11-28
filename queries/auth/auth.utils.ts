'use client';

import { useQueryClient } from '@tanstack/react-query';

/**
 * Utility hook to invalidate and refetch session after auth mutations
 * Use this after sign in, sign out, or any action that changes the session
 *
 * @example
 * ```tsx
 * const { invalidateSession } = useSessionUtils();
 *
 * const handleSignOut = async () => {
 *   await signOut();
 *   await invalidateSession();
 * };
 * ```
 */
export function useSessionUtils() {
  const queryClient = useQueryClient();

  const invalidateSession = async () => {
    await queryClient.invalidateQueries({ queryKey: ['session'] });
  };

  const refetchSession = async () => {
    await queryClient.refetchQueries({ queryKey: ['session'] });
  };

  return {
    invalidateSession,
    refetchSession,
  };
}
