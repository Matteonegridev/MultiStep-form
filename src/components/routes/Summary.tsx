import { usePlansContext } from "@/hooks/usePlansContext";
import { useContextHook } from "@/hooks/useStepContext";
import { SchemaValues } from "@/schema/zodSchema";

import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button } from "../ui/button";

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
        <p>
          {fullData.plan.type} <span>({isMonthly ? "monthly" : "yearly"})</span>
        </p>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default Summary;
