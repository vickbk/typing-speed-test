import { TypingContext } from "@/contexts/TypingContext";
import { getTimeRange, getTimeDisplay } from "@/libs/time-helper";
import { useContext, useEffect, useRef } from "react";
import { ResultsShower } from "./result-shower";

export const Time = () => {
  const { state, dispatch } = useContext(TypingContext);

  const color = {
    excellent: "",
    good: "c-blue-400",
    ok: "c-green-500",
    bad: "c-yellow-400",
    worse: "c-red-500",
  }[getTimeRange(state)];

  // getting a correct display following the timing mode
  const display = getTimeDisplay(state);
  const { typing, difference } = state;

  // handle timer update
  const timer = useRef(0);

  useEffect(() => {
    if (typing) {
      timer.current = setTimeout(
        () => dispatch({ action: "updateTimer" }),
        1000
      );
    } else clearTimeout(timer.current);
  }, [typing, difference]);

  return <ResultsShower index="Time" value={display} valueColor={color} />;
};
