import { changePasswordApi, editProfileApi } from '@/lib/api/UserApi';
import { ChangePasswordFormData } from '@/lib/schems/ChangePasswordScheme';
import { ProfileFormData } from '@/lib/schems/ProfileScheme';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useChangePassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: ChangePasswordFormData) => changePasswordApi(data),
    onSuccess: () => {
      // toast.success('Password updated successfully');
      router.push('/account');
    },
    onError: () => {
      toast.error('Failed to update password');
    },
  });
};

export const useEditProfile = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: ProfileFormData) => editProfileApi(data),
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });
};
