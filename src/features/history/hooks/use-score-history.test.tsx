import { TypingContext, buildInitialState } from "@/features/typing-speed";
import { act, renderHook, waitFor } from "@testing-library/react";
import { HOOK_CALLER } from "@tests/vitest";
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

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TypingContext.Provider
    value={{
      state: buildInitialState({ difficulty: "easy" }),
      dispatch: vi.fn(),
    }}
  >
    <BrowserRouter>{children}</BrowserRouter>
  </TypingContext.Provider>
);

describe("useScoreHistory", () => {
  it("should return pagination properties", () => {
    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: TestWrapper,
    });

    expect(result.current.page).toBeDefined();
    expect(result.current.setPage).toBeDefined();
    expect(result.current.totalPages).toBeDefined();
  });

  it("should return navigate function", () => {
    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.navigate).toBe("function");
  });

  it("should have closeDialog function", () => {
    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.closeDialog).toBe("function");
  });

  it("should have loadResults function", () => {
    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.loadResults).toBe("function");
  });

  it("should sort results by time in descending order", async () => {
    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.loadResults(HOOK_CALLER);
    });

    await waitFor(() => {
      expect(result.current.display).not.toEqual([]);
      expect(result.current.display[0].time).toBeGreaterThan(
        result.current.display[1].time,
      );
    });
  });
});
