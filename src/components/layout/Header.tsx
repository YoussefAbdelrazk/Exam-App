import { User } from 'lucide-react';

export default function Header({ title }: { title: string }) {
  return (
    <div className='bg-blue-600 rounded-lg p-8 text-white h-20 flex items-center justify-between'>
      <div className='flex items-center space-x-4'>
        <div className='flex items-center space-x-3'>
          <User className='h-8 w-8' />
          <h1 className='text-3xl font-bold font-geist-mono'>{title}</h1>
        </div>
      </div>
    </div>
  );
}
