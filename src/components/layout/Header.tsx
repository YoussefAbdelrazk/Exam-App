'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header({ title, icon }: { title: string; icon: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className='flex items-center gap-2 justify-between'>
      {/* back button */}
      <Button
        className='bg-white text-black h-20 border border-blue-600 w-9'
        onClick={() => router.back()}
      >
        <ArrowLeft className='h-4 w-4 text-blue-600' />
      </Button>
      {/* header */}
      <div className='bg-blue-600 rounded-lg p-8 text-white h-20 flex items-center justify-between w-full'>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-3'>
            {/* icon */}
            {icon}
            {/* title */}
            <h1 className='text-3xl font-bold font-geist-mono'>{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
