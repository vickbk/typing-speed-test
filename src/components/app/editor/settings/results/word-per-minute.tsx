import { WPMText } from "@/components/common/wpm-text";
import { TypingContext } from "@/contexts/TypingContext";
import { calculateWPM } from "@/libs/calculation-helper";
import { useContext } from "react";
import { ResultsShower } from "./result-shower";

export const WordPerMinute = () => {
  const { state } = useContext(TypingContext);

  const WPM = calculateWPM(state);

  return <ResultsShower index={<WPMText />} value={WPM} />;
};
