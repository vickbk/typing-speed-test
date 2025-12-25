import { Accuracy } from "./accuracy";
import { Time } from "./time";
import { WordPerMinute } from "./word-per-minute";

export const Results = () => {
  return (
    <div className="flex grow text-center">
      <WordPerMinute />
      <Accuracy />
      <Time />
    </div>
  );
};
