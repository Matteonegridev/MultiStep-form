type StepperProps = {
  data: string[];
  activeStep: number;
};

function Stepper({ data, activeStep }: StepperProps) {
  const totalSteps = 4;

  return (
    <div className="p-2">
      <ul className="flex justify-center gap-4">
        {data.map((steps, i) => (
          <li key={i}>{steps}</li>
        ))}
      </ul>
    </div>
  );
}

export default Stepper;
