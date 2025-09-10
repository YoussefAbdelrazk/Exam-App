export default function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      {/* content */}
      <div className='text-center'>
        {/* loading spinner */}
        <div className='w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4'></div>
        {/* loading text */}
        <p className='text-gray-600'>Loading...</p>
      </div>
    </div>
  );
}
