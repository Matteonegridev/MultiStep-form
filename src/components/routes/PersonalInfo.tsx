import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContextHook } from "@/context/useContextHook";
import { SchemaValues } from "@/schema/zodSchema";

export type StepsProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

function PersonalInfo() {
  // Hook to store data in the main form from RHF:
  const form = useFormContext<SchemaValues>();
  const navigate = useNavigate();

  // Context Hook:
  const { setCurrentStep } = useContextHook();

  const name = form.watch("personalInfo.name");
  const email = form.watch("personalInfo.email");
  const number = form.watch("personalInfo.number");

  const filledFields =
    name.trim() !== "" && email.trim() !== "" && number.trim() !== "";

  // Define the type for the onSubmit function
  const onSubmit: SubmitHandler<SchemaValues> = (values) => {
    form.setValue("personalInfo", values.personalInfo);
    console.log(values);
    navigate("/plan");
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/*Name Field */}
          <FormField
            control={form.control}
            name="personalInfo.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Stephen King" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*Email Field */}
          <FormField
            control={form.control}
            name="personalInfo.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. stephenking@lorem.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/*Number Field */}
          <FormField
            control={form.control}
            name="personalInfo.number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. +1 234 567 890" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <button
              className="bg-primary text-white"
              type="submit"
              disabled={!filledFields}
            >
              Next
            </button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default PersonalInfo;
