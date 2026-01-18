import { SROnly } from "@/components/shared/SROnly";
import { TypingContext } from "@/contexts/TypingContext";
import type { ModeType } from "@/libs/types/typing-speed-types";
import { useContext } from "react";
import { ChallengeParams } from "./challenge-params";
import setMemoItem from "@/libs/memorization/set-item";
import getMemoItem from "@/libs/memorization/get-item";
import { useSearchParams } from "react-router-dom";

const times = [15, 30, 60, 120];
const timingMode = [
  ...times.map((time) => [time, `Timed (${time}s)`]),
  ["", "Passage"],
];

export const ChallengeMode = () => {
  const {
    state: { mode },
    dispatch,
  } = useContext(TypingContext);

  const [queries] = useSearchParams();

  function setMode<T = ModeType>(mode: T) {
    setMemoItem("mode", mode);
    dispatch({ action: "mode", payload: mode as ModeType });
  }

  function loadMode(node: HTMLElement | null) {
    if (node) {
      const mode = queries.get("mode");
      dispatch({
        action: "mode",
        payload:
          (mode === ""
            ? ""
            : mode !== null && times.includes(+mode)
              ? (+mode as ModeType)
              : null) ??
          getMemoItem<ModeType>("mode") ??
          "",
      });
    }
  }
  const [, modeDisplay] = timingMode.find(([value]) => value === mode)!;
  return (
    <ChallengeParams
      name="mode"
      current={modeDisplay}
      updateCurrent={setMode}
      options={timingMode as ["" | number, string][]}
      key={mode}
    >
      <SROnly>Select your challenge </SROnly>
      <span className="sr-only md:not-sr-only c-neutral-400" ref={loadMode}>
        Mode:
      </span>
    </ChallengeParams>
  );
};
