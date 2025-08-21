export default function Loading() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4'>
      <div className='text-center max-w-2xl mx-auto'>
        {/* Animated Loading Icon */}
        <div className='relative mb-8'>
          <div className='w-32 h-32 mx-auto relative'>
            {/* Main Circle with Gradient */}
            <div className='w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse'>
              <div className='w-24 h-24 bg-white rounded-full flex items-center justify-center'>
                <div className='w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 rounded-full animate-spin'></div>
              </div>
            </div>

            {/* Orbiting Elements */}
            <div className='absolute inset-0 animate-spin'>
              <div className='absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full'></div>
              <div className='absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-purple-400 rounded-full'></div>
              <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-pink-400 rounded-full'></div>
              <div className='absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full'></div>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Loading Amazing Content</h1>
        <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
          Please wait while we prepare something wonderful for you...
        </p>

        {/* Animated Progress Bar */}
        <div className='mb-8'>
          <div className='w-80 h-4 bg-white rounded-full shadow-lg border-2 border-gray-200 overflow-hidden mx-auto'>
            <div
              className='h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse'
              style={{ width: '60%' }}
            ></div>
          </div>
          <div className='mt-2 text-sm text-gray-500'>Loading... 60%</div>
        </div>

        {/* Animated Dots */}
        <div className='mb-8 flex justify-center space-x-2'>
          <div className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'></div>
          <div
            className='w-3 h-3 bg-purple-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className='w-3 h-3 bg-pink-500 rounded-full animate-bounce'
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className='relative mb-8'>
          <div className='absolute -top-4 -left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping'></div>
          <div className='absolute -top-2 -right-2 w-3 h-3 bg-purple-400 rounded-full animate-pulse'></div>
          <div className='absolute -bottom-4 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-bounce'></div>
        </div>

        {/* Loading Tips */}
        <div className='p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20'>
          <p className='text-sm text-gray-600'>
            <span className='font-semibold text-blue-600'>💡 Did you know?</span> Good things come
            to those who wait! We&apos;re carefully crafting the perfect experience for you.
          </p>
        </div>

        {/* Animated Background Elements */}
        <div className='fixed inset-0 -z-10 overflow-hidden'>
          <div className='absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
          <div
            className='absolute top-1/3 right-1/4 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className='absolute bottom-1/4 left-1/3 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'
            style={{ animationDelay: '4s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
