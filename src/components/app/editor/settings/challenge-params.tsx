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
  return (
    <Article className="capitalize ">
      {children}

      <CustomDetails className="relative">
        <summary className="marker:content-[''] p-2 border rounded-md cursor-pointer text-center">
          <SROnly>Currently selected:</SROnly>
          {current} <Icon name="chevron-down" />
        </summary>
        <ul className="absolute w-full background mt-2 rounded-lg">
          {options.map((choice) => {
            const value = Array.isArray(choice) ? choice[0] : choice;
            const label = Array.isArray(choice) ? choice[1] : choice;
            return (
              <li key={value} className="not-last:border-b">
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
                    name={current === label ? "record-circle-fill" : "circle"}
                  />{" "}
                  {label}
                </label>
              </li>
            );
          })}
        </ul>
      </CustomDetails>
      <ul className="hidden">
        {options.map((choice) => {
          const value = Array.isArray(choice) ? choice[0] : choice;
          const label = Array.isArray(choice) ? choice[1] : choice;
          return (
            <li key={value}>
              <label>
                <input
                  type="radio"
                  name={name}
                  value={value}
                  checked={current === choice}
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
