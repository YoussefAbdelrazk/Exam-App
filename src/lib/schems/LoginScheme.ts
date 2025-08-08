import { z } from 'zod';

export const LoginScheme = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .nonempty('Password is required'),
});

export type LoginSchemeType = z.infer<typeof LoginScheme>;
