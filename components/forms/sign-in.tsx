'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, atom } from 'jotai';
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
import { Checkbox } from '@/components/ui/checkbox';
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
import { resendVerificationEmail } from '@/helper';
import { googleSignIn, githubSignIn } from '@/lib/auth-client';
import { signIn } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

import { PasswordInput } from '../password-input';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  rememberMe: z.boolean(),
});

const passwordVisibleAtom = atom(false);

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });
  const { isSubmitting } = form.formState;
  const [isPasswordVisible, setIsPasswordVisible] =
    useAtom(passwordVisibleAtom);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password, rememberMe } = values;
    await signIn.email(
      {
        email,
        password,
        rememberMe,
      },
      {
        onSuccess: () => {
          toast.success('Logged in successfully!');
          router.replace('/');
        },
        onError: (ctx) => {
          if (ctx.error.code === 'EMAIL_NOT_VERIFIED') {
            toast.warning('Please verify your email address.', {
              description: `${ctx.error.message}. Please click the button to resend the verification email.`,
              action: {
                label: 'Resend',
                onClick: () => resendVerificationEmail(email),
              },
            });
          } else {
            toast.error('Failed to login', {
              description: `${ctx.error.message}`,
            });
          }
        },
      },
    );
  }

  const googleSignInHandler = () => {
    toast.promise(googleSignIn(), {
      loading: 'Redirecting to Google...',
      success: 'Successfully redirected to Google!',
      error: 'Failed to redirected to Google.',
    });
  };
  const githubSignInHandler = () => {
    toast.promise(githubSignIn(), {
      loading: 'Redirecting to Github...',
      success: 'Successfully redirected to Github!',
      error: 'Failed to redirected to Github.',
    });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-6'>
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

                <div className='flex flex-col gap-2'>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Link
                    href='/forgot-password'
                    className='underline underline-offset-4 text-xs ml-auto'>
                    Forgot your password?
                  </Link>
                </div>

                <FormField
                  control={form.control}
                  name='rememberMe'
                  render={({ field }) => (
                    <FormItem className='flex flex-row'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Remember Me</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex flex-col gap-3'>
                  <Button
                    type='submit'
                    className='w-full flex items-center justify-center'
                    disabled={isSubmitting}>
                    Login
                    {isSubmitting && <Spinner />}
                  </Button>
                </div>
              </div>
              <div className='mt-5 flex items-center justify-center gap-3 flex-wrap'>
                <Button
                  variant='outline'
                  className='flex-1'
                  type='button'
                  onClick={googleSignInHandler}>
                  Login with Google
                </Button>
                <Button
                  variant='outline'
                  className='flex-1'
                  type='button'
                  onClick={githubSignInHandler}>
                  Login with Github
                </Button>
              </div>
              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link href='/sign-up' className='underline underline-offset-4'>
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
