import { useReducer } from "react";
import type {
  ActionKeys,
  AllOptions,
  AppState,
  Difficulty,
  ModeType,
} from "../libs/types/typing-speed-types";

export function handleTypingSpeed(
  state: AppState,
  { action, payload }: AllOptions
) {
  const actions: Record<ActionKeys, () => AppState> = {
    difficulty() {
      return { ...state, difficulty: payload as Difficulty, typing: false };
    },
    mode() {
      return { ...state, mode: payload as ModeType, typing: false };
    },
    startTyping() {
      const time = new Date().getTime();
      return {
        ...state,
        typing: true,
        startTyping: time,
        lastTyping: time,
        difference: 0,
      };
    },
    updateTimer() {
      const { mode, startTyping } = state;
      const lastTyping = new Date().getTime();
      const difference = (lastTyping - startTyping!) / 1000;
      const typing = mode === "" || difference < mode;
      return { ...state, lastTyping, typing, difference };
    },
  };
  return actions?.[action]();
}

export function useTypingSpeed() {
  const [state, dispatch] = useReducer(handleTypingSpeed, {
    mode: "",
    difficulty: "easy",
    typing: false,
  });
  return { state, dispatch };
}
