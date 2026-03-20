import { calculateAccuracy, useTypingCtx } from "@/features/typing-speed";

export function useAccuracy() {
  const { state } = useTypingCtx();

  return { accuracy: calculateAccuracy(state) };
}
