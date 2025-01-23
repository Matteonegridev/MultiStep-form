import { useContextHook } from "@/hooks/useStepContext";

function Stepper() {
  const steps = ["1", "2", "3", "4"];
  const { currentStep } = useContextHook();
  console.log(currentStep);

  return (
    <div className="relative top-6 z-10">
      <ul className="flex justify-center gap-6">
        {steps.map((steps, i) => (
          <li
            className={`${currentStep !== i ? "border border-white bg-transparent text-white" : "border border-tertiary bg-tertiary text-black"} flex h-9 w-9 items-center justify-center rounded-full font-bold`}
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
