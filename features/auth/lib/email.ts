import { toast } from 'sonner';

import { sendVerificationEmail } from '@/features/auth/lib/auth-client';
import { Redirects } from '@/lib/redirects';

export const resendVerificationEmail = (email: string) => {
  // Logic to resend the verification email
  toast.promise(
    () =>
      sendVerificationEmail({
        email,
        callbackURL: Redirects.onboarding,
      }),
    {
      loading: 'Sending the verification email...',
      success: () => 'Email has been sent',
      error: 'Error sending the email',
    },
  );
};
