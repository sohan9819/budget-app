import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import Navbar from '@/components/navbar';
import { AuthProvider } from '@/components/providers/auth-provider';
import { GlobalProvider } from '@/components/providers/globals-provider';
import { getAuthSession } from '@/feature/auth/server/auth';
import { prefetchUserSettings } from '@/feature/user-settings/query/prefetch';
import { getQueryClient } from '@/lib/get-query-client';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch session once on the server
  const authState = await getAuthSession();

  // Create QueryClient instance for server
  const queryClient = getQueryClient();

  // Prefetch user settings
  await prefetchUserSettings(queryClient);

  // Dehydrate the query client state
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <AuthProvider authState={authState}>
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
