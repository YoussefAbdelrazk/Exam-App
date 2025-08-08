import { z } from 'zod';

export const ForgotScheme = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
});
export type ForgotSchemeType = z.infer<typeof ForgotScheme>;
