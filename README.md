# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ).

## My process

### Built with

- Typescript
- Tailwind
- React.js
- Shadcn
- Mobile-first workflow

### What I learned

Perfect project if you want to master the knowledge on forms. This multistep form has been built with Shadcn components. It was a nice challenge even tho I wouldn't find necessary.

Here some pieces of code

```js
function Form() {
  // Provide context for the form:
  const mainFormMethods =
    useForm <
    SchemaValues >
    {
      resolver: zodResolver(zodValidation),
      mode: "all",
      defaultValues: formDefaultValues,
    };

  return (
    <div>
      <StepContext>
        <PlansContext>
          <FormProvider {...mainFormMethods}>
            <Stepper />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<PersonalInfo />} />
                <Route path="/plan" element={<SelectPlan />} />
                <Route path="/addons" element={<AddOns />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/thankyou" element={<ThankYou />} />
              </Routes>
              <DevTool control={mainFormMethods.control} />
            </BrowserRouter>
          </FormProvider>
        </PlansContext>
      </StepContext>
    </div>
  );
}

export default Form;
```

The hook useForm from React Hook Form allows to gather data from each step.
Each step will send their data to the schema and inn the summary page sent to the server with a post call.

### function:

a function that was a great help to show data into the summary page is:

```js

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

```

First of all we need to filter either the data is monthly or yearly:

```js
//...
const addonsType = isMonthly ? addonsData.monthly : addonsData.yearly;
```

The data we will send to the function is going to be monthly or yearly as well, so we want to match the value from that array of data with the id. If it's found we want to return an object with its price and type or null if absent.
Finally we need to filter the nulls out.

Here is where the data is used:

```js
const addonsInfo = isMonthly
    ? handleAddonsPrice(fullData.addons.items as string[], true)
    : handleAddonsPrice(fullData.addons.items as string[], false);

  const plansInfo = isMonthly
    ? handlePlanPrice(fullData.plan.type, true)
    : handlePlanPrice(fullData.plan.type, false);

  const totalAddons = addonsInfo
    ?.map((values) => {
      const onlyNumber = values.price.replace(/[^\d]/g, "");
      return parseInt(onlyNumber);
    })
    .reduce((acc, price) => {
      return acc + price;
    }, 0);

  const total = totalAddons
    ? totalAddons + parseFloat(plansInfo.replace(/[^-\d]/g, ""))
    : parseFloat(plansInfo.replace(/[^-\d]/g, ""));


```

Another cool function, or better, a custom hook, it's the useMobile.tsx.
Here we use the matchMedia to check if the window width matches with the given CSS.
Instead of constantly listening for resize events, matchMedia() only triggers updates when the query's state changes, making it more efficient.
Resize runs on every pixel change.

```js
import { useState, useEffect } from "react";

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (event: MediaQueryListEvent) =>
      setIsMobile(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
};

export default useMobile;
```

This works this way:

```js
const mediaQuery = window.matchMedia("(max-width: 768px)");

console.log(mediaQuery.matches); // true if screen is < 768px, otherwise false
console.log(mediaQuery.media); // Logs "(max-width: 768px)"
```

## Author

- Website - [Add your name here](https://www.your-site.com)
- Matteo Negri
