export default function Loading() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <div className='w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4'></div>
        <p className='text-gray-600'>Loading...</p>
      </div>
    </div>
  );
}
