'use client';

import * as React from 'react';

import * as ProgressPrimitive from '@radix-ui/react-progress';

import { TransactionType } from '@/feature/transaction/types';
import { cn } from '@/lib/utils';

const TransactionTypeStylings: Record<TransactionType, string> = {
  income: 'bg-emerald-500',
  expense: 'bg-destructive',
};

function Progress({
  className,
  value,
  type,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  type?: TransactionType;
}) {
  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn(
        'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
        className,
      )}
      {...props}>
      <ProgressPrimitive.Indicator
        data-slot='progress-indicator'
        className={cn(
          'bg-primary h-full w-full flex-1 transition-all',
          type && TransactionTypeStylings[type],
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
