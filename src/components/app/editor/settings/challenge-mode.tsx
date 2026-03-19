import { useTypingCtx, type ModeType } from "@/features/typing-speed";
import { getMemoItem, setMemoItem } from "@/shared";
import { SROnly } from "@/shared/helpers/components/SROnly";
import { useSearchParams } from "react-router-dom";
import { ChallengeParams } from "./challenge-params";

const times = [15, 30, 60, 120];
const timingMode = [
  ...times.map((time) => [time, `Timed (${time}s)`]),
  ["", "Passage"],
];

export const ChallengeMode = () => {
  const {
    state: { mode },
    dispatch,
  } = useTypingCtx();

  const [queries] = useSearchParams();

  function setMode<T>(mode: T) {
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
      <span className="sr-only md:not-sr-only" ref={loadMode}>
        Mode:
      </span>
    </ChallengeParams>
  );
};
