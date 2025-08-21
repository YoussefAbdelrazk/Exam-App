import { z } from 'zod';

export const SignupScheme = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .nonempty('Username is required'),
    firstName: z
      .string()
      .min(3, 'First name must be at least 3 characters')
      .nonempty('First name is required'),
    lastName: z
      .string()
      .min(3, 'Last name must be at least 3 characters')
      .nonempty('Last name is required'),
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters length, that contains 1 upper case, 1 lower case and 1 number and 1 special character.',
      )
      .nonempty('Password is required'),
    rePassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters length, that contains 1 upper case, 1 lower case and 1 number and 1 special character.',
      )
      .nonempty('Password is required'),
    phone: z
      .string()
      .min(10, 'Phone number must be at least 10 characters')
      .nonempty('Phone number is required'),
  })
  .refine(data => data.password === data.rePassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type SignupSchemeType = z.infer<typeof SignupScheme>;
