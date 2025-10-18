import { Suspense } from 'react';

import { ResetPasswordForm } from '@/components/forms/reset-password';

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}
