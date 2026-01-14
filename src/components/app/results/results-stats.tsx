import { WPMText } from "@/components/common/wpm-text";
import { calculateWPM, calculateAccuracy } from "@/libs/calculation-helper";
import { ResultsShow } from "./results-show";
import type { AppState } from "@/libs/types/typing-speed-types";

export default function ResultsStats({ state }: { state: AppState }) {
  const [WPM, accuracy] = [calculateWPM, calculateAccuracy].map((func) =>
    func(state)
  );
  const { errorCount, input = "" } = state;

  const stats = [
    {
      title: (
        <>
          <WPMText />:
        </>
      ),
      content: WPM,
    },
    {
      title: "Accuracy:",
      content: (
        <span className={accuracy !== "100" ? "c-red-500" : ""}>
          {accuracy}%
        </span>
      ),
    },
    {
      title: "Characters",
      content: (
        <span className="c-neutral-400">
          <span className="c-green-500">{input.length}</span>/
          <span className="c-red-500">{errorCount}</span>
        </span>
      ),
    },
  ];
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map(({ title, content }, key) => (
        <ResultsShow title={title} key={key}>
          {content}
        </ResultsShow>
      ))}
    </section>
  );
}
