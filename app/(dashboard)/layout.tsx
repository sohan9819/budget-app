import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Navbar from '@/components/navbar';
import { AuthProvider } from '@/components/providers/auth-provider';
import { getQueryClient } from '@/lib/get-query-client';
import { prefetchAuthSession } from '@/queries/auth/auth.prefetch';
import { prefetchUserSettings } from '@/queries/user-settings/user-settings.prefetch';
import { getAuthSession } from '@/server/auth';
import { getUserSettings } from '@/server/user-settings';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch session once on the server
  const authSession = await getAuthSession();

  // Fetch user-settings once on the server
  const userSettings = await getUserSettings();

  // Create QueryClient instance for server
  const queryClient = getQueryClient();

  // Prefetch both session and user settings into React Query cache
  prefetchAuthSession(queryClient, authSession);
  prefetchUserSettings(queryClient, userSettings);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AuthProvider>
        <div className='relative flex h-screen w-full flex-col'>
          <Navbar />
          <div className='w-full'>{children}</div>
        </div>
      </AuthProvider>
    </HydrationBoundary>
  );
}
