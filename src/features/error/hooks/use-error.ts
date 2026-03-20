import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ErrorProps } from "../types";

export function useError({ error }: ErrorProps) {
  const navigate = useNavigate();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return { navigate };
}
