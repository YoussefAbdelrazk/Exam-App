'use client';

import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { forgetPasswordApi, verifyResetCodeApi } from '@/lib/api/auth/AuthApi';
import { verifySchema, verifySchemaType } from '@/lib/schems/verifyType';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Step2Props {
  email: string;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2({ email, onNext, onBack }: Step2Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<verifySchemaType>({
    resolver: zodResolver(verifySchema),
  });

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    setValue('resetCode', value);
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      await forgetPasswordApi({ email });
      toast.success('Reset code sent again!');
      setTimeLeft(60);
      setCanResend(false);
      setOtpValue('');
      setValue('resetCode', '');
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message ||
            'Failed to resend code'
          : 'Failed to resend code';
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data: verifySchemaType) => {
    if (data.resetCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      await verifyResetCodeApi(data);
      toast.success('Code verified successfully!');
      onNext();
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === 'object' && 'response' in error
          ? (error.response as { data?: { message?: string } })?.data?.message ||
            'Invalid verification code'
          : 'Invalid verification code';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* back button */}
        <Button variant='outline' className='' onClick={onBack}>
          <ArrowLeft className='w-4 h-4' />
        </Button>
        {/* title */}
        <h2 className='text-2xl font-bold text-gray-800'>Verify OTP</h2>
        <p className='text-gray-500 mt-2'>
          We&apos;ve sent a 6-digit code to <strong>{email}</strong>
        </p>
        <div className='space-y-4'>
          {/* enter verification code */}
          <Label htmlFor='otp' className='text-center block'>
            Enter Verification Code
          </Label>
          {/* otp input */}
          <div className='flex justify-center'>
            <InputOTP maxLength={6} value={otpValue} onChange={handleOtpChange}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {/* resend code */}
          <div className='text-center mt-4'>
            {!canResend ? (
              <p className='text-sm text-gray-500'>
                You can request another code in:{' '}
                <span className='font-semibold text-blue-600'>{timeLeft}s</span>
              </p>
            ) : (
              <Button
                type='button'
                variant='outline'
                onClick={handleResendCode}
                disabled={isResending}
                className='text-blue-600 border-blue-600 hover:bg-blue-50'
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </Button>
            )}
          </div>
          {/* error message */}
          {errors.resetCode && (
            <p className='text-red-500 text-sm text-center'>{errors.resetCode.message}</p>
          )}
        </div>

        {/* verify code button */}
        <div className='space-y-3'>
          <Button type='submit' className='w-full bg-blue-600 text-white' disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </Button>
        </div>
      </form>
    </div>
  );
}
