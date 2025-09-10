'use client';

import { useGetExamsBySubject } from '@/hooks/Examshooks/Examshook';
import { ExamType } from '@/lib/types/ExamType';
import InfiniteScroll from 'react-infinite-scroll-component';
import ExamCard from './ExamCard';

interface ExamsListProps {
  subjectId: string;
  onStartExam?: (examId: string) => void;
}

export default function ExamsList({ subjectId, onStartExam }: ExamsListProps) {
  const { data, fetchNextPage, hasNextPage, isLoading, error } = useGetExamsBySubject(subjectId);

  const allExams = data?.pages.flatMap(page => page.exams) || [];

  const loadMore = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  if (error) {
    return (
      <div className='flex items-center justify-center h-64'>
        <p className='text-red-500 font-geist-sans'>Error loading exams: {error.message}</p>
      </div>
    );
  }

  if (isLoading && allExams.length === 0) {
    return (
      <div className='flex justify-center py-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (allExams.length === 0) {
    return (
      <div className='text-center py-12'>
        {/* svg */}
        <div className='text-gray-400 mb-4'>
          <svg className='mx-auto h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            />
          </svg>
        </div>
        {/* title */}
        <h3 className='text-lg font-medium text-gray-900 font-geist-mono mb-2'>
          No Exams Available
        </h3>
        {/* description */}
        <p className='text-gray-500 font-geist-sans'>
          There are no exams available for this subject yet.
        </p>
      </div>
    );
  }

  return (
    <div className='w-full'>
      {/* infinite scroll */}
      <InfiniteScroll
        dataLength={allExams.length}
        next={loadMore}
        hasMore={hasNextPage || false}
        loader={
          <div className='flex justify-center py-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          </div>
        }
        endMessage={
          <div className='text-center py-8 text-gray-500'>
            <p className='font-geist-sans'>You have seen all available exams!</p>
          </div>
        }
        scrollThreshold='100px'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {allExams.map((exam: ExamType) => (
            <div key={exam._id} className='animate-fade-in'>
              <ExamCard exam={exam} onStartExam={onStartExam} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
