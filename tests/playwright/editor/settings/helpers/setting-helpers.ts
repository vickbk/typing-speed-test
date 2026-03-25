import { type Page, expect } from "@playwright/test";
import { getLink } from "@tests/playwright/shared";
import type { TEXT_PATTERN } from "@tests/shared";

export async function currentModeShouldBe(page: Page, text: TEXT_PATTERN) {
  const link = getLink(page, text);
  await expect(link).toHaveClass(/b-blue-600/);
}
