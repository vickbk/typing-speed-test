import { renderHook } from "@testing-library/react";
import { buildInitialState } from "../scripts";
import { TypingContext, useTypingCtx } from "./typing-context";

describe("TypingContext", () => {
  it("should provide context value", () => {
    const mockState = buildInitialState();

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

    const { result } = renderHook(() => useTypingCtx(), {
      wrapper: TestWrapper,
    });

    expect(result.current.state).toEqual(mockState);
    expect(result.current.dispatch).toBe(mockDispatch);
  });
});
