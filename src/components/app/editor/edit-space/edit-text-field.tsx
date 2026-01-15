import { TypingContext } from "@/contexts/TypingContext";
import { useContext, useEffect, useRef } from "react";

function focusTextarea(node: HTMLTextAreaElement | null) {
  node?.focus();
}
export const EditTextField = () => {
  const {
    dispatch,
    state: { input, startTyping },
  } = useContext(TypingContext);

  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    focusTextarea(textarea.current);
  }, [startTyping]);
  return (
    <fieldset className="sr-only">
      <legend>Typing area</legend>
      <textarea
        ref={textarea}
        onChange={(e) =>
          dispatch({ action: "updateInput", payload: e.target.value })
        }
        value={input}
      />
    </fieldset>
  );
};
