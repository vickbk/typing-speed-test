import { renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useError } from "./use-error";

describe("useError", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should log error to console", () => {
    const testError = new Error("Test error message");
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    );

    renderHook(() => useError({ error: testError }), { wrapper });

    expect(consoleErrorSpy).toHaveBeenCalledWith(testError);
  });

  it("should return navigate function", () => {
    const testError = new Error("Test error");
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    );

    const { result } = renderHook(() => useError({ error: testError }), {
      wrapper,
    });

    expect(result.current.navigate).toBeDefined();
    expect(typeof result.current.navigate).toBe("function");
  });

  it("should log error when error changes", () => {
    const error1 = new Error("Error 1");
    const error2 = new Error("Error 2");
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    );

    const { rerender } = renderHook(({ error }) => useError({ error }), {
      wrapper,
      initialProps: { error: error1 },
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(error1);

    rerender({ error: error2 });

    expect(consoleErrorSpy).toHaveBeenCalledWith(error2);
  });

  it("should handle different error types", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    );

    const stringError = "String error";
    renderHook(() => useError({ error: stringError as unknown as Error }), {
      wrapper,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(stringError);

    consoleErrorSpy.mockClear();

    const objError = { message: "Object error" };
    renderHook(() => useError({ error: objError as unknown as Error }), {
      wrapper,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(objError);
  });
});
