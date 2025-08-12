'use client';
import { useGetSubjects } from '@/hooks/Subjectshooks/Subjecthook';
import { SubjectType } from '@/lib/types/SubjecetType';
import InfiniteScroll from 'react-infinite-scroll-component';
import DiplomaCard from './DiplomaCard';

export default function DiplomasList() {
  const { data, fetchNextPage, hasNextPage, isLoading, error } = useGetSubjects();

  const allSubjects = data?.pages.flatMap(page => page.subjects) || [];

  const loadMore = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  if (error) {
    return (
      <div className='flex items-center justify-center h-64'>
        <p className='text-red-500'>Error loading subjects: {error.message}</p>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <InfiniteScroll
        dataLength={allSubjects.length}
        next={loadMore}
        hasMore={hasNextPage || false}
        loader={
          <div className='flex justify-center py-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          </div>
        }
        endMessage={
          <div className='text-center py-8 text-gray-500'>
            <p>You have seen all subjects!</p>
          </div>
        }
        scrollThreshold='100px'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {allSubjects.map((subject: SubjectType) => (
            <div key={subject._id} className='animate-fade-in'>
              <DiplomaCard subject={subject} />
            </div>
          ))}
        </div>
      </InfiniteScroll>

      {isLoading && allSubjects.length === 0 && (
        <div className='flex justify-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      )}
    </div>
  );
}
