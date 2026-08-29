import {
  calculateAccuracy,
  calculateWPM,
  getErrorsNumber,
  getTimeDisplay,
  getTimeRange,
  saveTextes,
  splitText,
} from "./calculation-helper";

import { buildInitialState } from "./initial-state-helper";

describe("Calculation Helper", () => {
  describe("get errors number", () => {
    it("should not increment error count when characters match", () => {
      const state = buildInitialState({ text: "hello", errorCount: 0 });
      const result = getErrorsNumber(state, "h");
      expect(result).toBe(0);
    });

    it("should increment error count when characters don't match", () => {
      const state = buildInitialState({ text: "hello", errorCount: 0 });
      const result = getErrorsNumber(state, "x");
      expect(result).toBe(1);
    });

    it("should not increment when input is empty", () => {
      const state = buildInitialState({ text: "hello", errorCount: 2 });
      const result = getErrorsNumber(state, "");
      expect(result).toBe(2);
    });

    it("should handle multiple errors", () => {
      const state = buildInitialState({ text: "hello", errorCount: 1 });
      const result = getErrorsNumber(state, "x");
      expect(result).toBe(2);
    });
  });

  describe("save textes", () => {
    it("should save input when typing normally", () => {
      const state = buildInitialState({ text: "hello", input: "he" });
      const result = saveTextes(state, "hel");
      expect(result.input).toBe("hel");
      expect(result.typing).toBe(true);
    });

    it("should mark finish when input length matches text length", () => {
      const state = buildInitialState({
        text: "hi",
        input: "h",
        errorCount: 0,
      });
      const result = saveTextes(state, "hi");
      expect(result.finish).toBe(true);
      expect(result.typing).toBe(false);
    });

    it("should handle backspace correction", () => {
      const state = buildInitialState({
        text: "hello",
        input: "hel",
        errorCount: 0,
      });
      const result = saveTextes(state, "he");
      expect(result.typing).toBe(true);
    });

    it("should track old mistakes when correcting", () => {
      const state = buildInitialState({
        text: "hello",
        input: "hxl",
        oldMistakes: "",
        errorCount: 1,
      });
      const result = saveTextes(state, "hx");
      expect(result.oldMistakes).toBe("hxl");
    });
  });

  describe("calculate accuracy", () => {
    it("should return 100 for perfect typing", () => {
      const state = buildInitialState({ input: "hello", errorCount: 0 });
      const result = calculateAccuracy(state);
      expect(result).toBe("100");
    });

    it("should calculate accuracy with errors", () => {
      const state = buildInitialState({ input: "hello", errorCount: 1 });
      const result = calculateAccuracy(state);
      expect(result).toBe("80");
    });

    it("should handle empty input", () => {
      const state = buildInitialState({ input: "", errorCount: 0 });
      const result = calculateAccuracy(state);
      expect(result).toBe("100");
    });

    it("should calculate multiple errors", () => {
      const state = buildInitialState({ input: "hello world", errorCount: 3 });
      const result = calculateAccuracy(state);
      const expected = (((11 - 3) * 100) / 11).toFixed();
      expect(result).toBe(expected);
    });
  });

  describe("calculate WPM", () => {
    it("should calculate words per minute", () => {
      const state = buildInitialState({ input: "hello world", difference: 60 });
      const result = calculateWPM(state);
      const expected = ((2 * 60) / 60).toFixed();
      expect(result).toBe(expected);
    });

    it("should handle empty input", () => {
      const state = buildInitialState({ input: "", difference: 60 });
      const result = calculateWPM(state);
      expect(result).toBe("0");
    });

    it("should handle zero difference (avoid division by zero)", () => {
      const state = buildInitialState({ input: "hello", difference: 0 });
      const result = calculateWPM(state);
      expect(result).toBeDefined();
    });

    it("should calculate with different time durations", () => {
      const state = buildInitialState({
        input: "hello world test",
        difference: 30,
      });
      const result = calculateWPM(state);
      const expected = ((3 * 60) / 30).toFixed();
      expect(result).toBe(expected);
    });
  });

  describe("split text", () => {
    it("should split by spaces", () => {
      const result = splitText("hello world test");
      expect(result).toEqual(["hello", "world", "test"]);
    });

    it("should handle punctuation", () => {
      const result = splitText("hello, world. test!");
      expect(result.length).toBeGreaterThan(0);

      const joined = result.join(" ");
      expect(joined).toContain("hello");
      expect(joined).toContain("world");
      expect(joined).toContain("test");
    });

    it("should handle various splitters", () => {
      const result = splitText("test:value|name(john)");
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((w) => w.length > 0)).toBe(true);
    });

    it("should filter empty strings", () => {
      const result = splitText("hello   world");
      expect(result).toEqual(["hello", "world"]);
      expect(result.every((w) => w !== "")).toBe(true);
    });

    it("should handle single word", () => {
      const result = splitText("hello");
      expect(result).toEqual(["hello"]);
    });
  });

  describe("get time display", () => {
    it("should format time during typing", () => {
      const state = buildInitialState({
        typing: true,
        mode: 60,
        difference: 30,
      });
      const result = getTimeDisplay(state);
      expect(result).toMatch(/\d:\d{2}/);
    });

    it("should show time left in timed mode", () => {
      const state = buildInitialState({
        typing: true,
        mode: 60,
        difference: 30,
      });
      const result = getTimeDisplay(state);
      expect(result).toBe("0:30");
    });

    it("should show elapsed time in passage mode", () => {
      const state = buildInitialState({
        typing: true,
        mode: "",
        difference: 45,
      });
      const result = getTimeDisplay(state);
      expect(result).toBe("0:45");
    });

    it("should show full mode time when not typing", () => {
      const state = buildInitialState({
        typing: false,
        mode: 60,
        difference: 10,
      });
      const result = getTimeDisplay(state);
      expect(result).toBe("1:00");
    });

    it("should show 0:00 when finished passage mode", () => {
      const state = buildInitialState({
        typing: false,
        mode: "",
        difference: 10,
      });
      const result = getTimeDisplay(state);
      expect(result).toBe("0:00");
    });
  });

  describe("get Time Range", () => {
    it("should return excellent for perfect timing", () => {
      const state = buildInitialState({
        typing: false,
        mode: 60,
        difference: 5,
      });
      const result = getTimeRange(state);
      expect(result).toBe("excellent");
    });

    it("should categorize good timing", () => {
      const state = buildInitialState({
        typing: true,
        mode: 60,
        difference: 18,
      });
      const result = getTimeRange(state);
      expect(["excellent", "good", "ok"]).toContain(result);
    });

    it("should categorize ok timing", () => {
      const state = buildInitialState({
        typing: true,
        mode: 60,
        difference: 36,
      });
      const result = getTimeRange(state);
      expect(["ok", "bad", "worse"]).toContain(result);
    });

    it("should categorize bad timing", () => {
      const state = buildInitialState({
        typing: true,
        mode: 60,
        difference: 48,
      });
      const result = getTimeRange(state);
      expect(["bad", "worse"]).toContain(result);
    });

    it("should work in passage mode", () => {
      const state = buildInitialState({
        typing: true,
        mode: "",
        difference: 30,
      });
      const result = getTimeRange(state);
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });
  });
});
