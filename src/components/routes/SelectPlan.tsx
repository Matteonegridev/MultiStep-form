import { useEffect } from "react";
import { useContextHook } from "@/hooks/useStepContext";
import { useNavigate } from "react-router";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { SchemaValues } from "@/schema/zodSchema";
import { prevPage } from "@/functions/functions";
import { Switch } from "@radix-ui/react-switch";
import { usePlansContext } from "@/hooks/usePlansContext";
import { planData } from "@/functions/selectPlanData";
import SvgComp from "@/utilities/SvgComp";
import mobileSideBar from "/assets/images/bg-sidebar-mobile.svg";
import desktopSideBar from "/assets/images/bg-sidebar-desktop.svg";
import Stepper from "../Stepper";
import useMobile from "@/hooks/useMobile";

function SelectPlan() {
  const { setCurrentStep } = useContextHook();
  const { isMonthly, setIsMonthly } = usePlansContext();
  const navigate = useNavigate();
  const form = useFormContext<SchemaValues>();

  // Show monthly plans when isMonthly is true, and yearly plans when false
  const plans = isMonthly ? planData.monthly : planData.yearly;

  // useEffect makes sure the toggle is updated when switched plan; it sets that value of the form to true or false when switching:
  useEffect(() => {
    form.setValue("plan.sub.monthly", isMonthly); // Set monthly to true
    form.setValue("plan.sub.yearly", !isMonthly); // Set yearly to false
  }, [isMonthly, form]);

  const onSubmit: SubmitHandler<SchemaValues> = (values) => {
    form.setValue("plan", values.plan);
    console.log(values);
    navigate("/addons");
    setCurrentStep((prev) => prev + 1);
  };
  const isMobile = useMobile();

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
                  Select your plan
                </h1>
                <p className="font-UbuntuRegular text-coolGray">
                  You have the option of monthly or yearly billing.
                </p>
              </div>
              {/* RADIO GROUP */}
              <FormField
                control={form.control}
                name="plan.type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col lg:grid lg:grid-cols-3"
                      >
                        {plans.map((value) => (
                          <FormItem
                            key={value.id}
                            className="flex items-center space-x-0 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem
                                className="peer hidden"
                                value={value.name}
                              />
                            </FormControl>

                            <FormLabel
                              className={`flex w-full cursor-pointer items-center space-x-4 rounded-lg border p-4 font-UbuntuMedium transition duration-200 peer-checked:border-primary peer-checked:bg-blue-50 lg:h-48 lg:flex-col lg:place-items-start lg:space-x-0 ${
                                field.value === value.name
                                  ? "border-primary bg-blue-50"
                                  : "border-gray-300"
                              }`}
                            >
                              <div className="h-10 w-10">
                                <img
                                  src={value.icon}
                                  alt={`${value.name} Icon`}
                                  className="h-full w-full"
                                />
                              </div>
                              <div className="lg:flex-grow lg:place-content-end">
                                <p className="font-UbuntuBold text-primary ~text-base/lg">
                                  {value.name}
                                </p>
                                <p className="font-UbuntuRegular text-coolGray ~text-xs/base">
                                  {value.price}
                                </p>
                                {!isMonthly && (
                                  <p className="font-UbuntuMedium text-primary ~text-xs/base">
                                    {value.bonus}
                                  </p>
                                )}
                              </div>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* SWITCH INPUT */}
              <FormField
                control={form.control}
                name="plan.sub"
                render={() => (
                  <FormItem className="flex justify-evenly rounded-lg bg-magnolia p-2 md:py-3">
                    <FormLabel className="text-base text-primary">
                      Monthly
                    </FormLabel>
                    <FormControl>
                      {/* !m-0 removes the margin at the top of the switch */}
                      <Switch
                        className="relative !m-0 h-7 w-14 rounded-full bg-primary"
                        checked={isMonthly}
                        onCheckedChange={(checked) => setIsMonthly(checked)}
                      >
                        {/* dot inside switch */}
                        <div
                          className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-150 ease-linear ${
                            isMonthly ? "translate-x-0" : "translate-x-[27px]"
                          }`}
                        ></div>
                      </Switch>
                    </FormControl>
                    <FormLabel className="!m-0 text-base text-primary">
                      Yearly
                    </FormLabel>
                  </FormItem>
                )}
              />
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

export default SelectPlan;
