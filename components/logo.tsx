import React from 'react';

import Link from 'next/link';

import { PiggyBank } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'icon' | 'text';
  // type?: 'link' | 'button';
  onClick?: () => void;
}

const Logo = ({ variant = 'default', onClick }: LogoProps) => {
  switch (variant) {
    case 'icon':
      return (
        <Link href={'/'} className='flex items-center gap-2' onClick={onClick}>
          <PiggyBank className='stroke-1 h-11 w-11 stroke-amber-500' />
        </Link>
      );

    case 'text':
      return (
        <Link href={'/'} className='flex items-center gap-2' onClick={onClick}>
          <p className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent text-nowrap'>
            Budget Tracker
          </p>
        </Link>
      );

    default:
      return (
        <Link href={'/'} className='flex items-center gap-2' onClick={onClick}>
          <PiggyBank className='stroke-1 h-11 w-11 stroke-amber-500' />
          <p className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent text-nowrap'>
            Budget Tracker
          </p>
        </Link>
      );
  }
};

export default Logo;
