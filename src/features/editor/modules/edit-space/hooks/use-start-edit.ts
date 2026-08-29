import { useTypingCtx } from "@/features/typing-speed";
import { useEffect } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const allLetters = `${letters}${letters.toUpperCase()}1234567890`
  .split("")
  .map((string) => `^${string}$`)
  .join("|");

export function useStartEdit() {
  const { dispatch } = useTypingCtx();

  useEffect(() => {
    function startOnKeyboardType({ key }: KeyboardEvent) {
      if (new RegExp(allLetters).test(key)) dispatch({ action: "startTyping" });
    }
    window.addEventListener("keyup", startOnKeyboardType);
    return () => window.removeEventListener("keyup", startOnKeyboardType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { dispatch };
}
