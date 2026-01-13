import completed from "../../../assets/images/icon-personal-best.svg";
import { Heading } from "../../shared/Heading";
import { Icon } from "../../common/bi-icon";
import ResultsStats from "./results-stats";
import { useContext } from "react";
import { TypingContext } from "../../../contexts/TypingContext";

export const ResultsLanding = () => {
  const { dispatch } = useContext(TypingContext);

  return (
    <div className="m-auto grid items-center gap-8">
      <header className="grid gap-4 justify-items-center text-center">
        <img className="w-12" src={completed} alt="" />
        <Heading className="font-semibold text-3xl">Test Completed</Heading>
        <p className="c-neutral-400">
          Solid run. Keeo pushing to beat your high score.
        </p>
      </header>

      <ResultsStats />
      <button
        className="foreground c-background justify-self-center p-4 rounded-2xl font-bold text-2xl"
        type="button"
        onClick={() => dispatch({ action: "startTyping" })}
      >
        Go Again <Icon name="arrow-counterclockwise" />
      </button>
    </div>
  );
};
