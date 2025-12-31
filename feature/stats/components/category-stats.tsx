'use client';

import React, { useMemo } from 'react';

import { SkeletonWrapper } from '@/components/skeleton-wrapper';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCategoryStats } from '@/feature/stats/query';
import { DateRange } from '@/feature/stats/schema';
import { CategoryStatsData } from '@/feature/stats/server';
import { TransactionType } from '@/feature/transaction/types';
import { GetFormatterForCurrency } from '@/feature/user-settings/lib/currencies';
import { UserSettings } from '@/feature/user-settings/schema';

interface CategoryStatsProps {
  userSettings: UserSettings;
  dateRange: DateRange;
}

export const CategoryStats = ({
  userSettings,
  dateRange,
}: CategoryStatsProps) => {
  const { data: categoryStats, isLoading } = useCategoryStats(dateRange);

  const formatter = useMemo(
    () => GetFormatterForCurrency(userSettings.currency),
    [userSettings.currency],
  );

  return (
    <div className='flex w-full flex-wrap gap-2 md:flex-nowrap mt-2'>
      <SkeletonWrapper isLoading={isLoading}>
        {categoryStats && (
          <CategoryCard
            formatter={formatter}
            type={'income'}
            data={categoryStats}
          />
        )}
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={isLoading}>
        {categoryStats && (
          <CategoryCard
            formatter={formatter}
            type={'expense'}
            data={categoryStats}
          />
        )}
      </SkeletonWrapper>
    </div>
  );
};

interface CategoryCardProp {
  formatter: Intl.NumberFormat;
  type: TransactionType;
  data: CategoryStatsData;
}

export const CategoryCard = ({ formatter, type, data }: CategoryCardProp) => {
  const categoryStats = data.filter((el) => el.type === type);
  const total = categoryStats.reduce((acc, el) => acc + el.totalAmount, 0);
  return (
    <Card className='h-80 w-full col-span-6'>
      <CardHeader>
        <CardTitle className='grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col capitalize'>
          {type}s by category
        </CardTitle>
      </CardHeader>

      <div className='flex items-center justify-between gap-2'>
        {categoryStats.length === 0 ? (
          <div className='flex h-60 w-full flex-col items-center justify-center'>
            No data for the selected period
            <p className='text-sm text-muted-foreground'>
              Try selecting a different period or try adding new {type}
            </p>
          </div>
        ) : (
          <ScrollArea className='h-60 w-full px-4'>
            <div className='flex w-full flex-col gap-4 p-4'>
              {categoryStats.map((item) => {
                const amount = item.totalAmount || 0;
                const percentage = (amount * 100) / (total || amount);
                return (
                  <div key={item.category.id} className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between'>
                      <span className='flex items-center text-gray-400'>
                        {item.category.icon} {item.category.name}
                        <span className='ml-2 text-xs text-muted-foreground'>
                          {percentage.toFixed(0)}%
                        </span>
                      </span>
                      <span className='text-sm text-gray-400'>
                        {formatter.format(amount)}
                      </span>
                    </div>
                    <Progress value={percentage} type={type} />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  );
};
