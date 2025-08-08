import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useVerifyResetCode } from '@/hooks/Authhooks/Authhook';
import { verifySchema, verifySchemaType } from '@/lib/schems/verifyType';
export default function Step2({ setStep }: { setStep: (step: number) => void }) {
  const { mutate: verifyResetCode } = useVerifyResetCode();
  const form = useForm<verifySchemaType>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      resetCode: '',
    },
  });
  const onSubmit = (values: verifySchemaType) => {
    verifyResetCode(values);
    setStep(3);
  };
  return (
    <div>
      <Form {...form}>
        <form className='space-y-8'>
          <FormField
            control={form.control}
            name='resetCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reset Code</FormLabel>
                <FormControl>
                  <InputOTP
                    value={field.value}
                    onChange={field.onChange}
                    maxLength={6}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        <InputOTPSlot {...slots[0]} index={0} />
                        <InputOTPSlot {...slots[1]} index={1} />
                        <InputOTPSlot {...slots[2]} index={2} />
                        <InputOTPSlot {...slots[3]} index={3} />
                        <InputOTPSlot {...slots[4]} index={4} />
                        <InputOTPSlot {...slots[5]} index={5} />
                      </InputOTPGroup>
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' onClick={form.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
