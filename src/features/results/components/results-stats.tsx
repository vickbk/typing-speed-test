import type { AppState } from "@/features/typing-speed";
import { WPMText } from "@/features/typing-speed/components/wpm-text";
import { useResultsStats } from "../hooks";
import { ResultsShow } from "./results-show";

export function ResultsStats(props: { state: AppState }) {
  const { WPM, accuracy, input = "", errorCount } = useResultsStats(props);

  const stats = [
    [
      <>
        <WPMText />:
      </>,
      WPM,
    ],
    [
      "Accuracy:",
      <span className={accuracy !== "100" ? "c-red-500" : ""}>
        {accuracy}%
      </span>,
    ],
    [
      "Characters",
      <span className="c-neutral-400">
        <span className="c-green-500">{input.length}</span>/
        <span className="c-red-500">{errorCount}</span>
      </span>,
    ],
  ];
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map(([title, content], key) => (
        <ResultsShow title={title} key={key}>
          {content}
        </ResultsShow>
      ))}
    </section>
  );
}
