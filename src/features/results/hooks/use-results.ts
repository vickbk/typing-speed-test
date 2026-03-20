import { default as completed } from "@/assets/images/icon-completed.svg";
import { default as newPB } from "@/assets/images/icon-new-pb.svg";
import {
  calculateWPM,
  useTypingCtx,
  type TypeScore,
} from "@/features/typing-speed";
import { getMemoItem, setMemoItem } from "@/shared";
import { useCallback, useRef } from "react";

export function useResults() {
  const { state, dispatch } = useTypingCtx();
  const { best, finish, difficulty } = state;

  const results = useRef({
    title: "Test Completed",
    text: "Solid run. Keep pushing to beat your high score.",
    button: "Go Again",
    first: true,
    best: false,
    icon: completed,
  });

  return {
    results: results.current,

    loadOtherResults: useCallback(
      (node: HTMLElement | null) => {
        if (node) {
          const scores = getMemoItem<TypeScore[]>(`score.${difficulty}`) || [];

          const currentWPM = +calculateWPM(state);
          if (best === 0) {
            results.current = {
              ...results.current,
              title: "Baseline Established!",
              text: "You've set the bar. Now the real challenge begins--time to beat it.",
              button: "Beat This Score",
            };
          } else {
            results.current = { ...results.current, first: false };

            if (best < currentWPM) {
              results.current = {
                ...results.current,
                best: true,
                title: "Hight Score Smashed!",
                text: "You're getting faster. That was incredible typing.",
                button: "Beat This Score",
                icon: newPB,
              };
            }
          }
          scores.push({
            wpm: currentWPM,
            time: new Date().getTime(),
            session: state,
          });
          setMemoItem(`score.${difficulty}`, scores);
          if (results.current.best || results.current.first)
            dispatch({ action: "updateHighScore", payload: currentWPM });
        }
      },
      [finish],
    ),
  };
}
