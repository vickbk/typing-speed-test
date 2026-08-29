import type { Difficulty, ModeType } from "@/features/typing-speed";
import { setMemoItem } from "@/shared";

export function saveParams<T extends ModeType | Difficulty>(
  key: "mode" | "difficulty",
  value: T,
) {
  setMemoItem(key, value);
  return value as T;
}

export function saveMode(value: ModeType) {
  return saveParams("mode", value);
}
export function saveDifficulty(value: Difficulty) {
  return saveParams("difficulty", value);
}
