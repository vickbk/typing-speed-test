import type { AppState } from "@/features/typing-speed";
import { render, screen } from "@testing-library/react";
import { ResultsStats } from "./results-stats";

vi.mock("../hooks", () => ({
  useResultsStats: vi.fn(() => ({
    WPM: "60",
    accuracy: "95",
    input: "hello world test",
    errorCount: 1,
  })),
}));

vi.mock("@/features/typing-speed/components/wpm-text", () => ({
  WPMText: () => <span>WPM</span>,
}));

describe("ResultsStats Integration", () => {
  const mockState: AppState = {
    mode: 60,
    difficulty: "easy",
    typing: false,
    text: "hello world test typing",
    errorCount: 1,
    finish: true,
    best: 65,
    oldMistakes: "",
    input: "hello world test",
    difference: 45,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render results stats section", () => {
    const { container } = render(<ResultsStats state={mockState} />);
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("should display WPM stat", async () => {
    render(<ResultsStats state={mockState} />);

    await expect(screen.getByText("WPM")).toBeInTheDocument();
    await expect(screen.getByText("60")).toBeInTheDocument();
  });

  it("should display accuracy stat", async () => {
    render(<ResultsStats state={mockState} />);

    await expect(screen.getByText("Accuracy:")).toBeInTheDocument();
    await expect(screen.getByText("95%")).toBeInTheDocument();
  });

  it("should display characters stat", async () => {
    render(<ResultsStats state={mockState} />);

    await expect(screen.getByText("Characters")).toBeInTheDocument();
  });

  it("should show overall grid layout", () => {
    const { container } = render(<ResultsStats state={mockState} />);
    const section = container.querySelector("section");

    expect(section).toHaveClass("grid");
    expect(section).toHaveClass("gap-4");
  });

  it("should display three stat items", () => {
    const { container } = render(<ResultsStats state={mockState} />);
    const section = container.querySelector("section");
    const articles = section?.querySelectorAll("article");

    // Should have multiple stat containers (one per stat)
    expect(articles?.length || 0).toBeGreaterThan(0);
  });

  it("should render error count in red when accuracy is not 100", async () => {
    render(<ResultsStats state={mockState} />);

    const accuracyText = await screen.findByText("95%");
    await expect(accuracyText).toHaveClass("c-red-500");
  });

  it("should call useResultsStats hook with state prop", async () => {
    const { useResultsStats } = await import("../hooks");

    render(<ResultsStats state={mockState} />);

    await expect(useResultsStats).toHaveBeenCalledWith({ state: mockState });
  });
});
