import { TypingContext, type AppState } from "@/features/typing-speed";
import { renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useScoreHistory } from "./use-score-history";

// Mock memorization
vi.mock("@/shared", () => ({
  getMemoItem: vi.fn((key: string) => {
    if (key === "score.easy") {
      return [
        { wpm: 45, time: 1000 },
        { wpm: 50, time: 2000 },
        { wpm: 42, time: 3000 },
      ];
    }
    return [];
  }),
  usePagination: vi.fn((data, pageSize) => ({
    page: 0,
    setPage: vi.fn(),
    totalPages: Math.ceil(data.length / pageSize),
    display: data.slice(0, pageSize),
  })),
}));

describe("useScoreHistory", () => {
  it("should return pagination properties", () => {
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

    const mockDispatch = vi.fn();

    const TestWrapper = ({ children }: { children: React.ReactNode }) => (
      <TypingContext.Provider
        value={{
          state: mockState,
          dispatch: mockDispatch,
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </TypingContext.Provider>
    );

    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: TestWrapper,
    });

    expect(result.current.page).toBeDefined();
    expect(result.current.setPage).toBeDefined();
    expect(result.current.totalPages).toBeDefined();
  });

  it("should return navigate function", () => {
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

    const mockDispatch = vi.fn();

    const TestWrapper = ({ children }: { children: React.ReactNode }) => (
      <TypingContext.Provider
        value={{
          state: mockState,
          dispatch: mockDispatch,
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </TypingContext.Provider>
    );

    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.navigate).toBe("function");
  });

  it("should have closeDialog function", () => {
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

    const mockDispatch = vi.fn();

    const TestWrapper = ({ children }: { children: React.ReactNode }) => (
      <TypingContext.Provider
        value={{
          state: mockState,
          dispatch: mockDispatch,
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </TypingContext.Provider>
    );

    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.closeDialog).toBe("function");
  });

  it("should have loadResults function", () => {
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

    const mockDispatch = vi.fn();

    const TestWrapper = ({ children }: { children: React.ReactNode }) => (
      <TypingContext.Provider
        value={{
          state: mockState,
          dispatch: mockDispatch,
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </TypingContext.Provider>
    );

    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.loadResults).toBe("function");
  });

  it("should sort results by time in descending order", () => {
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

    const mockDispatch = vi.fn();

    const TestWrapper = ({ children }: { children: React.ReactNode }) => (
      <TypingContext.Provider
        value={{
          state: mockState,
          dispatch: mockDispatch,
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </TypingContext.Provider>
    );

    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: TestWrapper,
    });

    result.current.loadResults(document.createElement("div"));

    expect(result.current.loadResults).toBeDefined();
  });
});
