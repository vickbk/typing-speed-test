import type { MenueProps } from "../types";

export function normalizeParams<T extends string | number>({
  options,
  ...other
}: MenueProps<T>) {
  const normalizedOptions = options.map((choice) =>
    Array.isArray(choice) ? choice : ([choice, choice + ""] as [T, string]),
  );

  return { ...other, options: normalizedOptions };
}
