import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Navbar from '@/components/navbar';
import { AuthProvider } from '@/components/providers/auth-provider';
import { GlobalProvider } from '@/components/providers/globals-provider';
import { prefetchUserSettings } from '@/features/user-settings/queries/prefetch';
import { getQueryClient } from '@/lib/get-query-client';
import { prefetchAuthSession } from '@/queries/auth/auth.prefetch';
import { getAuthSession } from '@/server/auth';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch session once on the server
  const authSession = await getAuthSession();

  // Create QueryClient instance for server
  const queryClient = getQueryClient();

  // Prefetch both session and user settings into React Query cache
  prefetchAuthSession(queryClient, authSession);

  // Prefetch user settings
  await prefetchUserSettings(queryClient);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AuthProvider>
        <GlobalProvider>
          <div className='relative flex h-screen w-full flex-col'>
            <Navbar />
            <div className='w-full'>{children}</div>
          </div>
        </GlobalProvider>
      </AuthProvider>
    </HydrationBoundary>
  );
}
