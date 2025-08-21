import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4'>
      <div className='text-center max-w-2xl mx-auto'>
        {/* Animated 404 Number */}
        <div className='relative mb-8'>
          <div className='text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse'>
            404
          </div>
          <div className='absolute inset-0 text-9xl font-bold text-gray-200 -z-10 animate-bounce'>
            404
          </div>
        </div>

        {/* Floating Elements */}
        <div className='relative mb-8'>
          <div className='absolute -top-4 -left-4 w-3 h-3 bg-blue-400 rounded-full animate-ping'></div>
          <div className='absolute -top-2 -right-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse'></div>
          <div className='absolute -bottom-4 left-1/2 w-4 h-4 bg-pink-400 rounded-full animate-bounce'></div>
        </div>

        {/* Main Message */}
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Oops! Page Not Found</h1>
        <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
          The page you&apos;re looking for seems to have wandered off into the digital wilderness.
          Don&apos;t worry, even the best explorers get lost sometimes!
        </p>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <Button
            asChild
            className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
          >
            <Link href='/'>
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
              Back to Home
            </Link>
          </Button>

          <Button
            variant='outline'
            asChild
            className='border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
          >
            <Link href='/diplomas'>
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                />
              </svg>
              Browse Diplomas
            </Link>
          </Button>
        </div>

        {/* Fun Fact */}
        <div className='mt-12 p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20'>
          <p className='text-sm text-gray-600'>
            <span className='font-semibold text-purple-600'>Fun Fact:</span> The 404 error was first
            introduced by Tim Berners-Lee in 1992. It&apos;s like a digital &quot;you are here&quot;
            sign, but for places that don&apos;t exist!
          </p>
        </div>
      </div>
    </div>
  );
}
