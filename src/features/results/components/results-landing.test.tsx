import { TypingContext } from "@/features/typing-speed";
import { getMockState } from "@/features/typing-speed/scripts/test-helpers";
import { render, screen } from "@testing-library/react";
import { ResultsLanding } from "./results-landing";

describe("Results landing", () => {
  it("should render for the first time with baseline message", async () => {
    render(
      <TypingContext.Provider
        value={{ state: getMockState(), dispatch: vi.fn() }}
      >
        <ResultsLanding />
      </TypingContext.Provider>,
    );
    expect(
      await screen.findByText(/baseline established/i),
    ).toBeInTheDocument();
  });
});
