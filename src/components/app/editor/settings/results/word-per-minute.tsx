import { WPMText } from "@/components/common/wpm-text";
import { useTypingCtx } from "@/features";
import { calculateWPM } from "@/libs/calculation-helper";
import { ResultsShower } from "./result-shower";

export const WordPerMinute = () => {
  const { state } = useTypingCtx();

  const WPM = calculateWPM(state);

  return <ResultsShower index={<WPMText />} value={WPM} />;
};
