'use client';

import { useMemo } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { atom, useAtom } from 'jotai';
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
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { VerifyEmail } from '@/components/verify-email';
import { googleSignIn, githubSignIn } from '@/lib/auth-client';
import { signUp } from '@/lib/auth-client';
import { Redirects } from '@/lib/redirects';
import { cn, getErrorMessage } from '@/lib/utils';
import { getPasswordStrength } from '@/lib/utils';

const verifyEmailAtom = atom(false);
const passwordVisibleAtom = atom(false);
const confirmPasswordVisibleAtom = atom(false);

const formSchema = z
  .object({
    name: z.string().trim().min(4, 'Name must be at least 4 characters long'),
    email: z.string().trim().email('Invalid email address'),
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

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [verifyEmail, setVerifyEmail] = useAtom(verifyEmailAtom);
  const [isPasswordVisible, setIsPasswordVisible] =
    useAtom(passwordVisibleAtom);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useAtom(
    confirmPasswordVisibleAtom,
  );

  const passwordState = form.watch('password');
  const passwordStrength = useMemo(() => {
    return getPasswordStrength(passwordState.trim());
  }, [passwordState]);

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;
    await signUp
      .email(
        {
          name,
          email,
          password,
          callbackURL: Redirects.onboarding,
        },
        {
          onSuccess: () => {
            toast.success('Account created successfully!', {
              description:
                'Please check your mail to verify your email address',
            });
            setVerifyEmail(true);
          },
          onError: () => {
            toast.error('Failed to create account', {
              description:
                'If you already have an account, please sign in instead.',
              action: {
                label: 'Retry',
                onClick: () => {
                  onSubmit(values);
                },
              },
            });
          },
        },
      )
      .catch((error) => {
        toast.error('Failed to create account', {
          description: getErrorMessage(error),
          action: {
            label: 'Retry',
            onClick: () => {
              onSubmit(values);
            },
          },
        });
      });
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {verifyEmail ? (
        <VerifyEmail email={form.watch('email')} name={form.watch('name')} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Enter your email below to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-6'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder='snicker' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder='snicker@example.com' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            onChangeVisibility={() => {
                              setIsPasswordVisible((prev) => !prev);
                            }}
                            minLength={8}
                            // maxLength={16}
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
                            onChangeVisibility={() => {
                              setIsConfirmPasswordVisible((prev) => !prev);
                            }}
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
                      Create Account
                      {isSubmitting && <Spinner />}
                    </Button>
                  </div>
                </div>
                <div className='mt-5 flex items-center justify-center gap-3 flex-wrap'>
                  <Button
                    variant='outline'
                    className='flex-1'
                    type='button'
                    onClick={googleSignIn}>
                    Login with Google
                  </Button>
                  <Button
                    variant='outline'
                    className='flex-1'
                    type='button'
                    onClick={githubSignIn}>
                    Login with Github
                  </Button>
                </div>
                <div className='mt-4 text-center text-sm'>
                  Already have an account?{' '}
                  <Link
                    href='/sign-in'
                    className='underline underline-offset-4'>
                    Sign in
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
