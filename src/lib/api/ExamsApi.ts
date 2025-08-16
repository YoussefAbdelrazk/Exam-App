'use server';
import { axiosInstance, BaseUrl } from '@/lib/config';
import { ExamQuestionsResponse, ExamResponse } from '../types/ExamType';

export const getExamsBySubject = async (
  subjectId: string,
  page: number = 1,
): Promise<ExamResponse> => {
  const api = await axiosInstance();
  const response = await api.get(`/api/v1/exams?subject=${subjectId}&page=${page}&limit=10`);
  return response.data;
};

export const getExamQuestions = async (examId: string): Promise<ExamQuestionsResponse> => {
  const api = await axiosInstance();
  const response = await api.get(`${BaseUrl}/api/v1/questions?exam=${examId}`, {});
  return response.data;
};
