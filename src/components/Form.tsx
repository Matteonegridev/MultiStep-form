import { BrowserRouter, Route, Routes } from "react-router";
import StepOne from "./routes/StepOne";
import StepTwo from "./routes/StepTwo";
import { useState } from "react";

function Form() {
  const [currentStep, setCurrentStep] = useState(0);
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
