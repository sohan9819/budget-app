import { ResetPasswordForm } from '@/components/forms/reset-password';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}
