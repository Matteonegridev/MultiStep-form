import { BrowserRouter, Route, Routes } from "react-router";
import PersonalInfo from "./routes/PersonalInfo";
import SelectPlan from "./routes/SelectPlan";
import Stepper from "./Stepper";
import AddOns from "./routes/AddOns";
import Summary from "./routes/Summary";
import { FormProvider, useForm } from "react-hook-form";
import StepContext from "@/context/StepContext";

function Form() {
  // Provide context for the form:
  const MainFormMethods = useForm();
  return (
    <div>
      <StepContext>
        <FormProvider {...MainFormMethods}>
          <Stepper />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PersonalInfo />} />
              <Route path="/plan" element={<SelectPlan />} />
              <Route path="/addons" element={<AddOns />} />
              <Route path="/summary" element={<Summary />} />
            </Routes>
          </BrowserRouter>
        </FormProvider>
      </StepContext>
    </div>
  );
}

export default Form;
