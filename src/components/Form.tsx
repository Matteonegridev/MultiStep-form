import { BrowserRouter, Route, Routes } from "react-router";
import PersonalInfo from "./routes/PersonalInfo";
import SelectPlan from "./routes/SelectPlan";
import Stepper from "./Stepper";
import AddOns from "./routes/AddOns";
import Summary from "./routes/Summary";
import { FormProvider, useForm } from "react-hook-form";

function Form() {
  const steps = ["page1", "page2", "page3", "page4"];
  const activeStep = 1;
  const MainFormMethods = useForm();
  return (
    <div>
      <FormProvider {...MainFormMethods}>
        <Stepper activeStep={activeStep} data={steps} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PersonalInfo />} />
            <Route path="/plan" element={<SelectPlan />} />
            <Route path="/addons" element={<AddOns />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </div>
  );
}

export default Form;
