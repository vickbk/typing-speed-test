import { useTypingCtx } from "@/features/typing-speed";
import { focusElement } from "@/shared";
import { useEffect, useRef } from "react";

export function useEditorField() {
  const {
    dispatch,
    state: { input, difference },
  } = useTypingCtx();

  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (document.activeElement !== textarea.current)
      focusElement(textarea.current);
  }, [difference]);
  return { dispatch, input, textarea };
}
