import {
  forgetPasswordApi,
  loginApi,
  resetPasswordApi,
  signupApi,
  verifyResetCodeApi,
} from '@/lib/api/AuthApi';
import { useAuthStore } from '@/store/AuthStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useSignup = () => {
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();
  return useMutation({
    mutationFn: signupApi,
    onSuccess: data => {
      console.log(data);
      setUser(data.user);
      setToken(data.token);
      router.push('/login');
    },
    onError: error => {
      console.log(error);
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: data => {
      console.log(data);
      setUser(data.user);
      setToken(data.token);
      router.push('/');
    },
    onError: error => {
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
