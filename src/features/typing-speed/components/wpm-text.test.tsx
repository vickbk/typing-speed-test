import { render, screen } from "@testing-library/react";
import { WPMText } from "./wpm-text";

describe("WPMText Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render abbreviation element", () => {
    const { container } = render(<WPMText />);
    const abbr = container.querySelector("abbr");

    expect(abbr).toBeInTheDocument();
  });

  it("should display WPM text", () => {
    render(<WPMText />);
    expect(screen.getByText("WPM")).toBeInTheDocument();
  });

  it("should have title attribute with full form", () => {
    const { container } = render(<WPMText />);
    const abbr = container.querySelector("abbr");

    expect(abbr).toHaveAttribute("title", "Word Per Minute");
  });

  it("should have sr-only element for accessibility", () => {
    render(<WPMText />);
    const srText = screen.getByText("(Word Per Minute)");

    expect(srText).toHaveClass("sr-only");
  });

  it("should render both visible and screen-reader text", () => {
    render(<WPMText />);

    expect(screen.getByText("WPM")).toBeInTheDocument();
    expect(screen.getByText("(Word Per Minute)")).toBeInTheDocument();
  });
});
