'use client';

import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/helper/apiClient';

import type { Session, User } from 'better-auth';

export interface SessionResponse {
  session: Session | null;
  user: User | null;
}

/**
 * Client-side function to fetch session from API
 */
export const fetchSession = async (): Promise<SessionResponse> => {
  const response = await apiClient<SessionResponse>('/api/auth/session', {
    method: 'GET',
    credentials: 'include',
  });
  return response;
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
