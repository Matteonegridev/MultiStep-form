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
import { prevPage } from "@/functions/functions";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { addonsData } from "@/functions/addonsData";
import mobileSideBar from "/assets/images/bg-sidebar-mobile.svg";
import SvgComp from "@/utilities/SvgComp";

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
    <section>
      <div className="absolute left-0 top-0">
        <SvgComp alt="mobile sidebar" src={mobileSideBar} width={500} />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-[70dvh] bg-magnolia"
        >
          <div className="relative z-10 m-auto mt-16 w-11/12 space-y-4 rounded-lg bg-white px-5 py-5 shadow-lg">
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
                render={({ field }) => {
                  // check is the fiel.value (array of string) , includes the actual value id
                  const isChecked = field.value?.includes(value.id);

                  // You can return the component here after placed a variable:
                  return (
                    <FormItem
                      key={value.id}
                      className={`grid grid-cols-[35px_1fr] items-center rounded-lg border px-3 py-2 transition-colors ${
                        isChecked ? "border-secondary bg-magnolia" : ""
                      }`}
                    >
                      <FormControl>
                        <Checkbox
                          className="grid h-[1.25em] w-[1.25em] appearance-none place-content-center border border-secondary bg-white text-secondary data-[state=checked]:bg-secondary"
                          // pass the variable into the checked state:
                          checked={isChecked}
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
                          <FormLabel className="font-UbuntuBold text-primary ~text-sm/lg">
                            {value.type}
                          </FormLabel>
                          <FormDescription className="font-UbuntuRegular text-coolGray ~text-xs/base">
                            {value.description}
                          </FormDescription>
                        </div>
                        <FormLabel className="~text-xs/base">
                          {value.price}
                        </FormLabel>
                      </div>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-5 right-4">
            <Button
              className="rounded-sm bg-primary px-[1em] py-[.5em] font-semibold text-white"
              type="submit"
            >
              Next Step
            </Button>
          </div>
          <div className="absolute bottom-5 left-4">
            <Button
              className="rounded-sm bg-transparent px-[1em] py-[.5em] font-semibold text-coolGray"
              onClick={() => prevPage(setCurrentStep, "/", navigate)}
            >
              Go Back
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default AddOns;
