import { ChallengeMode } from "./challenge-mode";
import { ChallengeOptions } from "./challenge-options";
import { Results } from "./results/results";

export const SettingBar = () => {
  return (
    <section className="flex flex-wrap py-4 gap-4 border-b">
      <Results />
      <div className="grow grid grid-cols-2 gap-4">
        <ChallengeOptions />
        <ChallengeMode />
      </div>
    </section>
  );
};
