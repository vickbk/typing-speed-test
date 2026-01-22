import { default as start1 } from "@/assets/images/pattern-star-1.svg";
import { default as start2 } from "@/assets/images/pattern-star-2.svg";
import { Heading } from "@components/shared/Heading";
import ResultsStats from "./results-stats";
import { useContext } from "react";
import { Icon } from "@components/common/bi-icon";
import { TypingContext } from "@/contexts/TypingContext";
import ReactConfetti from "react-confetti";
import { useScreenSize } from "@/hooks/handle-screen-size";
import { useResults } from "@/hooks/handle-results";

export const ResultsLanding = () => {
  const { dispatch, state } = useContext(TypingContext);

  const {
    loadOtherResults,
    results: { title, text, button, icon, best },
  } = useResults();
  const { width, height } = useScreenSize();
  return (
    <div
      className="m-auto grid items-center gap-8 md:gap-12"
      ref={loadOtherResults}
    >
      <header className="grid gap-4 justify-items-center text-center">
        <div className={best ? "icon-bounce" : "icon-waves"}>
          <img className="w-12" src={icon} alt="" />
        </div>
        <Heading className="font-semibold text-3xl">{title}</Heading>
        <p className="c-neutral-400">{text}</p>
      </header>

      <ResultsStats state={state} />
      <div className="flex justify-center gap-4">
        <button
          className="foreground c-background px-4 py-2 rounded-2xl font-bold text-2xl md:rounded-lg md:text-lg active-button"
          type="button"
          onClick={() => dispatch({ action: "startTyping" })}
        >
          {button} <Icon name="arrow-counterclockwise" />
        </button>
        {/* <button type="button" onClick={shareResults}>
          Share <Icon name="share" />
        </button> */}
      </div>
      {best ? (
        <ReactConfetti
          width={width}
          height={height}
          gravity={0.02}
          initialVelocityY={30}
          initialVelocityX={5}
          recycle={false}
          confettiSource={{ x: 0, y: height, w: width, h: 0 }}
        />
      ) : (
        <div className="absolute inset-0 -z-10">
          <img className="bottom-5 right-5 absolute" src={start1} alt="" />
          <img className="absolute left-5 top-30" src={start2} alt="" />
        </div>
      )}
    </div>
  );
};
