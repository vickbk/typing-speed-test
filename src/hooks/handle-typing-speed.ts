import { useReducer } from "react";
import type {
  ActionKeys,
  AllOptions,
  AppState,
  Difficulty,
  ModeType,
} from "../libs/types/typing-speed-types";
import { default as textes } from "../assets/data.json";
import { getRandomElement } from "../libs/random-gen";
import { getErrorsNumber } from "../libs/accuracy-helper";

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
        text: getRandomElement(textes[state.difficulty]).text,
        input: "",
        errorCount: 0,
        finish: false,
      };
    },
    updateTimer() {
      const { mode, startTyping } = state;
      const lastTyping = new Date().getTime();
      const difference = (lastTyping - startTyping!) / 1000;
      const typing = mode === "" || difference < mode;
      return { ...state, lastTyping, typing, difference, finish: !typing };
    },
    updateInput() {
      const input = payload as string;
      const errorCount = getErrorsNumber(state, input);
      const finish = input.length === state.text.length;
      return {
        ...state,
        input,
        typing: !finish,
        errorCount,
        finish,
      };
    },
  };
  return actions?.[action]();
}

export function useTypingSpeed() {
  const [state, dispatch] = useReducer(handleTypingSpeed, {
    mode: "",
    difficulty: "easy",
    typing: false,
    text: getRandomElement(textes["easy"]).text,
    errorCount: 0,
    finish: false,
  });
  return { state, dispatch };
}
