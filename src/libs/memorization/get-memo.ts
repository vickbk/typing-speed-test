import { name } from "../../../package.json";
export default function getMemo() {
  const item = localStorage.getItem(memoName);
  if (!item) return localStorage.setItem(memoName, JSON.stringify({})), {};
  return JSON.parse(item) as Record<string, unknown>;
}

export const memoName = name || "app";
