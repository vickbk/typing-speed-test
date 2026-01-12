import { useContext } from "react";
import { ResultsShower } from "./result-shower";
import { TypingContext } from "../../../../../contexts/TypingContext";
import { calculateAccuracy } from "../../../../../libs/accuracy-helper";

export const Accuracy = () => {
  const { state } = useContext(TypingContext);

  const accuracy = calculateAccuracy(state);

  return <ResultsShower index="Accuracy" value={`${accuracy}%`} />;
};
