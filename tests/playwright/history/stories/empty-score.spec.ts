import { test } from "@playwright/test";
import {
  asHistoryUser,
  shouldNotSee,
  shouldSee,
} from "@tests/playwright/shared";
import {
  CODE_LINK,
  CODE_QUERY,
  EASY_LINK,
  EASY_QUERY,
  HARD_LINK,
  HARD_QUERY,
  MEDIUM_LINK,
  MEDIUM_QUERY,
  NEVER_PLAYED_BEFORE,
  NO_PREVIOUS_RECORDS,
  QUOTE_LINK,
  QUOTE_QUERY,
  START_NEW_TEST,
  START_TYPING,
} from "@tests/shared";

test.describe("Empty score history", () => {
  const difficulties = [
    [EASY_LINK, EASY_QUERY],
    [MEDIUM_LINK, MEDIUM_QUERY],
    [HARD_LINK, HARD_QUERY],
    [QUOTE_LINK, QUOTE_QUERY],
    [CODE_LINK, CODE_QUERY],
  ] as const;
  difficulties.forEach(([link, query]) =>
    test("should see empty score for level " + link, async ({ page }) => {
      await asHistoryUser(page, query);
      await shouldSee(
        page,
        NO_PREVIOUS_RECORDS,
        NEVER_PLAYED_BEFORE,
        START_NEW_TEST,
        [START_TYPING, 1],
      );
    }),
  );

  test("should go to typing page on start new test click", async ({ page }) => {
    await asHistoryUser(page);
    const button = page.getByRole("button", {
      name: "Start typing",
      exact: true,
    });
    await button.click();
    await shouldNotSee(page, START_TYPING);
  });
});
