import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Current password is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      ),
    rePassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ['rePassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
