import { useAccuracy } from "../hooks";
import { ResultsShower } from "./result-shower";

export const Accuracy = () => {
  const { accuracy } = useAccuracy();

  return (
    <ResultsShower
      index="Accuracy"
      value={`${accuracy}%`}
      valueColor={accuracy !== "100" ? "c-red-500" : ""}
    />
  );
};
