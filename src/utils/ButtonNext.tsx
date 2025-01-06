import { NavLink } from "react-router";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  step: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

function ButtonNext({ step, setStep, onClick }: Props) {
  const handleStepForward = (
    setStep: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="mt-10">
      <NavLink
        onClick={(e) => {
          handleStepForward(setStep);
          // if onClick is present only:
          if (onClick) onClick(e);
        }}
        className="cursor-pointer bg-primary p-4 text-white"
        to={step}
      >
        Next
      </NavLink>
    </div>
  );
}

export default ButtonNext;
