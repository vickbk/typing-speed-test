import { useTypingCtx, type Difficulty } from "@/features/typing-speed";
import { getMemoItem, setMemoItem } from "@/shared";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

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
        loadDifficulty(node: HTMLElement | null) {
          if (node) {
            const difficulty = queries.get("difficulty") as Difficulty;
            dispatch({
              action: "difficulty",
              payload:
                (options.includes(difficulty) && difficulty) ||
                getMemoItem("difficulty") ||
                "easy",
            });
          }
        },
        setDifficulty<T>(payload: T) {
          setMemoItem("difficulty", payload);
          dispatch({ action: "difficulty", payload: payload as Difficulty });
        },
      }),
      [queries],
    ),
  };
}
