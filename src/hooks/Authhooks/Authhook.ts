import {
  forgetPasswordApi,
  getUserApi,
  loginApi,
  // loginApi,
  resetPasswordApi,
  signupApi,
  verifyResetCodeApi,
} from '@/lib/api/AuthApi';
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
    onSuccess: data => {
      console.log(data.user);

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
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: data => {
      console.log('data.user', data.user);

      router.push('/');
    },
    onError: (error: unknown) => {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message || 'Login failed'
          : 'Login failed';
      toast.error(errorMessage);
      console.log(error);
    },
  });
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: forgetPasswordApi,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });
};

export const useVerifyResetCode = () => {
  return useMutation({
    mutationFn: verifyResetCodeApi,
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });
};

export const useResetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: data => {
      console.log(data);
      router.push('/login');
    },
    onError: error => {
      console.log(error);
    },
  });
};

export const useGetUser = () => {
  return useQuery<GetUserResponse>({
    queryKey: ['user'],
    queryFn: () => getUserApi(),
  });
};
