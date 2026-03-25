import { useTypingCtx, type Difficulty } from "@/features/typing-speed";
import { getMemoItem, setMemoItem } from "@/shared";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const options = ["easy", "medium", "hard", "quote", "code"];

export function useChallengeOptions() {
  const {
    state: { difficulty },
    dispatch,
  } = useTypingCtx();

  const [queries] = useSearchParams();

  useEffect(() => {
    const difficulty = queries.get("difficulty") as Difficulty;
    dispatch({
      action: "difficulty",
      payload:
        (options.includes(difficulty) ? difficulty : null) ??
        getMemoItem("difficulty") ??
        "easy",
    });
  }, []);

  return {
    difficulty,
    options,
    ...useMemo(
      () => ({
        setDifficulty<T>(payload: T) {
          setMemoItem("difficulty", payload);
          dispatch({ action: "difficulty", payload: payload as Difficulty });
        },
      }),
      [queries],
    ),
  };
}
