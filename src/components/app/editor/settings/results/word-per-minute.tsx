import { useContext } from "react";
import { WPMText } from "../../../../common/wpm-text";
import { ResultsShower } from "./result-shower";
import { TypingContext } from "../../../../../contexts/TypingContext";

export const WordPerMinute = () => {
  const {
    state: { difference = 0, input = "" },
  } = useContext(TypingContext);
  const words = input.length === 0 ? [] : input.split(" ");
  const WPM = (words.length * 60) / difference;

  return <ResultsShower index={<WPMText />} value={WPM.toFixed()} />;
};
