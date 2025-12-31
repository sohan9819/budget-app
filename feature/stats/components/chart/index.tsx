import React from 'react';

import { type ChartConfig } from '@/components/ui/chart';

import { MonthHistoryBarChart } from './monthBarChart';
import { YearHistoryBarChart } from './yearBarChart';
import { MonthHistoryData, Timeframe, YearHistoryData } from '../../types';

type HistoryBarChartProps =
  | {
      timeframe: Timeframe.MONTH;
      data: MonthHistoryData[];
      formatter: Intl.NumberFormat;
    }
  | {
      timeframe: Timeframe.YEAR;
      data: YearHistoryData[];
      formatter: Intl.NumberFormat;
    };

/* ---------- Chart Config ---------- */

export const historyBarChartConfig = {
  income: {
    label: 'Income',
    color: 'var(--color-emerald-500)',
  },
  expense: {
    label: 'Expense',
    color: 'var(--destructive)',
  },
} satisfies ChartConfig;

export const HistoryBarChart = ({
  timeframe,
  data,
  formatter,
}: HistoryBarChartProps) => {
  switch (timeframe) {
    case Timeframe.MONTH:
      return <MonthHistoryBarChart data={data} formatter={formatter} />;
    case Timeframe.YEAR:
      return <YearHistoryBarChart data={data} formatter={formatter} />;
  }
};
