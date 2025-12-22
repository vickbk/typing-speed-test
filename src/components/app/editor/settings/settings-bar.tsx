import { ChallengeMode } from "./challenge-mode";
import { ChallengeOptions } from "./challenge-options";
import { Results } from "./results/results";

export const SettingBar = () => {
  return (
    <div>
      <Results />
      <ChallengeOptions />
      <ChallengeMode />
    </div>
  );
};
