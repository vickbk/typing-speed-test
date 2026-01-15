import { Heading } from "@/components/shared/Heading";
import { SROnly } from "@/components/shared/SROnly";
import { TypingContext } from "@/contexts/TypingContext";
import type { Difficulty } from "@/libs/types/typing-speed-types";
import { useContext } from "react";
import { ChallengeParams } from "./challenge-params";
import setMemoItem from "@/libs/memorization/set-item";
import getMemoItem from "@/libs/memorization/get-item";
import { useSearchParams } from "react-router-dom";

export const ChallengeOptions = () => {
  const {
    state: { difficulty },
    dispatch,
  } = useContext(TypingContext);

  const [queries] = useSearchParams();

  function setDifficulty<T = Difficulty>(payload: T) {
    setMemoItem("difficulty", payload);
    dispatch({ action: "difficulty", payload: payload as Difficulty });
  }

  function loadDifficulty(node: HTMLElement | null) {
    const difficulty = queries.get("difficulty");
    if (node) {
      dispatch({
        action: "difficulty",
        payload:
          (difficulty as Difficulty) ?? getMemoItem("difficulty") ?? "easy",
      });
    }
  }
  return (
    <ChallengeParams
      name="level"
      current={difficulty}
      updateCurrent={setDifficulty}
      options={["easy", "medium", "hard", "quote", "code"]}
      key={difficulty}
    >
      <Heading>
        <SROnly>Select your </SROnly>
        <span
          ref={loadDifficulty}
          className="sr-only md:not-sr-only c-neutral-400"
        >
          Difficulty
        </span>
        <SROnly> level</SROnly>
        <span className="sr-only md:not-sr-only">:</span>
      </Heading>
    </ChallengeParams>
  );
};
