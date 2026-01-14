import { Article } from "@/components/shared/Article";
import { Heading } from "@/components/shared/Heading";
import { SROnly } from "@/components/shared/SROnly";
import { TypingContext } from "@/contexts/TypingContext";
import { useContext } from "react";

export const StartEdit = () => {
  const { dispatch } = useContext(TypingContext);
  return (
    <>
      <Article className="absolute inset-0 flex flex-col gap-4 justify-center items-center text-center backdrop-blur-xs isolate">
        <Heading>
          <button
            onClick={() => dispatch({ action: "startTyping" })}
            type="button"
            className="p-4 px-8 blue-600 rounded-xl text-2xl font-normal"
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
