import { SetStateAction } from "react";
import { useNavigate } from "react-router";

export const prevPage = (
  setState: React.Dispatch<SetStateAction<number>>,
  page: string,
  navigate: ReturnType<typeof useNavigate>,
) => {
  setState((prev) => prev - 1);
  navigate(page);
};
