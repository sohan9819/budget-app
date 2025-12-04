import React from 'react';

import { ThemeSwitcherButton } from '@/components/buttons/theme-switcher-button';
import { Logo } from '@/components/logo';
import { NavbarItem } from '@/components/navbar/components/navbar-item';
import { navlinks } from '@/components/navbar/constants';
import { AuthButton } from '@/features/auth/components/buttons/auth-button';

export const DesktopNavbar = () => {
  return (
    <div className='hidden border-separate border-b bg-background md:flex md:justify-center md:items-center'>
      <nav className='container flex items-center justify-between px-8'>
        <div className='flex gap-4 h-[80px] min-h-[60px]'>
          <Logo variant='compact' className='hidden md:flex lg:hidden' />
          <Logo className='hidden lg:flex my-auto' />
          <div className='flex h-full'>
            {navlinks.map((item, index) => (
              <NavbarItem key={index} {...item} className='text-3xl' />
            ))}
          </div>
        </div>
        <div className='flex h-[80px] items-center gap-2'>
          <ThemeSwitcherButton />
          <AuthButton />
        </div>
      </nav>
    </div>
  );
};
