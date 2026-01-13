import { useContext } from "react";
import {
  calculateAccuracy,
  calculateWPM,
} from "../../../libs/calculation-helper";
import { WPMText } from "../../common/wpm-text";
import { ResultsShow } from "./results-show";
import { TypingContext } from "../../../contexts/TypingContext";

export default function ResultsStats() {
  const { state } = useContext(TypingContext);
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
      {stats.map(({ title, content }) => (
        <ResultsShow title={title}>{content}</ResultsShow>
      ))}
    </section>
  );
}
