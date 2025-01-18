import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useContextHook } from "@/hooks/useStepContext";
import { usePlansContext } from "@/hooks/usePlansContext";
import { SchemaValues } from "@/schema/zodSchema";
import { prevPage } from "@/utilities/functions";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { addonsData } from "@/utilities/addonsData";

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {addons.map((value) => (
          <FormField
            key={value.id}
            control={form.control}
            name="addons.items"
            render={({ field }) => (
              <FormItem
                key={value.id}
                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
              >
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(value.id)}
                    onCheckedChange={(checked) => {
                      // Get the current value of addons.items from the form state
                      const currentAddons = form.getValues("addons.items");

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
                <div className="space-y-1 leading-none">
                  <FormLabel>{value.type}</FormLabel>
                  <div>
                    <FormDescription>{value.description}</FormDescription>
                    <FormLabel>{value.price}</FormLabel>
                  </div>
                </div>
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">Submit</Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => prevPage(setCurrentStep, "/plan", navigate)}
        >
          Prev
        </Button>
      </form>
    </Form>
  );
}

export default AddOns;
