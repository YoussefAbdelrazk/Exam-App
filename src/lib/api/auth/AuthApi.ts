'use server';
import { axiosInstance } from '@/lib/config';
import { ForgotSchemeType } from '@/lib/schems/ForgotScheme';
import { LoginSchemeType } from '@/lib/schems/LoginScheme';
import { ResetPassSchemaType } from '@/lib/schems/ResetPassScheme';
import { SignupSchemeType } from '@/lib/schems/SignupScheme';
import { verifySchemaType } from '@/lib/schems/verifyType';
import { setToken } from '@/lib/ServerCookie';
// import { User } from '@/types/User';
// export interface SignupResponse {
//   message: string;
//   token: string;
//   user: User;
// }

// https://exam.elevateegy.com/api/v1/auth/signup
export const loginApi = async (data: LoginSchemeType) => {
  const api = await axiosInstance();
  const response = await api.post('/api/v1/auth/signin', data);
  await setToken(response.data.token);
  console.log('response.data.token', response.data.token);
  console.log(response.data);
  return response.data;
};

export const signupApi = async (data: SignupSchemeType) => {
  const api = await axiosInstance();
  const response = await api.post('/api/v1/auth/signup', data);
  return response.data;
};

export const forgetPasswordApi = async (data: ForgotSchemeType) => {
  const api = await axiosInstance();
  const response = await api.post('/api/v1/auth/forgotPassword', data);
  return response.data;
};

export const verifyResetCodeApi = async (data: verifySchemaType) => {
  const api = await axiosInstance();
  const response = await api.post('/api/v1/auth/verifyResetCode', data);
  return response.data;
};

export const resetPasswordApi = async (data: ResetPassSchemaType) => {
  const api = await axiosInstance();
  const response = await api.put('/api/v1/auth/resetPassword', data);
  return response.data;
};
