import type { AppState } from "./types/typing-speed-types";

export function formatTime(secs: number) {
  return `${Math.floor(secs / 60)}:${Math.floor(secs % 60)
    .toString()
    .padStart(2, "0")}`;
}

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
