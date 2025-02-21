import { BrowserRouter, Route, Routes } from "react-router";
import PersonalInfo from "./routes/PersonalInfo";
import SelectPlan from "./routes/SelectPlan";
import AddOns from "./routes/AddOns";
import Summary from "./routes/Summary";
import { FormProvider, useForm } from "react-hook-form";
import StepContext from "@/context/StepContext";
import PlansContext from "@/context/PlansContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formDefaultValues,
  SchemaValues,
  zodValidation,
} from "@/schema/zodSchema";
import ThankYou from "./routes/ThankYou";

function Form() {
  // Provide context for the form:
  const mainFormMethods = useForm<SchemaValues>({
    resolver: zodResolver(zodValidation),

    mode: "all",
    defaultValues: formDefaultValues,
  });

  return (
    <div>
      <StepContext>
        <PlansContext>
          <FormProvider {...mainFormMethods}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<PersonalInfo />} />
                <Route path="/plan" element={<SelectPlan />} />
                <Route path="/addons" element={<AddOns />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/thankyou" element={<ThankYou />} />
              </Routes>
            </BrowserRouter>
          </FormProvider>
        </PlansContext>
      </StepContext>
    </div>
  );
}

export default Form;
