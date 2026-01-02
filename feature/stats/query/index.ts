import { useQuery } from '@tanstack/react-query';

import { DateRange } from '@/feature/stats/schema';
import { createQueryKeys } from '@/lib/create-query-keys';

import {
  getHistoryPeriodsFn,
  getBalanceStatsFn,
  getCategoryStatsFn,
  getHistoryStatsFn,
} from './queryFns';
import { GetHistoryStatsParam } from '../server';
import { Period, Timeframe } from '../types';

export enum StatsType {
  BALANCE = 'balance',
  CATEGORY = 'category',
  HISTORY = 'history',
}

export type CategoryFilters = {
  type: StatsType;
  dateRange: DateRange;
  timeframe: Timeframe;
  period: Period;
};

export const statsKeys = createQueryKeys<
  'stats',
  Partial<CategoryFilters>,
  StatsType
>('stats');

export const useBalanceStats = (dateRange: DateRange) => {
  return useQuery({
    queryKey: statsKeys.typeList(StatsType.BALANCE, { dateRange }),
    queryFn: () => getBalanceStatsFn(dateRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useCategoryStats = (dateRange: DateRange) => {
  return useQuery({
    queryKey: statsKeys.typeList(StatsType.CATEGORY, { dateRange }),
    queryFn: () => getCategoryStatsFn(dateRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useHistoryPeriods = () => {
  return useQuery({
    queryKey: statsKeys.typeLists(StatsType.HISTORY),
    queryFn: getHistoryPeriodsFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export function useHistoryStats(params: GetHistoryStatsParam) {
  return useQuery({
    queryKey: statsKeys.typeList(StatsType.HISTORY, params),
    queryFn: () => getHistoryStatsFn(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
