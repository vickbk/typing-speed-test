export type ModeType = "" | 15 | 45 | 30 | 60 | 120;
export type Difficulty = "easy" | "medium" | "hard";

export type AppState = {
  mode: ModeType;
  difficulty: Difficulty;
  typing: boolean;
  startTyping?: EpochTimeStamp | null;
  lastTyping?: EpochTimeStamp | null;
  difference?: number;
  text: string;
  input?: string;
  errorCount: number;
  finish: boolean;
  best: number;
};

export type ActionKeys =
  | "startTyping"
  | "difficulty"
  | "mode"
  | "updateTimer"
  | "updateInput"
  | "updateHighScore";

export type CallbackOption<Name extends ActionKeys, Type = undefined> = {
  action: Name;
  payload?: Type;
};

export type AllOptions =
  | CallbackOption<"difficulty", Difficulty>
  | CallbackOption<"mode", ModeType>
  | CallbackOption<"startTyping" | "updateTimer">
  | CallbackOption<"updateInput", string>
  | CallbackOption<"updateHighScore", number>;

export type TypeScore = {
  wpm: number;
  time: EpochTimeStamp;
  session: AppState;
};
