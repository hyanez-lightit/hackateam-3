import { z } from 'zod';

export const positiveInt = z.number().positive().int();
