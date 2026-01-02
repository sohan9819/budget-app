import React from 'react';

import { LogOut, TriangleAlert } from 'lucide-react';

import { signOut } from '@/feature/auth/lib/auth-client';

import { Logo } from './logo';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

interface ErrorScreenProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };
}

const ErrorScreen = ({ title, description, action }: ErrorScreenProps) => {
  return (
    <div className='relative flex flex-col h-screen w-full justify-center items-center gap-2 px-2'>
      <Logo />
      <Card>
        <CardHeader>
          <CardTitle className='text-center text-2xl'>{title}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className='flex justify-center items-center flex-col gap-4'>
            <TriangleAlert className='text-destructive' size={48} />
            <p className='text-center text-muted-foreground'>{description}</p>
          </div>
        </CardContent>
        <CardFooter>
          <div className='flex w-full items-center justify-evenly gap-4'>
            {action && (
              <Button onClick={action.onClick} variant={'outline'}>
                {action.label}
              </Button>
            )}
            <Button
              variant={'outline'}
              onClick={() => signOut()}
              className='flex flex-row flex-nowrap justify-between items-center'>
              <span>Log Out</span>
              <LogOut className='text-foreground' />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorScreen;
