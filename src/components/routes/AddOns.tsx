import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useContextHook } from "@/hooks/useStepContext";
import { usePlansContext } from "@/hooks/usePlansContext";
import { SchemaValues } from "@/schema/zodSchema";
import { prevPage } from "@/functions/functions";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { addonsData } from "@/functions/addonsData";
import mobileSideBar from "/assets/images/bg-sidebar-mobile.svg";
import SvgComp from "@/utilities/SvgComp";
import desktopSideBar from "/assets/images/bg-sidebar-desktop.svg";
import Stepper from "../Stepper";
import { useEffect, useState } from "react";

function AddOns() {
  const form = useFormContext<SchemaValues>();
  const navigate = useNavigate();
  const { isMonthly } = usePlansContext();
  const { setCurrentStep } = useContextHook();

  const addons = isMonthly ? addonsData.monthly : addonsData.yearly;

  const onSubmit: SubmitHandler<SchemaValues> = (values) => {
    form.setValue("addons", values.addons);
    navigate("/summary");
    console.log(values);
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
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-[calc(90dvh-10px)] flex-col bg-magnolia md:h-screen"
        >
          {isMobile && (
            <>
              <div className="absolute left-0 top-0">
                <SvgComp alt="mobile sidebar" src={mobileSideBar} width={780} />
              </div>
              <Stepper />
            </>
          )}
          <div className="relative z-10 m-auto mt-16 w-11/12 rounded-lg bg-white px-5 py-8 shadow-lg md:grid md:w-4/5 md:grid-cols-[300px_1fr] md:px-3 md:py-4 xl:w-3/4">
            {!isMobile && (
              <div>
                <SvgComp
                  alt="desktop sidebar"
                  src={desktopSideBar}
                  className="h-auto w-full max-w-[300px] rounded-xl object-cover md:h-full"
                />
                <Stepper />
              </div>
            )}
            <div className="space-y-7 md:mx-auto md:w-5/6 md:pt-10 xl:w-2/3">
              <div className="w-4/5">
                <h1 className="pb-2 font-UbuntuBold text-primary ~text-2xl/4xl">
                  Pick add-ons
                </h1>
                <p className="w-[35ch] font-UbuntuRegular text-coolGray">
                  Add-ons help enhance your gaming experience.
                </p>
              </div>
              {addons.map((value) => (
                <FormField
                  key={value.id}
                  control={form.control}
                  name="addons.items"
                  render={({ field }) => (
                    <label className="flex flex-col">
                      <FormItem
                        key={value.id}
                        className={`grid grid-cols-[35px_1fr] items-center rounded-lg border px-3 py-2 transition-colors ${
                          field.value?.includes(value.id)
                            ? "border-secondary bg-magnolia"
                            : ""
                        }`}
                      >
                        <FormControl>
                          <Checkbox
                            className="grid h-[1.25em] w-[1.25em] appearance-none place-content-center border border-secondary bg-white text-secondary data-[state=checked]:bg-secondary"
                            // pass the variable into the checked state:
                            checked={field.value?.includes(value.id)}
                            onCheckedChange={(checked) => {
                              const currentAddons =
                                form.getValues("addons.items");

                              if (checked) {
                                // Add the selected add-on id to the array
                                form.setValue("addons.items", [
                                  ...(currentAddons ?? []),
                                  value.id,
                                ]);
                              } else {
                                // Remove the deselected add-on id from the array
                                form.setValue(
                                  "addons.items",
                                  currentAddons
                                    ? currentAddons.filter(
                                        (addon) => addon !== value.id,
                                      )
                                    : [],
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <div className="flex justify-between space-y-1 leading-none">
                          <div className="space-y-1">
                            <FormLabel className="w-full font-UbuntuBold text-primary ~text-sm/lg">
                              {value.type}
                            </FormLabel>
                            <FormLabel className="block font-UbuntuRegular text-coolGray ~text-xs/base">
                              {value.description}
                            </FormLabel>
                          </div>
                          <FormLabel className="~text-xs/base">
                            {value.price}
                          </FormLabel>
                        </div>
                      </FormItem>
                    </label>
                  )}
                />
              ))}
              {!isMobile && (
                <div className="flex items-center justify-between py-10">
                  <Button
                    className="rounded-sm bg-transparent px-[1em] py-[.5em] font-semibold text-coolGray"
                    onClick={(e) => {
                      prevPage(setCurrentStep, "/", navigate, e);
                    }}
                  >
                    Go Back
                  </Button>
                  <button
                    className="rounded-sm bg-primary px-[1em] py-[.5em] font-semibold text-white"
                    type="submit"
                  >
                    Next Step
                  </button>
                </div>
              )}
            </div>
          </div>
          {isMobile && (
            <>
              <div className="absolute bottom-5 right-5">
                <button
                  className="rounded-sm bg-primary px-[1em] py-[.5em] font-semibold text-white"
                  type="submit"
                >
                  Next Step
                </button>
              </div>
              <div className="absolute bottom-5 left-4">
                <Button
                  className="rounded-sm bg-transparent px-[1em] py-[.5em] font-semibold text-coolGray"
                  onClick={(e) => {
                    prevPage(setCurrentStep, "/", navigate, e);
                  }}
                >
                  Go Back
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </section>
  );
}

export default AddOns;
