'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPasswordApi } from '@/lib/api/auth/AuthApi';
import { ResetPassSchema, ResetPassSchemaType } from '@/lib/schems/ResetPassScheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Step3Props {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function Step3({ email, onSuccess, onBack }: Step3Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPassSchemaType>({
    resolver: zodResolver(ResetPassSchema),
    defaultValues: {
      email: email,
    },
  });

  const newPassword = watch('newPassword');

  const onSubmit = async (data: ResetPassSchemaType) => {
    if (data.confirmPassword && data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await resetPasswordApi({
        email: data.email,
        newPassword: data.newPassword,
      });
      toast.success('Password reset successfully!');
      onSuccess();
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message ||
            'Failed to reset password'
          : 'Failed to reset password';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      {/* back button */}
      <Button variant='outline' className='' onClick={onBack}>
        <ArrowLeft className='w-4 h-4' />
      </Button>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* title */}
        <h2 className='text-2xl font-bold text-gray-800'>Create a new password</h2>
        {/* description */}
        <p>Create a new strong password for your account.</p>
        {/* hidden input */}
        <input type='hidden' {...register('email')} />

        <div className='space-y-2'>
          {/* new password */}
          <Label htmlFor='newPassword'>New Password</Label>
          <div className='relative'>
            <Input
              id='newPassword'
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter new password'
              {...register('newPassword')}
              className={errors.newPassword ? 'border-red-500 pr-10' : 'pr-10'}
            />
            {/* show password button */}
            <button
              type='button'
              className='absolute inset-y-0 right-0 pr-3 flex items-center'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className='h-4 w-4 text-gray-400' />
              ) : (
                <Eye className='h-4 w-4 text-gray-400' />
              )}
            </button>
          </div>
          {/* error message */}
          {errors.newPassword && (
            <p className='text-red-500 text-sm'>{errors.newPassword.message}</p>
          )}
        </div>

        {/* confirm new password */}
        <div className='space-y-2'>
          <Label htmlFor='confirmPassword'>Confirm New Password</Label>
          <div className='relative'>
            <Input
              id='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm new password'
              {...register('confirmPassword', {
                validate: value => value === newPassword || 'Passwords do not match',
              })}
              className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
            />
            {/* show confirm password button */}
            <button
              type='button'
              className='absolute inset-y-0 right-0 pr-3 flex items-center'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className='h-4 w-4 text-gray-400' />
              ) : (
                <Eye className='h-4 w-4 text-gray-400' />
              )}
            </button>
          </div>
          {/* error message */}
          {errors.confirmPassword && (
            <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className='space-y-3'>
          {/* reset password button */}
          <Button type='submit' className='w-full bg-blue-600 text-white' disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </form>
    </div>
  );
}
