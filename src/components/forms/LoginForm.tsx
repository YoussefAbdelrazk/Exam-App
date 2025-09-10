'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LoginScheme, LoginSchemeType } from '@/lib/schems/LoginScheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { useLogin } from '@/hooks/Authhooks/Authhook';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: login, isPending } = useLogin();
  const form = useForm<LoginSchemeType>({
    resolver: zodResolver(LoginScheme),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = async (data: LoginSchemeType) => {
    await toast.promise(login(data), {
      loading: 'Logging in...',
      success: 'Login successful',
      error: 'Login failed',
    });
  };

  return (
    <div className='w-full max-w-md mx-auto py-6 px-6'>
      {/* title */}
      <h2 className='text-2xl font-semibold text-gray-800 capitalize mb-5'>login</h2>
      {/* form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {/* email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-800'>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='user@example.com' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-800'>Password</FormLabel>
                {/* password input */}
                <div className='relative'>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      placeholder='********'
                    />
                  </FormControl>
                  {/* show password button */}
                  <button
                    type='button'
                    onClick={handleShowPassword}
                    className='absolute right-2 top-1/2 transform -translate-y-1/2'
                  >
                    {showPassword ? (
                      <EyeIcon className='w-4 h-4' />
                    ) : (
                      <EyeOffIcon className='w-4 h-4' />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* forget password */}
          <div className='flex justify-end'>
            <Button className='text-blue-600' type='button' variant='link' asChild>
              <Link href='/forgot-password'>Forget Password?</Link>
            </Button>
          </div>
          {/* login button */}
          <Button disabled={isPending} type='submit' className='w-full bg-blue-600 text-white'>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
          {/* register */}
          <div className='flex justify-center mt-4'>
            <p className='text-gray-700 text-sm'>
              Don&apos;t have an account?{' '}
              <Link href='/signup' className='text-blue-600'>
                Register
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
