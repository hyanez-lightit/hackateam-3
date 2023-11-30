import { z } from 'zod';

export const userIdParamSchema = z
  .object({
    id: z.string().regex(/^\d+$/, 'Must be a number'),
  })
  .strict();

export type UserIdParam = z.infer<typeof userIdParamSchema>;
