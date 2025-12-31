'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { AuthState } from '@/feature/auth/atoms';
import { auth } from '@/feature/auth/lib/auth';

export async function getAuthSession(): Promise<AuthState> {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionData?.session || !sessionData?.user) {
    redirect('/sign-in');
  }

  return sessionData;
}
