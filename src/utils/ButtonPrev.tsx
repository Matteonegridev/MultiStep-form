import { NavLink } from "react-router";

type Props = {
  step: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

function ButtonPrev({ step, setStep }: Props) {
  const handleStepBack = (
    setStep: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setStep((prev) => prev - 1);
  };
  return (
    <div className="mt-10">
      <NavLink
        onClick={() => handleStepBack(setStep)}
        className="cursor-pointer bg-primary p-4 text-white"
        to={step}
      >
        Prev
      </NavLink>
    </div>
  );
}

export default ButtonPrev;
