import { Icon } from "@/components/common/bi-icon";
import { SROnly } from "@/components/shared/SROnly";
import { useTheme } from "../hooks";

export const ThemeSwitch = () => {
  const { theme, setTheme, loadTheme } = useTheme();
  return (
    <div className="ml-auto" ref={loadTheme}>
      <button
        type="button"
        onClick={() =>
          setTheme((theme) => (theme === "dark" ? "light" : "dark"))
        }
      >
        <SROnly>Swith to {theme === "dark" ? "light" : "dark"} theme</SROnly>
        <Icon name={theme === "light" ? "moon" : "sun c-yellow-400"} />
      </button>
    </div>
  );
};
