import { ChallengeMode } from "./challenge-mode";
import { ChallengeOptions } from "./challenge-options";
import { Results } from "./results/results";

export const SettingBar = () => {
  return (
    <section className="flex flex-wrap py-4 gap-4">
      <Results />
      <div className="grow flex">
        <ChallengeOptions />
        <ChallengeMode />
      </div>
    </section>
  );
};
