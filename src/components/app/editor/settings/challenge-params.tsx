import type React from "react";
import { MobileParams } from "./mobile-params";
import { DesktopParams } from "./desktop-params";
import { Article } from "@/components/shared/Article";

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
  const allOptions = { ...other, options: normalizedOptions };
  return (
    <Article className="capitalize md:flex gap-2 items-center not-last:md:border-r">
      {children}

      <MobileParams {...allOptions} />
      <DesktopParams {...allOptions} />
    </Article>
  );
};
