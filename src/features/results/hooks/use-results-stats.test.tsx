import {
  buildInitialState,
  TypingContext,
  type AppState,
} from "@/features/typing-speed";
import { renderHook } from "@testing-library/react";
import { useResultsStats } from "./use-results-stats";

describe("Use Results stats", () => {
  it("should return all state properties", () => {
    const { result } = renderUseResultsStats();

    Object.keys(buildInitialState()).every((key) =>
      expect(result.current[key as keyof AppState]).toBeDefined(),
    );
  });

  it("should have WPM and accuracy", () => {
    const { result } = renderUseResultsStats();
    ["WPM", "accuracy"].every((key) =>
      expect(result.current[key as keyof AppState]).toBeDefined(),
    );
  });

  it("should calculate WPM correctly", () => {
    const {
      result: {
        current: { WPM },
      },
    } = renderUseResultsStats({ input: "hello world", difference: 60 });

    const expected = ((2 * 60) / 60).toFixed();
    expect(WPM).toBe(expected);
  });

  it("should calculate accuracy correctly", () => {
    const {
      result: {
        current: { accuracy },
      },
    } = renderUseResultsStats({ input: "hello world", errorCount: 3 });

    const expected = (((11 - 3) * 100) / 11).toFixed();
    expect(accuracy).toBe(expected);
  });
});

function renderUseResultsStats(state: Partial<AppState> = {}) {
  const mockState = buildInitialState(state);
  const mockDispatch = vi.fn();

  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <TypingContext.Provider
      value={{
        state: mockState,
        dispatch: mockDispatch,
      }}
    >
      {children}
    </TypingContext.Provider>
  );

  return renderHook(() => useResultsStats({ state: mockState }), {
    wrapper: TestWrapper,
  });
}
