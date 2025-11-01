'use client';

import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {/* <HydrationBoundary state={pageProps.dehydratedState}> */}
      {children}
      {/* </HydrationBoundary> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
