'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useChangePassword } from '@/hooks/Userhooks/Userhook';
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from '@/lib/schems/ChangePasswordScheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ChangePasswordForm() {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const { mutateAsync: changePassword } = useChangePassword();
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      password: '',
      rePassword: '',
    },
  });

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      console.log(data);
      await toast.promise(changePassword(data), {
        loading: 'Updating password...',
        success: 'Password updated successfully!',
        error: 'Failed to update password. Please try again.',
      });
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='oldPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPasswords.current ? 'text' : 'password'}
                      placeholder='Enter current password'
                      className='pr-10'
                      {...field}
                    />
                    <button
                      type='button'
                      onClick={() => togglePasswordVisibility('current')}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                    >
                      {showPasswords.current ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </button>
                  </div>
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
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPasswords.new ? 'text' : 'password'}
                      placeholder='Enter new password'
                      className='pr-10'
                      {...field}
                    />
                    <button
                      type='button'
                      onClick={() => togglePasswordVisibility('new')}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                    >
                      {showPasswords.new ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormDescription>
                  Password must be at least 8 characters with uppercase, lowercase, and number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='rePassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      placeholder='Confirm new password'
                      className='pr-10'
                      {...field}
                    />
                    <button
                      type='button'
                      onClick={() => togglePasswordVisibility('confirm')}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className='h-4 w-4' />
                      ) : (
                        <Eye className='h-4 w-4' />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='pt-4'>
            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              className='w-full bg-blue-600 hover:bg-blue-700'
            >
              {form.formState.isSubmitting ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
