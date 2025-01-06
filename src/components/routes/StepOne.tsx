import { useForm } from "react-hook-form";
import { zodValidation, SchemaValues } from "../../schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router";

function StepOne() {
  const form = useForm<SchemaValues>({
    resolver: zodResolver(zodValidation),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      number: "",
    },
  });

  const name = form.watch("name");
  const email = form.watch("email");
  const number = form.watch("number");

  const filledFields =
    name.trim() !== "" && email.trim() !== "" && number.trim() !== "";

  const handleDisable = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!filledFields) {
      e.preventDefault();
    }
  };

  function onSubmit(values: SchemaValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        </form>
      </Form>
      <button className="cursor-pointer bg-primary p-4 text-white">
        <NavLink onClick={handleDisable} className="" to={"/plan"}>
          Next
        </NavLink>
      </button>
    </section>
  );
}

export default StepOne;
