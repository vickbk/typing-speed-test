import { useTypingCtx, type ModeType } from "@/features/typing-speed";
import { getMemoItem } from "@/shared";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { saveMode } from "../scripts";

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

  return {
    mode,
    modeDisplay,
    timingMode,
    ...useMemo(
      () => ({
        setMode<T>(mode: T) {
          dispatch({ action: "mode", payload: saveMode(mode as ModeType) });
        },
        loadMode(node: HTMLElement | null) {
          if (node) {
            const mode = queries.get("mode");
            dispatch({
              action: "mode",
              payload:
                (mode === ""
                  ? saveMode("")
                  : mode !== null && times.includes(+mode)
                    ? saveMode(+mode as ModeType)
                    : null) ??
                getMemoItem<ModeType>("mode") ??
                "",
            });
          }
        },
      }),
      [queries],
    ),
  };
}
