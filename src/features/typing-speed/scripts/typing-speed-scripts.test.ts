import type { AllOptions } from "../types";
import { buildInitialState } from "./initial-state-helper";
import { handleTypingSpeed } from "./typing-speed-scripts";

// Mock the getRandomElement function
vi.mock("@/shared", () => ({
  getRandomElement: vi.fn(() => ({ text: "mocked random text" })),
}));

describe("Typing Speed Scripts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("handleTypingSpeed", () => {
    describe("difficulty action", () => {
      it("should update difficulty and set typing to false", () => {
        const state = buildInitialState({ difficulty: "easy", typing: true });
        const action: AllOptions = { action: "difficulty", payload: "hard" };
        const result = handleTypingSpeed(state, action);
        expect(result.difficulty).toBe("hard");
        expect(result.typing).toBe(false);
      });

      it("should preserve other state properties", () => {
        const state = buildInitialState({ mode: 60, text: "test text" });
        const action: AllOptions = { action: "difficulty", payload: "medium" };
        const result = handleTypingSpeed(state, action);
        expect(result.mode).toBe(60);
        expect(result.text).toBe("test text");
      });
    });

    describe("mode action", () => {
      it("should update mode and set typing to false", () => {
        const state = buildInitialState({ mode: "", typing: true });
        const action: AllOptions = { action: "mode", payload: 30 };
        const result = handleTypingSpeed(state, action);
        expect(result.mode).toBe(30);
        expect(result.typing).toBe(false);
      });
    });

    describe("startTyping action", () => {
      it("should initialize typing session", () => {
        const state = buildInitialState({
          typing: false,
          text: "old text",
          input: "old input",
          errorCount: 5,
          finish: true,
        });
        const action: AllOptions = { action: "startTyping" };
        const result = handleTypingSpeed(state, action);

        const defined = ["startTyping", "lastTyping", "lastInputTime"] as const;
        defined.forEach((d) => expect(result[d]).toBeDefined());

        expect(result.typing).toBe(true);
        expect(result.difference).toBe(0);
        expect(result.text).toBe("mocked random text");
        expect(result.input).toBe("");
        expect(result.oldMistakes).toBe("");
        expect(result.errorCount).toBe(0);
        expect(result.finish).toBe(false);
      });

      it("should set timestamps to current time", () => {
        const mockTime = 1234567890000;
        vi.spyOn(Date.prototype, "getTime").mockReturnValue(mockTime);

        const state = buildInitialState();
        const action: AllOptions = { action: "startTyping" };
        const result = handleTypingSpeed(state, action);

        expect(result.startTyping).toBe(mockTime);
        expect(result.lastTyping).toBe(mockTime);
        expect(result.lastInputTime).toBe(mockTime);
      });
    });

    describe("stopTyping action", () => {
      it("should set typing to false", () => {
        const state = buildInitialState({ typing: true });
        const action: AllOptions = { action: "stopTyping" };
        const result = handleTypingSpeed(state, action);
        expect(result.typing).toBe(false);
      });

      it("should preserve other state", () => {
        const state = buildInitialState({
          mode: 45,
          difficulty: "hard",
          typing: true,
        });
        const action: AllOptions = { action: "stopTyping" };
        const result = handleTypingSpeed(state, action);
        expect(result.mode).toBe(45);
        expect(result.difficulty).toBe("hard");
      });
    });

    describe("updateTimer action", () => {
      it("should not update if not typing", () => {
        const state = buildInitialState({ typing: false });
        const action: AllOptions = { action: "updateTimer" };
        const result = handleTypingSpeed(state, action);
        expect(result).toBe(state);
      });

      it("should update timer in passage mode", () => {
        const mockStartTime = 1000000000000;
        const mockCurrentTime = 1000000005000; // 5 seconds later
        vi.spyOn(Date.prototype, "getTime").mockReturnValue(mockCurrentTime);

        const state = buildInitialState({
          typing: true,
          mode: "",
          startTyping: mockStartTime,
          lastInputTime: mockCurrentTime,
          finish: false,
        });
        const action: AllOptions = { action: "updateTimer" };
        const result = handleTypingSpeed(state, action);

        expect(result.lastTyping).toBe(mockCurrentTime);
        expect(result.difference).toBe(5);
        expect(result.typing).toBe(true);
        expect(result.finish).toBe(false);
      });

      it("should update timer in timed mode", () => {
        const mockStartTime = 1000000000000;
        const mockCurrentTime = 1000000030000; // 30 seconds later
        vi.spyOn(Date.prototype, "getTime").mockReturnValue(mockCurrentTime);

        const state = buildInitialState({
          typing: true,
          mode: 60,
          startTyping: mockStartTime,
          lastInputTime: mockCurrentTime,
          finish: false,
        });
        const action: AllOptions = { action: "updateTimer" };
        const result = handleTypingSpeed(state, action);

        expect(result.difference).toBe(30);
        expect(result.typing).toBe(true);
      });

      it("should stop typing when time limit exceeded in timed mode", () => {
        const mockStartTime = 1000000000000;
        const mockCurrentTime = 10000000100000; // 100 seconds later
        vi.spyOn(Date.prototype, "getTime").mockReturnValue(mockCurrentTime);

        const state = buildInitialState({
          typing: true,
          mode: 60,
          startTyping: mockStartTime,
          lastInputTime: mockCurrentTime,
          finish: false,
        });
        const action: AllOptions = { action: "updateTimer" };
        const result = handleTypingSpeed(state, action);

        expect(result.typing).toBe(false);
        expect(result.finish).toBe(true);
      });

      it("should stop typing when inactive for 5 seconds", () => {
        const mockStartTime = 1000000000000;
        const mockCurrentTime = 1000000000000;
        const mockLastInputTime = 1000000000000 - 6000; // 6 seconds ago
        vi.spyOn(Date.prototype, "getTime").mockReturnValue(mockCurrentTime);

        const state = buildInitialState({
          typing: true,
          mode: "",
          startTyping: mockStartTime,
          lastInputTime: mockLastInputTime,
          finish: false,
        });
        const action: AllOptions = { action: "updateTimer" };
        const result = handleTypingSpeed(state, action);

        expect(result.typing).toBe(false);
        expect(result.finish).toBe(false);
      });
    });

    describe("updateInput action", () => {
      it("should update input and call saveTextes", () => {
        const state = buildInitialState({ input: "old" });
        const action: AllOptions = {
          action: "updateInput",
          payload: "new input",
        };
        const result = handleTypingSpeed(state, action);

        expect(result.lastInputTime).toBeDefined();
        expect(result.input).toBe("new input");
      });
      it("should correct text when new input is shorter than old input", () => {
        const state = buildInitialState({
          text: "input to type",
          input: "inpur",
        });
        const action: AllOptions = { action: "updateInput", payload: "inpu" };
        const result = handleTypingSpeed(state, action);

        expect(result.input).toBe("input");
        expect(result.oldMistakes).toBe("inpur");
      });
    });

    describe("updateHighScore action", () => {
      it("should update best score", () => {
        const state = buildInitialState({ best: 50 });
        const action: AllOptions = { action: "updateHighScore", payload: 75 };
        const result = handleTypingSpeed(state, action);
        expect(result.best).toBe(75);
      });

      it("should preserve other state", () => {
        const state = buildInitialState({
          mode: 30,
          difficulty: "medium",
          best: 0,
        });
        const action: AllOptions = { action: "updateHighScore", payload: 100 };
        const result = handleTypingSpeed(state, action);
        expect(result.mode).toBe(30);
        expect(result.difficulty).toBe("medium");
      });
    });
  });
});
