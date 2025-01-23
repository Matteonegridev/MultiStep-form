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

  return (
    <section>
      <div className="absolute left-0 top-0">
        <SvgComp alt="mobile sidebar" src={mobileSideBar} width={500} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          {/* RADIO GROUP */}
          <FormField
            control={form.control}
            name="plan.type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select Your Plan</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {plans.map((value) => (
                      <FormItem
                        key={value.id}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={value.name} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {value.name} {value.price}
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
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Monthly</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    className="relative h-7 w-14 rounded-full bg-primary"
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
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Yearly</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div>
        <Button
          variant="secondary"
          onClick={() => prevPage(setCurrentStep, "/", navigate)}
        >
          Prev
        </Button>
      </div>
    </section>
  );
}

export default SelectPlan;
