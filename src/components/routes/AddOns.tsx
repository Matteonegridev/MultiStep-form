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
import { SchemaValues } from "@/schema/zodSchema";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

function AddOns({}: Props) {
  const form = useFormContext<SchemaValues>();
  const navigate = useNavigate();

  const addonsData = {
    monthly: [
      {
        id: 0,
        type: "Online service",
        description: "Access to multiplayer gemes",
        price: "+$1/mo",
      },
      {
        id: 1,
        type: "Larger storage",
        description: "Extra 1TB of cloud save",
        price: "+2/mo",
      },
      {
        id: 2,
        type: "Customizable profile",
        description: "Custom theme on your profile",
        price: "+2/mo",
      },
    ],
    yearly: [
      {
        id: 0,
        type: "Online service",
        description: "Access to multiplayer gemes",
        price: "+10/yr",
      },
      {
        id: 1,
        type: "Larger storage",
        description: "Extra 1TB of cloud save",
        price: "+20/yr",
      },
      {
        id: 2,
        type: "Customizable profile",
        description: "Custom theme on your profile",
        price: "+20/yr",
      },
    ],
  };

  const onSubmit: SubmitHandler<SchemaValues> = (values) => {
    form.setValue("addons", values.addons);
    navigate("/summary");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Use different settings for my mobile devices
                </FormLabel>
                <FormDescription>
                  You can manage your mobile notifications in the{" "}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default AddOns;
