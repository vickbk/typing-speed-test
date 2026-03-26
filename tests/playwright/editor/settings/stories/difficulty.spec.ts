import { test } from "@playwright/test";
import { asUser } from "@tests/playwright/shared";
import {
  CODE_LINK,
  CODE_QUERY,
  EASY_LINK,
  EASY_QUERY,
  HARD_LINK,
  HARD_QUERY,
  makeQuery,
  MEDIUM_LINK,
  MEDIUM_QUERY,
  QUOTE_LINK,
  QUOTE_QUERY,
  UNKNOWN_DIFFICULTIES,
} from "@tests/shared";
import { currentModeShouldBe } from "../helpers/setting-helpers";

test.describe("Difficulty settings", () => {
  const difficulties = [
    [EASY_LINK, EASY_QUERY],
    [MEDIUM_LINK, MEDIUM_QUERY],
    [HARD_LINK, HARD_QUERY],
    [QUOTE_LINK, QUOTE_QUERY],
    [CODE_LINK, CODE_QUERY],
  ] as const;

  test("should start in easy mode", async ({ page }) => {
    await asUser(page);
    await currentModeShouldBe(page, EASY_LINK);
  });

  difficulties.forEach(([link, query]) => {
    test(`should start in query defined mode (${link.source})`, async ({
      page,
    }) => {
      await page.goto(query);
      await currentModeShouldBe(page, link);
    });
  });

  UNKNOWN_DIFFICULTIES.forEach((difficulty) => {
    test(`should start in easy mode for unkown queries (${difficulty})`, async ({
      page,
    }) => {
      await page.goto(makeQuery`difficulty ${difficulty}`);
      await currentModeShouldBe(page, EASY_LINK);
    });
  });
});
