import { useReducer } from "react";
import type {
  AllOptions,
  AppState,
  Difficulty,
  ModeType,
} from "../libs/types/typing-speed-types";

export function handleTypingSpeed(
  state: AppState,
  { action, payload }: AllOptions
) {
  const actions = {
    difficulty() {
      return { ...state, difficulty: payload as Difficulty };
    },
    mode() {
      return { ...state, mode: payload as ModeType };
    },
  };
  return actions?.[action]();
}

export function useTypingSpeed() {
  const [state, dispatch] = useReducer(handleTypingSpeed, {
    mode: "",
    difficulty: "easy",
  });
  return { state, dispatch };
}
