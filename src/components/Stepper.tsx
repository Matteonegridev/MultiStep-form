import { useContextHook } from "@/hooks/useStepContext";
import { useEffect, useState } from "react";

function Stepper() {
  const steps = [
    { id: 0, step: 1, info: "Your Info", s: "step 1" },
    { id: 1, step: 2, info: "Select Plan", s: "step 2" },
    { id: 2, step: 3, info: "Add-Ons", s: "step 3" },
    { id: 3, step: 4, info: "Summary", s: "step 4" },
  ];
  const { currentStep } = useContextHook();
  console.log(currentStep);

  const mobileSize = window.innerWidth < 768;
  const [isMobile, setIsMobile] = useState(mobileSize);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`${isMobile ? "relative top-6 z-10" : "absolute left-10 top-[10%] z-20"}`}
    >
      <ul
        className={`${isMobile ? "flex justify-center" : "flex flex-col"} gap-6`}
      >
        {steps.map((steps) => (
          <div className="md:flex md:items-center md:justify-between md:gap-4">
            <li
              className={`${currentStep !== steps.id ? "border border-white bg-transparent text-white" : "border border-tertiary bg-quaternary text-black"} flex h-9 w-9 items-center justify-center rounded-full font-UbuntuBold`}
              key={steps.id}
            >
              {steps.step}
            </li>
            {!isMobile && (
              <div className="flex flex-grow flex-col">
                <p className="font-UbuntuRegular uppercase text-lightGray ~text-xs/sm">
                  {steps.s}
                </p>
                <p className="font-UbuntuBold uppercase text-white">
                  {steps.info}
                </p>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Stepper;
