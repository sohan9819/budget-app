import React, { ReactNode, useCallback, useMemo } from 'react';

import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import CountUp from 'react-countup';

import { SkeletonWrapper } from '@/components/skeleton-wrapper';
import { Card } from '@/components/ui/card';
import { GetFormatterForCurrency } from '@/feature/user-settings/lib/currencies';
import { UserSettings } from '@/feature/user-settings/schema';

import { useBalanceStats } from '../query';
import { DateRange } from '../schema';

interface BalanceStatsProps {
  userSettings: UserSettings;
  dateRange: DateRange;
}

export const BalanceStats = ({
  userSettings,
  dateRange,
}: BalanceStatsProps) => {
  const { data: balanceStats, isLoading } = useBalanceStats(dateRange);

  const formatter = useMemo(
    () => GetFormatterForCurrency(userSettings.currency),
    [userSettings.currency],
  );

  const income = balanceStats?.income || 0;
  const expense = balanceStats?.expense || 0;

  const balance = income - expense;

  return (
    <div className='relative flex w-full flex-wrap gap-2 md:flex-nowrap'>
      <SkeletonWrapper isLoading={isLoading}>
        <BalanceStatsCard
          formatter={formatter}
          value={income}
          title='Income'
          icon={
            <TrendingUp className='h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10' />
          }
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={isLoading}>
        <BalanceStatsCard
          formatter={formatter}
          value={expense}
          title='Expense'
          icon={
            <TrendingDown className='h-12 w-12 items-center rounded-lg p-2 text-destructive bg-destructive/10' />
          }
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={isLoading}>
        <BalanceStatsCard
          formatter={formatter}
          value={balance}
          title='Balance'
          icon={
            <Wallet className='h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10' />
          }
        />
      </SkeletonWrapper>
    </div>
  );
};

interface BalanceStatsCardProps {
  formatter: Intl.NumberFormat;
  icon: ReactNode;
  title: string;
  value: number;
}

const BalanceStatsCard = ({
  formatter,
  icon,
  title,
  value,
}: BalanceStatsCardProps) => {
  const formatFn = useCallback(
    (value: number) => formatter.format(value),
    [formatter],
  );
  return (
    <Card className='flex flex-row h-24 w-full items-center gap-2 p-4'>
      {icon}
      <div className='flex flex-col items-start'>
        <p className='text-muted-foreground'>{title}</p>
        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          formattingFn={formatFn}
          className='text-2xl'
        />
      </div>
    </Card>
  );
};
