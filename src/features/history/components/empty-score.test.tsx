import { buildInitialState, TypingContext } from "@/features/typing-speed";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  NEVER_PLAYED_BEFORE,
  NO_PREVIOUS_RECORDS,
  START_NEW_TEST,
  START_TYPING,
} from "@tests/shared";
import { shouldSee } from "@tests/vitest";
import { EmptyScore } from "./empty-score";

describe("EmptyScore", () => {
  const mockDispatch = vi.fn();
  const mockOnClose = vi.fn();

  const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <TypingContext.Provider
      value={{
        state: buildInitialState(),
        dispatch: mockDispatch,
      }}
    >
      {children}
    </TypingContext.Provider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the empty score component", async () => {
    render(
      <TestWrapper>
        <EmptyScore onClose={mockOnClose} />
      </TestWrapper>,
    );

    expect(screen.getByRole("article")).toBeInTheDocument();

    await shouldSee(
      NO_PREVIOUS_RECORDS,
      NEVER_PLAYED_BEFORE,
      START_NEW_TEST,
      START_TYPING,
    );
  });

  it("should call onClose and dispatch startTyping when button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <EmptyScore onClose={mockOnClose} />
      </TestWrapper>,
    );

    const button = screen.getByRole("button", { name: START_TYPING });
    await user.click(button);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ action: "startTyping" });
  });
});
