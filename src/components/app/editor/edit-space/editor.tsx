import { Icon } from "@/components/common/bi-icon";
import { TypingContext } from "@/contexts/TypingContext";
import { useContext, useEffect, useRef } from "react";

function focusTextarea(node: HTMLTextAreaElement | null) {
  node?.focus();
}
export const Editor = () => {
  const {
    dispatch,
    state: { input },
  } = useContext(TypingContext);

  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    focusTextarea(textarea.current);
  }, []);

  return (
    <div className="border-t b-neutral-500 pt-4">
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
      <button
        type="button"
        onClick={() => {
          dispatch({ action: "updateInput", payload: "" });
          dispatch({ action: "startTyping" });
          focusTextarea(textarea.current);
        }}
        className="p-2 px-4 mx-auto block border rounded-lg active-button"
      >
        Restart Test <Icon name="arrow-counterclockwise" />
      </button>
    </div>
  );
};
