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

export function saveTextes(state: AppState, input: string) {
  const { text, oldMistakes, input: prevIn = "" } = state;
  const sLen = prevIn.length;
  const isCorrecting = input.length < sLen;
  const finish = text.length <= input.length;
  return {
    input: isCorrecting ? text.substring(0, sLen) : input,
    oldMistakes: isCorrecting
      ? oldMistakes + input.substring(oldMistakes.length)
      : oldMistakes,
    errorCount: getErrorsNumber(state, input),
    finish,
    typing: !finish,
  };
}

export function calculateAccuracy({ input = "", errorCount }: AppState) {
  return (
    ((input.length !== 0 ? input.length - errorCount : 1) * 100) /
    (input.length || 1)
  ).toFixed();
}

export function calculateWPM({ input = "", difference }: AppState) {
  const words = input.length === 0 ? [] : splitText(input);
  return ((words.length * 60) / (difference || 1)).toFixed();
}

const SPLITTERS = ` ,.[]()"'|;:_+-&^%*`.split("");
export function splitText(text: string) {
  let splittedText = text.split(" ");
  SPLITTERS.forEach((splitter) => {
    if (splittedText.join("").indexOf(splitter) !== -1)
      splittedText = splittedText.join(splitter).split(splitter);
  });
  return splittedText.filter((text) => text !== "");
}

export function compareCurrentResults() {}
