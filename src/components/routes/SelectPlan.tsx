import { type StepsProps } from "./PersonalInfo";
import ButtonNext from "@/utils/ButtonNext";
import ButtonPrev from "@/utils/ButtonPrev";

function StepTwo({ currentStep, setCurrentStep }: StepsProps) {
  console.log(currentStep);
  return (
    <div>
      step2
      <ButtonNext step="" setStep={setCurrentStep} />
      <ButtonPrev step="/" setStep={setCurrentStep} />
    </div>
  );
}

export default StepTwo;
