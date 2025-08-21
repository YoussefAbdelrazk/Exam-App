'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgetPasswordApi } from '@/lib/api/auth/AuthApi';
import { ForgotScheme, ForgotSchemeType } from '@/lib/schems/ForgotScheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Step1Props {
  onNext: (email: string) => void;
}

export default function Step1({ onNext }: Step1Props) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotSchemeType>({
    resolver: zodResolver(ForgotScheme),
  });

  const onSubmit = async (data: ForgotSchemeType) => {
    setIsLoading(true);
    try {
      await forgetPasswordApi(data);
      toast.success('Reset code sent to your email!');
      onNext(data.email);
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message ||
            'Failed to send reset code'
          : 'Failed to send reset code';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6 max-w-[720px]'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <h2 className='text-2xl font-bold text-gray-800'>Forgot Password</h2>
        <p className='text-gray-500  max-w-[452px] '>
          Don’t worry, we will help you recover your account.
        </p>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email Address</Label>
          <Input
            id='email'
            type='email'
            placeholder='Enter your email'
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
        </div>

        <Button type='submit' className='w-full bg-blue-600 text-white' disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Code'}
          <ArrowRight className='w-4 h-4' />
        </Button>
      </form>
    </div>
  );
}
