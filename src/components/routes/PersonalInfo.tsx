import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import SvgComp from "@/utilities/SvgComp";
import mobileSideBar from "/assets/images/bg-sidebar-mobile.svg";
import desktopSideBar from "/assets/images/bg-sidebar-desktop.svg";

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
import { useState, useEffect } from "react";
import Stepper from "../Stepper";

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

  const mobileSize = window.innerWidth < 768;
  const [isMobile, setIsMobile] = useState(mobileSize);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-[calc(90dvh-10px)] bg-magnolia md:h-screen"
        >
          {isMobile && (
            <>
              <div className="absolute left-0 top-0">
                <SvgComp alt="mobile sidebar" src={mobileSideBar} width={500} />
              </div>
              <Stepper />
            </>
          )}
          <div className="relative z-10 m-auto mt-16 w-11/12 rounded-lg bg-white px-5 py-8 shadow-lg md:grid md:w-4/5 md:grid-cols-[300px_1fr] md:px-3 md:py-4 xl:w-3/4">
            {!isMobile && (
              <>
                <div className="">
                  <SvgComp alt="desktop sidebar" src={desktopSideBar} />
                </div>
                <Stepper />
              </>
            )}

            <div className="space-y-7 md:mx-auto md:w-5/6 md:pt-10 xl:w-2/3">
              <div className="w-4/5">
                <h1 className="pb-2 font-UbuntuBold text-primary ~text-2xl/4xl">
                  Personal Info
                </h1>
                <p className="font-UbuntuRegular text-coolGray">
                  Please provide you name, email and phone number.
                </p>
              </div>

              {/*Name Field */}
              <FormField
                control={form.control}
                name="personalInfo.name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Name</FormLabel>
                      <FormMessage className="~text-xs/sm md:text-right" />
                    </div>
                    <FormControl>
                      <Input
                        className="py-6 caret-primary"
                        placeholder="e.g. Stephen King"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/*Email Field */}
              <FormField
                control={form.control}
                name="personalInfo.email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Email</FormLabel>
                      <FormMessage className="~text-xs/sm" />
                    </div>
                    <FormControl>
                      <Input
                        className="py-6 caret-primary"
                        placeholder="e.g. stephenking@lorem.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/*Number Field */}
              <FormField
                control={form.control}
                name="personalInfo.number"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Number</FormLabel>
                      <FormMessage className="~text-xs/sm" />
                    </div>
                    <FormControl>
                      <Input
                        className="py-6 caret-primary"
                        placeholder="e.g. +1 234 567 890"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="absolute bottom-5 right-4">
            <button
              className="rounded-sm bg-primary px-[1em] py-[.5em] font-semibold text-white"
              type="submit"
            >
              Next Step
            </button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default PersonalInfo;
