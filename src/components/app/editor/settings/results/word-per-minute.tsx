import { useContext } from "react";
import { WPMText } from "../../../../common/wpm-text";
import { ResultsShower } from "./result-shower";
import { TypingContext } from "../../../../../contexts/TypingContext";
import { calculateWPM } from "../../../../../libs/calculation-helper";

export const WordPerMinute = () => {
  const { state } = useContext(TypingContext);

  const WPM = calculateWPM(state);

  return <ResultsShower index={<WPMText />} value={WPM} />;
};
