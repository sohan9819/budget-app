'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { AuthState } from '@/features/auth/atoms';
import { auth } from '@/features/auth/lib/auth';

export async function getAuthSession(): Promise<AuthState> {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionData?.session || !sessionData?.user) {
    redirect('/sign-in');
  }

  return sessionData;
}
