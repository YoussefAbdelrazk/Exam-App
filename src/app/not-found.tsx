import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='text-center max-w-md mx-auto'>
        <h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>Page Not Found</h2>
        <p className='text-gray-600 mb-8'>The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className='flex gap-4 justify-center'>
          <Button asChild className='bg-blue-600 hover:bg-blue-700'>
            <Link href='/'>Back to Home</Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/diplomas'>Browse Diplomas</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
