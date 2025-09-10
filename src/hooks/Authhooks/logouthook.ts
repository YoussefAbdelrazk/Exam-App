import { logoutApi } from '@/lib/api/auth/logoutApi';
import { deleteToken } from '@/lib/ServerCookie';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      deleteToken();
      router.push('/login');
    },
    onError: () => {
      toast.error('Failed to logout');
    },
  });
};
