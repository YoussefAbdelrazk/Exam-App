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
      <h2 className='text-2xl font-semibold text-gray-800 capitalize mb-5'>login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-800'>Password</FormLabel>
                <div className='relative'>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      placeholder='********'
                    />
                  </FormControl>
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    onClick={handleShowPassword}
                    className='absolute right-2 top-1/2 transform -translate-y-1/2'
                  >
                    {showPassword ? (
                      <EyeIcon className='w-4 h-4' />
                    ) : (
                      <EyeOffIcon className='w-4 h-4' />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button className='text-blue-600' type='button' variant='link' asChild>
              <Link href='/forgot-password'>Forget Password?</Link>
            </Button>
          </div>
          <Button disabled={isPending} type='submit' className='w-full bg-blue-600 text-white'>
            Login
          </Button>
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
