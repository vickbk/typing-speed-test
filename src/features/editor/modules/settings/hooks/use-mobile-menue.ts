import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useMobileMenue() {
  const [query] = useSearchParams();

  const [open, setOpen] = useState(false);

  const closeOnfocusOut = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      function focusOut({ target }: PointerEvent) {
        if (!node?.contains(target as Node)) setOpen(false);
      }
      document.addEventListener("click", focusOut);
      return () => document.removeEventListener("click", focusOut);
    }
  }, []);

  return { query, open, closeOnfocusOut, setOpen };
}
