import { test } from "@playwright/test";
import { asUser } from "@tests/playwright/shared";
import {
  CODE_LINK,
  CODE_QUERY,
  EASY_LINK,
  EASY_QUERY,
  HARD_LINK,
  HARD_QUERY,
  MEDIUM_LINK,
  MEDIUM_QUERY,
  QUOTE_LINK,
  QUOTE_QUERY,
} from "@tests/shared";
import { currentModeShouldBe } from "../helpers/setting-helpers";

test.describe("Difficulty settings", () => {
  test("should start in easy mode", async ({ page }) => {
    await asUser(page);
    await currentModeShouldBe(page, EASY_LINK);
  });

  test("should start in query defined mode", async ({ page }) => {
    await asUser(page);
    await currentModeShouldBe(page, EASY_LINK);

    const difficulties = [
      [EASY_LINK, EASY_QUERY],
      [MEDIUM_LINK, MEDIUM_QUERY],
      [HARD_LINK, HARD_QUERY],
      [QUOTE_LINK, QUOTE_QUERY],
      [CODE_LINK, CODE_QUERY],
    ] as const;

    for (let index = 0; index < difficulties.length; index++) {
      const [link, query] = difficulties[index];
      await page.goto(query);
      await currentModeShouldBe(page, link);
    }
  });
});
