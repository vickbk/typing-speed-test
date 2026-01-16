import { Article } from "@/components/shared/Article";
import { Heading } from "@/components/shared/Heading";
import { SROnly } from "@/components/shared/SROnly";
import { TypingContext } from "@/contexts/TypingContext";
import { useContext, useEffect } from "react";

export const StartEdit = () => {
  const { dispatch } = useContext(TypingContext);
  useEffect(() => {
    function startOnKeyboardType({ key }: KeyboardEvent) {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      const allLetters = `${letters}${letters.toUpperCase()}1234567890`
        .split("")
        .map((string) => `^${string}$`)
        .join("|");
      if (new RegExp(allLetters).test(key)) dispatch({ action: "startTyping" });
    }
    window.addEventListener("keyup", startOnKeyboardType);
    return () => window.removeEventListener("keyup", startOnKeyboardType);
  }, []);
  return (
    <>
      <Article className="absolute inset-0 flex flex-col gap-4 justify-center items-center text-center backdrop-blur-sm isolate">
        <Heading>
          <button
            onClick={() => dispatch({ action: "startTyping" })}
            type="button"
            className="p-4 px-8 blue-600 border-3 hover:outline-3 focus:outline-3 active:outline-3 b-background active-out-blue-600  rounded-xl text-2xl font-normal"
          >
            <span className="absolute inset-0"></span>
            Start Typing Test
          </button>
        </Heading>
        <p className="text-xl">
          Or <SROnly>You can</SROnly> click the text and start typing
        </p>
      </Article>
    </>
  );
};
