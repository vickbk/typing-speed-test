import { useTypingCtx, type TypeScore } from "@/features/typing-speed";
import { getMemoItem, usePagination } from "@/shared";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGESIZE = 10;

export function useScoreHistory() {
  const {
    state: { difficulty, best },
  } = useTypingCtx();

  const [results, setResults] = useState<TypeScore[]>([]);

  const navigate = useNavigate();

  return {
    ...usePagination(results, PAGESIZE),
    navigate,
    closeDialog: useCallback(() => {
      navigate("/home");
    }, []),
    loadResults: useCallback(
      (node: HTMLElement | null) => {
        if (node)
          setResults(
            (getMemoItem<TypeScore[]>(`score.${difficulty}`) || []).sort(
              ({ time: aT }, { time: bT }) => bT - aT,
            ),
          );
      },
      [difficulty, best],
    ),
  };
}
