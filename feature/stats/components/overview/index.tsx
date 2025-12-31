'use client';

import React from 'react';

import { differenceInDays, startOfMonth } from 'date-fns';
import { atom, useAtom } from 'jotai';
// import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

import { DateRangePicker } from '@/components/ui/date-range-picker';
import { BalanceStats } from '@/feature/stats/components/balance-stats';
import { CategoryStats } from '@/feature/stats/components/category-stats';
import { MAX_DATE_RANGE_DAYS } from '@/feature/stats/components/overview/constants';
import { DateRange } from '@/feature/stats/schema';
import { UserSettings } from '@/feature/user-settings/schema';

interface OverviewProps {
  userSettings: UserSettings;
}

const dateRangeAtom = atom<DateRange>({
  from: startOfMonth(new Date()),
  to: new Date(),
});

export const Overview = ({ userSettings }: OverviewProps) => {
  const [dateRange, setDateRange] = useAtom(dateRangeAtom);

  return (
    <>
      <div className='container flex flex-wrap items-end justify-between gap-2 py-6 mx-auto px-6'>
        <h2 className='text-3xl font-black'>Overview</h2>
        <div className='flex items-center gap-3'>
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range;
              if (!from || !to) return;
              if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                toast.error(
                  `The selected date range is too big. Max allowd range is ${MAX_DATE_RANGE_DAYS} days!`,
                );
                return;
              }
              setDateRange({ from, to });
            }}
          />
        </div>
      </div>

      <div className='mx-auto px-4'>
        <BalanceStats userSettings={userSettings} dateRange={dateRange} />

        <CategoryStats userSettings={userSettings} dateRange={dateRange} />
      </div>
    </>
  );
};
