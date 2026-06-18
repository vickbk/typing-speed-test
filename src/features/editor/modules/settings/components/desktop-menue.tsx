import { joinClasses } from "@/shared";
import { Link, useSearchParams } from "react-router-dom";
import { desktopScrolltoCurrent } from "../scripts";
import type { NormalizedMenueProps } from "../types";

export const DesktopMenue = <T extends string | number>({
  options,
  current,
  name,
  updateCurrent,
}: NormalizedMenueProps<T>) => {
  const [query] = useSearchParams();

  return (
    <ul className="hidden md:flex overflow-x-scroll scrollbar-none gap-2">
      {options.map(([value, label]) => {
        query.set(name, value + "");
        return (
          <li
            key={value}
            className="shrink-0"
            ref={current === label ? desktopScrolltoCurrent : undefined}
          >
            <Link
              className={joinClasses([
                "border rounded-md p-1 inline-block cursor-pointer active-b-blue-400 active-c-blue-400",
                current === label && "b-blue-600 c-blue-600",
              ])}
              to={`?${query}`}
              onClick={() => updateCurrent(value)}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
