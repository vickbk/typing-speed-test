import { act, renderHook } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { useMobileMenue } from "./use-mobile-menue";

describe("useMobileMenue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with open state as false", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    );
    const { result } = renderHook(() => useMobileMenue(), { wrapper });
    expect(result.current.open).toBe(false);
  });

  it("should have setOpen function", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    );
    const { result } = renderHook(() => useMobileMenue(), { wrapper });
    expect(typeof result.current.setOpen).toBe("function");
  });

  it("should return query search params", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    );
    const { result } = renderHook(() => useMobileMenue(), { wrapper });
    expect(result.current.query).toBeDefined();
  });

  it("should have closeOnfocusOut callback", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    );
    const { result } = renderHook(() => useMobileMenue(), { wrapper });
    expect(typeof result.current.closeOnfocusOut).toBe("function");
  });

  it("should toggle open state", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    );
    const { result } = renderHook(() => useMobileMenue(), { wrapper });
    expect(result.current.open).toBe(false);

    act(() => {
      result.current.setOpen(true);
    });

    expect(result.current.open).toBe(true);
  });

  it("should close menu on outside click", async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    );
    const { result } = renderHook(() => useMobileMenue(), { wrapper });

    // Create a mock element for the menu
    const menuDiv = document.createElement("div");

    const otherDiv = document.createElement("div");
    [menuDiv, otherDiv].forEach((e) => document.body.appendChild(e));

    act(() => result.current.setOpen(true));
    await expect(result.current.open).toBeTruthy();

    const cleanup = result.current.closeOnfocusOut(menuDiv);

    await userEvent.click(otherDiv);

    await expect(result.current.open).toBeFalsy();

    if (cleanup) cleanup();

    document.body.removeChild(menuDiv);
  });

  it("should return undefined cleanup function for null element", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <BrowserRouter>{children}</BrowserRouter>
    );
    const { result } = renderHook(() => useMobileMenue(), { wrapper });
    const cleanup = result.current.closeOnfocusOut(null);
    expect(cleanup).toBeUndefined();
  });
});
