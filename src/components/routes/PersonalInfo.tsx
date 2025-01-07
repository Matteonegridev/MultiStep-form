import { useForm, useFormContext } from "react-hook-form";
import { zodValidation, SchemaValues } from "../../schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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

export type StepsProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

function PersonalInfo() {
  const form = useForm<SchemaValues>({
    resolver: zodResolver(zodValidation),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      number: "",
    },
  });

  const MainFormMethods = useFormContext();
  const navigate = useNavigate();

  const name = form.watch("name");
  const email = form.watch("email");
  const number = form.watch("number");

  const filledFields =
    name.trim() !== "" && email.trim() !== "" && number.trim() !== "";

  function onSubmit(values: SchemaValues) {
    MainFormMethods.setValue("Personal Info", values);
    console.log(values);
    navigate("/plan");
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/*Name Field */}
          <FormField
            control={form.control}
            name="name"
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
            name="email"
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
            name="number"
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
