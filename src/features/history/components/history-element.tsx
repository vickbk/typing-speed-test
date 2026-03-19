import { ResultsStats } from "@/features/results/components/results-stats";
import type { TypeScore } from "@/features/typing-speed";
import { formatDateTime } from "@/shared";
import {
  Article,
  Heading,
} from "@/shared/heading-manager/components/heading-managers";
import { SROnly } from "@/shared/helpers/components/SROnly";

export const HistoryElement = ({ time, session }: TypeScore) => {
  return (
    <Article key={time}>
      <Heading className="mb-4">
        <SROnly>Results for date</SROnly>
        <time dateTime={new Date(time).toISOString()}>
          {formatDateTime({ time })}
        </time>
      </Heading>
      <ResultsStats state={session} />
    </Article>
  );
};
