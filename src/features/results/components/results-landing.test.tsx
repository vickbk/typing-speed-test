import {
  buildInitialState,
  TypingContext,
  type AppState,
} from "@/features/typing-speed";
import { render } from "@testing-library/react";
import {
  BASELINE_ESTABLISHED,
  BEAT_THIS_SCORE,
  GO_AGAIN,
  HIGH_SCORE,
  SOLID_RUN,
} from "@tests/shared";
import { shouldNotSee, shouldSee } from "@tests/vitest";
import { ResultsLanding } from "./results-landing";

vi.mock("react-confetti", () => ({ default: () => <></> }));

describe("Results landing", () => {
  it("should render for the first time with baseline message", async () => {
    render(
      <TypingContext.Provider
        value={{ state: buildInitialState(), dispatch: vi.fn() }}
      >
        <ResultsLanding />
      </TypingContext.Provider>,
    );
    await shouldSee(BASELINE_ESTABLISHED, BEAT_THIS_SCORE);
  });

  it("should show solid run message for a new result", async () => {
    renderResultsLanding({ best: 20 });
    await shouldNotSee(BASELINE_ESTABLISHED);
    await shouldSee(SOLID_RUN, GO_AGAIN);
  });

  it("should show personal best message for a new high result", async () => {
    renderResultsLanding({
      best: 1,
      text: "hello world",
      input: "hello world",
    });
    await shouldNotSee(BASELINE_ESTABLISHED, SOLID_RUN);
    await shouldSee(HIGH_SCORE, BEAT_THIS_SCORE);
  });
});

function renderResultsLanding(state: Partial<AppState> = {}) {
  return render(
    <TypingContext.Provider
      value={{ state: buildInitialState(state), dispatch: vi.fn() }}
    >
      <ResultsLanding />
    </TypingContext.Provider>,
  );
}
