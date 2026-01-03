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
      content: <span className="text-red">{90}%</span>,
    },
    {
      title: "Characters",
      content: (
        <span>
          120/<span className="color-red">5</span>
        </span>
      ),
    },
  ];
  return (
    <section>
      {stats.map(({ title, content }) => (
        <ResultsShow title={title}>{content}</ResultsShow>
      ))}
    </section>
  );
}
