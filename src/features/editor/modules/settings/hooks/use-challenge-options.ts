import { useTypingCtx, type Difficulty } from "@/features/typing-speed";
import { getMemoItem } from "@/shared";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { saveDifficulty } from "../scripts";

const options = ["easy", "medium", "hard", "quote", "code"];

export function useChallengeOptions() {
  const {
    state: { difficulty },
    dispatch,
  } = useTypingCtx();

  const [queries] = useSearchParams();

  return {
    difficulty,
    options,
    ...useMemo(
      () => ({
        setDifficulty<T>(payload: T) {
          dispatch({
            action: "difficulty",
            payload: saveDifficulty(payload as Difficulty),
          });
        },
        loadDifficulty(node: HTMLElement | null) {
          if (node) {
            const difficulty = queries.get("difficulty") as Difficulty;
            dispatch({
              action: "difficulty",
              payload:
                (options.includes(difficulty)
                  ? saveDifficulty(difficulty)
                  : null) ??
                getMemoItem("difficulty") ??
                "easy",
            });
          }
        },
      }),
      [dispatch, queries],
    ),
  };
}
