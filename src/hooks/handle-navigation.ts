import type { SearchQuery } from "@/libs/types/typing-speed-types";
import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useCustomNavigation() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const pathSetter = useCallback(
    ({ param, value }: SearchQuery) => {
      params.set(param, value);
      navigate(`params?${params}`);
    },
    [params]
  );
  return [params, pathSetter] as const;
}
