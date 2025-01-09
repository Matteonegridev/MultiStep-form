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

  // This useEffect makes sure when the user hits the back button from the browser also the stepper and so the step goes back:
  useEffect(() => {
    const historyBack = () => {
      setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
    };

    window.addEventListener("popstate", historyBack);

    return () => {
      window.removeEventListener("popstate", historyBack);
    };
  }, []);

  return (
    <StepProvider.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </StepProvider.Provider>
  );
}

export default StepContext;
