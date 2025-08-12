import { AuthData } from '@/data/AuthData';
import { FolderClosed } from 'lucide-react';

export default function AuthContent() {
  return (
    <div className='bg-[#EFF6FFBF] to-blue-200 flex flex-col py-[116px] items-center px-10 relative'>
      <div className='flex flex-col max-w-md '>
        <h1 className='text-xl font-semibold text-blue-600 capitalize flex items-center gap-2'>
          <FolderClosed className='size-7' />
          exam app
        </h1>
        <div className='mt-32'>
          <h2 className='text-gray-800 font-bold text-3xl'>
            Empower your learning journey with our smart exam platform.
          </h2>
          <div className='flex flex-col gap-4 mt-10'>
            {AuthData.map(item => (
              <div key={item.id} className='flex items-center gap-4'>
                <div className='border border-blue-600  p-1'>{item.icon}</div>
                <div>
                  <h3 className='text-blue-600 font-semibold text-xl'>{item.title}</h3>
                  <p className='text-gray-700 text-lg'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
