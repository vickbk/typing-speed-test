import { joinClasses } from "@/libs/other-helpers";
import { Icon } from "@/shared/helpers/components/bi-icon";
import { SROnly } from "@/shared/helpers/components/SROnly";
import { Link } from "react-router-dom";
import { useMobileMenue } from "../hooks";
import type { NormalizedMenueProps } from "../types";

export const MobileMenue = <T extends string | number>({
  options,
  current,
  name,
  updateCurrent,
}: NormalizedMenueProps<T>) => {
  const { closeOnfocusOut, query, open, setOpen } = useMobileMenue();

  return (
    <div className="relative md:hidden" ref={closeOnfocusOut}>
      <button
        className="p-1 capitalize w-full border rounded-md b-neutral-500 text-center"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <SROnly>Currently selected:</SROnly>
        {current} <Icon name="chevron-down" />
        <SROnly>Choose another option</SROnly>
      </button>
      <ul
        aria-expanded={open}
        aria-live="polite"
        className={joinClasses([
          "absolute z-10 w-full neutral-800 mt-2 rounded-lg",
          !open && "hidden",
        ])}
      >
        {options.map(([value, label]) => {
          query.set(name, value + "");
          return (
            <li
              key={value}
              className="not-last:border-b b-neutral-500 b-neutral-400"
            >
              <Link
                className="flex gap-4 py-2 px-4 cursor-pointer"
                to={`?${query}`}
                onClick={() => updateCurrent(value)}
              >
                <Icon
                  name={
                    current === label
                      ? "record-circle-fill c-blue-400"
                      : "circle"
                  }
                />{" "}
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
