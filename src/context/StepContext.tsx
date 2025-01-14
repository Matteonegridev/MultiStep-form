import { useEffect, useState } from "react";
import { StepProvider } from "./useContextHook";

type Props = {
  children: React.ReactNode;
};

const initialState = () => {
  const getStep = sessionStorage.getItem("step");
  return getStep ? JSON.parse(getStep) : 0;
};

export // Export the context to wrap the app:
function StepContext({ children }: Props) {
  const [currentStep, setCurrentStep] = useState<number>(initialState);

  useEffect(() => {
    sessionStorage.setItem("step", JSON.stringify(currentStep));
  }, [currentStep]);

  // This useEffect makes sure when the user hits the back button from the browser also the stepper and so the step goes back:
  useEffect(() => {
    const historyBack = () => {
      // prev > 0 makes sure we dont go below the 0:
      setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
    };
    // popstate is a built-it listener:
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
