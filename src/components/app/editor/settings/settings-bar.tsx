import { ChallengeMode } from "./challenge-mode";
import { ChallengeOptions } from "./challenge-options";
import { Results } from "./results/results";

export const SettingBar = () => {
  return (
    <section className="flex flex-wrap lg:grid lg:grid-cols-[auto_1fr] py-4 gap-4 lg:gap-8">
      <Results />
      <dl className="grow grid grid-cols-2 gap-4">
        <ChallengeOptions />
        <ChallengeMode />
      </dl>
    </section>
  );
};
