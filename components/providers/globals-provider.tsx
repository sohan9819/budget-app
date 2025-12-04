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
