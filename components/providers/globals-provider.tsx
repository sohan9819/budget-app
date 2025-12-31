'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { selectedCurrencyAtom } from '@/feature/user-settings/atoms';
import { CurrencyMap, Currency } from '@/feature/user-settings/lib/currencies';
import { getUserSettingsQueryOptions } from '@/feature/user-settings/query';

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
