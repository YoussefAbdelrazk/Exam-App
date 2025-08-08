import { z } from 'zod';

export const ForgotScheme = z.object({
  email: z.string().email(),
});
export type ForgotSchemeType = z.infer<typeof ForgotScheme>;
