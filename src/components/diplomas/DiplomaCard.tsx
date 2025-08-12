import { SubjectType } from '@/lib/types/SubjecetType';
import { FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DiplomaCardProps {
  subject: SubjectType;
}

export default function DiplomaCard({ subject }: DiplomaCardProps) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-full h-96 relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
        <Image src={subject?.icon} alt={subject.name} fill className='object-cover' />
        <div className='absolute inset-0 bg-black bg-opacity-20'></div>

        {/* Subject Name */}
        <div className='absolute bottom-16 left-4 right-4 bg-[#155DFC80] p-4'>
          <h3 className='text-white text-xl font-semibold mb-1 font-geist-mono'>{subject.name}</h3>
        </div>

        {/* View Exams Button */}
        <div className='absolute bottom-4 left-4 right-4'>
          <Link
            href={`/diplomas/${subject._id}/exams`}
            className='inline-flex items-center space-x-2 bg-white bg-opacity-90 hover:bg-opacity-100 text-blue-600 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg'
          >
            <FileText className='h-4 w-4' />
            <span className='font-geist-mono cursor-pointer'>View Exams</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
