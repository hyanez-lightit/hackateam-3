import { z } from 'zod';

export const noun = z.string().min(3);
