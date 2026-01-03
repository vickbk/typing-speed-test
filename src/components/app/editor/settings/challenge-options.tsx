import { useState } from "react";
import { Heading } from "../../../shared/Heading";
import { SROnly } from "../../../shared/SROnly";
import { ChallengeParams } from "./challenge-params";

export const ChallengeOptions = () => {
  const [difficulty, setDifficulty] = useState("hard");
  return (
    <ChallengeParams
      name="level"
      current={difficulty}
      updateCurrent={setDifficulty}
      options={["easy", "medium", "hard"]}
    >
      <Heading>
        <SROnly>Select your </SROnly>
        <span className="sr-only md:not-sr-only c-neutral-400">Difficulty</span>
        <SROnly> level</SROnly>
        <span className="sr-only md:not-sr-only">:</span>
      </Heading>
    </ChallengeParams>
  );
};
