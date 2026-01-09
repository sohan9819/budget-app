'use client';

import { useMemo } from 'react';

import { atom, useAtomValue } from 'jotai';

import { SkeletonWrapper } from '@/components/skeleton-wrapper';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MonthHistoryData,
  Period,
  Timeframe,
  YearHistoryData,
} from '@/feature/stats/types';
import { userSettingsAtom } from '@/feature/user-settings/atoms';
import { GetFormatterForCurrency } from '@/feature/user-settings/lib/currencies';

import { HistoryPeriodSelector } from './history-period-selector';
import { useHistoryStats } from '../../query';
import { HistoryBarChart } from '../chart';

export const timeframeAtom = atom<Timeframe>(Timeframe.MONTH);
export const periodAtom = atom<Period>({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
});

export const History = () => {
  const timeframe = useAtomValue(timeframeAtom);
  const period = useAtomValue(periodAtom);
  const userSettings = useAtomValue(userSettingsAtom);

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const { data: historyStats, isLoading } = useHistoryStats({
    timeframe,
    period,
  });
  const statsAvailable = historyStats && historyStats.length > 0;

  const renderChart = () => {
    if (timeframe === Timeframe.MONTH) {
      return (
        <HistoryBarChart
          timeframe={Timeframe.MONTH}
          data={historyStats as MonthHistoryData[]}
          formatter={formatter}
        />
      );
    } else {
      return (
        <HistoryBarChart
          timeframe={Timeframe.YEAR}
          data={historyStats as YearHistoryData[]}
          formatter={formatter}
        />
      );
    }
  };

  return (
    <>
      <div className='container flex-wrap items-end justify-between gap-2 py-6 mx-auto px-6 hidden md:flex'>
        <h2 className='text-3xl font-bold'>History</h2>
      </div>

      <div className='mx-auto px-4 hidden md:block'>
        <Card className='mt-2 w-full'>
          <CardHeader>
            <CardTitle className='grid grid-flow-row justify-between gap-2 md:grid-flow-col'>
              <HistoryPeriodSelector />

              <div className='flex h-10 gap-2'>
                <Badge
                  variant={'outline'}
                  className='flex items-center gap-2 text-sm'>
                  <div className='h-4 w-4 rounded-full bg-emerald-500'></div>
                  Income
                </Badge>
                <Badge
                  variant={'outline'}
                  className='flex items-center gap-2 text-sm'>
                  <div className='h-4 w-4 rounded-full bg-destructive'></div>
                  Expense
                </Badge>
              </div>
            </CardTitle>
            <CardContent>
              <SkeletonWrapper isLoading={isLoading}>
                {statsAvailable && renderChart()}
                {!statsAvailable && (
                  <Card className='flex h-[400px] flex-col items-center justify-center bg-background gap-4'>
                    <CardTitle>No data for the selected period</CardTitle>
                    <CardContent className='text-sm text-muted-foreground'>
                      Try selecting a different period or adding new transaction
                    </CardContent>
                  </Card>
                )}
              </SkeletonWrapper>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};
