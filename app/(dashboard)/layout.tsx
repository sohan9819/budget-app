import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Navbar from '@/components/navbar';
import { AuthProvider } from '@/components/providers/auth-provider';
import { auth } from '@/lib/auth';
import { getQueryClient } from '@/lib/get-query-client';
import { prefetchAuthSession } from '@/queries/auth.prefetch';
import type { SessionResponse } from '@/queries/auth.queries';
import { prefetchUserSettings } from '@/queries/user-settings.prefetch';
import { getUserSettings } from '@/server/user-settings';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch session once on the server
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

  const userSettings = await getUserSettings();
  const queryClient = getQueryClient();

  // Prefetch both session and user settings into React Query cache
  prefetchAuthSession(queryClient, sessionResponse);
  prefetchUserSettings(queryClient, userSettings);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AuthProvider session={sessionData.session} user={sessionData.user}>
        <div className='relative flex h-screen w-full flex-col'>
          <Navbar />
          <div className='w-full max-w-sm'>{children}</div>
        </div>
      </AuthProvider>
    </HydrationBoundary>
  );
}
