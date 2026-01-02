'use client';

import { dalToQueryFn } from '@/dal/helpers';
import { DalError } from '@/dal/types';
import { DateRange } from '@/feature/stats/schema';
import {
  getHistoryPeriods,
  getBalanceStats,
  getCategoryStats,
  CategoryStatsData,
  getHistoryStats,
  GetHistoryStatsParam,
} from '@/feature/stats/server';

import { MonthHistoryData, YearHistoryData } from '../types';

export const getHistoryPeriodsFn = dalToQueryFn<unknown, number[], DalError>(
  getHistoryPeriods,
);

export const getBalanceStatsFn = dalToQueryFn<
  DateRange,
  {
    expense: number;
    income: number;
  },
  DalError
>(getBalanceStats);

export const getCategoryStatsFn = dalToQueryFn<
  DateRange,
  CategoryStatsData,
  DalError
>(getCategoryStats);

export const getHistoryStatsFn = dalToQueryFn<
  GetHistoryStatsParam,
  YearHistoryData[] | MonthHistoryData[],
  DalError
>(getHistoryStats);
