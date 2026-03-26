import { getRandomElement } from "@/shared";
import { useReducer } from "react";
import { default as textes } from "../assets/data.json";
import { handleTypingSpeed } from "../scripts";
import type { AppState, Difficulty } from "../types";

export function useTypingSpeed(initial: AppState | null = null) {
  const [state, dispatch] = useReducer(
    handleTypingSpeed,
    initial ?? {
      mode: "",
      difficulty: "easy",
      typing: false,
      text: getRandomElement(
        textes[
          getRandomElement<Difficulty>([
            "easy",
            "code",
            "hard",
            "medium",
            "quote",
          ])
        ],
      ).text,
      errorCount: 0,
      finish: false,
      best: 0,
      oldMistakes: "",
    },
  );
  return { state, dispatch };
}
