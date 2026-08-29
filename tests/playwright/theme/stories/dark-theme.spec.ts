import { test } from "@playwright/test";
import { asUser, shouldSee } from "@tests/playwright/shared";
import { SWITCH_TO_DARK, SWITCH_TO_LIGHT } from "@tests/shared";
import { switchToDark, switchToLight } from "../helpers";

test.use({ colorScheme: "dark" });

test.describe("Typing speed - Dark theme users", () => {
  test("Page should load in dark mode", async ({ page }) => {
    await asUser(page);
    await shouldSee(page, SWITCH_TO_LIGHT);
  });

  test("Theme should switch to light", async ({ page }) => {
    await switchToLight(page);
  });

  test("Light Theme should persist after page refresh", async ({ page }) => {
    await switchToLight(page);
    await page.reload();
    await shouldSee(page, SWITCH_TO_DARK);
  });

  test("Should switch back to dark theme", async ({ page }) => {
    await switchToLight(page);
    await switchToDark(page);
  });

  test("Dark theme should persist after page refresh", async ({ page }) => {
    await switchToLight(page);
    await page.reload();
    await shouldSee(page, SWITCH_TO_DARK);

    await switchToDark(page);
    await shouldSee(page, SWITCH_TO_LIGHT);

    await page.reload();
    await shouldSee(page, SWITCH_TO_LIGHT);
  });
});
