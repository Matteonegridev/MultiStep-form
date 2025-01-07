import { useState } from "react";
import { StepProvider } from "./useContextHook";

type Props = {
  children: React.ReactNode;
};

// Export the context:
function StepContext({ children }: Props) {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <StepProvider.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </StepProvider.Provider>
  );
}

export default StepContext;
