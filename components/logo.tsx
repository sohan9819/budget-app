import React from 'react';

import Link from 'next/link';

import { PiggyBank } from 'lucide-react';

import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'compact' | 'icon' | 'text';
  // type?: 'link' | 'button';
  onClick?: () => void;
  className?: string;
}

export const Logo = ({
  variant = 'default',
  onClick,
  className,
}: LogoProps) => {
  switch (variant) {
    case 'icon':
      return (
        <Link
          href={'/'}
          className={cn('flex items-center gap-2', className)}
          onClick={onClick}>
          <PiggyBank className='stroke-1 h-11 w-11 stroke-amber-500' />
        </Link>
      );

    case 'text':
      return (
        <Link
          href={'/'}
          className={cn('flex items-center gap-2', className)}
          onClick={onClick}>
          <p className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent text-nowrap'>
            Budget Tracker
          </p>
        </Link>
      );

    case 'compact':
      return (
        <Link
          href={'/'}
          className={cn('flex items-center gap-2', className)}
          onClick={onClick}>
          <PiggyBank className='stroke-1 h-11 w-11 stroke-amber-500' />
          <p className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text font-bold leading-tight tracking-tighter text-transparent text-nowrap flex flex-col text-lg'>
            <span>Budget</span>
            <span>Tracker</span>
          </p>
        </Link>
      );

    default:
      return (
        <Link
          href={'/'}
          className={cn('flex items-center gap-2', className)}
          onClick={onClick}>
          <PiggyBank className='stroke-1 h-11 w-11 stroke-amber-500' />
          <p className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent text-nowrap'>
            Budget Tracker
          </p>
        </Link>
      );
  }
};
