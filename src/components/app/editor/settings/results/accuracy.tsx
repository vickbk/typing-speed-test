import { calculateAccuracy, useTypingCtx } from "@/features";
import { ResultsShower } from "./result-shower";

export const Accuracy = () => {
  const { state } = useTypingCtx();

  const accuracy = calculateAccuracy(state);

  return (
    <ResultsShower
      index="Accuracy"
      value={`${accuracy}%`}
      valueColor={accuracy !== "100" ? "c-red-500" : ""}
    />
  );
};
