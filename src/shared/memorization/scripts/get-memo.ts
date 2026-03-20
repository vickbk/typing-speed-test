import { name } from "../../../../package.json";
import type { MemoObject } from "../types";

export function getMemo() {
  const item = localStorage.getItem(memoName);
  if (!item) return (localStorage.setItem(memoName, JSON.stringify({})), {});
  return JSON.parse(item) as Record<string, unknown>;
}

export const memoName = name || "app";

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
