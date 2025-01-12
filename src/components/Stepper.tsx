import { useContextHook } from "@/context/useContextHook";

function Stepper() {
  const steps = ["Personal Info", "Plan", "Add Ons", "Summary"];
  const { currentStep } = useContextHook();
  return (
    <div className="p-2">
      <ul className="flex justify-center gap-4">
        {steps.map((steps, i) => (
          <li
            className={`${currentStep !== i ? "text-secondary" : "font-bold"}`}
            key={i}
          >
            {steps}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stepper;
