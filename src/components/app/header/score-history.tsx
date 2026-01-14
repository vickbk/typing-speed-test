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
import ResultsStats from "../results/results-stats";
import { formatDateTime } from "@/libs/time-helper";

export const ScoreHistory = ({
  onClose,
}: {
  onClose: (param: false) => void;
}) => {
  function closeDialog() {
    onClose(false);
  }
  const {
    state: { difficulty },
  } = useContext(TypingContext);

  const results = useRef<TypeScore[]>([]);
  const loadResults = useCallback(
    (node: HTMLElement | null) => {
      if (node)
        results.current = (
          getMemoItem<TypeScore[]>(`score.${difficulty}`) || []
        ).sort(({ time: aT }, { time: bT }) => bT - aT);
    },
    [difficulty]
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
          >
            <Icon name="trash" />
          </button>
        </div>
        <section className="grid gap-8 overflow-y-auto max-h-[70vh]">
          {results.current.map(({ session, time }) => (
            <Article>
              <Heading className="mb-4">
                <SROnly>Results for date</SROnly>
                <time dateTime="">{formatDateTime({ time })}</time>
              </Heading>
              <ResultsStats state={session} />
            </Article>
          ))}
        </section>
      </Article>
    </CustomDialog>
  );
};
