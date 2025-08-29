import { axiosInstance, BaseUrl } from '@/lib/config';
import {
  CheckQuestionsRequest,
  CheckQuestionsResponse,
  ExamQuestionsResponse,
  ExamResponse,
} from '@/lib/types/ExamType';

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

export const checkQuestions = async (
  data: CheckQuestionsRequest,
): Promise<CheckQuestionsResponse> => {
  const api = await axiosInstance();
  const response = await api.post(`${BaseUrl}/api/v1/questions/check`, data);
  return response.data;
};
