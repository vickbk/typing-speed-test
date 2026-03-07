import { Icon } from "@/components/common/bi-icon";
import { SROnly } from "@/components/shared/SROnly";
import { useTheme } from "../hooks";

export const ThemeSwitch = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="ml-auto">
      <button type="button" onClick={toggleTheme}>
        <SROnly>Swith to {isDark ? "light" : "dark"} theme</SROnly>
        <Icon name={isDark ? "sun-fill c-yellow-400" : "moon-fill"} />
      </button>
    </div>
  );
};
