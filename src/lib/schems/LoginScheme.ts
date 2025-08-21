import { z } from 'zod';

export const LoginScheme = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must be at least 8 characters length, that contains 1 upper case, 1 lower case and 1 number and 1 special character.'
  ),
});

export type LoginSchemeType = z.infer<typeof LoginScheme>;
