import { useEffect, useState } from "react";
import { StepProvider } from "./useContextHook";

type Props = {
  children: React.ReactNode;
};

const initialState = () => {
  const getStep = localStorage.getItem("step");
  return getStep ? JSON.parse(getStep) : 0;
};

export // Export the context to wrap the app:
function StepContext({ children }: Props) {
  const [currentStep, setCurrentStep] = useState<number>(initialState);

  useEffect(() => {
    localStorage.setItem("step", JSON.stringify(currentStep));
  }, [currentStep]);

  return (
    <StepProvider.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </StepProvider.Provider>
  );
}

export default StepContext;
