import { useContextHook } from "@/hooks/useStepContext";

function Stepper() {
  const steps = [
    { id: 0, step: 1 },
    { id: 1, step: 2 },
    { id: 2, step: 3 },
    { id: 3, step: 4 },
  ];
  const { currentStep } = useContextHook();
  console.log(currentStep);

  return (
    <div className="relative top-6 z-10">
      <ul className="flex justify-center gap-6">
        {steps.map((steps) => (
          <li
            className={`${currentStep !== steps.id ? "border border-white bg-transparent text-white" : "border border-tertiary bg-quaternary text-black"} flex h-9 w-9 items-center justify-center rounded-full font-UbuntuBold`}
            key={steps.id}
          >
            {steps.step}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stepper;
