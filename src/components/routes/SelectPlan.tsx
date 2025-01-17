import { useEffect, useState } from "react";
import { useContextHook } from "@/hooks/useContextHook";
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
import { prevPage } from "@/utilities/functions";

import { Switch } from "@radix-ui/react-switch";

function SelectPlan() {
  const [isMonthly, setIsMonthly] = useState(true);
  const { setCurrentStep } = useContextHook();
  const navigate = useNavigate();
  const form = useFormContext<SchemaValues>();

  const planData = {
    monthly: [
      { id: 0, name: "Arcade", price: "$9/mo" },
      { id: 1, name: "Advanced", price: "$12/mo" },
      { id: 2, name: "Pro", price: "$15/mo" },
    ],
    yearly: [
      { id: 0, name: "Arcade", price: "$90/yr", bonus: "2 months free" },
      { id: 1, name: "Advanced", price: "$120/yr", bonus: "2 months free" },
      { id: 2, name: "Pro", price: "$150/yr", bonus: "2 months free" },
    ],
  };

  // Show monthly plans when isMonthly is true, and yearly plans when false
  const plans = isMonthly ? planData.monthly : planData.yearly;

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
    <>
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
    </>
  );
}

export default SelectPlan;
