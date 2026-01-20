import { Icon } from "@/components/common/bi-icon";
import { Article } from "@/components/shared/Article";
import CustomDialog from "@/components/shared/CustomDialog";
import { Heading } from "@/components/shared/Heading";
import { SROnly } from "@/components/shared/SROnly";
import { TypingContext } from "@/contexts/TypingContext";
import { useCallback, useContext, useRef } from "react";
import { ChallengeOptions } from "../editor/settings/challenge-options";
import type { TypeScore } from "@/libs/types/typing-speed-types";
import getMemoItem from "@/libs/memorization/get-item";
import { Paging } from "@/components/common/paging/paging-element";
import { EmptyScore } from "./empty-score";
import { useNavigate } from "react-router-dom";
import { usePagination } from "@/hooks/handle-pagination";
import { HistoryElement } from "./history-element";
import { ClearButton } from "./clear-button";

const PAGESIZE = 10;

export const ScoreHistory = () => {
  const {
    state: { difficulty, best },
  } = useContext(TypingContext);

  const results = useRef<TypeScore[]>([]);
  const loadResults = useCallback(
    (node: HTMLElement | null) => {
      if (node)
        results.current = (
          getMemoItem<TypeScore[]>(`score.${difficulty}`) || []
        ).sort(({ time: aT }, { time: bT }) => bT - aT);
    },
    [difficulty, best],
  );

  const { page, setPage, totalPages, display } = usePagination(
    results.current,
    PAGESIZE,
  );

  const navigate = useNavigate();
  function closeDialog() {
    navigate("/home");
  }
  return (
    <CustomDialog
      className="m-auto p-4 rounded-lg background c-foreground relative overflow-hidden"
      isOpen
      onClose={closeDialog}
    >
      <Article
        className="grid gap-4 grid-rows-[auto_auto_1fr]"
        ref={loadResults}
      >
        <button
          className="rounded-full active-button aspect-square p-1 px-2 absolute right-2"
          type="button"
          onClick={closeDialog}
        >
          <SROnly>Close History</SROnly>
          <Icon name="x-lg" />
        </button>
        <Heading className="text-2xl font-bold">Score History</Heading>
        <div className="flex justify-between align-center gap-4">
          <dl className="grow">
            <ChallengeOptions />
          </dl>
          <ClearButton />
        </div>
        <section
          className="grid gap-8 overflow-y-auto max-h-[70vh]"
          tabIndex={0}
        >
          {display.map((data) => (
            <HistoryElement {...data} />
          ))}
          {display.length === 0 && <EmptyScore onClose={closeDialog} />}
        </section>
        {totalPages > 1 && (
          <div className="absolute bottom-0 mx-auto inset-x-0">
            <Paging
              page={page}
              totalPages={totalPages}
              updateFunction={setPage}
            />
          </div>
        )}
      </Article>
    </CustomDialog>
  );
};
