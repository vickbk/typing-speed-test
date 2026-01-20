import { Article } from "@/components/shared/Article";
import { Heading } from "@/components/shared/Heading";
import { TypingContext } from "@/contexts/TypingContext";
import React from "react";

export const EmptyScore = ({ onClose }: { onClose: () => void }) => {
  const { dispatch } = React.useContext(TypingContext);
  return (
    <Article className="flex flex-col justify-center gap-8 items-center h-[50vh]">
      <Heading className="text-lg font-semibold">No previous records</Heading>
      <p>
        It looks like you never played this level before.
        <br />
        Go and start a new test now!
      </p>
      <button
        className="active-button px-4 py-2 rounded-lg outline-1 c-blue-400"
        onClick={() => {
          onClose();
          dispatch({ action: "startTyping" });
        }}
        type="button"
      >
        Start typing
      </button>
    </Article>
  );
};
