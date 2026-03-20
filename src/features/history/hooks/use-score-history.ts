import { useTypingCtx, type TypeScore } from "@/features/typing-speed";
import { getMemoItem, usePagination } from "@/shared";
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PAGESIZE = 10;

export function useScoreHistory() {
  const {
    state: { difficulty, best },
  } = useTypingCtx();

  const results = useRef<TypeScore[]>([]);

  const navigate = useNavigate();

  return {
    ...usePagination(results.current, PAGESIZE),
    navigate,
    closeDialog: useCallback(() => {
      navigate("/home");
    }, []),
    loadResults: useCallback(
      (node: HTMLElement | null) => {
        if (node)
          results.current = (
            getMemoItem<TypeScore[]>(`score.${difficulty}`) || []
          ).sort(({ time: aT }, { time: bT }) => bT - aT);
      },
      [difficulty, best],
    ),
  };
}
