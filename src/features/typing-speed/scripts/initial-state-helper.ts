import type { AppState } from "../types";

export function buildInitialState(state: Partial<AppState> = {}): AppState {
  return {
    mode: "",
    difficulty: "easy",
    typing: false,
    text: "test",
    errorCount: 0,
    finish: false,
    best: 0,
    oldMistakes: "",
    input: "",
    difference: 0,
    ...state,
  };
}
