//TODO creare i primi 3 inputs name, email e number. Button per andare avanti. Utilizzare React Hook Form per la validazione con zod e shadcn per il component.

import { useForm } from "react-hook-form";
import { zodValidation, schemaValues } from "../../schema/zodSchema";
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
  const form = useForm<schemaValues>({
    resolver: zodResolver(zodValidation),
    defaultValues: {
      name: "",
      email: "",
      number: "",
    },
  });

  function onSubmit(values: schemaValues) {
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
      <button disabled={!form.watch} className="bg-primary text-white">
        <NavLink to={"/plan"}>Next</NavLink>
      </button>
    </section>
  );
}

export default StepOne;
