'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { TooltipContent } from '@/feature/stats/components/chart/tooltip-content';

import { historyBarChartConfig } from '.';
import { YearHistoryData } from '../../types';

/* ---------- Component ---------- */

type YearHistoryBarChartProps = {
  data: YearHistoryData[];
  formatter: Intl.NumberFormat;
};

export function YearHistoryBarChart({
  data,
  formatter,
}: YearHistoryBarChartProps) {
  const chartData = data.map((d) => ({
    month: new Date(0, d.month - 1).toLocaleString('default', {
      month: 'short',
    }),
    income: d.income,
    expense: d.expense,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Overview</CardTitle>
        <CardDescription>Income vs Expense</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={historyBarChartConfig}
          className='h-[300px] w-full'>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />

            <YAxis tickLine={false} axisLine={false} tickMargin={10} />

            <ChartTooltip
              cursor={false}
              content={<TooltipContent formatter={formatter} />}
            />

            <defs>
              <linearGradient
                id='incomeGradient'
                gradientTransform='rotate(90)'>
                <stop
                  offset='0%'
                  stopColor='var(--color-income)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='100%'
                  stopColor='var(--color-income)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id='expenseGradient'
                gradientTransform='rotate(90)'>
                <stop
                  offset='0%'
                  stopColor='var(--color-expense)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='100%'
                  stopColor='var(--color-expense)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Bar dataKey='income' fill='url(#incomeGradient)' radius={4} />
            <Bar dataKey='expense' fill='url(#expenseGradient)' radius={4} />

            <CartesianGrid
              strokeDasharray={'5 5'}
              strokeOpacity={'0.2'}
              vertical={false}
            />

            {/* No Gradient Bars */}
            {/* <Bar dataKey='income' fill='var(--color-income)' radius={4} />
            <Bar dataKey='expense' fill='var(--color-expense)' radius={4} /> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
