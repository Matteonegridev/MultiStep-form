import { useState } from "react";
import { StepProvider } from "./useContextHook";

type Props = {
  children: React.ReactNode;
};

export // Export the context to wrap the app:
function StepContext({ children }: Props) {
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <StepProvider.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </StepProvider.Provider>
  );
}

export default StepContext;
