import { BrowserRouter, Route, Routes } from "react-router";
import PersonalInfo from "./routes/PersonalInfo";
import SelectPlan from "./routes/SelectPlan";
import Stepper from "./Stepper";
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
import { DevTool } from "@hookform/devtools";

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
            <Stepper />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<PersonalInfo />} />
                <Route path="/plan" element={<SelectPlan />} />
                <Route path="/addons" element={<AddOns />} />
                <Route path="/summary" element={<Summary />} />
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
