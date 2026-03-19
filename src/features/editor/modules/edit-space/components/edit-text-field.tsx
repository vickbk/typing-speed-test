import { useTypingCtx } from "@/features";
import { useEffect, useRef } from "react";

function focusTextarea(node: HTMLTextAreaElement | null) {
  node?.focus();
}
export const EditTextField = () => {
  const {
    dispatch,
    state: { input, difference },
  } = useTypingCtx();

  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (document.activeElement !== textarea.current)
      focusTextarea(textarea.current);
  }, [difference]);

  return (
    <label className="sr-only">
      Typing area
      <textarea
        ref={textarea}
        onChange={(e) =>
          dispatch({ action: "updateInput", payload: e.target.value })
        }
        value={input}
      />
    </label>
  );
};
