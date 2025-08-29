'use client';

import {
  checkQuestions as checkQuestionsApi,
  getExamQuestions,
  getExamsBySubject,
} from '@/lib/api/Exam/ExamsApi';
import { CheckQuestionsRequest, CheckQuestionsResponse, ExamType } from '@/lib/types/ExamType';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

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

export const useCheckQuestions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<CheckQuestionsResponse | null>(null);

  const checkQuestions = async (data: CheckQuestionsRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await checkQuestionsApi(data);
      setResults(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check questions';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkQuestions,
    isLoading,
    error,
    results,
    reset: () => {
      setError(null);
      setResults(null);
    },
  };
};
