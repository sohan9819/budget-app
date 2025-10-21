// src/providers/SessionProvider.tsx
'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { toast } from 'sonner';

import { authSessionAtom, authUserAtom } from '@/atoms/authAtom';
import { useSession } from '@/lib/auth-client';

import type { Session, User } from 'better-auth';

interface SessionProviderProps {
  children: React.ReactNode;
  session: Session;
  user: User;
}

export function AuthProvider({
  children,
  session,
  user,
}: SessionProviderProps) {
  useHydrateAtoms([
    [authSessionAtom, session],
    [authUserAtom, user],
  ]);

  const { data: clientSession, isPending, error } = useSession();
  const setSession = useSetAtom(authSessionAtom);
  const setUser = useSetAtom(authUserAtom);

  const router = useRouter();

  // ✅ Initialize from server data
  useEffect(() => {
    if (session && user) {
      setSession(session);
      setUser(user);
    }
  }, [session, user, setSession, setUser]);

  // ✅ Sync client session updates
  // This could be only needed when update user profile features are added
  // useEffect(() => {
  //   if (clientSession?.session && clientSession?.user) {
  //     setSession(clientSession.session);
  //     setUser(clientSession.user);
  //   }
  // }, [clientSession, setSession, setUser]);

  // ✅ Handle logout / invalid session
  useEffect(() => {
    if (!isPending && !session && !clientSession?.session) {
      setSession(null);
      setUser(null);
      console.log('Cleared Auth State');
      toast.error('You have been logged out.', {
        description: 'Please sign in to continue.',
      });
      router.push('/signin');
    }
  }, [isPending, session, clientSession, setSession, setUser, router]);

  // ✅ Handle session errors gracefully
  useEffect(() => {
    if (error) {
      // console.error('Better Auth session error:', error);
      toast.error('Better Auth session error:', {
        description: error.message,
      });
    }
  }, [error]);

  return children;
}
