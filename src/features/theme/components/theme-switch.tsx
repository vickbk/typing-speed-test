import { Icon } from "@/components/common/bi-icon";
import { SROnly } from "@/components/shared/SROnly";
import { useTheme } from "../hooks";

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="ml-auto">
      <button type="button" onClick={toggleTheme}>
        <SROnly>Swith to {theme === "dark" ? "light" : "dark"} theme</SROnly>
        <Icon name={theme === "light" ? "moon" : "sun c-yellow-400"} />
      </button>
    </div>
  );
};
