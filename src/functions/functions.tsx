import { SetStateAction } from "react";
import { useNavigate } from "react-router";

export const prevPage = (
  setState: React.Dispatch<SetStateAction<number>>,
  page: string,
  navigate: ReturnType<typeof useNavigate>,
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) => {
  e.preventDefault();
  setState((prev) => (prev > 0 ? prev - 1 : prev));
  navigate(page);
};
