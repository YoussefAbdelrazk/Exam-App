import { z } from 'zod';

export const verifySchema = z.object({
  resetCode: z.string(),
});
export type verifySchemaType = z.infer<typeof verifySchema>;
