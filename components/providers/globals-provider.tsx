'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { selectedCurrencyAtom } from '@/features/user-settings/atoms';
import { CurrencyMap, Currency } from '@/features/user-settings/lib/currencies';
import { getUserSettingsQueryOptions } from '@/features/user-settings/queries';

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const setSelectedCurrency = useSetAtom(selectedCurrencyAtom);

  const { data, isLoading, isFetching, isError, refetch } = useQuery(
    getUserSettingsQueryOptions(),
  );

  // Just to verify the data is been prefetched
  // const queryClient = useQueryClient();
  // const prefetchedData = queryClient.getQueryData(userSettingsKeys.all);

  // if (prefetchedData) {
  //   console.log('Query was prefetched and data is available:', prefetchedData);
  // } else {
  //   console.log('Query was not prefetched or data is not in cache.');
  // }

  useEffect(() => {
    if (data && !(isLoading || isFetching) && !isError) {
      setSelectedCurrency(CurrencyMap[data.currency as Currency['value']]);
    }
    if (isError) {
      refetch();
    }
  }, [data, isError, isFetching, isLoading, refetch, setSelectedCurrency]);

  return children;
}
