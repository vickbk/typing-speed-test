import { Icon } from "@/components/common/bi-icon";
import { joinClasses } from "@/libs/other-helpers";
import { SROnly } from "@/shared/helpers/components/SROnly";
import { useCallback, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export const MobileMenue = <T extends string | number>({
  options,
  current,
  name,
  updateCurrent,
}: {
  current: T;
  name: string;
  options: [T, string][];
  updateCurrent: <T extends string | number>(payload: T) => void;
}) => {
  const [query] = useSearchParams();
  const [open, setOpen] = useState(false);
  const closeOnfocusOut = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      function focusOut({ target }: PointerEvent) {
        if (!node?.contains(target as Node)) setOpen(false);
      }
      document.addEventListener("click", focusOut);
      return () => document.removeEventListener("click", focusOut);
    }
  }, []);
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
