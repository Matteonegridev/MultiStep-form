export const addonsData = {
  monthly: [
    {
      id: "online_service",
      type: "Online service",
      description: "Access to multiplayer games",
      price: "+$1/mo",
    },
    {
      id: "larger_storage",
      type: "Larger storage",
      description: "Extra 1TB of cloud save",
      price: "+2/mo",
    },
    {
      id: "customizable_profile",
      type: "Customizable profile",
      description: "Custom theme on your profile",
      price: "+2/mo",
    },
  ],
  yearly: [
    {
      id: "online_service",
      type: "Online service",
      description: "Access to multiplayer games",
      price: "+10/yr",
    },
    {
      id: "larger_storage",
      type: "Larger storage",
      description: "Extra 1TB of cloud save",
      price: "+20/yr",
    },
    {
      id: "customizable_profile",
      type: "Customizable profile",
      description: "Custom theme on your profile",
      price: "+20/yr",
    },
  ],
};

export const handleAddonsPrice = (data: string, isMonthly: boolean): string => {
  const addonsType = isMonthly ? addonsData.monthly : addonsData.yearly;

  // Map selected addon IDs to their prices

  // Find the addon with the matching ID
  const addonPrice = addonsType.find(({ id }) => id === data);

  console.log(addonPrice);
  // Return the price if the addon is found, or a default message if not found
  return addonPrice
    ? `${addonPrice.type} ${addonPrice.price}`
    : "No add ons selected";
};
