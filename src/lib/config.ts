import { getToken } from '@/lib/ServerCookie';
import axios from 'axios';

export const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
// This function is used to create a new axios instance with the base URL and the token
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
