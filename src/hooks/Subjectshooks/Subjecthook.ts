'use client';

import { getSubjects } from '@/lib/api/Subject/SubjectsApi';
import { SubjectType } from '@/lib/types/SubjecetType';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ResponseType {
  message: string;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  subjects: SubjectType[];
}

export const useGetSubjects = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ['subjects'],
      queryFn: ({ pageParam = 1 }) => getSubjects(pageParam),
      getNextPageParam: (lastPage: ResponseType) => {
        console.log('getNextPageParam called with:', lastPage);
        console.log('Current page:', lastPage.metadata.currentPage);
        console.log('Total pages:', lastPage.metadata.numberOfPages);

        if (lastPage.metadata.currentPage < lastPage.metadata.numberOfPages) {
          const nextPage = lastPage.metadata.currentPage + 1;
          console.log('Returning next page:', nextPage);
          return nextPage;
        }
        console.log('No more pages, returning undefined');
        return undefined;
      },
      initialPageParam: 1,
    });

  // Debug logging
  console.log('Hook data:', data);
  console.log('Has next page:', hasNextPage);
  console.log('Is fetching next page:', isFetchingNextPage);
  console.log('Total pages loaded:', data?.pages.length);

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};

export const useGetSubjectById = (subjectId: string) => {
  const { data: subjectsData } = useGetSubjects();

  const allSubjects = subjectsData?.pages.flatMap(page => page.subjects) || [];
  const subject = allSubjects.find(sub => sub._id === subjectId);

  return {
    subject,
    isLoading: false,
    error: null,
  };
};
