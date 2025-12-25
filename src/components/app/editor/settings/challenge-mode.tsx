import { useState } from "react";
import { Heading } from "../../../shared/Heading";
import { SROnly } from "../../../shared/SROnly";
import { ChallengeParams } from "./challenge-params";

const times = [
  ...[15, 30, 60, 120].map((time) => [time, `Timed (${time}s)`]),
  ["", "Passage"],
];

export const ChallengeMode = () => {
  const [mode, setMode] = useState<string | number>("");

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
        <span className="sr-only sm:not-sr-only">Mode:</span>
      </Heading>
    </ChallengeParams>
  );
};
