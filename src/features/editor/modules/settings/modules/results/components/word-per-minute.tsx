import { calculateWPM, useTypingCtx } from "@/features/typing-speed";
import { WPMText } from "@/features/typing-speed/components/wpm-text";
import { ResultsShower } from "./result-shower";

export const WordPerMinute = () => {
  const { state } = useTypingCtx();
  const WPM = calculateWPM(state);

  return <ResultsShower index={<WPMText />} value={WPM} />;
};
