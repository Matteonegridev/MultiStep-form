function Stepper() {
  const steps = ["page1", "page2", "page3", "page4"];
  return (
    <div className="p-2">
      <ul className="flex justify-center gap-4">
        {steps.map((steps, i) => (
          <li key={i}>{steps}</li>
        ))}
      </ul>
    </div>
  );
}

export default Stepper;
