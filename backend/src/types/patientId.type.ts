import { z } from 'zod';

export const patientIdParamSchema = z
  .object({
    patientId: z.string().regex(/^\d+$/, 'Must be a number'),
  })
  .strict();

export type PatientIdParam = z.infer<typeof patientIdParamSchema>;
