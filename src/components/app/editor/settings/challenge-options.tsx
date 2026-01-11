import { useContext } from "react";
import { Heading } from "../../../shared/Heading";
import { SROnly } from "../../../shared/SROnly";
import { ChallengeParams } from "./challenge-params";
import { TypingContext } from "../../../../contexts/TypingContext";
import type { Difficulty } from "../../../../libs/types/typing-speed-types";

export const ChallengeOptions = () => {
  const {
    state: { difficulty },
    dispatch,
  } = useContext(TypingContext);
  function setDifficulty<T = Difficulty>(payload: T) {
    dispatch({ action: "difficulty", payload: payload as Difficulty });
  }
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
