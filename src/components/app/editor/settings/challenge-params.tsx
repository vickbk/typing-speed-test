import { Article } from "../../../shared/Article";
import { SROnly } from "../../../shared/SROnly";
import { Icon } from "../../../common/bi-icon";
import { CustomDetails } from "../../../shared/CustomDetails";
import type React from "react";

export const ChallengeParams = <T extends string | number>({
  current,
  name,
  updateCurrent,
  options,
  children,
}: {
  name: string;
  current: T;
  updateCurrent: React.Dispatch<React.SetStateAction<T>>;
  options: (T | [T, string])[];
  children: React.ReactNode;
}) => {
  function refCaller(node: HTMLElement | null) {
    node?.scrollIntoView({
      inline: "nearest",
      behavior: "smooth",
      block: "start",
    });
  }
  return (
    <Article className="capitalize md:flex gap-2 items-center">
      {children}

      <CustomDetails className="relative md:hidden">
        <summary className="marker:content-[''] p-1 border rounded-md b-neutral-500 cursor-pointer text-center">
          <SROnly>Currently selected:</SROnly>
          {current} <Icon name="chevron-down" />
        </summary>
        <ul className="absolute z-10 w-full neutral-800 mt-2 rounded-lg">
          {options.map((choice) => {
            const value = Array.isArray(choice) ? choice[0] : choice;
            const label = Array.isArray(choice) ? choice[1] : choice;
            return (
              <li
                key={value}
                className="not-last:border-b b-neutral-500 b-neutral-400"
              >
                <label className="flex gap-4 py-2 px-4 cursor-pointer">
                  <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={current === label}
                    className="sr-only"
                    onChange={() => updateCurrent(value)}
                  />
                  <Icon
                    name={
                      current === label
                        ? "record-circle-fill c-blue-400"
                        : "circle"
                    }
                  />{" "}
                  {label}
                </label>
              </li>
            );
          })}
        </ul>
      </CustomDetails>
      <ul className="hidden md:grid grid-flow-col auto-cols-max overflow-x-scroll overscroll-contain gap-2">
        {options.map((choice) => {
          const value = Array.isArray(choice) ? choice[0] : choice;
          const label = Array.isArray(choice) ? choice[1] : choice;
          return (
            <li key={value} className="shrink-0 basis-100">
              <label
                className={[
                  "border rounded-md p-1 inline-block cursor-pointer",
                  current === label ? "b-blue-400 c-blue-400" : "",
                ].join(" ")}
                ref={current === label ? refCaller : undefined}
              >
                <input
                  type="radio"
                  name={name}
                  value={value}
                  checked={current === label}
                  className="sr-only"
                  onChange={() => updateCurrent(value)}
                />{" "}
                {label}
              </label>
            </li>
          );
        })}
      </ul>
    </Article>
  );
};
