import type { MemoObject } from "../types";
import { getMemo } from "./get-memo";

export function getMemoItem<T = unknown>(params: string): T {
  const path = params.split(".");
  return getNested(getMemo(), path) as T;
}

export function getNested(obj: MemoObject, path: string[]): unknown {
  return path.reduce(
    (o: unknown, p) => (o ? (o as Record<string, unknown>)[p] : undefined),
    obj,
  );
}
