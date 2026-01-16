import { default as completed } from "@/assets/images/icon-completed.svg";
import { default as newPB } from "@/assets/images/icon-new-pb.svg";
import { default as start1 } from "@/assets/images/pattern-star-1.svg";
import { default as start2 } from "@/assets/images/pattern-star-2.svg";
import { Heading } from "@components/shared/Heading";
import ResultsStats from "./results-stats";
import { useCallback, useContext, useRef } from "react";
import { Icon } from "@components/common/bi-icon";
import { TypingContext } from "@/contexts/TypingContext";
import getMemoItem from "@/libs/memorization/get-item";
import { calculateWPM } from "@/libs/calculation-helper";
import setMemoItem from "@/libs/memorization/set-item";
import type { TypeScore } from "@/libs/types/typing-speed-types";
import ReactConfetti from "react-confetti";

function bringInConfetti(node: HTMLElement | null) {
  if (node) {
    setTimeout(() => node.classList.remove("translate-y-full"), 100);
  }
}
export const ResultsLanding = () => {
  const { dispatch, state } = useContext(TypingContext);
  const results = useRef({
    title: "Test Completed",
    text: "Solid run. Keep pushing to beat your high score.",
    button: "Go Again",
    first: true,
    best: false,
    icon: completed,
  });
  const { best, finish } = state;
  const loadOtherResults = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        const scores =
          getMemoItem<TypeScore[]>(`score.${state.difficulty}`) || [];

        const currentWPM = +calculateWPM(state);
        if (best === 0) {
          results.current = {
            ...results.current,
            title: "Baseline Established!",
            text: "You've set the bar. Now the real challenge begins--time to beat it.",
            button: "Beat This Score",
          };
        } else {
          results.current = { ...results.current, first: false };

          if (best < currentWPM) {
            results.current = {
              ...results.current,
              best: true,
              title: "Hight Score Smashed!",
              text: "You're getting faster. That was incredible typing.",
              button: "Beat This Score",
              icon: newPB,
            };
          }
        }
        scores.push({
          wpm: currentWPM,
          time: new Date().getTime(),
          session: state,
        });
        setMemoItem(`score.${state.difficulty}`, scores);
        if (results.current.best || results.current.first)
          dispatch({ action: "updateHighScore", payload: currentWPM });
      }
    },
    [finish]
  );
  const { title, text, button, icon, best: isBestScore } = results.current;
  return (
    <div
      className="m-auto grid items-center gap-8 md:gap-12"
      ref={loadOtherResults}
    >
      <header className="grid gap-4 justify-items-center text-center">
        <div className={isBestScore ? "icon-bounce" : "icon-waves"}>
          <img className="w-12" src={icon} alt="" />
        </div>
        <Heading className="font-semibold text-3xl">{title}</Heading>
        <p className="c-neutral-400">{text}</p>
      </header>

      <ResultsStats state={state} />
      <button
        className="foreground c-background justify-self-center px-4 py-2 rounded-2xl font-bold text-2xl md:rounded-lg md:text-lg"
        type="button"
        onClick={() => dispatch({ action: "startTyping" })}
      >
        {button} <Icon name="arrow-counterclockwise" />
      </button>
      {isBestScore ? (
        <div
          className="absolute w-full left-0 -z-10 bottom-0 translate-y-full transition-transform duration-1000"
          ref={bringInConfetti}
        >
          <ReactConfetti />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10">
          <img className="bottom-5 right-5 absolute" src={start1} alt="" />
          <img className="absolute left-5 top-30" src={start2} alt="" />
        </div>
      )}
    </div>
  );
};
