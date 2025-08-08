import { getToken } from '@/lib/Cookie';
import axios from 'axios';

export const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
export const axiosInstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);
