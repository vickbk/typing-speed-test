import { Accuracy } from "./accuracy";
import { Time } from "./time";
import { WordPerMinute } from "./word-per-minute";

export const Results = () => {
  return (
    <div>
      <WordPerMinute />
      <Accuracy />
      <Time />
    </div>
  );
};
