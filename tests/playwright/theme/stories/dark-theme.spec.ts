import { test } from "@playwright/test";
import { asUser, clickButton, shouldSee } from "@tests/playwright/shared";
import { SWITCH_TO_DARK, SWITCH_TO_LIGHT } from "@tests/shared";

test.use({ colorScheme: "dark" });

test.describe("Typing speed - Dark theme users", () => {
  test("Page should load in dark mode", async ({ page }) => {
    await asUser(page);
    await shouldSee(page, SWITCH_TO_LIGHT);
  });

  test("Theme should switch to light", async ({ page }) => {
    await asUser(page);
    await clickButton(page, SWITCH_TO_LIGHT);
    await shouldSee(page, SWITCH_TO_DARK);
  });
});
