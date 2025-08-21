'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4'>
      <div className='text-center max-w-2xl mx-auto'>
        {/* Animated Error Icon */}
        <div className='relative mb-8'>
          <div className='w-32 h-32 mx-auto relative'>
            {/* Main Circle */}
            <div className='w-full h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse'>
              <svg
                className='w-16 h-16 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                />
              </svg>
            </div>

            {/* Floating Elements */}
            <div className='absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce'></div>
            <div className='absolute -bottom-2 -left-2 w-4 h-4 bg-red-400 rounded-full animate-ping'></div>
            <div className='absolute top-1/2 -left-4 w-3 h-3 bg-orange-400 rounded-full animate-pulse'></div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Oops! Something Went Wrong</h1>
        <p className='text-xl text-gray-600 mb-6 leading-relaxed'>
          We&apos;ve encountered an unexpected error. Don&apos;t worry, our team has been notified
          and is working to fix it.
        </p>

        {/* Error Details */}
        <div className='mb-8 p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20'>
          <p className='text-sm text-gray-600 font-mono'>
            <span className='font-semibold text-red-600'>Error:</span>{' '}
            {error.message || 'Unknown error occurred'}
          </p>
          {error.digest && (
            <p className='text-xs text-gray-500 mt-2'>
              <span className='font-semibold'>Digest:</span> {error.digest}
            </p>
          )}
        </div>

        {/* Animated Circuit Pattern */}
        <div className='mb-8 flex justify-center'>
          <div className='relative'>
            <div className='w-64 h-16 bg-white rounded-lg shadow-lg border-2 border-gray-200 p-4'>
              <div className='flex items-center space-x-2'>
                <div className='w-3 h-3 bg-red-400 rounded-full animate-pulse'></div>
                <div className='flex-1 h-2 bg-gray-200 rounded'></div>
                <div className='w-3 h-3 bg-yellow-400 rounded-full animate-pulse'></div>
                <div className='flex-1 h-2 bg-gray-200 rounded'></div>
                <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <Button
            onClick={reset}
            className='bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
          >
            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              />
            </svg>
            Try Again
          </Button>

          <Button
            variant='outline'
            asChild
            className='border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
          >
            <a href='/'>
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
              Go Home
            </a>
          </Button>
        </div>

        {/* Helpful Tips */}
        <div className='mt-12 p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20'>
          <p className='text-sm text-gray-600'>
            <span className='font-semibold text-orange-600'>💡 Tip:</span> If this error persists,
            try refreshing the page or clearing your browser cache. Sometimes a fresh start is all
            you need!
          </p>
        </div>
      </div>
    </div>
  );
}
