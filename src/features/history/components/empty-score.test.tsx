import { buildInitialState, TypingContext } from "@/features/typing-speed";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("should render the empty score component", () => {
    render(
      <TestWrapper>
        <EmptyScore onClose={mockOnClose} />
      </TestWrapper>,
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /no previous records/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/it looks like you never played this level before/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/go and start a new test now/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /start typing/i }),
    ).toBeInTheDocument();
  });

  it("should call onClose and dispatch startTyping when button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <EmptyScore onClose={mockOnClose} />
      </TestWrapper>,
    );

    const button = screen.getByRole("button", { name: /start typing/i });
    await user.click(button);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ action: "startTyping" });
  });
});
