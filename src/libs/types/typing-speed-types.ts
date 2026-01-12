export type ModeType = "" | 15 | 45 | 30 | 60 | 120;
export type Difficulty = "easy" | "medium" | "hard";

export type AppState = {
  mode: ModeType;
  difficulty: Difficulty;
  typing: boolean;
  startTyping?: EpochTimeStamp | null;
  lastTyping?: EpochTimeStamp | null;
  difference?: number;
};

export type ActionKeys = "startTyping" | "difficulty" | "mode" | "updateTimer";

export type CallbackOption<Name extends ActionKeys, Type = undefined> = {
  action: Name;
  payload?: Type;
};

export type AllOptions =
  | CallbackOption<"difficulty", Difficulty>
  | CallbackOption<"mode", ModeType>
  | CallbackOption<"startTyping" | "updateTimer">;
