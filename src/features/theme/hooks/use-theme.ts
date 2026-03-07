"use client";

import setMemoItem from "@/libs/memorization/set-item";
import { useCallback, useRef, useState } from "react";
import { applyTheme, getSavedTheme } from "../scripts";
import type { Themes } from "../types";

export function useTheme() {
  const [theme, setTheme] = useState<Themes>("light");

  const firstLoad = useRef(true);

  const loadTheme = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        if (firstLoad.current) {
          firstLoad.current = false;
          setTheme(getSavedTheme());
        } else setMemoItem("theme", theme);
        applyTheme(theme);
      }
    },
    [theme],
  );

  return { theme, setTheme, loadTheme };
}
