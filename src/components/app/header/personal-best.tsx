import { useCallback, useContext } from "react";
import { default as bestIcon } from "@assets/images/icon-personal-best.svg";
import { TypingContext } from "@/contexts/TypingContext";
import getMemoItem from "@/libs/memorization/get-item";
import { SROnly } from "@/components/shared/SROnly";
import type { TypeScore } from "@/libs/types/typing-speed-types";
import { Icon } from "@/components/common/bi-icon";
import { Link } from "react-router-dom";
import { WPMText } from "@/components/common/wpm-text";

export const PersonalBest = () => {
  const {
    state: { difficulty, best },
    dispatch,
  } = useContext(TypingContext);

  const loadResults = useCallback(
    (node: HTMLElement | null) => {
      if (node !== null) {
        const results = getMemoItem<TypeScore[]>(`score.${difficulty}`) || [
          { wpm: 0 },
        ];
        const [higher] = results.sort(
          ({ wpm: aWPM }, { wpm: bWPM }) => bWPM - aWPM,
        );
        dispatch({ action: "updateHighScore", payload: higher.wpm });
      }
    },
    [difficulty, best],
  );

  return (
    <dl className="best" ref={loadResults}>
      <dt className="capitalize c-neutral-400 flex gap-1">
        <img src={bestIcon} alt="" />
        <span className="sr-only sm:not-sr-only">Personal </span>
        Best:
      </dt>
      <dd>
        {best}
        <WPMText />
      </dd>
      <dt aria-label="Score History">
        | <Icon name="clock" />
      </dt>
      <dd>
        <Link
          to={"/history"}
          className="active-button best__history text-center"
        >
          <Icon name="alarm" />
          <SROnly>Show history</SROnly>
        </Link>
      </dd>
    </dl>
  );
};
