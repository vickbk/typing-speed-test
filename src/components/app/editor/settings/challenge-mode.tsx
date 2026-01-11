import { useContext } from "react";
import { Heading } from "../../../shared/Heading";
import { SROnly } from "../../../shared/SROnly";
import { ChallengeParams } from "./challenge-params";
import { TypingContext } from "../../../../contexts/TypingContext";
import type { ModeType } from "../../../../libs/types/typing-speed-types";

const times = [
  ...[15, 30, 60, 120].map((time) => [time, `Timed (${time}s)`]),
  ["", "Passage"],
];

export const ChallengeMode = () => {
  const {
    state: { mode },
    dispatch,
  } = useContext(TypingContext);
  function setMode<T = ModeType>(mode: T) {
    dispatch({ action: "mode", payload: mode as ModeType });
  }
  const [, modeDisplay] = times.find(([value]) => value === mode)!;
  return (
    <ChallengeParams
      name="mode"
      current={modeDisplay}
      updateCurrent={setMode}
      options={times as [string | number, string][]}
    >
      <Heading>
        <SROnly>Select your challenge </SROnly>
        <span className="sr-only md:not-sr-only c-neutral-400">Mode:</span>
      </Heading>
    </ChallengeParams>
  );
};
