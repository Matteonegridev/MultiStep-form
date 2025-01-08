import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useContextHook } from "@/context/useContextHook";
import { useState } from "react";
import { useNavigate } from "react-router";

function SelectPlan() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
  const { setCurrentStep } = useContextHook();
  const navigate = useNavigate();

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
        name: "Pro",
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

  return (
    <section className="">
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label className="" htmlFor="option-one">
            Option One
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-three" id="option-three" />
          <Label htmlFor="option-three">Option Three</Label>
        </div>
      </RadioGroup>
      <div>
        <button
          className="bg-primary text-white"
          onClick={() => {
            setCurrentStep((prev) => prev - 1);
            navigate("/");
          }}
        >
          prev
        </button>
      </div>
    </section>
  );
}

export default SelectPlan;
