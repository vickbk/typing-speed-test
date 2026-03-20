import { SROnly } from "@/shared/helpers/components/SROnly";
import { useChallengeOptions } from "../hooks";
import { ChallengeParams } from "./challenge-params";

export const ChallengeOptions = () => {
  const { difficulty, setDifficulty, loadDifficulty, options } =
    useChallengeOptions();
  return (
    <ChallengeParams
      name="level"
      current={difficulty}
      updateCurrent={setDifficulty}
      options={options}
      key={difficulty}
    >
      <SROnly>Select your </SROnly>
      <span ref={loadDifficulty} className="sr-only md:not-sr-only">
        Difficulty
      </span>
      <SROnly> level</SROnly>
      <span className="sr-only md:not-sr-only">:</span>
    </ChallengeParams>
  );
};
