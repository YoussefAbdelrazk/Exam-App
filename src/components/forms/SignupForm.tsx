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
import { SignupScheme, SignupSchemeType } from '@/lib/schems/SignupScheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { useSignup } from '@/hooks/Authhooks/Authhook';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: signup } = useSignup();
    const router = useRouter();
    const form = useForm<SignupSchemeType>({
      resolver: zodResolver(SignupScheme),
      defaultValues: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
      },
    });

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const onSubmit = async (data: SignupSchemeType) => {
      signup(
        {
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          rePassword: data.rePassword,
          phone: data.phone,
        },
        {
          onSuccess: () => {
            router.push('/login');
            toast.success('Signed up successfully');
          },
        },
      );
    };

  return (
    <div className='w-full max-w-md mx-auto py-6 px-6'>
      <h2 className='text-2xl font-semibold text-gray-800 capitalize mb-5'>Create an account</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-800'>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Ahmed' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-800'>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Ali' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-800'>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='ahmedali123' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-800'>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='ahmedali12@gmail.com' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-800'>Phone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='01012345678' />
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
          <FormField
            control={form.control}
            name='rePassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-gray-800'>Confirm Password</FormLabel>
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

          <Button type='submit' className='w-full bg-blue-600 text-white'>
            Signup
          </Button>
          <div className='flex justify-center mt-4'>
            <p className='text-gray-700 text-sm'>
              Already have an account?{' '}
              <Link href='/login' className='text-blue-600'>
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
