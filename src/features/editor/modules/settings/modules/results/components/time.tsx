import { useResultsTime } from "../hooks";
import { ResultsShower } from "./result-shower";

export const Time = () => {
  const { display, color } = useResultsTime();

  return <ResultsShower index="Time" value={display} valueColor={color} />;
};
