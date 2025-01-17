import { createContext, useContext } from "react";
import { Dispatch, SetStateAction } from "react";

export type ContextProps = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

export const StepProvider = createContext<ContextProps | undefined>(undefined);

// Use Context in each file with a custom hook: The custom hook already takes the useContext.
export const useContextHook = () => {
  const context = useContext(StepProvider);

  if (context === undefined) {
    throw new Error("Error!");
  }

  return context;
};
