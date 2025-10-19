// src/providers/SessionProvider.tsx
'use client';

import React, { useEffect } from 'react';

import { redirect } from 'next/navigation';

import { useSetAtom } from 'jotai';
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
  const { data: clientSession, isPending, error } = useSession();
  const setSession = useSetAtom(authSessionAtom);
  const setUser = useSetAtom(authUserAtom);

  useEffect(() => {
    if (session && user) {
      setSession(session);
      setUser(user);
    }

    if (error) {
      console.log('Auth Session Error : ', error);
    }

    if (!session && !clientSession?.session && !isPending) {
      setSession(null);
      setUser(null);
      toast.message('You have been logged out.', {
        description: 'Please sign in to continue using the application.',
      });
      redirect('/signin');
    }
  }, [clientSession, session, user, isPending, error, setSession, setUser]);

  return <>{children}</>;
}
