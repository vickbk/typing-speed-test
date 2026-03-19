import { WPMText } from "@/components/common/wpm-text";
import { calculateWPM, useTypingCtx } from "@/features";
import { ResultsShower } from "./result-shower";

export const WordPerMinute = () => {
  const { state } = useTypingCtx();

  const WPM = calculateWPM(state);

  return <ResultsShower index={<WPMText />} value={WPM} />;
};
