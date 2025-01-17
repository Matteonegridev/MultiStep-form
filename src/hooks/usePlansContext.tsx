import { createContext, SetStateAction, useContext } from "react";

type PlansContextProps = {
  isMonthly: boolean;
  setIsMonthly: React.Dispatch<SetStateAction<boolean>>;
};

export const PlansProvider = createContext<PlansContextProps | null>(null);

export const usePlansContext = () => {
  const context = useContext(PlansProvider);

  if (context === undefined) {
    throw new Error("Error!");
  }

  return context;
};
