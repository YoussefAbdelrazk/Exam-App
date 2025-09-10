import { axiosInstance } from '@/lib/config';

export const logoutApi = async () => {
  const api = await axiosInstance();
  const response = await api.get('/api/v1/auth/logout');
  return response.data;
};
