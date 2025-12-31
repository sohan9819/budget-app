import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { DateRange } from '@/feature/stats/schema';
import { getBalanceStats, getCategoryStats } from '@/feature/stats/server';
import { createQueryKeys } from '@/lib/create-query-keys';

import { getHistoryPeriods } from '../server/get-history-periods';
import { getHistoryStats } from '../server/get-history-stats';
import { MonthHistoryData, Period, Timeframe, YearHistoryData } from '../types';

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
    queryFn: () => getBalanceStats(dateRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useCategoryStats = (dateRange: DateRange) => {
  return useQuery({
    queryKey: statsKeys.typeList(StatsType.CATEGORY, { dateRange }),
    queryFn: () => getCategoryStats(dateRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useHistoryPeriods = () => {
  return useQuery({
    queryKey: statsKeys.typeLists(StatsType.HISTORY),
    queryFn: () => getHistoryPeriods(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

// ---------- Overload Signatures ----------
export function useHistoryStats(
  timeframe: Timeframe.MONTH,
  { year, month }: Period,
): UseQueryResult<MonthHistoryData[]>;

export function useHistoryStats(
  timeframe: Timeframe.YEAR,
  { year, month }: Period,
): UseQueryResult<YearHistoryData[]>;
// ---------- Overload Signatures ----------

export function useHistoryStats(timeframe: Timeframe, period: Period) {
  return useQuery({
    queryKey: statsKeys.typeList(StatsType.HISTORY, {
      timeframe,
      period,
    }),
    queryFn: () => {
      switch (timeframe) {
        case Timeframe.MONTH:
          return getHistoryStats(Timeframe.MONTH, period);
        case Timeframe.YEAR:
          return getHistoryStats(Timeframe.YEAR, period);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
