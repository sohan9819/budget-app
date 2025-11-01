'use client';

import React from 'react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Skeleton } from './ui/skeleton';

interface SkeletonWrapperProps {
  children: ReactNode;
  isLoading: boolean;
  fullWidth?: boolean;
}
export const SkeletonWrapper = ({
  children,
  isLoading,
  fullWidth = true,
}: SkeletonWrapperProps) => {
  if (!isLoading) return children;

  return (
    <Skeleton className={cn(fullWidth && 'w-full')}>
      <div className='opacity-0'>{children}</div>
    </Skeleton>
  );
};
