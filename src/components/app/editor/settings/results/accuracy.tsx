import { useContext } from "react";
import { ResultsShower } from "./result-shower";
import { TypingContext } from "../../../../../contexts/TypingContext";
import { calculateAccuracy } from "../../../../../libs/calculation-helper";

export const Accuracy = () => {
  const { state } = useContext(TypingContext);

  const accuracy = calculateAccuracy(state);

  return (
    <ResultsShower
      index="Accuracy"
      value={`${accuracy}%`}
      valueColor={accuracy !== "100" ? "c-red-500" : ""}
    />
  );
};
