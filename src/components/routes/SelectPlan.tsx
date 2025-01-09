import { useState } from "react";
import { useContextHook } from "@/context/useContextHook";
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";

function SelectPlan() {
  // const [isYearly, setIsYearly] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true);
  const { setCurrentStep } = useContextHook();
  const navigate = useNavigate();
  const form = useForm();

  const planData = {
    monthly: [
      {
        id: 0,
        name: "Arcade",
        price: "$9/mo",
      },
      {
        id: 1,
        name: "Advanced",
        price: "$12/mo",
      },
      {
        id: 2,
        name: "Pro",
        price: "$15/mo",
      },
    ],
    yearly: [
      {
        id: 0,
        name: "Arcade",
        price: "$90/yr",
        bonus: "2 months free",
      },
      {
        id: 1,
        name: "Advanced",
        price: "$120/yr",
        bonus: "2 months free",
      },
      {
        id: 2,
        name: "Pro",
        price: "$150/yr",
        bonus: "2 months free",
      },
    ],
  };

  // This select the plan, that's why is possible to map, because once defined the plan, it leaves you with an array of object:
  const plans = isMonthly ? planData.monthly : planData.yearly;

  const onSubmit: SubmitHandler<SchemaValues> = (values) => {
    form.setValue("Plan", values.plan);
    console.log(values);
    navigate("/addons");
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
        <FormField
          control={form.control}
          name="toggle-plan"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Monthly</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onClick={() => setIsMonthly(!isMonthly)}
                />
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
  );
}

export default SelectPlan;
