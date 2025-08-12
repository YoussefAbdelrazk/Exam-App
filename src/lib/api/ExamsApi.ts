import axios from 'axios';
import { getToken } from '../ServerCookie';
import { ExamQuestionsResponse, ExamResponse } from '../types/ExamType';

export const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export const getExamsBySubject = async (
  subjectId: string,
  page: number = 1,
): Promise<ExamResponse> => {
  const token = await getToken();
  const response = await axios.get(
    `${BaseUrl}/api/v1/exams?subject=${subjectId}&page=${page}&limit=10`,
    {
      headers: {
        token: `${token}`,
      },
    },
  );
  return response.data;
};

export const getExamQuestions = async (examId: string): Promise<ExamQuestionsResponse> => {
  const token = await getToken();
  const response = await axios.get(`${BaseUrl}/api/v1/questions?exam=${examId}`, {
    headers: {
      token: `${token}`,
    },
  });
  return response.data;
};
