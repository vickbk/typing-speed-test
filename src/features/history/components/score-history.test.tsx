import {
  buildInitialState,
  TypingContext,
  type TypeScore,
} from "@/features/typing-speed";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLEAR_BUTTON,
  CLOSE_HISTORY,
  NEVER_PLAYED_BEFORE,
  NO_PREVIOUS_RECORDS,
  SCORE_HISTORY,
  START_NEW_TEST,
} from "@tests/shared";
import { shouldNotSee, shouldSee } from "@tests/vitest";
import { BrowserRouter } from "react-router-dom";
import { useScoreHistory } from "../hooks";
import { ScoreHistory } from "./score-history";

// Mock the hook
vi.mock("../hooks", () => ({
  useScoreHistory: vi.fn(),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TypingContext.Provider
    value={{
      state: buildInitialState({ difficulty: "easy" }),
      dispatch: vi.fn(),
    }}
  >
    <BrowserRouter>{children}</BrowserRouter>
  </TypingContext.Provider>
);

describe("ScoreHistory", () => {
  const mockCloseDialog = vi.fn();
  const mockLoadResults = vi.fn();
  const mockSetPage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the score history dialog with title and close button", async () => {
    const mockUseScoreHistory = vi.mocked(useScoreHistory);
    mockUseScoreHistory.mockReturnValue({
      closeDialog: mockCloseDialog,
      loadResults: mockLoadResults,
      display: [],
      totalPages: 1,
      page: 0,
      setPage: mockSetPage,
      navigate: vi.fn(),
    });

    render(
      <TestWrapper>
        <ScoreHistory />
      </TestWrapper>,
    );

    await shouldSee(SCORE_HISTORY, CLOSE_HISTORY, CLEAR_BUTTON);
  });

  it("should render empty score component when display is empty", async () => {
    const mockUseScoreHistory = vi.mocked(useScoreHistory);
    mockUseScoreHistory.mockReturnValue({
      closeDialog: mockCloseDialog,
      loadResults: mockLoadResults,
      display: [],
      totalPages: 1,
      page: 0,
      setPage: mockSetPage,
      navigate: vi.fn(),
    });

    render(
      <TestWrapper>
        <ScoreHistory />
      </TestWrapper>,
    );

    await shouldSee(NO_PREVIOUS_RECORDS, NEVER_PLAYED_BEFORE, START_NEW_TEST);
  });

  it("should render history elements when display has data", async () => {
    const mockData = [
      { wpm: 45, time: 1000, session: buildInitialState() },
      { wpm: 50, time: 2000, session: buildInitialState() },
      { wpm: 42, time: 3000, session: buildInitialState() },
    ] as TypeScore[];

    const mockUseScoreHistory = vi.mocked(useScoreHistory);
    mockUseScoreHistory.mockReturnValue({
      closeDialog: mockCloseDialog,
      loadResults: mockLoadResults,
      display: mockData,
      totalPages: 1,
      page: 0,
      setPage: mockSetPage,
      navigate: vi.fn(),
    });

    render(
      <TestWrapper>
        <ScoreHistory />
      </TestWrapper>,
    );

    await shouldNotSee(NO_PREVIOUS_RECORDS);
  });

  it("should render pagination when there are multiple pages", async () => {
    const mockData = [
      { wpm: 45, time: 1000, session: buildInitialState() },
      { wpm: 50, time: 2000, session: buildInitialState() },
    ] as TypeScore[];

    const mockUseScoreHistory = vi.mocked(useScoreHistory);
    mockUseScoreHistory.mockReturnValue({
      closeDialog: mockCloseDialog,
      loadResults: mockLoadResults,
      display: mockData,
      totalPages: 3,
      page: 1,
      setPage: mockSetPage,
      navigate: vi.fn(),
    });

    render(
      <TestWrapper>
        <ScoreHistory />
      </TestWrapper>,
    );
    const currentButton = await screen.findByRole("button", {
      name: /go to page 2/i,
    });
    expect(currentButton).toBeDisabled();
  });

  it("should not render pagination when there is only one page", async () => {
    const mockData = [
      { wpm: 45, time: 1000, session: buildInitialState() },
      { wpm: 50, time: 2000, session: buildInitialState() },
    ] as TypeScore[];

    const mockUseScoreHistory = vi.mocked(useScoreHistory);
    mockUseScoreHistory.mockReturnValue({
      closeDialog: mockCloseDialog,
      loadResults: mockLoadResults,
      display: mockData,
      totalPages: 1,
      page: 0,
      setPage: mockSetPage,
      navigate: vi.fn(),
    });

    render(
      <TestWrapper>
        <ScoreHistory />
      </TestWrapper>,
    );

    expect(screen.queryByText(/Paging/)).not.toBeInTheDocument();
  });

  it("should call closeDialog when close button is clicked", async () => {
    const user = userEvent.setup();

    const mockUseScoreHistory = vi.mocked(useScoreHistory);
    mockUseScoreHistory.mockReturnValue({
      closeDialog: mockCloseDialog,
      loadResults: mockLoadResults,
      display: [],
      totalPages: 1,
      page: 0,
      setPage: mockSetPage,
      navigate: vi.fn(),
    });

    render(
      <TestWrapper>
        <ScoreHistory />
      </TestWrapper>,
    );

    const closeButton = await screen.findByRole("button", {
      name: CLOSE_HISTORY,
    });
    await user.click(closeButton);

    expect(mockCloseDialog).toHaveBeenCalledTimes(1);
  });

  it("should call loadResults with the article element", async () => {
    const mockUseScoreHistory = vi.mocked(useScoreHistory);
    mockUseScoreHistory.mockReturnValue({
      closeDialog: mockCloseDialog,
      loadResults: mockLoadResults,
      display: [],
      totalPages: 1,
      page: 0,
      setPage: mockSetPage,
      navigate: vi.fn(),
    });

    render(
      <TestWrapper>
        <ScoreHistory />
      </TestWrapper>,
    );

    // The loadResults should be called with an HTMLElement (the Article)
    expect(mockLoadResults).toHaveBeenCalledWith(expect.any(HTMLElement));
  });
});
