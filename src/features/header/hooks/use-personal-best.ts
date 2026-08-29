import { useTypingCtx, type TypeScore } from "@/features/typing-speed";
import { getMemoItem } from "@/shared";
import { useEffect } from "react";

export function usePersonalBest() {
  const {
    state: { difficulty, best },
    dispatch,
  } = useTypingCtx();

  useEffect(() => {
    const results = getMemoItem<TypeScore[]>(`score.${difficulty}`) || [
      { wpm: 0 },
    ];
    const [higher] = results.sort(
      ({ wpm: aWPM }, { wpm: bWPM }) => bWPM - aWPM,
    );
    dispatch({ action: "updateHighScore", payload: higher.wpm });
  }, [difficulty, best, dispatch]);

  return { best };
}
