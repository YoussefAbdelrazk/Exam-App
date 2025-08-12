export default function ExamLoading() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto p-6'>
        {/* Header Skeleton */}
        <div className='bg-white rounded-lg shadow-lg p-8 mb-6 animate-pulse'>
          <div className='flex items-center space-x-3 mb-6'>
            <div className='w-10 h-10 bg-gray-200 rounded-lg'></div>
            <div className='w-48 h-8 bg-gray-200 rounded'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            {[...Array(3)].map((_, index) => (
              <div key={index} className='text-center p-4 bg-gray-100 rounded-lg'>
                <div className='w-8 h-8 bg-gray-200 rounded mx-auto mb-2'></div>
                <div className='w-20 h-4 bg-gray-200 rounded mx-auto mb-1'></div>
                <div className='w-16 h-6 bg-gray-200 rounded mx-auto'></div>
              </div>
            ))}
          </div>

          <div className='text-center'>
            <div className='w-32 h-12 bg-gray-200 rounded-lg mx-auto'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
