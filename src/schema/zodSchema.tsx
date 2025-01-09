import { z } from "zod";

// Regex for phone numbers:
const mobileRegex = (mobile: string) => {
  const phoneRegex = /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/;
  return phoneRegex.test(mobile);
};

const switchValidation = z.object({
  yearly: z.boolean({ message: "field required" }).default(false),
  monthly: z.boolean({ message: "field required" }),
});

const radioValidation = z.object({
  plan: z.object({
    type: z.enum(["arcade", "advanced", "pro"], {
      required_error: "You need to select a notification type.",
    }),
  }),
});

export const zodValidation = z
  .object({
    personalInfo: z.object({
      name: z
        .string()
        .min(4)
        .max(20)
        .regex(/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/, "Invalid Name"),
      email: z
        .string()
        .email({
          message: "Invalid Email",
        })
        .regex(
          /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i,
          "Invalid Email",
        ),
      number: z
        .string()
        .nonempty({ message: "Number is mandatory" })
        .refine((val) => mobileRegex(val), "Invalid Number"),
    }),
  })
  .and(switchValidation)
  .and(radioValidation);

export type SchemaValues = z.infer<typeof zodValidation>;

export const formDefaultValues: SchemaValues = {
  personalInfo: {
    name: "",
    email: "",
    number: "",
  },
  plan: {
    type: "advanced",
  },
  monthly: true,
  yearly: false,
};
