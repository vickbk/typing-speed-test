import {
  TypingContext,
  buildInitialState,
  type AppState,
} from "@/features/typing-speed";
import { act, renderHook, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useScoreHistory } from "./use-score-history";

// Mock memorization
vi.mock("@/shared", () => ({
  getMemoItem: vi.fn(),
  usePagination: vi.fn((data, pageSize) => ({
    page: 0,
    setPage: vi.fn(),
    totalPages: Math.ceil(data.length / pageSize),
    display: data.slice(0, pageSize),
  })),
}));

import { getMemoItem } from "@/shared";
import { HOOK_CALLER } from "@tests/vitest";

const testWrapper =
  ({ state = {} }: { state?: Partial<AppState> } = {}) =>
  ({ children }: { children: React.ReactNode }) => (
    <TypingContext.Provider
      value={{
        state: buildInitialState(state),
        dispatch: vi.fn(),
      }}
    >
      <BrowserRouter>{children}</BrowserRouter>
    </TypingContext.Provider>
  );

describe("useScoreHistory", () => {
  const mockGetMemoItem = vi.mocked(getMemoItem);

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetMemoItem.mockImplementation((key: string) => {
      if (key === "score.easy") {
        return [
          { wpm: 45, time: 1000 },
          { wpm: 50, time: 2000 },
          { wpm: 42, time: 3000 },
        ];
      }
      return [];
    });
  });

  it("should return pagination properties", () => {
    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: testWrapper(),
    });

    expect(result.current.page).toBeDefined();
    expect(result.current.setPage).toBeDefined();
    expect(result.current.totalPages).toBeDefined();
  });

  it("should return navigate function", () => {
    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: testWrapper(),
    });

    expect(typeof result.current.navigate).toBe("function");
  });

  it("should have closeDialog function", () => {
    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: testWrapper(),
    });

    expect(typeof result.current.closeDialog).toBe("function");
  });

  it("should have loadResults function", () => {
    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: testWrapper(),
    });

    expect(typeof result.current.loadResults).toBe("function");
  });

  it("should sort results by time in descending order", async () => {
    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: testWrapper(),
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

  it("should handle loadResults when node is null", () => {
    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: testWrapper(),
    });

    act(() => {
      result.current.loadResults(null);
    });

    expect(result.current.display).toEqual([]);
  });

  it.each(["easy", "medium", "hard", "quote", "code"] as const)(
    "should load results for difficulty %s",
    async (difficulty) => {
      mockGetMemoItem.mockImplementation((key: string) => {
        if (key === "score." + difficulty) {
          return [
            { wpm: 45, time: 1000 },
            { wpm: 50, time: 2000 },
            { wpm: 42, time: 3000 },
          ];
        }
        return [];
      });
      const { result } = renderHook(() => useScoreHistory(), {
        wrapper: testWrapper({ state: { difficulty } }),
      });

      act(() => {
        result.current.loadResults(HOOK_CALLER);
      });

      await waitFor(() => {
        expect(result.current.display).not.toEqual([]);
      });
    },
  );

  it("should handle loadResults when node is null", () => {
    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: testWrapper(),
    });

    act(() => {
      result.current.loadResults(null);
    });

    expect(result.current.display).toEqual([]);
  });

  it("should handle loadResults when getMemoItem returns null", async () => {
    mockGetMemoItem.mockReturnValueOnce(null);

    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: testWrapper(),
    });

    act(() => {
      result.current.loadResults(HOOK_CALLER);
    });

    await waitFor(() => {
      expect(result.current.display).toEqual([]);
    });
  });

  it("should memorize loadResults callback", () => {
    const { result, rerender } = renderHook(() => useScoreHistory(), {
      wrapper: testWrapper(),
    });

    const firstLoadResults = result.current.loadResults;

    rerender();

    expect(result.current.loadResults).toBe(firstLoadResults);
  });

  it("should memorize closeDialog callback", () => {
    const { result, rerender } = renderHook(() => useScoreHistory(), {
      wrapper: testWrapper(),
    });

    const firstCloseDialog = result.current.closeDialog;

    rerender();

    expect(result.current.closeDialog).toBe(firstCloseDialog);
  });

  it("should handle pagination with more results", async () => {
    mockGetMemoItem.mockReturnValueOnce([
      { wpm: 45, time: 1000 },
      { wpm: 50, time: 2000 },
      { wpm: 42, time: 3000 },
      { wpm: 55, time: 4000 },
      { wpm: 48, time: 5000 },
      { wpm: 60, time: 6000 },
      { wpm: 52, time: 7000 },
      { wpm: 47, time: 8000 },
      { wpm: 58, time: 9000 },
      { wpm: 49, time: 10000 },
      { wpm: 53, time: 11000 },
      { wpm: 46, time: 12000 },
    ]);

    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: testWrapper(),
    });

    act(() => {
      result.current.loadResults(HOOK_CALLER);
    });

    await waitFor(() => {
      expect(result.current.display).toHaveLength(10); // First page should show 10 items
      expect(result.current.totalPages).toBe(2); // 12 items with pageSize 10 = 2 pages
    });
  });

  it("should sort results correctly by time descending", async () => {
    const { result } = renderHook(() => useScoreHistory(), {
      wrapper: testWrapper(),
    });

    act(() => {
      result.current.loadResults(document.createElement("div"));
    });

    await waitFor(() => {
      expect(result.current.display).toHaveLength(3);
      // Check that times are in descending order
      expect(result.current.display[0].time).toBe(3000);
      expect(result.current.display[1].time).toBe(2000);
      expect(result.current.display[2].time).toBe(1000);
      // Check that WPM values correspond to the correct times
      expect(result.current.display[0].wpm).toBe(42);
      expect(result.current.display[1].wpm).toBe(50);
      expect(result.current.display[2].wpm).toBe(45);
    });
  });

  it("should return the same navigate function instance", () => {
    const { result, rerender } = renderHook(() => useScoreHistory(), {
      wrapper: testWrapper(),
    });

    const firstNavigate = result.current.navigate;

    rerender();

    expect(result.current.navigate).toBe(firstNavigate);
  });
});
