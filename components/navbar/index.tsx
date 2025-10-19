'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAtom } from 'jotai';
import { Menu } from 'lucide-react';

import { AuthButton } from '@/components/buttons/auth-button';
import { ThemeSwitcherButton } from '@/components/buttons/theme-switcher-button';
import Logo from '@/components/logo';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

import { isNavbarOpenAtom } from './atoms';

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

const items = [
  {
    label: 'Dashboard',
    link: '/',
  },
  {
    label: 'Transactions',
    link: '/transactions',
  },
  {
    label: 'Manage',
    link: '/manage',
  },
];

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useAtom(isNavbarOpenAtom);
  return (
    <div className='block border-separate bg-background md:hidden'>
      <nav className='container flex items-center justify-between px-4'>
        <div className='flex-1 flex justify-start items-center gap-2'>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size={'icon'}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              className='w-[90vw] max-w-[30rem] sm:w-[540px]'
              side='left'>
              <SheetHeader>
                <SheetTitle>
                  <Logo
                    variant={'text'}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  />
                </SheetTitle>
              </SheetHeader>
              <div>
                {items.map((item, index) => (
                  <NavbarItem
                    key={index}
                    {...item}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>
              <SheetFooter>
                <AuthButton />
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
            <Logo variant={'icon'} />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <ThemeSwitcherButton />
        </div>
      </nav>
    </div>
  );
};

const DesktopNavbar = () => {
  return (
    <div className='hidden border-separate border-b bg-background md:flex md:justify-center md:items-center'>
      <nav className='container flex items-center justify-between px-8'>
        <div className='flex gap-4 h-[80px] min-h-[60px]'>
          <Logo />
          <div className='flex h-full'>
            {items.map((item, index) => (
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

interface NavbarItemProps {
  link: string;
  label: string;
  className?: string;
  onClick?: () => void;
}
const NavbarItem = ({ link, label, className, onClick }: NavbarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <div
      className={`relative flex items-center ${className}`}
      onClick={onClick}>
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full justify-start text-lg text-muted-foreground hover:text-foreground',
          isActive && 'text-foreground',
        )}>
        {label}
      </Link>
      {isActive && (
        <div className='absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block'></div>
      )}
    </div>
  );
};

export default Navbar;
