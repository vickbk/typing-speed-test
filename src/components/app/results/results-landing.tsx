import completed from "../../../assets/images/icon-personal-best.svg";
import { Heading } from "../../shared/Heading";
import { Icon } from "../../common/bi-icon";
import ResultsStats from "./results-stats";
import { useContext, useRef } from "react";
import { TypingContext } from "../../../contexts/TypingContext";
import getMemoItem from "../../../libs/memorization/get-item";
import {
  calculateAccuracy,
  calculateWPM,
} from "../../../libs/calculation-helper";
import setMemoItem from "../../../libs/memorization/set-item";

export const ResultsLanding = () => {
  const { dispatch, state } = useContext(TypingContext);
  const results = useRef({
    title: "Test Completed",
    text: "",
    first: true,
    best: false,
  });
  function loadOtherResults(node: HTMLElement | null) {
    if (node) {
      const scores =
        getMemoItem<{ accuracy: number; wpm: number; time: EpochTimeStamp }[]>(
          `score.${state.difficulty}`
        ) || [];

      const currentWPM = +calculateWPM(state);
      if (scores.length === 0) {
        results.current = {
          ...results.current,
          title: "Baseline Established!",
          text: "You've set the bar. Now the real challenge begins--time to beat it.",
        };
      } else {
        results.current = { ...results.current, first: false };
        const hasHigher = scores.some(({ wpm }) => wpm < currentWPM);
        if (!hasHigher)
          results.current = {
            ...results.current,
            best: true,
            title: "Hight Score Smashed!",
            text: "You're getting faster. That was incredible typing.",
          };
      }
      scores.push({
        wpm: currentWPM,
        accuracy: +calculateAccuracy(state),
        time: new Date().getTime(),
      });
      setMemoItem(`score.${state.difficulty}`, scores);
    }
  }
  const { title, text } = results.current;
  return (
    <div
      className="m-auto grid items-center gap-8 md:gap-12"
      ref={loadOtherResults}
    >
      <header className="grid gap-4 justify-items-center text-center">
        <img className="w-12" src={completed} alt="" />
        <Heading className="font-semibold text-3xl">{title}</Heading>
        <p className="c-neutral-400">{text}</p>
      </header>

      <ResultsStats />
      <button
        className="foreground c-background justify-self-center px-4 py-2 rounded-2xl font-bold text-2xl md:rounded-lg md:text-lg"
        type="button"
        onClick={() => dispatch({ action: "startTyping" })}
      >
        Go Again <Icon name="arrow-counterclockwise" />
      </button>
    </div>
  );
};
