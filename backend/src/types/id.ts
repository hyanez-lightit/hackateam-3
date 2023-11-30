import { z } from 'zod';
import { positiveInt } from '../utils/zod';

export const idParamSchema = z
  .object({
    id: positiveInt,
  })
  .strict();

export type IdParam = z.infer<typeof idParamSchema>;
