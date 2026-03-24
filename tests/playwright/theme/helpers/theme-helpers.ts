import type { Page } from "@playwright/test";
import { asUser, clickButton, shouldSee } from "@tests/playwright/shared";
import { SWITCH_TO_DARK, SWITCH_TO_LIGHT } from "@tests/shared";

export async function switchToLight(page: Page) {
  await asUser(page);
  await clickButton(page, SWITCH_TO_LIGHT);
  await shouldSee(page, SWITCH_TO_DARK);
}

export async function switchToDark(page: Page) {
  await asUser(page);
  await clickButton(page, SWITCH_TO_DARK);
  await shouldSee(page, SWITCH_TO_LIGHT);
}
