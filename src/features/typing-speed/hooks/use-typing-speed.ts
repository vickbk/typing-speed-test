import { getRandomElement } from "@/shared";
import { useReducer } from "react";
import { default as textes } from "../assets/data.json";
import { buildInitialState, handleTypingSpeed } from "../scripts";
import type { AppState, Difficulty } from "../types";

export function useTypingSpeed(initial: AppState | null = null) {
  const [state, dispatch] = useReducer(
    handleTypingSpeed,
    initial ??
      buildInitialState({
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
      }),
  );
  return { state, dispatch };
}
