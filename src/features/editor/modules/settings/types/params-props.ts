import type { ReactNode } from "react";

export type ParamsProps<T extends string | number> = {
  name: string;
  current: T;
  updateCurrent: <T extends string | number>(payload: T) => void;
  options: (T | [T, string])[];
  children: ReactNode;
};

export type MenueProps<T extends string | number> = Omit<
  ParamsProps<T>,
  "children"
>;

export type NormalizedMenueProps<T extends string | number> = Omit<
  MenueProps<T>,
  "options"
> & {
  options: [T, string][];
};
