import type { AppState } from "../types";
import { buildInitialState } from "./initial-state-helper";

describe("Initial State Helper", () => {
  describe("buildInitialState", () => {
    it("should return default state when no overrides provided", () => {
      const result = buildInitialState();
      expect(result).toEqual({
        mode: "",
        difficulty: "easy",
        typing: false,
        text: "test",
        errorCount: 0,
        finish: false,
        best: 0,
        oldMistakes: "",
        input: "",
        difference: 0,
      });
    });

    it("should merge provided partial state with defaults", () => {
      const partialState: Partial<AppState> = {
        mode: 60,
        difficulty: "hard",
        typing: true,
        errorCount: 5,
      };
      const result = buildInitialState(partialState);
      expect(result).toEqual({
        mode: 60,
        difficulty: "hard",
        typing: true,
        text: "test",
        errorCount: 5,
        finish: false,
        best: 0,
        oldMistakes: "",
        input: "",
        difference: 0,
      });
    });

    it("should override all default values when full state provided", () => {
      const fullState: AppState = {
        mode: 30,
        difficulty: "medium",
        typing: true,
        text: "custom text",
        errorCount: 2,
        finish: true,
        best: 100,
        oldMistakes: "mistakes",
        input: "input",
        difference: 10,
      };
      const result = buildInitialState(fullState);
      expect(result).toEqual(fullState);
    });

    it("should handle empty object override", () => {
      const result = buildInitialState({});
      expect(result.mode).toBe("");
      expect(result.difficulty).toBe("easy");
      expect(result.typing).toBe(false);
    });
  });
});
