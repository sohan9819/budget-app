import Logo from '@/components/logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <Logo />
      <div className='w-full max-w-sm'>{children}</div>
    </div>
  );
}
