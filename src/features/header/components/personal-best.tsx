import { WPMText } from "@/features/typing-speed/components/wpm-text";
import { Icon } from "@/shared/helpers/components/bi-icon";
import { SROnly } from "@/shared/helpers/components/SROnly";
import { default as bestIcon } from "@assets/images/icon-personal-best.svg";
import { Link } from "react-router-dom";
import { usePersonalBest } from "../hooks";

export const PersonalBest = () => {
  const { best } = usePersonalBest();

  return (
    <dl className="best">
      <dt className="capitalize c-secondary flex gap-1">
        <img src={bestIcon} alt="" />
        <span className="sr-only sm:not-sr-only">Personal </span>
        Best:
      </dt>
      <dd>
        {best}
        <WPMText />
      </dd>
      <dt aria-label="Score History">
        | <Icon name="clock" />
      </dt>
      <dd>
        <Link
          to={"/history"}
          className="active-button best__history text-center"
        >
          <Icon name="alarm" />
          <SROnly>Show history</SROnly>
        </Link>
      </dd>
    </dl>
  );
};
