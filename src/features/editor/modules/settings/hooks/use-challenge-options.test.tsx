import { TypingContext, type AppState } from "@/features/typing-speed";
import { renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useChallengeOptions } from "./use-challenge-options";

// Mock memorization
vi.mock("@/shared", () => ({
  getMemoItem: vi.fn((key: string) => {
    if (key === "difficulty") return "easy";
    return undefined;
  }),
  setMemoItem: vi.fn(),
}));

describe("useChallengeOptions", () => {
  it("should have difficulty options", () => {
    const mockState: AppState = {
      mode: "",
      difficulty: "easy",
      typing: false,
      text: "test",
      errorCount: 0,
      finish: false,
      best: 0,
      oldMistakes: "",
    };

    const TestWrapper = ({ children }: { children: React.ReactNode }) => (
      <TypingContext.Provider
        value={{
          state: mockState,
          dispatch: vi.fn(),
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </TypingContext.Provider>
    );

    const { result } = renderHook(() => useChallengeOptions(), {
      wrapper: TestWrapper,
    });

    expect(result.current.options).toBeDefined();
    expect(Array.isArray(result.current.options)).toBe(true);
  });

  it("should include all difficulty levels", () => {
    const mockState: AppState = {
      mode: "",
      difficulty: "easy",
      typing: false,
      text: "test",
      errorCount: 0,
      finish: false,
      best: 0,
      oldMistakes: "",
    };

    const TestWrapper = ({ children }: { children: React.ReactNode }) => (
      <TypingContext.Provider
        value={{
          state: mockState,
          dispatch: vi.fn(),
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </TypingContext.Provider>
    );

    const { result } = renderHook(() => useChallengeOptions(), {
      wrapper: TestWrapper,
    });

    expect(result.current.options).toContain("easy");
    expect(result.current.options).toContain("medium");
    expect(result.current.options).toContain("hard");
    expect(result.current.options).toContain("quote");
    expect(result.current.options).toContain("code");
  });

  it("should return current difficulty", () => {
    const mockState: AppState = {
      mode: "",
      difficulty: "hard",
      typing: false,
      text: "test",
      errorCount: 0,
      finish: false,
      best: 0,
      oldMistakes: "",
    };

    const TestWrapper = ({ children }: { children: React.ReactNode }) => (
      <TypingContext.Provider
        value={{
          state: mockState,
          dispatch: vi.fn(),
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </TypingContext.Provider>
    );

    const { result } = renderHook(() => useChallengeOptions(), {
      wrapper: TestWrapper,
    });

    expect(result.current.difficulty).toBe("hard");
  });

  it("should have setDifficulty function", () => {
    const mockState: AppState = {
      mode: "",
      difficulty: "easy",
      typing: false,
      text: "test",
      errorCount: 0,
      finish: false,
      best: 0,
      oldMistakes: "",
    };

    const TestWrapper = ({ children }: { children: React.ReactNode }) => (
      <TypingContext.Provider
        value={{
          state: mockState,
          dispatch: vi.fn(),
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </TypingContext.Provider>
    );

    const { result } = renderHook(() => useChallengeOptions(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.setDifficulty).toBe("function");
  });

  it("should have loadDifficulty function", () => {
    const mockState: AppState = {
      mode: "",
      difficulty: "easy",
      typing: false,
      text: "test",
      errorCount: 0,
      finish: false,
      best: 0,
      oldMistakes: "",
    };

    const TestWrapper = ({ children }: { children: React.ReactNode }) => (
      <TypingContext.Provider
        value={{
          state: mockState,
          dispatch: vi.fn(),
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </TypingContext.Provider>
    );

    const { result } = renderHook(() => useChallengeOptions(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.loadDifficulty).toBe("function");
  });
});
