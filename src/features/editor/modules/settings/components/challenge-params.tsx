import { normalizeParams } from "../scripts";
import type { ParamsProps } from "../types";
import { DesktopMenue } from "./desktop-menue";
import { MobileMenue } from "./mobile-menue";

export const ChallengeParams = <T extends string | number>({
  children,
  ...other
}: ParamsProps<T>) => {
  const allOptions = normalizeParams(other);

  return (
    <div className="capitalize grow lg:grow-0 md:flex gap-2 items-center not-last:md:border-r not-last:md:pr-4">
      <dt className="c-secondary">{children}</dt>
      <dd className="overflow-x-clip md:overflow-x-auto">
        <MobileMenue {...allOptions} />
        <DesktopMenue {...allOptions} />
      </dd>
    </div>
  );
};
