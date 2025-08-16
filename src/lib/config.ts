import { getToken } from '@/lib/ServerCookie';
import axios from 'axios';

export const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export const axiosInstance = async () => {
  const token = await getToken();
  return axios.create({
    baseURL: BaseUrl,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { token: token }),
    },
  });
};
