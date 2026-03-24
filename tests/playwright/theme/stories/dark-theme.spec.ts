import { test } from "@playwright/test";
import { asUser, getButton } from "@tests/playwright/shared";
import { SWITCH_TO_LIGHT } from "@tests/shared";

test.use({ colorScheme: "dark" });

test.describe("Typing speed - Dark theme users", () => {
  test("Page should load in dark mode", async ({ page }) => {
    await asUser(page);
    await getButton(page, SWITCH_TO_LIGHT);
  });
});
