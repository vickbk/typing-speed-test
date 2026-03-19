import { formatTime } from "@/shared";
import type { AppState } from "../types";

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
      ? oldMistakes + prevIn.substring(oldMistakes.length)
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

export function getTimeDisplay({ typing, mode, difference }: AppState) {
  return typing
    ? mode === ""
      ? formatTime(difference!)
      : formatTime(mode - difference!)
    : mode === ""
      ? formatTime(0)
      : formatTime(mode);
}

export function getTimeRange({ typing, mode, difference }: AppState) {
  const ranges = [
    ["excellent", 0.8, 1],
    ["good", 0.6, 0.8],
    ["ok", 0.4, 0.6],
    ["bad", 0.2, 0.4],
    ["worse", -100, 0.2],
  ] as const;
  const [range] = ranges.find(([, min, max]) => {
    const modeDiff =
      mode !== "" ? (mode - difference!) / mode : (60 - difference!) / 60;

    return typing ? min < modeDiff && max >= modeDiff : max === 1;
  }) ?? ["excellent"];
  return range;
}
