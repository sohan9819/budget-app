import Navbar from '@/components/navbar';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex h-screen w-full flex-col'>
      <Navbar />
      <div className='w-full max-w-sm'>{children}</div>
    </div>
  );
}
