import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import StepOne from "./routes/PersonalInfo";
import StepTwo from "./routes/SelectPlan";

function Form() {
  const [currentStep, setCurrentStep] = useState(0);
  const titles = ["page1", "page2", "page3", "page4"];
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <StepOne
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            }
          />
          <Route
            path="/plan"
            element={
              <StepTwo
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Form;
