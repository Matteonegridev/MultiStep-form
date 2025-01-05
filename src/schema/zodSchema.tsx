import { z } from "zod";

export const zodValidation = z.object({
  name: z.string().min(4).max(20),
  email: z.string().email(),
  number: z.string(),
});

export type schemaValues = z.infer<typeof zodValidation>;
