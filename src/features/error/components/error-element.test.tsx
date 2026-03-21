import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import type { ErrorProps } from "../types";
import { ErrorElement } from "./error-element";

vi.mock("../hooks", () => ({
  useError: vi.fn(({ error }) => ({
    navigate: vi.fn(),
    error,
  })),
}));

describe("ErrorElement Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render error dialog", async () => {
    const errorProps: ErrorProps = {
      error: new Error("Test error"),
    };

    const { container } = render(
      <BrowserRouter>
        <ErrorElement {...errorProps} />
      </BrowserRouter>,
    );

    const dialog = container.querySelector("dialog");
    expect(dialog).toBeInTheDocument();
  });

  it("should display error message", async () => {
    const errorProps: ErrorProps = {
      error: new Error("Something went wrong!"),
    };

    render(
      <BrowserRouter>
        <ErrorElement {...errorProps} />
      </BrowserRouter>,
    );

    await expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("should display default error message when no message provided", async () => {
    const errorProps: ErrorProps = {
      error: {} as Error,
    };

    render(
      <BrowserRouter>
        <ErrorElement {...errorProps} />
      </BrowserRouter>,
    );

    await expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("should render home link", async () => {
    const errorProps: ErrorProps = {
      error: new Error("Error"),
    };

    render(
      <BrowserRouter>
        <ErrorElement {...errorProps} />
      </BrowserRouter>,
    );

    const link = await screen.findByRole("link", { name: /go back home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/home");
  });

  it("should have proper styling classes", async () => {
    const errorProps: ErrorProps = {
      error: new Error("Test"),
    };

    const { container } = render(
      <BrowserRouter>
        <ErrorElement {...errorProps} />
      </BrowserRouter>,
    );

    const dialog = container.querySelector("dialog");
    expect(dialog).toHaveClass("m-auto");
    expect(dialog).toHaveClass("p-4");
    expect(dialog).toHaveClass("background");
    expect(dialog).toHaveClass("rounded-md");
  });

  it("should render section with proper structure", async () => {
    const errorProps: ErrorProps = {
      error: new Error("Error Message"),
    };

    const { container } = render(
      <BrowserRouter>
        <ErrorElement {...errorProps} />
      </BrowserRouter>,
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("flex");
    expect(section).toHaveClass("grow");
    expect(section).toHaveClass("flex-col");
  });

  it("should display page title", async () => {
    const errorProps: ErrorProps = {
      error: new Error("Test"),
    };

    render(
      <BrowserRouter>
        <ErrorElement {...errorProps} />
      </BrowserRouter>,
    );

    const title = document.querySelector("title");
    await expect(title?.textContent).toBe("Error | Typing speed test");
  });

  it("should have link with proper styling", async () => {
    const errorProps: ErrorProps = {
      error: new Error("Test"),
    };

    render(
      <BrowserRouter>
        <ErrorElement {...errorProps} />
      </BrowserRouter>,
    );

    const link = await screen.findByRole("link", { name: /go back home/i });
    expect(link).toHaveClass("rounded-md");
    expect(link).toHaveClass("px-4");
    expect(link).toHaveClass("py-2");
  });
});
