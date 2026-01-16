import { PersonalBest } from "./personal-best";
import { default as logoSmall } from "@assets/images/logo-small.svg";
import { Heading } from "@/components/shared/Heading";
import { SROnly } from "@/components/shared/SROnly";
import { LogoLarge } from "./logo-large";

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 w-full max-w-300 m-auto">
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
      <PersonalBest />
    </header>
  );
};
