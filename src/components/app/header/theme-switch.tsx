import { Icon } from "@/components/common/bi-icon";
import { SROnly } from "@/components/shared/SROnly";
import getMemoItem from "@/libs/memorization/get-item";
import setMemoItem from "@/libs/memorization/set-item";
import { useCallback, useRef, useState } from "react";

export const ThemeSwitch = () => {
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
