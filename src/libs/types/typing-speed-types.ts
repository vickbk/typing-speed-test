export type ModeType = "" | 15 | 45 | 30 | 60 | 120;
export type Difficulty = "easy" | "medium" | "hard";

export type AppState = {
  mode: ModeType;
  difficulty: Difficulty;
};

export type CallbackOption<Name extends string, Type = undefined> = {
  action: Name;
  payload?: Type;
};

export type AllOptions =
  | CallbackOption<"difficulty", Difficulty>
  | CallbackOption<"mode", ModeType>;
