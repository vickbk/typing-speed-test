import { Accuracy } from "./accuracy";
import { Time } from "./time";
import { WordPerMinute } from "./word-per-minute";

export const Results = () => {
  return (
    <dl className="flex grow basis-120 text-center items-center">
      <WordPerMinute />
      <Accuracy />
      <Time />
    </dl>
  );
};
