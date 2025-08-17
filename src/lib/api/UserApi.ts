'use server';

import { axiosInstance } from '@/lib/config';
import { ChangePasswordFormData } from '@/lib/schems/ChangePasswordScheme';
import { ProfileFormData } from '@/lib/schems/ProfileScheme';

export const changePasswordApi = async (data: ChangePasswordFormData) => {
  const api = await axiosInstance();
  const response = await api.patch('/api/v1/auth/changePassword', data);
  return response.data;
};

export const editProfileApi = async (data: ProfileFormData) => {
  const api = await axiosInstance();
  const response = await api.put('/api/v1/auth/editProfile', data);
  return response.data;
};
