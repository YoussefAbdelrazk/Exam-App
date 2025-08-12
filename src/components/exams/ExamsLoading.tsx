export default function ExamsLoading() {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <div className='bg-gray-200 rounded-lg p-8 animate-pulse'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-gray-300 rounded'></div>
          <div className='w-48 h-8 bg-gray-300 rounded'></div>
        </div>
        <div className='w-64 h-4 bg-gray-300 rounded mt-4'></div>
      </div>

      {/* Exams Grid Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {[...Array(6)].map((_, index) => (
          <div key={index} className='bg-white rounded-lg shadow-lg p-6 animate-pulse'>
            <div className='flex items-start justify-between mb-4'>
              <div className='w-32 h-6 bg-gray-200 rounded'></div>
              <div className='w-16 h-6 bg-gray-200 rounded'></div>
            </div>
            <div className='w-full h-4 bg-gray-200 rounded mb-4'></div>
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='w-20 h-4 bg-gray-200 rounded'></div>
              <div className='w-24 h-4 bg-gray-200 rounded'></div>
              <div className='w-20 h-4 bg-gray-200 rounded'></div>
            </div>
            <div className='w-full h-12 bg-gray-200 rounded'></div>
          </div>
        ))}
      </div>
    </div>
  );
}
