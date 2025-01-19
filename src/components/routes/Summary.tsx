import { usePlansContext } from "@/hooks/usePlansContext";
import { useContextHook } from "@/hooks/useStepContext";
import { SchemaValues } from "@/schema/zodSchema";

import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button } from "../ui/button";
import { handleAddonsPrice } from "@/utilities/addonsData";
import { handlePlanPrice } from "@/utilities/selectPlanData";
import { prevPage } from "@/utilities/functions";

function Summary() {
  const form = useFormContext<SchemaValues>();
  const navigate = useNavigate();
  const { isMonthly } = usePlansContext();
  const { setCurrentStep } = useContextHook();

  const fullData = form.getValues();
  console.dir(fullData);

  // Make the the call to the server to send the data:
  const sendData = async (formData: SchemaValues) => {
    try {
      const response = await axios.post("http://localhost:5000/api", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response data:", response.data);

      return response.data;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Handle the data when press the submit:
  const onSubmit: SubmitHandler<SchemaValues> = async (data) => {
    const result = await sendData(data);
    if (result) {
      setTimeout(() => {
        navigate("/thankyou");
      }, 1000);
    }
  };

  const addonsInfo = isMonthly
    ? handleAddonsPrice(fullData.addons.items as string[], true)
    : handleAddonsPrice(fullData.addons.items as string[], false);

  const plansInfo = isMonthly
    ? handlePlanPrice(fullData.plan.type, true)
    : handlePlanPrice(fullData.plan.type, false);

  const totalAddons = addonsInfo
    ?.map((values) => {
      const onlyNumber = values.price.replace(/[^\d]/g, "");
      return parseInt(onlyNumber);
    })
    .reduce((acc, price) => {
      return acc + price;
    }, 0);

  const total = totalAddons
    ? totalAddons + parseInt(plansInfo.replace(/[^\d]/g, ""))
    : parseInt(plansInfo.replace(/[^\d]/g, ""));

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="overflow-auto rounded-md bg-gray-100 p-4 text-sm text-gray-800">
        <>
          {/* PLAN AND ADDONS SECTION*/}
          <div className="flex items-center justify-between border-b-2 border-lightGray pb-2">
            <p className="font-bold text-primary">
              {fullData.plan.type} <span>(Monthly)</span>
            </p>
            <p className="font-bold text-primary">{plansInfo}</p>
          </div>
          {fullData.addons.items && fullData.addons.items.length > 0 ? (
            addonsInfo?.map((items, i) => (
              <div key={i} className="flex justify-between pt-2">
                <p className="font-semibold text-coolGray">{items.type}</p>
                <p>{items.price}</p>
              </div>
            ))
          ) : (
            <p className="font-semibold text-coolGray">No add ons selected</p>
          )}
        </>
        {/* TOTAL */}
        <div className="flex items-center justify-between">
          <p className="font-semibold text-coolGray">
            Total ({isMonthly ? "per month" : "per year"})
          </p>
          <p className="font-bold text-secondary">
            ${total}
            {isMonthly ? "/mo" : "/yr"}
          </p>
        </div>
      </div>
      <Button type="submit">Submit</Button>
      <div>
        <Button
          variant="secondary"
          onClick={() => prevPage(setCurrentStep, "/addons", navigate)}
        >
          Prev
        </Button>
      </div>
    </form>
  );
}

export default Summary;
