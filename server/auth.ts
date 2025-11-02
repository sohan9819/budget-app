'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import type { SessionResponse } from '@/queries/auth.queries';

export async function getAuthSession(): Promise<SessionResponse> {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionData?.session || !sessionData?.user) {
    redirect('/sign-in');
  }

  // Prepare session response for prefetching
  const sessionResponse: SessionResponse = {
    session: sessionData.session,
    user: sessionData.user,
  };

  return sessionResponse;
}
