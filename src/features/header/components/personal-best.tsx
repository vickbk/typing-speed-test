import { WPMText } from "@/components/common/wpm-text";
import { useTypingCtx } from "@/features/typing-speed";
import type { TypeScore } from "@/libs/types/typing-speed-types";
import { getMemoItem } from "@/shared";
import { Icon } from "@/shared/helpers/components/bi-icon";
import { SROnly } from "@/shared/helpers/components/SROnly";
import { default as bestIcon } from "@assets/images/icon-personal-best.svg";
import { useCallback } from "react";
import { Link } from "react-router-dom";

export const PersonalBest = () => {
  const {
    state: { difficulty, best },
    dispatch,
  } = useTypingCtx();

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
      <dt className="capitalize c-secondary flex gap-1">
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
