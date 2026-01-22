import { Icon } from "@/components/common/bi-icon";
import { SROnly } from "@/components/shared/SROnly";
import { useCallback, useState } from "react";

export const ThemeSwitch = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const loadTheme = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        document.documentElement.setAttribute("theme", theme);
        console.log(theme);
      }
    },
    [theme],
  );
  return (
    <div className="ml-auto" ref={loadTheme}>
      <button
        type="button"
        onClick={() =>
          setTheme((theme) => (theme === "dark" ? "light" : "dark"))
        }
      >
        <SROnly>Swith to {theme === "dark" ? "light" : "dark"} theme</SROnly>
        <Icon name={theme === "dark" ? "moon" : "sun c-yellow-400"} />
      </button>
    </div>
  );
};
