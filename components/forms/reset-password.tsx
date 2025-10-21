'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { resetPassword } from '@/lib/auth-client';
import { cn, getErrorMessage } from '@/lib/utils';

const formSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { isSubmitting } = form.formState;
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { password } = values;
    await resetPassword(
      {
        token: token || undefined,
        newPassword: password,
      },
      {
        onSuccess: () => {
          toast.success(
            'Password has been reset successfully. Please sign in.',
          );
          router.push('/sign-in');
        },
        onError: (ctx) => {
          if (ctx.error.code === 'INVALID_TOKEN') {
            toast.error('The reset token is invalid or has expired.', {
              description: 'Please request a new password reset link.',
              action: {
                label: 'Request New',
                onClick: () => {
                  toast.dismiss();
                  router.push('/forgot-password');
                },
              },
            });
          } else {
            toast.error('An error occurred while resetting the password.', {
              action: {
                label: 'Retry',
                onClick: () => {
                  toast.promise(() => onSubmit(values), {
                    loading: 'Retrying...',
                    success:
                      'Password has been reset successfully. Please sign in.',
                    error: 'An error occurred while resetting the password.',
                  });
                },
              },
            });
          }
        },
      },
    ).catch((error) => {
      toast.error('Something went wrong', {
        description: getErrorMessage(error),
        action: {
          label: 'Retry',
          onClick: () => {
            toast.promise(() => onSubmit(values), {
              loading: 'Retrying...',
              success: 'Password has been reset successfully. Please sign in.',
              error: 'An error occurred while resetting the password.',
            });
          },
        },
      });
    });
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your account password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-6'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='password'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='confirm password'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex flex-col gap-3'>
                  <Button
                    type='submit'
                    className='w-full flex items-center justify-center'
                    disabled={isSubmitting}>
                    Reset Password
                    {isSubmitting && <Loader className='animate-spin' />}
                  </Button>
                </div>
              </div>
              <div className='mt-4 text-center text-sm'>
                Remember your password?{' '}
                <Link href='/sign-in' className='underline underline-offset-4'>
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
