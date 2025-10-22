'use client';

import { useMemo } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { atom, useAtom } from 'jotai';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { PasswordInput } from '@/components/password-input';
import { PasswordStrengthIndicator } from '@/components/password-strength-indicator';
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
import { resetPassword } from '@/lib/auth-client';
import { cn, getErrorMessage } from '@/lib/utils';
import { getPasswordStrength } from '@/lib/utils';

const passwordVisibleAtom = atom(false);
const confirmPasswordVisibleAtom = atom(false);

const formSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters long')
      .max(16, 'Must be within 16 characters in length')
      .regex(new RegExp('.*[A-Z].*'), 'must have one uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'must have one lowercase character')
      .regex(new RegExp('.*\\d.*'), 'must have one number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'One special character',
      ),
    confirmPassword: z.string().trim(),
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

  const passwordState = form.watch('password');
  const passwordStrength = useMemo(() => {
    return getPasswordStrength(passwordState.trim());
  }, [passwordState]);

  const { isSubmitting } = form.formState;
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] =
    useAtom(passwordVisibleAtom);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useAtom(
    confirmPasswordVisibleAtom,
  );

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
                        <PasswordInput
                          placeholder='password'
                          visibility={isPasswordVisible}
                          onChangeVisibility={() =>
                            setIsPasswordVisible((prev) => !prev)
                          }
                          {...field}
                        />
                      </FormControl>
                      <PasswordStrengthIndicator {...passwordStrength} />
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
                        <PasswordInput
                          placeholder='confirm password'
                          visibility={isConfirmPasswordVisible}
                          onChangeVisibility={() =>
                            setIsConfirmPasswordVisible((prev) => !prev)
                          }
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
