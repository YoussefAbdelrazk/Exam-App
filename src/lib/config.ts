import { getToken } from '@/lib/ServerCookie';
import axios from 'axios';

export const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
export const ExamApiUrl = 'https://exam.elevateegy.com';

export const axiosInstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const examAxiosInstance = axios.create({
  baseURL: ExamApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.token = `${token}`;
  }
  return config;
});

examAxiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.token = `${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

examAxiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);
