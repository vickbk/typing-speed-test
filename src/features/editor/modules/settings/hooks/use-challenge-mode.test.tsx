import { TypingContext, type AppState } from "@/features/typing-speed";
import { renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useChallengeMode } from "./use-challenge-mode";

// Mock memorization
vi.mock("@/shared", () => ({
  getMemoItem: vi.fn((key: string) => {
    if (key === "mode") return 60;
    return undefined;
  }),
  setMemoItem: vi.fn(),
}));

describe("useChallengeMode", () => {
  it("should have timing modes available", () => {
    const mockState = {
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
          state: mockState as AppState,
          dispatch: vi.fn(),
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </TypingContext.Provider>
    );

    const { result } = renderHook(() => useChallengeMode(), {
      wrapper: TestWrapper,
    });

    expect(result.current.timingMode).toBeDefined();
    expect(result.current.timingMode.length).toBeGreaterThan(0);
  });

  it("should include timed and passage modes", () => {
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

    const { result } = renderHook(() => useChallengeMode(), {
      wrapper: TestWrapper,
    });

    const modes = result.current.timingMode.map(([value]) => value);
    expect(modes).toContain(15);
    expect(modes).toContain(30);
    expect(modes).toContain(60);
    expect(modes).toContain(120);
    expect(modes).toContain("");
  });

  it("should return current mode", () => {
    const mockState: AppState = {
      mode: 60,
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

    const { result } = renderHook(() => useChallengeMode(), {
      wrapper: TestWrapper,
    });

    expect(result.current.mode).toBe(60);
  });

  it("should provide mode display text", () => {
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

    const { result } = renderHook(() => useChallengeMode(), {
      wrapper: TestWrapper,
    });

    expect(result.current.modeDisplay).toBeDefined();
    expect(typeof result.current.modeDisplay).toBe("string");
  });

  it("should have setMode function", () => {
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

    const { result } = renderHook(() => useChallengeMode(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.setMode).toBe("function");
  });

  it("should have loadMode function", () => {
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

    const { result } = renderHook(() => useChallengeMode(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.loadMode).toBe("function");
  });
});
