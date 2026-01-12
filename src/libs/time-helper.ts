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
