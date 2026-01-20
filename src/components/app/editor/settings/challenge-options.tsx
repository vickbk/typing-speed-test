import { SROnly } from "@/components/shared/SROnly";
import { TypingContext } from "@/contexts/TypingContext";
import type { Difficulty } from "@/libs/types/typing-speed-types";
import { useContext } from "react";
import { ChallengeParams } from "./challenge-params";
import setMemoItem from "@/libs/memorization/set-item";
import getMemoItem from "@/libs/memorization/get-item";
import { useSearchParams } from "react-router-dom";

const options = ["easy", "medium", "hard", "quote", "code"];

export const ChallengeOptions = () => {
  const {
    state: { difficulty },
    dispatch,
  } = useContext(TypingContext);

  const [queries] = useSearchParams();

  function setDifficulty<T>(payload: T) {
    setMemoItem("difficulty", payload);
    dispatch({ action: "difficulty", payload: payload as Difficulty });
  }

  function loadDifficulty(node: HTMLElement | null) {
    if (node) {
      const difficulty = queries.get("difficulty") as Difficulty;
      dispatch({
        action: "difficulty",
        payload:
          (options.includes(difficulty) && difficulty) ||
          getMemoItem("difficulty") ||
          "easy",
      });
    }
  }
  return (
    <ChallengeParams
      name="level"
      current={difficulty}
      updateCurrent={setDifficulty}
      options={options}
      key={difficulty}
    >
      <SROnly>Select your </SROnly>
      <span
        ref={loadDifficulty}
        className="sr-only md:not-sr-only c-neutral-400"
      >
        Difficulty
      </span>
      <SROnly> level</SROnly>
      <span className="sr-only md:not-sr-only">:</span>
    </ChallengeParams>
  );
};
