import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useResetPassword } from '@/hooks/Authhooks/Authhook';
import { ResetPassSchema, ResetPassSchemaType } from '@/lib/schems/ResetPassScheme';
import { useAuthStore } from '@/store/AuthStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function Step3({ onReset }: { onReset: () => void }) {
  const { user } = useAuthStore();
  const { mutate: resetPassword } = useResetPassword();
  const form = useForm<ResetPassSchemaType>({
    resolver: zodResolver(ResetPassSchema),
    defaultValues: {
      email: user?.email || '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const onSubmit = (values: ResetPassSchemaType) => {
    console.log(values);
    resetPassword({
      email: user?.email || '',
      newPassword: values.newPassword,
    });
  };
  return (
    <div>
      <div className='mb-6 text-center'>
        <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <svg
            className='w-8 h-8 text-green-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
          </svg>
        </div>
        <h3 className='text-lg font-semibold text-gray-800 mb-2'>Code Verified!</h3>
        <p className='text-sm text-gray-600'>Now you can set your new password</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' placeholder='Enter new password' />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' placeholder='Confirm new password' />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Reset Password
          </Button>

          <div className='text-center'>
            <Button
              type='button'
              variant='link'
              onClick={onReset}
              className='text-gray-500 text-sm'
            >
              Back to Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
