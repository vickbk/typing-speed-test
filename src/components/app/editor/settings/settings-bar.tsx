import { ChallengeMode } from "./challenge-mode";
import { ChallengeOptions } from "./challenge-options";
import { Results } from "./results/results";

export const SettingBar = () => {
  return (
    <section className="flex flex-wrap lg:grid lg:grid-cols-2 py-4 gap-4">
      <Results />
      <div className="grow">
        <ChallengeOptions />
        <ChallengeMode />
      </div>
    </section>
  );
};
