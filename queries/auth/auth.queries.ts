'use client';

import { redirect } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

// import { apiClient } from '@/lib/api-client';
import { getSession } from '@/lib/auth-client';

import type { Session, User } from 'better-auth';

export interface SessionResponse {
  session: Session;
  user: User;
}

/**
 * Client-side function to fetch session from API
 */
export const fetchSession = async (): Promise<SessionResponse> => {
  // const data = await apiClient<SessionResponse>('/api/auth/session', {
  //   method: 'GET',
  //   credentials: 'include',
  // });
  const { data } = await getSession();

  if (!data?.session || !data?.user) {
    redirect('/sign-in');
  }

  return data;
};

/**
 * React Query hook for session management
 * This hook manages the session state with React Query's caching and refetching
 */
export const useSessionQuery = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: fetchSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
