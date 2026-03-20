import { createContext, useContext } from "react";
import type { AllOptions, AppState } from "../types";

export const TypingContext = createContext(
  {} as { state: AppState; dispatch: React.ActionDispatch<[AllOptions]> },
);

export function useTypingCtx() {
  return useContext(TypingContext);
}
