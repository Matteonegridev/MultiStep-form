import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import SvgComp from "@/utilities/SvgComp";
import mobileSideBar from "/assets/images/bg-sidebar-mobile.svg";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContextHook } from "@/hooks/useStepContext";
import { SchemaValues } from "@/schema/zodSchema";

function PersonalInfo() {
  // Hook to store data in the main form from RHF:
  const form = useFormContext<SchemaValues>();
  const navigate = useNavigate();

  // Context Hook:
  const { setCurrentStep } = useContextHook();

  // Define the type for the onSubmit function
  const onSubmit: SubmitHandler<SchemaValues> = (values) => {
    form.setValue("personalInfo", values.personalInfo);
    console.log(values);
    navigate("/plan");
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <>
      <section className="h-[70dvh] bg-lightGray">
        <div className="absolute left-0 top-0">
          <SvgComp alt="mobile sidebar" src={mobileSideBar} width={500} />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative z-10 m-auto mt-20 w-11/12 space-y-4 rounded-lg bg-white px-4 py-4 shadow-lg"
          >
            <div className="w-4/5">
              <h1 className="pb-2 font-bold ~text-2xl/4xl">Personal Info</h1>
              <p className="text-coolGray">
                Please provide you name, email and phone number.
              </p>
            </div>
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
                    <Input
                      placeholder="e.g. stephenking@lorem.com"
                      {...field}
                    />
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
          </form>
        </Form>
      </section>
      <div className="absolute bottom-5 right-4">
        <button
          className="rounded-sm bg-primary px-[1em] py-[.5em] font-semibold text-white"
          type="submit"
        >
          Next Step
        </button>
      </div>
    </>
  );
}

export default PersonalInfo;
