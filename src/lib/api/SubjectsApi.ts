import axios from 'axios';
import { getToken } from '../ServerCookie';
import { SubjectType } from '../types/SubjecetType';
export const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

interface SubjectResponse {
  message: string;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  subjects: SubjectType[];
}

export const getSubjects = async (page: number = 1): Promise<SubjectResponse> => {
  const token = await getToken();
  const response = await axios.get(`${BaseUrl}/api/v1/subjects?page=${page}&limit=10`, {
    headers: {
      token: `${token}`,
    },
  });
  console.log('response', response);
  return response.data;
};
