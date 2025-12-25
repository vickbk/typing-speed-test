import { Article } from "../../shared/Article";
import { Heading } from "../../shared/Heading";
import { SROnly } from "../../shared/SROnly";
import { default as bestIcon } from "@assets/images/icon-personal-best.svg";

export const PersonalBest = () => {
  return (
    <Article className="flex">
      <img src={bestIcon} alt="" />
      <Heading className="capitalize ml-2">
        <SROnly>Your</SROnly>
        <span className="sr-only sm:not-sr-only">Personal </span>best
        <SROnly> is</SROnly>:{" "}
      </Heading>
      <p className="font-semibold">92WPM</p>
    </Article>
  );
};
