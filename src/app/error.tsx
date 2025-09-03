'use client';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='text-center max-w-md mx-auto'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>Something went wrong</h1>
        <p className='text-gray-600 mb-6'>{error.message || 'An unexpected error occurred'}</p>
        <div className='flex gap-4 justify-center'>
          <Button onClick={reset} className='bg-blue-600 hover:bg-blue-700'>
            Try Again
          </Button>
          <Button variant='outline' asChild>
            <a href='/'>Go Home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
