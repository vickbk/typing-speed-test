import { PersonalBest } from "./personal-best";
import { default as logoSmall } from "@assets/images/logo-small.svg";
import { default as logoLarge } from "@assets/images/logo-large.svg";
import { Heading } from "@/components/shared/Heading";
import { SROnly } from "@/components/shared/SROnly";

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 w-full max-w-300 m-auto">
      <Heading>
        <picture>
          <source media="(min-width: 576px)" srcSet={logoLarge} />
          <img src={logoSmall} alt="" />
        </picture>
        <SROnly>
          Typing speed test. Type as fast as you can in 60 seconds
        </SROnly>
      </Heading>
      <PersonalBest />
    </header>
  );
};
