'use client';
import { useRouter } from 'next/navigation';

import { useAtom, useSetAtom } from 'jotai';
import { User } from 'lucide-react';
import { LogOut, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { authUserAtom, authSessionAtom } from '@/atoms/authAtom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import { signOut, deleteUser } from '@/lib/auth-client';
import { getErrorMessage } from '@/lib/utils';

import { deleteAlertOpen, logoutAlertOpen } from './atoms';

export function AuthButton() {
  const [user, setAuthUser] = useAtom(authUserAtom);
  const setAuthSession = useSetAtom(authSessionAtom);

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useAtom(deleteAlertOpen);
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useAtom(logoutAlertOpen);

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

  const deleteUserHandler = () => {
    deleteUser({
      callbackURL: '/',
      fetchOptions: {
        onSuccess: () => {
          toast.success('Account Deletion Request', {
            description:
              'Please verify the request by clicking the link in the email to complete the deletion.',
          });
          setAuthUser(null);
          setAuthSession(null);
          router.push('/sign-in');
        },
        onError: (ctx) => {
          if (ctx.error.code === 'FAILED_TO_GET_SESSION') {
            toast.warning('Unable to delete account.', {
              description:
                'No active session found. You are already logged out.',
            });
            setAuthUser(null);
            setAuthSession(null);
            router.push('/sign-in');
          } else {
            toast.error('Unable to delete account.', {
              description: `${ctx.error.message}. Please click the button to retry.`,
              action: {
                label: 'Retry',
                onClick: () => deleteUserHandler(),
              },
            });
          }
        },
      },
    }).catch((error) => {
      toast.error('Unable to delete account.', {
        description: `${getErrorMessage(
          error,
        )}. Please click the button to retry.`,
        action: {
          label: 'Retry',
          onClick: () => deleteUserHandler(),
        },
      });
    });
  };

  return (
    <>
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteUserHandler}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isLogoutAlertOpen} onOpenChange={setIsLogoutAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. You will be logged out of your
              account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={signOutHandler}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={user?.name ? false : true}>
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
              <Button
                variant='destructive'
                className='w-full flex flex-row flex-nowrap justify-between items-center'
                onClick={() => setIsDeleteAlertOpen(true)}>
                Delete Account <Trash className='text-background' />
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant={'outline'}
                //   onClick={signOutHandler}
                onClick={() => setIsLogoutAlertOpen(true)}
                className='w-full flex flex-row flex-nowrap justify-between items-center'>
                <span>Log Out</span>
                <LogOut className='text-foreground' />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
