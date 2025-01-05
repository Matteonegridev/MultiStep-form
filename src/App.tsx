import { BrowserRouter, Route, Routes } from "react-router";
import StepOne from "./components/routes/StepOne";
import StepTwo from "./components/routes/StepTwo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StepOne />} />
        <Route path="/plan" element={<StepTwo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
