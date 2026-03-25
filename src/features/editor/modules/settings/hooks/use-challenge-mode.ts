import { useTypingCtx, type ModeType } from "@/features/typing-speed";
import { getMemoItem, setMemoItem } from "@/shared";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const times = [15, 30, 60, 120];
const timingMode = [
  ...times.map((time) => [time, `Timed (${time}s)`]),
  ["", "Passage"],
];

export function useChallengeMode() {
  const {
    state: { mode },
    dispatch,
  } = useTypingCtx();

  const [queries] = useSearchParams();

  const [, modeDisplay] = timingMode.find(([value]) => value === mode)!;

  useEffect(() => {
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
  }, []);
  return {
    mode,
    modeDisplay,
    timingMode,
    ...useMemo(
      () => ({
        setMode<T>(mode: T) {
          setMemoItem("mode", mode);
          dispatch({ action: "mode", payload: mode as ModeType });
        },
      }),
      [queries],
    ),
  };
}
