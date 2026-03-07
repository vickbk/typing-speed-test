import { setMemoItem } from "@/shared";
import { useCallback, useEffect, useState } from "react";
import { applyTheme, getSavedTheme } from "../scripts";
import type { Themes } from "../types";

export function useTheme() {
  const [theme, setTheme] = useState<Themes>("light");

  const isDark = theme === "dark";

  const changeTheme = useCallback((theme: Themes) => {
    setTheme(theme);
    applyTheme(theme);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme: Themes = isDark ? "light" : "dark";
    setMemoItem("theme", nextTheme);
    changeTheme(nextTheme);
  }, [isDark]);

  useEffect(() => {
    changeTheme(getSavedTheme());
  }, []);

  return { isDark, toggleTheme };
}
