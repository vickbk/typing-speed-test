import type { TypeScore } from "@/features/typing-speed";
import { render, screen } from "@testing-library/react";
import { HistoryElement } from "./history-element";

vi.mock("@/features/results/components/results-stats", () => ({
  ResultsStats: () => <div>Results Stats Mock</div>,
}));

vi.mock("@/shared", () => ({
  formatDateTime: vi.fn(({ time }) => {
    const date = new Date(time);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }),
}));

describe("HistoryElement Integration", () => {
  const mockScore: TypeScore = {
    wpm: 65,
    time: new Date("2024-03-15T14:30:00").getTime(),
    session: {
      mode: 60,
      difficulty: "hard",
      typing: false,
      text: "test text",
      errorCount: 2,
      finish: true,
      best: 65,
      oldMistakes: "",
      input: "test text",
      difference: 45,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render article element", () => {
    const { container } = render(<HistoryElement {...mockScore} />);
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });

  it("should display formatted date and time", async () => {
    render(<HistoryElement {...mockScore} />);

    const timeElement = screen.getByRole("heading");
    await expect(timeElement).toBeInTheDocument();
  });

  it("should have time element with correct datetime attribute", () => {
    const { container } = render(<HistoryElement {...mockScore} />);
    const timeElement = container.querySelector("time");

    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute(
      "dateTime",
      new Date(mockScore.time).toISOString(),
    );
  });

  it("should render results stats component", async () => {
    render(<HistoryElement {...mockScore} />);

    await expect(screen.getByText("Results Stats Mock")).toBeInTheDocument();
  });

  it("should display sr-only text for accessibility", async () => {
    render(<HistoryElement {...mockScore} />);

    await expect(screen.getByText("Results for date")).toBeInTheDocument();
  });

  it("should have proper heading level", () => {
    render(<HistoryElement {...mockScore} />);

    const heading = screen.getByRole("heading");
    expect(heading.tagName).toMatch(/h[1-6]/i);
  });

  it("should have sr-only class on accessibility text", async () => {
    render(<HistoryElement {...mockScore} />);

    const srText = await screen.findByText("Results for date");
    expect(srText).toHaveClass("sr-only");
  });

  it("should render with different scores", async () => {
    const differentScore: TypeScore = {
      wpm: 80,
      time: new Date("2024-03-16T10:15:00").getTime(),
      session: {
        ...mockScore.session,
        difficulty: "easy",
        best: 80,
      },
    };

    render(<HistoryElement {...differentScore} />);

    const timeElement = await screen.findByRole("heading");
    await expect(timeElement).toBeInTheDocument();
  });
});
