'use client';

import { getExamQuestions, getExamsBySubject } from '@/lib/api/Exam/ExamsApi';
import { ExamType } from '@/lib/types/ExamType';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

interface ResponseType {
  message: string;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  exams: ExamType[];
}

export const useGetExamsBySubject = (subjectId: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ['exams', subjectId],
      queryFn: ({ pageParam = 1 }) => getExamsBySubject(subjectId, pageParam),
      getNextPageParam: (lastPage: ResponseType) => {
        if (lastPage.metadata.currentPage < lastPage.metadata.numberOfPages) {
          return lastPage.metadata.currentPage + 1;
        }
        return undefined;
      },
      initialPageParam: 1,
      enabled: !!subjectId,
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

export const useGetExamQuestions = (examId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['exam-questions', examId],
    queryFn: () => getExamQuestions(examId),
    enabled: !!examId,
  });

  return {
    questions: data?.questions || [],
    examInfo: data?.questions?.[0]?.exam,
    isLoading,
    error,
  };
};
