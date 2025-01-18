import { usePlansContext } from "@/hooks/usePlansContext";
import { useContextHook } from "@/hooks/useStepContext";
import { SchemaValues } from "@/schema/zodSchema";

import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button } from "../ui/button";
import { addonsData, handleAddonsPrice } from "@/utilities/addonsData";
import { handlePlanPrice } from "@/utilities/selectPlanData";
import { prevPage } from "@/utilities/functions";

function Summary() {
  const form = useFormContext<SchemaValues>();
  const navigate = useNavigate();
  const { isMonthly } = usePlansContext();
  const { setCurrentStep } = useContextHook();

  const fullData = form.getValues();

  console.log(fullData);

  const sendData = async (formData: SchemaValues) => {
    try {
      const response = await axios.post("/api/data", formData, {
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

  const onSubmit: SubmitHandler<SchemaValues> = async (data) => {
    const result = await sendData(data);
    if (result) {
      navigate("/thankyou");
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="overflow-auto rounded-md bg-gray-100 p-4 text-sm text-gray-800">
        {isMonthly ? (
          <div>
            <p>
              {fullData.plan.type} <span>(Monthly)</span>
            </p>
            <p>{handlePlanPrice(fullData.plan.type, true)}</p>
            {fullData.addons.items?.map((items) => (
              <p>{handleAddonsPrice(items, true)}</p>
            ))}
          </div>
        ) : (
          <div>
            <p>
              {fullData.plan.type} <span>(Yearly)</span>
            </p>
            <p>{handlePlanPrice(fullData.plan.type, false)}</p>
          </div>
        )}
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
