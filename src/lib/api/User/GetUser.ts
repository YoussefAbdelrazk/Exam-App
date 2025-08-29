import { axiosInstance } from '@/lib/config';

export const getUserApi = async () => {
  const api = await axiosInstance();
  const response = await api.get('/api/v1/auth/profileData');
  return response.data;
};
