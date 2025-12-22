import { Heading } from "../../shared/Heading";
import { SROnly } from "../../shared/SROnly";
import { PersonnelBest } from "./personnel-best";
import { default as logoSmall } from "@assets/images/logo-small.svg";
import { default as logoLarge } from "@assets/images/logo-large.svg";

export const Header = () => {
  return (
    <header>
      <Heading>
        <picture>
          <source media="(min-width: 576px)" srcSet={logoLarge} />
          <img src={logoSmall} alt="" />
        </picture>
        <SROnly>
          Typing speed test. Type as fast as you can in 60 seconds
        </SROnly>
      </Heading>
      <PersonnelBest />
    </header>
  );
};
