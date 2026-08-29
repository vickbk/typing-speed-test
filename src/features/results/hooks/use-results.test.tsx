import { TypingContext, buildInitialState } from "@/features/typing-speed";
import { renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useResults } from "./use-results";

// Mock memorization and calculations
vi.mock("@/shared", () => ({
  getMemoItem: vi.fn(() => []),
  setMemoItem: vi.fn(),
}));

vi.mock("@/features/typing-speed", async () => {
  const actual = await vi.importActual("@/features/typing-speed");
  return {
    ...actual,
    calculateWPM: vi.fn(() => "50"),
  };
});

describe("useResults", () => {
  it("should return results object with default values", () => {
    const mockState = buildInitialState();

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

    const { result } = renderHook(() => useResults(), {
      wrapper: TestWrapper,
    });

    expect(result.current.results).toBeDefined();
    expect(result.current.results.current.title).toBeDefined();
    expect(result.current.results.current.text).toBeDefined();
    expect(result.current.results.current.button).toBeDefined();
  });

  it("should have loadOtherResults function", () => {
    const mockState = buildInitialState();

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

    const { result } = renderHook(() => useResults(), {
      wrapper: TestWrapper,
    });

    expect(typeof result.current.loadOtherResults).toBe("function");
  });

  it("should call results function on initial render", () => {
    const mockState = buildInitialState();

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

    const { result } = renderHook(() => useResults(), {
      wrapper: TestWrapper,
    });

    expect(result.current.results.current.title).toBe("Test Completed");
  });

  it("should have correct initial result properties", () => {
    const mockState = buildInitialState();

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

    const {
      result: {
        current: { results },
      },
    } = renderHook(() => useResults(), {
      wrapper: TestWrapper,
    });

    expect(results.current.first).toBe(true);
    expect(results.current.best).toBe(false);
    expect(results.current.button).toBe("Go Again");
    expect(results.current.icon).toBeDefined();
  });
});
