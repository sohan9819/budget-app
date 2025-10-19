'use client';
import { useRouter } from 'next/navigation';

import { useAtom, useSetAtom } from 'jotai';
import { User } from 'lucide-react';
import { LogOut, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { authUserAtom, authSessionAtom } from '@/atoms/authAtom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/auth-client';
import { getErrorMessage } from '@/lib/utils';

import { Spinner } from '../ui/spinner';

export function AuthButton() {
  const [user, setAuthUser] = useAtom(authUserAtom);
  const setAuthSession = useSetAtom(authSessionAtom);

  const router = useRouter();

  const signOutHandler = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logout successful.');
          setAuthUser(null);
          setAuthSession(null);
          router.push('/sign-in');
        },
        onError: (ctx) => {
          if (ctx.error.code === 'FAILED_TO_GET_SESSION') {
            toast.warning('Unable to log out.', {
              description:
                'No active session found. You are already logged out.',
            });
            setAuthUser(null);
            setAuthSession(null);
            router.push('/sign-in');
          } else {
            toast.error('Unable to log out.', {
              description: `${ctx.error.message}. Please click the button to retry.`,
              action: {
                label: 'Retry',
                onClick: () => signOutHandler(),
              },
            });
          }
        },
      },
    }).catch((error) => {
      toast.error('Unable to log out.', {
        description: `${getErrorMessage(
          error,
        )}. Please click the button to retry.`,
        action: {
          label: 'Retry',
          onClick: () => signOutHandler(),
        },
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <User /> {user?.name || <Spinner />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='start'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuLabel className='text-muted-foreground'>
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Delete Account
            <DropdownMenuShortcut>
              <Trash className='stroke-red-400' />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={signOutHandler}>
            Log out
            <DropdownMenuShortcut>
              <LogOut />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
