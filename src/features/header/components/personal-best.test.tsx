import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { PersonalBest } from "./personal-best";

import { PERSONAL_BEST_LABEL, SHOW_HISTORY, WPM } from "@tests/shared";
import { shouldSee } from "@tests/vitest";

// Mock usePersonalBest hook
vi.mock("../hooks", () => ({
  usePersonalBest: () => ({ best: 42 }),
}));

describe("PersonalBest component", () => {
  it("renders the personal best value and WPMText", async () => {
    render(
      <BrowserRouter>
        <PersonalBest />
      </BrowserRouter>,
    );
    await shouldSee(PERSONAL_BEST_LABEL, /42/, WPM);
  });

  it("renders the personal best icon", async () => {
    render(
      <BrowserRouter>
        <PersonalBest />
      </BrowserRouter>,
    );

    await shouldSee(PERSONAL_BEST_LABEL);
  });

  it("renders the history link and icons", async () => {
    render(
      <BrowserRouter>
        <PersonalBest />
      </BrowserRouter>,
    );
    await shouldSee(SHOW_HISTORY);

    expect(
      document.querySelector('[aria-label="Score History"]'),
    ).toBeInTheDocument();
  });
});
