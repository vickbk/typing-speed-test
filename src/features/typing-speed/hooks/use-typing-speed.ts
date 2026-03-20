import { getRandomElement } from "@/shared";
import { useReducer } from "react";
import { default as textes } from "../assets/data.json";
import { handleTypingSpeed } from "../scripts";
import type { Difficulty } from "../types";

export function useTypingSpeed() {
  const [state, dispatch] = useReducer(handleTypingSpeed, {
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
  });
  return { state, dispatch };
}
