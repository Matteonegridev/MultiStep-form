import { createContext, Dispatch, SetStateAction, useContext } from "react";

type ContextProps = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

export const StepProvider = createContext<ContextProps | null>(null);

// Use Context:
export const useContextHook = () => {
  const context = useContext(StepProvider);

  if (context === undefined) {
    throw new Error("Error!");
  }

  return context;
};
