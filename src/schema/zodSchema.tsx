import { z } from "zod";

// Regex for email:
const emailRegex =
  /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;
// Regex for name inputs:
const nameRegex = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;
// Regex for phone numbers:
const mobileRegex = /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/;

const planValidation = z.object({
  type: z.enum(["Arcade", "Advanced", "Pro"], {
    required_error: "You need to select a notification type.",
  }),
  sub: z
    .union([
      z.object({ yearly: z.literal(true), monthly: z.literal(false) }),
      z.object({ yearly: z.literal(false), monthly: z.literal(true) }),
    ])
    .refine((data) => data.yearly !== data.monthly, {
      message: "You can only select either yearly or monthly, not both.",
    }),
});

const addonsValidation = z.object({
  items: z
    .array(z.string())
    .min(1, { message: "You have to select at least one item." }),
});

const personalInfoValidation = z.object({
  name: z
    .string()
    .min(4, { message: "Name must cointain at least 4 character(s)" })
    .max(20)
    .regex(nameRegex, "Invalid Name"),
  email: z
    .string()
    .email({
      message: "Invalid Email",
    })
    .regex(emailRegex, "Invalid Email"),
  number: z
    .string()
    .nonempty({ message: "Number is mandatory" })
    .regex(mobileRegex, "Invalid Number"),
});

// Define the whole Schema creating here the objects containing the info:
export const zodValidation = z
  .object({
    personalInfo: personalInfoValidation,
  })
  .merge(z.object({ plan: planValidation }))
  .merge(z.object({ addons: addonsValidation }));

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
      yearly: false,
      monthly: true,
    },
  },
  addons: {
    items: [],
  },
};
