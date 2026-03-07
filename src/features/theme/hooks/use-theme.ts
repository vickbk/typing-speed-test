"use client";

import getMemoItem from "@/libs/memorization/get-item";
import setMemoItem from "@/libs/memorization/set-item";
import { useState, useRef, useCallback } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const firstLoad = useRef(true);

  const loadTheme = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        if (firstLoad.current) {
          firstLoad.current = false;
          let savedTheme = getMemoItem<"light" | "dark" | undefined>("theme");
          if (!savedTheme)
            savedTheme = window.matchMedia("(prefers-color-scheme: dark)")
              .matches
              ? "dark"
              : "light";
          setTheme(savedTheme!);
        } else {
          document.documentElement.setAttribute("theme", theme);
          setMemoItem("theme", theme);
        }
      }
    },
    [theme],
  );
  return { theme, setTheme, loadTheme };
}
