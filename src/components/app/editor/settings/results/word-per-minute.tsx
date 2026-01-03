import { WPMText } from "../../../../common/wpm-text";
import { ResultsShower } from "./result-shower";

export const WordPerMinute = () => {
  return <ResultsShower index={<WPMText />} value="0" />;
};
