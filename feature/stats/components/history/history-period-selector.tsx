'use client';

import React from 'react';

import { useAtom } from 'jotai';

import { SkeletonWrapper } from '@/components/skeleton-wrapper';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { timeframeAtom } from '@/feature/stats/components/history';
import { YearSelector } from '@/feature/stats/components/history/year-selector';
import { Timeframe } from '@/feature/stats/types';

import { MonthSelector } from './month-selector';
import { useHistoryPeriods } from '../../query';

export const HistoryPeriodSelector = () => {
  const [timeframe, setTimeframe] = useAtom(timeframeAtom);

  const { data: historyPeriods = [], isLoading } = useHistoryPeriods();

  return (
    <div className='flex flex-wrap items-center gap-4'>
      <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
        <Tabs
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as Timeframe)}>
          <TabsList>
            {Object.values(Timeframe).map((timeframe, index) => (
              <TabsTrigger key={index} value={timeframe}>
                {timeframe}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </SkeletonWrapper>
      <div className='flex flex-wrap items-center gap-2'>
        <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
          <YearSelector years={historyPeriods} />
        </SkeletonWrapper>
        {timeframe === Timeframe.MONTH && (
          <SkeletonWrapper isLoading={isLoading} fullWidth={false}>
            <MonthSelector />
          </SkeletonWrapper>
        )}
      </div>
    </div>
  );
};
