import {
  getTimeDisplay,
  getTimeRange,
  useTypingCtx,
} from "@/features/typing-speed";
import { useEffect, useRef } from "react";

const colors = {
  excellent: "",
  good: "c-blue-400",
  ok: "c-green-500",
  bad: "c-yellow-400",
  worse: "c-red-500",
};

export function useResultsTime() {
  const { state, dispatch } = useTypingCtx();

  const { typing, difference } = state;

  // handle timer update
  const timer = useRef(0);

  useEffect(() => {
    if (typing) {
      timer.current = setTimeout(
        () => dispatch({ action: "updateTimer" }),
        1000,
      );
    } else clearTimeout(timer.current);
  }, [typing, difference, dispatch]);

  return { color: colors[getTimeRange(state)], display: getTimeDisplay(state) };
}
