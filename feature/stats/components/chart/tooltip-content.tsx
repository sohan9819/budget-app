import React, { useCallback } from 'react';

import CountUp from 'react-countup';

import { ChartConfig } from '@/components/ui/chart';
import { historyBarChartConfig } from '@/feature/stats/components/chart';

type TooltipPayloadItem<TPayload> = {
  dataKey: string;
  name: string;
  value: number;
  color?: string;
  fill?: string;
  payload: TPayload;
};

export type HistoryChartRow = {
  day?: string;
  month: string;
  year: string;
  income: number;
  expense: number;
};

type TooltipContentProps = {
  active?: boolean;
  payload?: TooltipPayloadItem<HistoryChartRow>[];
  label?: string;
  formatter: Intl.NumberFormat;
};

export const TooltipContent = ({
  active,
  payload,
  label,
  formatter,
}: TooltipContentProps) => {
  const formattingFn = useCallback(
    (value: number) => formatter.format(value),
    [formatter],
  );

  if (!active || !payload?.length) return null;

  // Date String label
  const { day, month, year } = payload[0].payload;
  const date = new Date(Number(year), Number(month), Number(day));

  // TODO : Fromat date based on locale for both the timeFrames
  const dateString = day
    ? date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : label;

  return (
    <div className='rounded-lg border bg-background p-3 shadow-sm min-w-[180px]'>
      <div className='text-xs text-muted-foreground mb-2'>{dateString}</div>
      <div className='space-y-1'>
        {payload.map((item) => {
          const key = String(item.dataKey);
          const color =
            (historyBarChartConfig as ChartConfig)[key]?.color ??
            'var(--foreground)';

          return (
            <div key={key} className='flex items-center gap-2 text-sm'>
              <span
                className='h-2 w-2 rounded-full'
                style={{ backgroundColor: color }}
              />
              <span className='text-muted-foreground'>{item.name ?? key}</span>
              <CountUp
                duration={0.5}
                end={item.value}
                preserveValue
                decimals={0}
                formattingFn={formattingFn}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
