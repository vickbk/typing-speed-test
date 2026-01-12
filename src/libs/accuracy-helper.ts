import type { AppState } from "./types/typing-speed-types";

export function getErrorsNumber({ errorCount, text }: AppState, input: string) {
  const { length } = input;

  return (
    errorCount +
    (length === 0
      ? 0
      : input.charAt(length - 1) === text.charAt(length - 1)
      ? 0
      : 1)
  );
}

export function calculateAccuracy({ input = "", errorCount }: AppState) {
  return (
    ((input.length - errorCount || 1) * 100) /
    (input.length || 1)
  ).toFixed();
}
