import React from 'react';

import { useAtom } from 'jotai';
import { Menu } from 'lucide-react';

import { AuthButton } from '@/components/buttons/auth-button';
import { ThemeSwitcherButton } from '@/components/buttons/theme-switcher-button';
import Logo from '@/components/logo';
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

import { isNavbarOpenAtom } from '../atoms';
import { navlinks } from '../constants';
import { NavbarItem } from './navbar-item';

export const MobileNavbar = () => {
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
                {navlinks.map((item, index) => (
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
