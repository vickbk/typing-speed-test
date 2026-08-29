import { act, renderHook } from "@testing-library/react";
import { buildInitialState } from "../scripts";
import type { AppState } from "../types";
import { useTypingSpeed } from "./use-typing-speed";

// Mock the getRandomElement function
vi.mock("@/shared", () => ({
  getRandomElement: vi.fn(() => ({ text: "mocked random text" })),
}));

// Mock the data.json import
vi.mock("../assets/data.json", () => ({
  default: {
    easy: [{ text: "easy text" }],
    medium: [{ text: "medium text" }],
    hard: [{ text: "hard text" }],
    code: [{ text: "code text" }],
    quote: [{ text: "quote text" }],
  },
}));

describe("useTypingSpeed", () => {
  it("should initialize with provided initial state", () => {
    const initialState = buildInitialState();

    const { result } = renderHook(() => useTypingSpeed(initialState));

    expect(result.current.state).toEqual(initialState);
    expect(typeof result.current.dispatch).toBe("function");
  });

  it("should dispatch actions and update state", () => {
    const initialState = buildInitialState();

    const { result } = renderHook(() => useTypingSpeed(initialState));

    act(() => {
      result.current.dispatch({ action: "difficulty", payload: "hard" });
    });

    expect(result.current.state.difficulty).toBe("hard");
    expect(result.current.state.typing).toBe(false);
  });

  it("should handle startTyping action", () => {
    const initialState: AppState = buildInitialState();

    const { result } = renderHook(() => useTypingSpeed(initialState));

    act(() => {
      result.current.dispatch({ action: "startTyping" });
    });

    expect(result.current.state.typing).toBe(true);
    expect(result.current.state.text).toBe("mocked random text");
    expect(result.current.state.input).toBe("");
    expect(result.current.state.errorCount).toBe(0);
    expect(result.current.state.oldMistakes).toBe("");
    expect(result.current.state.finish).toBe(false);
    expect(result.current.state.startTyping).toBeDefined();
  });

  it("should handle stopTyping action", () => {
    const initialState = buildInitialState({ typing: true });

    const { result } = renderHook(() => useTypingSpeed(initialState));

    act(() => {
      result.current.dispatch({ action: "stopTyping" });
    });

    expect(result.current.state.typing).toBe(false);
  });

  it("should handle updateHighScore action", () => {
    const initialState: AppState = buildInitialState();

    const { result } = renderHook(() => useTypingSpeed(initialState));

    act(() => {
      result.current.dispatch({ action: "updateHighScore", payload: 75 });
    });

    expect(result.current.state.best).toBe(75);
  });
});
