import type { Page } from "@playwright/test";

export async function asUser(page: Page) {
  return await page.goto("/");
}

export async function asHistoryUser(page: Page, query = "") {
  return await page.goto("/history/" + query);
}
