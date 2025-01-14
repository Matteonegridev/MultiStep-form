import { z } from "zod";

// Regex for phone numbers:
const mobileRegex = (mobile: string) => {
  const phoneRegex = /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/;
  return phoneRegex.test(mobile);
};

const planValidation = z.object({
  plan: z.object({
    type: z.enum(["Arcade", "Advanced", "Pro"], {
      required_error: "You need to select a notification type.",
    }),
    sub: z
      .object({
        yearly: z.boolean({ message: "field required" }).default(false),
        monthly: z.boolean({ message: "field required" }).default(true),
      })
      .refine((data) => data.yearly !== data.monthly, {
        message: "You can only select either yearly or monthly, not both.",
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
  .and(planValidation);

export type SchemaValues = z.infer<typeof zodValidation>;

export const formDefaultValues: SchemaValues = {
  personalInfo: {
    name: "",
    email: "",
    number: "",
  },
  plan: {
    type: "Arcade",
    sub: {
      monthly: true,
      yearly: false,
    },
  },
};
