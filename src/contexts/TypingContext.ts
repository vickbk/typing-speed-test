import { createContext } from "react";
import type { AllOptions, AppState } from "../libs/types/typing-speed-types";

export const TypingContext = createContext(
  {} as { state: AppState; dispatch: React.ActionDispatch<[AllOptions]> }
);
