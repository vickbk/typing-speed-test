import { TypingContext, type AppState } from "@/features/typing-speed";
import { getMockState } from "@/features/typing-speed/scripts/test-helpers";
import { render } from "@testing-library/react";
import { BASELINE_ESTABLISHED, HIGH_SCORE, SOLID_RUN } from "@tests/shared";
import { shouldNotSee, shouldSee } from "@tests/vitest";
import { ResultsLanding } from "./results-landing";

vi.mock("react-confetti", () => ({ default: () => <></> }));

describe("Results landing", () => {
  it("should render for the first time with baseline message", async () => {
    render(
      <TypingContext.Provider
        value={{ state: getMockState(), dispatch: vi.fn() }}
      >
        <ResultsLanding />
      </TypingContext.Provider>,
    );
    await shouldSee(BASELINE_ESTABLISHED);
  });

  it("should show solid run message for a new result", async () => {
    renderResultsLanding({ best: 20 });
    await shouldNotSee(BASELINE_ESTABLISHED);
    await shouldSee(SOLID_RUN);
  });

  it("should show personal best message for a new high result", async () => {
    renderResultsLanding({
      best: 1,
      text: "hello world",
      input: "hello world",
    });
    await shouldNotSee(BASELINE_ESTABLISHED);
    await shouldNotSee(SOLID_RUN);
    await shouldSee(HIGH_SCORE);
  });
});

function renderResultsLanding(state: Partial<AppState> = {}) {
  return render(
    <TypingContext.Provider
      value={{ state: getMockState(state), dispatch: vi.fn() }}
    >
      <ResultsLanding />
    </TypingContext.Provider>,
  );
}
