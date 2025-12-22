import { Article } from "../../shared/Article";
import { Heading } from "../../shared/Heading";
import { SROnly } from "../../shared/SROnly";
import { default as bestIcon } from "@assets/images/icon-personal-best.svg";

export const PersonalBest = () => {
  return (
    <Article>
      <img src={bestIcon} alt="" />
      <Heading>
        <SROnly>Your</SROnly>Personal best <SROnly>is</SROnly>:{" "}
      </Heading>
      <p>92WPM</p>
    </Article>
  );
};
