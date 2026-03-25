import { SROnly } from "@/shared/helpers/components/SROnly";
import { useChallengeMode } from "../hooks";
import { ChallengeParams } from "./challenge-params";

export const ChallengeMode = () => {
  const { modeDisplay, setMode, mode, timingMode } = useChallengeMode();

  return (
    <ChallengeParams
      name="mode"
      current={modeDisplay}
      updateCurrent={setMode}
      options={timingMode as ["" | number, string][]}
      key={mode}
    >
      <SROnly>Select your challenge </SROnly>
      <span className="sr-only md:not-sr-only">Mode:</span>
    </ChallengeParams>
  );
};
