import { axiosInstance } from '@/lib/config';

import { SubjectType } from '../../types/SubjecetType';

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
  const api = await axiosInstance();
  const response = await api.get(`/api/v1/subjects?page=${page}&limit=10`, {});

  return response.data;
};
