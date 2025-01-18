export const planData = {
  monthly: [
    { id: 0, name: "Arcade", price: "$9/mo" },
    { id: 1, name: "Advanced", price: "$12/mo" },
    { id: 2, name: "Pro", price: "$15/mo" },
  ],
  yearly: [
    { id: 0, name: "Arcade", price: "$90/yr", bonus: "2 months free" },
    { id: 1, name: "Advanced", price: "$120/yr", bonus: "2 months free" },
    { id: 2, name: "Pro", price: "$150/yr", bonus: "2 months free" },
  ],
};

export const handlePlanPrice = (
  type: "Arcade" | "Advanced" | "Pro",
  isMonthly: boolean,
): string => {
  switch (type) {
    case "Arcade":
      return isMonthly ? "$9/mo" : "$90/yr";
    case "Advanced":
      return isMonthly ? "$12/mo" : "$120/yr";
    case "Pro":
      return isMonthly ? "$15/mo" : "$150/yr";
    default:
      return "";
  }
};
