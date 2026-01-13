import { Article } from "../../../shared/Article";
import type React from "react";
import { MobileParams } from "./mobile-params";
import { DesktopParams } from "./desktop-params";

export const ChallengeParams = <T extends string | number>({
  options,
  children,
  ...other
}: {
  name: string;
  current: T;
  updateCurrent: <T extends string | number>(payload: T) => void;
  options: (T | [T, string])[];
  children: React.ReactNode;
}) => {
  const normalizedOptions = options.map((choice) =>
    Array.isArray(choice) ? choice : ([choice, choice + ""] as [T, string])
  );
  return (
    <Article className="capitalize md:grid md:grid-cols-[auto_1fr] gap-2 items-center not-last:md:border-r">
      {children}

      <MobileParams {...other} options={normalizedOptions} />
      <DesktopParams {...other} options={normalizedOptions} />
    </Article>
  );
};
