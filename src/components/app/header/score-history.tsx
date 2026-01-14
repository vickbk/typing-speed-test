import { Icon } from "@/components/common/bi-icon";
import { Article } from "@/components/shared/Article";
import CustomDialog from "@/components/shared/CustomDialog";
import { Heading } from "@/components/shared/Heading";
import { SROnly } from "@/components/shared/SROnly";
import { TypingContext } from "@/contexts/TypingContext";
import { useCallback, useContext, useRef, useState } from "react";
import { ChallengeOptions } from "../editor/settings/challenge-options";
import type { TypeScore } from "@/libs/types/typing-speed-types";
import getMemoItem from "@/libs/memorization/get-item";
import ResultsStats from "../results/results-stats";
import { formatDateTime } from "@/libs/time-helper";
import { Paging } from "@/components/common/paging/paging-element";
import { EmptyScore } from "./empty-score";
import { clearMemoItem } from "@/libs/memorization/set-item";

const PAGESIZE = 10;

export const ScoreHistory = ({
  onClose,
}: {
  onClose: (param: false) => void;
}) => {
  function closeDialog() {
    onClose(false);
  }
  const {
    state: { difficulty, best },
    dispatch,
  } = useContext(TypingContext);

  const results = useRef<TypeScore[]>([]);
  const loadResults = useCallback(
    (node: HTMLElement | null) => {
      if (node)
        results.current = (
          getMemoItem<TypeScore[]>(`score.${difficulty}`) || []
        ).sort(({ time: aT }, { time: bT }) => bT - aT);
    },
    [difficulty, best]
  );
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(results.current.length / PAGESIZE);
  const historyDisplay = results.current.slice(
    page * PAGESIZE,
    (page + 1) * PAGESIZE
  );
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
          <div className="grow">
            <ChallengeOptions />
          </div>
          <button
            type="button"
            title="Clear history"
            className="active-button px-4 rounded-lg outline-1"
            onClick={() => {
              clearMemoItem(`score.${difficulty}`);
              dispatch({ action: "updateHighScore", payload: 0 });
            }}
          >
            <Icon name="trash" />
          </button>
        </div>
        <section className="grid gap-8 overflow-y-auto max-h-[70vh]">
          {historyDisplay.map(({ session, time }) => (
            <Article>
              <Heading className="mb-4">
                <SROnly>Results for date</SROnly>
                <time dateTime="">{formatDateTime({ time })}</time>
              </Heading>
              <ResultsStats state={session} />
            </Article>
          ))}
          {historyDisplay.length === 0 && <EmptyScore onClose={onClose} />}
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
