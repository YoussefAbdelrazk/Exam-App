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
import { Input } from '@/components/ui/input';
import { useDeleteAccount, useGetUser } from '@/hooks/Authhooks/Authhook';
import { useEditProfile } from '@/hooks/Userhooks/Userhook';
import { profileSchema, type ProfileFormData } from '@/lib/schems/ProfileScheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import DeleteAccountDialog from './DeleteAccountDialog';

export default function ProfileForm() {
  const { data: userData } = useGetUser();
  const { mutateAsync: editProfile } = useEditProfile();
  const { mutate: deleteAccount } = useDeleteAccount();
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
    },
  });

  // Set form values when user data is available
  useEffect(() => {
    if (userData) {
      form.setValue('firstName', userData.user.firstName || '');
      form.setValue('lastName', userData.user.lastName || '');
      form.setValue('username', userData.user.username || '');
      form.setValue('email', userData.user.email || '');
      form.setValue('phone', userData.user.phone || '');
    }
  }, [userData, form]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Here you would typically make an API call to update the user profile
      await toast.promise(editProfile(data), {
        loading: 'Updating profile...',
        success: 'Profile updated successfully!',
        error: 'Failed to update profile. Please try again.',
      });

      // Update local user state (you might want to update this based on API response)

      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleDeleteAccount = async (): Promise<void> => {
    await deleteAccount();
    // window.location.reload();
  };

  return (
    <div className='max-w-2xl mx-auto p-6'>
      {/* form */}
      <Form {...form}>
        {/* form */}
        <form className='space-y-6 font-geist-mono' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-4'>
            {/* first name */}
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your first name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* last name */}
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your last name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* username */}
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' placeholder='Enter your email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* phone */}
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <div className='flex items-center space-x-2 '>
                    <div className='flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-md bg-gray-50 w-full'>
                      <span className='text-sm'>🇪🇬</span>
                      <span className='text-sm font-medium'>EG (+20)</span>
                      <Input
                        {...field}
                        className='flex-1 border-none focus:outline-none focus:border-none focus:ring-0 bg-transparent'
                        placeholder='Phone number'
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* delete account */}
          <div className='flex items-center gap-3 pt-4'>
            <DeleteAccountDialog onDeleteAccount={handleDeleteAccount} />

            {/* save changes button */}
            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              className='px-6 bg-blue-600 hover:bg-blue-700 w-[331px]'
            >
              {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
