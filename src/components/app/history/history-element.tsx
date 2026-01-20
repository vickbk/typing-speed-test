import { Article } from "@/components/shared/Article";
import { Heading } from "@/components/shared/Heading";
import { SROnly } from "@/components/shared/SROnly";
import { formatDateTime } from "@/libs/time-helper";
import type { TypeScore } from "@/libs/types/typing-speed-types";
import ResultsStats from "../results/results-stats";

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
