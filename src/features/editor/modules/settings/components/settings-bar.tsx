import { Results } from "../modules/results/components/results";
import { ChallengeMode } from "./challenge-mode";
import { ChallengeOptions } from "./challenge-options";

export const SettingBar = () => {
  return (
    <section className="flex flex-wrap py-4 gap-4 lg:gap-8">
      <Results />
      <dl className="grow grid grid-cols-2 lg:flex lg:justify-between gap-4">
        <ChallengeOptions />
        <ChallengeMode />
      </dl>
    </section>
  );
};
