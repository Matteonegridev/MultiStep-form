import { z } from "zod";

// Regex for phone numbers:
const mobileRegex = (mobile: string) => {
  const phoneRegex = /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/;
  return phoneRegex.test(mobile);
};

export const zodValidation = z.object({
  name: z.string().min(4).max(20),
  email: z
    .string()
    .email()
    .regex(
      /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i,
      "Invalid Email",
    ),
  number: z
    .string()
    .nonempty({ message: "Number is mandatory" })
    .refine((val) => mobileRegex(val), "Invalid Number"),
});

export type SchemaValues = z.infer<typeof zodValidation>;
