import { useState } from "react";
import { PlansProvider } from "@/hooks/usePlansContext";

type PropsProvider = {
  children: React.ReactNode;
};

function PlansContext({ children }: PropsProvider) {
  const [isMonthly, setIsMonthly] = useState<boolean>(false);

  return (
    <PlansProvider.Provider value={{ isMonthly, setIsMonthly }}>
      {children}
    </PlansProvider.Provider>
  );
}

export default PlansContext;
