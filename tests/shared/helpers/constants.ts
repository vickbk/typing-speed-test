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
 * Mode constants
 */
const difficulties = "easy, medium, hard, quote, code"
  .split(",")
  .map((d) => d.trim());
export const [EASY_LINK, MEDIUM_LINK, HARD_LINK, QUOTE_LINK, CODE_LINK] =
  difficulties.map((mode) => new RegExp(mode, "i"));

export const [EASY_QUERY, MEDIUM_QUERY, HARD_QUERY, QUOTE_QUERY, CODE_QUERY] =
  difficulties.map((difficulty) => `/?difficulty=${difficulty}`);
