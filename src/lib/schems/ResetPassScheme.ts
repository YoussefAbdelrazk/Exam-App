import { z } from 'zod';

export const ResetPassSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(8),
  confirmPassword: z.string().optional(),
});
export type ResetPassSchemaType = z.infer<typeof ResetPassSchema>;
