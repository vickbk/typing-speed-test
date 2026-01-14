import { useCallback, useContext } from "react";
import { default as bestIcon } from "@assets/images/icon-personal-best.svg";
import { TypingContext } from "@/contexts/TypingContext";
import getMemoItem from "@/libs/memorization/get-item";
import { Article } from "@/components/shared/Article";
import { Heading } from "@/components/shared/Heading";
import { SROnly } from "@/components/shared/SROnly";
import type { TypeScore } from "@/libs/types/typing-speed-types";
import { Icon } from "@/components/common/bi-icon";

export const PersonalBest = () => {
  const {
    state: { difficulty, best },
    dispatch,
  } = useContext(TypingContext);

  const loadResults = useCallback(
    (node: HTMLElement | null) => {
      if (node !== null) {
        const results = getMemoItem<TypeScore[]>(`score.${difficulty}`) || [];
        const [higher] = results.sort(
          ({ wpm: aWPM }, { wpm: bWPM }) => bWPM - aWPM
        );
        dispatch({ action: "updateHighScore", payload: higher?.wpm ?? 0 });
      }
    },
    [difficulty, best]
  );

  return (
    <Article className="best" ref={loadResults}>
      <img src={bestIcon} alt="" />
      <Heading className="capitalize ml-2 c-neutral-400">
        <SROnly>Your</SROnly>
        <span className="sr-only sm:not-sr-only">Personal </span>best
        <SROnly> is</SROnly>:{" "}
      </Heading>
      <p className="">{best}WPM</p>
      <button type="button" className="active-button best__history">
        <Icon name="clock" />
        <SROnly>Show history</SROnly>
      </button>
    </Article>
  );
};
