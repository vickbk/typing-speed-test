import { setMemoItem } from "@/shared";
import { useCallback, useState } from "react";
import { applyTheme, getSavedTheme } from "../scripts";
import type { Themes } from "../types";

export function useTheme() {
  const [theme, setTheme] = useState<Themes>(() => getSavedTheme());

  const isDark = theme === "dark";
  const isLight = theme === "light";

  const changeTheme = useCallback((theme: Themes) => {
    setTheme(theme);
    applyTheme(theme);
    setMemoItem("theme", theme);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme: Themes = isDark ? "light" : "dark";
    changeTheme(nextTheme);
  }, [isDark, changeTheme]);

  return { isDark, isLight, theme, changeTheme, toggleTheme };
}
