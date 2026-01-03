import { WPMText } from "../../common/wpm-text";
import { ResultsShow } from "./results-show";

export default function ResultsStats() {
  const stats = [
    {
      title: (
        <>
          <WPMText />:
        </>
      ),
      content: 85,
    },
    {
      title: "Accuracy:",
      content: <span className="c-red-500">{90}%</span>,
    },
    {
      title: "Characters",
      content: (
        <span className="c-neutral-400">
          <span className="c-green-500">120</span>/
          <span className="c-red-500">5</span>
        </span>
      ),
    },
  ];
  return (
    <section className="grid gap-4">
      {stats.map(({ title, content }) => (
        <ResultsShow title={title}>{content}</ResultsShow>
      ))}
    </section>
  );
}
