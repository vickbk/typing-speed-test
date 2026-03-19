import { ThemeSwitch } from "@/features/theme/components/theme-switch";
import { Heading } from "@/shared/heading-manager/components/heading-managers";
import { SROnly } from "@/shared/helpers/components/SROnly";
import { default as logoSmall } from "../assets/logo-small.svg";
import { LogoLarge } from "./logo-large";
import { PersonalBest } from "./personal-best";

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 gap-4 w-full max-w-300 m-auto">
      <Heading>
        <picture className="sm:hidden">
          <img src={logoSmall} alt="" />
        </picture>
        <div className="hidden sm:block">
          <LogoLarge />
        </div>
        <SROnly>
          Typing speed test. Type as fast as you can in 60 seconds
        </SROnly>
      </Heading>
      <ThemeSwitch />
      <PersonalBest />
    </header>
  );
};
