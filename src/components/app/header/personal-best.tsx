import { useContext, useState } from "react";
import { default as bestIcon } from "@assets/images/icon-personal-best.svg";
import { TypingContext } from "@/contexts/TypingContext";
import getMemoItem from "@/libs/memorization/get-item";
import { Article } from "@/components/shared/Article";
import { Heading } from "@/components/shared/Heading";
import { SROnly } from "@/components/shared/SROnly";
import type { TypeScore } from "@/libs/types/typing-speed-types";

export const PersonalBest = () => {
  const {
    state: { difficulty },
  } = useContext(TypingContext);

  const [score, setScore] = useState(0);

  function loadResults(node: HTMLElement | null) {
    if (node !== null) {
      const results = getMemoItem<TypeScore[]>(`score.${difficulty}`) || [];
      const [higher] = results.sort(
        ({ wpm: aWPM }, { wpm: bWPM }) => bWPM - aWPM
      );
      setScore(higher?.wpm ?? 0);
      console.log(results, higher);
    }
  }

  return (
    <Article className="flex" ref={loadResults}>
      <img src={bestIcon} alt="" />
      <Heading className="capitalize ml-2 c-neutral-400">
        <SROnly>Your</SROnly>
        <span className="sr-only sm:not-sr-only">Personal </span>best
        <SROnly> is</SROnly>:{" "}
      </Heading>
      <p className="">{score}WPM</p>
    </Article>
  );
};
