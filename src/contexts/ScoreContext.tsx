import { createContext } from "react";

type ScoreType = [number, (num: number) => void];
export const ScoreContext = createContext([
  0,
  (num: number) => {
    console.log(num);
  },
] as ScoreType);
