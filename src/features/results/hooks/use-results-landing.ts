import { useTypingCtx } from "@/features/typing-speed";
import { useScreenSize } from "@/shared";
import { useResults } from "./use-results";

export function useResultsLanding() {
  return { ...useTypingCtx(), ...useResults(), ...useScreenSize() };
}
