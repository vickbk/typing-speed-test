import type { AllOptions, AppState } from "@/libs/types/typing-speed-types";
import { createContext } from "react";

export const TypingContext = createContext(
  {} as { state: AppState; dispatch: React.ActionDispatch<[AllOptions]> }
);
