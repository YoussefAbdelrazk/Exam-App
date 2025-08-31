import {
  deleteAccountApi,
  forgetPasswordApi,
  loginApi,
  // loginApi,
  resetPasswordApi,
  signupApi,
  verifyResetCodeApi,
} from '@/lib/api/auth/AuthApi';
import { getUserApi } from '@/lib/api/User/GetUser';
import { LoginSchemeType } from '@/lib/schems/LoginScheme';
import { deleteToken } from '@/lib/ServerCookie';
import { User } from '@/lib/types/UserType';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface GetUserResponse {
  message: string;
  user: User;
}
export const useSignup = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error: unknown) => {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message || 'Signup failed'
          : 'Signup failed';
      toast.error(errorMessage);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginSchemeType) => loginApi(data),
    onSuccess: () => {
      window.location.href = new URLSearchParams(window.location.search).get('callbackUrl') || '/';
    },
    onError: (error: unknown) => {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message || 'Login failed'
          : 'Login failed';
      toast.error(errorMessage);
    },
  });
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: forgetPasswordApi,
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useVerifyResetCode = () => {
  return useMutation({
    mutationFn: verifyResetCodeApi,
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useResetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      router.push('/login');
    },
    onError: () => {},
  });
};

export const useGetUser = () => {
  return useQuery<GetUserResponse>({
    queryKey: ['user'],
    queryFn: () => getUserApi(),
  });
};

export const useDeleteAccount = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => deleteAccountApi(),
    onSuccess: () => {
      toast.success('Account deleted successfully');
      deleteToken();
      router.push('/login');
    },
    onError: () => {
      toast.error('Failed to delete account');
    },
  });
};
