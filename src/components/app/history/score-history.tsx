import { Paging } from "@/components/common/paging/paging-element";
import { useTypingCtx } from "@/features";
import { usePagination } from "@/hooks/handle-pagination";
import type { TypeScore } from "@/libs/types/typing-speed-types";
import { getMemoItem } from "@/shared";
import {
  Article,
  Heading,
} from "@/shared/heading-manager/components/heading-managers";
import { Icon } from "@/shared/helpers/components/bi-icon";
import CustomDialog from "@/shared/helpers/components/CustomDialog";
import { SROnly } from "@/shared/helpers/components/SROnly";
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChallengeOptions } from "../editor/settings/challenge-options";
import { ClearButton } from "./clear-button";
import { EmptyScore } from "./empty-score";
import { HistoryElement } from "./history-element";

const PAGESIZE = 10;

export const ScoreHistory = () => {
  const {
    state: { difficulty, best },
  } = useTypingCtx();

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
