import setMemoItem from "@/libs/memorization/set-item";
import { useCallback, useEffect, useState } from "react";
import { applyTheme, getSavedTheme } from "../scripts";
import type { Themes } from "../types";

export function useTheme() {
  const [theme, setTheme] = useState<Themes>("light");

  const changeTheme = useCallback((theme: Themes) => {
    setTheme(theme);
    applyTheme(theme);
  }, []);

  useEffect(() => {
    changeTheme(getSavedTheme());
  }, []);

  return {
    toggleTheme: useCallback(() => {
      const nextTheme: Themes = theme === "dark" ? "light" : "dark";
      setMemoItem("theme", nextTheme);
      changeTheme(nextTheme);
    }, [theme]),
    isDark: theme === "dark",
  };
}
