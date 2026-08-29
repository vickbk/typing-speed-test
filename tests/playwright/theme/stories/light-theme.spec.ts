import { test } from "@playwright/test";
import { asUser, shouldSee } from "@tests/playwright/shared";
import { SWITCH_TO_DARK, SWITCH_TO_LIGHT } from "@tests/shared";
import { switchToDark, switchToLight } from "../helpers";

test.describe("Typing speed - light theme users", () => {
  test("Page should load in light mode", async ({ page }) => {
    await asUser(page);
    await shouldSee(page, SWITCH_TO_DARK);
  });

  test("Theme should switch to dark", async ({ page }) => {
    await switchToDark(page);
  });

  test("Dark Theme should persist after page refresh", async ({ page }) => {
    await switchToDark(page);
    await page.reload();
    await shouldSee(page, SWITCH_TO_LIGHT);
  });

  test("Should switch back to light theme", async ({ page }) => {
    await switchToDark(page);
    await switchToLight(page);
  });

  test("Light theme should persist after page refresh", async ({ page }) => {
    await switchToDark(page);
    await page.reload();
    await shouldSee(page, SWITCH_TO_LIGHT);

    await switchToLight(page);
    await shouldSee(page, SWITCH_TO_DARK);

    await page.reload();
    await shouldSee(page, SWITCH_TO_DARK);
  });
});
