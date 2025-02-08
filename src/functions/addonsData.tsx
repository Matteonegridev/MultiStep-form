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
      price: "+$2/mo",
    },
    {
      id: "customizable_profile",
      type: "Customizable profile",
      description: "Custom theme on your profile",
      price: "+$2/mo",
    },
  ],
  yearly: [
    {
      id: "online_service",
      type: "Online service",
      description: "Access to multiplayer games",
      price: "+$10/yr",
    },
    {
      id: "larger_storage",
      type: "Larger storage",
      description: "Extra 1TB of cloud save",
      price: "+$20/yr",
    },
    {
      id: "customizable_profile",
      type: "Customizable profile",
      description: "Custom theme on your profile",
      price: "+$20/yr",
    },
  ],
};

export const handleAddonsPrice = (
  data: string[],
  isMonthly: boolean,
): { type: string; price: string }[] | null => {
  const addonsType = isMonthly ? addonsData.monthly : addonsData.yearly;

  // data is the array we pass in the function => fullData.addons.items. We want to map this array going thru each item in it. Then, we want to find the id cointained in addonsType that matches the data value. Once is found we wanna get its price and type or null. We will store in showData as an array of objects, with possible nulls in it:
  const showData = data.map((values) => {
    const addonFound = addonsType.find(({ id }) => id === values);
    return addonFound
      ? { type: addonFound.type, price: addonFound.price }
      : null;
  });

  // We want to filter the nulls out the showData array, so we will get only "true" values:
  return showData.filter((addon) => addon !== null);
};
