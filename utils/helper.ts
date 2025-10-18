import { toast } from 'sonner';
import { sendVerificationEmail } from '@/lib/auth-client';

export const resendVerificationEmail = (email: string) => {
  // Logic to resend the verification email
  toast.promise(
    () =>
      sendVerificationEmail({
        email,
        callbackURL: '/sign-in',
      }),
    {
      loading: 'Sending the verification email...',
      success: () => 'Email has been sent',
      error: 'Error sending the email',
    },
  );
};
