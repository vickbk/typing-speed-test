/**
 *
 * Common constants
 */

export const START_TYPING = /start typing/i;

/**
 * Theme constants
 */

export const SWITCH_TO_LIGHT = /switch to light theme/i;
export const SWITCH_TO_DARK = /switch to dark theme/i;

/**
 * Results constants
 */
export const BASELINE_ESTABLISHED = /baseline established/i;
export const SOLID_RUN = /solid run/i;
export const HIGH_SCORE = /Hight Score Smashed/i;
export const GO_AGAIN = /go again/i;
export const BEAT_THIS_SCORE = /beat this score/i;

/**
 * Difficulty constants
 */
export const DIFFICULTIES = toArray("easy, medium, hard, quote, code");
export const [EASY_LINK, MEDIUM_LINK, HARD_LINK, QUOTE_LINK, CODE_LINK] =
  DIFFICULTIES.map((mode) => new RegExp(mode, "i"));

export const [EASY_QUERY, MEDIUM_QUERY, HARD_QUERY, QUOTE_QUERY, CODE_QUERY] =
  DIFFICULTIES.map((difficulty) => makeQuery`difficulty${difficulty}`);

export const UNKNOWN_DIFFICULTIES = toArray(
  "unknown, any,some,quotes,easier,too-hard,whatever",
);

/**
 * Mode constants
 */
export const MODES = [15, 30, 60, 120, ""];

export const [S15_LINK, S30_LINK, S60_LINK, S120_LINK, PASSAGE_LINK] = toRegExp(
  toArray("15s,30s,60s,120s,passage"),
);

export const [QUERY_15, QUERY_30, QUERY_60, QUERY_120, QUERY_PASSAGE] =
  MODES.map((mode) => makeQuery`mode${mode}`);
export const UNKNOWN_MODES = toArray(
  "passage,minutes,hours,unknown,whatever,20,12,35,59,61",
);

/**
 *
 * Empty score variables
 */

export const NO_PREVIOUS_RECORDS = /no previous records/i;
export const NEVER_PLAYED_BEFORE =
  /it looks like you never played this level before/i;
export const START_NEW_TEST = /go and start a new test now/i;

function toArray(vars: string) {
  return vars.split(",").map((s) => s.trim());
}

function toRegExp(vars: (string | number)[]) {
  return vars.map((v) => new RegExp(v.toString(), "i"));
}

export function makeQuery(
  names: TemplateStringsArray,
  ...values: (string | number)[]
) {
  return (
    "/?" +
    names
      .map((name, index) => {
        return name !== "" ? `${name.trim()}=${values[index]}` : null;
      })
      .filter(Boolean)
      .join("&")
  );
}
