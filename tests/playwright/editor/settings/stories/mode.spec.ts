import { test } from "@playwright/test";
import { asUser } from "@tests/playwright/shared";
import {
  makeQuery,
  PASSAGE_LINK,
  QUERY_120,
  QUERY_15,
  QUERY_30,
  QUERY_60,
  QUERY_PASSAGE,
  S120_LINK,
  S15_LINK,
  S30_LINK,
  S60_LINK,
  UNKNOWN_MODES,
} from "@tests/shared";
import { currentModeShouldBe } from "../helpers/setting-helpers";

test.describe("Mode settings", () => {
  const modeLinks = [
    [PASSAGE_LINK, QUERY_PASSAGE],
    [S15_LINK, QUERY_15],
    [S30_LINK, QUERY_30],
    [S60_LINK, QUERY_60],
    [S120_LINK, QUERY_120],
  ] as const;

  test("should start in passage mode", async ({ page }) => {
    await asUser(page);
    await currentModeShouldBe(page, PASSAGE_LINK);
  });

  modeLinks.forEach(([link, query]) => {
    test(`should start in query specific mode (${link.source})`, async ({
      page,
    }) => {
      await page.goto(query);
      await currentModeShouldBe(page, link);
    });
  });

  UNKNOWN_MODES.forEach((mode) => {
    test(`should start in passage mode for unkown queries (${mode})`, async ({
      page,
    }) => {
      await page.goto(makeQuery`mode ${mode}`);
      await currentModeShouldBe(page, PASSAGE_LINK);
    });
  });
});
