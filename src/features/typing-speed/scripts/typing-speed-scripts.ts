import { getRandomElement } from "@/shared";
import { default as textes } from "../assets/data.json";
import type {
  ActionKeys,
  AllOptions,
  AppState,
  Difficulty,
  ModeType,
} from "../types";
import { saveTextes } from "./calculation-helper";

export function handleTypingSpeed(
  state: AppState,
  { action, payload }: AllOptions,
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
        lastInputTime: time,
        difference: 0,
        text: getRandomElement(textes[state.difficulty]).text,
        input: "",
        oldMistakes: "",
        errorCount: 0,
        finish: false,
      };
    },
    stopTyping() {
      return { ...state, typing: false };
    },
    updateTimer() {
      if (!state.typing) return state;
      const { mode, startTyping, finish } = state;
      const lastTyping = new Date().getTime();
      const difference = (lastTyping - startTyping!) / 1000;
      const noLongerTyping = lastTyping - state.lastInputTime! >= 5000;
      const typing =
        !noLongerTyping &&
        ((mode === "" && !finish) || (mode !== "" && difference < mode));
      return {
        ...state,
        lastTyping,
        typing,
        difference,
        finish: !typing && !noLongerTyping,
      };
    },
    updateInput() {
      const textes = saveTextes(state, payload as string);
      return {
        ...state,
        ...textes,
        lastInputTime: new Date().getTime(),
      };
    },
    updateHighScore() {
      return { ...state, best: payload as number };
    },
  };
  return actions?.[action]();
}
