'use client';

import { getSubjects } from '@/lib/api/SubjectsApi';
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
        if (lastPage.metadata.currentPage < lastPage.metadata.numberOfPages) {
          return lastPage.metadata.currentPage + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
    });

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
