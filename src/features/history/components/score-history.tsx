import { ChallengeOptions } from "@/features/editor/modules/settings/components/challenge-options";
import {
  Article,
  Heading,
} from "@/shared/heading-manager/components/heading-managers";
import { Icon } from "@/shared/helpers/components/bi-icon";
import CustomDialog from "@/shared/helpers/components/CustomDialog";
import { SROnly } from "@/shared/helpers/components/SROnly";
import { Paging } from "@/shared/paging/components/paging-element";
import { useScoreHistory } from "../hooks";
import { ClearButton } from "./clear-button";
import { EmptyScore } from "./empty-score";
import { HistoryElement } from "./history-element";

export const ScoreHistory = () => {
  const { closeDialog, loadResults, display, totalPages, page, setPage } =
    useScoreHistory();

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
